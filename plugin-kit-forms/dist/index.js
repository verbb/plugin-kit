import { get, set } from "lodash-es";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region src/FormStateStore.ts
var FormStateStore = class {
	state;
	listeners = /* @__PURE__ */ new Set();
	initialValues;
	constructor(initialValues = {}) {
		this.initialValues = { ...initialValues };
		this.state = {
			values: { ...initialValues },
			errors: {},
			touched: /* @__PURE__ */ new Set(),
			dirty: /* @__PURE__ */ new Set()
		};
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	notify() {
		this.listeners.forEach((listener) => {
			listener();
		});
	}
	getValue(path) {
		return get(this.state.values, path);
	}
	setValue(path, value) {
		const nextErrors = { ...this.state.errors };
		if (path in nextErrors) delete nextErrors[path];
		if (Array.isArray(value)) {
			const descendantPrefix = `${path}.`;
			Object.keys(nextErrors).forEach((key) => {
				if (key.startsWith(descendantPrefix)) delete nextErrors[key];
			});
		}
		this.state = {
			...this.state,
			values: (() => {
				const cloneRoot = Array.isArray(this.state.values) ? [...this.state.values] : { ...this.state.values ?? {} };
				set(cloneRoot, path, value);
				return cloneRoot;
			})(),
			dirty: new Set(this.state.dirty).add(path),
			errors: nextErrors
		};
		this.notify();
	}
	setValues(values) {
		this.state = {
			...this.state,
			values: { ...values }
		};
		this.notify();
	}
	setErrors(errors) {
		this.state = {
			...this.state,
			errors: { ...errors }
		};
		this.notify();
	}
	clearErrors() {
		this.state = {
			...this.state,
			errors: {}
		};
		this.notify();
	}
	setTouched(path, touched = true) {
		if (this.state.touched.has(path) === touched) return;
		const nextTouched = new Set(this.state.touched);
		if (touched) nextTouched.add(path);
		else nextTouched.delete(path);
		this.state = {
			...this.state,
			touched: nextTouched
		};
		this.notify();
	}
	reset(values = this.initialValues) {
		this.initialValues = { ...values };
		this.state = {
			values: { ...values },
			errors: {},
			touched: /* @__PURE__ */ new Set(),
			dirty: /* @__PURE__ */ new Set()
		};
		this.notify();
	}
};
//#endregion
//#region src/normalizeSchema.ts
var normalizeSchema = (items, path = "root") => {
	if (Array.isArray(items)) return items.map((item, index) => {
		return normalizeSchema(item, `${path}.${index}`);
	});
	if (!items || typeof items !== "object") return items;
	const itemWithId = { ...items };
	const itemPath = path || "root";
	if (!itemWithId._id) itemWithId._id = `schema_${itemPath}`;
	if (Array.isArray(itemWithId.children)) itemWithId.children = itemWithId.children.map((child, index) => {
		return normalizeSchema(child, `${itemPath}.children.${index}`);
	});
	if (Array.isArray(itemWithId.schema)) itemWithId.schema = itemWithId.schema.map((child, index) => {
		return normalizeSchema(child, `${itemPath}.schema.${index}`);
	});
	return itemWithId;
};
//#endregion
//#region ../node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { "default": e };
	}
	module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/typeof.js
var require_typeof = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/toPrimitive.js
var require_toPrimitive = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _typeof = require_typeof()["default"];
	function toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/toPropertyKey.js
var require_toPropertyKey = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _typeof = require_typeof()["default"];
	var toPrimitive = require_toPrimitive();
	function toPropertyKey(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/defineProperty.js
var require_defineProperty = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toPropertyKey = require_toPropertyKey();
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/classCallCheck.js
var require_classCallCheck = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _classCallCheck(a, n) {
		if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
	}
	module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/createClass.js
var require_createClass = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toPropertyKey = require_toPropertyKey();
	function _defineProperties(e, r) {
		for (var t = 0; t < r.length; t++) {
			var o = r[t];
			o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
		}
	}
	function _createClass(e, r, t) {
		return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/arrayLikeToArray.js
var require_arrayLikeToArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _arrayLikeToArray(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js
var require_arrayWithoutHoles = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayLikeToArray = require_arrayLikeToArray();
	function _arrayWithoutHoles(r) {
		if (Array.isArray(r)) return arrayLikeToArray(r);
	}
	module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/iterableToArray.js
var require_iterableToArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _iterableToArray(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js
var require_unsupportedIterableToArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayLikeToArray = require_arrayLikeToArray();
	function _unsupportedIterableToArray(r, a) {
		if (r) {
			if ("string" == typeof r) return arrayLikeToArray(r, a);
			var t = {}.toString.call(r).slice(8, -1);
			return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
		}
	}
	module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/nonIterableSpread.js
var require_nonIterableSpread = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _nonIterableSpread() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/@babel/runtime/helpers/toConsumableArray.js
var require_toConsumableArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayWithoutHoles = require_arrayWithoutHoles();
	var iterableToArray = require_iterableToArray();
	var unsupportedIterableToArray = require_unsupportedIterableToArray();
	var nonIterableSpread = require_nonIterableSpread();
	function _toConsumableArray(r) {
		return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
	}
	module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/jexl/dist/evaluator/handlers.js
var require_handlers$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _toConsumableArray2 = require_interopRequireDefault()(require_toConsumableArray());
	var poolNames = {
		functions: "Jexl Function",
		transforms: "Transform"
	};
	/**
	* Evaluates an ArrayLiteral by returning its value, with each element
	* independently run through the evaluator.
	* @param {{type: 'ObjectLiteral', value: <{}>}} ast An expression tree with an
	*      ObjectLiteral as the top node
	* @returns {Promise.<[]>} resolves to a map contained evaluated values.
	* @private
	*/
	exports.ArrayLiteral = function(ast) {
		return this.evalArray(ast.value);
	};
	/**
	* Evaluates a BinaryExpression node by running the Grammar's evaluator for
	* the given operator. Note that binary expressions support two types of
	* evaluators: `eval` is called with the left and right operands pre-evaluated.
	* `evalOnDemand`, if it exists, will be called with the left and right operands
	* each individually wrapped in an object with an "eval" function that returns
	* a promise with the resulting value. This allows the binary expression to
	* evaluate the operands conditionally.
	* @param {{type: 'BinaryExpression', operator: <string>, left: {},
	*      right: {}}} ast An expression tree with a BinaryExpression as the top
	*      node
	* @returns {Promise<*>} resolves with the value of the BinaryExpression.
	* @private
	*/
	exports.BinaryExpression = function(ast) {
		var _this = this;
		var grammarOp = this._grammar.elements[ast.operator];
		if (grammarOp.evalOnDemand) {
			var wrap = function wrap(subAst) {
				return { eval: function _eval() {
					return _this.eval(subAst);
				} };
			};
			return grammarOp.evalOnDemand(wrap(ast.left), wrap(ast.right));
		}
		return this.Promise.all([this.eval(ast.left), this.eval(ast.right)]).then(function(arr) {
			return grammarOp.eval(arr[0], arr[1]);
		});
	};
	/**
	* Evaluates a ConditionalExpression node by first evaluating its test branch,
	* and resolving with the consequent branch if the test is truthy, or the
	* alternate branch if it is not. If there is no consequent branch, the test
	* result will be used instead.
	* @param {{type: 'ConditionalExpression', test: {}, consequent: {},
	*      alternate: {}}} ast An expression tree with a ConditionalExpression as
	*      the top node
	* @private
	*/
	exports.ConditionalExpression = function(ast) {
		var _this2 = this;
		return this.eval(ast.test).then(function(res) {
			if (res) {
				if (ast.consequent) return _this2.eval(ast.consequent);
				return res;
			}
			return _this2.eval(ast.alternate);
		});
	};
	/**
	* Evaluates a FilterExpression by applying it to the subject value.
	* @param {{type: 'FilterExpression', relative: <boolean>, expr: {},
	*      subject: {}}} ast An expression tree with a FilterExpression as the top
	*      node
	* @returns {Promise<*>} resolves with the value of the FilterExpression.
	* @private
	*/
	exports.FilterExpression = function(ast) {
		var _this3 = this;
		return this.eval(ast.subject).then(function(subject) {
			if (ast.relative) return _this3._filterRelative(subject, ast.expr);
			return _this3._filterStatic(subject, ast.expr);
		});
	};
	/**
	* Evaluates an Identifier by either stemming from the evaluated 'from'
	* expression tree or accessing the context provided when this Evaluator was
	* constructed.
	* @param {{type: 'Identifier', value: <string>, [from]: {}}} ast An expression
	*      tree with an Identifier as the top node
	* @returns {Promise<*>|*} either the identifier's value, or a Promise that
	*      will resolve with the identifier's value.
	* @private
	*/
	exports.Identifier = function(ast) {
		if (!ast.from) return ast.relative ? this._relContext[ast.value] : this._context[ast.value];
		return this.eval(ast.from).then(function(context) {
			if (context === void 0 || context === null) return;
			if (Array.isArray(context)) context = context[0];
			return context[ast.value];
		});
	};
	/**
	* Evaluates a Literal by returning its value property.
	* @param {{type: 'Literal', value: <string|number|boolean>}} ast An expression
	*      tree with a Literal as its only node
	* @returns {string|number|boolean} The value of the Literal node
	* @private
	*/
	exports.Literal = function(ast) {
		return ast.value;
	};
	/**
	* Evaluates an ObjectLiteral by returning its value, with each key
	* independently run through the evaluator.
	* @param {{type: 'ObjectLiteral', value: <{}>}} ast An expression tree with an
	*      ObjectLiteral as the top node
	* @returns {Promise<{}>} resolves to a map contained evaluated values.
	* @private
	*/
	exports.ObjectLiteral = function(ast) {
		return this.evalMap(ast.value);
	};
	/**
	* Evaluates a FunctionCall node by applying the supplied arguments to a
	* function defined in one of the grammar's function pools.
	* @param {{type: 'FunctionCall', name: <string>}} ast An
	*      expression tree with a FunctionCall as the top node
	* @returns {Promise<*>|*} the value of the function call, or a Promise that
	*      will resolve with the resulting value.
	* @private
	*/
	exports.FunctionCall = function(ast) {
		var poolName = poolNames[ast.pool];
		if (!poolName) throw new Error("Corrupt AST: Pool '".concat(ast.pool, "' not found"));
		var func = this._grammar[ast.pool][ast.name];
		if (!func) throw new Error("".concat(poolName, " ").concat(ast.name, " is not defined."));
		return this.evalArray(ast.args || []).then(function(args) {
			return func.apply(void 0, (0, _toConsumableArray2.default)(args));
		});
	};
	/**
	* Evaluates a Unary expression by passing the right side through the
	* operator's eval function.
	* @param {{type: 'UnaryExpression', operator: <string>, right: {}}} ast An
	*      expression tree with a UnaryExpression as the top node
	* @returns {Promise<*>} resolves with the value of the UnaryExpression.
	* @constructor
	*/
	exports.UnaryExpression = function(ast) {
		var _this4 = this;
		return this.eval(ast.right).then(function(right) {
			return _this4._grammar.elements[ast.operator].eval(right);
		});
	};
}));
//#endregion
//#region ../node_modules/jexl/dist/evaluator/Evaluator.js
var require_Evaluator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _interopRequireDefault = require_interopRequireDefault();
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var handlers = require_handlers$1();
	module.exports = /* @__PURE__ */ function() {
		function Evaluator(grammar, context, relativeContext) {
			var promise = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Promise;
			(0, _classCallCheck2.default)(this, Evaluator);
			this._grammar = grammar;
			this._context = context || {};
			this._relContext = relativeContext || this._context;
			this.Promise = promise;
		}
		/**
		* Evaluates an expression tree within the configured context.
		* @param {{}} ast An expression tree object
		* @returns {Promise<*>} resolves with the resulting value of the expression.
		*/
		(0, _createClass2.default)(Evaluator, [
			{
				key: "eval",
				value: function _eval(ast) {
					var _this = this;
					return this.Promise.resolve().then(function() {
						return handlers[ast.type].call(_this, ast);
					});
				}
			},
			{
				key: "evalArray",
				value: function evalArray(arr) {
					var _this2 = this;
					return this.Promise.all(arr.map(function(elem) {
						return _this2.eval(elem);
					}));
				}
			},
			{
				key: "evalMap",
				value: function evalMap(map) {
					var _this3 = this;
					var keys = Object.keys(map);
					var result = {};
					var asts = keys.map(function(key) {
						return _this3.eval(map[key]);
					});
					return this.Promise.all(asts).then(function(vals) {
						vals.forEach(function(val, idx) {
							result[keys[idx]] = val;
						});
						return result;
					});
				}
			},
			{
				key: "_filterRelative",
				value: function _filterRelative(subject, expr) {
					var _this4 = this;
					var promises = [];
					if (!Array.isArray(subject)) subject = subject === void 0 ? [] : [subject];
					subject.forEach(function(elem) {
						var evalInst = new Evaluator(_this4._grammar, _this4._context, elem, _this4.Promise);
						promises.push(evalInst.eval(expr));
					});
					return this.Promise.all(promises).then(function(values) {
						var results = [];
						values.forEach(function(value, idx) {
							if (value) results.push(subject[idx]);
						});
						return results;
					});
				}
			},
			{
				key: "_filterStatic",
				value: function _filterStatic(subject, expr) {
					return this.eval(expr).then(function(res) {
						if (typeof res === "boolean") return res ? subject : void 0;
						return subject[res];
					});
				}
			}
		]);
		return Evaluator;
	}();
}));
//#endregion
//#region ../node_modules/jexl/dist/Lexer.js
var require_Lexer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _interopRequireDefault = require_interopRequireDefault();
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var numericRegex = /^-?(?:(?:[0-9]*\.[0-9]+)|[0-9]+)$/;
	var identRegex = /^[a-zA-Zа-яА-Я_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$][a-zA-Zа-яА-Я0-9_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$]*$/;
	var escEscRegex = /\\\\/;
	var whitespaceRegex = /^\s*$/;
	var preOpRegexElems = [
		"'(?:(?:\\\\')|[^'])*'",
		"\"(?:(?:\\\\\")|[^\"])*\"",
		"\\s+",
		"\\btrue\\b",
		"\\bfalse\\b"
	];
	var postOpRegexElems = ["[a-zA-Zа-яА-Я_À-ÖØ-öø-ÿ\\$][a-zA-Z0-9а-яА-Я_À-ÖØ-öø-ÿ\\$]*", "(?:(?:[0-9]*\\.[0-9]+)|[0-9]+)"];
	var minusNegatesAfter = [
		"binaryOp",
		"unaryOp",
		"openParen",
		"openBracket",
		"question",
		"colon"
	];
	module.exports = /* @__PURE__ */ function() {
		function Lexer(grammar) {
			(0, _classCallCheck2.default)(this, Lexer);
			this._grammar = grammar;
		}
		/**
		* Splits a Jexl expression string into an array of expression elements.
		* @param {string} str A Jexl expression string
		* @returns {Array<string>} An array of substrings defining the functional
		*      elements of the expression.
		*/
		(0, _createClass2.default)(Lexer, [
			{
				key: "getElements",
				value: function getElements(str) {
					var regex = this._getSplitRegex();
					return str.split(regex).filter(function(elem) {
						return elem;
					});
				}
			},
			{
				key: "getTokens",
				value: function getTokens(elements) {
					var tokens = [];
					var negate = false;
					for (var i = 0; i < elements.length; i++) if (this._isWhitespace(elements[i])) {
						if (tokens.length) tokens[tokens.length - 1].raw += elements[i];
					} else if (elements[i] === "-" && this._isNegative(tokens)) negate = true;
					else {
						if (negate) {
							elements[i] = "-" + elements[i];
							negate = false;
						}
						tokens.push(this._createToken(elements[i]));
					}
					if (negate) tokens.push(this._createToken("-"));
					return tokens;
				}
			},
			{
				key: "tokenize",
				value: function tokenize(str) {
					var elements = this.getElements(str);
					return this.getTokens(elements);
				}
			},
			{
				key: "_createToken",
				value: function _createToken(element) {
					var token = {
						type: "literal",
						value: element,
						raw: element
					};
					if (element[0] === "\"" || element[0] === "'") token.value = this._unquote(element);
					else if (element.match(numericRegex)) token.value = parseFloat(element);
					else if (element === "true" || element === "false") token.value = element === "true";
					else if (this._grammar.elements[element]) token.type = this._grammar.elements[element].type;
					else if (element.match(identRegex)) token.type = "identifier";
					else throw new Error("Invalid expression token: ".concat(element));
					return token;
				}
			},
			{
				key: "_escapeRegExp",
				value: function _escapeRegExp(str) {
					str = str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
					if (str.match(identRegex)) str = "\\b" + str + "\\b";
					return str;
				}
			},
			{
				key: "_getSplitRegex",
				value: function _getSplitRegex() {
					var _this = this;
					if (!this._splitRegex) {
						var elemArray = Object.keys(this._grammar.elements).sort(function(a, b) {
							return b.length - a.length;
						}).map(function(elem) {
							return _this._escapeRegExp(elem);
						}, this);
						this._splitRegex = new RegExp("(" + [
							preOpRegexElems.join("|"),
							elemArray.join("|"),
							postOpRegexElems.join("|")
						].join("|") + ")");
					}
					return this._splitRegex;
				}
			},
			{
				key: "_isNegative",
				value: function _isNegative(tokens) {
					if (!tokens.length) return true;
					return minusNegatesAfter.some(function(type) {
						return type === tokens[tokens.length - 1].type;
					});
				}
			},
			{
				key: "_isWhitespace",
				value: function _isWhitespace(str) {
					return !!str.match(whitespaceRegex);
				}
			},
			{
				key: "_unquote",
				value: function _unquote(str) {
					var quote = str[0];
					var escQuoteRegex = new RegExp("\\\\" + quote, "g");
					return str.substr(1, str.length - 2).replace(escQuoteRegex, quote).replace(escEscRegex, "\\");
				}
			}
		]);
		return Lexer;
	}();
}));
//#endregion
//#region ../node_modules/jexl/dist/parser/handlers.js
var require_handlers = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Handles a subexpression that's used to define a transform argument's value.
	* @param {{type: <string>}} ast The subexpression tree
	*/
	exports.argVal = function(ast) {
		if (ast) this._cursor.args.push(ast);
	};
	/**
	* Handles new array literals by adding them as a new node in the AST,
	* initialized with an empty array.
	*/
	exports.arrayStart = function() {
		this._placeAtCursor({
			type: "ArrayLiteral",
			value: []
		});
	};
	/**
	* Handles a subexpression representing an element of an array literal.
	* @param {{type: <string>}} ast The subexpression tree
	*/
	exports.arrayVal = function(ast) {
		if (ast) this._cursor.value.push(ast);
	};
	/**
	* Handles tokens of type 'binaryOp', indicating an operation that has two
	* inputs: a left side and a right side.
	* @param {{type: <string>}} token A token object
	*/
	exports.binaryOp = function(token) {
		var precedence = this._grammar.elements[token.value].precedence || 0;
		var parent = this._cursor._parent;
		while (parent && parent.operator && this._grammar.elements[parent.operator].precedence >= precedence) {
			this._cursor = parent;
			parent = parent._parent;
		}
		var node = {
			type: "BinaryExpression",
			operator: token.value,
			left: this._cursor
		};
		this._setParent(this._cursor, node);
		this._cursor = parent;
		this._placeAtCursor(node);
	};
	/**
	* Handles successive nodes in an identifier chain.  More specifically, it
	* sets values that determine how the following identifier gets placed in the
	* AST.
	*/
	exports.dot = function() {
		this._nextIdentEncapsulate = this._cursor && this._cursor.type !== "UnaryExpression" && (this._cursor.type !== "BinaryExpression" || this._cursor.type === "BinaryExpression" && this._cursor.right);
		this._nextIdentRelative = !this._cursor || this._cursor && !this._nextIdentEncapsulate;
		if (this._nextIdentRelative) this._relative = true;
	};
	/**
	* Handles a subexpression used for filtering an array returned by an
	* identifier chain.
	* @param {{type: <string>}} ast The subexpression tree
	*/
	exports.filter = function(ast) {
		this._placeBeforeCursor({
			type: "FilterExpression",
			expr: ast,
			relative: this._subParser.isRelative(),
			subject: this._cursor
		});
	};
	/**
	* Handles identifier tokens when used to indicate the name of a function to
	* be called.
	* @param {{type: <string>}} token A token object
	*/
	exports.functionCall = function() {
		this._placeBeforeCursor({
			type: "FunctionCall",
			name: this._cursor.value,
			args: [],
			pool: "functions"
		});
	};
	/**
	* Handles identifier tokens by adding them as a new node in the AST.
	* @param {{type: <string>}} token A token object
	*/
	exports.identifier = function(token) {
		var node = {
			type: "Identifier",
			value: token.value
		};
		if (this._nextIdentEncapsulate) {
			node.from = this._cursor;
			this._placeBeforeCursor(node);
			this._nextIdentEncapsulate = false;
		} else {
			if (this._nextIdentRelative) {
				node.relative = true;
				this._nextIdentRelative = false;
			}
			this._placeAtCursor(node);
		}
	};
	/**
	* Handles literal values, such as strings, booleans, and numerics, by adding
	* them as a new node in the AST.
	* @param {{type: <string>}} token A token object
	*/
	exports.literal = function(token) {
		this._placeAtCursor({
			type: "Literal",
			value: token.value
		});
	};
	/**
	* Queues a new object literal key to be written once a value is collected.
	* @param {{type: <string>}} token A token object
	*/
	exports.objKey = function(token) {
		this._curObjKey = token.value;
	};
	/**
	* Handles new object literals by adding them as a new node in the AST,
	* initialized with an empty object.
	*/
	exports.objStart = function() {
		this._placeAtCursor({
			type: "ObjectLiteral",
			value: {}
		});
	};
	/**
	* Handles an object value by adding its AST to the queued key on the object
	* literal node currently at the cursor.
	* @param {{type: <string>}} ast The subexpression tree
	*/
	exports.objVal = function(ast) {
		this._cursor.value[this._curObjKey] = ast;
	};
	/**
	* Handles traditional subexpressions, delineated with the groupStart and
	* groupEnd elements.
	* @param {{type: <string>}} ast The subexpression tree
	*/
	exports.subExpression = function(ast) {
		this._placeAtCursor(ast);
	};
	/**
	* Handles a completed alternate subexpression of a ternary operator.
	* @param {{type: <string>}} ast The subexpression tree
	*/
	exports.ternaryEnd = function(ast) {
		this._cursor.alternate = ast;
	};
	/**
	* Handles a completed consequent subexpression of a ternary operator.
	* @param {{type: <string>}} ast The subexpression tree
	*/
	exports.ternaryMid = function(ast) {
		this._cursor.consequent = ast;
	};
	/**
	* Handles the start of a new ternary expression by encapsulating the entire
	* AST in a ConditionalExpression node, and using the existing tree as the
	* test element.
	*/
	exports.ternaryStart = function() {
		this._tree = {
			type: "ConditionalExpression",
			test: this._tree
		};
		this._cursor = this._tree;
	};
	/**
	* Handles identifier tokens when used to indicate the name of a transform to
	* be applied.
	* @param {{type: <string>}} token A token object
	*/
	exports.transform = function(token) {
		this._placeBeforeCursor({
			type: "FunctionCall",
			name: token.value,
			args: [this._cursor],
			pool: "transforms"
		});
	};
	/**
	* Handles token of type 'unaryOp', indicating that the operation has only
	* one input: a right side.
	* @param {{type: <string>}} token A token object
	*/
	exports.unaryOp = function(token) {
		this._placeAtCursor({
			type: "UnaryExpression",
			operator: token.value
		});
	};
}));
//#endregion
//#region ../node_modules/jexl/dist/parser/states.js
var require_states = /* @__PURE__ */ __commonJSMin(((exports) => {
	var h = require_handlers();
	/**
	* A mapping of all states in the finite state machine to a set of instructions
	* for handling or transitioning into other states. Each state can be handled
	* in one of two schemes: a tokenType map, or a subHandler.
	*
	* Standard expression elements are handled through the tokenType object. This
	* is an object map of all legal token types to encounter in this state (and
	* any unexpected token types will generate a thrown error) to an options
	* object that defines how they're handled.  The available options are:
	*
	*      {string} toState: The name of the state to which to transition
	*          immediately after handling this token
	*      {string} handler: The handler function to call when this token type is
	*          encountered in this state.  If omitted, the default handler
	*          matching the token's "type" property will be called. If the handler
	*          function does not exist, no call will be made and no error will be
	*          generated.  This is useful for tokens whose sole purpose is to
	*          transition to other states.
	*
	* States that consume a subexpression should define a subHandler, the
	* function to be called with an expression tree argument when the
	* subexpression is complete. Completeness is determined through the
	* endStates object, which maps tokens on which an expression should end to the
	* state to which to transition once the subHandler function has been called.
	*
	* Additionally, any state in which it is legal to mark the AST as completed
	* should have a 'completable' property set to boolean true.  Attempting to
	* call {@link Parser#complete} in any state without this property will result
	* in a thrown Error.
	*
	* @type {{}}
	*/
	exports.states = {
		expectOperand: { tokenTypes: {
			literal: { toState: "expectBinOp" },
			identifier: { toState: "identifier" },
			unaryOp: {},
			openParen: { toState: "subExpression" },
			openCurl: {
				toState: "expectObjKey",
				handler: h.objStart
			},
			dot: { toState: "traverse" },
			openBracket: {
				toState: "arrayVal",
				handler: h.arrayStart
			}
		} },
		expectBinOp: {
			tokenTypes: {
				binaryOp: { toState: "expectOperand" },
				pipe: { toState: "expectTransform" },
				dot: { toState: "traverse" },
				question: {
					toState: "ternaryMid",
					handler: h.ternaryStart
				}
			},
			completable: true
		},
		expectTransform: { tokenTypes: { identifier: {
			toState: "postTransform",
			handler: h.transform
		} } },
		expectObjKey: { tokenTypes: {
			identifier: {
				toState: "expectKeyValSep",
				handler: h.objKey
			},
			closeCurl: { toState: "expectBinOp" }
		} },
		expectKeyValSep: { tokenTypes: { colon: { toState: "objVal" } } },
		postTransform: {
			tokenTypes: {
				openParen: { toState: "argVal" },
				binaryOp: { toState: "expectOperand" },
				dot: { toState: "traverse" },
				openBracket: { toState: "filter" },
				pipe: { toState: "expectTransform" }
			},
			completable: true
		},
		postArgs: {
			tokenTypes: {
				binaryOp: { toState: "expectOperand" },
				dot: { toState: "traverse" },
				openBracket: { toState: "filter" },
				pipe: { toState: "expectTransform" }
			},
			completable: true
		},
		identifier: {
			tokenTypes: {
				binaryOp: { toState: "expectOperand" },
				dot: { toState: "traverse" },
				openBracket: { toState: "filter" },
				openParen: {
					toState: "argVal",
					handler: h.functionCall
				},
				pipe: { toState: "expectTransform" },
				question: {
					toState: "ternaryMid",
					handler: h.ternaryStart
				}
			},
			completable: true
		},
		traverse: { tokenTypes: { identifier: { toState: "identifier" } } },
		filter: {
			subHandler: h.filter,
			endStates: { closeBracket: "identifier" }
		},
		subExpression: {
			subHandler: h.subExpression,
			endStates: { closeParen: "expectBinOp" }
		},
		argVal: {
			subHandler: h.argVal,
			endStates: {
				comma: "argVal",
				closeParen: "postArgs"
			}
		},
		objVal: {
			subHandler: h.objVal,
			endStates: {
				comma: "expectObjKey",
				closeCurl: "expectBinOp"
			}
		},
		arrayVal: {
			subHandler: h.arrayVal,
			endStates: {
				comma: "arrayVal",
				closeBracket: "expectBinOp"
			}
		},
		ternaryMid: {
			subHandler: h.ternaryMid,
			endStates: { colon: "ternaryEnd" }
		},
		ternaryEnd: {
			subHandler: h.ternaryEnd,
			completable: true
		}
	};
}));
//#endregion
//#region ../node_modules/jexl/dist/parser/Parser.js
var require_Parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _interopRequireDefault = require_interopRequireDefault();
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var handlers = require_handlers();
	var states = require_states().states;
	module.exports = /* @__PURE__ */ function() {
		function Parser(grammar, prefix, stopMap) {
			(0, _classCallCheck2.default)(this, Parser);
			this._grammar = grammar;
			this._state = "expectOperand";
			this._tree = null;
			this._exprStr = prefix || "";
			this._relative = false;
			this._stopMap = stopMap || {};
		}
		/**
		* Processes a new token into the AST and manages the transitions of the state
		* machine.
		* @param {{type: <string>}} token A token object, as provided by the
		*      {@link Lexer#tokenize} function.
		* @throws {Error} if a token is added when the Parser has been marked as
		*      complete by {@link #complete}, or if an unexpected token type is added.
		* @returns {boolean|*} the stopState value if this parser encountered a token
		*      in the stopState mapb false if tokens can continue.
		*/
		(0, _createClass2.default)(Parser, [
			{
				key: "addToken",
				value: function addToken(token) {
					if (this._state === "complete") throw new Error("Cannot add a new token to a completed Parser");
					var state = states[this._state];
					var startExpr = this._exprStr;
					this._exprStr += token.raw;
					if (state.subHandler) {
						if (!this._subParser) this._startSubExpression(startExpr);
						var stopState = this._subParser.addToken(token);
						if (stopState) {
							this._endSubExpression();
							if (this._parentStop) return stopState;
							this._state = stopState;
						}
					} else if (state.tokenTypes[token.type]) {
						var typeOpts = state.tokenTypes[token.type];
						var handleFunc = handlers[token.type];
						if (typeOpts.handler) handleFunc = typeOpts.handler;
						if (handleFunc) handleFunc.call(this, token);
						if (typeOpts.toState) this._state = typeOpts.toState;
					} else if (this._stopMap[token.type]) return this._stopMap[token.type];
					else throw new Error("Token ".concat(token.raw, " (").concat(token.type, ") unexpected in expression: ").concat(this._exprStr));
					return false;
				}
			},
			{
				key: "addTokens",
				value: function addTokens(tokens) {
					tokens.forEach(this.addToken, this);
				}
			},
			{
				key: "complete",
				value: function complete() {
					if (this._cursor && !states[this._state].completable) throw new Error("Unexpected end of expression: ".concat(this._exprStr));
					if (this._subParser) this._endSubExpression();
					this._state = "complete";
					return this._cursor ? this._tree : null;
				}
			},
			{
				key: "isRelative",
				value: function isRelative() {
					return this._relative;
				}
			},
			{
				key: "_endSubExpression",
				value: function _endSubExpression() {
					states[this._state].subHandler.call(this, this._subParser.complete());
					this._subParser = null;
				}
			},
			{
				key: "_placeAtCursor",
				value: function _placeAtCursor(node) {
					if (!this._cursor) this._tree = node;
					else {
						this._cursor.right = node;
						this._setParent(node, this._cursor);
					}
					this._cursor = node;
				}
			},
			{
				key: "_placeBeforeCursor",
				value: function _placeBeforeCursor(node) {
					this._cursor = this._cursor._parent;
					this._placeAtCursor(node);
				}
			},
			{
				key: "_setParent",
				value: function _setParent(node, parent) {
					Object.defineProperty(node, "_parent", {
						value: parent,
						writable: true
					});
				}
			},
			{
				key: "_startSubExpression",
				value: function _startSubExpression(exprStr) {
					var endStates = states[this._state].endStates;
					if (!endStates) {
						this._parentStop = true;
						endStates = this._stopMap;
					}
					this._subParser = new Parser(this._grammar, exprStr, endStates);
				}
			}
		]);
		return Parser;
	}();
}));
//#endregion
//#region ../node_modules/jexl/dist/PromiseSync.js
var require_PromiseSync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _interopRequireDefault = require_interopRequireDefault();
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var PromiseSync = /* @__PURE__ */ function() {
		function PromiseSync(fn) {
			(0, _classCallCheck2.default)(this, PromiseSync);
			fn(this._resolve.bind(this), this._reject.bind(this));
		}
		(0, _createClass2.default)(PromiseSync, [
			{
				key: "catch",
				value: function _catch(rejected) {
					if (this.error) try {
						this._resolve(rejected(this.error));
					} catch (e) {
						this._reject(e);
					}
					return this;
				}
			},
			{
				key: "then",
				value: function then(resolved, rejected) {
					if (!this.error) try {
						this._resolve(resolved(this.value));
					} catch (e) {
						this._reject(e);
					}
					if (rejected) this.catch(rejected);
					return this;
				}
			},
			{
				key: "_reject",
				value: function _reject(error) {
					this.value = void 0;
					this.error = error;
				}
			},
			{
				key: "_resolve",
				value: function _resolve(val) {
					if (val instanceof PromiseSync) if (val.error) this._reject(val.error);
					else this._resolve(val.value);
					else {
						this.value = val;
						this.error = void 0;
					}
				}
			}
		]);
		return PromiseSync;
	}();
	PromiseSync.all = function(vals) {
		return new PromiseSync(function(resolve) {
			resolve(vals.map(function(val) {
				while (val instanceof PromiseSync) {
					if (val.error) throw Error(val.error);
					val = val.value;
				}
				return val;
			}));
		});
	};
	PromiseSync.resolve = function(val) {
		return new PromiseSync(function(resolve) {
			return resolve(val);
		});
	};
	PromiseSync.reject = function(error) {
		return new PromiseSync(function(resolve, reject) {
			return reject(error);
		});
	};
	module.exports = PromiseSync;
}));
//#endregion
//#region ../node_modules/jexl/dist/Expression.js
var require_Expression = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _interopRequireDefault = require_interopRequireDefault();
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var Evaluator = require_Evaluator();
	var Lexer = require_Lexer();
	var Parser = require_Parser();
	var PromiseSync = require_PromiseSync();
	module.exports = /* @__PURE__ */ function() {
		function Expression(grammar, exprStr) {
			(0, _classCallCheck2.default)(this, Expression);
			this._grammar = grammar;
			this._exprStr = exprStr;
			this._ast = null;
		}
		/**
		* Forces a compilation of the expression string that this Expression object
		* was constructed with. This function can be called multiple times; useful
		* if the language elements of the associated Jexl instance change.
		* @returns {Expression} this Expression instance, for convenience
		*/
		(0, _createClass2.default)(Expression, [
			{
				key: "compile",
				value: function compile() {
					var lexer = new Lexer(this._grammar);
					var parser = new Parser(this._grammar);
					var tokens = lexer.tokenize(this._exprStr);
					parser.addTokens(tokens);
					this._ast = parser.complete();
					return this;
				}
			},
			{
				key: "eval",
				value: function _eval() {
					var context = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
					return this._eval(context, Promise);
				}
			},
			{
				key: "evalSync",
				value: function evalSync() {
					var context = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
					var res = this._eval(context, PromiseSync);
					if (res.error) throw res.error;
					return res.value;
				}
			},
			{
				key: "_eval",
				value: function _eval(context, promise) {
					var _this = this;
					return promise.resolve().then(function() {
						var ast = _this._getAst();
						return new Evaluator(_this._grammar, context, void 0, promise).eval(ast);
					});
				}
			},
			{
				key: "_getAst",
				value: function _getAst() {
					if (!this._ast) this.compile();
					return this._ast;
				}
			}
		]);
		return Expression;
	}();
}));
//#endregion
//#region ../node_modules/jexl/dist/grammar.js
var require_grammar = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.getGrammar = function() {
		return {
			/**
			* A map of all expression elements to their properties. Note that changes
			* here may require changes in the Lexer or Parser.
			* @type {{}}
			*/
			elements: {
				".": { type: "dot" },
				"[": { type: "openBracket" },
				"]": { type: "closeBracket" },
				"|": { type: "pipe" },
				"{": { type: "openCurl" },
				"}": { type: "closeCurl" },
				":": { type: "colon" },
				",": { type: "comma" },
				"(": { type: "openParen" },
				")": { type: "closeParen" },
				"?": { type: "question" },
				"+": {
					type: "binaryOp",
					precedence: 30,
					eval: function _eval(left, right) {
						return left + right;
					}
				},
				"-": {
					type: "binaryOp",
					precedence: 30,
					eval: function _eval(left, right) {
						return left - right;
					}
				},
				"*": {
					type: "binaryOp",
					precedence: 40,
					eval: function _eval(left, right) {
						return left * right;
					}
				},
				"/": {
					type: "binaryOp",
					precedence: 40,
					eval: function _eval(left, right) {
						return left / right;
					}
				},
				"//": {
					type: "binaryOp",
					precedence: 40,
					eval: function _eval(left, right) {
						return Math.floor(left / right);
					}
				},
				"%": {
					type: "binaryOp",
					precedence: 50,
					eval: function _eval(left, right) {
						return left % right;
					}
				},
				"^": {
					type: "binaryOp",
					precedence: 50,
					eval: function _eval(left, right) {
						return Math.pow(left, right);
					}
				},
				"==": {
					type: "binaryOp",
					precedence: 20,
					eval: function _eval(left, right) {
						return left == right;
					}
				},
				"!=": {
					type: "binaryOp",
					precedence: 20,
					eval: function _eval(left, right) {
						return left != right;
					}
				},
				">": {
					type: "binaryOp",
					precedence: 20,
					eval: function _eval(left, right) {
						return left > right;
					}
				},
				">=": {
					type: "binaryOp",
					precedence: 20,
					eval: function _eval(left, right) {
						return left >= right;
					}
				},
				"<": {
					type: "binaryOp",
					precedence: 20,
					eval: function _eval(left, right) {
						return left < right;
					}
				},
				"<=": {
					type: "binaryOp",
					precedence: 20,
					eval: function _eval(left, right) {
						return left <= right;
					}
				},
				"&&": {
					type: "binaryOp",
					precedence: 10,
					evalOnDemand: function evalOnDemand(left, right) {
						return left.eval().then(function(leftVal) {
							if (!leftVal) return leftVal;
							return right.eval();
						});
					}
				},
				"||": {
					type: "binaryOp",
					precedence: 10,
					evalOnDemand: function evalOnDemand(left, right) {
						return left.eval().then(function(leftVal) {
							if (leftVal) return leftVal;
							return right.eval();
						});
					}
				},
				in: {
					type: "binaryOp",
					precedence: 20,
					eval: function _eval(left, right) {
						if (typeof right === "string") return right.indexOf(left) !== -1;
						if (Array.isArray(right)) return right.some(function(elem) {
							return elem === left;
						});
						return false;
					}
				},
				"!": {
					type: "unaryOp",
					precedence: Infinity,
					eval: function _eval(right) {
						return !right;
					}
				}
			},
			/**
			* A map of function names to javascript functions. A Jexl function
			* takes zero ore more arguemnts:
			*
			*     - {*} ...args: A variable number of arguments passed to this function.
			*       All of these are pre-evaluated to their actual values before calling
			*       the function.
			*
			* The Jexl function should return either the transformed value, or
			* a Promises/A+ Promise object that resolves with the value and rejects
			* or throws only when an unrecoverable error occurs. Functions should
			* generally return undefined when they don't make sense to be used on the
			* given value type, rather than throw/reject. An error is only
			* appropriate when the function would normally return a value, but
			* cannot due to some other failure.
			*/
			functions: {},
			/**
			* A map of transform names to transform functions. A transform function
			* takes one ore more arguemnts:
			*
			*     - {*} val: A value to be transformed
			*     - {*} ...args: A variable number of arguments passed to this transform.
			*       All of these are pre-evaluated to their actual values before calling
			*       the function.
			*
			* The transform function should return either the transformed value, or
			* a Promises/A+ Promise object that resolves with the value and rejects
			* or throws only when an unrecoverable error occurs. Transforms should
			* generally return undefined when they don't make sense to be used on the
			* given value type, rather than throw/reject. An error is only
			* appropriate when the transform would normally return a value, but
			* cannot due to some other failure.
			*/
			transforms: {}
		};
	};
}));
//#endregion
//#region src/schema.ts
var import_Jexl = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _interopRequireDefault = require_interopRequireDefault();
	var _defineProperty2 = _interopRequireDefault(require_defineProperty());
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var Expression = require_Expression();
	var getGrammar = require_grammar().getGrammar;
	/**
	* Jexl is the Javascript Expression Language, capable of parsing and
	* evaluating basic to complex expression strings, combined with advanced
	* xpath-like drilldown into native Javascript objects.
	* @constructor
	*/
	var Jexl = /* @__PURE__ */ function() {
		function Jexl() {
			(0, _classCallCheck2.default)(this, Jexl);
			this.expr = this.expr.bind(this);
			this._grammar = getGrammar();
		}
		/**
		* Adds a binary operator to Jexl at the specified precedence. The higher the
		* precedence, the earlier the operator is applied in the order of operations.
		* For example, * has a higher precedence than +, because multiplication comes
		* before division.
		*
		* Please see grammar.js for a listing of all default operators and their
		* precedence values in order to choose the appropriate precedence for the
		* new operator.
		* @param {string} operator The operator string to be added
		* @param {number} precedence The operator's precedence
		* @param {function} fn A function to run to calculate the result. The function
		*      will be called with two arguments: left and right, denoting the values
		*      on either side of the operator. It should return either the resulting
		*      value, or a Promise that resolves with the resulting value.
		* @param {boolean} [manualEval] If true, the `left` and `right` arguments
		*      will be wrapped in objects with an `eval` function. Calling
		*      left.eval() or right.eval() will return a promise that resolves to
		*      that operand's actual value. This is useful to conditionally evaluate
		*      operands.
		*/
		(0, _createClass2.default)(Jexl, [
			{
				key: "addBinaryOp",
				value: function addBinaryOp(operator, precedence, fn, manualEval) {
					this._addGrammarElement(operator, (0, _defineProperty2.default)({
						type: "binaryOp",
						precedence
					}, manualEval ? "evalOnDemand" : "eval", fn));
				}
			},
			{
				key: "addFunction",
				value: function addFunction(name, fn) {
					this._grammar.functions[name] = fn;
				}
			},
			{
				key: "addFunctions",
				value: function addFunctions(map) {
					for (var key in map) this._grammar.functions[key] = map[key];
				}
			},
			{
				key: "addUnaryOp",
				value: function addUnaryOp(operator, fn) {
					this._addGrammarElement(operator, {
						type: "unaryOp",
						weight: Infinity,
						eval: fn
					});
				}
			},
			{
				key: "addTransform",
				value: function addTransform(name, fn) {
					this._grammar.transforms[name] = fn;
				}
			},
			{
				key: "addTransforms",
				value: function addTransforms(map) {
					for (var key in map) this._grammar.transforms[key] = map[key];
				}
			},
			{
				key: "compile",
				value: function compile(expression) {
					return this.createExpression(expression).compile();
				}
			},
			{
				key: "createExpression",
				value: function createExpression(expression) {
					return new Expression(this._grammar, expression);
				}
			},
			{
				key: "getFunction",
				value: function getFunction(name) {
					return this._grammar.functions[name];
				}
			},
			{
				key: "getTransform",
				value: function getTransform(name) {
					return this._grammar.transforms[name];
				}
			},
			{
				key: "eval",
				value: function _eval(expression) {
					var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
					return this.createExpression(expression).eval(context);
				}
			},
			{
				key: "evalSync",
				value: function evalSync(expression) {
					var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
					return this.createExpression(expression).evalSync(context);
				}
			},
			{
				key: "expr",
				value: function expr(strs) {
					for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
					var exprStr = strs.reduce(function(acc, str, idx) {
						var arg = idx < args.length ? args[idx] : "";
						acc += str + arg;
						return acc;
					}, "");
					return this.createExpression(exprStr);
				}
			},
			{
				key: "removeOp",
				value: function removeOp(operator) {
					if (this._grammar.elements[operator] && (this._grammar.elements[operator].type === "binaryOp" || this._grammar.elements[operator].type === "unaryOp")) delete this._grammar.elements[operator];
				}
			},
			{
				key: "_addGrammarElement",
				value: function _addGrammarElement(str, obj) {
					this._grammar.elements[str] = obj;
				}
			}
		]);
		return Jexl;
	}();
	module.exports = new Jexl();
	module.exports.Jexl = Jexl;
})))(), 1);
var Jexl = "default" in import_Jexl ? import_Jexl.default : import_Jexl;
var warnedConditions = /* @__PURE__ */ new Set();
var evaluateCondition = (condition, data) => {
	if (!condition) return true;
	try {
		return Jexl.evalSync(condition, data);
	} catch (error) {
		if (typeof condition === "string" && !warnedConditions.has(condition)) {
			warnedConditions.add(condition);
			console.warn("Condition evaluation error:", error, "Condition:", condition, "Data:", data);
		}
		return false;
	}
};
var traverseSchema = (node, visitor) => {
	if (Array.isArray(node)) node.forEach((child) => {
		return traverseSchema(child, visitor);
	});
	else if (node && typeof node === "object") {
		visitor(node);
		if (node.$field === "list") return;
		Object.values(node).forEach((value) => {
			if (value && (typeof value === "object" || Array.isArray(value))) traverseSchema(value, visitor);
		});
	}
};
var extractFields = (nodes) => {
	const fields = [];
	traverseSchema(nodes, (node) => {
		if (node.$field) fields.push(node);
	});
	return fields;
};
var extractFieldNames = (content) => {
	return extractFields(content).map((field) => {
		return field.name;
	}).filter((name) => {
		return typeof name === "string";
	});
};
var fieldNamesCache = /* @__PURE__ */ new WeakMap();
var getSchemaFieldNames = (node) => {
	if (!node || typeof node !== "object" && !Array.isArray(node)) return [];
	const key = node;
	const cached = fieldNamesCache.get(key);
	if (cached) return cached;
	const fieldNames = extractFieldNames(node);
	fieldNamesCache.set(key, fieldNames);
	return fieldNames;
};
var hasErrorValue = (value) => {
	if (Array.isArray(value)) return value.length > 0;
	if (!value) return false;
	if (typeof value === "object") {
		const entry = value;
		if (Array.isArray(entry.errors)) return entry.errors.length > 0;
	}
	return Boolean(value);
};
var createSchemaFieldIndex = (node) => {
	const fieldNames = getSchemaFieldNames(node);
	const fieldNameSet = new Set(fieldNames);
	return {
		fieldNames,
		hasField: (fieldName) => {
			return fieldNameSet.has(fieldName);
		}
	};
};
var hasSchemaErrors = (errors, node) => {
	if (!errors || !node) return false;
	return getSchemaFieldNames(node).some((fieldName) => {
		return hasErrorValue(errors[fieldName]);
	});
};
//#endregion
//#region src/buildGroupedMessage.ts
var buildGroupLabel = (parentLabel, childLabel) => {
	if (parentLabel && childLabel) return `${parentLabel}: ${childLabel}`;
	return parentLabel || childLabel || "";
};
var ATTRIBUTE_MESSAGE_PATTERN = /^(.+?) (cannot be blank\.|must be .+)$/;
var buildGroupedMessage = (message, parentLabel, childLabel) => {
	const groupLabel = buildGroupLabel(parentLabel, childLabel);
	if (!groupLabel) return message;
	const match = String(message).match(ATTRIBUTE_MESSAGE_PATTERN);
	if (match) {
		const [, attribute, suffix] = match;
		return `${buildGroupLabel(parentLabel, (childLabel && attribute !== childLabel ? attribute : childLabel) || attribute)} ${suffix}`;
	}
	return `${groupLabel} ${message}`;
};
//#endregion
//#region src/translate.ts
var translationCategory = "plugin-handle";
var translateFn;
var setTranslationCategory = (category) => {
	translationCategory = category.trim() || "plugin-handle";
};
var setTranslateFunction = (fn) => {
	translateFn = fn;
};
var translate = (message, params) => {
	if (translateFn) return translateFn(translationCategory, message, params);
	if (typeof window !== "undefined") {
		const craft = window.Craft;
		if (craft?.t) return craft.t(translationCategory, message, params);
	}
	return message;
};
//#endregion
//#region src/rules/email.ts
var emailRegex$1 = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
var emailRule = (value, label) => {
	if (!emailRegex$1.test(String(value))) return translate("{attribute} must be a valid email address.", { attribute: label });
	return null;
};
//#endregion
//#region src/rules/emailOrVariable.ts
var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
var variableRegex = /({.*?})/;
var emailOrVariableRule = (value, label) => {
	const text = String(value);
	if (!variableRegex.test(text) && !emailRegex.test(text)) return translate("{attribute} must be a valid email address or variable.", { attribute: label });
	return null;
};
//#endregion
//#region src/rules/handle.ts
var handleRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
var handleRule = (value) => {
	const handle = String(value ?? "");
	if (!handleRegex.test(handle)) return translate("“{handle}” isn’t a valid handle.", { handle });
	return null;
};
//#endregion
//#region src/rules/utils.ts
var INVISIBLE_CHAR_PATTERN = /[\u200B\u200C\u200D\u2060\uFEFF]/g;
var isRecord$2 = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
/** TipTap JSON nodes always carry a string `type` (paragraph, text, variableTag, …). */
var isTipTapNode = (value) => {
	return isRecord$2(value) && typeof value.type === "string";
};
/**
* True for TipTap document payloads: content arrays, `{ type: 'doc' }`, or JSON
* strings of those. Avoids treating arbitrary object arrays (e.g. option rows) as docs.
*/
var isTipTapContent = (value) => {
	if (Array.isArray(value)) return value.length === 0 || value.every(isTipTapNode);
	if (isTipTapNode(value) && value.type === "doc") return true;
	return false;
};
var collectTipTapPlainText = (nodes) => {
	let text = "";
	const visit = (node) => {
		if (!isRecord$2(node)) return;
		if (node.type === "text" && typeof node.text === "string") {
			text += node.text.replace(INVISIBLE_CHAR_PATTERN, "");
			return;
		}
		if (node.type === "variableTag") {
			const attrs = isRecord$2(node.attrs) ? node.attrs : {};
			const label = typeof attrs.label === "string" ? attrs.label : "";
			const variableValue = typeof attrs.value === "string" ? attrs.value : "";
			text += (label || variableValue).replace(INVISIBLE_CHAR_PATTERN, "");
			return;
		}
		if (Array.isArray(node.content)) node.content.forEach(visit);
	};
	nodes.forEach(visit);
	return text.trim();
};
/**
* TipTap editors persist empty docs as JSON (`[]`, `[{type:'paragraph'}]`, …),
* which must count as blank for `required` — not as a filled string/object.
*/
var isEmptyTipTapValue = (value) => {
	let parsed = value;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed) return true;
		if (trimmed[0] !== "[" && trimmed[0] !== "{") return false;
		try {
			parsed = JSON.parse(trimmed);
		} catch {
			return false;
		}
	}
	if (!isTipTapContent(parsed)) return false;
	let nodes;
	if (Array.isArray(parsed)) nodes = parsed;
	else if (isRecord$2(parsed) && Array.isArray(parsed.content)) nodes = parsed.content;
	else nodes = [parsed];
	if (!nodes.length) return true;
	return collectTipTapPlainText(nodes).length === 0;
};
var isEmptyValue = (value) => {
	if (value === void 0 || value === null) return true;
	if (typeof value === "string") {
		if (value === "") return true;
		return isEmptyTipTapValue(value);
	}
	if (Array.isArray(value)) {
		if (value.length === 0) return true;
		return isEmptyTipTapValue(value);
	}
	if (isTipTapContent(value)) return isEmptyTipTapValue(value);
	return false;
};
var getValueSize = (value) => {
	if (typeof value === "number") return value;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (trimmed !== "" && Number.isFinite(Number(trimmed))) return Number(trimmed);
		return value.length;
	}
	if (Array.isArray(value)) return value.length;
	return NaN;
};
//#endregion
//#region src/rules/max.ts
var maxRule = (value, label, args) => {
	const max = Number(args[0]);
	const size = getValueSize(value);
	if (!Number.isFinite(size) || size > max) return translate("{attribute} must be at most {max}.", {
		attribute: label,
		max: String(args[0])
	});
	return null;
};
//#endregion
//#region src/rules/min.ts
var minRule = (value, label, args) => {
	const min = Number(args[0]);
	const size = getValueSize(value);
	if (!Number.isFinite(size) || size < min) return translate("{attribute} must be at least {min}.", {
		attribute: label,
		min: String(args[0])
	});
	return null;
};
//#endregion
//#region src/rules/required.ts
var requiredRule = (value, label) => {
	if (isEmptyValue(value)) return translate("{attribute} cannot be blank.", { attribute: label });
	return null;
};
//#endregion
//#region src/rules/requiredRichText.ts
/**
* Required check for TipTap/ProseMirror JSON fields (`validation: 'requiredRichText'`).
* Empty docs are JSON (`[]` / bare paragraphs), not `''` — handled via `isEmptyValue`.
*/
var requiredRichTextRule = (value, label) => {
	if (isEmptyValue(value)) return translate("{attribute} cannot be blank.", { attribute: label });
	return null;
};
//#endregion
//#region src/rules/requiredRules.ts
var REQUIRED_RULE_NAMES = new Set(["required", "requiredRichText"]);
var isRequiredRuleName = (ruleName) => {
	return REQUIRED_RULE_NAMES.has(ruleName);
};
//#endregion
//#region src/rules/uniqueHandle.ts
var isRecord$1 = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
var getHandleValue = (value) => {
	if (!isRecord$1(value)) return "";
	const settings = isRecord$1(value.settings) ? value.settings : {};
	return String(value.handle || settings.handle || "").trim();
};
var collectTopLevelFieldHandles = (values) => {
	const entries = [];
	(Array.isArray(values?.pages) ? values.pages : []).forEach((page, pageIndex) => {
		(Array.isArray(page?.rows) ? page.rows : []).forEach((row, rowIndex) => {
			(Array.isArray(row?.fields) ? row.fields : []).forEach((field, fieldIndex) => {
				const handle = getHandleValue(field);
				if (!handle) return;
				entries.push({
					path: `pages.${pageIndex}.rows.${rowIndex}.fields.${fieldIndex}.handle`,
					handle
				});
			});
		});
	});
	return entries;
};
var collectNestedFieldHandles = (values, parentFieldPath) => {
	const entries = [];
	const rows = get(values, `${parentFieldPath}.rows`, []);
	(Array.isArray(rows) ? rows : []).forEach((row, nestedRowIndex) => {
		(Array.isArray(row?.fields) ? row.fields : []).forEach((field, nestedFieldIndex) => {
			const handle = getHandleValue(field);
			if (!handle) return;
			entries.push({
				path: `${parentFieldPath}.rows.${nestedRowIndex}.fields.${nestedFieldIndex}.handle`,
				handle
			});
		});
	});
	return entries;
};
var collectNotificationHandles = (values) => {
	const entries = [];
	(Array.isArray(values?.notifications) ? values.notifications : []).forEach((notification, index) => {
		const handle = String(notification?.handle || "").trim();
		if (!handle) return;
		entries.push({
			path: `notifications.${index}.handle`,
			handle
		});
	});
	return entries;
};
var getScopedHandleEntries = (context) => {
	const { path, values } = context;
	const explicitScope = context?.field?.uniqueHandleScope;
	if (explicitScope === "topLevelFields") return collectTopLevelFieldHandles(values);
	if (explicitScope === "notifications") return collectNotificationHandles(values);
	if (explicitScope === "nestedSiblings") {
		const parentFieldPath = context?.field?.uniqueHandleScopePath;
		if (typeof parentFieldPath === "string" && parentFieldPath.trim() !== "") return collectNestedFieldHandles(values, parentFieldPath);
	}
	const nestedMatch = path.match(/^(pages\.\d+\.rows\.\d+\.fields\.\d+(?:\.rows\.\d+\.fields\.\d+)*)\.rows\.\d+\.fields\.\d+\.handle$/);
	if (nestedMatch) {
		const [, parentFieldPath] = nestedMatch;
		return collectNestedFieldHandles(values, parentFieldPath);
	}
	if (/^pages\.\d+\.rows\.\d+\.fields\.\d+\.handle$/.test(path)) return collectTopLevelFieldHandles(values);
	if (/^notifications\.\d+\.handle$/.test(path)) return collectNotificationHandles(values);
	return [];
};
var uniqueHandleRule = (value, label, args, context) => {
	if (!context?.path || !context?.values) return null;
	const handle = String(value ?? "").trim();
	if (!handle) return null;
	const entries = getScopedHandleEntries(context);
	const normalizedHandle = handle.toLowerCase();
	const scopedDuplicate = entries.some((entry) => {
		if (entry.path === context.path) return false;
		return entry.handle.toLowerCase() === normalizedHandle;
	});
	const reservedDuplicate = (Array.isArray(context.field?.reservedHandles) ? context.field.reservedHandles : []).some((reservedHandle) => {
		return String(reservedHandle || "").toLowerCase() === normalizedHandle;
	});
	if (!(scopedDuplicate || reservedDuplicate)) return null;
	return translate("{attribute} \"{value}\" has already been taken.", {
		attribute: label,
		value: handle
	});
};
//#endregion
//#region src/rules/index.ts
var ruleHandlers = {
	required: (value, label) => {
		return requiredRule(value, label);
	},
	requiredRichText: (value, label) => {
		return requiredRichTextRule(value, label);
	},
	min: (value, label, args) => {
		return minRule(value, label, args);
	},
	max: (value, label, args) => {
		return maxRule(value, label, args);
	},
	email: (value, label) => {
		return emailRule(value, label);
	},
	emailOrVariable: (value, label) => {
		return emailOrVariableRule(value, label);
	},
	handle: (value) => {
		return handleRule(value);
	},
	uniqueHandle: (value, label, args, context) => {
		return uniqueHandleRule(value, label, args, context);
	}
};
//#endregion
//#region src/ValidationEngine.ts
var isRecord = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
var parseRules = (field) => {
	const tokens = (typeof field.validation === "string" ? field.validation : "").split("|").map((token) => {
		return token.trim();
	}).filter(Boolean);
	const hasRequiredRule = tokens.some((rule) => {
		const name = rule.split(":")[0];
		return isRequiredRuleName(name);
	});
	if (field.required && !hasRequiredRule) tokens.unshift("required");
	return tokens.map((token) => {
		const [name, ...rest] = token.split(":");
		return {
			name,
			args: rest.length > 0 ? rest.join(":").split(",") : []
		};
	});
};
var expandWildcardPaths = (values, path) => {
	if (!path.includes("*")) return [path];
	const parts = path.split(".");
	const results = [];
	const walk = (current, index, acc) => {
		if (index >= parts.length) {
			results.push(acc.join("."));
			return;
		}
		const part = parts[index];
		if (part === "*") {
			if (Array.isArray(current)) current.forEach((item, idx) => {
				walk(item, index + 1, [...acc, String(idx)]);
			});
			return;
		}
		if (isRecord(current) && part in current) {
			walk(current[part], index + 1, [...acc, part]);
			return;
		}
		walk(void 0, index + 1, [...acc, part]);
	};
	walk(values, 0, []);
	return results;
};
var validateValue = (field, rules, value, context) => {
	const label = String(field.label || field.name || "");
	const isRequired = rules.some((rule) => {
		return isRequiredRuleName(rule.name);
	});
	for (const rule of rules) {
		const { name, args } = rule;
		if (!isRequired && isEmptyValue(value)) continue;
		const handler = ruleHandlers[name];
		if (!handler) continue;
		const message = handler(value, label, args, context);
		if (message) return message;
	}
	return null;
};
var buildConditionData = (field, values, conditionDataResolver) => {
	const scopePath = typeof field?._scopePath === "string" ? field._scopePath : "";
	const scopedValues = scopePath ? get(values, scopePath) : null;
	const scopedObject = isRecord(scopedValues) ? scopedValues : {};
	const conditionContext = conditionDataResolver?.(values, field);
	const normalizedConditionContext = isRecord(conditionContext) ? conditionContext : {};
	const fieldData = isRecord(field._data) ? field._data : {};
	return {
		...values,
		...scopedObject,
		...fieldData,
		...normalizedConditionContext
	};
};
var shouldValidateField = (field, values, conditionDataResolver) => {
	const condition = field?.if;
	if (!condition) return true;
	try {
		return evaluateCondition(condition, buildConditionData(field, values, conditionDataResolver));
	} catch {
		return true;
	}
};
var collectPathConditions = (schema) => {
	const pathConditions = /* @__PURE__ */ new Map();
	const walk = (node, currentPath = "", inherited = []) => {
		if (Array.isArray(node)) {
			node.forEach((child) => {
				walk(child, currentPath, inherited);
			});
			return;
		}
		if (!isRecord(node)) return;
		const name = typeof node.name === "string" && node.name ? node.name : "";
		let nodePath = currentPath;
		if (name) nodePath = currentPath ? `${currentPath}.${name}` : name;
		const ownCondition = typeof node.if === "string" && node.if ? [{
			condition: node.if,
			field: node
		}] : [];
		const nextInherited = [...inherited, ...ownCondition];
		if (nodePath && nextInherited.length) pathConditions.set(nodePath, nextInherited);
		if (Array.isArray(node.children)) walk(node.children, nodePath, nextInherited);
		if (Array.isArray(node.schema)) walk(node.schema, nodePath, nextInherited);
	};
	walk(schema, "", []);
	return pathConditions;
};
var shouldValidatePathConditions = (path, fallbackField, values, pathConditions, conditionDataResolver) => {
	const conditions = pathConditions.get(path) || [];
	if (!conditions.length) return true;
	return conditions.every(({ condition, field }) => {
		try {
			return evaluateCondition(condition, buildConditionData(field || fallbackField, values, conditionDataResolver));
		} catch {
			return true;
		}
	});
};
var createValidationEngine = (index, options = {}) => {
	const { conditionDataResolver } = options;
	const fieldRules = /* @__PURE__ */ new Map();
	const pathConditions = collectPathConditions(index.schema);
	index.fieldEntries.forEach((entry) => {
		fieldRules.set(entry, parseRules(entry.field));
	});
	const validate = (values) => {
		const fieldErrors = {};
		index.fieldEntries.forEach((entry) => {
			const rules = fieldRules.get(entry) || [];
			if (!rules.length) return;
			if (!shouldValidateField(entry.field, values, conditionDataResolver)) return;
			expandWildcardPaths(values, entry.path).forEach((path) => {
				if (!shouldValidatePathConditions(path, entry.field, values, pathConditions, conditionDataResolver)) return;
				const value = get(values, path);
				const message = validateValue(entry.field, rules, value, {
					path,
					values,
					field: entry.field
				});
				if (message) fieldErrors[path] = [message];
			});
		});
		return Object.keys(fieldErrors).length > 0 ? { fields: fieldErrors } : void 0;
	};
	return { validate };
};
//#endregion
export { FormStateStore, REQUIRED_RULE_NAMES, buildGroupedMessage, createSchemaFieldIndex, createValidationEngine, emailOrVariableRule, emailRule, evaluateCondition, extractFieldNames, extractFields, getSchemaFieldNames, handleRule, hasSchemaErrors, isRequiredRuleName, maxRule, minRule, normalizeSchema, requiredRichTextRule, requiredRule, ruleHandlers, setTranslateFunction, setTranslationCategory, translate, traverseSchema, uniqueHandleRule };

//# sourceMappingURL=index.js.map