//#region src/utils/format.ts
var EMPTY = "–";
var COMPACT_THRESHOLD = 1e4;
var numberFormats = /* @__PURE__ */ new Map();
var dateFormats = /* @__PURE__ */ new Map();
function numberFormat(locale, options) {
	const key = `${locale ?? ""}|${JSON.stringify(options)}`;
	let format = numberFormats.get(key);
	if (!format) {
		format = new Intl.NumberFormat(locale, options);
		numberFormats.set(key, format);
	}
	return format;
}
function dateFormat(locale, options) {
	const key = `${locale ?? ""}|${JSON.stringify(options)}`;
	let format = dateFormats.get(key);
	if (!format) {
		format = new Intl.DateTimeFormat(locale, options);
		dateFormats.set(key, format);
	}
	return format;
}
function toNumber(value) {
	if (value === null || value === void 0 || value === "") return null;
	const number = typeof value === "number" ? value : Number(value);
	return Number.isFinite(number) ? number : null;
}
/**
* Parse a bucket key into a local `Date`.
* `YYYY`, `YYYY-MM` and `YYYY-MM-DD` keys are read as local calendar dates (not UTC),
* so a `2026-11-05` bucket never renders as 4 November west of Greenwich.
*/
function parseBucketDate(value) {
	if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
	if (typeof value === "number") {
		if (Number.isInteger(value) && value >= 1e3 && value <= 9999) return new Date(value, 0, 1);
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? null : date;
	}
	if (typeof value !== "string" || value === "") return null;
	const match = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(value);
	if (match) return new Date(Number(match[1]), Number(match[2] ?? 1) - 1, Number(match[3] ?? 1));
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}
/**
* Format a duration in seconds with narrow units, e.g. `26h 30m` or `2m 5s`.
* The `axis` context drops seconds once hours are present and never rounds a part up,
* so tick labels stay exact.
*/
function formatDuration(seconds, locale, context = "full") {
	const total = Math.max(0, Math.round(seconds));
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor(total % 3600 / 60);
	const secs = total % 60;
	const unit = (amount, name) => {
		return numberFormat(locale, {
			style: "unit",
			unit: name,
			unitDisplay: "narrow"
		}).format(amount);
	};
	const parts = [];
	if (hours) parts.push(unit(hours, "hour"));
	if (minutes) parts.push(unit(minutes, "minute"));
	if (secs && (!hours || context === "full")) parts.push(unit(secs, "second"));
	return parts.length ? parts.join(" ") : unit(0, "second");
}
var DATE_OPTIONS = {
	hour: {
		axis: { hour: "numeric" },
		full: {
			weekday: "short",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit"
		}
	},
	day: {
		axis: {
			month: "short",
			day: "numeric"
		},
		full: {
			weekday: "short",
			month: "short",
			day: "numeric",
			year: "numeric"
		}
	},
	month: {
		axis: { month: "short" },
		full: {
			month: "long",
			year: "numeric"
		}
	},
	year: {
		axis: { year: "numeric" },
		full: { year: "numeric" }
	}
};
function formatDate(value, bucket, context, locale) {
	const date = parseBucketDate(value);
	if (!date) return null;
	if (bucket === "week") {
		if (context === "axis") return dateFormat(locale, DATE_OPTIONS.day.axis).format(date);
		const end = new Date(date);
		end.setDate(end.getDate() + 6);
		return dateFormat(locale, {
			month: "short",
			day: "numeric",
			year: "numeric"
		}).formatRange(date, end);
	}
	return dateFormat(locale, DATE_OPTIONS[bucket][context]).format(date);
}
/** Build a reusable formatter for one spec, locale and context. */
function createFormatter(spec = {}, options = {}) {
	const { context = "full", locale, emptyLabel = EMPTY } = options;
	const type = spec.type ?? "category";
	const axis = context === "axis";
	switch (type) {
		case "date": {
			const bucket = spec.bucket ?? "day";
			return (value) => {
				if (value === null || value === void 0 || value === "") return emptyLabel;
				return formatDate(value, bucket, context, locale) ?? String(value);
			};
		}
		case "number": return (value) => {
			const number = toNumber(value);
			if (number === null) return emptyLabel;
			if (axis && Math.abs(number) >= COMPACT_THRESHOLD) return numberFormat(locale, {
				notation: "compact",
				maximumFractionDigits: 1
			}).format(number);
			if (!axis && spec.decimals !== void 0) return numberFormat(locale, {
				minimumFractionDigits: spec.decimals,
				maximumFractionDigits: spec.decimals
			}).format(number);
			return numberFormat(locale, { maximumFractionDigits: axis ? 1 : 2 }).format(number);
		};
		case "money": return (value) => {
			const number = toNumber(value);
			if (number === null) return emptyLabel;
			const currency = spec.currency || "USD";
			if (axis) return numberFormat(locale, {
				style: "currency",
				currency,
				notation: "compact",
				maximumFractionDigits: 1
			}).format(number);
			return numberFormat(locale, {
				style: "currency",
				currency,
				...spec.decimals !== void 0 ? {
					minimumFractionDigits: spec.decimals,
					maximumFractionDigits: spec.decimals
				} : {}
			}).format(number);
		};
		case "percent": return (value) => {
			const number = toNumber(value);
			if (number === null) return emptyLabel;
			return numberFormat(locale, {
				style: "percent",
				maximumFractionDigits: axis ? 0 : 1
			}).format(number);
		};
		case "duration": return (value) => {
			const number = toNumber(value);
			return number === null ? emptyLabel : formatDuration(number, locale, context);
		};
		default: return (value) => value === null || value === void 0 || value === "" ? emptyLabel : String(value);
	}
}
/** One-off formatting. Prefer `createFormatter` when formatting many values. */
function formatValue(value, spec = {}, options = {}) {
	return createFormatter(spec, options)(value);
}
/**
* Describe the change from `previous` to `current`.
* `relative` gives a signed percentage; `absolute` gives a signed difference, in
* percentage points when the spec is `percent`. Returns `null` when either value is
* missing, or for a relative change from zero.
*/
function formatChange(current, previous, spec = {}, options = {}) {
	const { mode = "relative", positive = "up", locale, pointsLabel = "pts" } = options;
	const now = toNumber(current);
	const before = toNumber(previous);
	if (now === null || before === null) return null;
	let text;
	let delta;
	if (mode === "absolute") {
		if (spec.type === "percent") {
			delta = Math.round((now - before) * 1e3) / 10;
			text = `${numberFormat(locale, {
				signDisplay: "exceptZero",
				maximumFractionDigits: 1
			}).format(delta)} ${pointsLabel}`;
		} else {
			delta = now - before;
			const formatted = createFormatter(spec, { locale })(delta);
			text = delta > 0 ? `+${formatted}` : formatted;
		}
	} else {
		if (before === 0) return null;
		const ratio = (now - before) / Math.abs(before);
		delta = Math.round(ratio * 1e3) / 1e3;
		text = numberFormat(locale, {
			style: "percent",
			signDisplay: "exceptZero",
			maximumFractionDigits: Math.abs(ratio) < .1 ? 1 : 0
		}).format(ratio);
	}
	const direction = Math.sign(delta) || 0;
	let tone = "neutral";
	if (direction !== 0 && positive !== "none") tone = direction > 0 === (positive === "up") ? "good" : "bad";
	return {
		text,
		direction,
		tone
	};
}
//#endregion
export { createFormatter, formatChange, formatDuration, formatValue, parseBucketDate };

//# sourceMappingURL=format.js.map