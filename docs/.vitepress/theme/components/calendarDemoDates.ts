/** Local calendar day as `YYYY-MM-DD` (no UTC day-shift near midnight). */
export function calendarDate(offsetDays = 0, from = new Date()): string {
    const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offsetDays);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/** Inclusive range string for `pk-calendar` / `Calendar` (`YYYY-MM-DD/YYYY-MM-DD`). */
export function calendarRange(fromOffsetDays = 0, toOffsetDays = 7, from = new Date()): string {
    return `${calendarDate(fromOffsetDays, from)}/${calendarDate(toOffsetDays, from)}`;
}

/** Comma-separated disabled dates relative to today. */
export function calendarDisabledDates(offsets: number[], from = new Date()): string {
    return offsets.map((offset) => calendarDate(offset, from)).join(',');
}
