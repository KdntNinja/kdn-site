var zo = Object.defineProperty;
var Lo = (e, t, r) => (t in e ? zo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var f = (e, t, r) => (Lo(e, typeof t != "symbol" ? t + "" : t, r), r);
import {
    U as Vi,
    N as Do,
    P as Bo,
    b as qo,
    c as Ui,
    H as Ko,
    p as Fo,
    i as Wi,
    e as Wr,
    d as us,
    w as G,
    f as Zo,
    a as On,
    g as Vo,
} from "./entry.CzViBFHa.js";
import { p as dr, n as qs } from "./stores.DpCGI4la.js";
import {
    M as Bn,
    af as Jr,
    V as fr,
    ag as Ji,
    aj as Hi,
    ah as Gi,
    s as Je,
    I as Le,
    i as Ke,
    f as ie,
    B as pe,
    k as Ie,
    w as Z,
    C as kt,
    q as yn,
    v as be,
    e as Ht,
    c as Gt,
    b as Yt,
    x as De,
    y as _e,
    z as ke,
    A as we,
    n as Kr,
    a9 as Fr,
    J as Yi,
    t as Xi,
    d as Qi,
    h as ea,
    ak as ta,
} from "./scheduler.CCxz69I-.js";
import {
    S as He,
    i as Ge,
    g as vn,
    b as B,
    f as bn,
    t as q,
    c as Xt,
    a as Qt,
    m as er,
    d as tr,
} from "./index.BXRlT4_D.js";
import { g as st, a as _n } from "./spread.CgU5AtxT.js";
import { c as Be } from "./routes.CVgu8Yrj.js";
import { L as Uo } from "./label.BWluq0Fw.js";
import { e as Yr } from "./each.DUCJrQqa.js";
import "./separator.IFhk9s1e.js";
const Wo = !0;
class Tn extends Error {
    constructor(t, r) {
        super(t), (this.name = "DevalueError"), (this.path = r.join(""));
    }
}
function Ks(e) {
    return Object(e) !== e;
}
const Jo = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Ho(e) {
    const t = Object.getPrototypeOf(e);
    return t === Object.prototype || t === null || Object.getOwnPropertyNames(t).sort().join("\0") === Jo;
}
function Go(e) {
    return Object.prototype.toString.call(e).slice(8, -1);
}
function Yo(e) {
    switch (e) {
        case '"':
            return '\\"';
        case "<":
            return "\\u003C";
        case "\\":
            return "\\\\";
        case `
`:
            return "\\n";
        case "\r":
            return "\\r";
        case "	":
            return "\\t";
        case "\b":
            return "\\b";
        case "\f":
            return "\\f";
        case "\u2028":
            return "\\u2028";
        case "\u2029":
            return "\\u2029";
        default:
            return e < " " ? `\\u${e.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
    }
}
function Dt(e) {
    let t = "",
        r = 0;
    const n = e.length;
    for (let s = 0; s < n; s += 1) {
        const i = e[s],
            a = Yo(i);
        a && ((t += e.slice(r, s) + a), (r = s + 1));
    }
    return `"${r === 0 ? e : t + e.slice(r)}"`;
}
function Xo(e) {
    return Object.getOwnPropertySymbols(e).filter((t) => Object.getOwnPropertyDescriptor(e, t).enumerable);
}
function Qo(e, t) {
    const r = [],
        n = new Map(),
        s = [];
    for (const u in t) s.push({ key: u, fn: t[u] });
    const i = [];
    let a = 0;
    function o(u) {
        if (typeof u == "function") throw new Tn("Cannot stringify a function", i);
        if (n.has(u)) return n.get(u);
        if (u === void 0) return Vi;
        if (Number.isNaN(u)) return Do;
        if (u === 1 / 0) return Bo;
        if (u === -1 / 0) return qo;
        if (u === 0 && 1 / u < 0) return Ui;
        const c = a++;
        n.set(u, c);
        for (const { key: x, fn: g } of s) {
            const _ = g(u);
            if (_) return (r[c] = `["${x}",${o(_)}]`), c;
        }
        let h = "";
        if (Ks(u)) h = Cn(u);
        else
            switch (Go(u)) {
                case "Number":
                case "String":
                case "Boolean":
                    h = `["Object",${Cn(u)}]`;
                    break;
                case "BigInt":
                    h = `["BigInt",${u}]`;
                    break;
                case "Date":
                    h = `["Date","${!isNaN(u.getDate()) ? u.toISOString() : ""}"]`;
                    break;
                case "RegExp":
                    const { source: _, flags: y } = u;
                    h = y ? `["RegExp",${Dt(_)},"${y}"]` : `["RegExp",${Dt(_)}]`;
                    break;
                case "Array":
                    h = "[";
                    for (let m = 0; m < u.length; m += 1)
                        m > 0 && (h += ","), m in u ? (i.push(`[${m}]`), (h += o(u[m])), i.pop()) : (h += Ko);
                    h += "]";
                    break;
                case "Set":
                    h = '["Set"';
                    for (const m of u) h += `,${o(m)}`;
                    h += "]";
                    break;
                case "Map":
                    h = '["Map"';
                    for (const [m, w] of u)
                        i.push(`.get(${Ks(m) ? Cn(m) : "..."})`), (h += `,${o(m)},${o(w)}`), i.pop();
                    h += "]";
                    break;
                default:
                    if (!Ho(u)) throw new Tn("Cannot stringify arbitrary non-POJOs", i);
                    if (Xo(u).length > 0) throw new Tn("Cannot stringify POJOs with symbolic keys", i);
                    if (Object.getPrototypeOf(u) === null) {
                        h = '["null"';
                        for (const m in u) i.push(`.${m}`), (h += `,${Dt(m)},${o(u[m])}`), i.pop();
                        h += "]";
                    } else {
                        h = "{";
                        let m = !1;
                        for (const w in u)
                            m && (h += ","), (m = !0), i.push(`.${w}`), (h += `${Dt(w)}:${o(u[w])}`), i.pop();
                        h += "}";
                    }
            }
        return (r[c] = h), c;
    }
    const l = o(e);
    return l < 0 ? `${l}` : `[${r.join(",")}]`;
}
function Cn(e) {
    const t = typeof e;
    return t === "string"
        ? Dt(e)
        : e instanceof String
          ? Dt(e.toString())
          : e === void 0
            ? Vi.toString()
            : e === 0 && 1 / e < 0
              ? Ui.toString()
              : t === "bigint"
                ? `["BigInt","${e}"]`
                : String(e);
}
const ra = Wo;
var L;
(function (e) {
    e.assertEqual = (s) => s;
    function t(s) {}
    e.assertIs = t;
    function r(s) {
        throw new Error();
    }
    (e.assertNever = r),
        (e.arrayToEnum = (s) => {
            const i = {};
            for (const a of s) i[a] = a;
            return i;
        }),
        (e.getValidEnumValues = (s) => {
            const i = e.objectKeys(s).filter((o) => typeof s[s[o]] != "number"),
                a = {};
            for (const o of i) a[o] = s[o];
            return e.objectValues(a);
        }),
        (e.objectValues = (s) =>
            e.objectKeys(s).map(function (i) {
                return s[i];
            })),
        (e.objectKeys =
            typeof Object.keys == "function"
                ? (s) => Object.keys(s)
                : (s) => {
                      const i = [];
                      for (const a in s) Object.prototype.hasOwnProperty.call(s, a) && i.push(a);
                      return i;
                  }),
        (e.find = (s, i) => {
            for (const a of s) if (i(a)) return a;
        }),
        (e.isInteger =
            typeof Number.isInteger == "function"
                ? (s) => Number.isInteger(s)
                : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s);
    function n(s, i = " | ") {
        return s.map((a) => (typeof a == "string" ? `'${a}'` : a)).join(i);
    }
    (e.joinValues = n), (e.jsonStringifyReplacer = (s, i) => (typeof i == "bigint" ? i.toString() : i));
})(L || (L = {}));
var qn;
(function (e) {
    e.mergeShapes = (t, r) => ({ ...t, ...r });
})(qn || (qn = {}));
const E = L.arrayToEnum([
        "string",
        "nan",
        "number",
        "integer",
        "float",
        "boolean",
        "date",
        "bigint",
        "symbol",
        "function",
        "undefined",
        "null",
        "array",
        "object",
        "unknown",
        "promise",
        "void",
        "never",
        "map",
        "set",
    ]),
    pt = (e) => {
        switch (typeof e) {
            case "undefined":
                return E.undefined;
            case "string":
                return E.string;
            case "number":
                return isNaN(e) ? E.nan : E.number;
            case "boolean":
                return E.boolean;
            case "function":
                return E.function;
            case "bigint":
                return E.bigint;
            case "symbol":
                return E.symbol;
            case "object":
                return Array.isArray(e)
                    ? E.array
                    : e === null
                      ? E.null
                      : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function"
                        ? E.promise
                        : typeof Map < "u" && e instanceof Map
                          ? E.map
                          : typeof Set < "u" && e instanceof Set
                            ? E.set
                            : typeof Date < "u" && e instanceof Date
                              ? E.date
                              : E.object;
            default:
                return E.unknown;
        }
    },
    b = L.arrayToEnum([
        "invalid_type",
        "invalid_literal",
        "custom",
        "invalid_union",
        "invalid_union_discriminator",
        "invalid_enum_value",
        "unrecognized_keys",
        "invalid_arguments",
        "invalid_return_type",
        "invalid_date",
        "invalid_string",
        "too_small",
        "too_big",
        "invalid_intersection_types",
        "not_multiple_of",
        "not_finite",
    ]),
    el = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
class Ne extends Error {
    constructor(t) {
        super(),
            (this.issues = []),
            (this.addIssue = (n) => {
                this.issues = [...this.issues, n];
            }),
            (this.addIssues = (n = []) => {
                this.issues = [...this.issues, ...n];
            });
        const r = new.target.prototype;
        Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : (this.__proto__ = r),
            (this.name = "ZodError"),
            (this.issues = t);
    }
    get errors() {
        return this.issues;
    }
    format(t) {
        const r =
                t ||
                function (i) {
                    return i.message;
                },
            n = { _errors: [] },
            s = (i) => {
                for (const a of i.issues)
                    if (a.code === "invalid_union") a.unionErrors.map(s);
                    else if (a.code === "invalid_return_type") s(a.returnTypeError);
                    else if (a.code === "invalid_arguments") s(a.argumentsError);
                    else if (a.path.length === 0) n._errors.push(r(a));
                    else {
                        let o = n,
                            l = 0;
                        for (; l < a.path.length; ) {
                            const u = a.path[l];
                            l === a.path.length - 1
                                ? ((o[u] = o[u] || { _errors: [] }), o[u]._errors.push(r(a)))
                                : (o[u] = o[u] || { _errors: [] }),
                                (o = o[u]),
                                l++;
                        }
                    }
            };
        return s(this), n;
    }
    static assert(t) {
        if (!(t instanceof Ne)) throw new Error(`Not a ZodError: ${t}`);
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, L.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(t = (r) => r.message) {
        const r = {},
            n = [];
        for (const s of this.issues)
            s.path.length > 0 ? ((r[s.path[0]] = r[s.path[0]] || []), r[s.path[0]].push(t(s))) : n.push(t(s));
        return { formErrors: n, fieldErrors: r };
    }
    get formErrors() {
        return this.flatten();
    }
}
Ne.create = (e) => new Ne(e);
const Ft = (e, t) => {
    let r;
    switch (e.code) {
        case b.invalid_type:
            e.received === E.undefined ? (r = "Required") : (r = `Expected ${e.expected}, received ${e.received}`);
            break;
        case b.invalid_literal:
            r = `Invalid literal value, expected ${JSON.stringify(e.expected, L.jsonStringifyReplacer)}`;
            break;
        case b.unrecognized_keys:
            r = `Unrecognized key(s) in object: ${L.joinValues(e.keys, ", ")}`;
            break;
        case b.invalid_union:
            r = "Invalid input";
            break;
        case b.invalid_union_discriminator:
            r = `Invalid discriminator value. Expected ${L.joinValues(e.options)}`;
            break;
        case b.invalid_enum_value:
            r = `Invalid enum value. Expected ${L.joinValues(e.options)}, received '${e.received}'`;
            break;
        case b.invalid_arguments:
            r = "Invalid function arguments";
            break;
        case b.invalid_return_type:
            r = "Invalid function return type";
            break;
        case b.invalid_date:
            r = "Invalid date";
            break;
        case b.invalid_string:
            typeof e.validation == "object"
                ? "includes" in e.validation
                    ? ((r = `Invalid input: must include "${e.validation.includes}"`),
                      typeof e.validation.position == "number" &&
                          (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`))
                    : "startsWith" in e.validation
                      ? (r = `Invalid input: must start with "${e.validation.startsWith}"`)
                      : "endsWith" in e.validation
                        ? (r = `Invalid input: must end with "${e.validation.endsWith}"`)
                        : L.assertNever(e.validation)
                : e.validation !== "regex"
                  ? (r = `Invalid ${e.validation}`)
                  : (r = "Invalid");
            break;
        case b.too_small:
            e.type === "array"
                ? (r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)`)
                : e.type === "string"
                  ? (r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)`)
                  : e.type === "number"
                    ? (r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`)
                    : e.type === "date"
                      ? (r = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}`)
                      : (r = "Invalid input");
            break;
        case b.too_big:
            e.type === "array"
                ? (r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)`)
                : e.type === "string"
                  ? (r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)`)
                  : e.type === "number"
                    ? (r = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`)
                    : e.type === "bigint"
                      ? (r = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`)
                      : e.type === "date"
                        ? (r = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}`)
                        : (r = "Invalid input");
            break;
        case b.custom:
            r = "Invalid input";
            break;
        case b.invalid_intersection_types:
            r = "Intersection results could not be merged";
            break;
        case b.not_multiple_of:
            r = `Number must be a multiple of ${e.multipleOf}`;
            break;
        case b.not_finite:
            r = "Number must be finite";
            break;
        default:
            (r = t.defaultError), L.assertNever(e);
    }
    return { message: r };
};
let na = Ft;
function tl(e) {
    na = e;
}
function Xr() {
    return na;
}
const Qr = (e) => {
        const { data: t, path: r, errorMaps: n, issueData: s } = e,
            i = [...r, ...(s.path || [])],
            a = { ...s, path: i };
        if (s.message !== void 0) return { ...s, path: i, message: s.message };
        let o = "";
        const l = n
            .filter((u) => !!u)
            .slice()
            .reverse();
        for (const u of l) o = u(a, { data: t, defaultError: o }).message;
        return { ...s, path: i, message: o };
    },
    rl = [];
function $(e, t) {
    const r = Xr(),
        n = Qr({
            issueData: t,
            data: e.data,
            path: e.path,
            errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, r, r === Ft ? void 0 : Ft].filter((s) => !!s),
        });
    e.common.issues.push(n);
}
class me {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        this.value === "valid" && (this.value = "dirty");
    }
    abort() {
        this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(t, r) {
        const n = [];
        for (const s of r) {
            if (s.status === "aborted") return N;
            s.status === "dirty" && t.dirty(), n.push(s.value);
        }
        return { status: t.value, value: n };
    }
    static async mergeObjectAsync(t, r) {
        const n = [];
        for (const s of r) {
            const i = await s.key,
                a = await s.value;
            n.push({ key: i, value: a });
        }
        return me.mergeObjectSync(t, n);
    }
    static mergeObjectSync(t, r) {
        const n = {};
        for (const s of r) {
            const { key: i, value: a } = s;
            if (i.status === "aborted" || a.status === "aborted") return N;
            i.status === "dirty" && t.dirty(),
                a.status === "dirty" && t.dirty(),
                i.value !== "__proto__" && (typeof a.value < "u" || s.alwaysSet) && (n[i.value] = a.value);
        }
        return { status: t.value, value: n };
    }
}
const N = Object.freeze({ status: "aborted" }),
    Bt = (e) => ({ status: "dirty", value: e }),
    ve = (e) => ({ status: "valid", value: e }),
    Kn = (e) => e.status === "aborted",
    Fn = (e) => e.status === "dirty",
    br = (e) => e.status === "valid",
    _r = (e) => typeof Promise < "u" && e instanceof Promise;
function en(e, t, r, n) {
    if (typeof t == "function" ? e !== t || !n : !t.has(e))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return t.get(e);
}
function sa(e, t, r, n, s) {
    if (typeof t == "function" ? e !== t || !s : !t.has(e))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return t.set(e, r), r;
}
var O;
(function (e) {
    (e.errToObj = (t) => (typeof t == "string" ? { message: t } : t || {})),
        (e.toString = (t) => (typeof t == "string" ? t : t == null ? void 0 : t.message));
})(O || (O = {}));
var hr, pr;
class tt {
    constructor(t, r, n, s) {
        (this._cachedPath = []), (this.parent = t), (this.data = r), (this._path = n), (this._key = s);
    }
    get path() {
        return (
            this._cachedPath.length ||
                (this._key instanceof Array
                    ? this._cachedPath.push(...this._path, ...this._key)
                    : this._cachedPath.push(...this._path, this._key)),
            this._cachedPath
        );
    }
}
const Fs = (e, t) => {
    if (br(t)) return { success: !0, data: t.value };
    if (!e.common.issues.length) throw new Error("Validation failed but no issues detected.");
    return {
        success: !1,
        get error() {
            if (this._error) return this._error;
            const r = new Ne(e.common.issues);
            return (this._error = r), this._error;
        },
    };
};
function j(e) {
    if (!e) return {};
    const { errorMap: t, invalid_type_error: r, required_error: n, description: s } = e;
    if (t && (r || n))
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return t
        ? { errorMap: t, description: s }
        : {
              errorMap: (a, o) => {
                  var l, u;
                  const { message: c } = e;
                  return a.code === "invalid_enum_value"
                      ? { message: c ?? o.defaultError }
                      : typeof o.data > "u"
                        ? { message: (l = c ?? n) !== null && l !== void 0 ? l : o.defaultError }
                        : a.code !== "invalid_type"
                          ? { message: o.defaultError }
                          : { message: (u = c ?? r) !== null && u !== void 0 ? u : o.defaultError };
              },
              description: s,
          };
}
class P {
    constructor(t) {
        (this.spa = this.safeParseAsync),
            (this._def = t),
            (this.parse = this.parse.bind(this)),
            (this.safeParse = this.safeParse.bind(this)),
            (this.parseAsync = this.parseAsync.bind(this)),
            (this.safeParseAsync = this.safeParseAsync.bind(this)),
            (this.spa = this.spa.bind(this)),
            (this.refine = this.refine.bind(this)),
            (this.refinement = this.refinement.bind(this)),
            (this.superRefine = this.superRefine.bind(this)),
            (this.optional = this.optional.bind(this)),
            (this.nullable = this.nullable.bind(this)),
            (this.nullish = this.nullish.bind(this)),
            (this.array = this.array.bind(this)),
            (this.promise = this.promise.bind(this)),
            (this.or = this.or.bind(this)),
            (this.and = this.and.bind(this)),
            (this.transform = this.transform.bind(this)),
            (this.brand = this.brand.bind(this)),
            (this.default = this.default.bind(this)),
            (this.catch = this.catch.bind(this)),
            (this.describe = this.describe.bind(this)),
            (this.pipe = this.pipe.bind(this)),
            (this.readonly = this.readonly.bind(this)),
            (this.isNullable = this.isNullable.bind(this)),
            (this.isOptional = this.isOptional.bind(this));
    }
    get description() {
        return this._def.description;
    }
    _getType(t) {
        return pt(t.data);
    }
    _getOrReturnCtx(t, r) {
        return (
            r || {
                common: t.parent.common,
                data: t.data,
                parsedType: pt(t.data),
                schemaErrorMap: this._def.errorMap,
                path: t.path,
                parent: t.parent,
            }
        );
    }
    _processInputParams(t) {
        return {
            status: new me(),
            ctx: {
                common: t.parent.common,
                data: t.data,
                parsedType: pt(t.data),
                schemaErrorMap: this._def.errorMap,
                path: t.path,
                parent: t.parent,
            },
        };
    }
    _parseSync(t) {
        const r = this._parse(t);
        if (_r(r)) throw new Error("Synchronous parse encountered promise.");
        return r;
    }
    _parseAsync(t) {
        const r = this._parse(t);
        return Promise.resolve(r);
    }
    parse(t, r) {
        const n = this.safeParse(t, r);
        if (n.success) return n.data;
        throw n.error;
    }
    safeParse(t, r) {
        var n;
        const s = {
                common: {
                    issues: [],
                    async: (n = r == null ? void 0 : r.async) !== null && n !== void 0 ? n : !1,
                    contextualErrorMap: r == null ? void 0 : r.errorMap,
                },
                path: (r == null ? void 0 : r.path) || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: t,
                parsedType: pt(t),
            },
            i = this._parseSync({ data: t, path: s.path, parent: s });
        return Fs(s, i);
    }
    async parseAsync(t, r) {
        const n = await this.safeParseAsync(t, r);
        if (n.success) return n.data;
        throw n.error;
    }
    async safeParseAsync(t, r) {
        const n = {
                common: { issues: [], contextualErrorMap: r == null ? void 0 : r.errorMap, async: !0 },
                path: (r == null ? void 0 : r.path) || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: t,
                parsedType: pt(t),
            },
            s = this._parse({ data: t, path: n.path, parent: n }),
            i = await (_r(s) ? s : Promise.resolve(s));
        return Fs(n, i);
    }
    refine(t, r) {
        const n = (s) => (typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(s) : r);
        return this._refinement((s, i) => {
            const a = t(s),
                o = () => i.addIssue({ code: b.custom, ...n(s) });
            return typeof Promise < "u" && a instanceof Promise
                ? a.then((l) => (l ? !0 : (o(), !1)))
                : a
                  ? !0
                  : (o(), !1);
        });
    }
    refinement(t, r) {
        return this._refinement((n, s) => (t(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1)));
    }
    _refinement(t) {
        return new We({ schema: this, typeName: C.ZodEffects, effect: { type: "refinement", refinement: t } });
    }
    superRefine(t) {
        return this._refinement(t);
    }
    optional() {
        return et.create(this, this._def);
    }
    nullable() {
        return bt.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return Ue.create(this, this._def);
    }
    promise() {
        return Vt.create(this, this._def);
    }
    or(t) {
        return xr.create([this, t], this._def);
    }
    and(t) {
        return Er.create(this, t, this._def);
    }
    transform(t) {
        return new We({
            ...j(this._def),
            schema: this,
            typeName: C.ZodEffects,
            effect: { type: "transform", transform: t },
        });
    }
    default(t) {
        const r = typeof t == "function" ? t : () => t;
        return new Cr({ ...j(this._def), innerType: this, defaultValue: r, typeName: C.ZodDefault });
    }
    brand() {
        return new cs({ typeName: C.ZodBranded, type: this, ...j(this._def) });
    }
    catch(t) {
        const r = typeof t == "function" ? t : () => t;
        return new Ir({ ...j(this._def), innerType: this, catchValue: r, typeName: C.ZodCatch });
    }
    describe(t) {
        const r = this.constructor;
        return new r({ ...this._def, description: t });
    }
    pipe(t) {
        return Pr.create(this, t);
    }
    readonly() {
        return Nr.create(this);
    }
    isOptional() {
        return this.safeParse(void 0).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
const nl = /^c[^\s-]{8,}$/i,
    sl = /^[0-9a-z]+$/,
    il = /^[0-9A-HJKMNP-TV-Z]{26}$/,
    al = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
    ol = /^[a-z0-9_-]{21}$/i,
    ll =
        /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
    ul = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
    cl = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let In;
const dl =
        /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    fl =
        /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    hl = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    ia =
        "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
    pl = new RegExp(`^${ia}$`);
function aa(e) {
    let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
    return e.precision ? (t = `${t}\\.\\d{${e.precision}}`) : e.precision == null && (t = `${t}(\\.\\d+)?`), t;
}
function ml(e) {
    return new RegExp(`^${aa(e)}$`);
}
function oa(e) {
    let t = `${ia}T${aa(e)}`;
    const r = [];
    return (
        r.push(e.local ? "Z?" : "Z"),
        e.offset && r.push("([+-]\\d{2}:?\\d{2})"),
        (t = `${t}(${r.join("|")})`),
        new RegExp(`^${t}$`)
    );
}
function gl(e, t) {
    return !!(((t === "v4" || !t) && dl.test(e)) || ((t === "v6" || !t) && fl.test(e)));
}
class Ze extends P {
    _parse(t) {
        if ((this._def.coerce && (t.data = String(t.data)), this._getType(t) !== E.string)) {
            const i = this._getOrReturnCtx(t);
            return $(i, { code: b.invalid_type, expected: E.string, received: i.parsedType }), N;
        }
        const n = new me();
        let s;
        for (const i of this._def.checks)
            if (i.kind === "min")
                t.data.length < i.value &&
                    ((s = this._getOrReturnCtx(t, s)),
                    $(s, {
                        code: b.too_small,
                        minimum: i.value,
                        type: "string",
                        inclusive: !0,
                        exact: !1,
                        message: i.message,
                    }),
                    n.dirty());
            else if (i.kind === "max")
                t.data.length > i.value &&
                    ((s = this._getOrReturnCtx(t, s)),
                    $(s, {
                        code: b.too_big,
                        maximum: i.value,
                        type: "string",
                        inclusive: !0,
                        exact: !1,
                        message: i.message,
                    }),
                    n.dirty());
            else if (i.kind === "length") {
                const a = t.data.length > i.value,
                    o = t.data.length < i.value;
                (a || o) &&
                    ((s = this._getOrReturnCtx(t, s)),
                    a
                        ? $(s, {
                              code: b.too_big,
                              maximum: i.value,
                              type: "string",
                              inclusive: !0,
                              exact: !0,
                              message: i.message,
                          })
                        : o &&
                          $(s, {
                              code: b.too_small,
                              minimum: i.value,
                              type: "string",
                              inclusive: !0,
                              exact: !0,
                              message: i.message,
                          }),
                    n.dirty());
            } else if (i.kind === "email")
                ul.test(t.data) ||
                    ((s = this._getOrReturnCtx(t, s)),
                    $(s, { validation: "email", code: b.invalid_string, message: i.message }),
                    n.dirty());
            else if (i.kind === "emoji")
                In || (In = new RegExp(cl, "u")),
                    In.test(t.data) ||
                        ((s = this._getOrReturnCtx(t, s)),
                        $(s, { validation: "emoji", code: b.invalid_string, message: i.message }),
                        n.dirty());
            else if (i.kind === "uuid")
                al.test(t.data) ||
                    ((s = this._getOrReturnCtx(t, s)),
                    $(s, { validation: "uuid", code: b.invalid_string, message: i.message }),
                    n.dirty());
            else if (i.kind === "nanoid")
                ol.test(t.data) ||
                    ((s = this._getOrReturnCtx(t, s)),
                    $(s, { validation: "nanoid", code: b.invalid_string, message: i.message }),
                    n.dirty());
            else if (i.kind === "cuid")
                nl.test(t.data) ||
                    ((s = this._getOrReturnCtx(t, s)),
                    $(s, { validation: "cuid", code: b.invalid_string, message: i.message }),
                    n.dirty());
            else if (i.kind === "cuid2")
                sl.test(t.data) ||
                    ((s = this._getOrReturnCtx(t, s)),
                    $(s, { validation: "cuid2", code: b.invalid_string, message: i.message }),
                    n.dirty());
            else if (i.kind === "ulid")
                il.test(t.data) ||
                    ((s = this._getOrReturnCtx(t, s)),
                    $(s, { validation: "ulid", code: b.invalid_string, message: i.message }),
                    n.dirty());
            else if (i.kind === "url")
                try {
                    new URL(t.data);
                } catch {
                    (s = this._getOrReturnCtx(t, s)),
                        $(s, { validation: "url", code: b.invalid_string, message: i.message }),
                        n.dirty();
                }
            else
                i.kind === "regex"
                    ? ((i.regex.lastIndex = 0),
                      i.regex.test(t.data) ||
                          ((s = this._getOrReturnCtx(t, s)),
                          $(s, { validation: "regex", code: b.invalid_string, message: i.message }),
                          n.dirty()))
                    : i.kind === "trim"
                      ? (t.data = t.data.trim())
                      : i.kind === "includes"
                        ? t.data.includes(i.value, i.position) ||
                          ((s = this._getOrReturnCtx(t, s)),
                          $(s, {
                              code: b.invalid_string,
                              validation: { includes: i.value, position: i.position },
                              message: i.message,
                          }),
                          n.dirty())
                        : i.kind === "toLowerCase"
                          ? (t.data = t.data.toLowerCase())
                          : i.kind === "toUpperCase"
                            ? (t.data = t.data.toUpperCase())
                            : i.kind === "startsWith"
                              ? t.data.startsWith(i.value) ||
                                ((s = this._getOrReturnCtx(t, s)),
                                $(s, {
                                    code: b.invalid_string,
                                    validation: { startsWith: i.value },
                                    message: i.message,
                                }),
                                n.dirty())
                              : i.kind === "endsWith"
                                ? t.data.endsWith(i.value) ||
                                  ((s = this._getOrReturnCtx(t, s)),
                                  $(s, {
                                      code: b.invalid_string,
                                      validation: { endsWith: i.value },
                                      message: i.message,
                                  }),
                                  n.dirty())
                                : i.kind === "datetime"
                                  ? oa(i).test(t.data) ||
                                    ((s = this._getOrReturnCtx(t, s)),
                                    $(s, { code: b.invalid_string, validation: "datetime", message: i.message }),
                                    n.dirty())
                                  : i.kind === "date"
                                    ? pl.test(t.data) ||
                                      ((s = this._getOrReturnCtx(t, s)),
                                      $(s, { code: b.invalid_string, validation: "date", message: i.message }),
                                      n.dirty())
                                    : i.kind === "time"
                                      ? ml(i).test(t.data) ||
                                        ((s = this._getOrReturnCtx(t, s)),
                                        $(s, { code: b.invalid_string, validation: "time", message: i.message }),
                                        n.dirty())
                                      : i.kind === "duration"
                                        ? ll.test(t.data) ||
                                          ((s = this._getOrReturnCtx(t, s)),
                                          $(s, { validation: "duration", code: b.invalid_string, message: i.message }),
                                          n.dirty())
                                        : i.kind === "ip"
                                          ? gl(t.data, i.version) ||
                                            ((s = this._getOrReturnCtx(t, s)),
                                            $(s, { validation: "ip", code: b.invalid_string, message: i.message }),
                                            n.dirty())
                                          : i.kind === "base64"
                                            ? hl.test(t.data) ||
                                              ((s = this._getOrReturnCtx(t, s)),
                                              $(s, {
                                                  validation: "base64",
                                                  code: b.invalid_string,
                                                  message: i.message,
                                              }),
                                              n.dirty())
                                            : L.assertNever(i);
        return { status: n.value, value: t.data };
    }
    _regex(t, r, n) {
        return this.refinement((s) => t.test(s), { validation: r, code: b.invalid_string, ...O.errToObj(n) });
    }
    _addCheck(t) {
        return new Ze({ ...this._def, checks: [...this._def.checks, t] });
    }
    email(t) {
        return this._addCheck({ kind: "email", ...O.errToObj(t) });
    }
    url(t) {
        return this._addCheck({ kind: "url", ...O.errToObj(t) });
    }
    emoji(t) {
        return this._addCheck({ kind: "emoji", ...O.errToObj(t) });
    }
    uuid(t) {
        return this._addCheck({ kind: "uuid", ...O.errToObj(t) });
    }
    nanoid(t) {
        return this._addCheck({ kind: "nanoid", ...O.errToObj(t) });
    }
    cuid(t) {
        return this._addCheck({ kind: "cuid", ...O.errToObj(t) });
    }
    cuid2(t) {
        return this._addCheck({ kind: "cuid2", ...O.errToObj(t) });
    }
    ulid(t) {
        return this._addCheck({ kind: "ulid", ...O.errToObj(t) });
    }
    base64(t) {
        return this._addCheck({ kind: "base64", ...O.errToObj(t) });
    }
    ip(t) {
        return this._addCheck({ kind: "ip", ...O.errToObj(t) });
    }
    datetime(t) {
        var r, n;
        return typeof t == "string"
            ? this._addCheck({ kind: "datetime", precision: null, offset: !1, local: !1, message: t })
            : this._addCheck({
                  kind: "datetime",
                  precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
                  offset: (r = t == null ? void 0 : t.offset) !== null && r !== void 0 ? r : !1,
                  local: (n = t == null ? void 0 : t.local) !== null && n !== void 0 ? n : !1,
                  ...O.errToObj(t == null ? void 0 : t.message),
              });
    }
    date(t) {
        return this._addCheck({ kind: "date", message: t });
    }
    time(t) {
        return typeof t == "string"
            ? this._addCheck({ kind: "time", precision: null, message: t })
            : this._addCheck({
                  kind: "time",
                  precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
                  ...O.errToObj(t == null ? void 0 : t.message),
              });
    }
    duration(t) {
        return this._addCheck({ kind: "duration", ...O.errToObj(t) });
    }
    regex(t, r) {
        return this._addCheck({ kind: "regex", regex: t, ...O.errToObj(r) });
    }
    includes(t, r) {
        return this._addCheck({
            kind: "includes",
            value: t,
            position: r == null ? void 0 : r.position,
            ...O.errToObj(r == null ? void 0 : r.message),
        });
    }
    startsWith(t, r) {
        return this._addCheck({ kind: "startsWith", value: t, ...O.errToObj(r) });
    }
    endsWith(t, r) {
        return this._addCheck({ kind: "endsWith", value: t, ...O.errToObj(r) });
    }
    min(t, r) {
        return this._addCheck({ kind: "min", value: t, ...O.errToObj(r) });
    }
    max(t, r) {
        return this._addCheck({ kind: "max", value: t, ...O.errToObj(r) });
    }
    length(t, r) {
        return this._addCheck({ kind: "length", value: t, ...O.errToObj(r) });
    }
    nonempty(t) {
        return this.min(1, O.errToObj(t));
    }
    trim() {
        return new Ze({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
    }
    toLowerCase() {
        return new Ze({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
    }
    toUpperCase() {
        return new Ze({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
    }
    get isDatetime() {
        return !!this._def.checks.find((t) => t.kind === "datetime");
    }
    get isDate() {
        return !!this._def.checks.find((t) => t.kind === "date");
    }
    get isTime() {
        return !!this._def.checks.find((t) => t.kind === "time");
    }
    get isDuration() {
        return !!this._def.checks.find((t) => t.kind === "duration");
    }
    get isEmail() {
        return !!this._def.checks.find((t) => t.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((t) => t.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((t) => t.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((t) => t.kind === "uuid");
    }
    get isNANOID() {
        return !!this._def.checks.find((t) => t.kind === "nanoid");
    }
    get isCUID() {
        return !!this._def.checks.find((t) => t.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((t) => t.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((t) => t.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((t) => t.kind === "ip");
    }
    get isBase64() {
        return !!this._def.checks.find((t) => t.kind === "base64");
    }
    get minLength() {
        let t = null;
        for (const r of this._def.checks) r.kind === "min" && (t === null || r.value > t) && (t = r.value);
        return t;
    }
    get maxLength() {
        let t = null;
        for (const r of this._def.checks) r.kind === "max" && (t === null || r.value < t) && (t = r.value);
        return t;
    }
}
Ze.create = (e) => {
    var t;
    return new Ze({
        checks: [],
        typeName: C.ZodString,
        coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
        ...j(e),
    });
};
function yl(e, t) {
    const r = (e.toString().split(".")[1] || "").length,
        n = (t.toString().split(".")[1] || "").length,
        s = r > n ? r : n,
        i = parseInt(e.toFixed(s).replace(".", "")),
        a = parseInt(t.toFixed(s).replace(".", ""));
    return (i % a) / Math.pow(10, s);
}
class gt extends P {
    constructor() {
        super(...arguments), (this.min = this.gte), (this.max = this.lte), (this.step = this.multipleOf);
    }
    _parse(t) {
        if ((this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== E.number)) {
            const i = this._getOrReturnCtx(t);
            return $(i, { code: b.invalid_type, expected: E.number, received: i.parsedType }), N;
        }
        let n;
        const s = new me();
        for (const i of this._def.checks)
            i.kind === "int"
                ? L.isInteger(t.data) ||
                  ((n = this._getOrReturnCtx(t, n)),
                  $(n, { code: b.invalid_type, expected: "integer", received: "float", message: i.message }),
                  s.dirty())
                : i.kind === "min"
                  ? (i.inclusive ? t.data < i.value : t.data <= i.value) &&
                    ((n = this._getOrReturnCtx(t, n)),
                    $(n, {
                        code: b.too_small,
                        minimum: i.value,
                        type: "number",
                        inclusive: i.inclusive,
                        exact: !1,
                        message: i.message,
                    }),
                    s.dirty())
                  : i.kind === "max"
                    ? (i.inclusive ? t.data > i.value : t.data >= i.value) &&
                      ((n = this._getOrReturnCtx(t, n)),
                      $(n, {
                          code: b.too_big,
                          maximum: i.value,
                          type: "number",
                          inclusive: i.inclusive,
                          exact: !1,
                          message: i.message,
                      }),
                      s.dirty())
                    : i.kind === "multipleOf"
                      ? yl(t.data, i.value) !== 0 &&
                        ((n = this._getOrReturnCtx(t, n)),
                        $(n, { code: b.not_multiple_of, multipleOf: i.value, message: i.message }),
                        s.dirty())
                      : i.kind === "finite"
                        ? Number.isFinite(t.data) ||
                          ((n = this._getOrReturnCtx(t, n)),
                          $(n, { code: b.not_finite, message: i.message }),
                          s.dirty())
                        : L.assertNever(i);
        return { status: s.value, value: t.data };
    }
    gte(t, r) {
        return this.setLimit("min", t, !0, O.toString(r));
    }
    gt(t, r) {
        return this.setLimit("min", t, !1, O.toString(r));
    }
    lte(t, r) {
        return this.setLimit("max", t, !0, O.toString(r));
    }
    lt(t, r) {
        return this.setLimit("max", t, !1, O.toString(r));
    }
    setLimit(t, r, n, s) {
        return new gt({
            ...this._def,
            checks: [...this._def.checks, { kind: t, value: r, inclusive: n, message: O.toString(s) }],
        });
    }
    _addCheck(t) {
        return new gt({ ...this._def, checks: [...this._def.checks, t] });
    }
    int(t) {
        return this._addCheck({ kind: "int", message: O.toString(t) });
    }
    positive(t) {
        return this._addCheck({ kind: "min", value: 0, inclusive: !1, message: O.toString(t) });
    }
    negative(t) {
        return this._addCheck({ kind: "max", value: 0, inclusive: !1, message: O.toString(t) });
    }
    nonpositive(t) {
        return this._addCheck({ kind: "max", value: 0, inclusive: !0, message: O.toString(t) });
    }
    nonnegative(t) {
        return this._addCheck({ kind: "min", value: 0, inclusive: !0, message: O.toString(t) });
    }
    multipleOf(t, r) {
        return this._addCheck({ kind: "multipleOf", value: t, message: O.toString(r) });
    }
    finite(t) {
        return this._addCheck({ kind: "finite", message: O.toString(t) });
    }
    safe(t) {
        return this._addCheck({
            kind: "min",
            inclusive: !0,
            value: Number.MIN_SAFE_INTEGER,
            message: O.toString(t),
        })._addCheck({ kind: "max", inclusive: !0, value: Number.MAX_SAFE_INTEGER, message: O.toString(t) });
    }
    get minValue() {
        let t = null;
        for (const r of this._def.checks) r.kind === "min" && (t === null || r.value > t) && (t = r.value);
        return t;
    }
    get maxValue() {
        let t = null;
        for (const r of this._def.checks) r.kind === "max" && (t === null || r.value < t) && (t = r.value);
        return t;
    }
    get isInt() {
        return !!this._def.checks.find((t) => t.kind === "int" || (t.kind === "multipleOf" && L.isInteger(t.value)));
    }
    get isFinite() {
        let t = null,
            r = null;
        for (const n of this._def.checks) {
            if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf") return !0;
            n.kind === "min"
                ? (r === null || n.value > r) && (r = n.value)
                : n.kind === "max" && (t === null || n.value < t) && (t = n.value);
        }
        return Number.isFinite(r) && Number.isFinite(t);
    }
}
gt.create = (e) =>
    new gt({ checks: [], typeName: C.ZodNumber, coerce: (e == null ? void 0 : e.coerce) || !1, ...j(e) });
class yt extends P {
    constructor() {
        super(...arguments), (this.min = this.gte), (this.max = this.lte);
    }
    _parse(t) {
        if ((this._def.coerce && (t.data = BigInt(t.data)), this._getType(t) !== E.bigint)) {
            const i = this._getOrReturnCtx(t);
            return $(i, { code: b.invalid_type, expected: E.bigint, received: i.parsedType }), N;
        }
        let n;
        const s = new me();
        for (const i of this._def.checks)
            i.kind === "min"
                ? (i.inclusive ? t.data < i.value : t.data <= i.value) &&
                  ((n = this._getOrReturnCtx(t, n)),
                  $(n, {
                      code: b.too_small,
                      type: "bigint",
                      minimum: i.value,
                      inclusive: i.inclusive,
                      message: i.message,
                  }),
                  s.dirty())
                : i.kind === "max"
                  ? (i.inclusive ? t.data > i.value : t.data >= i.value) &&
                    ((n = this._getOrReturnCtx(t, n)),
                    $(n, {
                        code: b.too_big,
                        type: "bigint",
                        maximum: i.value,
                        inclusive: i.inclusive,
                        message: i.message,
                    }),
                    s.dirty())
                  : i.kind === "multipleOf"
                    ? t.data % i.value !== BigInt(0) &&
                      ((n = this._getOrReturnCtx(t, n)),
                      $(n, { code: b.not_multiple_of, multipleOf: i.value, message: i.message }),
                      s.dirty())
                    : L.assertNever(i);
        return { status: s.value, value: t.data };
    }
    gte(t, r) {
        return this.setLimit("min", t, !0, O.toString(r));
    }
    gt(t, r) {
        return this.setLimit("min", t, !1, O.toString(r));
    }
    lte(t, r) {
        return this.setLimit("max", t, !0, O.toString(r));
    }
    lt(t, r) {
        return this.setLimit("max", t, !1, O.toString(r));
    }
    setLimit(t, r, n, s) {
        return new yt({
            ...this._def,
            checks: [...this._def.checks, { kind: t, value: r, inclusive: n, message: O.toString(s) }],
        });
    }
    _addCheck(t) {
        return new yt({ ...this._def, checks: [...this._def.checks, t] });
    }
    positive(t) {
        return this._addCheck({ kind: "min", value: BigInt(0), inclusive: !1, message: O.toString(t) });
    }
    negative(t) {
        return this._addCheck({ kind: "max", value: BigInt(0), inclusive: !1, message: O.toString(t) });
    }
    nonpositive(t) {
        return this._addCheck({ kind: "max", value: BigInt(0), inclusive: !0, message: O.toString(t) });
    }
    nonnegative(t) {
        return this._addCheck({ kind: "min", value: BigInt(0), inclusive: !0, message: O.toString(t) });
    }
    multipleOf(t, r) {
        return this._addCheck({ kind: "multipleOf", value: t, message: O.toString(r) });
    }
    get minValue() {
        let t = null;
        for (const r of this._def.checks) r.kind === "min" && (t === null || r.value > t) && (t = r.value);
        return t;
    }
    get maxValue() {
        let t = null;
        for (const r of this._def.checks) r.kind === "max" && (t === null || r.value < t) && (t = r.value);
        return t;
    }
}
yt.create = (e) => {
    var t;
    return new yt({
        checks: [],
        typeName: C.ZodBigInt,
        coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
        ...j(e),
    });
};
class kr extends P {
    _parse(t) {
        if ((this._def.coerce && (t.data = !!t.data), this._getType(t) !== E.boolean)) {
            const n = this._getOrReturnCtx(t);
            return $(n, { code: b.invalid_type, expected: E.boolean, received: n.parsedType }), N;
        }
        return ve(t.data);
    }
}
kr.create = (e) => new kr({ typeName: C.ZodBoolean, coerce: (e == null ? void 0 : e.coerce) || !1, ...j(e) });
class St extends P {
    _parse(t) {
        if ((this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== E.date)) {
            const i = this._getOrReturnCtx(t);
            return $(i, { code: b.invalid_type, expected: E.date, received: i.parsedType }), N;
        }
        if (isNaN(t.data.getTime())) {
            const i = this._getOrReturnCtx(t);
            return $(i, { code: b.invalid_date }), N;
        }
        const n = new me();
        let s;
        for (const i of this._def.checks)
            i.kind === "min"
                ? t.data.getTime() < i.value &&
                  ((s = this._getOrReturnCtx(t, s)),
                  $(s, {
                      code: b.too_small,
                      message: i.message,
                      inclusive: !0,
                      exact: !1,
                      minimum: i.value,
                      type: "date",
                  }),
                  n.dirty())
                : i.kind === "max"
                  ? t.data.getTime() > i.value &&
                    ((s = this._getOrReturnCtx(t, s)),
                    $(s, {
                        code: b.too_big,
                        message: i.message,
                        inclusive: !0,
                        exact: !1,
                        maximum: i.value,
                        type: "date",
                    }),
                    n.dirty())
                  : L.assertNever(i);
        return { status: n.value, value: new Date(t.data.getTime()) };
    }
    _addCheck(t) {
        return new St({ ...this._def, checks: [...this._def.checks, t] });
    }
    min(t, r) {
        return this._addCheck({ kind: "min", value: t.getTime(), message: O.toString(r) });
    }
    max(t, r) {
        return this._addCheck({ kind: "max", value: t.getTime(), message: O.toString(r) });
    }
    get minDate() {
        let t = null;
        for (const r of this._def.checks) r.kind === "min" && (t === null || r.value > t) && (t = r.value);
        return t != null ? new Date(t) : null;
    }
    get maxDate() {
        let t = null;
        for (const r of this._def.checks) r.kind === "max" && (t === null || r.value < t) && (t = r.value);
        return t != null ? new Date(t) : null;
    }
}
St.create = (e) => new St({ checks: [], coerce: (e == null ? void 0 : e.coerce) || !1, typeName: C.ZodDate, ...j(e) });
class tn extends P {
    _parse(t) {
        if (this._getType(t) !== E.symbol) {
            const n = this._getOrReturnCtx(t);
            return $(n, { code: b.invalid_type, expected: E.symbol, received: n.parsedType }), N;
        }
        return ve(t.data);
    }
}
tn.create = (e) => new tn({ typeName: C.ZodSymbol, ...j(e) });
class wr extends P {
    _parse(t) {
        if (this._getType(t) !== E.undefined) {
            const n = this._getOrReturnCtx(t);
            return $(n, { code: b.invalid_type, expected: E.undefined, received: n.parsedType }), N;
        }
        return ve(t.data);
    }
}
wr.create = (e) => new wr({ typeName: C.ZodUndefined, ...j(e) });
class $r extends P {
    _parse(t) {
        if (this._getType(t) !== E.null) {
            const n = this._getOrReturnCtx(t);
            return $(n, { code: b.invalid_type, expected: E.null, received: n.parsedType }), N;
        }
        return ve(t.data);
    }
}
$r.create = (e) => new $r({ typeName: C.ZodNull, ...j(e) });
class Zt extends P {
    constructor() {
        super(...arguments), (this._any = !0);
    }
    _parse(t) {
        return ve(t.data);
    }
}
Zt.create = (e) => new Zt({ typeName: C.ZodAny, ...j(e) });
class At extends P {
    constructor() {
        super(...arguments), (this._unknown = !0);
    }
    _parse(t) {
        return ve(t.data);
    }
}
At.create = (e) => new At({ typeName: C.ZodUnknown, ...j(e) });
class lt extends P {
    _parse(t) {
        const r = this._getOrReturnCtx(t);
        return $(r, { code: b.invalid_type, expected: E.never, received: r.parsedType }), N;
    }
}
lt.create = (e) => new lt({ typeName: C.ZodNever, ...j(e) });
class rn extends P {
    _parse(t) {
        if (this._getType(t) !== E.undefined) {
            const n = this._getOrReturnCtx(t);
            return $(n, { code: b.invalid_type, expected: E.void, received: n.parsedType }), N;
        }
        return ve(t.data);
    }
}
rn.create = (e) => new rn({ typeName: C.ZodVoid, ...j(e) });
class Ue extends P {
    _parse(t) {
        const { ctx: r, status: n } = this._processInputParams(t),
            s = this._def;
        if (r.parsedType !== E.array)
            return $(r, { code: b.invalid_type, expected: E.array, received: r.parsedType }), N;
        if (s.exactLength !== null) {
            const a = r.data.length > s.exactLength.value,
                o = r.data.length < s.exactLength.value;
            (a || o) &&
                ($(r, {
                    code: a ? b.too_big : b.too_small,
                    minimum: o ? s.exactLength.value : void 0,
                    maximum: a ? s.exactLength.value : void 0,
                    type: "array",
                    inclusive: !0,
                    exact: !0,
                    message: s.exactLength.message,
                }),
                n.dirty());
        }
        if (
            (s.minLength !== null &&
                r.data.length < s.minLength.value &&
                ($(r, {
                    code: b.too_small,
                    minimum: s.minLength.value,
                    type: "array",
                    inclusive: !0,
                    exact: !1,
                    message: s.minLength.message,
                }),
                n.dirty()),
            s.maxLength !== null &&
                r.data.length > s.maxLength.value &&
                ($(r, {
                    code: b.too_big,
                    maximum: s.maxLength.value,
                    type: "array",
                    inclusive: !0,
                    exact: !1,
                    message: s.maxLength.message,
                }),
                n.dirty()),
            r.common.async)
        )
            return Promise.all([...r.data].map((a, o) => s.type._parseAsync(new tt(r, a, r.path, o)))).then((a) =>
                me.mergeArray(n, a),
            );
        const i = [...r.data].map((a, o) => s.type._parseSync(new tt(r, a, r.path, o)));
        return me.mergeArray(n, i);
    }
    get element() {
        return this._def.type;
    }
    min(t, r) {
        return new Ue({ ...this._def, minLength: { value: t, message: O.toString(r) } });
    }
    max(t, r) {
        return new Ue({ ...this._def, maxLength: { value: t, message: O.toString(r) } });
    }
    length(t, r) {
        return new Ue({ ...this._def, exactLength: { value: t, message: O.toString(r) } });
    }
    nonempty(t) {
        return this.min(1, t);
    }
}
Ue.create = (e, t) =>
    new Ue({ type: e, minLength: null, maxLength: null, exactLength: null, typeName: C.ZodArray, ...j(t) });
function jt(e) {
    if (e instanceof U) {
        const t = {};
        for (const r in e.shape) {
            const n = e.shape[r];
            t[r] = et.create(jt(n));
        }
        return new U({ ...e._def, shape: () => t });
    } else
        return e instanceof Ue
            ? new Ue({ ...e._def, type: jt(e.element) })
            : e instanceof et
              ? et.create(jt(e.unwrap()))
              : e instanceof bt
                ? bt.create(jt(e.unwrap()))
                : e instanceof rt
                  ? rt.create(e.items.map((t) => jt(t)))
                  : e;
}
class U extends P {
    constructor() {
        super(...arguments), (this._cached = null), (this.nonstrict = this.passthrough), (this.augment = this.extend);
    }
    _getCached() {
        if (this._cached !== null) return this._cached;
        const t = this._def.shape(),
            r = L.objectKeys(t);
        return (this._cached = { shape: t, keys: r });
    }
    _parse(t) {
        if (this._getType(t) !== E.object) {
            const u = this._getOrReturnCtx(t);
            return $(u, { code: b.invalid_type, expected: E.object, received: u.parsedType }), N;
        }
        const { status: n, ctx: s } = this._processInputParams(t),
            { shape: i, keys: a } = this._getCached(),
            o = [];
        if (!(this._def.catchall instanceof lt && this._def.unknownKeys === "strip"))
            for (const u in s.data) a.includes(u) || o.push(u);
        const l = [];
        for (const u of a) {
            const c = i[u],
                h = s.data[u];
            l.push({
                key: { status: "valid", value: u },
                value: c._parse(new tt(s, h, s.path, u)),
                alwaysSet: u in s.data,
            });
        }
        if (this._def.catchall instanceof lt) {
            const u = this._def.unknownKeys;
            if (u === "passthrough")
                for (const c of o)
                    l.push({ key: { status: "valid", value: c }, value: { status: "valid", value: s.data[c] } });
            else if (u === "strict") o.length > 0 && ($(s, { code: b.unrecognized_keys, keys: o }), n.dirty());
            else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
        } else {
            const u = this._def.catchall;
            for (const c of o) {
                const h = s.data[c];
                l.push({
                    key: { status: "valid", value: c },
                    value: u._parse(new tt(s, h, s.path, c)),
                    alwaysSet: c in s.data,
                });
            }
        }
        return s.common.async
            ? Promise.resolve()
                  .then(async () => {
                      const u = [];
                      for (const c of l) {
                          const h = await c.key,
                              x = await c.value;
                          u.push({ key: h, value: x, alwaysSet: c.alwaysSet });
                      }
                      return u;
                  })
                  .then((u) => me.mergeObjectSync(n, u))
            : me.mergeObjectSync(n, l);
    }
    get shape() {
        return this._def.shape();
    }
    strict(t) {
        return (
            O.errToObj,
            new U({
                ...this._def,
                unknownKeys: "strict",
                ...(t !== void 0
                    ? {
                          errorMap: (r, n) => {
                              var s, i, a, o;
                              const l =
                                  (a =
                                      (i = (s = this._def).errorMap) === null || i === void 0
                                          ? void 0
                                          : i.call(s, r, n).message) !== null && a !== void 0
                                      ? a
                                      : n.defaultError;
                              return r.code === "unrecognized_keys"
                                  ? { message: (o = O.errToObj(t).message) !== null && o !== void 0 ? o : l }
                                  : { message: l };
                          },
                      }
                    : {}),
            })
        );
    }
    strip() {
        return new U({ ...this._def, unknownKeys: "strip" });
    }
    passthrough() {
        return new U({ ...this._def, unknownKeys: "passthrough" });
    }
    extend(t) {
        return new U({ ...this._def, shape: () => ({ ...this._def.shape(), ...t }) });
    }
    merge(t) {
        return new U({
            unknownKeys: t._def.unknownKeys,
            catchall: t._def.catchall,
            shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
            typeName: C.ZodObject,
        });
    }
    setKey(t, r) {
        return this.augment({ [t]: r });
    }
    catchall(t) {
        return new U({ ...this._def, catchall: t });
    }
    pick(t) {
        const r = {};
        return (
            L.objectKeys(t).forEach((n) => {
                t[n] && this.shape[n] && (r[n] = this.shape[n]);
            }),
            new U({ ...this._def, shape: () => r })
        );
    }
    omit(t) {
        const r = {};
        return (
            L.objectKeys(this.shape).forEach((n) => {
                t[n] || (r[n] = this.shape[n]);
            }),
            new U({ ...this._def, shape: () => r })
        );
    }
    deepPartial() {
        return jt(this);
    }
    partial(t) {
        const r = {};
        return (
            L.objectKeys(this.shape).forEach((n) => {
                const s = this.shape[n];
                t && !t[n] ? (r[n] = s) : (r[n] = s.optional());
            }),
            new U({ ...this._def, shape: () => r })
        );
    }
    required(t) {
        const r = {};
        return (
            L.objectKeys(this.shape).forEach((n) => {
                if (t && !t[n]) r[n] = this.shape[n];
                else {
                    let i = this.shape[n];
                    for (; i instanceof et; ) i = i._def.innerType;
                    r[n] = i;
                }
            }),
            new U({ ...this._def, shape: () => r })
        );
    }
    keyof() {
        return la(L.objectKeys(this.shape));
    }
}
U.create = (e, t) =>
    new U({ shape: () => e, unknownKeys: "strip", catchall: lt.create(), typeName: C.ZodObject, ...j(t) });
U.strictCreate = (e, t) =>
    new U({ shape: () => e, unknownKeys: "strict", catchall: lt.create(), typeName: C.ZodObject, ...j(t) });
U.lazycreate = (e, t) =>
    new U({ shape: e, unknownKeys: "strip", catchall: lt.create(), typeName: C.ZodObject, ...j(t) });
class xr extends P {
    _parse(t) {
        const { ctx: r } = this._processInputParams(t),
            n = this._def.options;
        function s(i) {
            for (const o of i) if (o.result.status === "valid") return o.result;
            for (const o of i)
                if (o.result.status === "dirty") return r.common.issues.push(...o.ctx.common.issues), o.result;
            const a = i.map((o) => new Ne(o.ctx.common.issues));
            return $(r, { code: b.invalid_union, unionErrors: a }), N;
        }
        if (r.common.async)
            return Promise.all(
                n.map(async (i) => {
                    const a = { ...r, common: { ...r.common, issues: [] }, parent: null };
                    return { result: await i._parseAsync({ data: r.data, path: r.path, parent: a }), ctx: a };
                }),
            ).then(s);
        {
            let i;
            const a = [];
            for (const l of n) {
                const u = { ...r, common: { ...r.common, issues: [] }, parent: null },
                    c = l._parseSync({ data: r.data, path: r.path, parent: u });
                if (c.status === "valid") return c;
                c.status === "dirty" && !i && (i = { result: c, ctx: u }),
                    u.common.issues.length && a.push(u.common.issues);
            }
            if (i) return r.common.issues.push(...i.ctx.common.issues), i.result;
            const o = a.map((l) => new Ne(l));
            return $(r, { code: b.invalid_union, unionErrors: o }), N;
        }
    }
    get options() {
        return this._def.options;
    }
}
xr.create = (e, t) => new xr({ options: e, typeName: C.ZodUnion, ...j(t) });
const at = (e) =>
    e instanceof Sr
        ? at(e.schema)
        : e instanceof We
          ? at(e.innerType())
          : e instanceof Or
            ? [e.value]
            : e instanceof vt
              ? e.options
              : e instanceof Tr
                ? L.objectValues(e.enum)
                : e instanceof Cr
                  ? at(e._def.innerType)
                  : e instanceof wr
                    ? [void 0]
                    : e instanceof $r
                      ? [null]
                      : e instanceof et
                        ? [void 0, ...at(e.unwrap())]
                        : e instanceof bt
                          ? [null, ...at(e.unwrap())]
                          : e instanceof cs || e instanceof Nr
                            ? at(e.unwrap())
                            : e instanceof Ir
                              ? at(e._def.innerType)
                              : [];
class kn extends P {
    _parse(t) {
        const { ctx: r } = this._processInputParams(t);
        if (r.parsedType !== E.object)
            return $(r, { code: b.invalid_type, expected: E.object, received: r.parsedType }), N;
        const n = this.discriminator,
            s = r.data[n],
            i = this.optionsMap.get(s);
        return i
            ? r.common.async
                ? i._parseAsync({ data: r.data, path: r.path, parent: r })
                : i._parseSync({ data: r.data, path: r.path, parent: r })
            : ($(r, { code: b.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [n] }),
              N);
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    static create(t, r, n) {
        const s = new Map();
        for (const i of r) {
            const a = at(i.shape[t]);
            if (!a.length)
                throw new Error(
                    `A discriminator value for key \`${t}\` could not be extracted from all schema options`,
                );
            for (const o of a) {
                if (s.has(o)) throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(o)}`);
                s.set(o, i);
            }
        }
        return new kn({ typeName: C.ZodDiscriminatedUnion, discriminator: t, options: r, optionsMap: s, ...j(n) });
    }
}
function Zn(e, t) {
    const r = pt(e),
        n = pt(t);
    if (e === t) return { valid: !0, data: e };
    if (r === E.object && n === E.object) {
        const s = L.objectKeys(t),
            i = L.objectKeys(e).filter((o) => s.indexOf(o) !== -1),
            a = { ...e, ...t };
        for (const o of i) {
            const l = Zn(e[o], t[o]);
            if (!l.valid) return { valid: !1 };
            a[o] = l.data;
        }
        return { valid: !0, data: a };
    } else if (r === E.array && n === E.array) {
        if (e.length !== t.length) return { valid: !1 };
        const s = [];
        for (let i = 0; i < e.length; i++) {
            const a = e[i],
                o = t[i],
                l = Zn(a, o);
            if (!l.valid) return { valid: !1 };
            s.push(l.data);
        }
        return { valid: !0, data: s };
    } else return r === E.date && n === E.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
class Er extends P {
    _parse(t) {
        const { status: r, ctx: n } = this._processInputParams(t),
            s = (i, a) => {
                if (Kn(i) || Kn(a)) return N;
                const o = Zn(i.value, a.value);
                return o.valid
                    ? ((Fn(i) || Fn(a)) && r.dirty(), { status: r.value, value: o.data })
                    : ($(n, { code: b.invalid_intersection_types }), N);
            };
        return n.common.async
            ? Promise.all([
                  this._def.left._parseAsync({ data: n.data, path: n.path, parent: n }),
                  this._def.right._parseAsync({ data: n.data, path: n.path, parent: n }),
              ]).then(([i, a]) => s(i, a))
            : s(
                  this._def.left._parseSync({ data: n.data, path: n.path, parent: n }),
                  this._def.right._parseSync({ data: n.data, path: n.path, parent: n }),
              );
    }
}
Er.create = (e, t, r) => new Er({ left: e, right: t, typeName: C.ZodIntersection, ...j(r) });
class rt extends P {
    _parse(t) {
        const { status: r, ctx: n } = this._processInputParams(t);
        if (n.parsedType !== E.array)
            return $(n, { code: b.invalid_type, expected: E.array, received: n.parsedType }), N;
        if (n.data.length < this._def.items.length)
            return (
                $(n, { code: b.too_small, minimum: this._def.items.length, inclusive: !0, exact: !1, type: "array" }), N
            );
        !this._def.rest &&
            n.data.length > this._def.items.length &&
            ($(n, { code: b.too_big, maximum: this._def.items.length, inclusive: !0, exact: !1, type: "array" }),
            r.dirty());
        const i = [...n.data]
            .map((a, o) => {
                const l = this._def.items[o] || this._def.rest;
                return l ? l._parse(new tt(n, a, n.path, o)) : null;
            })
            .filter((a) => !!a);
        return n.common.async ? Promise.all(i).then((a) => me.mergeArray(r, a)) : me.mergeArray(r, i);
    }
    get items() {
        return this._def.items;
    }
    rest(t) {
        return new rt({ ...this._def, rest: t });
    }
}
rt.create = (e, t) => {
    if (!Array.isArray(e)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new rt({ items: e, typeName: C.ZodTuple, rest: null, ...j(t) });
};
class Ar extends P {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(t) {
        const { status: r, ctx: n } = this._processInputParams(t);
        if (n.parsedType !== E.object)
            return $(n, { code: b.invalid_type, expected: E.object, received: n.parsedType }), N;
        const s = [],
            i = this._def.keyType,
            a = this._def.valueType;
        for (const o in n.data)
            s.push({
                key: i._parse(new tt(n, o, n.path, o)),
                value: a._parse(new tt(n, n.data[o], n.path, o)),
                alwaysSet: o in n.data,
            });
        return n.common.async ? me.mergeObjectAsync(r, s) : me.mergeObjectSync(r, s);
    }
    get element() {
        return this._def.valueType;
    }
    static create(t, r, n) {
        return r instanceof P
            ? new Ar({ keyType: t, valueType: r, typeName: C.ZodRecord, ...j(n) })
            : new Ar({ keyType: Ze.create(), valueType: t, typeName: C.ZodRecord, ...j(r) });
    }
}
class nn extends P {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(t) {
        const { status: r, ctx: n } = this._processInputParams(t);
        if (n.parsedType !== E.map) return $(n, { code: b.invalid_type, expected: E.map, received: n.parsedType }), N;
        const s = this._def.keyType,
            i = this._def.valueType,
            a = [...n.data.entries()].map(([o, l], u) => ({
                key: s._parse(new tt(n, o, n.path, [u, "key"])),
                value: i._parse(new tt(n, l, n.path, [u, "value"])),
            }));
        if (n.common.async) {
            const o = new Map();
            return Promise.resolve().then(async () => {
                for (const l of a) {
                    const u = await l.key,
                        c = await l.value;
                    if (u.status === "aborted" || c.status === "aborted") return N;
                    (u.status === "dirty" || c.status === "dirty") && r.dirty(), o.set(u.value, c.value);
                }
                return { status: r.value, value: o };
            });
        } else {
            const o = new Map();
            for (const l of a) {
                const u = l.key,
                    c = l.value;
                if (u.status === "aborted" || c.status === "aborted") return N;
                (u.status === "dirty" || c.status === "dirty") && r.dirty(), o.set(u.value, c.value);
            }
            return { status: r.value, value: o };
        }
    }
}
nn.create = (e, t, r) => new nn({ valueType: t, keyType: e, typeName: C.ZodMap, ...j(r) });
class Ot extends P {
    _parse(t) {
        const { status: r, ctx: n } = this._processInputParams(t);
        if (n.parsedType !== E.set) return $(n, { code: b.invalid_type, expected: E.set, received: n.parsedType }), N;
        const s = this._def;
        s.minSize !== null &&
            n.data.size < s.minSize.value &&
            ($(n, {
                code: b.too_small,
                minimum: s.minSize.value,
                type: "set",
                inclusive: !0,
                exact: !1,
                message: s.minSize.message,
            }),
            r.dirty()),
            s.maxSize !== null &&
                n.data.size > s.maxSize.value &&
                ($(n, {
                    code: b.too_big,
                    maximum: s.maxSize.value,
                    type: "set",
                    inclusive: !0,
                    exact: !1,
                    message: s.maxSize.message,
                }),
                r.dirty());
        const i = this._def.valueType;
        function a(l) {
            const u = new Set();
            for (const c of l) {
                if (c.status === "aborted") return N;
                c.status === "dirty" && r.dirty(), u.add(c.value);
            }
            return { status: r.value, value: u };
        }
        const o = [...n.data.values()].map((l, u) => i._parse(new tt(n, l, n.path, u)));
        return n.common.async ? Promise.all(o).then((l) => a(l)) : a(o);
    }
    min(t, r) {
        return new Ot({ ...this._def, minSize: { value: t, message: O.toString(r) } });
    }
    max(t, r) {
        return new Ot({ ...this._def, maxSize: { value: t, message: O.toString(r) } });
    }
    size(t, r) {
        return this.min(t, r).max(t, r);
    }
    nonempty(t) {
        return this.min(1, t);
    }
}
Ot.create = (e, t) => new Ot({ valueType: e, minSize: null, maxSize: null, typeName: C.ZodSet, ...j(t) });
class qt extends P {
    constructor() {
        super(...arguments), (this.validate = this.implement);
    }
    _parse(t) {
        const { ctx: r } = this._processInputParams(t);
        if (r.parsedType !== E.function)
            return $(r, { code: b.invalid_type, expected: E.function, received: r.parsedType }), N;
        function n(o, l) {
            return Qr({
                data: o,
                path: r.path,
                errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, Xr(), Ft].filter((u) => !!u),
                issueData: { code: b.invalid_arguments, argumentsError: l },
            });
        }
        function s(o, l) {
            return Qr({
                data: o,
                path: r.path,
                errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, Xr(), Ft].filter((u) => !!u),
                issueData: { code: b.invalid_return_type, returnTypeError: l },
            });
        }
        const i = { errorMap: r.common.contextualErrorMap },
            a = r.data;
        if (this._def.returns instanceof Vt) {
            const o = this;
            return ve(async function (...l) {
                const u = new Ne([]),
                    c = await o._def.args.parseAsync(l, i).catch((g) => {
                        throw (u.addIssue(n(l, g)), u);
                    }),
                    h = await Reflect.apply(a, this, c);
                return await o._def.returns._def.type.parseAsync(h, i).catch((g) => {
                    throw (u.addIssue(s(h, g)), u);
                });
            });
        } else {
            const o = this;
            return ve(function (...l) {
                const u = o._def.args.safeParse(l, i);
                if (!u.success) throw new Ne([n(l, u.error)]);
                const c = Reflect.apply(a, this, u.data),
                    h = o._def.returns.safeParse(c, i);
                if (!h.success) throw new Ne([s(c, h.error)]);
                return h.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...t) {
        return new qt({ ...this._def, args: rt.create(t).rest(At.create()) });
    }
    returns(t) {
        return new qt({ ...this._def, returns: t });
    }
    implement(t) {
        return this.parse(t);
    }
    strictImplement(t) {
        return this.parse(t);
    }
    static create(t, r, n) {
        return new qt({
            args: t || rt.create([]).rest(At.create()),
            returns: r || At.create(),
            typeName: C.ZodFunction,
            ...j(n),
        });
    }
}
class Sr extends P {
    get schema() {
        return this._def.getter();
    }
    _parse(t) {
        const { ctx: r } = this._processInputParams(t);
        return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
    }
}
Sr.create = (e, t) => new Sr({ getter: e, typeName: C.ZodLazy, ...j(t) });
class Or extends P {
    _parse(t) {
        if (t.data !== this._def.value) {
            const r = this._getOrReturnCtx(t);
            return $(r, { received: r.data, code: b.invalid_literal, expected: this._def.value }), N;
        }
        return { status: "valid", value: t.data };
    }
    get value() {
        return this._def.value;
    }
}
Or.create = (e, t) => new Or({ value: e, typeName: C.ZodLiteral, ...j(t) });
function la(e, t) {
    return new vt({ values: e, typeName: C.ZodEnum, ...j(t) });
}
class vt extends P {
    constructor() {
        super(...arguments), hr.set(this, void 0);
    }
    _parse(t) {
        if (typeof t.data != "string") {
            const r = this._getOrReturnCtx(t),
                n = this._def.values;
            return $(r, { expected: L.joinValues(n), received: r.parsedType, code: b.invalid_type }), N;
        }
        if ((en(this, hr) || sa(this, hr, new Set(this._def.values)), !en(this, hr).has(t.data))) {
            const r = this._getOrReturnCtx(t),
                n = this._def.values;
            return $(r, { received: r.data, code: b.invalid_enum_value, options: n }), N;
        }
        return ve(t.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const t = {};
        for (const r of this._def.values) t[r] = r;
        return t;
    }
    get Values() {
        const t = {};
        for (const r of this._def.values) t[r] = r;
        return t;
    }
    get Enum() {
        const t = {};
        for (const r of this._def.values) t[r] = r;
        return t;
    }
    extract(t, r = this._def) {
        return vt.create(t, { ...this._def, ...r });
    }
    exclude(t, r = this._def) {
        return vt.create(
            this.options.filter((n) => !t.includes(n)),
            { ...this._def, ...r },
        );
    }
}
hr = new WeakMap();
vt.create = la;
class Tr extends P {
    constructor() {
        super(...arguments), pr.set(this, void 0);
    }
    _parse(t) {
        const r = L.getValidEnumValues(this._def.values),
            n = this._getOrReturnCtx(t);
        if (n.parsedType !== E.string && n.parsedType !== E.number) {
            const s = L.objectValues(r);
            return $(n, { expected: L.joinValues(s), received: n.parsedType, code: b.invalid_type }), N;
        }
        if (
            (en(this, pr) || sa(this, pr, new Set(L.getValidEnumValues(this._def.values))), !en(this, pr).has(t.data))
        ) {
            const s = L.objectValues(r);
            return $(n, { received: n.data, code: b.invalid_enum_value, options: s }), N;
        }
        return ve(t.data);
    }
    get enum() {
        return this._def.values;
    }
}
pr = new WeakMap();
Tr.create = (e, t) => new Tr({ values: e, typeName: C.ZodNativeEnum, ...j(t) });
class Vt extends P {
    unwrap() {
        return this._def.type;
    }
    _parse(t) {
        const { ctx: r } = this._processInputParams(t);
        if (r.parsedType !== E.promise && r.common.async === !1)
            return $(r, { code: b.invalid_type, expected: E.promise, received: r.parsedType }), N;
        const n = r.parsedType === E.promise ? r.data : Promise.resolve(r.data);
        return ve(n.then((s) => this._def.type.parseAsync(s, { path: r.path, errorMap: r.common.contextualErrorMap })));
    }
}
Vt.create = (e, t) => new Vt({ type: e, typeName: C.ZodPromise, ...j(t) });
class We extends P {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === C.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(t) {
        const { status: r, ctx: n } = this._processInputParams(t),
            s = this._def.effect || null,
            i = {
                addIssue: (a) => {
                    $(n, a), a.fatal ? r.abort() : r.dirty();
                },
                get path() {
                    return n.path;
                },
            };
        if (((i.addIssue = i.addIssue.bind(i)), s.type === "preprocess")) {
            const a = s.transform(n.data, i);
            if (n.common.async)
                return Promise.resolve(a).then(async (o) => {
                    if (r.value === "aborted") return N;
                    const l = await this._def.schema._parseAsync({ data: o, path: n.path, parent: n });
                    return l.status === "aborted" ? N : l.status === "dirty" || r.value === "dirty" ? Bt(l.value) : l;
                });
            {
                if (r.value === "aborted") return N;
                const o = this._def.schema._parseSync({ data: a, path: n.path, parent: n });
                return o.status === "aborted" ? N : o.status === "dirty" || r.value === "dirty" ? Bt(o.value) : o;
            }
        }
        if (s.type === "refinement") {
            const a = (o) => {
                const l = s.refinement(o, i);
                if (n.common.async) return Promise.resolve(l);
                if (l instanceof Promise)
                    throw new Error(
                        "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
                    );
                return o;
            };
            if (n.common.async === !1) {
                const o = this._def.schema._parseSync({ data: n.data, path: n.path, parent: n });
                return o.status === "aborted"
                    ? N
                    : (o.status === "dirty" && r.dirty(), a(o.value), { status: r.value, value: o.value });
            } else
                return this._def.schema
                    ._parseAsync({ data: n.data, path: n.path, parent: n })
                    .then((o) =>
                        o.status === "aborted"
                            ? N
                            : (o.status === "dirty" && r.dirty(),
                              a(o.value).then(() => ({ status: r.value, value: o.value }))),
                    );
        }
        if (s.type === "transform")
            if (n.common.async === !1) {
                const a = this._def.schema._parseSync({ data: n.data, path: n.path, parent: n });
                if (!br(a)) return a;
                const o = s.transform(a.value, i);
                if (o instanceof Promise)
                    throw new Error(
                        "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
                    );
                return { status: r.value, value: o };
            } else
                return this._def.schema
                    ._parseAsync({ data: n.data, path: n.path, parent: n })
                    .then((a) =>
                        br(a)
                            ? Promise.resolve(s.transform(a.value, i)).then((o) => ({ status: r.value, value: o }))
                            : a,
                    );
        L.assertNever(s);
    }
}
We.create = (e, t, r) => new We({ schema: e, typeName: C.ZodEffects, effect: t, ...j(r) });
We.createWithPreprocess = (e, t, r) =>
    new We({ schema: t, effect: { type: "preprocess", transform: e }, typeName: C.ZodEffects, ...j(r) });
class et extends P {
    _parse(t) {
        return this._getType(t) === E.undefined ? ve(void 0) : this._def.innerType._parse(t);
    }
    unwrap() {
        return this._def.innerType;
    }
}
et.create = (e, t) => new et({ innerType: e, typeName: C.ZodOptional, ...j(t) });
class bt extends P {
    _parse(t) {
        return this._getType(t) === E.null ? ve(null) : this._def.innerType._parse(t);
    }
    unwrap() {
        return this._def.innerType;
    }
}
bt.create = (e, t) => new bt({ innerType: e, typeName: C.ZodNullable, ...j(t) });
class Cr extends P {
    _parse(t) {
        const { ctx: r } = this._processInputParams(t);
        let n = r.data;
        return (
            r.parsedType === E.undefined && (n = this._def.defaultValue()),
            this._def.innerType._parse({ data: n, path: r.path, parent: r })
        );
    }
    removeDefault() {
        return this._def.innerType;
    }
}
Cr.create = (e, t) =>
    new Cr({
        innerType: e,
        typeName: C.ZodDefault,
        defaultValue: typeof t.default == "function" ? t.default : () => t.default,
        ...j(t),
    });
class Ir extends P {
    _parse(t) {
        const { ctx: r } = this._processInputParams(t),
            n = { ...r, common: { ...r.common, issues: [] } },
            s = this._def.innerType._parse({ data: n.data, path: n.path, parent: { ...n } });
        return _r(s)
            ? s.then((i) => ({
                  status: "valid",
                  value:
                      i.status === "valid"
                          ? i.value
                          : this._def.catchValue({
                                get error() {
                                    return new Ne(n.common.issues);
                                },
                                input: n.data,
                            }),
              }))
            : {
                  status: "valid",
                  value:
                      s.status === "valid"
                          ? s.value
                          : this._def.catchValue({
                                get error() {
                                    return new Ne(n.common.issues);
                                },
                                input: n.data,
                            }),
              };
    }
    removeCatch() {
        return this._def.innerType;
    }
}
Ir.create = (e, t) =>
    new Ir({
        innerType: e,
        typeName: C.ZodCatch,
        catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
        ...j(t),
    });
class sn extends P {
    _parse(t) {
        if (this._getType(t) !== E.nan) {
            const n = this._getOrReturnCtx(t);
            return $(n, { code: b.invalid_type, expected: E.nan, received: n.parsedType }), N;
        }
        return { status: "valid", value: t.data };
    }
}
sn.create = (e) => new sn({ typeName: C.ZodNaN, ...j(e) });
const vl = Symbol("zod_brand");
class cs extends P {
    _parse(t) {
        const { ctx: r } = this._processInputParams(t),
            n = r.data;
        return this._def.type._parse({ data: n, path: r.path, parent: r });
    }
    unwrap() {
        return this._def.type;
    }
}
class Pr extends P {
    _parse(t) {
        const { status: r, ctx: n } = this._processInputParams(t);
        if (n.common.async)
            return (async () => {
                const i = await this._def.in._parseAsync({ data: n.data, path: n.path, parent: n });
                return i.status === "aborted"
                    ? N
                    : i.status === "dirty"
                      ? (r.dirty(), Bt(i.value))
                      : this._def.out._parseAsync({ data: i.value, path: n.path, parent: n });
            })();
        {
            const s = this._def.in._parseSync({ data: n.data, path: n.path, parent: n });
            return s.status === "aborted"
                ? N
                : s.status === "dirty"
                  ? (r.dirty(), { status: "dirty", value: s.value })
                  : this._def.out._parseSync({ data: s.value, path: n.path, parent: n });
        }
    }
    static create(t, r) {
        return new Pr({ in: t, out: r, typeName: C.ZodPipeline });
    }
}
class Nr extends P {
    _parse(t) {
        const r = this._def.innerType._parse(t),
            n = (s) => (br(s) && (s.value = Object.freeze(s.value)), s);
        return _r(r) ? r.then((s) => n(s)) : n(r);
    }
    unwrap() {
        return this._def.innerType;
    }
}
Nr.create = (e, t) => new Nr({ innerType: e, typeName: C.ZodReadonly, ...j(t) });
function ua(e, t = {}, r) {
    return e
        ? Zt.create().superRefine((n, s) => {
              var i, a;
              if (!e(n)) {
                  const o = typeof t == "function" ? t(n) : typeof t == "string" ? { message: t } : t,
                      l = (a = (i = o.fatal) !== null && i !== void 0 ? i : r) !== null && a !== void 0 ? a : !0,
                      u = typeof o == "string" ? { message: o } : o;
                  s.addIssue({ code: "custom", ...u, fatal: l });
              }
          })
        : Zt.create();
}
const bl = { object: U.lazycreate };
var C;
(function (e) {
    (e.ZodString = "ZodString"),
        (e.ZodNumber = "ZodNumber"),
        (e.ZodNaN = "ZodNaN"),
        (e.ZodBigInt = "ZodBigInt"),
        (e.ZodBoolean = "ZodBoolean"),
        (e.ZodDate = "ZodDate"),
        (e.ZodSymbol = "ZodSymbol"),
        (e.ZodUndefined = "ZodUndefined"),
        (e.ZodNull = "ZodNull"),
        (e.ZodAny = "ZodAny"),
        (e.ZodUnknown = "ZodUnknown"),
        (e.ZodNever = "ZodNever"),
        (e.ZodVoid = "ZodVoid"),
        (e.ZodArray = "ZodArray"),
        (e.ZodObject = "ZodObject"),
        (e.ZodUnion = "ZodUnion"),
        (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
        (e.ZodIntersection = "ZodIntersection"),
        (e.ZodTuple = "ZodTuple"),
        (e.ZodRecord = "ZodRecord"),
        (e.ZodMap = "ZodMap"),
        (e.ZodSet = "ZodSet"),
        (e.ZodFunction = "ZodFunction"),
        (e.ZodLazy = "ZodLazy"),
        (e.ZodLiteral = "ZodLiteral"),
        (e.ZodEnum = "ZodEnum"),
        (e.ZodEffects = "ZodEffects"),
        (e.ZodNativeEnum = "ZodNativeEnum"),
        (e.ZodOptional = "ZodOptional"),
        (e.ZodNullable = "ZodNullable"),
        (e.ZodDefault = "ZodDefault"),
        (e.ZodCatch = "ZodCatch"),
        (e.ZodPromise = "ZodPromise"),
        (e.ZodBranded = "ZodBranded"),
        (e.ZodPipeline = "ZodPipeline"),
        (e.ZodReadonly = "ZodReadonly");
})(C || (C = {}));
const _l = (e, t = { message: `Input not instance of ${e.name}` }) => ua((r) => r instanceof e, t),
    ca = Ze.create,
    da = gt.create,
    kl = sn.create,
    wl = yt.create,
    fa = kr.create,
    $l = St.create,
    xl = tn.create,
    El = wr.create,
    Al = $r.create,
    Sl = Zt.create,
    Ol = At.create,
    Tl = lt.create,
    Cl = rn.create,
    Il = Ue.create,
    Nl = U.create,
    Rl = U.strictCreate,
    Ml = xr.create,
    jl = kn.create,
    Pl = Er.create,
    zl = rt.create,
    Ll = Ar.create,
    Dl = nn.create,
    Bl = Ot.create,
    ql = qt.create,
    Kl = Sr.create,
    Fl = Or.create,
    Zl = vt.create,
    Vl = Tr.create,
    Ul = Vt.create,
    Zs = We.create,
    Wl = et.create,
    Jl = bt.create,
    Hl = We.createWithPreprocess,
    Gl = Pr.create,
    Yl = () => ca().optional(),
    Xl = () => da().optional(),
    Ql = () => fa().optional(),
    eu = {
        string: (e) => Ze.create({ ...e, coerce: !0 }),
        number: (e) => gt.create({ ...e, coerce: !0 }),
        boolean: (e) => kr.create({ ...e, coerce: !0 }),
        bigint: (e) => yt.create({ ...e, coerce: !0 }),
        date: (e) => St.create({ ...e, coerce: !0 }),
    },
    tu = N;
var wm = Object.freeze({
    __proto__: null,
    defaultErrorMap: Ft,
    setErrorMap: tl,
    getErrorMap: Xr,
    makeIssue: Qr,
    EMPTY_PATH: rl,
    addIssueToContext: $,
    ParseStatus: me,
    INVALID: N,
    DIRTY: Bt,
    OK: ve,
    isAborted: Kn,
    isDirty: Fn,
    isValid: br,
    isAsync: _r,
    get util() {
        return L;
    },
    get objectUtil() {
        return qn;
    },
    ZodParsedType: E,
    getParsedType: pt,
    ZodType: P,
    datetimeRegex: oa,
    ZodString: Ze,
    ZodNumber: gt,
    ZodBigInt: yt,
    ZodBoolean: kr,
    ZodDate: St,
    ZodSymbol: tn,
    ZodUndefined: wr,
    ZodNull: $r,
    ZodAny: Zt,
    ZodUnknown: At,
    ZodNever: lt,
    ZodVoid: rn,
    ZodArray: Ue,
    ZodObject: U,
    ZodUnion: xr,
    ZodDiscriminatedUnion: kn,
    ZodIntersection: Er,
    ZodTuple: rt,
    ZodRecord: Ar,
    ZodMap: nn,
    ZodSet: Ot,
    ZodFunction: qt,
    ZodLazy: Sr,
    ZodLiteral: Or,
    ZodEnum: vt,
    ZodNativeEnum: Tr,
    ZodPromise: Vt,
    ZodEffects: We,
    ZodTransformer: We,
    ZodOptional: et,
    ZodNullable: bt,
    ZodDefault: Cr,
    ZodCatch: Ir,
    ZodNaN: sn,
    BRAND: vl,
    ZodBranded: cs,
    ZodPipeline: Pr,
    ZodReadonly: Nr,
    custom: ua,
    Schema: P,
    ZodSchema: P,
    late: bl,
    get ZodFirstPartyTypeKind() {
        return C;
    },
    coerce: eu,
    any: Sl,
    array: Il,
    bigint: wl,
    boolean: fa,
    date: $l,
    discriminatedUnion: jl,
    effect: Zs,
    enum: Zl,
    function: ql,
    instanceof: _l,
    intersection: Pl,
    lazy: Kl,
    literal: Fl,
    map: Dl,
    nan: kl,
    nativeEnum: Vl,
    never: Tl,
    null: Al,
    nullable: Jl,
    number: da,
    object: Nl,
    oboolean: Ql,
    onumber: Xl,
    optional: Wl,
    ostring: Yl,
    pipeline: Gl,
    preprocess: Hl,
    promise: Ul,
    record: Ll,
    set: Bl,
    strictObject: Rl,
    string: ca,
    symbol: xl,
    transformer: Zs,
    tuple: zl,
    undefined: El,
    union: Ml,
    unknown: Ol,
    void: Cl,
    NEVER: tu,
    ZodIssueCode: b,
    quotelessJson: el,
    ZodError: Ne,
});
function Vn(e, t, r) {
    return (e[t] = r), "skip";
}
function ru(e, t) {
    return t.value !== void 0 && typeof t.value != "object" && t.path.length < e.length;
}
function ft(e, t, r = {}) {
    r.modifier || (r.modifier = (s) => (ru(t, s) ? void 0 : s.value));
    const n = nt(e, t, r.modifier);
    if (n) return r.value === void 0 || r.value(n.value) ? n : void 0;
}
function nt(e, t, r) {
    if (!t.length) return;
    const n = [t[0]];
    let s = e;
    for (; s && n.length < t.length; ) {
        const a = n[n.length - 1],
            o = r
                ? r({
                      parent: s,
                      key: String(a),
                      value: s[a],
                      path: n.map((l) => String(l)),
                      isLeaf: !1,
                      set: (l) => Vn(s, a, l),
                  })
                : s[a];
        if (o === void 0) return;
        (s = o), n.push(t[n.length]);
    }
    if (!s) return;
    const i = t[t.length - 1];
    return {
        parent: s,
        key: String(i),
        value: s[i],
        path: t.map((a) => String(a)),
        isLeaf: !0,
        set: (a) => Vn(s, i, a),
    };
}
function ot(e, t, r = []) {
    for (const n in e) {
        const s = e[n],
            i = s === null || typeof s != "object",
            a = { parent: e, key: n, value: s, path: r.concat([n]), isLeaf: i, set: (l) => Vn(e, n, l) },
            o = t(a);
        if (o === "abort") return o;
        if (o === "skip") continue;
        if (!i) {
            const l = ot(s, t, a.path);
            if (l === "abort") return l;
        }
    }
}
function nu(e, t) {
    return e === t || (e.size === t.size && [...e].every((r) => t.has(r)));
}
function Vs(e, t) {
    const r = new Map();
    function n(a, o) {
        return (
            (a instanceof Date && o instanceof Date && a.getTime() !== o.getTime()) ||
            (a instanceof Set && o instanceof Set && !nu(a, o)) ||
            (a instanceof File && o instanceof File && a !== o)
        );
    }
    function s(a) {
        return a instanceof Date || a instanceof Set || a instanceof File;
    }
    function i(a, o) {
        const l = o ? nt(o, a.path) : void 0;
        function u() {
            return r.set(a.path.join(" "), a.path), "skip";
        }
        if (s(a.value) && (!s(l == null ? void 0 : l.value) || n(a.value, l.value))) return u();
        a.isLeaf && (!l || a.value !== l.value) && u();
    }
    return ot(e, (a) => i(a, t)), ot(t, (a) => i(a, e)), Array.from(r.values());
}
function Qe(e, t, r) {
    const n = typeof r == "function";
    for (const s of t) {
        const i = nt(
            e,
            s,
            ({ parent: a, key: o, value: l }) => ((l === void 0 || typeof l != "object") && (a[o] = {}), a[o]),
        );
        i && (i.parent[i.key] = n ? r(s, i) : r);
    }
}
function Kt(e) {
    return e
        .toString()
        .split(/[[\].]+/)
        .filter((t) => t);
}
function Pt(e) {
    return e.reduce((t, r) => {
        const n = String(r);
        return typeof r == "number" || /^\d+$/.test(n) ? (t += `[${n}]`) : t ? (t += `.${n}`) : (t += n), t;
    }, "");
}
var su = mr;
function mr(e) {
    let t = e;
    var r = {}.toString.call(e).slice(8, -1);
    if (r == "Set") return new Set([...e].map((s) => mr(s)));
    if (r == "Map") return new Map([...e].map((s) => [mr(s[0]), mr(s[1])]));
    if (r == "Date") return new Date(e.getTime());
    if (r == "RegExp") return RegExp(e.source, iu(e));
    if (r == "Array" || r == "Object") {
        t = Array.isArray(e) ? [] : {};
        for (var n in e) t[n] = mr(e[n]);
    }
    return t;
}
function iu(e) {
    if (typeof e.source.flags == "string") return e.source.flags;
    var t = [];
    return (
        e.global && t.push("g"),
        e.ignoreCase && t.push("i"),
        e.multiline && t.push("m"),
        e.sticky && t.push("y"),
        e.unicode && t.push("u"),
        t.join("")
    );
}
function Ee(e) {
    return e && typeof e == "object" ? su(e) : e;
}
class le extends Error {
    constructor(t) {
        super(t), Object.setPrototypeOf(this, le.prototype);
    }
}
function au(e, t) {
    var s;
    const r = {};
    function n(i) {
        if (("_errors" in r || (r._errors = []), !Array.isArray(r._errors)))
            if (typeof r._errors == "string") r._errors = [r._errors];
            else throw new le("Form-level error was not an array.");
        r._errors.push(i.message);
    }
    for (const i of e) {
        if (!i.path || (i.path.length == 1 && !i.path[0])) {
            n(i);
            continue;
        }
        const o =
                !/^\d$/.test(String(i.path[i.path.length - 1])) &&
                ((s = ft(
                    t,
                    i.path.filter((h) => /\D/.test(String(h))),
                )) == null
                    ? void 0
                    : s.value),
            l = nt(r, i.path, ({ value: h, parent: x, key: g }) => (h === void 0 && (x[g] = {}), x[g]));
        if (!l) {
            n(i);
            continue;
        }
        const { parent: u, key: c } = l;
        o
            ? (c in u || (u[c] = {}), "_errors" in u[c] ? u[c]._errors.push(i.message) : (u[c]._errors = [i.message]))
            : c in u
              ? u[c].push(i.message)
              : (u[c] = [i.message]);
    }
    return r;
}
function Us(e, t, r) {
    return r
        ? e
        : (ot(t, (n) => {
              Array.isArray(n.value) && n.set(void 0);
          }),
          ot(e, (n) => {
              (!Array.isArray(n.value) && n.value !== void 0) || Qe(t, [n.path], n.value);
          }),
          t);
}
function ou(e) {
    return ha(e, []);
}
function ha(e, t) {
    return Object.entries(e)
        .filter(([, n]) => n !== void 0)
        .flatMap(([n, s]) => {
            if (Array.isArray(s) && s.length > 0) {
                const i = t.concat([n]);
                return { path: Pt(i), messages: s };
            } else return ha(e[n], t.concat([n]));
        });
}
function Ws(e) {
    !e.flashMessage ||
        !ra ||
        (Un(e) && (document.cookie = `flash=; Max-Age=0; Path=${e.flashMessage.cookiePath ?? "/"};`));
}
function Un(e) {
    return !e.flashMessage || !ra ? !1 : e.syncFlashMessage;
}
function lu(e) {
    const t = JSON.parse(e);
    return t.data && (t.data = Fo(t.data)), t;
}
function Js(e) {
    return HTMLElement.prototype.cloneNode.call(e);
}
function uu(e, t = () => {}) {
    const r = async ({ action: s, result: i, reset: a = !0, invalidateAll: o = !0 }) => {
        i.type === "success" && (a && HTMLFormElement.prototype.reset.call(e), o && (await Wi())),
            (location.origin + location.pathname === s.origin + s.pathname ||
                i.type === "redirect" ||
                i.type === "error") &&
                Wr(i);
    };
    async function n(s) {
        var _, y, m, w;
        if (
            ((_ = s.submitter) != null && _.hasAttribute("formmethod") ? s.submitter.formMethod : Js(e).method) !==
            "post"
        )
            return;
        s.preventDefault();
        const a = new URL(
                (y = s.submitter) != null && y.hasAttribute("formaction") ? s.submitter.formAction : Js(e).action,
            ),
            o = new FormData(e),
            l = (m = s.submitter) == null ? void 0 : m.getAttribute("name");
        l && o.append(l, ((w = s.submitter) == null ? void 0 : w.getAttribute("value")) ?? "");
        const u = new AbortController();
        let c = !1;
        const x =
            (await t({
                action: a,
                cancel: () => (c = !0),
                controller: u,
                formData: o,
                formElement: e,
                submitter: s.submitter,
            })) ?? r;
        if (c) return;
        let g;
        try {
            const A = await fetch(a, {
                method: "POST",
                headers: { accept: "application/json", "x-sveltekit-action": "true" },
                cache: "no-store",
                body: o,
                signal: u.signal,
            });
            (g = lu(await A.text())), g.type === "error" && (g.status = A.status);
        } catch (A) {
            if ((A == null ? void 0 : A.name) === "AbortError") return;
            g = { type: "error", error: A };
        }
        x({
            action: a,
            formData: o,
            formElement: e,
            update: (A) =>
                r({
                    action: a,
                    result: g,
                    reset: A == null ? void 0 : A.reset,
                    invalidateAll: A == null ? void 0 : A.invalidateAll,
                }),
            result: g,
        });
    }
    return (
        HTMLFormElement.prototype.addEventListener.call(e, "submit", n),
        {
            destroy() {
                HTMLFormElement.prototype.removeEventListener.call(e, "submit", n);
            },
        }
    );
}
const pa = "noCustomValidity";
async function Hs(e, t) {
    "setCustomValidity" in e && e.setCustomValidity(""), !(pa in e.dataset) && ma(e, t);
}
function cu(e, t) {
    for (const r of e.querySelectorAll("input,select,textarea,button")) {
        if (pa in r.dataset) continue;
        const n = nt(t, Kt(r.name));
        if ((ma(r, n == null ? void 0 : n.value), n != null && n.value)) return;
    }
}
function ma(e, t) {
    const r =
        t && t.length
            ? t.join(`
`)
            : "";
    e.setCustomValidity(r), r && e.reportValidity();
}
const du = (e, t = 0) => {
        const r = e.getBoundingClientRect();
        return (
            r.top >= t &&
            r.left >= 0 &&
            r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            r.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    fu = (e, t = 1.125, r = "smooth") => {
        const i = e.getBoundingClientRect().top + window.pageYOffset - window.innerHeight / (2 * t);
        window.scrollTo({ left: 0, top: i, behavior: r });
    },
    hu = ["checkbox", "radio", "range", "file"];
function Gs(e) {
    const t = !!e && (e instanceof HTMLSelectElement || (e instanceof HTMLInputElement && hu.includes(e.type))),
        r = !!e && e instanceof HTMLSelectElement && e.multiple,
        n = !!e && e instanceof HTMLInputElement && e.type == "file";
    return { immediate: t, multiple: r, file: n };
}
var he;
(function (e) {
    (e[(e.Idle = 0)] = "Idle"),
        (e[(e.Submitting = 1)] = "Submitting"),
        (e[(e.Delayed = 2)] = "Delayed"),
        (e[(e.Timeout = 3)] = "Timeout");
})(he || (he = {}));
const pu = new Set();
function mu(e, t, r) {
    let n = he.Idle,
        s,
        i;
    const a = pu;
    function o() {
        l(),
            c(n != he.Delayed ? he.Submitting : he.Delayed),
            (s = window.setTimeout(() => {
                s && n == he.Submitting && c(he.Delayed);
            }, r.delayMs)),
            (i = window.setTimeout(() => {
                i && n == he.Delayed && c(he.Timeout);
            }, r.timeoutMs)),
            a.add(l);
    }
    function l() {
        clearTimeout(s), clearTimeout(i), (s = i = 0), a.delete(l), c(he.Idle);
    }
    function u() {
        a.forEach((m) => m()), a.clear();
    }
    function c(m) {
        (n = m), t.submitting.set(n >= he.Submitting), t.delayed.set(n >= he.Delayed), t.timeout.set(n >= he.Timeout);
    }
    const h = e;
    function x(m) {
        const w = m.target;
        r.selectErrorText && w.select();
    }
    function g() {
        r.selectErrorText &&
            h.querySelectorAll("input").forEach((m) => {
                m.addEventListener("invalid", x);
            });
    }
    function _() {
        r.selectErrorText && h.querySelectorAll("input").forEach((m) => m.removeEventListener("invalid", x));
    }
    const y = e;
    {
        g();
        const m = (w) => {
            w.clearAll ? u() : l(), w.cancelled || setTimeout(() => Wn(y, r), 1);
        };
        return (
            Jr(() => {
                _(), m({ cancelled: !0 });
            }),
            {
                submitting() {
                    o();
                },
                completed: m,
                scrollToFirstError() {
                    setTimeout(() => Wn(y, r), 1);
                },
                isSubmitting: () => n === he.Submitting || n === he.Delayed,
            }
        );
    }
}
const Wn = async (e, t) => {
    if (t.scrollToError == "off") return;
    const r = t.errorSelector;
    if (!r) return;
    await Bn();
    let n;
    if (((n = e.querySelector(r)), !n)) return;
    n = n.querySelector(r) ?? n;
    const s = t.stickyNavbar ? document.querySelector(t.stickyNavbar) : null;
    typeof t.scrollToError != "string"
        ? n.scrollIntoView(t.scrollToError)
        : du(n, (s == null ? void 0 : s.offsetHeight) ?? 0) || fu(n, void 0, t.scrollToError);
    function i(o) {
        return typeof t.autoFocusOnError == "boolean" ? t.autoFocusOnError : !/iPhone|iPad|iPod|Android/i.test(o);
    }
    if (!i(navigator.userAgent)) return;
    let a;
    if (
        ((a = n),
        ["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(a.tagName) ||
            (a = a.querySelector('input:not([type="hidden"]):not(.flatpickr-input), select, textarea')),
        a)
    )
        try {
            a.focus({ preventScroll: !0 }), t.selectErrorText && a.tagName == "INPUT" && a.select();
        } catch {}
};
function an(e, t, r) {
    const n = nt(e, t, ({ parent: s, key: i, value: a }) => (a === void 0 && (s[i] = /\D/.test(i) ? {} : []), s[i]));
    if (n) {
        const s = r(n.value);
        n.parent[n.key] = s;
    }
    return e;
}
function gu(e, t, r) {
    const n = e.form,
        s = Kt(t),
        i = us(n, (a) => {
            const o = nt(a, s);
            return o == null ? void 0 : o.value;
        });
    return {
        subscribe(...a) {
            const o = i.subscribe(...a);
            return () => o();
        },
        update(a, o) {
            n.update((l) => an(l, s, a), o ?? r);
        },
        set(a, o) {
            n.update((l) => an(l, s, () => a), o ?? r);
        },
    };
}
function yu(e, t) {
    const r = "form" in e;
    if (!r && (t == null ? void 0 : t.taint) !== void 0)
        throw new le("If options.taint is set, the whole superForm object must be used as a proxy.");
    return r;
}
function Zr(e, t, r) {
    const n = Kt(t);
    if (yu(e, r)) return gu(e, t, r);
    const s = us(e, (i) => {
        const a = nt(i, n);
        return a == null ? void 0 : a.value;
    });
    return {
        subscribe(...i) {
            const a = s.subscribe(...i);
            return () => a();
        },
        update(i) {
            e.update((a) => an(a, n, i));
        },
        set(i) {
            e.update((a) => an(a, n, () => i));
        },
    };
}
function Jn(e) {
    let t = {};
    const r = Array.isArray(e);
    for (const [n, s] of Object.entries(e))
        !s || typeof s != "object" || (r ? (t = { ...t, ...Jn(s) }) : (t[n] = Jn(s)));
    return t;
}
const Vr = new WeakMap(),
    Rt = new WeakMap(),
    ga = (e) => {
        console.warn("Unhandled error caught by Superforms, use onError event to handle it:", e.result.error);
    },
    vu = {
        applyAction: !0,
        invalidateAll: !0,
        resetForm: !0,
        autoFocusOnError: "detect",
        scrollToError: "smooth",
        errorSelector: '[aria-invalid="true"],[data-invalid]',
        selectErrorText: !1,
        stickyNavbar: void 0,
        taintedMessage: !1,
        onSubmit: void 0,
        onResult: void 0,
        onUpdate: void 0,
        onUpdated: void 0,
        onError: ga,
        dataType: "form",
        validators: void 0,
        customValidity: !1,
        clearOnSubmit: "message",
        delayMs: 500,
        timeoutMs: 8e3,
        multipleSubmits: "prevent",
        SPA: void 0,
        validationMethod: "auto",
    };
function bu(e) {
    return `Duplicate form id's found: "${e}". Multiple forms will receive the same data. Use the id option to differentiate between them, or if this is intended, set the warnings.duplicateId option to false in superForm to disable this warning. More information: https://superforms.rocks/concepts/multiple-forms`;
}
let ya = !1;
try {
    SUPERFORMS_LEGACY && (ya = !0);
} catch {}
let zt = !1;
try {
    globalThis.STORIES && (zt = !0);
} catch {}
function $m(e, t) {
    var Bs;
    let r,
        n = t ?? {},
        s;
    {
        if (
            ((n.legacy ?? ya) &&
                (n.resetForm === void 0 && (n.resetForm = !1), n.taintedMessage === void 0 && (n.taintedMessage = !0)),
            zt && n.applyAction === void 0 && (n.applyAction = !1),
            typeof n.SPA == "string" &&
                (n.invalidateAll === void 0 && (n.invalidateAll = !1),
                n.applyAction === void 0 && (n.applyAction = !1)),
            (s = n.validators),
            (n = { ...vu, ...n }),
            (n.SPA === !0 || typeof n.SPA == "object") &&
                n.validators === void 0 &&
                console.warn(
                    "No validators set for superForm in SPA mode. Add a validation adapter to the validators option, or set it to false to disable this warning.",
                ),
            !e)
        )
            throw new le(
                "No form data sent to superForm. Make sure the output from superValidate is used (usually data.form) and that it's not null or undefined. Alternatively, an object with default values for the form can also be used, but then constraints won't be available.",
            );
        u(e) === !1 &&
            (e = {
                id: n.id ?? Math.random().toString(36).slice(2, 10),
                valid: !1,
                posted: !1,
                errors: {},
                data: e,
                shape: Jn(e),
            }),
            (e = e);
        const d = (e.id = n.id ?? e.id),
            p = fr(dr) ?? (zt ? {} : void 0);
        if (((Bs = n.warnings) == null ? void 0 : Bs.duplicateId) !== !1)
            if (!Vr.has(p)) Vr.set(p, new Set([d]));
            else {
                const v = Vr.get(p);
                v != null && v.has(d) ? console.warn(bu(d)) : v == null || v.add(d);
            }
        if (
            (Rt.has(e) || Rt.set(e, e),
            (r = Rt.get(e)),
            (e = Ee(r)),
            Jr(() => {
                var v;
                Io(), xo(), Mo();
                for (const k of Object.values(je)) k.length = 0;
                (v = Vr.get(p)) == null || v.delete(d);
            }),
            n.dataType !== "json")
        ) {
            const v = (k, S) => {
                if (!(!S || typeof S != "object")) {
                    if (Array.isArray(S)) S.length > 0 && v(k, S[0]);
                    else if (!(S instanceof Date) && !(S instanceof File) && !(S instanceof FileList))
                        throw new le(
                            `Object found in form field "${k}". Set the dataType option to "json" and add use:enhance to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`,
                        );
                }
            };
            for (const [k, S] of Object.entries(e.data)) v(k, S);
        }
    }
    const i = {
            formId: e.id,
            form: Ee(e.data),
            constraints: e.constraints ?? {},
            posted: e.posted,
            errors: Ee(e.errors),
            message: Ee(e.message),
            tainted: void 0,
            valid: e.valid,
            submitting: !1,
            shape: e.shape,
        },
        a = i,
        o = G(n.id ?? e.id);
    function l(d) {
        return Object.values(d).filter((v) => u(v) !== !1);
    }
    function u(d) {
        return !d || typeof d != "object" || !("valid" in d && "errors" in d && typeof d.valid == "boolean")
            ? !1
            : "id" in d && typeof d.id == "string"
              ? d.id
              : !1;
    }
    const c = G(e.data),
        h = {
            subscribe: c.subscribe,
            set: (d, p = {}) => {
                const v = Ee(d);
                return js(v, p.taint ?? !0), c.set(v);
            },
            update: (d, p = {}) =>
                c.update((v) => {
                    const k = d(v);
                    return js(k, p.taint ?? !0), k;
                }),
        };
    function x() {
        return n.SPA === !0 || typeof n.SPA == "object";
    }
    async function g(d = {}) {
        const p = d.formData ?? a.form;
        let v = {},
            k;
        const S = d.adapter ?? n.validators;
        if (typeof S == "object") {
            if (S != s && !("jsonSchema" in S))
                throw new le(
                    'Client validation adapter found in options.validators. A full adapter must be used when changing validators dynamically, for example "zod" instead of "zodClient".',
                );
            if (((k = await S.validate(p)), !k.success)) v = au(k.issues, S.shape ?? a.shape ?? {});
            else if (d.recheckValidData !== !1) return g({ ...d, recheckValidData: !1 });
        } else k = { success: !0, data: {} };
        const R = { ...a.form, ...p, ...(k.success ? k.data : {}) };
        return {
            valid: k.success,
            posted: !1,
            errors: v,
            data: R,
            constraints: a.constraints,
            message: void 0,
            id: a.formId,
            shape: a.shape,
        };
    }
    function _(d) {
        if (!n.onChange || !d.paths.length || d.type == "blur") return;
        let p;
        const v = d.paths.map(Pt);
        d.type && d.paths.length == 1 && d.formElement && d.target instanceof Element
            ? (p = {
                  path: v[0],
                  paths: v,
                  formElement: d.formElement,
                  target: d.target,
                  set(k, S, R) {
                      Zr({ form: h }, k, R).set(S);
                  },
                  get(k) {
                      return fr(Zr(h, k));
                  },
              })
            : (p = {
                  paths: v,
                  target: void 0,
                  set(k, S, R) {
                      Zr({ form: h }, k, R).set(S);
                  },
                  get(k) {
                      return fr(Zr(h, k));
                  },
              }),
            n.onChange(p);
    }
    async function y(d, p = !1, v) {
        d && (n.validators == "clear" && D.update((R) => (Qe(R, d.paths, void 0), R)), setTimeout(() => _(d)));
        let k = !1;
        if (
            (p ||
                ((n.validationMethod == "onsubmit" ||
                    n.validationMethod == "submit-only" ||
                    (n.validationMethod == "onblur" && (d == null ? void 0 : d.type) == "input") ||
                    (n.validationMethod == "oninput" && (d == null ? void 0 : d.type) == "blur")) &&
                    (k = !0)),
            k || !d || !n.validators || n.validators == "clear")
        ) {
            if (d != null && d.paths) {
                const R = (d == null ? void 0 : d.formElement) ?? ur();
                R && m(R, d.paths);
            }
            return;
        }
        const S = await g({ adapter: v });
        return (
            S.valid && (d.immediate || d.type != "input") && h.set(S.data, { taint: "ignore" }),
            await Bn(),
            w(S.errors, d, p),
            S
        );
    }
    function m(d, p) {
        const v = new Map();
        if (n.customValidity && d)
            for (const k of p) {
                const S = CSS.escape(Pt(k)),
                    R = d.querySelector(`[name="${S}"]`);
                if (R) {
                    const de = "validationMessage" in R ? String(R.validationMessage) : "";
                    v.set(k.join("."), { el: R, message: de }), Hs(R, void 0);
                }
            }
        return v;
    }
    async function w(d, p, v) {
        const { type: k, immediate: S, multiple: R, paths: de } = p,
            Pe = a.errors,
            re = {};
        let Fe = new Map();
        const Oe = p.formElement ?? ur();
        Oe && (Fe = m(Oe, p.paths)),
            ot(d, (xe) => {
                if (!Array.isArray(xe.value)) return;
                const Te = [...xe.path];
                Te[Te.length - 1] == "_errors" && Te.pop();
                const Nt = Te.join(".");
                function it() {
                    if ((Qe(re, [xe.path], xe.value), n.customValidity && $t && Fe.has(Nt))) {
                        const { el: M, message: z } = Fe.get(Nt);
                        z != xe.value && (Hs(M, xe.value), Fe.clear());
                    }
                }
                if (v) return it();
                const qr = xe.path[xe.path.length - 1] == "_errors",
                    $t =
                        xe.value &&
                        de.some((M) => (qr ? Te && M && Te.length > 0 && Te[0] == M[0] : Nt == M.join(".")));
                if (($t && n.validationMethod == "oninput") || (S && !R && $t)) return it();
                if (R) {
                    const M = ft(fr(D), xe.path.slice(0, -1));
                    if (M != null && M.value && typeof (M == null ? void 0 : M.value) == "object") {
                        for (const z of Object.values(M.value)) if (Array.isArray(z)) return it();
                    }
                }
                const K = ft(Pe, xe.path);
                if (K && K.key in K.parent) return it();
                if (qr) {
                    if (n.validationMethod == "oninput" || (k == "blur" && Oo(Pt(xe.path.slice(0, -1))))) return it();
                } else if (k == "blur" && $t) return it();
            }),
            D.set(re);
    }
    function A(d, p = {}) {
        return (
            p.keepFiles &&
                ot(a.form, (v) => {
                    if (!(v.parent instanceof FileList) && (v.value instanceof File || v.value instanceof FileList)) {
                        const k = ft(d, v.path);
                        (!k || !(k.key in k.parent)) && Qe(d, [v.path], v.value);
                    }
                }),
            h.set(d, p)
        );
    }
    function ae(d, p) {
        return d && p && n.resetForm && (n.resetForm === !0 || n.resetForm());
    }
    async function oe(d, p) {
        d.valid && p && ae(d.valid, p)
            ? Se({ message: d.message, posted: !0 })
            : Br({ form: d, untaint: p, keepFiles: !0, skipFormData: n.invalidateAll == "force" }),
            je.onUpdated.length && (await Bn());
        for (const v of je.onUpdated) v({ form: d });
    }
    function Se(d = {}) {
        d.newState && (r.data = { ...r.data, ...d.newState });
        const p = Ee(r);
        (p.data = { ...p.data, ...d.data }),
            d.id !== void 0 && (p.id = d.id),
            Br({ form: p, untaint: !0, message: d.message, keepFiles: !1, posted: d.posted, resetted: !0 });
    }
    async function V(d) {
        if (d.type == "error") throw new le(`ActionResult of type "${d.type}" cannot be passed to update function.`);
        if (d.type == "redirect") {
            ae(!0, !0) && Se({ posted: !0 });
            return;
        }
        if (typeof d.data != "object") throw new le("Non-object validation data returned from ActionResult.");
        const p = l(d.data);
        if (!p.length)
            throw new le("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
        for (const v of p) v.id === a.formId && (await oe(v, d.status >= 200 && d.status < 300));
    }
    const Y = G(i.message),
        X = G(i.constraints),
        Q = G(i.posted),
        lr = G(i.shape),
        It = G(e.errors),
        D = {
            subscribe: It.subscribe,
            set(d, p) {
                return It.set(Us(d, a.errors, p == null ? void 0 : p.force));
            },
            update(d, p) {
                return It.update((v) => Us(d(v), a.errors, p == null ? void 0 : p.force));
            },
            clear: () => D.set({}),
        };
    let te = null;
    function wo(d) {
        var p;
        te &&
        d &&
        Object.keys(d).length == 1 &&
        (p = d.paths) != null &&
        p.length &&
        te.target &&
        te.target instanceof HTMLInputElement &&
        te.target.type.toLowerCase() == "file"
            ? (te.paths = d.paths)
            : (te = d),
            setTimeout(() => {
                y(te);
            }, 0);
    }
    function $o(d, p, v, k, S) {
        te === null && (te = { paths: [] }),
            (te.type = d),
            (te.immediate = p),
            (te.multiple = v),
            (te.formElement = k),
            (te.target = S);
    }
    function Is() {
        return (te == null ? void 0 : te.paths) ?? [];
    }
    function xo() {
        te = null;
    }
    const ce = {
        defaultMessage: "Leave page? Changes that you made may not be saved.",
        state: G(),
        message: n.taintedMessage,
        clean: Ee(e.data),
        forceRedirection: !1,
    };
    function Ns() {
        return n.taintedMessage && !a.submitting && !ce.forceRedirection && Ms();
    }
    function Rs(d) {
        if (!Ns()) return;
        d.preventDefault(), (d.returnValue = "");
        const { taintedMessage: p } = n,
            k = typeof p == "function" || p === !0 ? ce.defaultMessage : p;
        return ((d || window.event).returnValue = k || ce.defaultMessage), k;
    }
    async function Eo(d) {
        if (!Ns()) return;
        const { taintedMessage: p } = n,
            v = typeof p == "function";
        if ((v && d.cancel(), d.type === "leave")) return;
        const k = v || p === !0 ? ce.defaultMessage : p;
        let S;
        try {
            S = v ? await p() : window.confirm(k || ce.defaultMessage);
        } catch {
            S = !1;
        }
        if (S && d.to)
            try {
                (ce.forceRedirection = !0), await Vo(d.to.url, { ...d.to.params });
                return;
            } finally {
                ce.forceRedirection = !1;
            }
        else !S && !v && d.cancel();
    }
    function Ao() {
        n.taintedMessage = ce.message;
    }
    function So() {
        return ce.state;
    }
    function Oo(d) {
        if (!a.tainted) return !1;
        if (!d) return !!a.tainted;
        const p = ft(a.tainted, Kt(d));
        return !!p && p.key in p.parent;
    }
    function Ms(d) {
        if (!arguments.length) return Dr(a.tainted);
        if (typeof d == "boolean") return d;
        if (typeof d == "object") return Dr(d);
        if (!a.tainted || d === void 0) return !1;
        const p = ft(a.tainted, Kt(d));
        return Dr(p == null ? void 0 : p.value);
    }
    function Dr(d) {
        if (!d) return !1;
        if (typeof d == "object") {
            for (const p of Object.values(d)) if (Dr(p)) return !0;
        }
        return d === !0;
    }
    function js(d, p) {
        if (p == "ignore") return;
        const v = Vs(d, a.form),
            k = Vs(d, ce.clean).map((S) => S.join());
        v.length &&
            (p == "untaint-all" || p == "untaint-form"
                ? ce.state.set(void 0)
                : ce.state.update(
                      (S) => (
                          S || (S = {}),
                          Qe(S, v, (R, de) => {
                              if (!k.includes(R.join())) return;
                              const Pe = nt(d, R),
                                  re = nt(ce.clean, R);
                              return Pe && re && Pe.value === re.value
                                  ? void 0
                                  : p === !0
                                    ? !0
                                    : p === "untaint"
                                      ? void 0
                                      : de.value;
                          }),
                          S
                      ),
                  )),
            wo({ paths: v });
    }
    function To(d, p) {
        ce.state.set(d), p && (ce.clean = p);
    }
    const An = G(!1),
        Ps = G(!1),
        zs = G(!1),
        Ls = [
            ce.state.subscribe((d) => (i.tainted = Ee(d))),
            h.subscribe((d) => (i.form = Ee(d))),
            D.subscribe((d) => (i.errors = Ee(d))),
            o.subscribe((d) => (i.formId = d)),
            X.subscribe((d) => (i.constraints = d)),
            Q.subscribe((d) => (i.posted = d)),
            Y.subscribe((d) => (i.message = d)),
            An.subscribe((d) => (i.submitting = d)),
            lr.subscribe((d) => (i.shape = d)),
        ];
    function Co(d) {
        Ls.push(d);
    }
    function Io() {
        Ls.forEach((d) => d());
    }
    let $e;
    function ur() {
        return $e;
    }
    function No(d) {
        ($e = document.createElement("form")),
            ($e.method = "POST"),
            ($e.action = d),
            Ds($e),
            document.body.appendChild($e);
    }
    function Ro(d) {
        $e && ($e.action = d);
    }
    function Mo() {
        $e != null && $e.parentElement && $e.remove(), ($e = void 0);
    }
    const jo = us(D, (d) => (d ? ou(d) : []));
    n.taintedMessage = void 0;
    function Br(d) {
        const p = d.form,
            v = d.message ?? p.message;
        if (
            ((d.untaint || d.resetted) && To(typeof d.untaint == "boolean" ? void 0 : d.untaint, p.data),
            d.skipFormData !== !0 && A(p.data, { taint: "ignore", keepFiles: d.keepFiles }),
            Y.set(v),
            d.resetted ? D.update(() => ({}), { force: !0 }) : D.set(p.errors),
            o.set(p.id),
            Q.set(d.posted ?? p.posted),
            p.constraints && X.set(p.constraints),
            p.shape && lr.set(p.shape),
            (i.valid = p.valid),
            n.flashMessage && Un(n))
        ) {
            const k = n.flashMessage.module.getFlash(dr);
            v && fr(k) === void 0 && k.set(v);
        }
    }
    const je = {
        onSubmit: n.onSubmit ? [n.onSubmit] : [],
        onResult: n.onResult ? [n.onResult] : [],
        onUpdate: n.onUpdate ? [n.onUpdate] : [],
        onUpdated: n.onUpdated ? [n.onUpdated] : [],
        onError: n.onError ? [n.onError] : [],
    };
    window.addEventListener("beforeunload", Rs),
        Jr(() => {
            window.removeEventListener("beforeunload", Rs);
        }),
        Zo(Eo),
        Co(
            dr.subscribe(async (d) => {
                zt && d === void 0 && (d = { status: 200 });
                const p = d.status >= 200 && d.status < 300;
                if (n.applyAction && d.form && typeof d.form == "object") {
                    const v = d.form;
                    if (v.type == "error") return;
                    for (const k of l(v)) {
                        const S = Rt.has(k);
                        k.id !== a.formId || S || (Rt.set(k, k), await oe(k, p));
                    }
                } else if (d.data && typeof d.data == "object")
                    for (const v of l(d.data)) {
                        const k = Rt.has(v);
                        if (v.id !== a.formId || k) continue;
                        n.invalidateAll === "force" && (r.data = v.data);
                        const S = ae(!0, !0);
                        Br({ form: v, untaint: p, keepFiles: !S, resetted: S });
                    }
            }),
        ),
        typeof n.SPA == "string" && No(n.SPA);
    function Ds(d, p) {
        if (
            (n.SPA !== void 0 && d.method == "get" && (d.method = "post"),
            typeof n.SPA == "string"
                ? n.SPA.length && d.action == document.location.href && (d.action = n.SPA)
                : ($e = d),
            p)
        ) {
            if (p.onError) {
                if (n.onError === "apply")
                    throw new le('options.onError is set to "apply", cannot add any onError events.');
                if (p.onError === "apply") throw new le('Cannot add "apply" as onError event in use:enhance.');
                je.onError.push(p.onError);
            }
            p.onResult && je.onResult.push(p.onResult),
                p.onSubmit && je.onSubmit.push(p.onSubmit),
                p.onUpdate && je.onUpdate.push(p.onUpdate),
                p.onUpdated && je.onUpdated.push(p.onUpdated);
        }
        Ao();
        let v;
        async function k(Pe) {
            const re = Gs(Pe.target);
            re.immediate && !re.file && (await new Promise((Fe) => setTimeout(Fe, 0))),
                (v = Is()),
                $o("input", re.immediate, re.multiple, d, Pe.target ?? void 0);
        }
        async function S(Pe) {
            if (a.submitting || !v || Is() != v) return;
            const re = Gs(Pe.target);
            re.immediate && !re.file && (await new Promise((Fe) => setTimeout(Fe, 0))),
                y({
                    paths: v,
                    immediate: re.multiple,
                    multiple: re.multiple,
                    type: "blur",
                    formElement: d,
                    target: Pe.target ?? void 0,
                }),
                (v = void 0);
        }
        d.addEventListener("focusout", S),
            d.addEventListener("input", k),
            Jr(() => {
                d.removeEventListener("focusout", S), d.removeEventListener("input", k);
            });
        const R = mu(d, { submitting: An, delayed: Ps, timeout: zs }, n);
        let de;
        return uu(d, async (Pe) => {
            let re,
                Fe = n.validators;
            const Oe = {
                    ...Pe,
                    jsonData(K) {
                        if (n.dataType !== "json")
                            throw new le("options.dataType must be set to 'json' to use jsonData.");
                        re = K;
                    },
                    validators(K) {
                        Fe = K;
                    },
                },
                xe = Oe.cancel;
            let Te = !1;
            function Nt(K) {
                var Xe;
                const M = { ...K, posted: !0 },
                    z = M.valid
                        ? 200
                        : (typeof n.SPA == "boolean" || typeof n.SPA == "string" || (Xe = n.SPA) == null
                              ? void 0
                              : Xe.failStatus) ?? 400,
                    fe = { form: M },
                    ye = M.valid ? { type: "success", status: z, data: fe } : { type: "failure", status: z, data: fe };
                setTimeout(() => $t({ result: ye }), 0);
            }
            function it() {
                switch (n.clearOnSubmit) {
                    case "errors-and-message":
                        D.clear(), Y.set(void 0);
                        break;
                    case "errors":
                        D.clear();
                        break;
                    case "message":
                        Y.set(void 0);
                        break;
                }
            }
            function cr(K = { resetTimers: !0 }) {
                return (Te = !0), K.resetTimers && R.isSubmitting() && R.completed({ cancelled: Te }), xe();
            }
            if (((Oe.cancel = cr), R.isSubmitting() && n.multipleSubmits == "prevent")) cr({ resetTimers: !1 });
            else {
                R.isSubmitting() && n.multipleSubmits == "abort" && de && de.abort(),
                    R.submitting(),
                    (de = Oe.controller);
                for (const K of je.onSubmit) await K(Oe);
            }
            if ((Te && n.flashMessage && Ws(n), !Te)) {
                const K =
                    !x() &&
                    (d.noValidate ||
                        ((Oe.submitter instanceof HTMLButtonElement || Oe.submitter instanceof HTMLInputElement) &&
                            Oe.submitter.formNoValidate));
                let M;
                const z = async () => await g({ adapter: Fe });
                if ((it(), K || ((M = await z()), M.valid || (cr({ resetTimers: !1 }), Nt(M))), !Te)) {
                    n.flashMessage &&
                        (n.clearOnSubmit == "errors-and-message" || n.clearOnSubmit == "message") &&
                        Un(n) &&
                        n.flashMessage.module.getFlash(dr).set(void 0);
                    const fe = "formData" in Oe ? Oe.formData : Oe.data;
                    if (((v = void 0), x())) M || (M = await z()), cr({ resetTimers: !1 }), Nt(M);
                    else if (n.dataType === "json") {
                        M || (M = await z());
                        const ye = Ee(re ?? M.data);
                        ot(ye, (ne) => {
                            if (ne.value instanceof File) {
                                const J = "__superform_file_" + Pt(ne.path);
                                return fe.append(J, ne.value), ne.set(void 0);
                            } else if (
                                Array.isArray(ne.value) &&
                                ne.value.length &&
                                ne.value.every((J) => J instanceof File)
                            ) {
                                const J = "__superform_files_" + Pt(ne.path);
                                for (const Ce of ne.value) fe.append(J, Ce);
                                return ne.set(void 0);
                            }
                        }),
                            Object.keys(ye).forEach((ne) => {
                                typeof fe.get(ne) == "string" && fe.delete(ne);
                            });
                        const Xe = qr(Qo(ye), n.jsonChunkSize ?? 5e5);
                        for (const ne of Xe) fe.append("__superform_json", ne);
                    }
                    if (!fe.has("__superform_id")) {
                        const ye = a.formId;
                        ye !== void 0 && fe.set("__superform_id", ye);
                    }
                    typeof n.SPA == "string" && Ro(n.SPA);
                }
            }
            function qr(K, M) {
                const z = Math.ceil(K.length / M),
                    fe = new Array(z);
                for (let ye = 0, Xe = 0; ye < z; ++ye, Xe += M) fe[ye] = K.substring(Xe, Xe + M);
                return fe;
            }
            async function $t(K) {
                var ne;
                let M = !1;
                de = null;
                let z =
                    "type" in K.result && "status" in K.result
                        ? K.result
                        : {
                              type: "error",
                              status: parseInt(String(K.result.status)) || 500,
                              error: K.result.error instanceof Error ? K.result.error : K.result,
                          };
                const fe = () => (M = !0),
                    ye = { result: z, formEl: d, formElement: d, cancel: fe },
                    Xe =
                        zt || !x()
                            ? () => {}
                            : qs.subscribe((J) => {
                                  var Ce, ct;
                                  !J ||
                                      ((Ce = J.from) == null ? void 0 : Ce.route.id) ===
                                          ((ct = J.to) == null ? void 0 : ct.route.id) ||
                                      fe();
                              });
                for (const J of je.onResult) await J(ye);
                if (((z = ye.result), !M)) {
                    if ((z.type === "success" || z.type == "failure") && z.data) {
                        const J = l(z.data);
                        if (!J.length)
                            throw new le(
                                "No form data returned from ActionResult. Make sure you return { form } in the form actions.",
                            );
                        for (const Ce of J) {
                            if (Ce.id !== a.formId) continue;
                            const ct = { form: Ce, formEl: d, formElement: d, cancel: () => (M = !0), result: z };
                            for (const Sn of je.onUpdate) await Sn(ct);
                            (z = ct.result),
                                M ||
                                    (n.customValidity && cu(d, ct.form.errors),
                                    ae(ct.form.valid, z.type == "success") &&
                                        ct.formElement
                                            .querySelectorAll('input[type="file"]')
                                            .forEach((Sn) => (Sn.value = "")));
                        }
                    }
                    if (!M) {
                        if (z.type !== "error")
                            z.type === "success" && n.invalidateAll && (await Wi()),
                                n.applyAction ? await Wr(z) : await V(z);
                        else {
                            if (n.applyAction)
                                if (n.onError == "apply") await Wr(z);
                                else {
                                    const J = { type: "failure", status: Math.floor(z.status || 500), data: z };
                                    await Wr(J);
                                }
                            if (n.onError !== "apply") {
                                const J = { result: z, message: Y };
                                for (const Ce of je.onError)
                                    Ce !== "apply" &&
                                        (Ce != ga || !((ne = n.flashMessage) != null && ne.onError)) &&
                                        (await Ce(J));
                            }
                        }
                        n.flashMessage &&
                            z.type == "error" &&
                            n.flashMessage.onError &&
                            (await n.flashMessage.onError({
                                result: z,
                                flashMessage: n.flashMessage.module.getFlash(dr),
                            }));
                    }
                }
                if ((M && n.flashMessage && Ws(n), M || z.type != "redirect")) R.completed({ cancelled: M });
                else if (zt) R.completed({ cancelled: M, clearAll: !0 });
                else {
                    const J = qs.subscribe((Ce) => {
                        Ce ||
                            (setTimeout(() => {
                                try {
                                    J && J();
                                } catch {}
                            }),
                            R.isSubmitting() && R.completed({ cancelled: M, clearAll: !0 }));
                    });
                }
                Xe();
            }
            return $t;
        });
    }
    function Po(d) {
        const p = [];
        if (
            (ot(d, (k) => {
                if (k.value instanceof File) return p.push(k.path), "skip";
                if (Array.isArray(k.value) && k.value.length && k.value.every((S) => S instanceof File))
                    return p.push(k.path), "skip";
            }),
            !p.length)
        )
            return { data: d, paths: p };
        const v = Ee(d);
        return (
            Qe(v, p, (k) => {
                var S;
                return (S = ft(r.data, k)) == null ? void 0 : S.value;
            }),
            { data: v, paths: p }
        );
    }
    return {
        form: h,
        formId: o,
        errors: D,
        message: Y,
        constraints: X,
        tainted: So(),
        submitting: On(An),
        delayed: On(Ps),
        timeout: On(zs),
        options: n,
        capture() {
            const { data: d, paths: p } = Po(a.form);
            let v = a.tainted;
            return (
                p.length && ((v = Ee(v) ?? {}), Qe(v, p, !1)),
                {
                    valid: a.valid,
                    posted: a.posted,
                    errors: a.errors,
                    data: d,
                    constraints: a.constraints,
                    message: a.message,
                    id: a.formId,
                    tainted: v,
                    shape: a.shape,
                }
            );
        },
        restore: (d) => {
            Br({ form: d, untaint: d.tainted ?? !0 });
        },
        async validate(d, p = {}) {
            if (!n.validators) throw new le("options.validators must be set to use the validate method.");
            p.update === void 0 && (p.update = !0),
                p.taint === void 0 && (p.taint = !1),
                typeof p.errors == "string" && (p.errors = [p.errors]);
            let v;
            const k = Kt(d);
            "value" in p
                ? p.update === !0 || p.update === "value"
                    ? (h.update((de) => (Qe(de, [k], p.value), de), { taint: p.taint }), (v = a.form))
                    : ((v = Ee(a.form)), Qe(v, [k], p.value))
                : (v = a.form);
            const S = await g({ formData: v }),
                R = ft(S.errors, k);
            return (
                R && R.value && p.errors && (R.value = p.errors),
                (p.update === !0 || p.update == "errors") &&
                    D.update((de) => (Qe(de, [k], R == null ? void 0 : R.value), de)),
                R == null ? void 0 : R.value
            );
        },
        async validateForm(d = {}) {
            if (!n.validators && !d.schema)
                throw new le("options.validators or the schema option must be set to use the validateForm method.");
            const p = d.update ? await y({ paths: [] }, !0, d.schema) : g({ adapter: d.schema }),
                v = ur();
            return (
                d.update &&
                    v &&
                    setTimeout(() => {
                        v && Wn(v, { ...n, scrollToError: d.focusOnError === !1 ? "off" : n.scrollToError });
                    }, 1),
                p || g({ adapter: d.schema })
            );
        },
        allErrors: jo,
        posted: Q,
        reset(d) {
            return Se({
                message: d != null && d.keepMessage ? a.message : void 0,
                data: d == null ? void 0 : d.data,
                id: d == null ? void 0 : d.id,
                newState: d == null ? void 0 : d.newState,
            });
        },
        submit(d) {
            const p = ur() ? ur() : d && d instanceof HTMLElement ? d.closest("form") : void 0;
            if (!p)
                throw new le(
                    "use:enhance must be added to the form to use submit, or pass a HTMLElement inside the form (or the form itself) as an argument.",
                );
            if (!p.requestSubmit) return p.submit();
            const v =
                d &&
                ((d instanceof HTMLButtonElement && d.type == "submit") ||
                    (d instanceof HTMLInputElement && ["submit", "image"].includes(d.type)));
            p.requestSubmit(v ? d : void 0);
        },
        isTainted: Ms,
        enhance: Ds,
    };
}
new TextEncoder();
let _u = !1;
try {
    SUPERFORMS_LEGACY && (_u = !0);
} catch {}
const ku = (e) => (Array.isArray(e) ? e : [e]),
    wu = (e, t) => {
        const r = [[], []];
        for (const n of e) t(n) ? r[0].push(n) : r[1].push(n);
        return r;
    },
    $u = Array,
    gr = (e, t) => e.includes(t),
    Re = (e, t, r) =>
        t === void 0
            ? e ?? []
            : e === void 0
              ? t === void 0
                  ? []
                  : Array.isArray(t)
                    ? t
                    : [t]
              : (Array.isArray(t) ? e.push(...t) : e.push(t), e),
    va = (e, t) => (e === void 0 ? [t] : (e.includes(t) || e.push(t), e)),
    xu = (e, t) =>
        e.reduce((r, n) => {
            const s = n[t];
            return r[s] ?? (r[s] = []), r[s].push(n), r;
        }, {}),
    Eu = (e) => Object.create(Object.getPrototypeOf(e), Object.getOwnPropertyDescriptors(e));
class Au extends Error {}
const Ye = (e) => vr(e, Au),
    vr = (e, t = Error) => {
        throw new t(e);
    };
class Su extends Error {
    constructor() {
        super(...arguments);
        f(this, "name", "ParseError");
    }
}
const T = (e) => vr(e, Su);
function se(e, t) {
    var i;
    const r = Array.isArray(e),
        n = Object.entries(e).flatMap((a, o) => {
            const l = r ? t(o, a[1]) : t(...a, o);
            return Array.isArray(l[0]) || l.length === 0 ? l : [l];
        }),
        s = Object.fromEntries(n);
    return typeof ((i = n[0]) == null ? void 0 : i[0]) == "number" ? Object.values(s) : s;
}
const mt = (e) => Object.entries(e),
    Nn = (e) => Object.fromEntries(e),
    Me = (e, t) => e in t,
    Ou = class {
        constructor(e) {
            Object.assign(this, e);
        }
    };
class Tu extends Ou {}
const ba = class {};
class _a extends ba {}
const ka = (e, t) => {
        const r = {},
            n = {};
        let s;
        for (s in e) s in t ? (r[s] = e[s]) : (n[s] = e[s]);
        return [r, n];
    },
    Cu = (e, t) => ka(e, t)[0],
    wa = (e, t) => ka(e, t)[1],
    ds = (e) => Object.keys(e).length === 0,
    Hn = (e) => [...Object.entries(e), ...Object.getOwnPropertySymbols(e).map((t) => [t, e[t]])],
    Iu = (e, t) => Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)),
    Ut = Symbol("represents an uninitialized value"),
    Rn = (e, t) => {
        t.addInitializer(function () {
            this[t.name] = this[t.name].bind(this);
        });
    },
    fs = (e, t) =>
        function () {
            const r = e.call(this);
            return (
                Object.defineProperty(
                    this,
                    t.name,
                    t.kind === "getter" ? { value: r } : { value: () => r, enumerable: !1 },
                ),
                r
            );
        },
    Nu = (e) => {
        let t = Ut;
        return () => (t === Ut ? (t = e()) : t);
    },
    $a = (e) => typeof e == "function" && e.length === 0,
    Ru = class extends Function {
        constructor(...e) {
            const t = e.slice(0, -1),
                r = e.at(-1);
            try {
                super(...t, r);
            } catch (n) {
                return Ye(`Encountered an unexpected error while compiling your definition:
                Message: ${n} 
                Source: (${e.slice(0, -1)}) => {
                    ${e.at(-1)}
                }`);
            }
        }
    };
class hs extends ba {
    constructor(t, r) {
        return (
            super(),
            Object.assign(
                Object.setPrototypeOf(t.bind((r == null ? void 0 : r.bind) ?? this), this.constructor.prototype),
                r == null ? void 0 : r.attach,
            )
        );
    }
}
const Mu = Nu(() => {
        try {
            return new Function("return false")();
        } catch {
            return !0;
        }
    }),
    zr = (e, t) => ut(e) === t,
    ut = (e) => {
        const t = typeof e;
        return t === "object" ? (e === null ? "null" : "object") : t === "function" ? "object" : t;
    },
    ju = { boolean: "boolean", null: "null", undefined: "undefined" },
    Pu = { bigint: "a bigint", number: "a number", object: "an object", string: "a string", symbol: "a symbol" },
    xa = { ...Pu, ...ju },
    Wt = { Array, Date, Error, Function, Map, RegExp, Set, String, Number, Boolean, WeakMap, WeakSet, Promise },
    ps = (e) => {
        var n;
        let t = Object.getPrototypeOf(e);
        for (; t != null && t.constructor && (!Me(t.constructor.name, Wt) || !(e instanceof Wt[t.constructor.name])); )
            t = Object.getPrototypeOf(t);
        const r = (n = t == null ? void 0 : t.constructor) == null ? void 0 : n.name;
        if (!(r === void 0 || r === "Object")) return r;
    },
    Gn = (e) => (typeof e == "object" && e !== null ? ps(e) ?? "object" : ut(e)),
    qe = (e) => Array.isArray(e),
    zu = {
        Array: "an array",
        Function: "a function",
        Date: "a Date",
        RegExp: "a RegExp",
        Error: "an Error",
        Map: "a Map",
        Set: "a Set",
        String: "a String object",
        Number: "a Number object",
        Boolean: "a Boolean object",
        Promise: "a Promise",
        WeakMap: "a WeakMap",
        WeakSet: "a WeakSet",
    },
    Ea = (e) => {
        const t = Object(e).name ?? null;
        return t && Me(t, Wt) && Wt[t] === e ? t : null;
    },
    Et = (e) => {
        const t = [];
        let r = e;
        for (; r !== Object.prototype && r !== null && r !== void 0; ) {
            for (const n of Object.getOwnPropertyNames(r)) n !== "constructor" && !t.includes(n) && t.push(n);
            for (const n of Object.getOwnPropertySymbols(r)) t.includes(n) || t.push(n);
            r = Object.getPrototypeOf(r);
        }
        return t;
    },
    Lu = {
        bigint: Et(0n),
        boolean: Et(!1),
        null: [],
        number: Et(0),
        object: [],
        string: Et(""),
        symbol: Et(Symbol()),
        undefined: [],
    },
    Du = (e) => [...Lu[e]],
    Ys = (e, t) => {
        let r = e.prototype;
        for (; r !== null; ) {
            if (r === t.prototype) return !0;
            r = Object.getPrototypeOf(r);
        }
        return !1;
    },
    Aa = (e) => (typeof e == "string" ? JSON.stringify(e) : typeof e == "bigint" ? `${e}n` : `${e}`),
    Sa = {};
globalThis.$ark = Sa;
const Xs = new WeakMap(),
    Mn = {},
    on = (e) => {
        const t = Xs.get(e);
        if (t) return t;
        let r = qu(e);
        return Mn[r] ? (r = `${r}${Mn[r]++}`) : (Mn[r] = 1), (Sa[r] = e), Xs.set(e, r), r;
    },
    Bu = (e) => `$ark.${e}`,
    wt = (e) => Bu(on(e)),
    ln = (e) => /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(e),
    ms = (e) => (zr(e, "object") || typeof e == "symbol" ? wt(e) : Aa(e)),
    qu = (e) => {
        switch (typeof e) {
            case "object": {
                if (e === null) break;
                const t = ps(e) ?? "object";
                return t[0].toLowerCase() + t.slice(1);
            }
            case "function":
                return ln(e.name) ? e.name : "fn";
            case "symbol":
                return e.description && ln(e.description) ? e.description : "symbol";
        }
        return Ye(`Unexpected attempt to register serializable value of type ${ut(e)}`);
    };
class Oa extends _a {
    constructor(...r) {
        super();
        f(this, "argNames");
        f(this, "body", "");
        f(this, "indentation", 0);
        this.argNames = r;
        for (const n of r) {
            if (n in this) throw new Error(`Arg name '${n}' would overwrite an existing property on FunctionBody`);
            this[n] = n;
        }
    }
    indent() {
        return (this.indentation += 4), this;
    }
    dedent() {
        return (this.indentation -= 4), this;
    }
    prop(r, n = !1) {
        return Ta(r, n);
    }
    index(r, n = !1) {
        return Ca(`${r}`, n);
    }
    line(r) {
        return (
            (this.body += `${" ".repeat(this.indentation)}${r}
`),
            this
        );
    }
    const(r, n) {
        return this.line(`const ${r} = ${n}`), this;
    }
    let(r, n) {
        return this.line(`let ${r} = ${n}`);
    }
    set(r, n) {
        return this.line(`${r} = ${n}`);
    }
    if(r, n) {
        return this.block(`if (${r})`, n);
    }
    elseIf(r, n) {
        return this.block(`else if (${r})`, n);
    }
    else(r) {
        return this.block("else", r);
    }
    for(r, n, s = 0) {
        return this.block(`for (let i = ${s}; ${r}; i++)`, n);
    }
    forIn(r, n) {
        return this.block(`for (const k in ${r})`, n);
    }
    block(r, n, s = "") {
        return this.line(`${r} {`), this.indent(), n(this), this.dedent(), this.line(`}${s}`);
    }
    return(r = "") {
        return this.line(`return ${r}`);
    }
    compile() {
        return new Ru(...this.argNames, this.body);
    }
}
const Ta = (e, t = !1) => (typeof e == "string" && ln(e) ? `${t ? "?" : ""}.${e}` : Ca(Ku(e), t)),
    Ku = (e) => (typeof e == "symbol" ? wt(e) : JSON.stringify(e)),
    Ca = (e, t = !1) => `${t ? "?." : ""}[${e}]`;
var Qs;
(function (e) {
    class t {}
    e.Kind = t;
    class r {}
    (e.Instantiable = r), (e.reify = (s) => s.hkt);
    class n {}
    (e.UnaryKind = n),
        (e.pipe =
            (...s) =>
            (i) =>
                s.reduce((a, o) => o.hkt(a), i));
})(Qs || (Qs = {}));
const Yn = /^(?!^-0$)-?(?:0|[1-9]\d*)(?:\.\d*[1-9])?$/,
    Fu = Yn.test.bind(Yn),
    Zu = /^-?\d*\.?\d*$/,
    Vu = (e) => e.length !== 0 && Zu.test(e),
    un = /^(?:0|(?:-?[1-9]\d*))$/,
    Ia = un.test.bind(un),
    Xn = /^-?\d+$/,
    Uu = Xn.test.bind(Xn),
    Na = { number: "a number", bigint: "a bigint", integer: "an integer" },
    Ra = (e, t) =>
        `'${e}' was parsed as ${Na[t]} but could not be narrowed to a literal value. Avoid unnecessary leading or trailing zeros and other abnormal notation`,
    Wu = (e, t) => (t === "number" ? Fu(e) : Ia(e)),
    Ju = (e, t) => (t === "number" ? Number(e) : Number.parseInt(e)),
    Hu = (e, t) => (t === "number" ? Vu(e) : Uu(e)),
    Ma = (e, t) => ja(e, "number", t),
    Gu = (e, t) => ja(e, "integer", t),
    ja = (e, t, r) => {
        const n = Ju(e, t);
        return !Number.isNaN(n) && Hu(e, t)
            ? r != null && r.strict
                ? Wu(e, t)
                    ? n
                    : T(Ra(e, t))
                : n
            : r != null && r.errorOnFail
              ? T(
                    (r == null ? void 0 : r.errorOnFail) === !0
                        ? `Failed to parse ${Na[t]} from '${e}'`
                        : r == null
                          ? void 0
                          : r.errorOnFail,
                )
              : void 0;
    },
    Yu = (e) => {
        if (e[e.length - 1] !== "n") return;
        const t = e.slice(0, -1);
        let r;
        try {
            r = BigInt(t);
        } catch {
            return;
        }
        if (un.test(t)) return r;
        if (Xn.test(t)) return T(Ra(e, "bigint"));
    },
    ue = (e, t) => {
        switch (ut(e)) {
            case "object":
                return e instanceof Date ? e.toDateString() : JSON.stringify(Qn(e, cn, []), null, t);
            case "symbol":
                return cn.onSymbol(e);
            default:
                return Aa(e);
        }
    },
    cn = { onCycle: () => "(cycle)", onSymbol: (e) => `Symbol(${on(e)})`, onFunction: (e) => `Function(${on(e)})` },
    Qn = (e, t, r) => {
        switch (ut(e)) {
            case "object": {
                if (typeof e == "function") return cn.onFunction(e);
                if (r.includes(e)) return "(cycle)";
                const n = [...r, e];
                if (Array.isArray(e)) return e.map((i) => Qn(i, t, n));
                if (e instanceof Date) return e.toDateString();
                const s = {};
                for (const i in e) s[i] = Qn(e[i], t, n);
                return s;
            }
            case "symbol":
                return cn.onSymbol(e);
            case "bigint":
                return `${e}n`;
            case "undefined":
                return t.onUndefined ?? "undefined";
            default:
                return e;
        }
    },
    Xu = (e) => e[0].toUpperCase() + e.slice(1),
    Pa = (e) => se(e, (t, r) => [t, qe(r) ? [...r] : r]),
    Qu = (e) => {
        const t = e.reduce((r, n) => (typeof n == "string" && ln(n) ? `${r}.${n}` : `${r}[${ue(n)}]`), "");
        return t[0] === "." ? t.slice(1) : t;
    },
    Ct = Symbol("ArkTypeInternalKind"),
    F = (e, t) => (e == null ? void 0 : e[Ct]) === t,
    dn = (e) => F(e, "root") || F(e, "constraint"),
    ec = ["unit", "proto", "domain"],
    gs = ["required", "optional", "index", "sequence"],
    za = ["regex", "divisor", "exactLength", "max", "min", "maxLength", "minLength", "before", "after"],
    ys = [...za, ...gs, "structure", "predicate"],
    vs = ["alias", "union", "morph", "unit", "intersection", "proto", "domain"],
    tc = [...vs, ...ys],
    La = se(ys, (e, t) => [t, 1]),
    rc = se([...gs, "undeclared"], (e, t) => [t, 1]),
    Da = se(tc, (e, t) => [t, e]),
    Hr = (e) => typeof e == "string" && e in Da,
    fn = (e) => Da[e],
    Ba = (e) => vs.slice(fn(e) + 1),
    bs = (e) => (typeof e == "string" || typeof e == "boolean" || typeof e == "number" || e === null ? e : ms(e)),
    _s = (e) => {
        let t = "{ ";
        for (const [r, n] of Object.entries(e)) t += `${r}: ${ms(n)}, `;
        return t + " }";
    },
    W = (e) => {
        var r, n, s, i;
        const t = e;
        return (
            t.hasAssociatedError &&
                ((r = t.defaults).expected ??
                    (r.expected = (a) => ("description" in a ? a.description : t.defaults.description(a))),
                (n = t.defaults).actual ?? (n.actual = (a) => ue(a)),
                (s = t.defaults).problem ??
                    (s.problem = (a) => `must be ${a.expected}${a.actual ? ` (was ${a.actual})` : ""}`),
                (i = t.defaults).message ??
                    (i.message = (a) => {
                        if (a.path.length === 0) return a.problem;
                        const o = `${a.propString} ${a.problem}`;
                        return o[0] === "[" ? `value at ${o}` : o;
                    })),
            t
        );
    },
    nc = {},
    sc = (e, t) => {
        const r = { ...e };
        let n;
        for (n in t) r[n] = Hr(n) ? { ...e[n], ...t[n] } : t[n];
        return r;
    };
var lm;
class es extends _a {
    constructor(r, n) {
        super();
        f(this, "input");
        f(this, lm, "error");
        f(this, "path");
        f(this, "data");
        f(this, "nodeConfig");
        (this.input = r), Iu(this, r);
        const s = n.data;
        r.code === "union" && (r.errors = r.errors.flatMap((i) => (i.hasCode("union") ? i.errors : i))),
            (this.nodeConfig = n.config[this.code]),
            (this.path = r.path ?? [...n.path]),
            r.relativePath && this.path.push(...r.relativePath),
            (this.data = "data" in r ? r.data : s);
    }
    hasCode(r) {
        return this.code === r;
    }
    get propString() {
        return Qu(this.path);
    }
    get expected() {
        var r, n;
        return this.input.expected ?? ((n = (r = this.nodeConfig).expected) == null ? void 0 : n.call(r, this.input));
    }
    get actual() {
        var r, n;
        return this.input.actual !== void 0
            ? this.input.actual
            : (n = (r = this.nodeConfig).actual) == null
              ? void 0
              : n.call(r, this.data);
    }
    get problem() {
        return this.input.problem ?? this.nodeConfig.problem(this);
    }
    get message() {
        return this.input.message ?? this.nodeConfig.message(this);
    }
    toString() {
        return this.message;
    }
    throw() {
        throw this;
    }
}
lm = Ct;
class Rr extends $u {
    constructor(r) {
        super();
        f(this, "ctx");
        f(this, "byPath", {});
        f(this, "count", 0);
        f(this, "mutable", this);
        this.ctx = r;
    }
    add(r) {
        const n = this.byPath[r.propString];
        if (n) {
            const s = new es(
                    { code: "intersection", errors: n.hasCode("intersection") ? [...n.errors, r] : [n, r] },
                    this.ctx,
                ),
                i = this.indexOf(n);
            (this.mutable[i === -1 ? this.length : i] = s), (this.byPath[r.propString] = s);
        } else (this.byPath[r.propString] = r), this.mutable.push(r);
        this.count++;
    }
    get summary() {
        return this.toString();
    }
    get message() {
        return this.toString();
    }
    toString() {
        return this.join(`
`);
    }
    throw() {
        throw this;
    }
}
class ei {
    constructor(t, r) {
        f(this, "root");
        f(this, "config");
        f(this, "path", []);
        f(this, "queuedMorphs", []);
        f(this, "errors", new Rr(this));
        f(this, "branches", []);
        f(this, "seen", {});
        (this.root = t), (this.config = r);
    }
    get currentBranch() {
        return this.branches.at(-1);
    }
    queueMorphs(t) {
        var n;
        const r = { path: [...this.path], morphs: t };
        ((n = this.currentBranch) == null ? void 0 : n.queuedMorphs.push(r)) ?? this.queuedMorphs.push(r);
    }
    finalize() {
        if (this.hasError()) return this.errors;
        if (this.queuedMorphs.length)
            for (let t = 0; t < this.queuedMorphs.length; t++) {
                const { path: r, morphs: n } = this.queuedMorphs[t],
                    s = r.at(-1);
                let i;
                if (s !== void 0) {
                    i = this.root;
                    for (let a = 0; a < r.length - 1; a++) i = i[r[a]];
                }
                this.path = r;
                for (const a of n) {
                    const o = a(i === void 0 ? this.root : i[s], this);
                    if (o instanceof Rr) return o;
                    if (this.hasError()) return this.errors;
                    if (o instanceof es) return this.error(o), this.errors;
                    i === void 0 ? (this.root = o) : (i[s] = o);
                }
            }
        return this.root;
    }
    get currentErrorCount() {
        return this.currentBranch ? (this.currentBranch.error ? 1 : 0) : this.errors.count;
    }
    hasError() {
        return this.currentErrorCount !== 0;
    }
    get failFast() {
        return this.branches.length !== 0;
    }
    error(t) {
        const r =
                typeof t == "object" ? (t.code ? t : { ...t, code: "predicate" }) : { code: "predicate", expected: t },
            n = new es(r, this);
        return this.currentBranch ? (this.currentBranch.error = n) : this.errors.add(n), n;
    }
    get data() {
        let t = this.root;
        for (const r of this.path) t = t == null ? void 0 : t[r];
        return t;
    }
    invalid(t) {
        return this.error(t), !1;
    }
    pushBranch() {
        this.branches.push({ error: void 0, queuedMorphs: [] });
    }
    popBranch() {
        return this.branches.pop();
    }
}
class qa extends hs {
    constructor(r) {
        super(
            (n, s) => {
                if (!this.includesMorph && !this.allowsRequiresContext && this.allows(n)) return n;
                if (s) return this.traverseApply(n, s);
                const i = new ei(n, this.$.resolvedConfig);
                return this.traverseApply(n, i), i.finalize();
            },
            { attach: r },
        );
        f(this, "attachments");
        f(this, "qualifiedId", `${this.$.id}${this.id}`);
        f(
            this,
            "includesMorph",
            this.kind === "morph" ||
                (this.hasKind("optional") && this.hasDefault()) ||
                (this.hasKind("structure") && this.undeclared === "delete") ||
                this.children.some((r) => r.includesMorph),
        );
        f(
            this,
            "allowsRequiresContext",
            (this.hasKind("predicate") && this.inner.predicate.length !== 1) ||
                this.kind === "alias" ||
                this.children.some((r) => r.allowsRequiresContext),
        );
        f(
            this,
            "referencesById",
            this.children.reduce((r, n) => Object.assign(r, n.referencesById), { [this.id]: this }),
        );
        f(this, "precedence", fn(this.kind));
        f(this, "jit", !1);
        f(this, "allows", (r) =>
            this.allowsRequiresContext
                ? this.traverseAllows(r, new ei(r, this.$.resolvedConfig))
                : this.traverseAllows(r),
        );
        f(this, "_in");
        f(this, "_out");
        f(this, "_description");
        this.attachments = r;
    }
    get references() {
        return Object.values(this.referencesById);
    }
    traverse(r) {
        return this(r);
    }
    get in() {
        return this._in ?? (this._in = this.getIo("in")), this._in;
    }
    get out() {
        return this._out ?? (this._out = this.getIo("out")), this._out;
    }
    get description() {
        var r, n;
        return (
            this._description ??
                (this._description =
                    this.inner.description ??
                    ((n = (r = this.$.resolvedConfig[this.kind]).description) == null ? void 0 : n.call(r, this))),
            this._description
        );
    }
    getIo(r) {
        if (!this.includesMorph) return this;
        const n = {};
        for (const [s, i] of this.entries) {
            const a = this.impl.keys[s];
            if (!a.meta)
                if (a.child) {
                    const o = i;
                    n[s] = qe(o) ? o.map((l) => l[r]) : o[r];
                } else n[s] = i;
        }
        return this.$.node(this.kind, n);
    }
    toJSON() {
        return this.json;
    }
    toString() {
        return this.expression;
    }
    equals(r) {
        return this.typeHash === r.typeHash;
    }
    assertHasKind(r) {
        return !this.kind === r && vr(`${this.kind} node was not of asserted kind ${r}`), this;
    }
    hasKind(r) {
        return this.kind === r;
    }
    isBasis() {
        return gr(ec, this.kind);
    }
    isConstraint() {
        return gr(ys, this.kind);
    }
    isRefinement() {
        return gr(za, this.kind);
    }
    isRoot() {
        return gr(vs, this.kind);
    }
    hasUnit(r) {
        return this.hasKind("unit") && this.allows(r);
    }
    hasOpenIntersection() {
        return this.impl.intersectionIsOpen;
    }
    get nestableExpression() {
        return this.expression;
    }
    bindScope(r) {
        return this.$ === r ? this : new this.constructor(Object.assign(Eu(this.attachments), { $: r }));
    }
    firstReference(r) {
        return this.references.find((n) => n !== this && r(n));
    }
    firstReferenceOrThrow(r) {
        return this.firstReference(r) ?? vr(`${this.id} had no references matching predicate ${r}`);
    }
    firstReferenceOfKind(r) {
        return this.firstReference((n) => n.kind === r);
    }
    firstReferenceOfKindOrThrow(r) {
        return this.firstReference((n) => n.kind === r) ?? vr(`${this.id} had no ${r} references`);
    }
    transform(r, n) {
        return this._transform(r, {
            seen: {},
            path: [],
            shouldTransform: (n == null ? void 0 : n.shouldTransform) ?? (() => !0),
        });
    }
    _transform(r, n) {
        if (n.seen[this.id]) return this.$.lazilyResolve(n.seen[this.id]);
        if (!n.shouldTransform(this, n)) return this;
        let s;
        n.seen[this.id] = () => s;
        const i = se(this.inner, (o, l) => {
            if (!this.impl.keys[o].child) return [o, l];
            const u = l;
            if (!qe(u)) {
                const h = u._transform(r, n);
                return h ? [o, h] : [];
            }
            const c = u.flatMap((h) => h._transform(r, n) ?? []);
            return c.length ? [o, c] : [];
        });
        delete n.seen[this.id];
        const a = r(this.kind, i, n);
        return a === null ||
            ds(a) ||
            ((this.kind === "required" || this.kind === "optional" || this.kind === "index") && !("value" in a))
            ? null
            : (this.kind === "morph" && (a.in ?? (a.in = this.$.keywords.unknown)), (s = this.$.node(this.kind, a)));
    }
    configureShallowDescendants(r) {
        const n = typeof r == "string" ? { description: r } : r;
        return this.transform((s, i) => ({ ...i, ...n }), { shouldTransform: (s) => s.kind !== "structure" });
    }
}
class I {
    constructor(t) {
        f(this, "sources");
        this.sources = t;
    }
    clone() {
        return new I(this.sources);
    }
    static from(t, r, n) {
        return new I({ "[]": { [t]: { l: r, r: n } } });
    }
    static fromEntries(t) {
        return t.length ? new I({ "[]": Nn(t) }) : Ye("Unexpected attempt to create a disjoint from no entries");
    }
    get flat() {
        return mt(this.sources).flatMap(([t, r]) => mt(r).map(([n, s]) => ({ path: t, kind: n, disjoint: s })));
    }
    describeReasons() {
        const t = this.flat;
        if (t.length === 1) {
            const { path: r, disjoint: n } = t[0],
                s = JSON.parse(r).join(".");
            return `Intersection${s && ` at ${s}`} of ${ti(n)} results in an unsatisfiable type`;
        }
        return `The following intersections result in unsatisfiable types:
• ${t.map(({ path: r, disjoint: n }) => `${r}: ${ti(n)}`).join(`
• `)}`;
    }
    isEmpty() {
        return this.flat.length === 0;
    }
    throw() {
        return T(this.describeReasons());
    }
    invert() {
        const t = mt(this.sources).map(([r, n]) => [r, se(n, (s, i) => [s, { l: i.r, r: i.l }])]);
        return new I(Nn(t));
    }
    add(t) {
        mt(t.sources).forEach(([r, n]) => Object.assign(this.sources[r] ?? {}, n));
    }
    withPrefixKey(t) {
        const r = mt(this.sources).map(([n, s]) => {
            const i = JSON.parse(n);
            return i.unshift(typeof t == "symbol" ? on(t) : t), [JSON.stringify(i), s];
        });
        return new I(Nn(r));
    }
    toString() {
        return ue(this.sources);
    }
}
const ti = (e) => `${ts(e.l)} and ${ts(e.r)}`,
    ts = (e) => (F(e, "root") ? e.expression : qe(e) ? e.map(ts).join(" | ") : String(e)),
    Mt = {},
    Tt = (e, t, r) => ge(e, t, { $: r, invert: !1, pipe: !1 }),
    ri = (e, t, r) => ge(e, t, { $: r, invert: !1, pipe: !0 }),
    ge = (e, t, r) => {
        const n = r.pipe ? "|>" : "&",
            s = `${e.typeHash}${n}${t.typeHash}`;
        if (Mt[s] !== void 0) return Mt[s];
        if (!r.pipe) {
            const a = `${t.typeHash}${n}${e.typeHash}`;
            if (Mt[a] !== void 0) {
                const o = Mt[a],
                    l = o instanceof I ? o.invert() : o;
                return (Mt[s] = l), l;
            }
        }
        if (e.equals(t)) return e;
        let i;
        if (r.pipe && e.hasKind("morph")) i = r.invert ? si(t, e, r) : ni(e, t, r);
        else if (r.pipe && t.hasKind("morph")) i = r.invert ? ni(t, e, r) : si(e, t, r);
        else {
            const a = e.precedence < t.precedence ? e.kind : t.kind,
                o = e.impl.intersections[t.kind] ?? t.impl.intersections[e.kind];
            i = o === void 0 ? null : a === e.kind ? o(e, t, r) : o(t, e, { ...r, invert: !r.invert });
        }
        return dn(i) && (e.equals(i) ? (i = e) : t.equals(i) && (i = t)), (Mt[s] = i), i;
    },
    ni = (e, t, r) => {
        const n = [...e.morphs];
        if (e.validatedOut) {
            const s = ge(e.validatedOut, t, r);
            if (s instanceof I) return s;
            n[n.length - 1] = s;
        } else n.push(t);
        return r.$.node("morph", { morphs: n, in: e.in });
    },
    si = (e, t, r) => {
        const n = ge(e, t.in, r);
        return n instanceof I ? n : r.$.node("morph", { morphs: t.morphs, in: n });
    };
var um;
class rr extends qa {
    constructor() {
        super(...arguments);
        f(this, um, "constraint");
        f(this, "impliedSiblings");
    }
    intersect(r) {
        return Tt(this, r, this.$);
    }
}
um = Ct;
class wn extends rr {
    constructor() {
        super(...arguments);
        f(this, "traverseApply", (r, n) => {
            this.traverseAllows(r, n) || n.error(this.errorContext);
        });
    }
    compile(r) {
        r.traversalKind === "Allows"
            ? r.return(this.compiledCondition)
            : r.if(this.compiledNegation, () => r.line(`${r.ctx}.error(${this.compiledErrorContext})`));
    }
    get errorContext() {
        return { code: this.kind, description: this.description, ...this.inner };
    }
    get compiledErrorContext() {
        return _s(this.errorContext);
    }
}
const Ae = (e) => (t, r) => {
        if (qe(t))
            return t.length === 0
                ? void 0
                : t.map((s) => r.$.node(e, s)).sort((s, i) => (s.innerHash < i.innerHash ? -1 : 1));
        const n = r.$.node(e, t);
        return n.hasOpenIntersection() ? [n] : n;
    },
    hn = (e) => {
        var n;
        const t = e.r.shift();
        if (!t) {
            let s =
                e.l.length === 0 && e.kind === "structure"
                    ? e.ctx.$.keywords.unknown.raw
                    : e.ctx.$.node(e.kind, Object.assign(e.baseInner, ic(e.l)), { prereduced: !0 });
            for (const i of e.roots) {
                if (s instanceof I) return s;
                s = ge(i, s, e.ctx);
            }
            return s;
        }
        let r = !1;
        for (let s = 0; s < e.l.length; s++) {
            const i = ge(e.l[s], t, e.ctx);
            if (i !== null) {
                if (i instanceof I) return i;
                if (r) {
                    if (!e.l.includes(i))
                        return Ye(
                            `Unexpectedly encountered multiple distinct intersection results for refinement ${i}`,
                        );
                } else {
                    if (i.isRoot()) return e.roots.push(i), e.l.splice(s), hn(e);
                    (e.l[s] = i), (r = !0);
                }
            }
        }
        return (
            r || e.l.push(t),
            e.kind === "intersection" && ((n = t.impliedSiblings) == null || n.forEach((s) => va(e.r, s))),
            hn(e)
        );
    },
    pn = (e) =>
        Object.entries(e)
            .flatMap(([r, n]) => (r in La ? n : []))
            .sort((r, n) =>
                r.precedence < n.precedence ? -1 : r.precedence > n.precedence ? 1 : r.innerHash < n.innerHash ? -1 : 1,
            ),
    ic = (e) => {
        const t = {};
        for (const r of e)
            if (r.hasOpenIntersection()) t[r.kind] = Re(t[r.kind], r);
            else {
                if (t[r.kind]) return Ye(`Unexpected intersection of closed refinements of kind ${r.kind}`);
                t[r.kind] = r;
            }
        return t;
    },
    ac = (...e) => T(oc(...e)),
    oc = (e, t, r) => `${Xu(e)} operand must be ${t.description} (was ${r.exclude(t).description})`,
    lc = (e) => (e.$.schema(e.def, {}), e),
    uc = W({
        kind: "predicate",
        hasAssociatedError: !0,
        collapsibleKey: "predicate",
        keys: { predicate: {} },
        normalize: (e) => (typeof e == "function" ? { predicate: e } : e),
        defaults: { description: (e) => `valid according to ${e.predicate.name || "an anonymous predicate"}` },
        intersectionIsOpen: !0,
        intersections: { predicate: () => null },
    });
class cc extends rr {
    constructor() {
        super(...arguments);
        f(this, "serializedPredicate", wt(this.predicate));
        f(this, "compiledCondition", `${this.serializedPredicate}(data, ctx)`);
        f(this, "compiledNegation", `!${this.compiledCondition}`);
        f(this, "impliedBasis", null);
        f(this, "expression", this.serializedPredicate);
        f(this, "traverseAllows", this.predicate);
        f(this, "errorContext", { code: "predicate", description: this.description });
        f(this, "compiledErrorContext", `{ code: "predicate", description: "${this.description}" }`);
        f(this, "traverseApply", (r, n) => {
            !this.predicate(r, n) && !n.hasError() && n.error(this.errorContext);
        });
    }
    compile(r) {
        if (r.traversalKind === "Allows") {
            r.return(this.compiledCondition);
            return;
        }
        r.if(`${this.compiledNegation} && !ctx.hasError()`, () => r.line(`ctx.error(${this.compiledErrorContext})`));
    }
}
const dc = W({
    kind: "divisor",
    collapsibleKey: "rule",
    keys: { rule: {} },
    normalize: (e) => (typeof e == "number" ? { rule: e } : e),
    hasAssociatedError: !0,
    defaults: { description: (e) => (e.rule === 1 ? "an integer" : `a multiple of ${e.rule}`) },
    intersections: {
        divisor: (e, t, r) => r.$.node("divisor", { rule: Math.abs((e.rule * t.rule) / hc(e.rule, t.rule)) }),
    },
});
class fc extends wn {
    constructor() {
        super(...arguments);
        f(this, "traverseAllows", (r) => r % this.rule === 0);
        f(this, "compiledCondition", `data % ${this.rule} === 0`);
        f(this, "compiledNegation", `data % ${this.rule} !== 0`);
        f(this, "impliedBasis", this.$.keywords.number.raw);
        f(this, "expression", `% ${this.rule}`);
    }
}
const hc = (e, t) => {
    let r,
        n = e,
        s = t;
    for (; s !== 0; ) (r = s), (s = n % s), (n = r);
    return n;
};
class nr extends wn {
    constructor() {
        super(...arguments);
        f(this, "boundOperandKind", gc[this.kind]);
        f(
            this,
            "compiledActual",
            this.boundOperandKind === "value"
                ? "data"
                : this.boundOperandKind === "length"
                  ? "data.length"
                  : "data.valueOf()",
        );
        f(this, "comparator", yc(this.kind, this.exclusive));
        f(this, "numericLimit", this.rule.valueOf());
        f(this, "expression", `${this.comparator}${this.rule}`);
        f(this, "compiledCondition", `${this.compiledActual} ${this.comparator} ${this.numericLimit}`);
        f(this, "compiledNegation", `${this.compiledActual} ${pc[this.comparator]} ${this.numericLimit}`);
        f(this, "stringLimit", this.boundOperandKind === "date" ? vc(this.numericLimit) : `${this.numericLimit}`);
        f(this, "limitKind", this.comparator[0] === "<" ? "upper" : "lower");
    }
    isStricterThan(r) {
        return (
            (this.limitKind === "upper" ? this.numericLimit < r.numericLimit : this.numericLimit > r.numericLimit) ||
            (this.numericLimit === r.numericLimit && this.exclusive === !0 && !r.exclusive)
        );
    }
    overlapsRange(r) {
        return !(this.isStricterThan(r) || (this.numericLimit === r.numericLimit && (this.exclusive || r.exclusive)));
    }
    overlapIsUnit(r) {
        return this.numericLimit === r.numericLimit && !this.exclusive && !r.exclusive;
    }
}
const pc = { "<": ">=", "<=": ">", ">": "<=", ">=": "<" },
    mc = { min: "max", minLength: "maxLength", after: "before" },
    sr = { parse: (e) => e || void 0 },
    Ka = (e) => (typeof e == "string" || typeof e == "number" ? new Date(e) : e),
    gc = { min: "value", max: "value", minLength: "length", maxLength: "length", after: "date", before: "date" },
    yc = (e, t) => `${Me(e, mc) ? ">" : "<"}${t ? "" : "="}`,
    vc = (e) => (typeof e == "string" ? e : new Date(e).toLocaleString()),
    bc = (e) => `Bounded expression ${e} must be a number, string, Array, or Date`,
    _c = W({
        kind: "after",
        collapsibleKey: "rule",
        hasAssociatedError: !0,
        keys: { rule: { parse: Ka, serialize: (e) => e.toISOString() }, exclusive: sr },
        normalize: (e) => (typeof e == "number" || typeof e == "string" || e instanceof Date ? { rule: e } : e),
        defaults: {
            description: (e) => (e.exclusive ? `after ${e.stringLimit}` : `${e.stringLimit} or later`),
            actual: (e) => e.toLocaleString(),
        },
        intersections: { after: (e, t) => (e.isStricterThan(t) ? e : t) },
    });
class kc extends nr {
    constructor() {
        super(...arguments);
        f(this, "impliedBasis", this.$.keywords.Date.raw);
        f(this, "traverseAllows", this.exclusive ? (r) => r > this.rule : (r) => r >= this.rule);
    }
}
const wc = W({
    kind: "before",
    collapsibleKey: "rule",
    hasAssociatedError: !0,
    keys: { rule: { parse: Ka, serialize: (e) => e.toISOString() }, exclusive: sr },
    normalize: (e) => (typeof e == "number" || typeof e == "string" || e instanceof Date ? { rule: e } : e),
    defaults: {
        description: (e) => (e.exclusive ? `before ${e.stringLimit}` : `${e.stringLimit} or earlier`),
        actual: (e) => e.toLocaleString(),
    },
    intersections: {
        before: (e, t) => (e.isStricterThan(t) ? e : t),
        after: (e, t, r) =>
            e.overlapsRange(t)
                ? e.overlapIsUnit(t)
                    ? r.$.node("unit", { unit: e.rule })
                    : null
                : I.from("range", e, t),
    },
});
class $c extends nr {
    constructor() {
        super(...arguments);
        f(this, "traverseAllows", this.exclusive ? (r) => r < this.rule : (r) => r <= this.rule);
        f(this, "impliedBasis", this.$.keywords.Date.raw);
    }
}
const xc = W({
    kind: "exactLength",
    collapsibleKey: "rule",
    keys: { rule: {} },
    normalize: (e) => (typeof e == "number" ? { rule: e } : e),
    hasAssociatedError: !0,
    defaults: { description: (e) => `exactly length ${e.rule}` },
    intersections: {
        exactLength: (e, t, r) =>
            new I({
                '["length"]': {
                    unit: { l: r.$.node("unit", { unit: e.rule }), r: r.$.node("unit", { unit: t.rule }) },
                },
            }),
        minLength: (e, t) => ((t.exclusive ? e.rule > t.rule : e.rule >= t.rule) ? e : I.from("range", e, t)),
        maxLength: (e, t) => ((t.exclusive ? e.rule < t.rule : e.rule <= t.rule) ? e : I.from("range", e, t)),
    },
});
class Ec extends wn {
    constructor() {
        super(...arguments);
        f(this, "traverseAllows", (r) => r.length === this.rule);
        f(this, "compiledCondition", `data.length === ${this.rule}`);
        f(this, "compiledNegation", `data.length !== ${this.rule}`);
        f(this, "impliedBasis", this.$.keywords.lengthBoundable.raw);
        f(this, "expression", `{ length: ${this.rule} }`);
    }
}
const Ac = W({
    kind: "max",
    collapsibleKey: "rule",
    hasAssociatedError: !0,
    keys: { rule: {}, exclusive: sr },
    normalize: (e) => (typeof e == "number" ? { rule: e } : e),
    defaults: { description: (e) => `${e.exclusive ? "less than" : "at most"} ${e.rule}` },
    intersections: {
        max: (e, t) => (e.isStricterThan(t) ? e : t),
        min: (e, t, r) =>
            e.overlapsRange(t)
                ? e.overlapIsUnit(t)
                    ? r.$.node("unit", { unit: e.rule })
                    : null
                : I.from("range", e, t),
    },
});
class Sc extends nr {
    constructor() {
        super(...arguments);
        f(this, "impliedBasis", this.$.keywords.number.raw);
        f(this, "traverseAllows", this.exclusive ? (r) => r < this.rule : (r) => r <= this.rule);
    }
}
const Oc = W({
    kind: "maxLength",
    collapsibleKey: "rule",
    hasAssociatedError: !0,
    keys: { rule: {}, exclusive: sr },
    normalize: (e) => (typeof e == "number" ? { rule: e } : e),
    defaults: {
        description: (e) => (e.exclusive ? `less than length ${e.rule}` : `at most length ${e.rule}`),
        actual: (e) => `${e.length}`,
    },
    intersections: {
        maxLength: (e, t) => (e.isStricterThan(t) ? e : t),
        minLength: (e, t, r) =>
            e.overlapsRange(t)
                ? e.overlapIsUnit(t)
                    ? r.$.node("exactLength", { rule: e.rule })
                    : null
                : I.from("range", e, t),
    },
});
class Tc extends nr {
    constructor() {
        super(...arguments);
        f(this, "impliedBasis", this.$.keywords.lengthBoundable.raw);
        f(this, "traverseAllows", this.exclusive ? (r) => r.length < this.rule : (r) => r.length <= this.rule);
    }
}
const Cc = W({
    kind: "min",
    collapsibleKey: "rule",
    hasAssociatedError: !0,
    keys: { rule: {}, exclusive: sr },
    normalize: (e) => (typeof e == "number" ? { rule: e } : e),
    defaults: { description: (e) => `${e.exclusive ? "more than" : "at least"} ${e.rule}` },
    intersections: { min: (e, t) => (e.isStricterThan(t) ? e : t) },
});
class Ic extends nr {
    constructor() {
        super(...arguments);
        f(this, "impliedBasis", this.$.keywords.number.raw);
        f(this, "traverseAllows", this.exclusive ? (r) => r > this.rule : (r) => r >= this.rule);
    }
}
const Nc = W({
    kind: "minLength",
    collapsibleKey: "rule",
    hasAssociatedError: !0,
    keys: { rule: {}, exclusive: sr },
    normalize: (e) => (typeof e == "number" ? { rule: e } : e),
    defaults: {
        description: (e) =>
            e.exclusive
                ? e.rule === 0
                    ? "non-empty"
                    : `more than length ${e.rule}`
                : e.rule === 1
                  ? "non-empty"
                  : `at least length ${e.rule}`,
        actual: (e) => `${e.length}`,
    },
    intersections: { minLength: (e, t) => (e.isStricterThan(t) ? e : t) },
});
class Rc extends nr {
    constructor() {
        super(...arguments);
        f(this, "impliedBasis", this.$.keywords.lengthBoundable.raw);
        f(this, "traverseAllows", this.exclusive ? (r) => r.length > this.rule : (r) => r.length >= this.rule);
    }
}
const Mc = { min: Cc, max: Ac, minLength: Nc, maxLength: Oc, exactLength: xc, after: _c, before: wc },
    jc = { min: Ic, max: Sc, minLength: Rc, maxLength: Tc, exactLength: Ec, after: kc, before: $c },
    Pc = W({
        kind: "regex",
        collapsibleKey: "rule",
        keys: { rule: {}, flags: {} },
        normalize: (e) =>
            typeof e == "string"
                ? { rule: e }
                : e instanceof RegExp
                  ? e.flags
                      ? { rule: e.source, flags: e.flags }
                      : { rule: e.source }
                  : e,
        hasAssociatedError: !0,
        intersectionIsOpen: !0,
        defaults: { description: (e) => `matched by ${e.rule}` },
        intersections: { regex: () => null },
    });
class zc extends wn {
    constructor() {
        super(...arguments);
        f(this, "instance", new RegExp(this.rule, this.flags));
        f(this, "expression", `${this.instance}`);
        f(this, "traverseAllows", this.instance.test.bind(this.instance));
        f(this, "compiledCondition", `${this.expression}.test(data)`);
        f(this, "compiledNegation", `!${this.compiledCondition}`);
        f(this, "impliedBasis", this.$.keywords.string.raw);
    }
}
var cm;
class ir extends qa {
    constructor() {
        super(...arguments);
        f(this, "branches", this.hasKind("union") ? this.inner.branches : [this]);
        f(this, cm, "root");
        f(this, "_keyof");
    }
    get raw() {
        return this;
    }
    keyof() {
        return (
            this._keyof ||
                ((this._keyof = this.rawKeyOf()),
                this._keyof.branches.length === 0 && T(`keyof ${this.expression} results in an unsatisfiable type`)),
            this._keyof
        );
    }
    intersect(r) {
        const n = this.$.parseRoot(r);
        return Tt(this, n, this.$);
    }
    and(r) {
        const n = this.intersect(r);
        return n instanceof I ? n.throw() : n;
    }
    or(r) {
        const n = this.$.parseRoot(r),
            s = [...this.branches, ...n.branches];
        return this.$.schema(s);
    }
    assert(r) {
        const n = this.traverse(r);
        return n instanceof Rr ? n.throw() : n;
    }
    extract(r) {
        const n = this.$.parseRoot(r);
        return this.$.schema(this.branches.filter((s) => s.extends(n)));
    }
    exclude(r) {
        const n = this.$.parseRoot(r);
        return this.$.schema(this.branches.filter((s) => !s.extends(n)));
    }
    array() {
        return this.$.schema({ proto: Array, sequence: this }, { prereduced: !0 });
    }
    extends(r) {
        const n = this.intersect(r);
        return !(n instanceof I) && this.equals(n);
    }
    subsumes(r) {
        return r.extends(this);
    }
    configure(r) {
        return this.configureShallowDescendants(r);
    }
    describe(r) {
        return this.configure(r);
    }
    from(r) {
        return this.assert(r);
    }
    pipe(...r) {
        return r.reduce((n, s) => n.pipeOnce(s), this);
    }
    pipeOnce(r) {
        if (F(r, "root")) {
            const n = ri(this, r, this.$);
            return n instanceof I ? n.throw() : n;
        }
        if (this.hasKind("union")) {
            const n = this.branches.map((s) => s.pipe(r));
            return this.$.node("union", { ...this.inner, branches: n });
        }
        return this.hasKind("morph")
            ? this.$.node("morph", { ...this.inner, morphs: [...this.morphs, r] })
            : this.$.node("morph", { in: this, morphs: [r] });
    }
    narrow(r) {
        return this.constrainOut("predicate", r);
    }
    constrain(r, n) {
        return this._constrain("in", r, n);
    }
    constrainOut(r, n) {
        return this._constrain("out", r, n);
    }
    _constrain(r, n, s) {
        const i = this.$.node(n, s);
        if (i.impliedBasis && !this[r].extends(i.impliedBasis)) return ac(n, i.impliedBasis, this);
        const a = this.$.node("intersection", { [n]: i }),
            o = r === "in" ? Tt(this, a, this.$) : ri(this, a, this.$);
        return o instanceof I && o.throw(), o;
    }
    onUndeclaredKey(r) {
        return this.transform(
            (n, s) => (n === "structure" ? (r === "ignore" ? wa(s, { undeclared: 1 }) : { ...s, undeclared: r }) : s),
            { shouldTransform: (n) => !gr(gs, n.kind) },
        );
    }
}
cm = Ct;
const Lr = (e, t) => se(Ba(e), (r, n) => [n, t]);
var Lc = function (e, t, r) {
        for (var n = arguments.length > 2, s = 0; s < t.length; s++) r = n ? t[s].call(e, r) : t[s].call(e);
        return n ? r : void 0;
    },
    Dc = function (e, t, r, n, s, i) {
        function a(w) {
            if (w !== void 0 && typeof w != "function") throw new TypeError("Function expected");
            return w;
        }
        for (
            var o = n.kind,
                l = o === "getter" ? "get" : o === "setter" ? "set" : "value",
                u = !t && e ? (n.static ? e : e.prototype) : null,
                c = t || (u ? Object.getOwnPropertyDescriptor(u, n.name) : {}),
                h,
                x = !1,
                g = r.length - 1;
            g >= 0;
            g--
        ) {
            var _ = {};
            for (var y in n) _[y] = y === "access" ? {} : n[y];
            for (var y in n.access) _.access[y] = n.access[y];
            _.addInitializer = function (w) {
                if (x) throw new TypeError("Cannot add initializers after decoration has completed");
                i.push(a(w || null));
            };
            var m = (0, r[g])(o === "accessor" ? { get: c.get, set: c.set } : c[l], _);
            if (o === "accessor") {
                if (m === void 0) continue;
                if (m === null || typeof m != "object") throw new TypeError("Object expected");
                (h = a(m.get)) && (c.get = h), (h = a(m.set)) && (c.set = h), (h = a(m.init)) && s.unshift(h);
            } else (h = a(m)) && (o === "field" ? s.unshift(h) : (c[l] = h));
        }
        u && Object.defineProperty(u, n.name, c), (x = !0);
    };
let Bc = (() => {
    var n;
    let e = ir,
        t = [],
        r;
    return (
        (n = class extends e {
            constructor() {
                super(...arguments);
                f(this, "expression", (Lc(this, t), this.alias));
                f(this, "traverseAllows", (a, o) => {
                    const l = o.seen[this.id];
                    return l != null && l.includes(a)
                        ? !0
                        : ((o.seen[this.id] = Re(l, a)), this.resolution.traverseAllows(a, o));
                });
                f(this, "traverseApply", (a, o) => {
                    const l = o.seen[this.id];
                    (l != null && l.includes(a)) || ((o.seen[this.id] = Re(l, a)), this.resolution.traverseApply(a, o));
                });
            }
            get resolution() {
                var a;
                return ((a = this.resolve) == null ? void 0 : a.call(this)) ?? this.$.resolveRoot(this.alias);
            }
            rawKeyOf() {
                return this.resolution.keyof();
            }
            compile(a) {
                a.if(`ctx.seen.${this.id}?.includes(data)`, () => a.return(!0)),
                    a.line(`ctx.seen.${this.id} ??= []`).line(`ctx.seen.${this.id}.push(data)`),
                    a.return(a.invoke(this.resolution));
            }
        }),
        (() => {
            const a =
                typeof Symbol == "function" && Symbol.metadata ? Object.create(e[Symbol.metadata] ?? null) : void 0;
            (r = [fs]),
                Dc(
                    n,
                    null,
                    r,
                    {
                        kind: "getter",
                        name: "resolution",
                        static: !1,
                        private: !1,
                        access: { has: (o) => "resolution" in o, get: (o) => o.resolution },
                        metadata: a,
                    },
                    null,
                    t,
                ),
                a &&
                    Object.defineProperty(n, Symbol.metadata, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: a,
                    });
        })(),
        n
    );
})();
const Fa = (e) => (typeof e == "string" ? { alias: e.slice(1) } : e),
    qc = W({
        kind: "alias",
        hasAssociatedError: !1,
        collapsibleKey: "alias",
        keys: { alias: { serialize: (e) => `$${e}` }, resolve: {} },
        normalize: Fa,
        defaults: { description: (e) => e.alias },
        intersections: {
            alias: (e, t, r) =>
                r.$.lazilyResolve(
                    () => ii(ge(e.resolution, t.resolution, r), r.$),
                    `${e.alias}${r.pipe ? "|>" : "&"}${t.alias}`,
                ),
            ...Lr("alias", (e, t, r) =>
                r.$.lazilyResolve(() => ii(ge(e.resolution, t, r), r.$), `${e.alias}${r.pipe ? "|>" : "&"}${t.alias}`),
            ),
        },
    }),
    ii = (e, t) => (e instanceof I ? t.keywords.never.raw : e);
class ks extends ir {
    constructor() {
        super(...arguments);
        f(this, "traverseApply", (r, n) => {
            this.traverseAllows(r, n) || n.error(this.errorContext);
        });
    }
    rawKeyOf() {
        return this.$.units(this.literalKeys);
    }
    get errorContext() {
        return { code: this.kind, description: this.description, ...this.inner };
    }
    get compiledErrorContext() {
        return _s(this.errorContext);
    }
    compile(r) {
        r.traversalKind === "Allows"
            ? r.return(this.compiledCondition)
            : r.if(this.compiledNegation, () => r.line(`${r.ctx}.error(${this.compiledErrorContext})`));
    }
}
class Kc extends ks {
    constructor() {
        super(...arguments);
        f(this, "traverseAllows", (r) => ut(r) === this.domain);
        f(
            this,
            "compiledCondition",
            this.domain === "object"
                ? '((typeof data === "object" && data !== null) || typeof data === "function")'
                : `typeof data === "${this.domain}"`,
        );
        f(
            this,
            "compiledNegation",
            this.domain === "object"
                ? '((typeof data !== "object" || data === null) && typeof data !== "function")'
                : `typeof data !== "${this.domain}"`,
        );
        f(this, "expression", this.domain);
        f(this, "literalKeys", Du(this.domain));
    }
}
const Fc = W({
        kind: "domain",
        hasAssociatedError: !0,
        collapsibleKey: "domain",
        keys: { domain: {} },
        normalize: (e) => (typeof e == "string" ? { domain: e } : e),
        defaults: { description: (e) => xa[e.domain], actual: (e) => (typeof e == "boolean" ? `${e}` : ut(e)) },
        intersections: { domain: (e, t) => I.from("domain", e, t) },
    }),
    Za = { description: 1 };
var Fi;
class Zc extends ir {
    constructor() {
        super(...arguments);
        f(this, "basis", this.domain ?? this.proto ?? null);
        f(
            this,
            "refinements",
            this.children.filter((r) => r.isRefinement()),
        );
        f(
            this,
            "expression",
            ((Fi = this.structure) == null ? void 0 : Fi.expression) ||
                this.children.map((r) => r.nestableExpression).join(" & ") ||
                "unknown",
        );
        f(this, "traverseAllows", (r, n) => this.children.every((s) => s.traverseAllows(r, n)));
        f(this, "traverseApply", (r, n) => {
            const s = n.currentErrorCount;
            if (!(this.basis && (this.basis.traverseApply(r, n), n.currentErrorCount > s))) {
                if (this.refinements.length) {
                    for (let i = 0; i < this.refinements.length - 1; i++)
                        if ((this.refinements[i].traverseApply(r, n), n.failFast && n.currentErrorCount > s)) return;
                    if ((this.refinements.at(-1).traverseApply(r, n), n.currentErrorCount > s)) return;
                }
                if (
                    !(this.structure && (this.structure.traverseApply(r, n), n.currentErrorCount > s)) &&
                    this.predicate
                ) {
                    for (let i = 0; i < this.predicate.length - 1; i++)
                        if ((this.predicate[i].traverseApply(r, n), n.failFast && n.currentErrorCount > s)) return;
                    this.predicate.at(-1).traverseApply(r, n);
                }
            }
        });
    }
    compile(r) {
        if (r.traversalKind === "Allows") {
            this.children.forEach((n) => r.check(n)), r.return(!0);
            return;
        }
        if (
            (r.initializeErrorCount(),
            this.basis && (r.check(this.basis), this.children.length > 1 && r.returnIfFail()),
            this.refinements.length)
        ) {
            for (let n = 0; n < this.refinements.length - 1; n++) r.check(this.refinements[n]), r.returnIfFailFast();
            r.check(this.refinements.at(-1)), (this.structure || this.predicate) && r.returnIfFail();
        }
        if ((this.structure && (r.check(this.structure), this.predicate && r.returnIfFail()), this.predicate)) {
            for (let n = 0; n < this.predicate.length - 1; n++) r.check(this.predicate[n]), r.returnIfFail();
            r.check(this.predicate.at(-1));
        }
    }
    rawKeyOf() {
        var r;
        return this.basis
            ? this.structure
                ? this.basis.rawKeyOf().or(this.structure.keyof())
                : this.basis.rawKeyOf()
            : ((r = this.structure) == null ? void 0 : r.keyof()) ?? this.$.keywords.never.raw;
    }
}
const mn = (e, t, r) => {
        if (F(e, "root") && e.hasKind("intersection")) return mn(e.inner, t, r);
        if (F(t, "root") && t.hasKind("intersection")) return mn(e, t.inner, r);
        const n = ds(e) ? Cu(t, Za) : {},
            s = e.proto ?? e.domain,
            i = t.proto ?? t.domain,
            a = s ? (i ? ge(s, i, r) : s) : i;
        return a instanceof I
            ? a
            : (a && (n[a.kind] = a), hn({ kind: "intersection", baseInner: n, l: pn(e), r: pn(t), roots: [], ctx: r }));
    },
    Vc = W({
        kind: "intersection",
        hasAssociatedError: !0,
        normalize: (e) => {
            if (dn(e)) return e;
            const { structure: t, ...r } = e,
                n = !!t,
                s = t ?? {},
                i = se(r, (a, o) =>
                    Me(a, rc)
                        ? (n && T(`Flattened structure key ${a} cannot be specified alongside a root 'structure' key.`),
                          (s[a] = o),
                          [])
                        : [a, o],
                );
            return ds(s) || (i.structure = s), i;
        },
        finalizeJson: ({ structure: e, ...t }) => (zr(e, "object") ? { ...e, ...t } : t),
        keys: {
            domain: { child: !0, parse: (e, t) => t.$.node("domain", e) },
            proto: { child: !0, parse: (e, t) => t.$.node("proto", e) },
            structure: {
                child: !0,
                parse: (e, t) => t.$.node("structure", e),
                serialize: (e) => {
                    var a;
                    if (!((a = e.sequence) != null && a.minLength)) return e.collapsibleJson;
                    const { sequence: t, ...r } = e.collapsibleJson,
                        { minVariadicLength: n, ...s } = t,
                        i = s.variadic && Object.keys(s).length === 1 ? s.variadic : s;
                    return { ...r, sequence: i };
                },
            },
            divisor: { child: !0, parse: Ae("divisor") },
            max: { child: !0, parse: Ae("max") },
            min: { child: !0, parse: Ae("min") },
            maxLength: { child: !0, parse: Ae("maxLength") },
            minLength: { child: !0, parse: Ae("minLength") },
            exactLength: { child: !0, parse: Ae("exactLength") },
            before: { child: !0, parse: Ae("before") },
            after: { child: !0, parse: Ae("after") },
            regex: { child: !0, parse: Ae("regex") },
            predicate: { child: !0, parse: Ae("predicate") },
        },
        reduce: (e, t) => mn({}, e, { $: t, invert: !1, pipe: !1 }),
        defaults: {
            description: (e) => {
                var t;
                return e.children.length === 0
                    ? "unknown"
                    : ((t = e.structure) == null ? void 0 : t.description) ??
                          e.children.map((r) => r.description).join(" and ");
            },
            expected: (e) =>
                `  • ${e.errors.map((t) => t.expected).join(`
  • `)}`,
            problem: (e) => `${e.actual} must be...
${e.expected}`,
        },
        intersections: {
            intersection: (e, t, r) => mn(e, t, r),
            ...Lr("intersection", (e, t, r) => {
                var s;
                if (e.children.length === 0) return t;
                const n = e.basis ? ge(e.basis, t, r) : t;
                return n instanceof I
                    ? n
                    : (s = e == null ? void 0 : e.basis) != null && s.equals(n)
                      ? e
                      : e.$.node("intersection", Object.assign(wa(e.inner, Za), { [n.kind]: n }), { prereduced: !0 });
            }),
        },
    }),
    Uc = ["intersection", "unit", "domain", "proto"],
    Wc = W({
        kind: "morph",
        hasAssociatedError: !1,
        keys: {
            in: { child: !0, parse: (e, t) => t.$.node(Uc, e) },
            morphs: { parse: ku, serialize: (e) => e.map((t) => (F(t, "root") ? t.json : wt(t))) },
        },
        normalize: (e) => e,
        defaults: {
            description: (e) => {
                var t;
                return `a morph from ${e.in.description} to ${((t = e.out) == null ? void 0 : t.description) ?? "unknown"}`;
            },
        },
        intersections: {
            morph: (e, t, r) => {
                if (e.morphs.some((s, i) => s !== t.morphs[i])) return T("Invalid intersection of morphs");
                const n = ge(e.in, t.in, r);
                return n instanceof I
                    ? n
                    : r.$.schema(n.branches.map((s) => r.$.node("morph", { morphs: e.morphs, in: s })));
            },
            ...Lr("morph", (e, t, r) => {
                const n = ge(e.in, t, r);
                return n instanceof I
                    ? n
                    : n.kind === "union"
                      ? r.$.node(
                            "union",
                            n.branches.map((s) => ({ ...e.inner, in: s })),
                        )
                      : r.$.node("morph", { ...e.inner, in: n });
            }),
        },
    });
var Zi;
class Jc extends ir {
    constructor() {
        super(...arguments);
        f(this, "serializedMorphs", this.morphs.map(wt));
        f(this, "compiledMorphs", `[${this.serializedMorphs}]`);
        f(this, "traverseAllows", (r, n) => this.in.traverseAllows(r, n));
        f(this, "traverseApply", (r, n) => {
            this.in.traverseApply(r, n), n.queueMorphs(this.morphs);
        });
        f(
            this,
            "expression",
            `(In: ${this.in.expression}) => Out<${((Zi = this.out) == null ? void 0 : Zi.expression) ?? "unknown"}>`,
        );
        f(this, "lastMorph", this.inner.morphs.at(-1));
        f(
            this,
            "validatedOut",
            F(this.lastMorph, "root")
                ? Object.assign(this.referencesById, this.lastMorph.out.referencesById) && this.lastMorph.out
                : void 0,
        );
    }
    compile(r) {
        if (r.traversalKind === "Allows") {
            r.return(r.invoke(this.in));
            return;
        }
        r.line(r.invoke(this.in)), r.line(`ctx.queueMorphs(${this.compiledMorphs})`);
    }
    get in() {
        return this.inner.in;
    }
    get out() {
        return this.validatedOut ?? this.$.keywords.unknown.raw;
    }
    rawKeyOf() {
        return this.in.rawKeyOf();
    }
}
const Hc = W({
    kind: "proto",
    hasAssociatedError: !0,
    collapsibleKey: "proto",
    keys: { proto: { serialize: (e) => Ea(e) ?? bs(e) } },
    normalize: (e) =>
        typeof e == "string"
            ? { proto: Wt[e] }
            : typeof e == "function"
              ? { proto: e }
              : typeof e.proto == "string"
                ? { ...e, proto: Wt[e.proto] }
                : e,
    defaults: {
        description: (e) => (e.builtinName ? zu[e.builtinName] : `an instance of ${e.proto.name}`),
        actual: (e) => Gn(e),
    },
    intersections: {
        proto: (e, t) => (Ys(e.proto, t.proto) ? e : Ys(t.proto, e.proto) ? t : I.from("proto", e, t)),
        domain: (e, t, r) => (t.domain === "object" ? e : I.from("domain", r.$.keywords.object.raw, t)),
    },
});
class Gc extends ks {
    constructor() {
        super(...arguments);
        f(this, "builtinName", Ea(this.proto));
        f(this, "serializedConstructor", this.json.proto);
        f(this, "compiledCondition", `data instanceof ${this.serializedConstructor}`);
        f(this, "compiledNegation", `!(${this.compiledCondition})`);
        f(this, "literalKeys", Et(this.proto.prototype));
        f(this, "traverseAllows", (r) => r instanceof this.proto);
        f(this, "expression", this.proto.name);
        f(this, "domain", "object");
    }
}
var Yc = function (e, t, r) {
        for (var n = arguments.length > 2, s = 0; s < t.length; s++) r = n ? t[s].call(e, r) : t[s].call(e);
        return n ? r : void 0;
    },
    Xc = function (e, t, r, n, s, i) {
        function a(w) {
            if (w !== void 0 && typeof w != "function") throw new TypeError("Function expected");
            return w;
        }
        for (
            var o = n.kind,
                l = o === "getter" ? "get" : o === "setter" ? "set" : "value",
                u = !t && e ? (n.static ? e : e.prototype) : null,
                c = t || (u ? Object.getOwnPropertyDescriptor(u, n.name) : {}),
                h,
                x = !1,
                g = r.length - 1;
            g >= 0;
            g--
        ) {
            var _ = {};
            for (var y in n) _[y] = y === "access" ? {} : n[y];
            for (var y in n.access) _.access[y] = n.access[y];
            _.addInitializer = function (w) {
                if (x) throw new TypeError("Cannot add initializers after decoration has completed");
                i.push(a(w || null));
            };
            var m = (0, r[g])(o === "accessor" ? { get: c.get, set: c.set } : c[l], _);
            if (o === "accessor") {
                if (m === void 0) continue;
                if (m === null || typeof m != "object") throw new TypeError("Object expected");
                (h = a(m.get)) && (c.get = h), (h = a(m.set)) && (c.set = h), (h = a(m.init)) && s.unshift(h);
            } else (h = a(m)) && (o === "field" ? s.unshift(h) : (c[l] = h));
        }
        u && Object.defineProperty(u, n.name, c), (x = !0);
    };
const Qc = [...Ba("union"), "alias"],
    ed = W({
        kind: "union",
        hasAssociatedError: !0,
        collapsibleKey: "branches",
        keys: {
            ordered: {},
            branches: {
                child: !0,
                parse: (e, t) => {
                    const r = e.map((n) => t.$.node(Qc, n));
                    return t.schema.ordered || r.sort((n, s) => (n.innerHash < s.innerHash ? -1 : 1)), r;
                },
            },
        },
        normalize: (e) => (qe(e) ? { branches: e } : e),
        reduce: (e, t) => {
            const r = nd(e);
            if (r.length === 1) return r[0];
            if (r.length !== e.branches.length) return t.node("union", { ...e, branches: r }, { prereduced: !0 });
        },
        defaults: {
            description: (e) => Gr(e.branches.map((t) => t.description)),
            expected: (e) => {
                const t = xu(e.errors, "propString"),
                    r = Object.entries(t).map(([n, s]) => {
                        const i = [];
                        s.forEach((l) => va(i, l.expected));
                        const a = Gr(i),
                            o = s.every((l) => l.actual === s[0].actual) ? s[0].actual : ue(s[0].data);
                        return `${n && `${n} `}must be ${a}${o && ` (was ${o})`}`;
                    });
                return Gr(r);
            },
            problem: (e) => e.expected,
            message: (e) => e.problem,
        },
        intersections: {
            union: (e, t, r) => {
                if (e.isNever !== t.isNever) return I.from("presence", e, t);
                let n;
                if (e.ordered) {
                    if (t.ordered) return I.from("indiscriminableMorphs", e, t);
                    (n = jn(t.branches, e.branches, r)), n instanceof I && n.invert();
                } else n = jn(e.branches, t.branches, r);
                return n instanceof I
                    ? n
                    : r.$.schema(e.ordered || t.ordered ? { branches: n, ordered: !0 } : { branches: n });
            },
            ...Lr("union", (e, t, r) => {
                const n = jn(e.branches, [t], r);
                return n instanceof I
                    ? n
                    : n.length === 1
                      ? n[0]
                      : r.$.schema(e.ordered ? { branches: n, ordered: !0 } : { branches: n });
            }),
        },
    });
let td = (() => {
    var n;
    let e = ir,
        t = [],
        r;
    return (
        (n = class extends e {
            constructor() {
                super(...arguments);
                f(this, "isNever", (Yc(this, t), this.branches.length === 0));
                f(
                    this,
                    "isBoolean",
                    this.branches.length === 2 && this.branches[0].hasUnit(!1) && this.branches[1].hasUnit(!0),
                );
                f(
                    this,
                    "unitBranches",
                    this.branches.filter((a) => a.hasKind("unit")),
                );
                f(this, "discriminant", this.discriminate());
                f(this, "discriminantJson", this.discriminant ? rd(this.discriminant) : null);
                f(
                    this,
                    "expression",
                    this.isNever
                        ? "never"
                        : this.isBoolean
                          ? "boolean"
                          : this.branches.map((a) => a.nestableExpression).join(" | "),
                );
                f(this, "traverseAllows", (a, o) => this.branches.some((l) => l.traverseAllows(a, o)));
                f(this, "traverseApply", (a, o) => {
                    const l = [];
                    for (let u = 0; u < this.branches.length; u++) {
                        if ((o.pushBranch(), this.branches[u].traverseApply(a, o), !o.hasError()))
                            return o.queuedMorphs.push(...o.popBranch().queuedMorphs);
                        l.push(o.popBranch().error);
                    }
                    o.error({ code: "union", errors: l });
                });
            }
            compile(a) {
                if (
                    !this.discriminant ||
                    (this.unitBranches.length === this.branches.length && this.branches.length === 2)
                )
                    return this.compileIndiscriminable(a);
                const o = this.discriminant.path.reduce(
                        (h, x) => h + Ta(x, !0),
                        this.discriminant.kind === "domain" ? "typeof data" : "data",
                    ),
                    l = this.discriminant.cases,
                    u = Object.keys(l);
                if (
                    (a.block(`switch(${o})`, () => {
                        for (const h in l) {
                            const x = l[h],
                                g = h === "default" ? "default" : `case ${h}`;
                            a.line(`${g}: return ${x === !0 ? x : a.invoke(x)}`);
                        }
                        return a;
                    }),
                    a.traversalKind === "Allows")
                ) {
                    a.return(!1);
                    return;
                }
                const c = Gr(this.discriminant.kind === "domain" ? u.map((h) => xa[h.slice(1, -1)]) : u);
                a.line(`ctx.error({
	expected: ${JSON.stringify(c)},
	actual: ${o},
	relativePath: ${JSON.stringify(this.discriminant.path)}
})`);
            }
            compileIndiscriminable(a) {
                a.traversalKind === "Apply"
                    ? (a.const("errors", "[]"),
                      this.branches.forEach((o) =>
                          a
                              .line("ctx.pushBranch()")
                              .line(a.invoke(o))
                              .if("!ctx.hasError()", () =>
                                  a.return("ctx.queuedMorphs.push(...ctx.popBranch().queuedMorphs)"),
                              )
                              .line("errors.push(ctx.popBranch().error)"),
                      ),
                      a.line('ctx.error({ code: "union", errors })'))
                    : (this.branches.forEach((o) => a.if(`${a.invoke(o)}`, () => a.return(!0))), a.return(!1));
            }
            rawKeyOf() {
                return this.branches.reduce((a, o) => a.and(o.rawKeyOf()), this.$.keywords.unknown.raw);
            }
            get nestableExpression() {
                return this.isBoolean ? "boolean" : super.nestableExpression;
            }
            discriminate() {
                if (this.branches.length < 2) return null;
                if (this.unitBranches.length === this.branches.length) {
                    const _ = se(this.unitBranches, (y, m) => [`${m.serializedValue}`, !0]);
                    return { path: [], kind: "unit", cases: _ };
                }
                const a = {};
                for (let _ = 0; _ < this.branches.length - 1; _++) {
                    const y = this.branches[_];
                    for (let m = _ + 1; m < this.branches.length; m++) {
                        const w = this.branches[m],
                            A = Tt(y.in, w.in, y.$);
                        if (A instanceof I)
                            for (const { path: ae, kind: oe, disjoint: Se } of A.flat) {
                                if (!Me(oe, sd)) continue;
                                const V = `${ae}${oe}`;
                                let Y, X;
                                if (oe === "domain") (Y = `"${Se.l.domain}"`), (X = `"${Se.r.domain}"`);
                                else if (oe === "unit") (Y = Se.l.serializedValue), (X = Se.r.serializedValue);
                                else return Ye(`Unexpected attempt to discriminate disjoint kind '${oe}'`);
                                if (!a[V]) {
                                    a[V] = { [Y]: [y], [X]: [w] };
                                    continue;
                                }
                                const Q = a[V];
                                Me(Y, Q) ? Q[Y].includes(y) || Q[Y].push(y) : (Q[Y] = [y]),
                                    Me(X, Q) ? Q[X].includes(w) || Q[X].push(w) : (Q[X] = [w]);
                            }
                    }
                }
                const o = mt(a)
                    .sort((_, y) => Object.keys(_[1]).length - Object.keys(y[1]).length)
                    .at(-1);
                if (!o) return null;
                const [l, u] = o,
                    [c, h] = id(l);
                let x = [...this.branches];
                const g = se(u, (_, y) => {
                    const m = [];
                    x = x.filter((A) => !y.includes(A));
                    for (const A of y) {
                        const ae = ad(h, c, A);
                        if (ae === null) return [_, !0];
                        m.push(ae);
                    }
                    const w = m.length === 1 ? m[0] : this.$.node("union", m);
                    return Object.assign(this.referencesById, w.referencesById), [_, w];
                });
                return (
                    x.length &&
                        ((g.default = this.$.node("union", x, { prereduced: !0 })),
                        Object.assign(this.referencesById, g.default.referencesById)),
                    { kind: h, path: c, cases: g }
                );
            }
        }),
        (() => {
            const a =
                typeof Symbol == "function" && Symbol.metadata ? Object.create(e[Symbol.metadata] ?? null) : void 0;
            (r = [fs]),
                Xc(
                    n,
                    null,
                    r,
                    {
                        kind: "method",
                        name: "discriminate",
                        static: !1,
                        private: !1,
                        access: { has: (o) => "discriminate" in o, get: (o) => o.discriminate },
                        metadata: a,
                    },
                    null,
                    t,
                ),
                a &&
                    Object.defineProperty(n, Symbol.metadata, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: a,
                    });
        })(),
        n
    );
})();
const rd = (e) => ({
        kind: e.kind,
        path: e.path,
        cases: se(e.cases, (t, r) => [
            t,
            r === !0 ? r : r.hasKind("union") && r.discriminantJson ? r.discriminantJson : r.json,
        ]),
    }),
    Gr = (e) => {
        if (e.length === 0) return "never";
        if (e.length === 1) return e[0];
        if ((e.length === 2 && e[0] === "false" && e[1] === "true") || (e[0] === "true" && e[1] === "false"))
            return "boolean";
        let t = "";
        for (let r = 0; r < e.length - 1; r++) (t += e[r]), r < e.length - 2 && (t += ", ");
        return (t += ` or ${e[e.length - 1]}`), t;
    },
    jn = (e, t, r) => {
        const n = t.map(() => []);
        for (let i = 0; i < e.length; i++) {
            let a = {};
            for (let o = 0; o < t.length; o++) {
                if (n[o] === null) continue;
                if (e[i].equals(t[o])) {
                    (n[o] = null), (a = {});
                    break;
                }
                const l = ge(e[i], t[o], r);
                if (!(l instanceof I)) {
                    if (l.equals(e[i])) {
                        n[o].push(e[i]), (a = {});
                        break;
                    }
                    l.equals(t[o]) ? (n[o] = null) : (a[o] = l);
                }
            }
            for (const o in a) n[o][i] = a[o];
        }
        const s = n.flatMap((i, a) => (i == null ? void 0 : i.flatMap((o) => o.branches)) ?? t[a]);
        return s.length === 0 ? I.from("union", e, t) : s;
    },
    nd = ({ branches: e, ordered: t }) => {
        if (e.length < 2) return e;
        const r = e.map(() => !0);
        for (let n = 0; n < e.length; n++)
            for (let s = n + 1; s < e.length && r[n] && r[s]; s++) {
                if (e[n].equals(e[s])) {
                    r[s] = !1;
                    continue;
                }
                const i = Tt(e[n].in, e[s].in, e[0].$);
                i instanceof I || (i.equals(e[n].in) ? (r[n] = !!t) : i.equals(e[s].in) && (r[s] = !1));
            }
        return e.filter((n, s) => r[s]);
    },
    sd = { domain: 1, unit: 1 },
    id = (e) => {
        const t = e.lastIndexOf("]"),
            r = JSON.parse(e.slice(0, t + 1)),
            n = e.slice(t + 1);
        return [r, n];
    },
    ad = (e, t, r) =>
        r.transform(
            (n, s, i) =>
                (n === "domain" && s.domain === "object" && t.length > i.path.length) ||
                ((e === n || (n === "domain" && i.path.length === t.length)) &&
                    i.path.length === t.length &&
                    i.path.every((a, o) => a === t[o]))
                    ? null
                    : s,
            { shouldTransform: (n) => n.children.length !== 0 || n.kind === "domain" || n.kind === "unit" },
        ),
    od = W({
        kind: "unit",
        hasAssociatedError: !0,
        keys: { unit: { preserveUndefined: !0, serialize: (e) => (e instanceof Date ? e.toISOString() : bs(e)) } },
        normalize: (e) => e,
        defaults: {
            description: (e) => ue(e.unit),
            problem: ({ expected: e, actual: t }) =>
                `${e === t ? `must be reference equal to ${e} (serialized to the same value)` : `must be ${e} (was ${t})`}`,
        },
        intersections: {
            unit: (e, t) => I.from("unit", e, t),
            ...Lr("unit", (e, t) =>
                t.allows(e.unit)
                    ? e
                    : I.from(
                          "assignability",
                          e,
                          t.hasKind("intersection") ? t.children.find((r) => !r.allows(e.unit)) : t,
                      ),
            ),
        },
    });
class ld extends ks {
    constructor() {
        super(...arguments);
        f(this, "compiledValue", this.json.unit);
        f(
            this,
            "serializedValue",
            typeof this.unit == "string" || this.unit instanceof Date
                ? JSON.stringify(this.compiledValue)
                : this.compiledValue,
        );
        f(this, "literalKeys", Et(this.unit));
        f(this, "compiledCondition", ai(this.unit, this.serializedValue));
        f(this, "compiledNegation", ai(this.unit, this.serializedValue, "negated"));
        f(this, "expression", ue(this.unit));
        f(this, "domain", ut(this.unit));
        f(
            this,
            "traverseAllows",
            this.unit instanceof Date
                ? (r) => r instanceof Date && r.toISOString() === this.compiledValue
                : (r) => r === this.unit,
        );
    }
}
const ai = (e, t, r) => {
        if (e instanceof Date) {
            const n = `data instanceof Date && data.toISOString() === ${t}`;
            return r ? `!(${n})` : n;
        }
        return `data ${r ? "!" : "="}== ${t}`;
    },
    ud = W({
        kind: "index",
        hasAssociatedError: !1,
        intersectionIsOpen: !0,
        keys: {
            signature: {
                child: !0,
                parse: (e, t) => {
                    const r = t.$.schema(e);
                    if (!r.extends(t.$.keywords.propertyKey)) return T(fd(r.expression));
                    const n = r.branches.filter((s) => s.hasKind("unit"));
                    return n.length ? T(dd(n.map((s) => ue(s.unit)))) : r;
                },
            },
            value: { child: !0, parse: (e, t) => t.$.schema(e) },
        },
        normalize: (e) => e,
        defaults: { description: (e) => `[${e.signature.expression}]: ${e.value.description}` },
        intersections: {
            index: (e, t, r) => {
                if (e.signature.equals(t.signature)) {
                    const n = ge(e.value, t.value, r),
                        s = n instanceof I ? r.$.keywords.never.raw : n;
                    return r.$.node("index", { signature: e.signature, value: s });
                }
                return e.signature.extends(t.signature) && e.value.subsumes(t.value)
                    ? t
                    : t.signature.extends(e.signature) && t.value.subsumes(e.value)
                      ? e
                      : null;
            },
        },
    });
class cd extends rr {
    constructor() {
        super(...arguments);
        f(this, "impliedBasis", this.$.keywords.object.raw);
        f(this, "expression", `[${this.signature.expression}]: ${this.value.expression}`);
        f(this, "traverseAllows", (r, n) =>
            Hn(r).every((s) => {
                if (this.signature.traverseAllows(s[0], n)) {
                    n == null || n.path.push(s[0]);
                    const i = this.value.traverseAllows(s[1], n);
                    return n == null || n.path.pop(), i;
                }
                return !0;
            }),
        );
        f(this, "traverseApply", (r, n) =>
            Hn(r).forEach((s) => {
                this.signature.traverseAllows(s[0], n) &&
                    (n.path.push(s[0]), this.value.traverseApply(s[1], n), n.path.pop());
            }),
        );
    }
    _transform(r, n) {
        n.path.push(this.signature);
        const s = super._transform(r, n);
        return n.path.pop(), s;
    }
    compile() {}
}
const dd = (e) => `Index keys ${e.join(", ")} should be specified as named props.`,
    fd = (e) => `Indexed key definition '${e}' must be a string, number or symbol`,
    rs = (e, t, r) => {
        if (e.key !== t.key) return null;
        const n = e.key;
        let s = ge(e.value, t.value, r);
        const i = e.required || t.required ? "required" : "optional";
        if (s instanceof I)
            if (i === "optional") s = r.$.keywords.never.raw;
            else return s.withPrefixKey(e.compiledKey);
        if (i === "required") return r.$.node("required", { key: n, value: s });
        const a = e.hasDefault()
            ? t.hasDefault()
                ? e.default === t.default
                    ? e.default
                    : T(`Invalid intersection of default values ${ue(e.default)} & ${ue(t.default)}`)
                : e.default
            : t.hasDefault()
              ? t.default
              : Ut;
        return r.$.node("optional", { key: n, value: s, default: a });
    };
class Va extends rr {
    constructor() {
        super(...arguments);
        f(this, "required", this.kind === "required");
        f(this, "impliedBasis", this.$.keywords.object.raw);
        f(this, "serializedKey", ms(this.key));
        f(this, "compiledKey", typeof this.key == "string" ? this.key : this.serializedKey);
        f(this, "defaultValueMorphs", [(r) => ((r[this.key] = this.default), r)]);
        f(this, "defaultValueMorphsReference", wt(this.defaultValueMorphs));
        f(this, "traverseAllows", (r, n) => {
            if (this.key in r) {
                n == null || n.path.push(this.key);
                const s = this.value.traverseAllows(r[this.key], n);
                return n == null || n.path.pop(), s;
            }
            return !this.required;
        });
        f(this, "traverseApply", (r, n) => {
            this.key in r
                ? (n.path.push(this.key), this.value.traverseApply(r[this.key], n), n.path.pop())
                : this.hasKind("required")
                  ? n.error(this.errorContext)
                  : this.hasKind("optional") && this.hasDefault() && n.queueMorphs(this.defaultValueMorphs);
        });
    }
    _transform(r, n) {
        n.path.push(this.key);
        const s = super._transform(r, n);
        return n.path.pop(), s;
    }
    hasDefault() {
        return "default" in this;
    }
    compile(r) {
        r.if(`${this.serializedKey} in data`, () =>
            r.traverseKey(this.serializedKey, `data${r.prop(this.key)}`, this.value),
        ),
            this.hasKind("required")
                ? r.else(() =>
                      r.traversalKind === "Apply" ? r.line(`ctx.error(${this.compiledErrorContext})`) : r.return(!1),
                  )
                : r.traversalKind === "Apply" &&
                  "default" in this &&
                  r.else(() => r.line(`ctx.queueMorphs(${this.defaultValueMorphsReference})`)),
            r.traversalKind === "Allows" && r.return(!0);
    }
}
const hd = W({
    kind: "optional",
    hasAssociatedError: !1,
    intersectionIsOpen: !0,
    keys: { key: {}, value: { child: !0, parse: (e, t) => t.$.schema(e) }, default: { preserveUndefined: !0 } },
    normalize: (e) => e,
    defaults: { description: (e) => `${e.compiledKey}?: ${e.value.description}` },
    intersections: { optional: rs },
});
class pd extends Va {
    constructor() {
        super(...arguments);
        f(this, "expression", `${this.compiledKey}?: ${this.value.expression}`);
    }
}
class md extends Va {
    constructor() {
        super(...arguments);
        f(this, "expression", `${this.compiledKey}: ${this.value.expression}`);
        f(
            this,
            "errorContext",
            Object.freeze({
                code: "required",
                missingValueDescription: this.value.description,
                relativePath: [this.key],
            }),
        );
        f(this, "compiledErrorContext", _s(this.errorContext));
    }
}
const gd = W({
        kind: "required",
        hasAssociatedError: !0,
        intersectionIsOpen: !0,
        keys: { key: {}, value: { child: !0, parse: (e, t) => t.$.schema(e) } },
        normalize: (e) => e,
        defaults: {
            description: (e) => `${e.compiledKey}: ${e.value.description}`,
            expected: (e) => e.missingValueDescription,
            actual: () => "missing",
        },
        intersections: { required: rs, optional: rs },
    }),
    Pn = { child: !0, parse: (e, t) => (e.length === 0 ? void 0 : e.map((r) => t.$.schema(r))) },
    yd = W({
        kind: "sequence",
        hasAssociatedError: !1,
        collapsibleKey: "variadic",
        keys: {
            prefix: Pn,
            optionals: Pn,
            variadic: { child: !0, parse: (e, t) => t.$.schema(e, t) },
            minVariadicLength: { parse: (e) => (e === 0 ? void 0 : e) },
            postfix: Pn,
        },
        normalize: (e) => {
            var t, r;
            if (typeof e == "string") return { variadic: e };
            if ("variadic" in e || "prefix" in e || "optionals" in e || "postfix" in e || "minVariadicLength" in e) {
                if ((t = e.postfix) != null && t.length) {
                    if (!e.variadic) return T(kd);
                    if ((r = e.optionals) != null && r.length) return T(_d);
                }
                return e.minVariadicLength && !e.variadic
                    ? T("minVariadicLength may not be specified without a variadic element")
                    : e;
            }
            return { variadic: e };
        },
        reduce: (e, t) => {
            var a, o, l, u, c, h;
            let r = e.minVariadicLength ?? 0;
            const n = ((a = e.prefix) == null ? void 0 : a.slice()) ?? [],
                s = ((o = e.optionals) == null ? void 0 : o.slice()) ?? [],
                i = ((l = e.postfix) == null ? void 0 : l.slice()) ?? [];
            if (e.variadic) {
                for (; (u = s.at(-1)) != null && u.equals(e.variadic); ) s.pop();
                if (s.length === 0) for (; (c = n.at(-1)) != null && c.equals(e.variadic); ) n.pop(), r++;
                for (; (h = i[0]) != null && h.equals(e.variadic); ) i.shift(), r++;
            } else s.length === 0 && n.push(...i.splice(0));
            if (r !== e.minVariadicLength || (e.prefix && e.prefix.length !== n.length))
                return t.node(
                    "sequence",
                    { ...e, prefix: n, postfix: i, optionals: s, minVariadicLength: r },
                    { prereduced: !0 },
                );
        },
        defaults: {
            description: (e) =>
                e.isVariadicOnly
                    ? `${e.variadic.nestableExpression}[]`
                    : `[${e.tuple.map((r) => (r.kind === "optionals" ? `${r.node.nestableExpression}?` : r.kind === "variadic" ? `...${r.node.nestableExpression}[]` : r.node.expression)).join(", ")}]`,
        },
        intersections: {
            sequence: (e, t, r) => {
                const n = yr({ l: e.tuple, r: t.tuple, disjoint: new I({}), result: [], fixedVariants: [], ctx: r }),
                    s = n.disjoint.isEmpty() ? [n, ...n.fixedVariants] : n.fixedVariants;
                return s.length === 0
                    ? n.disjoint
                    : s.length === 1
                      ? r.$.node("sequence", oi(s[0].result))
                      : r.$.node(
                            "union",
                            s.map((i) => ({ proto: Array, sequence: oi(i.result) })),
                        );
            },
        },
    });
class vd extends rr {
    constructor() {
        super(...arguments);
        f(this, "impliedBasis", this.$.keywords.Array.raw);
        f(this, "prefix", this.inner.prefix ?? []);
        f(this, "optionals", this.inner.optionals ?? []);
        f(this, "prevariadic", [...this.prefix, ...this.optionals]);
        f(this, "postfix", this.inner.postfix ?? []);
        f(this, "isVariadicOnly", this.prevariadic.length + this.postfix.length === 0);
        f(this, "minVariadicLength", this.inner.minVariadicLength ?? 0);
        f(this, "minLength", this.prefix.length + this.minVariadicLength + this.postfix.length);
        f(this, "minLengthNode", this.minLength === 0 ? null : this.$.node("minLength", this.minLength));
        f(this, "maxLength", this.variadic ? null : this.minLength + this.optionals.length);
        f(this, "maxLengthNode", this.maxLength === null ? null : this.$.node("maxLength", this.maxLength));
        f(
            this,
            "impliedSiblings",
            this.minLengthNode
                ? this.maxLengthNode
                    ? [this.minLengthNode, this.maxLengthNode]
                    : [this.minLengthNode]
                : this.maxLengthNode
                  ? [this.maxLengthNode]
                  : [],
        );
        f(this, "traverseAllows", (r, n) => {
            for (let s = 0; s < r.length; s++) if (!this.childAtIndex(r, s).traverseAllows(r[s], n)) return !1;
            return !0;
        });
        f(this, "traverseApply", (r, n) => {
            for (let s = 0; s < r.length; s++)
                n.path.push(s), this.childAtIndex(r, s).traverseApply(r[s], n), n.path.pop();
        });
        f(this, "tuple", bd(this.inner));
        f(this, "expression", this.description);
    }
    childAtIndex(r, n) {
        if (n < this.prevariadic.length) return this.prevariadic[n];
        const s = r.length - this.postfix.length;
        return n >= s ? this.postfix[n - s] : this.variadic ?? Ye(`Unexpected attempt to access index ${n} on ${this}`);
    }
    compile(r) {
        this.prefix.forEach((n, s) => r.traverseKey(`${s}`, `data[${s}]`, n)),
            this.optionals.forEach((n, s) => {
                const i = `${s + this.prefix.length}`;
                r.if(`${i} >= ${r.data}.length`, () => (r.traversalKind === "Allows" ? r.return(!0) : r.return())),
                    r.traverseKey(i, `data[${i}]`, n);
            }),
            this.variadic &&
                (this.postfix.length &&
                    r.const(
                        "firstPostfixIndex",
                        `${r.data}.length${this.postfix.length ? `- ${this.postfix.length}` : ""}`,
                    ),
                r.for(
                    `i < ${this.postfix.length ? "firstPostfixIndex" : "data.length"}`,
                    () => r.traverseKey("i", "data[i]", this.variadic),
                    this.prevariadic.length,
                ),
                this.postfix.forEach((n, s) => {
                    const i = `firstPostfixIndex + ${s}`;
                    r.traverseKey(i, `data[${i}]`, n);
                })),
            r.traversalKind === "Allows" && r.return(!0);
    }
    _transform(r, n) {
        n.path.push(this.$.keywords.nonNegativeIntegerString.raw);
        const s = super._transform(r, n);
        return n.path.pop(), s;
    }
}
const bd = (e) => {
        var r, n, s;
        const t = [];
        return (
            (r = e.prefix) == null || r.forEach((i) => t.push({ kind: "prefix", node: i })),
            (n = e.optionals) == null || n.forEach((i) => t.push({ kind: "optionals", node: i })),
            e.variadic && t.push({ kind: "variadic", node: e.variadic }),
            (s = e.postfix) == null || s.forEach((i) => t.push({ kind: "postfix", node: i })),
            t
        );
    },
    oi = (e) =>
        e.reduce(
            (t, r) => (r.kind === "variadic" ? (t.variadic = r.node) : (t[r.kind] = Re(t[r.kind], r.node)), t),
            {},
        ),
    _d = "A postfix required element cannot follow an optional element",
    kd = "A postfix element requires a variadic element",
    yr = (e) => {
        var h, x;
        const [t, ...r] = e.l,
            [n, ...s] = e.r;
        if (!t || !n) return e;
        const i = ((h = r.at(-1)) == null ? void 0 : h.kind) === "postfix",
            a = ((x = s.at(-1)) == null ? void 0 : x.kind) === "postfix",
            o =
                t.kind === "prefix" || n.kind === "prefix"
                    ? "prefix"
                    : t.kind === "optionals" || n.kind === "optionals"
                      ? i || a
                          ? "prefix"
                          : "optionals"
                      : t.kind === "postfix" || n.kind === "postfix"
                        ? "postfix"
                        : "variadic";
        if (t.kind === "prefix" && n.kind === "variadic" && a) {
            const g = yr({ ...e, fixedVariants: [], r: s.map((_) => ({ ..._, kind: "prefix" })) });
            g.disjoint.isEmpty() && e.fixedVariants.push(g);
        } else if (n.kind === "prefix" && t.kind === "variadic" && i) {
            const g = yr({ ...e, fixedVariants: [], l: r.map((_) => ({ ..._, kind: "prefix" })) });
            g.disjoint.isEmpty() && e.fixedVariants.push(g);
        }
        const l = ge(t.node, n.node, e.ctx);
        if (l instanceof I)
            if (o === "prefix" || o === "postfix")
                e.disjoint.add(l.withPrefixKey(o === "prefix" ? `${e.result.length}` : `-${r.length + 1}`)),
                    (e.result = [...e.result, { kind: o, node: e.ctx.$.keywords.never.raw }]);
            else
                return o === "optionals"
                    ? e
                    : yr({
                          ...e,
                          fixedVariants: [],
                          l: r.map((g) => ({ ...g, kind: "prefix" })),
                          r: r.map((g) => ({ ...g, kind: "prefix" })),
                      });
        else e.result = [...e.result, { kind: o, node: l }];
        const u = e.l.length,
            c = e.r.length;
        return (
            (t.kind !== "variadic" || (u >= c && (n.kind === "variadic" || c === 1))) && (e.l = r),
            (n.kind !== "variadic" || (c >= u && (t.kind === "variadic" || u === 1))) && (e.r = s),
            yr(e)
        );
    },
    ws = /(?:0|(?:[1-9]\\d*))$/,
    wd = wt(ws);
var $d = function (e, t, r) {
        for (var n = arguments.length > 2, s = 0; s < t.length; s++) r = n ? t[s].call(e, r) : t[s].call(e);
        return n ? r : void 0;
    },
    xd = function (e, t, r, n, s, i) {
        function a(w) {
            if (w !== void 0 && typeof w != "function") throw new TypeError("Function expected");
            return w;
        }
        for (
            var o = n.kind,
                l = o === "getter" ? "get" : o === "setter" ? "set" : "value",
                u = !t && e ? (n.static ? e : e.prototype) : null,
                c = t || (u ? Object.getOwnPropertyDescriptor(u, n.name) : {}),
                h,
                x = !1,
                g = r.length - 1;
            g >= 0;
            g--
        ) {
            var _ = {};
            for (var y in n) _[y] = y === "access" ? {} : n[y];
            for (var y in n.access) _.access[y] = n.access[y];
            _.addInitializer = function (w) {
                if (x) throw new TypeError("Cannot add initializers after decoration has completed");
                i.push(a(w || null));
            };
            var m = (0, r[g])(o === "accessor" ? { get: c.get, set: c.set } : c[l], _);
            if (o === "accessor") {
                if (m === void 0) continue;
                if (m === null || typeof m != "object") throw new TypeError("Object expected");
                (h = a(m.get)) && (c.get = h), (h = a(m.set)) && (c.set = h), (h = a(m.init)) && s.unshift(h);
            } else (h = a(m)) && (o === "field" ? s.unshift(h) : (c[l] = h));
        }
        u && Object.defineProperty(u, n.name, c), (x = !0);
    };
let Ed = (() => {
    var n, s, i;
    let e = rr,
        t = [],
        r;
    return (
        (i = class extends e {
            constructor() {
                super(...arguments);
                f(this, "impliedBasis", ($d(this, t), this.$.keywords.object.raw));
                f(
                    this,
                    "impliedSiblings",
                    this.children.flatMap((l) => l.impliedSiblings ?? []),
                );
                f(
                    this,
                    "props",
                    this.required
                        ? this.optional
                            ? [...this.required, ...this.optional]
                            : this.required
                        : this.optional ?? [],
                );
                f(
                    this,
                    "propsByKey",
                    se(this.props, (l, u) => [u.key, u]),
                );
                f(this, "propsByKeyReference", wt(this.propsByKey));
                f(this, "expression", Sd(this));
                f(this, "requiredLiteralKeys", ((n = this.required) == null ? void 0 : n.map((l) => l.key)) ?? []);
                f(this, "optionalLiteralKeys", ((s = this.optional) == null ? void 0 : s.map((l) => l.key)) ?? []);
                f(this, "literalKeys", [...this.requiredLiteralKeys, ...this.optionalLiteralKeys]);
                f(this, "exhaustive", this.undeclared !== void 0 || this.index !== void 0);
                f(this, "traverseAllows", (l, u) => this._traverse("Allows", l, u));
                f(this, "traverseApply", (l, u) => this._traverse("Apply", l, u));
                f(this, "_traverse", (l, u, c) => {
                    const h = (c == null ? void 0 : c.currentErrorCount) ?? 0;
                    for (let g = 0; g < this.props.length; g++)
                        if (l === "Allows") {
                            if (!this.props[g].traverseAllows(u, c)) return !1;
                        } else if ((this.props[g].traverseApply(u, c), c.failFast && c.currentErrorCount > h))
                            return !1;
                    if (this.sequence) {
                        if (l === "Allows") {
                            if (!this.sequence.traverseAllows(u, c)) return !1;
                        } else if ((this.sequence.traverseApply(u, c), c.failFast && c.currentErrorCount > h))
                            return !1;
                    }
                    if (!this.exhaustive) return !0;
                    const x = Object.keys(u);
                    x.push(...Object.getOwnPropertySymbols(u));
                    for (let g = 0; g < x.length; g++) {
                        const _ = x[g];
                        let y = !1;
                        if (this.index) {
                            for (const m of this.index)
                                if (m.signature.traverseAllows(_, c)) {
                                    if (l === "Allows") {
                                        c == null || c.path.push(_);
                                        const w = m.value.traverseAllows(u[_], c);
                                        if ((c == null || c.path.pop(), !w)) return !1;
                                    } else if (
                                        (c.path.push(_),
                                        m.value.traverseApply(u[_], c),
                                        c.path.pop(),
                                        c.failFast && c.currentErrorCount > h)
                                    )
                                        return !1;
                                    y = !0;
                                }
                        }
                        if (
                            this.undeclared &&
                            (y || (y = _ in this.propsByKey),
                            y || (y = this.sequence !== void 0 && typeof _ == "string" && ws.test(_)),
                            !y &&
                                (l === "Allows" ||
                                    (this.undeclared === "reject"
                                        ? c.error({ expected: "removed", actual: null, relativePath: [_] })
                                        : c.queueMorphs([(m) => (delete m[_], m)]),
                                    c.failFast)))
                        )
                            return !1;
                        c == null || c.path.pop();
                    }
                    return !0;
                });
            }
            keyof() {
                var u;
                let l = this.$.units(this.literalKeys).branches;
                return (
                    (u = this.index) == null ||
                        u.forEach(({ signature: c }) => {
                            l = l.concat(c.branches);
                        }),
                    this.$.node("union", l)
                );
            }
            omit(...l) {
                return this.$.node("structure", li(this.inner, l));
            }
            merge(l) {
                const u = Pa(li(this.inner, [l.keyof()]));
                return (
                    l.required && (u.required = Re(u.required, l.required)),
                    l.optional && (u.optional = Re(u.optional, l.optional)),
                    l.index && (u.index = Re(u.index, l.index)),
                    l.sequence && (u.sequence = l.sequence),
                    l.undeclared ? (u.undeclared = l.undeclared) : delete u.undeclared,
                    this.$.node("structure", u)
                );
            }
            compile(l) {
                l.traversalKind === "Apply" && l.initializeErrorCount(),
                    this.props.forEach((u) => {
                        l.check(u), l.traversalKind === "Apply" && l.returnIfFailFast();
                    }),
                    this.sequence && (l.check(this.sequence), l.traversalKind === "Apply" && l.returnIfFailFast()),
                    this.exhaustive &&
                        (l.const("keys", "Object.keys(data)"),
                        l.line("keys.push(...Object.getOwnPropertySymbols(data))"),
                        l.for("i < keys.length", () => this.compileExhaustiveEntry(l))),
                    l.traversalKind === "Allows" && l.return(!0);
            }
            compileExhaustiveEntry(l) {
                var u, c;
                return (
                    l.const("k", "keys[i]"),
                    this.undeclared && l.let("matched", !1),
                    (u = this.index) == null ||
                        u.forEach((h) => {
                            l.if(
                                `${l.invoke(h.signature, { arg: "k", kind: "Allows" })}`,
                                () => (
                                    l.traverseKey("k", "data[k]", h.value), this.undeclared && l.set("matched", !0), l
                                ),
                            );
                        }),
                    this.undeclared &&
                        (((c = this.props) == null ? void 0 : c.length) !== 0 &&
                            l.line(`matched ||= k in ${this.propsByKeyReference}`),
                        this.sequence && l.line(`matched ||= typeof k === "string" && ${wd}.test(k)`),
                        l.if("!matched", () =>
                            l.traversalKind === "Allows"
                                ? l.return(!1)
                                : this.undeclared === "reject"
                                  ? l
                                        .line('ctx.error({ expected: "removed", actual: null, relativePath: [k] })')
                                        .if("ctx.failFast", () => l.return())
                                  : l.line("ctx.queueMorphs([data => { delete data[k]; return data }])"),
                        )),
                    l
                );
            }
        }),
        (() => {
            const l =
                typeof Symbol == "function" && Symbol.metadata ? Object.create(e[Symbol.metadata] ?? null) : void 0;
            (r = [fs]),
                xd(
                    i,
                    null,
                    r,
                    {
                        kind: "method",
                        name: "keyof",
                        static: !1,
                        private: !1,
                        access: { has: (u) => "keyof" in u, get: (u) => u.keyof },
                        metadata: l,
                    },
                    null,
                    t,
                ),
                l &&
                    Object.defineProperty(i, Symbol.metadata, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: l,
                    });
        })(),
        i
    );
})();
const li = (e, t) => {
        const r = { ...e };
        return (
            t.forEach((n) => {
                r.required &&
                    (r.required = r.required.filter((s) => (typeof n == "function" ? !n.allows(s.key) : n !== s.key))),
                    r.optional &&
                        (r.optional = r.optional.filter((s) =>
                            typeof n == "function" ? !n.allows(s.key) : n !== s.key,
                        )),
                    r.index && typeof n == "function" && (r.index = r.index.filter((s) => !s.signature.extends(n)));
            }),
            r
        );
    },
    Ua = (e) => (t) => {
        var r, n;
        if (t.props.length || t.index) {
            const s = ((r = t.index) == null ? void 0 : r.map(String)) ?? [];
            t.props.forEach((a) => s.push(a[e])), t.undeclared && s.push(`+ (undeclared): ${t.undeclared}`);
            const i = `{ ${s.join(", ")} }`;
            return t.sequence ? `${i} & ${t.sequence.description}` : i;
        }
        return ((n = t.sequence) == null ? void 0 : n.description) ?? "{}";
    },
    Ad = Ua("description"),
    Sd = Ua("expression"),
    Od = W({
        kind: "structure",
        hasAssociatedError: !1,
        normalize: (e) => e,
        keys: {
            required: { child: !0, parse: Ae("required") },
            optional: { child: !0, parse: Ae("optional") },
            index: { child: !0, parse: Ae("index") },
            sequence: { child: !0, parse: Ae("sequence") },
            undeclared: { parse: (e) => (e === "ignore" ? void 0 : e) },
        },
        defaults: { description: Ad },
        intersections: {
            structure: (e, t, r) => {
                const n = { ...e.inner },
                    s = { ...t.inner };
                if (e.undeclared) {
                    const a = e.keyof(),
                        o = t.requiredLiteralKeys.filter((l) => !a.allows(l));
                    if (o.length)
                        return I.from("presence", r.$.keywords.never.raw, t.propsByKey[o[0]].value).withPrefixKey(o[0]);
                    s.optional && (s.optional = s.optional.filter((l) => a.allows(l.key))),
                        s.index &&
                            (s.index = s.index.flatMap((l) => {
                                if (l.signature.extends(a)) return l;
                                const u = Tt(a, l.signature, r.$);
                                if (u instanceof I) return [];
                                const c = ns(u, l.value, r.$);
                                return (
                                    c.required &&
                                        (s.required = s.required ? [...s.required, ...c.required] : c.required),
                                    c.index ?? []
                                );
                            }));
                }
                if (t.undeclared) {
                    const a = t.keyof(),
                        o = e.requiredLiteralKeys.filter((l) => !a.allows(l));
                    if (o.length)
                        return I.from("presence", e.propsByKey[o[0]].value, r.$.keywords.never.raw).withPrefixKey(o[0]);
                    n.optional && (n.optional = n.optional.filter((l) => a.allows(l.key))),
                        n.index &&
                            (n.index = n.index.flatMap((l) => {
                                if (l.signature.extends(a)) return l;
                                const u = Tt(a, l.signature, r.$);
                                if (u instanceof I) return [];
                                const c = ns(u, l.value, r.$);
                                return (
                                    c.required &&
                                        (n.required = n.required ? [...n.required, ...c.required] : c.required),
                                    c.index ?? []
                                );
                            }));
                }
                const i = {};
                return (
                    (e.undeclared || t.undeclared) &&
                        (i.undeclared = e.undeclared === "reject" || t.undeclared === "reject" ? "reject" : "delete"),
                    hn({ kind: "structure", baseInner: i, l: pn(n), r: pn(s), roots: [], ctx: r })
                );
            },
        },
    }),
    ns = (e, t, r) => {
        const [n, s] = wu(e.branches, (a) => a.hasKind("unit"));
        if (!n.length) return { index: r.node("index", { signature: e, value: t }) };
        const i = {};
        return (
            (i.required = n.map((a) => r.node("required", { key: a.unit, value: t }))),
            s.length && (i.index = r.node("index", { signature: s, value: t })),
            i
        );
    },
    $s = {
        ...Mc,
        alias: qc,
        domain: Fc,
        unit: od,
        proto: Hc,
        union: ed,
        morph: Wc,
        intersection: Vc,
        divisor: dc,
        regex: Pc,
        predicate: uc,
        required: gd,
        optional: hd,
        index: ud,
        sequence: yd,
        structure: Od,
    },
    Td = {
        ...jc,
        alias: Bc,
        domain: Kc,
        unit: ld,
        proto: Gc,
        union: td,
        morph: Jc,
        intersection: Zc,
        divisor: fc,
        regex: zc,
        predicate: cc,
        required: md,
        optional: pd,
        index: cd,
        sequence: vd,
        structure: Ed,
    };
class ui extends Tu {
    get [Ct]() {
        return "module";
    }
}
const ci = { description: { meta: !0 } },
    zn = (e, t) => {
        const r = Cd(e);
        return t && !t.includes(r) ? T(`Root of kind ${r} should be one of ${t}`) : r;
    },
    Cd = (e) => {
        switch (typeof e) {
            case "string":
                return e[0] === "$" ? "alias" : "domain";
            case "function":
                return F(e, "root") ? e.kind : "proto";
            case "object": {
                if (e === null) break;
                if ("morphs" in e) return "morph";
                if ("branches" in e || qe(e)) return "union";
                if ("unit" in e) return "unit";
                if ("alias" in e) return "alias";
                const t = Object.keys(e);
                if (t.length === 0 || t.some((r) => r in La)) return "intersection";
                if ("proto" in e) return "proto";
                if ("domain" in e) return "domain";
            }
        }
        return T(`${ue(e)} is not a valid type schema`);
    },
    Ur = {},
    Id = (e) => (qe(e) ? e.map((t) => t.collapsibleJson) : e.collapsibleJson),
    Nd = (e, t) => {
        const r = $s[e],
            n = {},
            s = mt(t.schema).sort(([y], [m]) => (Hr(y) ? (Hr(m) ? fn(y) - fn(m) : 1) : Hr(m) || y < m ? -1 : 1)),
            i = [];
        for (const y of s) {
            const m = y[0],
                w = r.keys[m] ?? ci[m];
            if (!w) return T(`Key ${m} is not valid on ${e} schema`);
            const A = w.parse ? w.parse(y[1], t) : y[1];
            A !== Ut && (A !== void 0 || w.preserveUndefined) && (n[m] = A);
        }
        const a = mt(n);
        let o = {},
            l = {};
        a.forEach(([y, m]) => {
            const w = m,
                A = r.keys[y] ?? ci[y],
                ae = A.serialize ?? (A.child ? Id : bs);
            (o[y] = ae(w)), A.child && (qe(w) ? i.push(...w) : i.push(w)), A.meta || (l[y] = o[y]);
        }),
            r.finalizeJson && ((o = r.finalizeJson(o)), (l = r.finalizeJson(l)));
        let u = o;
        const c = Object.keys(u);
        c.length === 1 &&
            c[0] === r.collapsibleKey &&
            ((u = u[r.collapsibleKey]), zr(u, "object") && Object.keys(o).length === 1 && ((o = u), (l = u)));
        const h = JSON.stringify({ kind: e, ...o });
        if (t.reduceTo) return (Ur[h] = t.reduceTo), t.reduceTo;
        const x = JSON.stringify({ kind: e, ...l });
        if (r.reduce && !t.prereduced) {
            const y = r.reduce(n, t.$);
            if (y) return y instanceof I ? y.throw() : (t.alias && (y.alias ?? (y.alias = t.alias)), y);
        }
        if (Ur[h]) return Ur[h];
        const g = {
            id: t.id,
            kind: e,
            impl: r,
            inner: n,
            entries: a,
            json: o,
            typeJson: l,
            collapsibleJson: u,
            children: i,
            innerHash: h,
            typeHash: x,
            $: t.$,
        };
        t.alias && (g.alias = t.alias);
        for (const y in n) y !== "description" && y !== "in" && y !== "out" && (g[y] = n[y]);
        const _ = new Td[e](g);
        return (Ur[h] = _), _;
    };
class di extends Oa {
    constructor(r) {
        super("data", "ctx");
        f(this, "traversalKind");
        f(this, "path", []);
        f(this, "discriminants", []);
        this.traversalKind = r;
    }
    invoke(r, n) {
        const s = (n == null ? void 0 : n.arg) ?? this.data;
        return this.requiresContextFor(r)
            ? `${this.reference(r, n)}(${s}, ${this.ctx})`
            : `${this.reference(r, n)}(${s})`;
    }
    reference(r, n) {
        const s = (n == null ? void 0 : n.kind) ?? this.traversalKind,
            i = `this.${r.id}${s}`;
        return n != null && n.bind ? `${i}.bind(${n == null ? void 0 : n.bind})` : i;
    }
    requiresContextFor(r) {
        return this.traversalKind === "Apply" || r.allowsRequiresContext;
    }
    initializeErrorCount() {
        return this.const("errorCount", "ctx.currentErrorCount");
    }
    returnIfFail() {
        return this.if("ctx.currentErrorCount > errorCount", () => this.return());
    }
    returnIfFailFast() {
        return this.if("ctx.failFast && ctx.currentErrorCount > errorCount", () => this.return());
    }
    traverseKey(r, n, s) {
        const i = this.requiresContextFor(s);
        return (
            i && this.line(`${this.ctx}.path.push(${r})`),
            this.check(s, { arg: n }),
            i && this.line(`${this.ctx}.path.pop()`),
            this
        );
    }
    check(r, n) {
        return this.traversalKind === "Allows"
            ? this.if(`!${this.invoke(r, n)}`, () => this.return(!1))
            : this.line(this.invoke(r, n));
    }
    writeMethod(r) {
        return `${r}(${this.argNames.join(", ")}){
${this.body}    }
`;
    }
}
var Rd = function (e, t, r) {
        for (var n = arguments.length > 2, s = 0; s < t.length; s++) r = n ? t[s].call(e, r) : t[s].call(e);
        return n ? r : void 0;
    },
    Ln = function (e, t, r, n, s, i) {
        function a(w) {
            if (w !== void 0 && typeof w != "function") throw new TypeError("Function expected");
            return w;
        }
        for (
            var o = n.kind,
                l = o === "getter" ? "get" : o === "setter" ? "set" : "value",
                u = !t && e ? (n.static ? e : e.prototype) : null,
                c = t || (u ? Object.getOwnPropertyDescriptor(u, n.name) : {}),
                h,
                x = !1,
                g = r.length - 1;
            g >= 0;
            g--
        ) {
            var _ = {};
            for (var y in n) _[y] = y === "access" ? {} : n[y];
            for (var y in n.access) _.access[y] = n.access[y];
            _.addInitializer = function (w) {
                if (x) throw new TypeError("Cannot add initializers after decoration has completed");
                i.push(a(w || null));
            };
            var m = (0, r[g])(o === "accessor" ? { get: c.get, set: c.set } : c[l], _);
            if (o === "accessor") {
                if (m === void 0) continue;
                if (m === null || typeof m != "object") throw new TypeError("Object expected");
                (h = a(m.get)) && (c.get = h), (h = a(m.set)) && (c.set = h), (h = a(m.init)) && s.unshift(h);
            } else (h = a(m)) && (o === "field" ? s.unshift(h) : (c[l] = h));
        }
        u && Object.defineProperty(u, n.name, c), (x = !0);
    };
const Md = Object.assign(
        se($s, (e, t) => [e, t.defaults]),
        { jitless: Mu(), registerKeywords: !1, prereducedAliases: !1 },
    ),
    jd = ["registerKeywords", "prereducedAliases"],
    fi = (e, t) => {
        if (!t) return e;
        const r = sc(e, t);
        return (
            jd.forEach((n) => {
                n in t || delete r[n];
            }),
            r
        );
    },
    Pd = (e) => fi(fi(Md, nc), e),
    zd = (e) => (qe(e) ? e : "branches" in e && qe(e.branches) ? e.branches : void 0),
    Ld = (e, t) => T(`Node of kind ${t} is not valid as a ${e} definition`),
    hi = (e) => `#${e} duplicates public alias ${e}`,
    dt = {};
let Dd = 0;
const Bd = {};
let xs = (() => {
    var s, i;
    let e = [],
        t,
        r,
        n;
    return (
        (i = class {
            constructor(o, l) {
                f(this, "config", Rd(this, e));
                f(this, "resolvedConfig");
                f(this, "id", `$${++Dd}`);
                f(this, s, "scope");
                f(this, "referencesById", {});
                f(this, "references", []);
                f(this, "resolutions", {});
                f(this, "json", {});
                f(this, "exportedNames");
                f(this, "aliases", {});
                f(this, "resolved", !1);
                f(this, "lazyResolutions", []);
                f(
                    this,
                    "node",
                    ((o, l, u) => {
                        var w;
                        let c = typeof o == "string" ? o : zn(l, o),
                            h = l;
                        if (dn(h) && h.kind === c) return h.bindScope(this);
                        if (c === "alias" && !(u != null && u.prereduced)) {
                            const A = this.resolveRoot(Fa(h).alias);
                            (h = A), (c = A.kind);
                        } else if (c === "union" && zr(h, "object")) {
                            const A = zd(h);
                            (A == null ? void 0 : A.length) === 1 && ((h = A[0]), (c = zn(h)));
                        }
                        const x = $s[c],
                            g = ((w = x.normalize) == null ? void 0 : w.call(x, h)) ?? h;
                        if (dn(g)) return g.kind === c ? g.bindScope(this) : Ld(c, g.kind);
                        const _ = (u == null ? void 0 : u.alias) ?? c;
                        dt[_] ?? (dt[_] = 0);
                        const y = `${_}${++dt[_]}`,
                            m = Nd(c, { ...u, id: y, $: this, schema: g }).bindScope(this);
                        return (
                            this.resolved
                                ? this.resolvedConfig.jitless || pi(m.references)
                                : Object.assign(this.referencesById, m.referencesById),
                            m
                        );
                    }).bind(this),
                );
                f(this, "_exportedResolutions");
                f(this, "_exports");
                (this.config = l ?? {}),
                    (this.resolvedConfig = Pd(l)),
                    (this.exportedNames = Object.keys(o).filter((u) => {
                        if (u[0] === "#") {
                            const c = u.slice(1);
                            return c in this.aliases && T(hi(c)), (this.aliases[c] = o[u]), !1;
                        }
                        return u in this.aliases && T(hi(u)), (this.aliases[u] = o[u]), !0;
                    })),
                    this.ambient &&
                        (this.ambient.export(),
                        (this.resolutions = se(this.ambient.resolutions, (u, c) => [
                            u,
                            F(c, "root") ? c.bindScope(this) : c,
                        ]))),
                    (Bd[this.id] = this);
            }
            get keywords() {
                return i.keywords;
            }
            get ambient() {
                return this.constructor.ambient;
            }
            get raw() {
                return this;
            }
            schema(o, l) {
                return this.node(zn(o), o, l);
            }
            defineRoot(o) {
                return o;
            }
            units(o, l) {
                const u = [];
                for (const h of o) u.includes(h) || u.push(h);
                const c = u.map((h) => this.node("unit", { unit: h }, l));
                return this.node("union", c, { ...l, prereduced: !0 });
            }
            lazilyResolve(o, l) {
                l || (dt.synthetic ?? (dt.synthetic = 0), (l = `synthetic${++dt.synthetic}`));
                const u = this.node("alias", { alias: l, resolve: o }, { prereduced: !0 });
                return this.lazyResolutions.push(u), u;
            }
            parseRoot(o, l) {
                return this.schema(o, l);
            }
            resolveRoot(o) {
                return this.maybeResolveRoot(o) ?? T(Es(o));
            }
            maybeResolveRoot(o) {
                const l = this.maybeResolveGenericOrRoot(o);
                if (!F(l, "generic")) return l;
            }
            maybeResolveGenericOrRoot(o) {
                const l = this.maybeResolve(o);
                return F(l, "module") ? T(Kd(o)) : l;
            }
            preparseRoot(o) {
                return o;
            }
            maybeResolve(o) {
                const l = this.maybeShallowResolve(o);
                return typeof l == "string" ? this.node("alias", { alias: l }, { prereduced: !0 }) : l;
            }
            maybeShallowResolve(o) {
                const l = this.resolutions[o];
                if (l) return l;
                let u = this.aliases[o];
                return u
                    ? ((u = this.preparseRoot(u)),
                      F(u, "generic")
                          ? (this.resolutions[o] = lc(u))
                          : F(u, "module")
                            ? (this.resolutions[o] = u)
                            : ((this.resolutions[o] = o), (this.resolutions[o] = this.parseRoot(u))))
                    : this.maybeResolveSubalias(o);
            }
            maybeResolveSubalias(o) {
                return Wa(this.aliases, o);
            }
            import(...o) {
                return new ui(se(this.export(...o), (l, u) => [`#${l}`, u]));
            }
            export(...o) {
                if (!this._exports) {
                    this._exports = {};
                    for (const u of this.exportedNames) this._exports[u] = this.maybeResolve(u);
                    this.lazyResolutions.forEach((u) => u.resolution),
                        (this._exportedResolutions = Ha(this, this._exports)),
                        Object.assign(
                            this.json,
                            se(this._exportedResolutions, (u, c) => (F(c, "root") ? [u, c.json] : [])),
                        ),
                        Object.assign(this.resolutions, this._exportedResolutions),
                        this.config.registerKeywords && Object.assign(i.keywords, this._exportedResolutions),
                        (this.references = Object.values(this.referencesById)),
                        this.resolvedConfig.jitless || pi(this.references),
                        (this.resolved = !0);
                }
                const l = o.length ? o : this.exportedNames;
                return new ui(se(l, (u, c) => [c, this._exports[c]]));
            }
            resolve(o) {
                return this.export()[o];
            }
        }),
        (s = Ct),
        (() => {
            const o = typeof Symbol == "function" && Symbol.metadata ? Object.create(null) : void 0;
            (t = [Rn]),
                (r = [Rn]),
                (n = [Rn]),
                Ln(
                    i,
                    null,
                    t,
                    {
                        kind: "method",
                        name: "schema",
                        static: !1,
                        private: !1,
                        access: { has: (l) => "schema" in l, get: (l) => l.schema },
                        metadata: o,
                    },
                    null,
                    e,
                ),
                Ln(
                    i,
                    null,
                    r,
                    {
                        kind: "method",
                        name: "defineRoot",
                        static: !1,
                        private: !1,
                        access: { has: (l) => "defineRoot" in l, get: (l) => l.defineRoot },
                        metadata: o,
                    },
                    null,
                    e,
                ),
                Ln(
                    i,
                    null,
                    n,
                    {
                        kind: "method",
                        name: "units",
                        static: !1,
                        private: !1,
                        access: { has: (l) => "units" in l, get: (l) => l.units },
                        metadata: o,
                    },
                    null,
                    e,
                ),
                o &&
                    Object.defineProperty(i, Symbol.metadata, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: o,
                    });
        })(),
        f(i, "keywords", {}),
        f(i, "ambient"),
        i
    );
})();
const Wa = (e, t) => {
        const r = t.indexOf(".");
        if (r === -1) return;
        const n = t.slice(0, r),
            s = e[n];
        if (s === void 0) return;
        if (!F(s, "module")) return T(qd(n));
        const i = t.slice(r + 1),
            a = s[i];
        if (a === void 0) return F(a, "module") ? Wa(a, i) : T(Es(t));
        if (F(a, "root") || F(a, "generic")) return a;
        Ye(`Unexpected resolution for alias '${t}': ${ue(a)}`);
    },
    ar = (e, t) => new Ja(e, t),
    Ja = xs,
    ee = new Ja({});
ee.schema;
ee.node;
ee.defineRoot;
ee.units;
ee.raw.schema;
ee.raw.node;
ee.raw.defineRoot;
ee.raw.units;
const Ha = (e, t) => {
        const r = {};
        for (const n in t) {
            const s = t[n];
            if (F(s, "module")) {
                const i = Ha(e, s),
                    a = se(i, (o, l) => [`${n}.${o}`, l]);
                Object.assign(r, a);
            } else F(s, "generic") || F(s, "root") ? (r[n] = s) : Ye(`Unexpected scope resolution ${ue(s)}`);
        }
        return r;
    },
    Es = (e) => `'${e}' is unresolvable`,
    qd = (e) => `'${e}' must reference a module to be accessed using dot syntax`,
    Kd = (e) => `Reference to submodule '${e}' must specify an alias`,
    pi = (e) => {
        const t = Fd(e);
        for (const r of e)
            r.jit ||
                ((r.jit = !0),
                (r.traverseAllows = t[`${r.id}Allows`].bind(t)),
                r.isRoot() && !r.allowsRequiresContext && (r.allows = r.traverseAllows),
                (r.traverseApply = t[`${r.id}Apply`].bind(t)));
    },
    Fd = (e) =>
        new Oa()
            .block(
                "return",
                (t) => (
                    e.forEach((r) => {
                        const n = new di("Allows").indent();
                        r.compile(n);
                        const s = new di("Apply").indent();
                        r.compile(s),
                            t.line(`${n.writeMethod(`${r.id}Allows`)},`).line(`${s.writeMethod(`${r.id}Apply`)},`);
                    }),
                    t
                ),
            )
            .compile()(),
    As = ar(
        {
            any: {},
            bigint: "bigint",
            boolean: [{ unit: !1 }, { unit: !0 }],
            false: { unit: !1 },
            never: [],
            null: { unit: null },
            number: "number",
            object: "object",
            string: "string",
            symbol: "symbol",
            true: { unit: !0 },
            unknown: {},
            void: { unit: void 0 },
            undefined: { unit: void 0 },
        },
        { prereducedAliases: !0, registerKeywords: !0 },
    ).export(),
    Zd = ar(
        {
            lengthBoundable: ["string", Array],
            propertyKey: ["string", "symbol"],
            nonNegativeIntegerString: { domain: "string", regex: ws },
        },
        { prereducedAliases: !0, registerKeywords: !0 },
    ).export();
ee.node(
    "union",
    {
        branches: [
            "string",
            "number",
            "object",
            "bigint",
            "symbol",
            { unit: !0 },
            { unit: !1 },
            { unit: null },
            { unit: void 0 },
        ],
    },
    { reduceTo: ee.node("intersection", {}, { prereduced: !0 }) },
);
const Ss = ar(
        { Array, Function, Date, Error, Map, RegExp, Set, WeakMap, WeakSet, Promise },
        { prereducedAliases: !0, registerKeywords: !0 },
    ).export(),
    Vd = (e) => !Number.isNaN(+e),
    Ud = (e, t) => {
        {
            const r = new Date(e);
            return Vd(r) ? r : "a valid date";
        }
    },
    Ve = (e, t) => ee.defineRoot({ domain: "string", regex: { rule: e.source, flags: e.flags, description: t } }),
    Wd = ee.defineRoot({ in: Ve(Yn, "a well-formed numeric string"), morphs: (e) => Number.parseFloat(e) }),
    Jd = ee.defineRoot({
        in: Ve(un, "a well-formed integer string"),
        morphs: (e, t) => {
            if (!Ia(e)) return t.error("a well-formed integer string");
            const r = Number.parseInt(e);
            return Number.isSafeInteger(r)
                ? r
                : t.error("an integer in the range Number.MIN_SAFE_INTEGER to Number.MAX_SAFE_INTEGER");
        },
    }),
    Hd = ee.defineRoot({
        in: "string",
        morphs: (e, t) => {
            try {
                return new URL(e);
            } catch {
                return t.error("a valid URL");
            }
        },
    }),
    Gd = ee.defineRoot({
        in: "string",
        morphs: (e, t) => {
            try {
                return JSON.parse(e);
            } catch {
                return t.error("a valid JSON string");
            }
        },
    }),
    Yd = ee.defineRoot({
        in: "string",
        morphs: (e, t) => {
            const r = Ud(e);
            return typeof r == "string" ? t.error(r) : r;
        },
    }),
    Xd = ar({ url: Hd, number: Wd, integer: Jd, date: Yd, json: Gd }).export(),
    Qd = (e) => {
        const t = e.replace(/[- ]+/g, "");
        let r = 0,
            n,
            s,
            i = !1;
        for (let a = t.length - 1; a >= 0; a--)
            (n = t.substring(a, a + 1)),
                (s = Number.parseInt(n, 10)),
                i ? ((s *= 2), s >= 10 ? (r += (s % 10) + 1) : (r += s)) : (r += s),
                (i = !i);
        return !!(r % 10 === 0 && t);
    },
    ef =
        /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
    mi = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])",
    ht = `(${mi}[.]){3}${mi}`,
    tf = new RegExp(`^${ht}$`),
    rf = Ve(tf, "a valid IPv4 address"),
    H = "(?:[0-9a-fA-F]{1,4})",
    nf = new RegExp(
        `^((?:${H}:){7}(?:${H}|:)|(?:${H}:){6}(?:${ht}|:${H}|:)|(?:${H}:){5}(?::${ht}|(:${H}){1,2}|:)|(?:${H}:){4}(?:(:${H}){0,1}:${ht}|(:${H}){1,3}|:)|(?:${H}:){3}(?:(:${H}){0,2}:${ht}|(:${H}){1,4}|:)|(?:${H}:){2}(?:(:${H}){0,3}:${ht}|(:${H}){1,5}|:)|(?:${H}:){1}(?:(:${H}){0,4}:${ht}|(:${H}){1,6}|:)|(?::((?::${H}){0,5}:${ht}|(?::${H}){1,7}|:)))(%[0-9a-zA-Z-.:]{1,})?$`,
    ),
    sf = Ve(nf, "a valid IPv6 address"),
    af = ee.defineRoot([rf, sf]),
    of = ee.defineRoot({
        domain: "string",
        predicate: {
            predicate: (e) => {
                try {
                    new URL(e);
                } catch {
                    return !1;
                }
                return !0;
            },
            description: "a valid URL",
        },
    }),
    lf = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    uf = Ve(lf, "a valid email"),
    cf = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/,
    df = Ve(cf, "a valid UUID"),
    ff =
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
    hf = Ve(ff, "a valid semantic version (see https://semver.org/)"),
    pf = ee.defineRoot({
        domain: "string",
        regex: { rule: ef.source, description: "a valid credit card number" },
        predicate: { predicate: Qd, description: "a valid credit card number" },
    }),
    mf = ar(
        {
            alpha: Ve(/^[A-Za-z]*$/, "only letters"),
            alphanumeric: Ve(/^[A-Za-z\d]*$/, "only letters and digits"),
            lowercase: Ve(/^[a-z]*$/, "only lowercase letters"),
            uppercase: Ve(/^[A-Z]*$/, "only uppercase letters"),
            creditCard: pf,
            email: uf,
            uuid: df,
            url: of,
            semver: hf,
            ip: af,
            integer: { domain: "number", divisor: 1 },
        },
        { prereducedAliases: !0 },
    ).export(),
    Ga = ar({ ...As, ...Ss, ...mf, parse: Xd });
xs.ambient = Ga.raw;
const gf = Ga.export();
var dm;
class Ya extends hs {
    constructor(r, n, s) {
        super((...i) => s.parseRoot(n));
        f(this, "params");
        f(this, "def");
        f(this, "$");
        f(this, dm, "generic");
        (this.params = r), (this.def = n), (this.$ = s);
    }
}
dm = Ct;
const yf = (e) => (() => {}).bind(e);
class ze {
    constructor(t) {
        f(this, "chars");
        f(this, "i");
        (this.chars = [...t]), (this.i = 0);
    }
    shift() {
        return this.chars[this.i++] ?? "";
    }
    get lookahead() {
        return this.chars[this.i] ?? "";
    }
    get nextLookahead() {
        return this.chars[this.i + 1] ?? "";
    }
    get length() {
        return this.chars.length;
    }
    shiftUntil(t) {
        let r = "";
        for (; this.lookahead; ) {
            if (t(this, r))
                if (r[r.length - 1] === ze.escapeToken) r = r.slice(0, -1);
                else break;
            r += this.shift();
        }
        return r;
    }
    shiftUntilNextTerminator() {
        return this.shiftUntilNonWhitespace(), this.shiftUntil(ze.lookaheadIsTerminator);
    }
    shiftUntilNonWhitespace() {
        return this.shiftUntil(ze.lookaheadIsNotWhitespace);
    }
    jumpToIndex(t) {
        this.i = t < 0 ? this.length + t : t;
    }
    get location() {
        return this.i;
    }
    get unscanned() {
        return this.chars.slice(this.i, this.length).join("");
    }
    get scanned() {
        return this.chars.slice(0, this.i).join("");
    }
    sliceChars(t, r) {
        return this.chars.slice(t, r).join("");
    }
    lookaheadIs(t) {
        return this.lookahead === t;
    }
    lookaheadIsIn(t) {
        return this.lookahead in t;
    }
}
(function (e) {
    (e.lookaheadIsTerminator = (t) => t.lookahead in e.terminatingChars),
        (e.lookaheadIsNotWhitespace = (t) => !(t.lookahead in e.whiteSpaceTokens)),
        (e.terminatingChars = {
            "<": !0,
            ">": !0,
            "=": !0,
            "|": !0,
            "&": !0,
            ")": !0,
            "[": !0,
            "%": !0,
            " ": !0,
            ",": !0,
        }),
        (e.finalizingLookaheads = { ">": !0, ",": !0, "": !0 }),
        (e.escapeToken = "\\"),
        (e.whiteSpaceTokens = { " ": !0, "\n": !0, "	": !0 }),
        (e.lookaheadIsFinalizing = (t, r) =>
            t === ">"
                ? r[0] === "="
                    ? r[1] === "="
                    : r.trimStart() === "" || Me(r.trimStart()[0], e.terminatingChars)
                : t === ",");
})(ze || (ze = {}));
const vf = (e, t) => {
        var a;
        let r;
        const n = {},
            s = Hn(e).map(kf);
        if (((a = s[0]) == null ? void 0 : a.kind) === "...") {
            const o = s.shift(),
                l = t.$.parse(o.value, t);
            if (!l.hasKind("intersection") || !l.structure)
                return T(xf(typeof o.value == "string" ? o.value : ue(o.value)));
            r = l.structure;
        }
        for (const o of s) {
            if (o.kind === "...") return T(_f);
            if (o.kind === "+") {
                o.value !== "reject" && o.value !== "delete" && o.value !== "ignore" && T(bf(o.value)),
                    (n.undeclared = o.value);
                continue;
            }
            if (o.kind === "index") {
                const l = t.$.parse(o.key, t),
                    u = t.$.parse(o.value, t),
                    c = ns(l, u, t.$);
                c.required && (n.required = Re(n.required, c.required)), c.index && (n.index = Re(n.index, c.index));
            } else {
                const l = t.$.parse(o.value, t),
                    u = { key: o.key, value: l };
                if (o.default !== Ut) {
                    const c = l(o.default);
                    c instanceof Rr && T(`Default value at ${ue(o.key)} ${c}`),
                        l.assert(o.default),
                        (u.default = o.default);
                }
                n[o.kind] = Re(n[o.kind], u);
            }
        }
        const i = t.$.node("structure", n);
        return t.$.schema({ domain: "object", structure: (r == null ? void 0 : r.merge(i)) ?? i });
    },
    bf = (e) => `Value of '+' key must be 'reject', 'delete', or 'ignore' (was ${ue(e)})`,
    _f = "Spread operator may only be used as the first key in an object",
    kf = ([e, t]) => {
        const r = $f(e);
        return qe(t) && t[1] === "="
            ? (r.kind !== "required" && T(wf), { kind: "optional", key: r.key, value: t[0], default: t[2] })
            : { kind: r.kind, key: r.key, value: t, default: Ut };
    },
    wf = "Only required keys may specify default values, e.g. { ark: ['string', '=', '⛵'] }",
    $f = (e) =>
        typeof e == "symbol"
            ? { kind: "required", key: e }
            : e.at(-1) === "?"
              ? e.at(-2) === ze.escapeToken
                  ? { kind: "required", key: `${e.slice(0, -2)}?` }
                  : { kind: "optional", key: e.slice(0, -1) }
              : e[0] === "[" && e.at(-1) === "]"
                ? { kind: "index", key: e.slice(1, -1) }
                : e[0] === ze.escapeToken && e[1] === "[" && e.at(-1) === "]"
                  ? { kind: "required", key: e.slice(1) }
                  : e === "..." || e === "+"
                    ? { kind: e, key: e }
                    : { kind: "required", key: e === "\\..." ? "..." : e === "\\+" ? "+" : e },
    xf = (e) => `Spread operand must resolve to an object literal type (was ${e})`,
    Ef = (e) => `Private type references should not include '#'. Use '${e.slice(1)}' instead.`,
    Af = { ">": !0, ">=": !0 },
    Sf = { "<": !0, "<=": !0 },
    gn = { "<": ">", ">": "<", "<=": ">=", ">=": "<=", "==": "==" },
    Of = (e) => `Unmatched )${e === "" ? "" : ` before ${e}`}`,
    Xa = (e) => `Missing ${e}`,
    Tf = (e, t) => `Left bounds are only valid when paired with right bounds (try ...${t}${e})`,
    Qa = (e) => `Left-bounded expressions must specify their limits using < or <= (was ${e})`,
    Cf = (e, t, r, n) => `An expression may have at most one left bound (parsed ${e}${gn[t]}, ${r}${gn[n]})`,
    If = (e, t, r) => eo(e, t, r, [], []),
    eo = (e, t, r, n, s) => {
        const i = r.parseUntilFinalizer();
        return (
            n.push(i.scanner.scanned.slice(0, -1)),
            s.push(i.root),
            i.finalizer === ">"
                ? s.length === t.length
                    ? { result: s, unscanned: i.scanner.unscanned }
                    : i.error(to(e, t, n))
                : i.finalizer === ","
                  ? eo(e, t, r, n, s)
                  : i.error(Xa(">"))
        );
    },
    to = (e, t, r) =>
        `${e}<${t.join(", ")}> requires exactly ${t.length} args (got ${r.length}${r.length === 0 ? "" : `: ${r.join(", ")}`})`,
    gi = (e) => {
        const t = e.scanner.shiftUntilNextTerminator();
        t === "keyof" ? e.addPrefix("keyof") : (e.root = Rf(e, t));
    },
    Nf = (e, t, r) => {
        if ((r.scanner.shiftUntilNonWhitespace(), r.scanner.shift() !== "<")) return r.error(to(e, t.params, []));
        const s = If(e, t.params, r),
            i = s.unscanned.length;
        return r.scanner.jumpToIndex(i === 0 ? r.scanner.length : -i), t(...s.result);
    },
    Rf = (e, t) => Mf(e, t) ?? jf(e, t) ?? e.error(t === "" ? ro(e) : t[0] === "#" ? Ef(t) : Es(t)),
    Mf = (e, t) => {
        var n;
        if ((n = e.ctx.args) != null && n[t]) return e.ctx.args[t].raw;
        const r = e.ctx.$.maybeResolve(t);
        if (r instanceof ir) return r;
        if (r !== void 0) return F(r, "generic") ? Nf(t, r, e) : T(`Unexpected resolution ${ue(r)}`);
    },
    jf = (e, t) => {
        const r = Ma(t, { strict: !0 });
        if (r !== void 0) return e.ctx.$.node("unit", { unit: r });
        const n = Yu(t);
        if (n !== void 0) return e.ctx.$.node("unit", { unit: n });
    },
    ro = (e) => {
        const t = e.previousOperator();
        return t ? no(t, e.scanner.unscanned) : Pf(e.scanner.unscanned);
    },
    no = (e, t = "") => `Token '${e}' requires a right operand${t ? ` before '${t}'` : ""}`,
    Pf = (e) => `Expected an expression${e ? ` before '${e}'` : ""}`,
    zf = (e, t) => Bf(e, t) ?? Lf(e, t),
    Lf = (e, t) => {
        let r = [{}],
            n = 0;
        for (; n < e.length; ) {
            let s = !1,
                i = !1;
            e[n] === "..." && n < e.length - 1 && ((s = !0), n++);
            const a = t.$.parse(e[n], t);
            if ((n++, e[n] === "?")) {
                if (s) return T(Zf);
                (i = !0), n++;
            }
            if (s) {
                if (!a.extends(Ss.Array)) return T(qf(a.expression));
                r = r.flatMap((o) => a.branches.map((l) => Df(Pa(o), l)));
            } else r = r.map((o) => Lt(o, i ? "optional" : "required", a));
        }
        return t.$.raw.schema(r.map((s) => ({ proto: Array, sequence: s })));
    },
    Lt = (e, t, r) => {
        switch (t) {
            case "required":
                return e.optionals
                    ? T(Kf)
                    : (e.variadic ? (e.postfix = Re(e.postfix, r)) : (e.prefix = Re(e.prefix, r)), e);
            case "optional":
                return e.variadic ? T(Ff) : ((e.optionals = Re(e.optionals, r)), e);
            case "variadic":
                return e.postfix && T(yi), e.variadic ? e.variadic.equals(r) || T(yi) : (e.variadic = r.raw), e;
        }
    },
    Df = (e, t) => {
        const r = t.firstReferenceOfKind("sequence");
        return r
            ? (r.prefix.forEach((n) => Lt(e, "required", n)),
              r.optionals.forEach((n) => Lt(e, "optional", n)),
              r.variadic && Lt(e, "variadic", r.variadic),
              r.postfix.forEach((n) => Lt(e, "required", n)),
              e)
            : Lt(e, "variadic", As.unknown);
    },
    Bf = (e, t) => (Yf(e) ? ao[e[0]](e, t) : Wf(e) ? io[e[1]](e, t) : void 0),
    qf = (e) => `Spread element must be an array (was ${e})`,
    yi = "A tuple may have at most one variadic element",
    Kf = "A required element may not follow an optional element",
    Ff = "An optional element may not follow a variadic element",
    Zf = "A spread element cannot be optional",
    Vf = (e, t) => t.$.parse(e[1], t).keyof(),
    vi = (e, t) => {
        if (e[2] === void 0) return T(no(e[1], ""));
        const r = t.$.parse(e[0], t),
            n = t.$.parse(e[2], t);
        return e[1] === "&" ? r.and(n) : r.or(n);
    },
    Uf = (e, t) => t.$.parse(e[0], t).array(),
    Wf = (e) => io[e[1]] !== void 0,
    Jf = (e, t) => (typeof e[2] != "function" ? T(so("=>", e[2])) : t.$.parse(e[0], t).pipe(e[2])),
    so = (e, t) =>
        `${e === ":" ? "Narrow" : "Morph"} expression requires a function following '${e}' (was ${typeof t})`,
    Hf = (e, t) => (typeof e[2] != "function" ? T(so(":", e[2])) : t.$.parse(e[0], t).constrain("predicate", e[2])),
    Gf = (e, t) => t.$.parse(e[0], t).configureShallowDescendants(e[2]),
    io = { "|": vi, "&": vi, "[]": Uf, ":": Hf, "=>": Jf, "@": Gf },
    ao = {
        keyof: Vf,
        instanceof: (e, t) => {
            if (typeof e[1] != "function") return T(bi(Gn(e[1])));
            const r = e.slice(1).map((n) => (typeof n == "function" ? t.$.node("proto", { proto: n }) : T(bi(Gn(n)))));
            return r.length === 1 ? r[0] : t.$.node("union", { branches: r });
        },
        "===": (e, t) => t.$.units(e.slice(1)),
    },
    Yf = (e) => ao[e[0]] !== void 0,
    bi = (e) => `Expected a constructor following 'instanceof' operator (was ${e})`,
    Xf = (e, t) => {
        const r = ps(e);
        switch (r) {
            case void 0:
                return F(e, "root") ? e : vf(e, t);
            case "Array":
                return zf(e, t);
            case "RegExp":
                return t.$.node("intersection", { domain: "string", regex: e }, { prereduced: !0 });
            case "Function": {
                const n = $a(e) ? e() : e;
                return F(n, "root") ? n : T(ss("Function"));
            }
            default:
                return T(ss(r ?? ue(e)));
        }
    },
    ss = (e) => `Type definitions must be strings or objects (was ${e})`,
    Qf = (e) => typeof e == "string" && e[0] === "d" && (e[1] === "'" || e[1] === '"') && e.at(-1) === e[1],
    _i = (e) => e.toString() !== "Invalid Date",
    eh = (e) => e.slice(2, -1),
    oo = (e) => `'${e}' could not be parsed by the Date constructor`,
    th = (e, t) => rh(e, t),
    rh = (e, t) => {
        const r = new Date(e);
        if (_i(r)) return r;
        const n = Ma(e);
        if (n !== void 0) {
            const s = new Date(n);
            if (_i(s)) return s;
        }
        return t ? T(t === !0 ? oo(e) : t) : void 0;
    },
    nh = (e, t) => {
        const r = ah(e, t);
        if (e.root.hasKind("unit")) {
            if (typeof e.root.unit == "number") {
                e.reduceLeftBound(e.root.unit, r), e.unsetRoot();
                return;
            }
            if (e.root.unit instanceof Date) {
                const n = `d'${e.root.description ?? e.root.unit.toISOString()}'`;
                e.unsetRoot(), e.reduceLeftBound(n, r);
                return;
            }
        }
        return uh(e, r);
    },
    sh = { "<": !0, ">": !0 },
    ih = { "<": 1, ">": 1, "=": 1 },
    ah = (e, t) => (e.scanner.lookaheadIs("=") ? `${t}${e.scanner.shift()}` : Me(t, sh) ? t : e.error(oh)),
    ki = (e, t, r, n) =>
        r.extends(As.number)
            ? typeof t != "number"
                ? T(is(e, t, n))
                : e === "=="
                  ? ["min", "max"]
                  : e[0] === ">"
                    ? ["min"]
                    : ["max"]
            : r.extends(Zd.lengthBoundable)
              ? typeof t != "number"
                  ? T(is(e, t, n))
                  : e === "=="
                    ? ["minLength", "maxLength"]
                    : e[0] === ">"
                      ? ["minLength"]
                      : ["maxLength"]
              : r.extends(Ss.Date)
                ? e === "=="
                    ? ["after", "before"]
                    : e[0] === ">"
                      ? ["after"]
                      : ["before"]
                : T(bc(r.expression)),
    oh = "= is not a valid comparator. Use == to check for equality",
    lh = (e) => ({ rule: Qf(e.limit) ? eh(e.limit) : e.limit, exclusive: e.comparator.length === 1 }),
    uh = (e, t) => {
        const r = e.unsetRoot(),
            n = e.scanner.location;
        e.parseOperand();
        const s = e.unsetRoot(),
            i = e.scanner.sliceChars(n, e.scanner.location);
        if (((e.root = r), !s.hasKind("unit") || (typeof s.unit != "number" && !(s.unit instanceof Date))))
            return e.error(is(t, i, "right"));
        const a = s.unit,
            o = t.length === 1;
        for (const u of ki(t, typeof a == "number" ? a : i, r, "right")) e.constrainRoot(u, { rule: a, exclusive: o });
        if (!e.branches.leftBound) return;
        if (!Me(t, Sf)) return e.error(Qa(t));
        const l = ki(e.branches.leftBound.comparator, e.branches.leftBound.limit, r, "left");
        e.constrainRoot(l[0], lh(e.branches.leftBound)), (e.branches.leftBound = null);
    },
    is = (e, t, r) =>
        `Comparator ${r === "left" ? gn[e] : e} must be ${r === "left" ? "preceded" : "followed"} by a corresponding literal (was ${t})`,
    ch = (e) => {
        const t = e.scanner.shiftUntilNextTerminator(),
            r = Gu(t, { errorOnFail: wi(t) });
        r === 0 && e.error(wi(0)), (e.root = e.root.constrain("divisor", r));
    },
    wi = (e) => `% operator must be followed by a non-zero integer literal (was ${e})`,
    lo = (e) => {
        const t = e.scanner.shift();
        return t === ""
            ? e.finalize("")
            : t === "["
              ? e.scanner.shift() === "]"
                  ? e.setRoot(e.root.array())
                  : e.error(dh)
              : t === "|" || t === "&"
                ? e.pushRootToBranch(t)
                : t === ")"
                  ? e.finalizeGroup()
                  : ze.lookaheadIsFinalizing(t, e.scanner.unscanned)
                    ? e.finalize(t)
                    : Me(t, ih)
                      ? nh(e, t)
                      : t === "%"
                        ? ch(e)
                        : t === " "
                          ? lo(e)
                          : e.error(Os(t));
    },
    Os = (e, t = "") => `'${e}' is not allowed here${t && ` (should be ${t})`}`,
    dh = "Missing expected ']'",
    uo = (e) => co(new ze(e)),
    fh = "An empty string is not a valid generic parameter name",
    co = (e) => {
        const t = e.shiftUntilNextTerminator();
        t === "" && T(fh), e.shiftUntilNonWhitespace();
        const r = e.shift();
        return r === "" ? [t] : r === "," ? [t, ...co(e)] : T(Os(r, ","));
    },
    $i = (e, t) => {
        const r = e.scanner.shiftUntil(ph[ho[t]]);
        if (e.scanner.lookahead === "") return e.error(gh(r, t));
        if ((e.scanner.shift(), t === "/"))
            e.root = e.ctx.$.node("intersection", { domain: "string", regex: r }, { prereduced: !0 });
        else if (Me(t, fo)) e.root = e.ctx.$.node("unit", { unit: r });
        else {
            const n = th(r, oo(r));
            e.root = e.ctx.$.node("unit", { unit: n, description: r });
        }
    },
    fo = { "'": 1, '"': 1 },
    hh = { "/": 1, "'": 1, '"': 1 },
    ho = { "d'": "'", 'd"': '"', "'": "'", '"': '"', "/": "/" },
    ph = { "'": (e) => e.lookahead === "'", '"': (e) => e.lookahead === '"', "/": (e) => e.lookahead === "/" },
    mh = { '"': "double-quote", "'": "single-quote", "/": "forward slash" },
    gh = (e, t) => `${t}${e} requires a closing ${mh[ho[t]]}`,
    po = (e) =>
        e.scanner.lookahead === ""
            ? e.error(ro(e))
            : e.scanner.lookahead === "("
              ? e.shiftedByOne().reduceGroupOpen()
              : e.scanner.lookaheadIsIn(hh)
                ? $i(e, e.scanner.shift())
                : e.scanner.lookaheadIsIn(ze.whiteSpaceTokens)
                  ? po(e.shiftedByOne())
                  : e.scanner.lookahead === "d" && e.scanner.nextLookahead in fo
                    ? $i(e, `${e.scanner.shift()}${e.scanner.shift()}`)
                    : gi(e),
    yh = (e) => {
        e.parseOperand();
        const t = mo(e).root;
        return t
            ? (e.scanner.shiftUntilNonWhitespace(), e.scanner.lookahead && T(Os(e.scanner.lookahead)), t)
            : Ye(`Root was unexpectedly unset after parsing string '${e.scanner.scanned}'`);
    },
    mo = (e) => {
        for (; e.finalizer === void 0; ) vh(e);
        return e;
    },
    vh = (e) => (e.hasRoot() ? e.parseOperator() : e.parseOperand());
class Ts {
    constructor(t, r) {
        f(this, "ctx");
        f(this, "scanner");
        f(this, "root");
        f(this, "branches", { prefixes: [], leftBound: null, intersection: null, union: null });
        f(this, "finalizer");
        f(this, "groups", []);
        (this.ctx = r), (this.scanner = new ze(t));
    }
    error(t) {
        return T(t);
    }
    hasRoot() {
        return this.root !== void 0;
    }
    setRoot(t) {
        this.root = t;
    }
    unsetRoot() {
        const t = this.root;
        return (this.root = void 0), t;
    }
    constrainRoot(...t) {
        this.root = this.root.constrain(t[0], t[1]);
    }
    finalize(t) {
        if (this.groups.length) return this.error(Xa(")"));
        this.finalizeBranches(), (this.finalizer = t);
    }
    reduceLeftBound(t, r) {
        const n = gn[r];
        if (!Me(n, Af)) return this.error(Qa(r));
        if (this.branches.leftBound)
            return this.error(Cf(this.branches.leftBound.limit, this.branches.leftBound.comparator, t, n));
        this.branches.leftBound = { comparator: n, limit: t };
    }
    finalizeBranches() {
        this.assertRangeUnset(),
            this.branches.union
                ? (this.pushRootToBranch("|"), (this.root = this.branches.union))
                : this.branches.intersection
                  ? (this.pushRootToBranch("&"), (this.root = this.branches.intersection))
                  : this.applyPrefixes();
    }
    finalizeGroup() {
        this.finalizeBranches();
        const t = this.groups.pop();
        if (!t) return this.error(Of(this.scanner.unscanned));
        this.branches = t;
    }
    addPrefix(t) {
        this.branches.prefixes.push(t);
    }
    applyPrefixes() {
        for (; this.branches.prefixes.length; ) {
            const t = this.branches.prefixes.pop();
            this.root = t === "keyof" ? this.root.keyof() : Ye(`Unexpected prefix '${t}'`);
        }
    }
    pushRootToBranch(t) {
        var n, s;
        this.assertRangeUnset(), this.applyPrefixes();
        const r = this.root;
        (this.branches.intersection = ((n = this.branches.intersection) == null ? void 0 : n.and(r)) ?? r),
            t === "|" &&
                ((this.branches.union =
                    ((s = this.branches.union) == null ? void 0 : s.or(this.branches.intersection)) ??
                    this.branches.intersection),
                (this.branches.intersection = null)),
            (this.root = void 0);
    }
    parseUntilFinalizer() {
        return mo(new Ts(this.scanner.unscanned, this.ctx));
    }
    parseOperator() {
        return lo(this);
    }
    parseOperand() {
        return po(this);
    }
    assertRangeUnset() {
        if (this.branches.leftBound)
            return this.error(Tf(this.branches.leftBound.limit, this.branches.leftBound.comparator));
    }
    reduceGroupOpen() {
        this.groups.push(this.branches),
            (this.branches = { prefixes: [], leftBound: null, union: null, intersection: null });
    }
    previousOperator() {
        var t;
        return (
            ((t = this.branches.leftBound) == null ? void 0 : t.comparator) ??
            this.branches.prefixes.at(-1) ??
            (this.branches.intersection ? "&" : this.branches.union ? "|" : void 0)
        );
    }
    shiftedByOne() {
        return this.scanner.shift(), this;
    }
}
const bh = Object.freeze({ errors: Rr });
class _h extends hs {
    constructor(t) {
        super(
            (...r) => {
                if (r.length === 1) return t.parseRoot(r[0]);
                if (r.length === 2 && typeof r[0] == "string" && r[0][0] === "<" && r[0].at(-1) === ">") {
                    const n = uo(r[0].slice(1, -1)),
                        s = r[1];
                    return new Ya(n, s, t);
                }
                return t.parseRoot(r);
            },
            { bind: t, attach: bh },
        );
    }
}
const kh = (e, t = {}) => new go(e, t);
class go extends xs {
    constructor(r, n) {
        const s = {};
        for (const i in r) {
            const a = wh(i);
            s[a.name] = a.params.length ? new Ya(a.params, r[i], {}) : r[i];
        }
        super(s, n);
        f(this, "parseCache", {});
        f(this, "type", new _h(this));
        f(this, "match", yf(this));
        f(this, "declare", (() => ({ type: this.type })).bind(this));
        f(this, "define", ((r) => r).bind(this));
    }
    preparseRoot(r) {
        return $a(r) && !F(r, "generic") ? r() : r;
    }
    parseRoot(r) {
        return this.parse(r, { $: this, args: {} }).bindScope(this);
    }
    parse(r, n) {
        return typeof r == "string"
            ? n.args && Object.keys(n.args).every((s) => !r.includes(s))
                ? this.parseString(r, n)
                : (this.parseCache[r] || (this.parseCache[r] = this.parseString(r, n)), this.parseCache[r])
            : zr(r, "object")
              ? Xf(r, n)
              : T(ss(ut(r)));
    }
    parseString(r, n) {
        var s;
        return (
            this.maybeResolveRoot(r) ??
            ((r.endsWith("[]") && ((s = this.maybeResolveRoot(r.slice(0, -2))) == null ? void 0 : s.array())) ||
                yh(new Ts(r, n)))
        );
    }
}
const wh = (e) => {
        const t = e.indexOf("<");
        return t === -1
            ? { name: e, params: [] }
            : (e.at(-1) !== ">" && T("'>' must be the last character of a generic declaration in a scope"),
              { name: e.slice(0, t), params: uo(e.slice(t + 1, -1)) });
    },
    or = kh(gf);
go.ambient = or.raw;
or.export();
or.type;
or.match;
or.define;
or.declare;
function $h(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function $n(e) {
    return (typeof e != "object" && typeof e != "function") || e === null;
}
function _t() {
    (this.childBranches = new WeakMap()), (this.primitiveKeys = new Map()), (this.hasValue = !1), (this.value = void 0);
}
_t.prototype.has = function (t) {
    var r = $n(t) ? this.primitiveKeys.get(t) : t;
    return r ? this.childBranches.has(r) : !1;
};
_t.prototype.get = function (t) {
    var r = $n(t) ? this.primitiveKeys.get(t) : t;
    return r ? this.childBranches.get(r) : void 0;
};
_t.prototype.resolveBranch = function (t) {
    if (this.has(t)) return this.get(t);
    var r = new _t(),
        n = this.createKey(t);
    return this.childBranches.set(n, r), r;
};
_t.prototype.setValue = function (t) {
    return (this.hasValue = !0), (this.value = t);
};
_t.prototype.createKey = function (t) {
    if ($n(t)) {
        var r = {};
        return this.primitiveKeys.set(t, r), r;
    }
    return t;
};
_t.prototype.clear = function () {
    if (arguments.length === 0)
        (this.childBranches = new WeakMap()), this.primitiveKeys.clear(), (this.hasValue = !1), (this.value = void 0);
    else if (arguments.length === 1) {
        var t = arguments[0];
        if ($n(t)) {
            var r = this.primitiveKeys.get(t);
            r && (this.childBranches.delete(r), this.primitiveKeys.delete(t));
        } else this.childBranches.delete(t);
    } else {
        var n = arguments[0];
        if (this.has(n)) {
            var s = this.get(n);
            s.clear.apply(s, Array.prototype.slice.call(arguments, 1));
        }
    }
};
var xh = function (t) {
        var r = new _t();
        function n() {
            var s = Array.prototype.slice.call(arguments),
                i = s.reduce(function (l, u) {
                    return l.resolveBranch(u);
                }, r);
            if (i.hasValue) return i.value;
            var a = t.apply(null, s);
            return i.setValue(a);
        }
        return (n.clear = r.clear.bind(r)), n;
    },
    Eh = xh;
const Ah = $h(Eh),
    Sh = Ah;
async function Oh(e, t, r) {
    const n = await e.safeParseAsync(t, { errorMap: r });
    return n.success
        ? { data: n.data, success: !0 }
        : { issues: n.error.issues.map(({ message: s, path: i }) => ({ message: s, path: i })), success: !1 };
}
function Th(e, t) {
    return { superFormValidationLibrary: "zod", validate: async (r) => Oh(e, r, t == null ? void 0 : t.errorMap) };
}
const xm = Sh(Th);
class Mr extends String {}
const Ch = new Set(["<", ">", "<=", ">="]),
    Ih = (e) => `\\u${e.toString(16).padStart(4, "0")}`,
    Nh = (e) => {
        if ([1 / 0, -1 / 0, NaN, void 0, null].includes(e)) return `${e}`;
        if (!["string", "boolean", "number"].includes(typeof e)) {
            if (typeof e != "object") throw new Error("Unexpected value type");
            const r = Object.getPrototypeOf(e);
            if (!((r === Array.prototype && Array.isArray(e)) || r === Object.prototype))
                throw new Error("Unexpected object given as value");
        }
        return JSON.stringify(e)
            .replace(/([{,])"__proto__":/g, '$1["__proto__"]:')
            .replace(/[^\\]"__proto__":/g, () => {
                throw new Error("Unreachable");
            })
            .replace(/[\u2028\u2029]/g, (r) => Ih(r.charCodeAt(0)));
    },
    xn = (e, ...t) => {
        const r = e.replace(/%[%drscjw]/g, (n) => {
            if (n === "%%") return "%";
            if (t.length === 0) throw new Error("Unexpected arguments count");
            const s = t.shift();
            switch (n) {
                case "%d":
                    if (typeof s == "number") return s;
                    throw new Error("Expected a number");
                case "%r":
                    if (s instanceof RegExp) return xn("new RegExp(%j, %j)", s.source, s.flags);
                    throw new Error("Expected a RegExp instance");
                case "%s":
                    if (s instanceof Mr) return s;
                    throw new Error("Expected a safe string");
                case "%c":
                    if (Ch.has(s)) return s;
                    throw new Error("Expected a compare op");
                case "%j":
                    return Nh(s);
                case "%w":
                    if (Number.isInteger(s) && s >= 0) return " ".repeat(s);
                    throw new Error("Expected a non-negative integer for indentation");
            }
            throw new Error("Unreachable");
        });
        if (t.length !== 0) throw new Error("Unexpected arguments count");
        return new Mr(r);
    },
    as = (e) => {
        if (!/^[a-z][a-z0-9_]*$/i.test(e)) throw new Error("Does not look like a safe id");
        return new Mr(e);
    },
    yo =
        (e) =>
        (...t) => {
            if (!t.every((r) => r instanceof Mr)) throw new Error("Unsafe arguments");
            return new Mr(e(...t));
        },
    Rh = (e) => (/^[a-z][a-z0-9_().]*$/i.test(e) || /^\([^()]+\)$/i.test(e) ? e : xn("(%s)", e)),
    Mh = yo((...e) => (e.some((t) => `${t}` == "true") ? "true" : e.join(" || ") || "false")),
    jh = yo((...e) => (e.some((t) => `${t}` == "false") ? "false" : e.join(" && ") || "true")),
    vo = (e) => (`${e}` == "true" ? as("false") : `${e}` == "false" ? as("true") : xn("!%s", Rh(e))),
    Ph = (...e) => vo(Mh(...e));
var zh = { format: xn, safe: as, safeand: jh, safenot: vo, safenotor: Ph };
const Lh = (e) => (/[\uD800-\uDFFF]/.test(e) ? [...e].length : e.length),
    Dh = (e, t, r, n) => {
        if (e % t === 0) return !0;
        let s = e * r;
        if (((s === 1 / 0 || s === -1 / 0) && (s = e), s % n === 0)) return !0;
        const i = Math.floor(s + 0.5);
        return i / r === e && i % n === 0;
    },
    jr = (e, t) => {
        if (e === t) return !0;
        if (!e || !t || typeof e != typeof t || (e !== t && typeof e != "object")) return !1;
        const r = Object.getPrototypeOf(e);
        if (r !== Object.getPrototypeOf(t)) return !1;
        if (r === Array.prototype)
            return !Array.isArray(e) || !Array.isArray(t) || e.length !== t.length
                ? !1
                : e.every((n, s) => jr(n, t[s]));
        if (r === Object.prototype) {
            const [n, s] = [Object.keys(e), Object.keys(t)];
            return n.length !== s.length
                ? !1
                : new Set([...n, ...s]).size === n.length && n.every((a) => jr(e[a], t[a]));
        }
        return !1;
    },
    Bh = (e) => {
        if (e.length < 2) return !0;
        if (e.length === 2) return !jr(e[0], e[1]);
        const t = [],
            r = e.length > 20 ? new Set() : null;
        let n = 0,
            s = 0;
        for (const i of e) {
            if (typeof i == "object") t.push(i);
            else if (r) {
                if ((r.add(i), r.size !== ++n)) return !1;
            } else if (e.indexOf(i, s + 1) !== -1) return !1;
            s++;
        }
        for (let i = 1; i < t.length; i++) for (let a = 0; a < i; a++) if (jr(t[i], t[a])) return !1;
        return !0;
    },
    qh = (e) => {
        if (typeof Buffer < "u") return Buffer.from(e, "base64").toString("utf-8");
        const t = atob(e);
        return new TextDecoder("utf-8").decode(new Uint8Array(t.length).map((r, n) => t.charCodeAt(n)));
    },
    bo = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
bo[Symbol.for("toJayString")] = "Function.prototype.call.bind(Object.prototype.hasOwnProperty)";
const _o = (e) => (/~\//.test(e) ? `${e}`.replace(/~/g, "~0").replace(/\//g, "~1") : e),
    Kh = (e) => (e.length === 0 ? "#" : `#/${e.map(_o).join("/")}`),
    Fh = ({ keywordLocation: e, instanceLocation: t }, r, n) => ({
        keywordLocation: `${r}${e.slice(1)}`,
        instanceLocation: `${n}${t.slice(1)}`,
    }),
    Zh = (e, [t, r]) => t.includes(!0) || t.some((n) => n === e) || r.some((n) => new RegExp(n, "u").test(e)),
    Vh = (e, t) => (e.filter((r) => r[t])[0] || {})[t],
    Uh = { toPointer: Kh, pointerPart: _o, errorMerge: Fh, propertyIn: Zh, dynamicResolve: Vh };
var Wh = { stringLength: Lh, isMultipleOf: Dh, deepEqual: jr, unique: Bh, deBase64: qh, hasOwn: bo, ...Uh };
const { format: xt, safe: Em } = zh;
new Map(
    Object.entries({
        null: (e) => xt("%s === null", e),
        boolean: (e) => xt('typeof %s === "boolean"', e),
        array: (e) => xt("Array.isArray(%s)", e),
        object: (e) => xt('typeof %s === "object" && %s && !Array.isArray(%s)', e, e, e),
        number: (e) => xt('typeof %s === "number"', e),
        integer: (e) => xt("Number.isInteger(%s)", e),
        string: (e) => xt('typeof %s === "string"', e),
    }),
);
new Set([].concat(...[Object, Array, String, Number, Boolean].map((e) => Object.getOwnPropertyNames(e.prototype))));
const xi = {
    email: (e) => {
        if (e.length > 318) return !1;
        if (
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]{1,20}(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]{1,21}){0,2}@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,60}[a-z0-9])?){0,3}$/i.test(
                e,
            )
        )
            return !0;
        if (!e.includes("@") || /(^\.|^"|\.@|\.\.)/.test(e)) return !1;
        const [r, n, ...s] = e.split("@");
        return !r ||
            !n ||
            s.length !== 0 ||
            r.length > 64 ||
            n.length > 253 ||
            !/^[a-z0-9.-]+$/i.test(n) ||
            !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(r)
            ? !1
            : n.split(".").every((i) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i.test(i));
    },
    hostname: (e) =>
        e.length > (e.endsWith(".") ? 254 : 253)
            ? !1
            : /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.?$/i.test(e),
    date: (e) => {
        if (e.length !== 10) return !1;
        if (e[5] === "0" && e[6] === "2") {
            if (/^\d\d\d\d-02-(?:[012][1-8]|[12]0|[01]9)$/.test(e)) return !0;
            const t = e.match(/^(\d\d\d\d)-02-29$/);
            if (!t) return !1;
            const r = t[1] | 0;
            return r % 16 === 0 || (r % 4 === 0 && r % 25 !== 0);
        }
        return e.endsWith("31")
            ? /^\d\d\d\d-(?:0[13578]|1[02])-31$/.test(e)
            : /^\d\d\d\d-(?:0[13-9]|1[012])-(?:[012][1-9]|[123]0)$/.test(e);
    },
    time: (e) => {
        if (
            e.length > 27 ||
            !/^(?:2[0-3]|[0-1]\d):[0-5]\d:(?:[0-5]\d|60)(?:\.\d+)?(?:z|[+-](?:2[0-3]|[0-1]\d)(?::?[0-5]\d)?)?$/i.test(e)
        )
            return !1;
        if (!/:60/.test(e)) return !0;
        const r = e.match(/([0-9.]+|[^0-9.])/g);
        let n = Number(r[0]) * 60 + Number(r[2]);
        return (
            r[5] === "+"
                ? (n += 24 * 60 - Number(r[6] || 0) * 60 - Number(r[8] || 0))
                : r[5] === "-" && (n += Number(r[6] || 0) * 60 + Number(r[8] || 0)),
            n % (24 * 60) === 23 * 60 + 59
        );
    },
    "date-time": (e) => {
        if (e.length > 38) return !1;
        const t =
                /^\d\d\d\d-(?:0[1-9]|1[0-2])-(?:[0-2]\d|3[01])[t\s](?:2[0-3]|[0-1]\d):[0-5]\d:(?:[0-5]\d|60)(?:\.\d+)?(?:z|[+-](?:2[0-3]|[0-1]\d)(?::?[0-5]\d)?)$/i,
            r = e[5] === "0" && e[6] === "2";
        if ((r && e[8] === "3") || !t.test(e)) return !1;
        if (e[17] === "6") {
            const n = e.slice(11).match(/([0-9.]+|[^0-9.])/g);
            let s = Number(n[0]) * 60 + Number(n[2]);
            if (
                (n[5] === "+"
                    ? (s += 24 * 60 - Number(n[6] || 0) * 60 - Number(n[8] || 0))
                    : n[5] === "-" && (s += Number(n[6] || 0) * 60 + Number(n[8] || 0)),
                s % (24 * 60) !== 23 * 60 + 59)
            )
                return !1;
        }
        if (r) {
            if (/^\d\d\d\d-02-(?:[012][1-8]|[12]0|[01]9)/.test(e)) return !0;
            const n = e.match(/^(\d\d\d\d)-02-29/);
            if (!n) return !1;
            const s = n[1] | 0;
            return s % 16 === 0 || (s % 4 === 0 && s % 25 !== 0);
        }
        return e[8] === "3" && e[9] === "1"
            ? /^\d\d\d\d-(?:0[13578]|1[02])-31/.test(e)
            : /^\d\d\d\d-(?:0[13-9]|1[012])-(?:[012][1-9]|[123]0)/.test(e);
    },
    ipv4: (e) =>
        e.length <= 15 &&
        /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d\d?)$/.test(e),
    ipv6: (e) => {
        if (e.length > 45 || e.length < 2) return !1;
        let t = 0,
            r = 0,
            n = 0,
            s = !1,
            i = !1,
            a = 0,
            o = !0;
        for (let u = 0; u < e.length; u++) {
            const c = e.charCodeAt(u);
            if (u === 1 && a === 58 && c !== 58) return !1;
            if (c >= 48 && c <= 57) {
                if (++n > 4) return !1;
            } else if (c === 46) {
                if (t > 6 || r >= 3 || n === 0 || i) return !1;
                r++, (n = 0);
            } else if (c === 58) {
                if (r > 0 || t >= 7) return !1;
                if (a === 58) {
                    if (s) return !1;
                    s = !0;
                } else u === 0 && (o = !1);
                t++, (n = 0), (i = !1);
            } else if ((c >= 97 && c <= 102) || (c >= 65 && c <= 70)) {
                if (r > 0 || ++n > 4) return !1;
                i = !0;
            } else return !1;
            a = c;
        }
        if (t < 2 || (r > 0 && (r !== 3 || n === 0))) return !1;
        if (s && e.length === 2) return !0;
        if (r > 0 && !/(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/.test(e)) return !1;
        const l = r > 0 ? 6 : 7;
        return s ? (o || n > 0) && t < l : t === l && o && n > 0;
    },
    uri: /^[a-z][a-z0-9+\-.]*:(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|v[0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/?(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    "uri-reference":
        /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|v[0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/?(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?)?(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    "uri-template":
        /^(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2}|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    "json-pointer": /^(?:|\/(?:[^~]|~0|~1)*)$/,
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:|#|\/(?:[^~]|~0|~1)*)$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    duration: (e) =>
        e.length > 1 &&
        e.length < 80 &&
        (/^P\d+([.,]\d+)?W$/.test(e) ||
            (/^P[\dYMDTHS]*(\d[.,]\d+)?[YMDHS]$/.test(e) &&
                /^P([.,\d]+Y)?([.,\d]+M)?([.,\d]+D)?(T([.,\d]+H)?([.,\d]+M)?([.,\d]+S)?)?$/.test(e))),
};
xi.hostname, xi.ipv4;
const { toPointer: Am, ...Jh } = Wh,
    Hh = new Map(
        Object.entries({
            boolean: (e) => typeof e == "boolean",
            array: (e) => Array.isArray(e) && Object.getPrototypeOf(e) === Array.prototype,
            object: (e) => e && Object.getPrototypeOf(e) === Object.prototype,
            finite: (e) => Number.isFinite(e),
            natural: (e) => Number.isInteger(e) && e >= 0,
            string: (e) => typeof e == "string",
            jsonval: (e) => Jh.deepEqual(e, JSON.parse(JSON.stringify(e))),
        }),
    );
Hh.get("object");
const os = Symbol("FORM_FIELD_CTX");
function Gh(e) {
    return Ji(os, e), e;
}
function En() {
    return Hi(os) || ko("Form.Field"), Gi(os);
}
const ls = Symbol("FORM_CONTROL_CTX");
function Yh(e) {
    return Ji(ls, e), e;
}
function Sm() {
    return Hi(ls) || ko("<Control />"), Gi(ls);
}
function ko(e) {
    throw new Error(`Unable to find \`${e}\` context. Did you forget to wrap the component in a \`${e}\`?`);
}
function Xh({ fieldErrorsId: e = void 0, descriptionId: t = void 0, errors: r }) {
    let n = "";
    return t && (n += t + " "), r.length && e && (n += e), n ? n.trim() : void 0;
}
function Qh(e) {
    if ("required" in e) return e.required ? "true" : void 0;
}
function ep(e) {
    return e && e.length ? "true" : void 0;
}
function Jt(e) {
    return e && e.length ? "" : void 0;
}
let tp = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",
    rp = (e = 21) => {
        let t = "",
            r = e;
        for (; r--; ) t += tp[(Math.random() * 64) | 0];
        return t;
    };
function Cs() {
    return rp(5);
}
function np(e) {
    return Array.isArray(e) ? e : typeof e == "object" && "_errors" in e && e._errors !== void 0 ? e._errors : [];
}
const sp = (e) => ({ descriptionAttrs: e & 4 }),
    Ei = (e) => ({ descriptionAttrs: e[2] }),
    ip = (e) => ({ descriptionAttrs: e & 4 }),
    Ai = (e) => ({ descriptionAttrs: e[2] });
function ap(e) {
    let t, r;
    const n = e[9].default,
        s = be(n, e, e[8], Ei);
    let i = [e[2]],
        a = {};
    for (let o = 0; o < i.length; o += 1) a = Z(a, i[o]);
    return {
        c() {
            (t = Ht("div")), s && s.c(), this.h();
        },
        l(o) {
            t = Gt(o, "DIV", {});
            var l = Yt(t);
            s && s.l(l), l.forEach(ie), this.h();
        },
        h() {
            De(t, a);
        },
        m(o, l) {
            Ke(o, t, l), s && s.m(t, null), e[10](t), (r = !0);
        },
        p(o, l) {
            s && s.p && (!r || l & 260) && _e(s, n, o, o[8], r ? we(n, o[8], l, sp) : ke(o[8]), Ei),
                De(t, (a = st(i, [l & 4 && o[2]])));
        },
        i(o) {
            r || (q(s, o), (r = !0));
        },
        o(o) {
            B(s, o), (r = !1);
        },
        d(o) {
            o && ie(t), s && s.d(o), e[10](null);
        },
    };
}
function op(e) {
    let t;
    const r = e[9].default,
        n = be(r, e, e[8], Ai);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, i) {
            n && n.p && (!t || i & 260) && _e(n, r, s, s[8], t ? we(r, s[8], i, ip) : ke(s[8]), Ai);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function lp(e) {
    let t, r, n, s;
    const i = [op, ap],
        a = [];
    function o(l, u) {
        return l[1] ? 0 : 1;
    }
    return (
        (t = o(e)),
        (r = a[t] = i[t](e)),
        {
            c() {
                r.c(), (n = Le());
            },
            l(l) {
                r.l(l), (n = Le());
            },
            m(l, u) {
                a[t].m(l, u), Ke(l, n, u), (s = !0);
            },
            p(l, [u]) {
                let c = t;
                (t = o(l)),
                    t === c
                        ? a[t].p(l, u)
                        : (vn(),
                          B(a[c], 1, 1, () => {
                              a[c] = null;
                          }),
                          bn(),
                          (r = a[t]),
                          r ? r.p(l, u) : ((r = a[t] = i[t](l)), r.c()),
                          q(r, 1),
                          r.m(n.parentNode, n));
            },
            i(l) {
                s || (q(r), (s = !0));
            },
            o(l) {
                B(r), (s = !1);
            },
            d(l) {
                l && ie(n), a[t].d(l);
            },
        }
    );
}
function up(e, t, r) {
    let n;
    const s = ["id", "asChild", "el"];
    let i = pe(t, s),
        a,
        o,
        { $$slots: l = {}, $$scope: u } = t;
    const { descriptionId: c, errors: h } = En();
    Ie(e, c, (m) => r(7, (o = m))), Ie(e, h, (m) => r(6, (a = m)));
    let { id: x = Cs() } = t,
        { asChild: g = !1 } = t,
        { el: _ = void 0 } = t;
    function y(m) {
        yn[m ? "unshift" : "push"](() => {
            (_ = m), r(0, _);
        });
    }
    return (
        (e.$$set = (m) => {
            (t = Z(Z({}, t), kt(m))),
                r(11, (i = pe(t, s))),
                "id" in m && r(5, (x = m.id)),
                "asChild" in m && r(1, (g = m.asChild)),
                "el" in m && r(0, (_ = m.el)),
                "$$scope" in m && r(8, (u = m.$$scope));
        }),
        (e.$$.update = () => {
            e.$$.dirty & 32 && c.set(x), r(2, (n = { id: o, "data-fs-error": Jt(a), "data-fs-description": "", ...i }));
        }),
        [_, g, n, c, h, x, a, o, u, l, y]
    );
}
class cp extends He {
    constructor(t) {
        super(), Ge(this, t, up, lp, Je, { id: 5, asChild: 1, el: 0 });
    }
}
function Dn(e, t) {
    const r = e.split(/[[\].]/).filter(Boolean);
    let n = t;
    for (const s of r) {
        if (typeof n != "object" || n === null) return;
        n = n[s];
    }
    return n;
}
const dp = (e) => ({ value: e & 65, errors: e & 128, tainted: e & 256, constraints: e & 3 }),
    Si = (e) => ({ value: e[6][e[0]], errors: e[7], tainted: e[8], constraints: e[1][e[0]] });
function fp(e) {
    let t;
    const r = e[15].default,
        n = be(r, e, e[14], Si);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, [i]) {
            n && n.p && (!t || i & 16835) && _e(n, r, s, s[14], t ? we(r, s[14], i, dp) : ke(s[14]), Si);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function hp(e, t, r) {
    let n,
        s,
        i,
        a,
        o,
        l = Kr,
        u = () => (l(), (l = Fr(i, (D) => r(12, (o = D)))), i),
        c,
        h = Kr,
        x = () => (h(), (h = Fr(s, (D) => r(1, (c = D)))), s),
        g,
        _ = Kr,
        y = () => (_(), (_ = Fr(n, (D) => r(13, (g = D)))), n),
        m,
        w = Kr,
        A = () => (w(), (w = Fr(a, (D) => r(6, (m = D)))), a),
        ae,
        oe;
    e.$$.on_destroy.push(() => l()),
        e.$$.on_destroy.push(() => h()),
        e.$$.on_destroy.push(() => _()),
        e.$$.on_destroy.push(() => w());
    let { $$slots: Se = {}, $$scope: V } = t,
        { form: Y } = t,
        { name: X } = t;
    const Q = {
            name: G(X),
            errors: G([]),
            constraints: G({}),
            tainted: G(!1),
            fieldErrorsId: G(),
            descriptionId: G(),
            form: Y,
        },
        { tainted: lr, errors: It } = Q;
    return (
        Ie(e, lr, (D) => r(8, (oe = D))),
        Ie(e, It, (D) => r(7, (ae = D))),
        Gh(Q),
        (e.$$set = (D) => {
            "form" in D && r(11, (Y = D.form)),
                "name" in D && r(0, (X = D.name)),
                "$$scope" in D && r(14, (V = D.$$scope));
        }),
        (e.$$.update = () => {
            e.$$.dirty & 2048 &&
                y(
                    r(
                        5,
                        ({ errors: n, constraints: s, tainted: i, form: a } = Y),
                        n,
                        x(r(4, s)),
                        u(r(3, i)),
                        A(r(2, a)),
                    ),
                ),
                e.$$.dirty & 1 && Q.name.set(X),
                e.$$.dirty & 8193 && Q.errors.set(np(Dn(X, g))),
                e.$$.dirty & 3 && Q.constraints.set(Dn(X, c) ?? {}),
                e.$$.dirty & 4097 && Q.tainted.set(o ? Dn(X, o) === !0 : !1);
        }),
        [X, c, a, i, s, n, m, ae, oe, lr, It, Y, o, g, V, Se]
    );
}
class pp extends He {
    constructor(t) {
        super(), Ge(this, t, hp, fp, Je, { form: 11, name: 0 });
    }
}
const mp = (e) => ({ attrs: e & 1 }),
    Oi = (e) => ({ attrs: e[0] });
function gp(e) {
    let t;
    const r = e[17].default,
        n = be(r, e, e[16], Oi);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, [i]) {
            n && n.p && (!t || i & 65537) && _e(n, r, s, s[16], t ? we(r, s[16], i, mp) : ke(s[16]), Oi);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function yp(e, t, r) {
    let n,
        s,
        i,
        a,
        o,
        l,
        u,
        c,
        h,
        { $$slots: x = {}, $$scope: g } = t,
        { id: _ = Cs() } = t;
    const { name: y, fieldErrorsId: m, descriptionId: w, errors: A, constraints: ae } = En();
    Ie(e, y, (V) => r(15, (h = V))),
        Ie(e, m, (V) => r(14, (c = V))),
        Ie(e, w, (V) => r(13, (u = V))),
        Ie(e, A, (V) => r(12, (l = V))),
        Ie(e, ae, (V) => r(11, (o = V)));
    const oe = { id: G(_), attrs: G(), labelAttrs: G() },
        { id: Se } = oe;
    return (
        Ie(e, Se, (V) => r(10, (a = V))),
        Yh(oe),
        (e.$$set = (V) => {
            "id" in V && r(7, (_ = V.id)), "$$scope" in V && r(16, (g = V.$$scope));
        }),
        (e.$$.update = () => {
            e.$$.dirty & 128 && oe.id.set(_),
                e.$$.dirty & 4096 && r(9, (n = Jt(l))),
                e.$$.dirty & 65024 &&
                    r(
                        0,
                        (s = {
                            name: h,
                            id: a,
                            "data-fs-error": n,
                            "aria-describedby": Xh({ fieldErrorsId: c, descriptionId: u, errors: l }),
                            "aria-invalid": ep(l),
                            "aria-required": Qh(o),
                            "data-fs-control": "",
                        }),
                    ),
                e.$$.dirty & 1536 && r(8, (i = { for: a, "data-fs-label": "", "data-fs-error": n })),
                e.$$.dirty & 1 && oe.attrs.set(s),
                e.$$.dirty & 256 && oe.labelAttrs.set(i);
        }),
        [s, y, m, w, A, ae, Se, _, i, n, a, o, l, u, c, h, g, x]
    );
}
let vp = class extends He {
    constructor(t) {
        super(), Ge(this, t, yp, gp, Je, { id: 7 });
    }
};
function Ti(e, t, r) {
    const n = e.slice();
    return (n[14] = t[r]), n;
}
const bp = (e) => ({ errors: e & 4, fieldErrorsAttrs: e & 16, errorAttrs: e & 8 }),
    Ci = (e) => ({ errors: e[2], fieldErrorsAttrs: e[4], errorAttrs: e[3] }),
    _p = (e) => ({ errors: e & 4, fieldErrorsAttrs: e & 16, errorAttrs: e & 8 }),
    Ii = (e) => ({ errors: e[2], fieldErrorsAttrs: e[4], errorAttrs: e[3] });
function kp(e) {
    let t, r;
    const n = e[11].default,
        s = be(n, e, e[10], Ci),
        i = s || $p(e);
    let a = [e[4]],
        o = {};
    for (let l = 0; l < a.length; l += 1) o = Z(o, a[l]);
    return {
        c() {
            (t = Ht("div")), i && i.c(), this.h();
        },
        l(l) {
            t = Gt(l, "DIV", {});
            var u = Yt(t);
            i && i.l(u), u.forEach(ie), this.h();
        },
        h() {
            De(t, o);
        },
        m(l, u) {
            Ke(l, t, u), i && i.m(t, null), e[12](t), (r = !0);
        },
        p(l, u) {
            s
                ? s.p && (!r || u & 1052) && _e(s, n, l, l[10], r ? we(n, l[10], u, bp) : ke(l[10]), Ci)
                : i && i.p && (!r || u & 12) && i.p(l, r ? u : -1),
                De(t, (o = st(a, [u & 16 && l[4]])));
        },
        i(l) {
            r || (q(i, l), (r = !0));
        },
        o(l) {
            B(i, l), (r = !1);
        },
        d(l) {
            l && ie(t), i && i.d(l), e[12](null);
        },
    };
}
function wp(e) {
    let t;
    const r = e[11].default,
        n = be(r, e, e[10], Ii);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, i) {
            n && n.p && (!t || i & 1052) && _e(n, r, s, s[10], t ? we(r, s[10], i, _p) : ke(s[10]), Ii);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function Ni(e) {
    let t,
        r = e[14] + "",
        n,
        s = [e[3]],
        i = {};
    for (let a = 0; a < s.length; a += 1) i = Z(i, s[a]);
    return {
        c() {
            (t = Ht("div")), (n = Xi(r)), this.h();
        },
        l(a) {
            t = Gt(a, "DIV", {});
            var o = Yt(t);
            (n = Qi(o, r)), o.forEach(ie), this.h();
        },
        h() {
            De(t, i);
        },
        m(a, o) {
            Ke(a, t, o), ea(t, n);
        },
        p(a, o) {
            o & 4 && r !== (r = a[14] + "") && ta(n, r, i.contenteditable), De(t, (i = st(s, [o & 8 && a[3]])));
        },
        d(a) {
            a && ie(t);
        },
    };
}
function $p(e) {
    let t,
        r = Yr(e[2]),
        n = [];
    for (let s = 0; s < r.length; s += 1) n[s] = Ni(Ti(e, r, s));
    return {
        c() {
            for (let s = 0; s < n.length; s += 1) n[s].c();
            t = Le();
        },
        l(s) {
            for (let i = 0; i < n.length; i += 1) n[i].l(s);
            t = Le();
        },
        m(s, i) {
            for (let a = 0; a < n.length; a += 1) n[a] && n[a].m(s, i);
            Ke(s, t, i);
        },
        p(s, i) {
            if (i & 12) {
                r = Yr(s[2]);
                let a;
                for (a = 0; a < r.length; a += 1) {
                    const o = Ti(s, r, a);
                    n[a] ? n[a].p(o, i) : ((n[a] = Ni(o)), n[a].c(), n[a].m(t.parentNode, t));
                }
                for (; a < n.length; a += 1) n[a].d(1);
                n.length = r.length;
            }
        },
        d(s) {
            s && ie(t), Yi(n, s);
        },
    };
}
function xp(e) {
    let t, r, n, s;
    const i = [wp, kp],
        a = [];
    function o(l, u) {
        return l[1] ? 0 : 1;
    }
    return (
        (t = o(e)),
        (r = a[t] = i[t](e)),
        {
            c() {
                r.c(), (n = Le());
            },
            l(l) {
                r.l(l), (n = Le());
            },
            m(l, u) {
                a[t].m(l, u), Ke(l, n, u), (s = !0);
            },
            p(l, [u]) {
                let c = t;
                (t = o(l)),
                    t === c
                        ? a[t].p(l, u)
                        : (vn(),
                          B(a[c], 1, 1, () => {
                              a[c] = null;
                          }),
                          bn(),
                          (r = a[t]),
                          r ? r.p(l, u) : ((r = a[t] = i[t](l)), r.c()),
                          q(r, 1),
                          r.m(n.parentNode, n));
            },
            i(l) {
                s || (q(r), (s = !0));
            },
            o(l) {
                B(r), (s = !1);
            },
            d(l) {
                l && ie(n), a[t].d(l);
            },
        }
    );
}
function Ep(e, t, r) {
    let n, s, i;
    const a = ["id", "asChild", "el"];
    let o = pe(t, a),
        l,
        u,
        { $$slots: c = {}, $$scope: h } = t;
    const { fieldErrorsId: x, errors: g } = En();
    Ie(e, x, (A) => r(9, (l = A))), Ie(e, g, (A) => r(2, (u = A)));
    let { id: _ = Cs() } = t,
        { asChild: y = !1 } = t,
        { el: m = void 0 } = t;
    function w(A) {
        yn[A ? "unshift" : "push"](() => {
            (m = A), r(0, m);
        });
    }
    return (
        (e.$$set = (A) => {
            (t = Z(Z({}, t), kt(A))),
                r(13, (o = pe(t, a))),
                "id" in A && r(7, (_ = A.id)),
                "asChild" in A && r(1, (y = A.asChild)),
                "el" in A && r(0, (m = A.el)),
                "$$scope" in A && r(10, (h = A.$$scope));
        }),
        (e.$$.update = () => {
            e.$$.dirty & 4 && r(8, (n = Jt(u))),
                e.$$.dirty & 128 && x.set(_),
                r(4, (s = { id: l, "data-fs-error": n, "data-fs-field-errors": "", "aria-live": "assertive", ...o })),
                e.$$.dirty & 256 && r(3, (i = { "data-fs-field-error": "", "data-fs-error": n }));
        }),
        [m, y, u, i, s, x, g, _, n, l, h, c, w]
    );
}
class Ap extends He {
    constructor(t) {
        super(), Ge(this, t, Ep, xp, Je, { id: 7, asChild: 1, el: 0 });
    }
}
const Sp = (e) => ({
        fieldsetAttrs: e & 16,
        value: e & 512,
        errors: e & 1024,
        tainted: e & 2048,
        constraints: e & 4096,
    }),
    Ri = (e) => ({ fieldsetAttrs: e[4], value: e[9], errors: e[10], tainted: e[11], constraints: e[12] }),
    Op = (e) => ({ fieldsetAttrs: e & 16, value: e & 512, errors: e & 1024, tainted: e & 2048, constraints: e & 4096 }),
    Mi = (e) => ({ fieldsetAttrs: e[4], value: e[9], errors: e[10], tainted: e[11], constraints: e[12] });
function Tp(e) {
    let t, r, n;
    const s = e[5].default,
        i = be(s, e, e[7], Ri);
    let a = [e[4], { "data-fs-error": (r = Jt(e[10])) }],
        o = {};
    for (let l = 0; l < a.length; l += 1) o = Z(o, a[l]);
    return {
        c() {
            (t = Ht("fieldset")), i && i.c(), this.h();
        },
        l(l) {
            t = Gt(l, "FIELDSET", { "data-fs-error": !0 });
            var u = Yt(t);
            i && i.l(u), u.forEach(ie), this.h();
        },
        h() {
            De(t, o);
        },
        m(l, u) {
            Ke(l, t, u), i && i.m(t, null), e[6](t), (n = !0);
        },
        p(l, u) {
            i && i.p && (!n || u & 7824) && _e(i, s, l, l[7], n ? we(s, l[7], u, Sp) : ke(l[7]), Ri),
                De(
                    t,
                    (o = st(a, [
                        u & 16 && l[4],
                        (!n || (u & 1024 && r !== (r = Jt(l[10])))) && { "data-fs-error": r },
                    ])),
                );
        },
        i(l) {
            n || (q(i, l), (n = !0));
        },
        o(l) {
            B(i, l), (n = !1);
        },
        d(l) {
            l && ie(t), i && i.d(l), e[6](null);
        },
    };
}
function Cp(e) {
    let t;
    const r = e[5].default,
        n = be(r, e, e[7], Mi);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, i) {
            n && n.p && (!t || i & 7824) && _e(n, r, s, s[7], t ? we(r, s[7], i, Op) : ke(s[7]), Mi);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function Ip(e) {
    let t, r, n, s;
    const i = [Cp, Tp],
        a = [];
    function o(l, u) {
        return l[3] ? 0 : 1;
    }
    return (
        (t = o(e)),
        (r = a[t] = i[t](e)),
        {
            c() {
                r.c(), (n = Le());
            },
            l(l) {
                r.l(l), (n = Le());
            },
            m(l, u) {
                a[t].m(l, u), Ke(l, n, u), (s = !0);
            },
            p(l, u) {
                let c = t;
                (t = o(l)),
                    t === c
                        ? a[t].p(l, u)
                        : (vn(),
                          B(a[c], 1, 1, () => {
                              a[c] = null;
                          }),
                          bn(),
                          (r = a[t]),
                          r ? r.p(l, u) : ((r = a[t] = i[t](l)), r.c()),
                          q(r, 1),
                          r.m(n.parentNode, n));
            },
            i(l) {
                s || (q(r), (s = !0));
            },
            o(l) {
                B(r), (s = !1);
            },
            d(l) {
                l && ie(n), a[t].d(l);
            },
        }
    );
}
function Np(e) {
    let t, r;
    return (
        (t = new pp({
            props: {
                form: e[1],
                name: e[2],
                $$slots: {
                    default: [
                        Ip,
                        ({ value: n, errors: s, tainted: i, constraints: a }) => ({ 9: n, 10: s, 11: i, 12: a }),
                        ({ value: n, errors: s, tainted: i, constraints: a }) =>
                            (n ? 512 : 0) | (s ? 1024 : 0) | (i ? 2048 : 0) | (a ? 4096 : 0),
                    ],
                },
                $$scope: { ctx: e },
            },
        })),
        {
            c() {
                Xt(t.$$.fragment);
            },
            l(n) {
                Qt(t.$$.fragment, n);
            },
            m(n, s) {
                er(t, n, s), (r = !0);
            },
            p(n, [s]) {
                const i = {};
                s & 2 && (i.form = n[1]),
                    s & 4 && (i.name = n[2]),
                    s & 7833 && (i.$$scope = { dirty: s, ctx: n }),
                    t.$set(i);
            },
            i(n) {
                r || (q(t.$$.fragment, n), (r = !0));
            },
            o(n) {
                B(t.$$.fragment, n), (r = !1);
            },
            d(n) {
                tr(t, n);
            },
        }
    );
}
function Rp(e, t, r) {
    let n;
    const s = ["form", "name", "asChild", "el"];
    let i = pe(t, s),
        { $$slots: a = {}, $$scope: o } = t,
        { form: l } = t,
        { name: u } = t,
        { asChild: c = !1 } = t,
        { el: h = void 0 } = t;
    function x(g) {
        yn[g ? "unshift" : "push"](() => {
            (h = g), r(0, h);
        });
    }
    return (
        (e.$$set = (g) => {
            (t = Z(Z({}, t), kt(g))),
                r(8, (i = pe(t, s))),
                "form" in g && r(1, (l = g.form)),
                "name" in g && r(2, (u = g.name)),
                "asChild" in g && r(3, (c = g.asChild)),
                "el" in g && r(0, (h = g.el)),
                "$$scope" in g && r(7, (o = g.$$scope));
        }),
        (e.$$.update = () => {
            r(4, (n = { "data-fs-fieldset": "", ...i }));
        }),
        [h, l, u, c, n, a, x, o]
    );
}
class Mp extends He {
    constructor(t) {
        super(), Ge(this, t, Rp, Np, Je, { form: 1, name: 2, asChild: 3, el: 0 });
    }
}
const jp = (e) => ({ legendAttrs: e & 4 }),
    ji = (e) => ({ legendAttrs: e[2] }),
    Pp = (e) => ({ legendAttrs: e & 4 }),
    Pi = (e) => ({ legendAttrs: e[2] });
function zp(e) {
    let t, r;
    const n = e[6].default,
        s = be(n, e, e[5], ji);
    let i = [e[2]],
        a = {};
    for (let o = 0; o < i.length; o += 1) a = Z(a, i[o]);
    return {
        c() {
            (t = Ht("legend")), s && s.c(), this.h();
        },
        l(o) {
            t = Gt(o, "LEGEND", {});
            var l = Yt(t);
            s && s.l(l), l.forEach(ie), this.h();
        },
        h() {
            De(t, a);
        },
        m(o, l) {
            Ke(o, t, l), s && s.m(t, null), e[7](t), (r = !0);
        },
        p(o, l) {
            s && s.p && (!r || l & 36) && _e(s, n, o, o[5], r ? we(n, o[5], l, jp) : ke(o[5]), ji),
                De(t, (a = st(i, [l & 4 && o[2]])));
        },
        i(o) {
            r || (q(s, o), (r = !0));
        },
        o(o) {
            B(s, o), (r = !1);
        },
        d(o) {
            o && ie(t), s && s.d(o), e[7](null);
        },
    };
}
function Lp(e) {
    let t;
    const r = e[6].default,
        n = be(r, e, e[5], Pi);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, i) {
            n && n.p && (!t || i & 36) && _e(n, r, s, s[5], t ? we(r, s[5], i, Pp) : ke(s[5]), Pi);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function Dp(e) {
    let t, r, n, s;
    const i = [Lp, zp],
        a = [];
    function o(l, u) {
        return l[1] ? 0 : 1;
    }
    return (
        (t = o(e)),
        (r = a[t] = i[t](e)),
        {
            c() {
                r.c(), (n = Le());
            },
            l(l) {
                r.l(l), (n = Le());
            },
            m(l, u) {
                a[t].m(l, u), Ke(l, n, u), (s = !0);
            },
            p(l, [u]) {
                let c = t;
                (t = o(l)),
                    t === c
                        ? a[t].p(l, u)
                        : (vn(),
                          B(a[c], 1, 1, () => {
                              a[c] = null;
                          }),
                          bn(),
                          (r = a[t]),
                          r ? r.p(l, u) : ((r = a[t] = i[t](l)), r.c()),
                          q(r, 1),
                          r.m(n.parentNode, n));
            },
            i(l) {
                s || (q(r), (s = !0));
            },
            o(l) {
                B(r), (s = !1);
            },
            d(l) {
                l && ie(n), a[t].d(l);
            },
        }
    );
}
function Bp(e, t, r) {
    let n;
    const s = ["asChild", "el"];
    let i = pe(t, s),
        a,
        { $$slots: o = {}, $$scope: l } = t,
        { asChild: u = !1 } = t,
        { el: c = void 0 } = t;
    const { errors: h } = En();
    Ie(e, h, (g) => r(4, (a = g)));
    function x(g) {
        yn[g ? "unshift" : "push"](() => {
            (c = g), r(0, c);
        });
    }
    return (
        (e.$$set = (g) => {
            (t = Z(Z({}, t), kt(g))),
                r(8, (i = pe(t, s))),
                "asChild" in g && r(1, (u = g.asChild)),
                "el" in g && r(0, (c = g.el)),
                "$$scope" in g && r(5, (l = g.$$scope));
        }),
        (e.$$.update = () => {
            r(2, (n = { "data-fs-legend": "", "data-fs-error": Jt(a), ...i }));
        }),
        [c, u, n, h, a, l, o, x]
    );
}
class qp extends He {
    constructor(t) {
        super(), Ge(this, t, Bp, Dp, Je, { asChild: 1, el: 0 });
    }
}
const Kp = (e) => ({ descriptionAttrs: e & 16 }),
    zi = (e) => ({ descriptionAttrs: e[4] });
function Fp(e) {
    let t;
    const r = e[2].default,
        n = be(r, e, e[3], zi);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, i) {
            n && n.p && (!t || i & 24) && _e(n, r, s, s[3], t ? we(r, s[3], i, Kp) : ke(s[3]), zi);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function Zp(e) {
    let t, r;
    const n = [{ class: Be("text-[0.8rem] text-muted-foreground", e[0]) }, e[1]];
    let s = {
        $$slots: { default: [Fp, ({ descriptionAttrs: i }) => ({ 4: i }), ({ descriptionAttrs: i }) => (i ? 16 : 0)] },
        $$scope: { ctx: e },
    };
    for (let i = 0; i < n.length; i += 1) s = Z(s, n[i]);
    return (
        (t = new cp({ props: s })),
        {
            c() {
                Xt(t.$$.fragment);
            },
            l(i) {
                Qt(t.$$.fragment, i);
            },
            m(i, a) {
                er(t, i, a), (r = !0);
            },
            p(i, [a]) {
                const o =
                    a & 3
                        ? st(n, [
                              a & 1 && { class: Be("text-[0.8rem] text-muted-foreground", i[0]) },
                              a & 2 && _n(i[1]),
                          ])
                        : {};
                a & 24 && (o.$$scope = { dirty: a, ctx: i }), t.$set(o);
            },
            i(i) {
                r || (q(t.$$.fragment, i), (r = !0));
            },
            o(i) {
                B(t.$$.fragment, i), (r = !1);
            },
            d(i) {
                tr(t, i);
            },
        }
    );
}
function Vp(e, t, r) {
    const n = ["class"];
    let s = pe(t, n),
        { $$slots: i = {}, $$scope: a } = t,
        { class: o = void 0 } = t;
    return (
        (e.$$set = (l) => {
            (t = Z(Z({}, t), kt(l))),
                r(1, (s = pe(t, n))),
                "class" in l && r(0, (o = l.class)),
                "$$scope" in l && r(3, (a = l.$$scope));
        }),
        [o, s, i, a]
    );
}
class Tm extends He {
    constructor(t) {
        super(), Ge(this, t, Vp, Zp, Je, { class: 0 });
    }
}
function Up(e) {
    let t;
    const r = e[2].default,
        n = be(r, e, e[3], null);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, i) {
            n && n.p && (!t || i & 8) && _e(n, r, s, s[3], t ? we(r, s[3], i, null) : ke(s[3]), null);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function Wp(e) {
    let t, r;
    const n = [
        {
            class: Be(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                e[0],
            ),
        },
        e[1],
    ];
    let s = { $$slots: { default: [Up] }, $$scope: { ctx: e } };
    for (let i = 0; i < n.length; i += 1) s = Z(s, n[i]);
    return (
        (t = new Uo({ props: s })),
        {
            c() {
                Xt(t.$$.fragment);
            },
            l(i) {
                Qt(t.$$.fragment, i);
            },
            m(i, a) {
                er(t, i, a), (r = !0);
            },
            p(i, [a]) {
                const o =
                    a & 3
                        ? st(n, [
                              a & 1 && {
                                  class: Be(
                                      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                      i[0],
                                  ),
                              },
                              a & 2 && _n(i[1]),
                          ])
                        : {};
                a & 8 && (o.$$scope = { dirty: a, ctx: i }), t.$set(o);
            },
            i(i) {
                r || (q(t.$$.fragment, i), (r = !0));
            },
            o(i) {
                B(t.$$.fragment, i), (r = !1);
            },
            d(i) {
                tr(t, i);
            },
        }
    );
}
function Jp(e, t, r) {
    const n = ["class"];
    let s = pe(t, n),
        { $$slots: i = {}, $$scope: a } = t,
        { class: o = void 0 } = t;
    return (
        (e.$$set = (l) => {
            (t = Z(Z({}, t), kt(l))),
                r(1, (s = pe(t, n))),
                "class" in l && r(0, (o = l.class)),
                "$$scope" in l && r(3, (a = l.$$scope));
        }),
        [o, s, i, a]
    );
}
class Cm extends He {
    constructor(t) {
        super(), Ge(this, t, Jp, Wp, Je, { class: 0 });
    }
}
function Li(e, t, r) {
    const n = e.slice();
    return (n[8] = t[r]), n;
}
const Hp = (e) => ({ errors: e & 32, fieldErrorsAttrs: e & 64, errorAttrs: e & 128 }),
    Di = (e) => ({ errors: e[5], fieldErrorsAttrs: e[6], errorAttrs: e[7] });
function Bi(e) {
    let t,
        r = e[8] + "",
        n,
        s,
        i = [e[7], { class: (s = Be(e[1])) }],
        a = {};
    for (let o = 0; o < i.length; o += 1) a = Z(a, i[o]);
    return {
        c() {
            (t = Ht("div")), (n = Xi(r)), this.h();
        },
        l(o) {
            t = Gt(o, "DIV", { class: !0 });
            var l = Yt(t);
            (n = Qi(l, r)), l.forEach(ie), this.h();
        },
        h() {
            De(t, a);
        },
        m(o, l) {
            Ke(o, t, l), ea(t, n);
        },
        p(o, l) {
            l & 32 && r !== (r = o[8] + "") && ta(n, r, a.contenteditable),
                De(t, (a = st(i, [l & 128 && o[7], l & 2 && s !== (s = Be(o[1])) && { class: s }])));
        },
        d(o) {
            o && ie(t);
        },
    };
}
function Gp(e) {
    let t,
        r = Yr(e[5]),
        n = [];
    for (let s = 0; s < r.length; s += 1) n[s] = Bi(Li(e, r, s));
    return {
        c() {
            for (let s = 0; s < n.length; s += 1) n[s].c();
            t = Le();
        },
        l(s) {
            for (let i = 0; i < n.length; i += 1) n[i].l(s);
            t = Le();
        },
        m(s, i) {
            for (let a = 0; a < n.length; a += 1) n[a] && n[a].m(s, i);
            Ke(s, t, i);
        },
        p(s, i) {
            if (i & 162) {
                r = Yr(s[5]);
                let a;
                for (a = 0; a < r.length; a += 1) {
                    const o = Li(s, r, a);
                    n[a] ? n[a].p(o, i) : ((n[a] = Bi(o)), n[a].c(), n[a].m(t.parentNode, t));
                }
                for (; a < n.length; a += 1) n[a].d(1);
                n.length = r.length;
            }
        },
        d(s) {
            s && ie(t), Yi(n, s);
        },
    };
}
function Yp(e) {
    let t;
    const r = e[3].default,
        n = be(r, e, e[4], Di),
        s = n || Gp(e);
    return {
        c() {
            s && s.c();
        },
        l(i) {
            s && s.l(i);
        },
        m(i, a) {
            s && s.m(i, a), (t = !0);
        },
        p(i, a) {
            n
                ? n.p && (!t || a & 240) && _e(n, r, i, i[4], t ? we(r, i[4], a, Hp) : ke(i[4]), Di)
                : s && s.p && (!t || a & 162) && s.p(i, t ? a : -1);
        },
        i(i) {
            t || (q(s, i), (t = !0));
        },
        o(i) {
            B(s, i), (t = !1);
        },
        d(i) {
            s && s.d(i);
        },
    };
}
function Xp(e) {
    let t, r;
    const n = [{ class: Be("text-[0.8rem] font-medium text-destructive", e[0]) }, e[2]];
    let s = {
        $$slots: {
            default: [
                Yp,
                ({ errors: i, fieldErrorsAttrs: a, errorAttrs: o }) => ({ 5: i, 6: a, 7: o }),
                ({ errors: i, fieldErrorsAttrs: a, errorAttrs: o }) => (i ? 32 : 0) | (a ? 64 : 0) | (o ? 128 : 0),
            ],
        },
        $$scope: { ctx: e },
    };
    for (let i = 0; i < n.length; i += 1) s = Z(s, n[i]);
    return (
        (t = new Ap({ props: s })),
        {
            c() {
                Xt(t.$$.fragment);
            },
            l(i) {
                Qt(t.$$.fragment, i);
            },
            m(i, a) {
                er(t, i, a), (r = !0);
            },
            p(i, [a]) {
                const o =
                    a & 5
                        ? st(n, [
                              a & 1 && { class: Be("text-[0.8rem] font-medium text-destructive", i[0]) },
                              a & 4 && _n(i[2]),
                          ])
                        : {};
                a & 242 && (o.$$scope = { dirty: a, ctx: i }), t.$set(o);
            },
            i(i) {
                r || (q(t.$$.fragment, i), (r = !0));
            },
            o(i) {
                B(t.$$.fragment, i), (r = !1);
            },
            d(i) {
                tr(t, i);
            },
        }
    );
}
function Qp(e, t, r) {
    const n = ["class", "errorClasses"];
    let s = pe(t, n),
        { $$slots: i = {}, $$scope: a } = t,
        { class: o = void 0 } = t,
        { errorClasses: l = void 0 } = t;
    return (
        (e.$$set = (u) => {
            (t = Z(Z({}, t), kt(u))),
                r(2, (s = pe(t, n))),
                "class" in u && r(0, (o = u.class)),
                "errorClasses" in u && r(1, (l = u.errorClasses)),
                "$$scope" in u && r(4, (a = u.$$scope));
        }),
        [o, l, s, i, a]
    );
}
class Im extends He {
    constructor(t) {
        super(), Ge(this, t, Qp, Xp, Je, { class: 0, errorClasses: 1 });
    }
}
const em = (e) => ({ constraints: e & 32, errors: e & 64, tainted: e & 128, value: e & 256 }),
    qi = (e) => ({ constraints: e[5], errors: e[6], tainted: e[7], value: e[8] });
function tm(e) {
    let t;
    const r = e[3].default,
        n = be(r, e, e[4], qi);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, i) {
            n && n.p && (!t || i & 496) && _e(n, r, s, s[4], t ? we(r, s[4], i, em) : ke(s[4]), qi);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function rm(e) {
    let t, r;
    return (
        (t = new Mp({
            props: {
                form: e[0],
                name: e[1],
                class: Be("space-y-2", e[2]),
                $$slots: {
                    default: [
                        tm,
                        ({ constraints: n, errors: s, tainted: i, value: a }) => ({ 5: n, 6: s, 7: i, 8: a }),
                        ({ constraints: n, errors: s, tainted: i, value: a }) =>
                            (n ? 32 : 0) | (s ? 64 : 0) | (i ? 128 : 0) | (a ? 256 : 0),
                    ],
                },
                $$scope: { ctx: e },
            },
        })),
        {
            c() {
                Xt(t.$$.fragment);
            },
            l(n) {
                Qt(t.$$.fragment, n);
            },
            m(n, s) {
                er(t, n, s), (r = !0);
            },
            p(n, [s]) {
                const i = {};
                s & 1 && (i.form = n[0]),
                    s & 2 && (i.name = n[1]),
                    s & 4 && (i.class = Be("space-y-2", n[2])),
                    s & 496 && (i.$$scope = { dirty: s, ctx: n }),
                    t.$set(i);
            },
            i(n) {
                r || (q(t.$$.fragment, n), (r = !0));
            },
            o(n) {
                B(t.$$.fragment, n), (r = !1);
            },
            d(n) {
                tr(t, n);
            },
        }
    );
}
function nm(e, t, r) {
    let { $$slots: n = {}, $$scope: s } = t,
        { form: i } = t,
        { name: a } = t,
        { class: o = void 0 } = t;
    return (
        (e.$$set = (l) => {
            "form" in l && r(0, (i = l.form)),
                "name" in l && r(1, (a = l.name)),
                "class" in l && r(2, (o = l.class)),
                "$$scope" in l && r(4, (s = l.$$scope));
        }),
        [i, a, o, n, s]
    );
}
class Nm extends He {
    constructor(t) {
        super(), Ge(this, t, nm, rm, Je, { form: 0, name: 1, class: 2 });
    }
}
const sm = (e) => ({ legendAttrs: e & 16 }),
    Ki = (e) => ({ legendAttrs: e[4] });
function im(e) {
    let t;
    const r = e[2].default,
        n = be(r, e, e[3], Ki);
    return {
        c() {
            n && n.c();
        },
        l(s) {
            n && n.l(s);
        },
        m(s, i) {
            n && n.m(s, i), (t = !0);
        },
        p(s, i) {
            n && n.p && (!t || i & 24) && _e(n, r, s, s[3], t ? we(r, s[3], i, sm) : ke(s[3]), Ki);
        },
        i(s) {
            t || (q(n, s), (t = !0));
        },
        o(s) {
            B(n, s), (t = !1);
        },
        d(s) {
            n && n.d(s);
        },
    };
}
function am(e) {
    let t, r;
    const n = [e[1], { class: Be("text-sm font-medium leading-none data-[fs-error]:text-destructive", e[0]) }];
    let s = {
        $$slots: { default: [im, ({ legendAttrs: i }) => ({ 4: i }), ({ legendAttrs: i }) => (i ? 16 : 0)] },
        $$scope: { ctx: e },
    };
    for (let i = 0; i < n.length; i += 1) s = Z(s, n[i]);
    return (
        (t = new qp({ props: s })),
        {
            c() {
                Xt(t.$$.fragment);
            },
            l(i) {
                Qt(t.$$.fragment, i);
            },
            m(i, a) {
                er(t, i, a), (r = !0);
            },
            p(i, [a]) {
                const o =
                    a & 3
                        ? st(n, [
                              a & 2 && _n(i[1]),
                              a & 1 && {
                                  class: Be("text-sm font-medium leading-none data-[fs-error]:text-destructive", i[0]),
                              },
                          ])
                        : {};
                a & 24 && (o.$$scope = { dirty: a, ctx: i }), t.$set(o);
            },
            i(i) {
                r || (q(t.$$.fragment, i), (r = !0));
            },
            o(i) {
                B(t.$$.fragment, i), (r = !1);
            },
            d(i) {
                tr(t, i);
            },
        }
    );
}
function om(e, t, r) {
    const n = ["class"];
    let s = pe(t, n),
        { $$slots: i = {}, $$scope: a } = t,
        { class: o = void 0 } = t;
    return (
        (e.$$set = (l) => {
            (t = Z(Z({}, t), kt(l))),
                r(1, (s = pe(t, n))),
                "class" in l && r(0, (o = l.class)),
                "$$scope" in l && r(3, (a = l.$$scope));
        }),
        [o, s, i, a]
    );
}
class Rm extends He {
    constructor(t) {
        super(), Ge(this, t, om, am, Je, { class: 0 });
    }
}
const Mm = vp;
export {
    Mm as C,
    pp as F,
    Cm as L,
    Dn as a,
    Sm as b,
    Nm as c,
    $m as d,
    np as e,
    xm as f,
    En as g,
    Tm as h,
    Im as i,
    Rm as j,
    Gh as s,
    wm as z,
};
