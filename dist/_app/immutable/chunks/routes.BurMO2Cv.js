import { d as Ge, w as pt, r as q } from "./entry.VNHXcdGV.js";
import {
    af as bt,
    o as mt,
    V as Fe,
    s as ke,
    I as $,
    i as le,
    f as X,
    B as Ce,
    w as de,
    C as gt,
    G as C,
    q as Se,
    v as Ne,
    e as Le,
    c as Ve,
    b as We,
    O as fe,
    u as S,
    y as De,
    z as Be,
    A as Ue,
    H as Ke,
    Q as ht,
    E as yt,
} from "./scheduler.CCxz69I-.js";
import { S as vt, i as wt, g as _t, b as ee, f as At, t as te } from "./index.BXRlT4_D.js";
import { g as He } from "./spread.CgU5AtxT.js";
function zr(e) {
    return e < 0.5 ? 4 * e * e * e : 0.5 * Math.pow(2 * e - 2, 3) + 1;
}
function kt(e) {
    const t = e - 1;
    return t * t * t + 1;
}
function qe(e) {
    var t,
        r,
        n = "";
    if (typeof e == "string" || typeof e == "number") n += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) {
            var s = e.length;
            for (t = 0; t < s; t++) e[t] && (r = qe(e[t])) && (n && (n += " "), (n += r));
        } else for (r in e) e[r] && (n && (n += " "), (n += r));
    return n;
}
function xt() {
    for (var e, t, r = 0, n = "", s = arguments.length; r < s; r++)
        (e = arguments[r]) && (t = qe(e)) && (n && (n += " "), (n += t));
    return n;
}
const xe = "-";
function Et(e) {
    const t = St(e),
        { conflictingClassGroups: r, conflictingClassGroupModifiers: n } = e;
    function s(i) {
        const a = i.split(xe);
        return a[0] === "" && a.length !== 1 && a.shift(), Je(a, t) || Ct(i);
    }
    function o(i, a) {
        const l = r[i] || [];
        return a && n[i] ? [...l, ...n[i]] : l;
    }
    return { getClassGroupId: s, getConflictingClassGroupIds: o };
}
function Je(e, t) {
    var i;
    if (e.length === 0) return t.classGroupId;
    const r = e[0],
        n = t.nextPart.get(r),
        s = n ? Je(e.slice(1), n) : void 0;
    if (s) return s;
    if (t.validators.length === 0) return;
    const o = e.join(xe);
    return (i = t.validators.find(({ validator: a }) => a(o))) == null ? void 0 : i.classGroupId;
}
const Re = /^\[(.+)\]$/;
function Ct(e) {
    if (Re.test(e)) {
        const t = Re.exec(e)[1],
            r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
        if (r) return "arbitrary.." + r;
    }
}
function St(e) {
    const { theme: t, prefix: r } = e,
        n = { nextPart: new Map(), validators: [] };
    return (
        Mt(Object.entries(e.classGroups), r).forEach(([o, i]) => {
            ve(i, n, o, t);
        }),
        n
    );
}
function ve(e, t, r, n) {
    e.forEach((s) => {
        if (typeof s == "string") {
            const o = s === "" ? t : Me(t, s);
            o.classGroupId = r;
            return;
        }
        if (typeof s == "function") {
            if (Rt(s)) {
                ve(s(n), t, r, n);
                return;
            }
            t.validators.push({ validator: s, classGroupId: r });
            return;
        }
        Object.entries(s).forEach(([o, i]) => {
            ve(i, Me(t, o), r, n);
        });
    });
}
function Me(e, t) {
    let r = e;
    return (
        t.split(xe).forEach((n) => {
            r.nextPart.has(n) || r.nextPart.set(n, { nextPart: new Map(), validators: [] }), (r = r.nextPart.get(n));
        }),
        r
    );
}
function Rt(e) {
    return e.isThemeGetter;
}
function Mt(e, t) {
    return t
        ? e.map(([r, n]) => {
              const s = n.map((o) =>
                  typeof o == "string"
                      ? t + o
                      : typeof o == "object"
                        ? Object.fromEntries(Object.entries(o).map(([i, a]) => [t + i, a]))
                        : o,
              );
              return [r, s];
          })
        : e;
}
function zt(e) {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
        r = new Map(),
        n = new Map();
    function s(o, i) {
        r.set(o, i), t++, t > e && ((t = 0), (n = r), (r = new Map()));
    }
    return {
        get(o) {
            let i = r.get(o);
            if (i !== void 0) return i;
            if ((i = n.get(o)) !== void 0) return s(o, i), i;
        },
        set(o, i) {
            r.has(o) ? r.set(o, i) : s(o, i);
        },
    };
}
const Xe = "!";
function Ot(e) {
    const t = e.separator,
        r = t.length === 1,
        n = t[0],
        s = t.length;
    return function (i) {
        const a = [];
        let l = 0,
            f = 0,
            c;
        for (let A = 0; A < i.length; A++) {
            let k = i[A];
            if (l === 0) {
                if (k === n && (r || i.slice(A, A + s) === t)) {
                    a.push(i.slice(f, A)), (f = A + s);
                    continue;
                }
                if (k === "/") {
                    c = A;
                    continue;
                }
            }
            k === "[" ? l++ : k === "]" && l--;
        }
        const d = a.length === 0 ? i : i.substring(f),
            y = d.startsWith(Xe),
            M = y ? d.substring(1) : d,
            z = c && c > f ? c - f : void 0;
        return { modifiers: a, hasImportantModifier: y, baseClassName: M, maybePostfixModifierPosition: z };
    };
}
function Tt(e) {
    if (e.length <= 1) return e;
    const t = [];
    let r = [];
    return (
        e.forEach((n) => {
            n[0] === "[" ? (t.push(...r.sort(), n), (r = [])) : r.push(n);
        }),
        t.push(...r.sort()),
        t
    );
}
function Pt(e) {
    return { cache: zt(e.cacheSize), splitModifiers: Ot(e), ...Et(e) };
}
const jt = /\s+/;
function It(e, t) {
    const { splitModifiers: r, getClassGroupId: n, getConflictingClassGroupIds: s } = t,
        o = new Set();
    return e
        .trim()
        .split(jt)
        .map((i) => {
            const { modifiers: a, hasImportantModifier: l, baseClassName: f, maybePostfixModifierPosition: c } = r(i);
            let d = n(c ? f.substring(0, c) : f),
                y = !!c;
            if (!d) {
                if (!c) return { isTailwindClass: !1, originalClassName: i };
                if (((d = n(f)), !d)) return { isTailwindClass: !1, originalClassName: i };
                y = !1;
            }
            const M = Tt(a).join(":");
            return {
                isTailwindClass: !0,
                modifierId: l ? M + Xe : M,
                classGroupId: d,
                originalClassName: i,
                hasPostfixModifier: y,
            };
        })
        .reverse()
        .filter((i) => {
            if (!i.isTailwindClass) return !0;
            const { modifierId: a, classGroupId: l, hasPostfixModifier: f } = i,
                c = a + l;
            return o.has(c) ? !1 : (o.add(c), s(l, f).forEach((d) => o.add(a + d)), !0);
        })
        .reverse()
        .map((i) => i.originalClassName)
        .join(" ");
}
function Gt() {
    let e = 0,
        t,
        r,
        n = "";
    for (; e < arguments.length; ) (t = arguments[e++]) && (r = Ze(t)) && (n && (n += " "), (n += r));
    return n;
}
function Ze(e) {
    if (typeof e == "string") return e;
    let t,
        r = "";
    for (let n = 0; n < e.length; n++) e[n] && (t = Ze(e[n])) && (r && (r += " "), (r += t));
    return r;
}
function we(e, ...t) {
    let r,
        n,
        s,
        o = i;
    function i(l) {
        const f = t.reduce((c, d) => d(c), e());
        return (r = Pt(f)), (n = r.cache.get), (s = r.cache.set), (o = a), a(l);
    }
    function a(l) {
        const f = n(l);
        if (f) return f;
        const c = It(l, r);
        return s(l, c), c;
    }
    return function () {
        return o(Gt.apply(null, arguments));
    };
}
function E(e) {
    const t = (r) => r[e] || [];
    return (t.isThemeGetter = !0), t;
}
const Qe = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    Ft = /^\d+\/\d+$/,
    Nt = new Set(["px", "full", "screen"]),
    Lt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    Vt =
        /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    Wt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    Dt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    Bt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function I(e) {
    return H(e) || Nt.has(e) || Ft.test(e);
}
function L(e) {
    return re(e, "length", Qt);
}
function H(e) {
    return !!e && !Number.isNaN(Number(e));
}
function ae(e) {
    return re(e, "number", H);
}
function ne(e) {
    return !!e && Number.isInteger(Number(e));
}
function Ut(e) {
    return e.endsWith("%") && H(e.slice(0, -1));
}
function b(e) {
    return Qe.test(e);
}
function V(e) {
    return Lt.test(e);
}
const Kt = new Set(["length", "size", "percentage"]);
function Ht(e) {
    return re(e, Kt, Ye);
}
function qt(e) {
    return re(e, "position", Ye);
}
const Jt = new Set(["image", "url"]);
function Xt(e) {
    return re(e, Jt, $t);
}
function Zt(e) {
    return re(e, "", Yt);
}
function oe() {
    return !0;
}
function re(e, t, r) {
    const n = Qe.exec(e);
    return n ? (n[1] ? (typeof t == "string" ? n[1] === t : t.has(n[1])) : r(n[2])) : !1;
}
function Qt(e) {
    return Vt.test(e) && !Wt.test(e);
}
function Ye() {
    return !1;
}
function Yt(e) {
    return Dt.test(e);
}
function $t(e) {
    return Bt.test(e);
}
function _e() {
    const e = E("colors"),
        t = E("spacing"),
        r = E("blur"),
        n = E("brightness"),
        s = E("borderColor"),
        o = E("borderRadius"),
        i = E("borderSpacing"),
        a = E("borderWidth"),
        l = E("contrast"),
        f = E("grayscale"),
        c = E("hueRotate"),
        d = E("invert"),
        y = E("gap"),
        M = E("gradientColorStops"),
        z = E("gradientColorStopPositions"),
        A = E("inset"),
        k = E("margin"),
        P = E("opacity"),
        _ = E("padding"),
        Z = E("saturate"),
        F = E("scale"),
        Q = E("sepia"),
        Y = E("skew"),
        D = E("space"),
        B = E("translate"),
        N = () => ["auto", "contain", "none"],
        U = () => ["auto", "hidden", "clip", "visible", "scroll"],
        K = () => ["auto", b, t],
        p = () => [b, t],
        g = () => ["", I, L],
        m = () => ["auto", H, b],
        v = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"],
        h = () => ["solid", "dashed", "dotted", "double", "none"],
        w = () => [
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "color",
            "luminosity",
        ],
        u = () => ["start", "end", "center", "between", "around", "evenly", "stretch"],
        x = () => ["", "0", b],
        R = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
        j = () => [H, ae],
        T = () => [H, b];
    return {
        cacheSize: 500,
        separator: ":",
        theme: {
            colors: [oe],
            spacing: [I, L],
            blur: ["none", "", V, b],
            brightness: j(),
            borderColor: [e],
            borderRadius: ["none", "", "full", V, b],
            borderSpacing: p(),
            borderWidth: g(),
            contrast: j(),
            grayscale: x(),
            hueRotate: T(),
            invert: x(),
            gap: p(),
            gradientColorStops: [e],
            gradientColorStopPositions: [Ut, L],
            inset: K(),
            margin: K(),
            opacity: j(),
            padding: p(),
            saturate: j(),
            scale: j(),
            sepia: x(),
            skew: T(),
            space: p(),
            translate: p(),
        },
        classGroups: {
            aspect: [{ aspect: ["auto", "square", "video", b] }],
            container: ["container"],
            columns: [{ columns: [V] }],
            "break-after": [{ "break-after": R() }],
            "break-before": [{ "break-before": R() }],
            "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
            "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
            box: [{ box: ["border", "content"] }],
            display: [
                "block",
                "inline-block",
                "inline",
                "flex",
                "inline-flex",
                "table",
                "inline-table",
                "table-caption",
                "table-cell",
                "table-column",
                "table-column-group",
                "table-footer-group",
                "table-header-group",
                "table-row-group",
                "table-row",
                "flow-root",
                "grid",
                "inline-grid",
                "contents",
                "list-item",
                "hidden",
            ],
            float: [{ float: ["right", "left", "none", "start", "end"] }],
            clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
            isolation: ["isolate", "isolation-auto"],
            "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
            "object-position": [{ object: [...v(), b] }],
            overflow: [{ overflow: U() }],
            "overflow-x": [{ "overflow-x": U() }],
            "overflow-y": [{ "overflow-y": U() }],
            overscroll: [{ overscroll: N() }],
            "overscroll-x": [{ "overscroll-x": N() }],
            "overscroll-y": [{ "overscroll-y": N() }],
            position: ["static", "fixed", "absolute", "relative", "sticky"],
            inset: [{ inset: [A] }],
            "inset-x": [{ "inset-x": [A] }],
            "inset-y": [{ "inset-y": [A] }],
            start: [{ start: [A] }],
            end: [{ end: [A] }],
            top: [{ top: [A] }],
            right: [{ right: [A] }],
            bottom: [{ bottom: [A] }],
            left: [{ left: [A] }],
            visibility: ["visible", "invisible", "collapse"],
            z: [{ z: ["auto", ne, b] }],
            basis: [{ basis: K() }],
            "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
            "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
            flex: [{ flex: ["1", "auto", "initial", "none", b] }],
            grow: [{ grow: x() }],
            shrink: [{ shrink: x() }],
            order: [{ order: ["first", "last", "none", ne, b] }],
            "grid-cols": [{ "grid-cols": [oe] }],
            "col-start-end": [{ col: ["auto", { span: ["full", ne, b] }, b] }],
            "col-start": [{ "col-start": m() }],
            "col-end": [{ "col-end": m() }],
            "grid-rows": [{ "grid-rows": [oe] }],
            "row-start-end": [{ row: ["auto", { span: [ne, b] }, b] }],
            "row-start": [{ "row-start": m() }],
            "row-end": [{ "row-end": m() }],
            "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
            "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", b] }],
            "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", b] }],
            gap: [{ gap: [y] }],
            "gap-x": [{ "gap-x": [y] }],
            "gap-y": [{ "gap-y": [y] }],
            "justify-content": [{ justify: ["normal", ...u()] }],
            "justify-items": [{ "justify-items": ["start", "end", "center", "stretch"] }],
            "justify-self": [{ "justify-self": ["auto", "start", "end", "center", "stretch"] }],
            "align-content": [{ content: ["normal", ...u(), "baseline"] }],
            "align-items": [{ items: ["start", "end", "center", "baseline", "stretch"] }],
            "align-self": [{ self: ["auto", "start", "end", "center", "stretch", "baseline"] }],
            "place-content": [{ "place-content": [...u(), "baseline"] }],
            "place-items": [{ "place-items": ["start", "end", "center", "baseline", "stretch"] }],
            "place-self": [{ "place-self": ["auto", "start", "end", "center", "stretch"] }],
            p: [{ p: [_] }],
            px: [{ px: [_] }],
            py: [{ py: [_] }],
            ps: [{ ps: [_] }],
            pe: [{ pe: [_] }],
            pt: [{ pt: [_] }],
            pr: [{ pr: [_] }],
            pb: [{ pb: [_] }],
            pl: [{ pl: [_] }],
            m: [{ m: [k] }],
            mx: [{ mx: [k] }],
            my: [{ my: [k] }],
            ms: [{ ms: [k] }],
            me: [{ me: [k] }],
            mt: [{ mt: [k] }],
            mr: [{ mr: [k] }],
            mb: [{ mb: [k] }],
            ml: [{ ml: [k] }],
            "space-x": [{ "space-x": [D] }],
            "space-x-reverse": ["space-x-reverse"],
            "space-y": [{ "space-y": [D] }],
            "space-y-reverse": ["space-y-reverse"],
            w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", b, t] }],
            "min-w": [{ "min-w": [b, t, "min", "max", "fit"] }],
            "max-w": [{ "max-w": [b, t, "none", "full", "min", "max", "fit", "prose", { screen: [V] }, V] }],
            h: [{ h: [b, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
            "min-h": [{ "min-h": [b, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
            "max-h": [{ "max-h": [b, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
            size: [{ size: [b, t, "auto", "min", "max", "fit"] }],
            "font-size": [{ text: ["base", V, L] }],
            "font-smoothing": ["antialiased", "subpixel-antialiased"],
            "font-style": ["italic", "not-italic"],
            "font-weight": [
                {
                    font: [
                        "thin",
                        "extralight",
                        "light",
                        "normal",
                        "medium",
                        "semibold",
                        "bold",
                        "extrabold",
                        "black",
                        ae,
                    ],
                },
            ],
            "font-family": [{ font: [oe] }],
            "fvn-normal": ["normal-nums"],
            "fvn-ordinal": ["ordinal"],
            "fvn-slashed-zero": ["slashed-zero"],
            "fvn-figure": ["lining-nums", "oldstyle-nums"],
            "fvn-spacing": ["proportional-nums", "tabular-nums"],
            "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
            tracking: [{ tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", b] }],
            "line-clamp": [{ "line-clamp": ["none", H, ae] }],
            leading: [{ leading: ["none", "tight", "snug", "normal", "relaxed", "loose", I, b] }],
            "list-image": [{ "list-image": ["none", b] }],
            "list-style-type": [{ list: ["none", "disc", "decimal", b] }],
            "list-style-position": [{ list: ["inside", "outside"] }],
            "placeholder-color": [{ placeholder: [e] }],
            "placeholder-opacity": [{ "placeholder-opacity": [P] }],
            "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
            "text-color": [{ text: [e] }],
            "text-opacity": [{ "text-opacity": [P] }],
            "text-decoration": ["underline", "overline", "line-through", "no-underline"],
            "text-decoration-style": [{ decoration: [...h(), "wavy"] }],
            "text-decoration-thickness": [{ decoration: ["auto", "from-font", I, L] }],
            "underline-offset": [{ "underline-offset": ["auto", I, b] }],
            "text-decoration-color": [{ decoration: [e] }],
            "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
            "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
            "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
            indent: [{ indent: p() }],
            "vertical-align": [
                { align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", b] },
            ],
            whitespace: [{ whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] }],
            break: [{ break: ["normal", "words", "all", "keep"] }],
            hyphens: [{ hyphens: ["none", "manual", "auto"] }],
            content: [{ content: ["none", b] }],
            "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
            "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
            "bg-opacity": [{ "bg-opacity": [P] }],
            "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
            "bg-position": [{ bg: [...v(), qt] }],
            "bg-repeat": [{ bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] }],
            "bg-size": [{ bg: ["auto", "cover", "contain", Ht] }],
            "bg-image": [{ bg: ["none", { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, Xt] }],
            "bg-color": [{ bg: [e] }],
            "gradient-from-pos": [{ from: [z] }],
            "gradient-via-pos": [{ via: [z] }],
            "gradient-to-pos": [{ to: [z] }],
            "gradient-from": [{ from: [M] }],
            "gradient-via": [{ via: [M] }],
            "gradient-to": [{ to: [M] }],
            rounded: [{ rounded: [o] }],
            "rounded-s": [{ "rounded-s": [o] }],
            "rounded-e": [{ "rounded-e": [o] }],
            "rounded-t": [{ "rounded-t": [o] }],
            "rounded-r": [{ "rounded-r": [o] }],
            "rounded-b": [{ "rounded-b": [o] }],
            "rounded-l": [{ "rounded-l": [o] }],
            "rounded-ss": [{ "rounded-ss": [o] }],
            "rounded-se": [{ "rounded-se": [o] }],
            "rounded-ee": [{ "rounded-ee": [o] }],
            "rounded-es": [{ "rounded-es": [o] }],
            "rounded-tl": [{ "rounded-tl": [o] }],
            "rounded-tr": [{ "rounded-tr": [o] }],
            "rounded-br": [{ "rounded-br": [o] }],
            "rounded-bl": [{ "rounded-bl": [o] }],
            "border-w": [{ border: [a] }],
            "border-w-x": [{ "border-x": [a] }],
            "border-w-y": [{ "border-y": [a] }],
            "border-w-s": [{ "border-s": [a] }],
            "border-w-e": [{ "border-e": [a] }],
            "border-w-t": [{ "border-t": [a] }],
            "border-w-r": [{ "border-r": [a] }],
            "border-w-b": [{ "border-b": [a] }],
            "border-w-l": [{ "border-l": [a] }],
            "border-opacity": [{ "border-opacity": [P] }],
            "border-style": [{ border: [...h(), "hidden"] }],
            "divide-x": [{ "divide-x": [a] }],
            "divide-x-reverse": ["divide-x-reverse"],
            "divide-y": [{ "divide-y": [a] }],
            "divide-y-reverse": ["divide-y-reverse"],
            "divide-opacity": [{ "divide-opacity": [P] }],
            "divide-style": [{ divide: h() }],
            "border-color": [{ border: [s] }],
            "border-color-x": [{ "border-x": [s] }],
            "border-color-y": [{ "border-y": [s] }],
            "border-color-t": [{ "border-t": [s] }],
            "border-color-r": [{ "border-r": [s] }],
            "border-color-b": [{ "border-b": [s] }],
            "border-color-l": [{ "border-l": [s] }],
            "divide-color": [{ divide: [s] }],
            "outline-style": [{ outline: ["", ...h()] }],
            "outline-offset": [{ "outline-offset": [I, b] }],
            "outline-w": [{ outline: [I, L] }],
            "outline-color": [{ outline: [e] }],
            "ring-w": [{ ring: g() }],
            "ring-w-inset": ["ring-inset"],
            "ring-color": [{ ring: [e] }],
            "ring-opacity": [{ "ring-opacity": [P] }],
            "ring-offset-w": [{ "ring-offset": [I, L] }],
            "ring-offset-color": [{ "ring-offset": [e] }],
            shadow: [{ shadow: ["", "inner", "none", V, Zt] }],
            "shadow-color": [{ shadow: [oe] }],
            opacity: [{ opacity: [P] }],
            "mix-blend": [{ "mix-blend": [...w(), "plus-lighter", "plus-darker"] }],
            "bg-blend": [{ "bg-blend": w() }],
            filter: [{ filter: ["", "none"] }],
            blur: [{ blur: [r] }],
            brightness: [{ brightness: [n] }],
            contrast: [{ contrast: [l] }],
            "drop-shadow": [{ "drop-shadow": ["", "none", V, b] }],
            grayscale: [{ grayscale: [f] }],
            "hue-rotate": [{ "hue-rotate": [c] }],
            invert: [{ invert: [d] }],
            saturate: [{ saturate: [Z] }],
            sepia: [{ sepia: [Q] }],
            "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
            "backdrop-blur": [{ "backdrop-blur": [r] }],
            "backdrop-brightness": [{ "backdrop-brightness": [n] }],
            "backdrop-contrast": [{ "backdrop-contrast": [l] }],
            "backdrop-grayscale": [{ "backdrop-grayscale": [f] }],
            "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [c] }],
            "backdrop-invert": [{ "backdrop-invert": [d] }],
            "backdrop-opacity": [{ "backdrop-opacity": [P] }],
            "backdrop-saturate": [{ "backdrop-saturate": [Z] }],
            "backdrop-sepia": [{ "backdrop-sepia": [Q] }],
            "border-collapse": [{ border: ["collapse", "separate"] }],
            "border-spacing": [{ "border-spacing": [i] }],
            "border-spacing-x": [{ "border-spacing-x": [i] }],
            "border-spacing-y": [{ "border-spacing-y": [i] }],
            "table-layout": [{ table: ["auto", "fixed"] }],
            caption: [{ caption: ["top", "bottom"] }],
            transition: [{ transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", b] }],
            duration: [{ duration: T() }],
            ease: [{ ease: ["linear", "in", "out", "in-out", b] }],
            delay: [{ delay: T() }],
            animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", b] }],
            transform: [{ transform: ["", "gpu", "none"] }],
            scale: [{ scale: [F] }],
            "scale-x": [{ "scale-x": [F] }],
            "scale-y": [{ "scale-y": [F] }],
            rotate: [{ rotate: [ne, b] }],
            "translate-x": [{ "translate-x": [B] }],
            "translate-y": [{ "translate-y": [B] }],
            "skew-x": [{ "skew-x": [Y] }],
            "skew-y": [{ "skew-y": [Y] }],
            "transform-origin": [
                {
                    origin: [
                        "center",
                        "top",
                        "top-right",
                        "right",
                        "bottom-right",
                        "bottom",
                        "bottom-left",
                        "left",
                        "top-left",
                        b,
                    ],
                },
            ],
            accent: [{ accent: ["auto", e] }],
            appearance: [{ appearance: ["none", "auto"] }],
            cursor: [
                {
                    cursor: [
                        "auto",
                        "default",
                        "pointer",
                        "wait",
                        "text",
                        "move",
                        "help",
                        "not-allowed",
                        "none",
                        "context-menu",
                        "progress",
                        "cell",
                        "crosshair",
                        "vertical-text",
                        "alias",
                        "copy",
                        "no-drop",
                        "grab",
                        "grabbing",
                        "all-scroll",
                        "col-resize",
                        "row-resize",
                        "n-resize",
                        "e-resize",
                        "s-resize",
                        "w-resize",
                        "ne-resize",
                        "nw-resize",
                        "se-resize",
                        "sw-resize",
                        "ew-resize",
                        "ns-resize",
                        "nesw-resize",
                        "nwse-resize",
                        "zoom-in",
                        "zoom-out",
                        b,
                    ],
                },
            ],
            "caret-color": [{ caret: [e] }],
            "pointer-events": [{ "pointer-events": ["none", "auto"] }],
            resize: [{ resize: ["none", "y", "x", ""] }],
            "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
            "scroll-m": [{ "scroll-m": p() }],
            "scroll-mx": [{ "scroll-mx": p() }],
            "scroll-my": [{ "scroll-my": p() }],
            "scroll-ms": [{ "scroll-ms": p() }],
            "scroll-me": [{ "scroll-me": p() }],
            "scroll-mt": [{ "scroll-mt": p() }],
            "scroll-mr": [{ "scroll-mr": p() }],
            "scroll-mb": [{ "scroll-mb": p() }],
            "scroll-ml": [{ "scroll-ml": p() }],
            "scroll-p": [{ "scroll-p": p() }],
            "scroll-px": [{ "scroll-px": p() }],
            "scroll-py": [{ "scroll-py": p() }],
            "scroll-ps": [{ "scroll-ps": p() }],
            "scroll-pe": [{ "scroll-pe": p() }],
            "scroll-pt": [{ "scroll-pt": p() }],
            "scroll-pr": [{ "scroll-pr": p() }],
            "scroll-pb": [{ "scroll-pb": p() }],
            "scroll-pl": [{ "scroll-pl": p() }],
            "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
            "snap-stop": [{ snap: ["normal", "always"] }],
            "snap-type": [{ snap: ["none", "x", "y", "both"] }],
            "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
            touch: [{ touch: ["auto", "none", "manipulation"] }],
            "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
            "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
            "touch-pz": ["touch-pinch-zoom"],
            select: [{ select: ["none", "text", "all", "auto"] }],
            "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", b] }],
            fill: [{ fill: [e, "none"] }],
            "stroke-w": [{ stroke: [I, L, ae] }],
            stroke: [{ stroke: [e, "none"] }],
            sr: ["sr-only", "not-sr-only"],
            "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
        },
        conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"],
            overscroll: ["overscroll-x", "overscroll-y"],
            inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
            "inset-x": ["right", "left"],
            "inset-y": ["top", "bottom"],
            flex: ["basis", "grow", "shrink"],
            gap: ["gap-x", "gap-y"],
            p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
            px: ["pr", "pl"],
            py: ["pt", "pb"],
            m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
            mx: ["mr", "ml"],
            my: ["mt", "mb"],
            size: ["w", "h"],
            "font-size": ["leading"],
            "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
            "fvn-ordinal": ["fvn-normal"],
            "fvn-slashed-zero": ["fvn-normal"],
            "fvn-figure": ["fvn-normal"],
            "fvn-spacing": ["fvn-normal"],
            "fvn-fraction": ["fvn-normal"],
            "line-clamp": ["display", "overflow"],
            rounded: [
                "rounded-s",
                "rounded-e",
                "rounded-t",
                "rounded-r",
                "rounded-b",
                "rounded-l",
                "rounded-ss",
                "rounded-se",
                "rounded-ee",
                "rounded-es",
                "rounded-tl",
                "rounded-tr",
                "rounded-br",
                "rounded-bl",
            ],
            "rounded-s": ["rounded-ss", "rounded-es"],
            "rounded-e": ["rounded-se", "rounded-ee"],
            "rounded-t": ["rounded-tl", "rounded-tr"],
            "rounded-r": ["rounded-tr", "rounded-br"],
            "rounded-b": ["rounded-br", "rounded-bl"],
            "rounded-l": ["rounded-tl", "rounded-bl"],
            "border-spacing": ["border-spacing-x", "border-spacing-y"],
            "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
            "border-w-x": ["border-w-r", "border-w-l"],
            "border-w-y": ["border-w-t", "border-w-b"],
            "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
            "border-color-x": ["border-color-r", "border-color-l"],
            "border-color-y": ["border-color-t", "border-color-b"],
            "scroll-m": [
                "scroll-mx",
                "scroll-my",
                "scroll-ms",
                "scroll-me",
                "scroll-mt",
                "scroll-mr",
                "scroll-mb",
                "scroll-ml",
            ],
            "scroll-mx": ["scroll-mr", "scroll-ml"],
            "scroll-my": ["scroll-mt", "scroll-mb"],
            "scroll-p": [
                "scroll-px",
                "scroll-py",
                "scroll-ps",
                "scroll-pe",
                "scroll-pt",
                "scroll-pr",
                "scroll-pb",
                "scroll-pl",
            ],
            "scroll-px": ["scroll-pr", "scroll-pl"],
            "scroll-py": ["scroll-pt", "scroll-pb"],
            touch: ["touch-x", "touch-y", "touch-pz"],
            "touch-x": ["touch"],
            "touch-y": ["touch"],
            "touch-pz": ["touch"],
        },
        conflictingClassGroupModifiers: { "font-size": ["leading"] },
    };
}
function er(e, { cacheSize: t, prefix: r, separator: n, extend: s = {}, override: o = {} }) {
    ue(e, "cacheSize", t), ue(e, "prefix", r), ue(e, "separator", n);
    for (const i in o) tr(e[i], o[i]);
    for (const i in s) rr(e[i], s[i]);
    return e;
}
function ue(e, t, r) {
    r !== void 0 && (e[t] = r);
}
function tr(e, t) {
    if (t) for (const r in t) ue(e, r, t[r]);
}
function rr(e, t) {
    if (t)
        for (const r in t) {
            const n = t[r];
            n !== void 0 && (e[r] = (e[r] || []).concat(n));
        }
}
function nr(e, ...t) {
    return typeof e == "function" ? we(_e, e, ...t) : we(() => er(_e(), e), ...t);
}
const $e = we(_e);
function Or(...e) {
    return $e(xt(e));
}
const Tr = (e, t = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
    const r = getComputedStyle(e),
        n = r.transform === "none" ? "" : r.transform,
        s = (i, a, l) => {
            const [f, c] = a,
                [d, y] = l;
            return ((i - f) / (c - f)) * (y - d) + d;
        },
        o = (i) => Object.keys(i).reduce((a, l) => (i[l] === void 0 ? a : a + `${l}:${i[l]};`), "");
    return {
        duration: t.duration ?? 200,
        delay: 0,
        css: (i) => {
            const a = s(i, [0, 1], [t.y ?? 5, 0]),
                l = s(i, [0, 1], [t.x ?? 0, 0]),
                f = s(i, [0, 1], [t.start ?? 0.95, 1]);
            return o({ transform: `${n} translate3d(${l}px, ${a}px, 0) scale(${f})`, opacity: i });
        },
        easing: kt,
    };
};
var ze = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
    O = (e) => !e || typeof e != "object" || Object.keys(e).length === 0,
    or = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function et(e, t) {
    e.forEach(function (r) {
        Array.isArray(r) ? et(r, t) : t.push(r);
    });
}
function tt(e) {
    let t = [];
    return et(e, t), t;
}
var rt = (...e) => tt(e).filter(Boolean),
    nt = (e, t) => {
        let r = {},
            n = Object.keys(e),
            s = Object.keys(t);
        for (let o of n)
            if (s.includes(o)) {
                let i = e[o],
                    a = t[o];
                typeof i == "object" && typeof a == "object"
                    ? (r[o] = nt(i, a))
                    : Array.isArray(i) || Array.isArray(a)
                      ? (r[o] = rt(a, i))
                      : (r[o] = a + " " + i);
            } else r[o] = e[o];
        for (let o of s) n.includes(o) || (r[o] = t[o]);
        return r;
    },
    Oe = (e) => (!e || typeof e != "string" ? e : e.replace(/\s+/g, " ").trim()),
    sr = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 },
    ot = (e) => e || void 0,
    ie = (...e) => ot(tt(e).filter(Boolean).join(" ")),
    ge = null,
    G = {},
    Ae = !1,
    se =
        (...e) =>
        (t) =>
            t.twMerge
                ? ((!ge || Ae) &&
                      ((Ae = !1),
                      (ge = O(G)
                          ? $e
                          : nr({
                                ...G,
                                extend: {
                                    theme: G.theme,
                                    classGroups: G.classGroups,
                                    conflictingClassGroupModifiers: G.conflictingClassGroupModifiers,
                                    conflictingClassGroups: G.conflictingClassGroups,
                                    ...G.extend,
                                },
                            }))),
                  ot(ge(ie(e))))
                : ie(e),
    Te = (e, t) => {
        for (let r in t) e.hasOwnProperty(r) ? (e[r] = ie(e[r], t[r])) : (e[r] = t[r]);
        return e;
    },
    Pr = (e, t) => {
        let {
                extend: r = null,
                slots: n = {},
                variants: s = {},
                compoundVariants: o = [],
                compoundSlots: i = [],
                defaultVariants: a = {},
            } = e,
            l = { ...sr, ...t },
            f = r != null && r.base ? ie(r.base, e == null ? void 0 : e.base) : e == null ? void 0 : e.base,
            c = r != null && r.variants && !O(r.variants) ? nt(s, r.variants) : s,
            d = r != null && r.defaultVariants && !O(r.defaultVariants) ? { ...r.defaultVariants, ...a } : a;
        !O(l.twMergeConfig) && !or(l.twMergeConfig, G) && ((Ae = !0), (G = l.twMergeConfig));
        let y = O(r == null ? void 0 : r.slots),
            M = O(n) ? {} : { base: ie(e == null ? void 0 : e.base, y && (r == null ? void 0 : r.base)), ...n },
            z = y ? M : Te({ ...(r == null ? void 0 : r.slots) }, O(M) ? { base: e == null ? void 0 : e.base } : M),
            A = O(r == null ? void 0 : r.compoundVariants) ? o : rt(r == null ? void 0 : r.compoundVariants, o),
            k = (_) => {
                if (O(c) && O(n) && y) return se(f, _ == null ? void 0 : _.class, _ == null ? void 0 : _.className)(l);
                if (A && !Array.isArray(A))
                    throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof A}`);
                if (i && !Array.isArray(i))
                    throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof i}`);
                let Z = (p, g, m = [], v) => {
                        let h = m;
                        if (typeof g == "string")
                            h = h.concat(
                                Oe(g)
                                    .split(" ")
                                    .map((w) => `${p}:${w}`),
                            );
                        else if (Array.isArray(g)) h = h.concat(g.reduce((w, u) => w.concat(`${p}:${u}`), []));
                        else if (typeof g == "object" && typeof v == "string") {
                            for (let w in g)
                                if (g.hasOwnProperty(w) && w === v) {
                                    let u = g[w];
                                    if (u && typeof u == "string") {
                                        let x = Oe(u);
                                        h[v]
                                            ? (h[v] = h[v].concat(x.split(" ").map((R) => `${p}:${R}`)))
                                            : (h[v] = x.split(" ").map((R) => `${p}:${R}`));
                                    } else
                                        Array.isArray(u) &&
                                            u.length > 0 &&
                                            (h[v] = u.reduce((x, R) => x.concat(`${p}:${R}`), []));
                                }
                        }
                        return h;
                    },
                    F = (p, g = c, m = null, v = null) => {
                        var h;
                        let w = g[p];
                        if (!w || O(w)) return null;
                        let u = (h = v == null ? void 0 : v[p]) != null ? h : _ == null ? void 0 : _[p];
                        if (u === null) return null;
                        let x = ze(u),
                            R =
                                (Array.isArray(l.responsiveVariants) && l.responsiveVariants.length > 0) ||
                                l.responsiveVariants === !0,
                            j = d == null ? void 0 : d[p],
                            T = [];
                        if (typeof x == "object" && R)
                            for (let [me, Ee] of Object.entries(x)) {
                                let ft = w[Ee];
                                if (me === "initial") {
                                    j = Ee;
                                    continue;
                                }
                                (Array.isArray(l.responsiveVariants) && !l.responsiveVariants.includes(me)) ||
                                    (T = Z(me, ft, T, m));
                            }
                        let dt = x != null && typeof x != "object" ? x : ze(j),
                            be = w[dt || "false"];
                        return typeof T == "object" && typeof m == "string" && T[m]
                            ? Te(T, be)
                            : T.length > 0
                              ? (T.push(be), T)
                              : be;
                    },
                    Q = () => (c ? Object.keys(c).map((p) => F(p, c)) : null),
                    Y = (p, g) => {
                        if (!c || typeof c != "object") return null;
                        let m = new Array();
                        for (let v in c) {
                            let h = F(v, c, p, g),
                                w = p === "base" && typeof h == "string" ? h : h && h[p];
                            w && (m[m.length] = w);
                        }
                        return m;
                    },
                    D = {};
                for (let p in _) _[p] !== void 0 && (D[p] = _[p]);
                let B = (p, g) => {
                        var m;
                        let v =
                            typeof (_ == null ? void 0 : _[p]) == "object"
                                ? { [p]: (m = _[p]) == null ? void 0 : m.initial }
                                : {};
                        return { ...d, ...D, ...v, ...g };
                    },
                    N = (p = [], g) => {
                        let m = [];
                        for (let { class: v, className: h, ...w } of p) {
                            let u = !0;
                            for (let [x, R] of Object.entries(w)) {
                                let j = B(x, g);
                                if (Array.isArray(R)) {
                                    if (!R.includes(j[x])) {
                                        u = !1;
                                        break;
                                    }
                                } else if (j[x] !== R) {
                                    u = !1;
                                    break;
                                }
                            }
                            u && (v && m.push(v), h && m.push(h));
                        }
                        return m;
                    },
                    U = (p) => {
                        let g = N(A, p);
                        if (!Array.isArray(g)) return g;
                        let m = {};
                        for (let v of g)
                            if ((typeof v == "string" && (m.base = se(m.base, v)(l)), typeof v == "object"))
                                for (let [h, w] of Object.entries(v)) m[h] = se(m[h], w)(l);
                        return m;
                    },
                    K = (p) => {
                        if (i.length < 1) return null;
                        let g = {};
                        for (let { slots: m = [], class: v, className: h, ...w } of i) {
                            if (!O(w)) {
                                let u = !0;
                                for (let x of Object.keys(w)) {
                                    let R = B(x, p)[x];
                                    if (R === void 0 || (Array.isArray(w[x]) ? !w[x].includes(R) : w[x] !== R)) {
                                        u = !1;
                                        break;
                                    }
                                }
                                if (!u) continue;
                            }
                            for (let u of m) (g[u] = g[u] || []), g[u].push([v, h]);
                        }
                        return g;
                    };
                if (!O(n) || !y) {
                    let p = {};
                    if (typeof z == "object" && !O(z))
                        for (let g of Object.keys(z))
                            p[g] = (m) => {
                                var v, h;
                                return se(
                                    z[g],
                                    Y(g, m),
                                    ((v = U(m)) != null ? v : [])[g],
                                    ((h = K(m)) != null ? h : [])[g],
                                    m == null ? void 0 : m.class,
                                    m == null ? void 0 : m.className,
                                )(l);
                            };
                    return p;
                }
                return se(f, Q(), N(A), _ == null ? void 0 : _.class, _ == null ? void 0 : _.className)(l);
            },
            P = () => {
                if (!(!c || typeof c != "object")) return Object.keys(c);
            };
        return (
            (k.variantKeys = P()),
            (k.extend = r),
            (k.base = f),
            (k.slots = z),
            (k.variants = c),
            (k.defaultVariants = d),
            (k.compoundSlots = i),
            (k.compoundVariants = A),
            k
        );
    };
function st(e) {
    return Object.keys(e).reduce((t, r) => (e[r] === void 0 ? t : t + `${r}:${e[r]};`), "");
}
function jr(e) {
    return e ? !0 : void 0;
}
st({ position: "absolute", opacity: 0, "pointer-events": "none", margin: 0, transform: "translateX(-100%)" });
function Ir(e) {
    if (e !== null) return "";
}
function Pe(e) {
    function t(r) {
        return r(e), () => {};
    }
    return { subscribe: t };
}
const ce = (e) =>
        new Proxy(e, {
            get(t, r, n) {
                return Reflect.get(t, r, n);
            },
            ownKeys(t) {
                return Reflect.ownKeys(t).filter((r) => r !== "action");
            },
        }),
    je = (e) => typeof e == "function";
it("empty");
function it(e, t) {
    const { stores: r, action: n, returned: s } = t ?? {},
        o = (() => {
            if (r && s)
                return Ge(r, (a) => {
                    const l = s(a);
                    if (je(l)) {
                        const f = (...c) => ce({ ...l(...c), [`data-melt-${e}`]: "", action: n ?? W });
                        return (f.action = n ?? W), f;
                    }
                    return ce({ ...l, [`data-melt-${e}`]: "", action: n ?? W });
                });
            {
                const a = s,
                    l = a == null ? void 0 : a();
                if (je(l)) {
                    const f = (...c) => ce({ ...l(...c), [`data-melt-${e}`]: "", action: n ?? W });
                    return (f.action = n ?? W), Pe(f);
                }
                return Pe(ce({ ...l, [`data-melt-${e}`]: "", action: n ?? W }));
            }
        })(),
        i = n ?? (() => {});
    return (i.subscribe = o.subscribe), i;
}
function ir(e) {
    const t = (o) => (o ? `${e}-${o}` : e),
        r = (o) => `data-melt-${e}${o ? `-${o}` : ""}`,
        n = (o) => `[data-melt-${e}${o ? `-${o}` : ""}]`;
    return { name: t, attribute: r, selector: n, getEl: (o) => document.querySelector(n(o)) };
}
const Gr = typeof document < "u",
    lr = (e) => typeof e == "function";
function Fr(e) {
    return e instanceof Element;
}
function lt(e) {
    return e instanceof HTMLElement;
}
function ar(e) {
    return e !== null && typeof e == "object";
}
function at(e) {
    return ar(e) && "subscribe" in e;
}
function cr(...e) {
    return (...t) => {
        for (const r of e) typeof r == "function" && r(...t);
    };
}
function W() {}
function ct(e, t, r, n) {
    const s = Array.isArray(t) ? t : [t];
    return (
        s.forEach((o) => e.addEventListener(o, r, n)),
        () => {
            s.forEach((o) => e.removeEventListener(o, r, n));
        }
    );
}
function Nr(e, t, r, n) {
    const s = Array.isArray(t) ? t : [t];
    if (typeof r == "function") {
        const o = dr((i) => r(i));
        return (
            s.forEach((i) => e.addEventListener(i, o, n)),
            () => {
                s.forEach((i) => e.removeEventListener(i, o, n));
            }
        );
    }
    return () => void 0;
}
function ur(e) {
    const t = e.currentTarget;
    if (!lt(t)) return null;
    const r = new CustomEvent(`m-${e.type}`, { detail: { originalEvent: e }, cancelable: !0 });
    return t.dispatchEvent(r), r;
}
function dr(e) {
    return (t) => {
        const r = ur(t);
        if (!(r != null && r.defaultPrevented)) return e(t);
    };
}
const Lr = (e) => {
        try {
            mt(e);
        } catch {
            return e;
        }
    },
    fr = (e) => {
        try {
            bt(e);
        } catch {
            return e;
        }
    };
function ut(e, ...t) {
    const r = {};
    for (const n of Object.keys(e)) t.includes(n) || (r[n] = e[n]);
    return r;
}
function pr(e) {
    const t = {};
    for (const r in e) {
        const n = e[r];
        n !== void 0 && (t[r] = n);
    }
    return t;
}
function pe(e) {
    return { ...e, get: () => Fe(e) };
}
pe.writable = function (e) {
    const t = pt(e);
    let r = e;
    return {
        subscribe: t.subscribe,
        set(n) {
            t.set(n), (r = n);
        },
        update(n) {
            const s = n(r);
            t.set(s), (r = s);
        },
        get() {
            return r;
        },
    };
};
pe.derived = function (e, t) {
    const r = new Map(),
        n = () => {
            const o = Array.isArray(e) ? e.map((i) => i.get()) : e.get();
            return t(o);
        };
    return {
        get: n,
        subscribe: (o) => {
            const i = [];
            return (
                (Array.isArray(e) ? e : [e]).forEach((l) => {
                    i.push(
                        l.subscribe(() => {
                            o(n());
                        }),
                    );
                }),
                o(n()),
                r.set(o, i),
                () => {
                    const l = r.get(o);
                    if (l) for (const f of l) f();
                    r.delete(o);
                }
            );
        },
    };
};
const J = {
        ALT: "Alt",
        ARROW_DOWN: "ArrowDown",
        ARROW_LEFT: "ArrowLeft",
        ARROW_RIGHT: "ArrowRight",
        ARROW_UP: "ArrowUp",
        BACKSPACE: "Backspace",
        CAPS_LOCK: "CapsLock",
        CONTROL: "Control",
        DELETE: "Delete",
        END: "End",
        ENTER: "Enter",
        ESCAPE: "Escape",
        F1: "F1",
        F10: "F10",
        F11: "F11",
        F12: "F12",
        F2: "F2",
        F3: "F3",
        F4: "F4",
        F5: "F5",
        F6: "F6",
        F7: "F7",
        F8: "F8",
        F9: "F9",
        HOME: "Home",
        META: "Meta",
        PAGE_DOWN: "PageDown",
        PAGE_UP: "PageUp",
        SHIFT: "Shift",
        SPACE: " ",
        TAB: "Tab",
        CTRL: "Control",
        ASTERISK: "*",
        A: "a",
        P: "p",
    },
    br = (e = "ltr", t = "horizontal") =>
        ({ horizontal: e === "rtl" ? J.ARROW_LEFT : J.ARROW_RIGHT, vertical: J.ARROW_DOWN })[t],
    mr = (e = "ltr", t = "horizontal") =>
        ({ horizontal: e === "rtl" ? J.ARROW_RIGHT : J.ARROW_LEFT, vertical: J.ARROW_UP })[t],
    Vr = (e = "ltr", t = "horizontal") => ({ nextKey: br(e, t), prevKey: mr(e, t) });
function gr(e, t) {
    let r;
    const n = Ge(e, (o) => {
            r == null || r(), (r = t(o));
        }).subscribe(W),
        s = () => {
            n(), r == null || r();
        };
    return fr(s), s;
}
q(void 0, (e) => {
    function t(n) {
        e(n), e(void 0);
    }
    return ct(document, "pointerup", t, { passive: !1, capture: !0 });
});
const hr = q(void 0, (e) => {
        function t(n) {
            n && n.key === J.ESCAPE && e(n), e(void 0);
        }
        return ct(document, "keydown", t, { passive: !1 });
    }),
    Wr = (e, t = {}) => {
        let r = W;
        function n(s = {}) {
            r();
            const o = { enabled: !0, ...s },
                i = at(o.enabled) ? o.enabled : q(o.enabled);
            r = cr(
                hr.subscribe((a) => {
                    var f;
                    if (!a || !Fe(i)) return;
                    const l = a.target;
                    if (!(!lt(l) || l.closest("[data-escapee]") !== e)) {
                        if ((a.preventDefault(), o.ignore)) {
                            if (lr(o.ignore)) {
                                if (o.ignore(a)) return;
                            } else if (
                                Array.isArray(o.ignore) &&
                                o.ignore.length > 0 &&
                                o.ignore.some((c) => c && l === c)
                            )
                                return;
                        }
                        (f = o.handler) == null || f.call(o, a);
                    }
                }),
                gr(i, (a) => {
                    a ? (e.dataset.escapee = "") : delete e.dataset.escapee;
                }),
            );
        }
        return (
            n(t),
            {
                update: n,
                destroy() {
                    e.removeAttribute("data-escapee"), r();
                },
            }
        );
    };
function yr(e) {
    const t = {};
    return (
        Object.keys(e).forEach((r) => {
            const n = r,
                s = e[n];
            at(s) ? (t[n] = pe(s)) : (t[n] = pe(q(s)));
        }),
        t
    );
}
const vr = { prefix: "", disabled: q(!1), required: q(!1), name: q(void 0) };
function Dr(e) {
    const t = { ...vr, ...pr(e) },
        { name: r } = ir(t.prefix),
        { value: n, name: s, disabled: o, required: i } = yr(ut(t, "prefix")),
        a = s;
    return it(r("hidden-input"), {
        stores: [n, a, o, i],
        returned: ([f, c, d, y]) => ({
            name: c,
            value: f == null ? void 0 : f.toString(),
            "aria-hidden": "true",
            hidden: !0,
            disabled: d,
            required: y,
            tabIndex: -1,
            style: st({
                position: "absolute",
                opacity: 0,
                "pointer-events": "none",
                margin: 0,
                transform: "translateX(-100%)",
            }),
        }),
        action: (f) => ({
            destroy: n.subscribe((d) => {
                (f.value = d), f.dispatchEvent(new Event("change", { bubbles: !0 }));
            }),
        }),
    });
}
const wr = {
    isDateDisabled: void 0,
    isDateUnavailable: void 0,
    value: void 0,
    preventDeselect: !1,
    numberOfMonths: 1,
    pagedNavigation: !1,
    weekStartsOn: 0,
    fixedWeeks: !1,
    calendarLabel: "Event Date",
    locale: "en",
    minValue: void 0,
    maxValue: void 0,
    disabled: !1,
    readonly: !1,
    weekdayFormat: "narrow",
};
({
    ...ut(
        wr,
        "isDateDisabled",
        "isDateUnavailable",
        "value",
        "locale",
        "disabled",
        "readonly",
        "minValue",
        "maxValue",
        "weekdayFormat",
    ),
});
function _r(e, t) {
    const r = [];
    return (
        t.builders.forEach((n) => {
            const s = n.action(e);
            s && r.push(s);
        }),
        {
            destroy: () => {
                r.forEach((n) => {
                    n.destroy && n.destroy();
                });
            },
        }
    );
}
function Ie(e) {
    const t = {};
    return (
        e.forEach((r) => {
            Object.keys(r).forEach((n) => {
                n !== "action" && (t[n] = r[n]);
            });
        }),
        t
    );
}
function Ar(e) {
    let t = e[1] ? "a" : "button",
        r,
        n,
        s = (e[1] ? "a" : "button") && he(e);
    return {
        c() {
            s && s.c(), (r = $());
        },
        l(o) {
            s && s.l(o), (r = $());
        },
        m(o, i) {
            s && s.m(o, i), le(o, r, i), (n = !0);
        },
        p(o, i) {
            o[1],
                t
                    ? ke(t, o[1] ? "a" : "button")
                        ? (s.d(1), (s = he(o)), (t = o[1] ? "a" : "button"), s.c(), s.m(r.parentNode, r))
                        : s.p(o, i)
                    : ((s = he(o)), (t = o[1] ? "a" : "button"), s.c(), s.m(r.parentNode, r));
        },
        i(o) {
            n || (te(s, o), (n = !0));
        },
        o(o) {
            ee(s, o), (n = !1);
        },
        d(o) {
            o && X(r), s && s.d(o);
        },
    };
}
function kr(e) {
    let t = e[1] ? "a" : "button",
        r,
        n,
        s = (e[1] ? "a" : "button") && ye(e);
    return {
        c() {
            s && s.c(), (r = $());
        },
        l(o) {
            s && s.l(o), (r = $());
        },
        m(o, i) {
            s && s.m(o, i), le(o, r, i), (n = !0);
        },
        p(o, i) {
            o[1],
                t
                    ? ke(t, o[1] ? "a" : "button")
                        ? (s.d(1), (s = ye(o)), (t = o[1] ? "a" : "button"), s.c(), s.m(r.parentNode, r))
                        : s.p(o, i)
                    : ((s = ye(o)), (t = o[1] ? "a" : "button"), s.c(), s.m(r.parentNode, r));
        },
        i(o) {
            n || (te(s, o), (n = !0));
        },
        o(o) {
            ee(s, o), (n = !1);
        },
        d(o) {
            o && X(r), s && s.d(o);
        },
    };
}
function he(e) {
    let t, r, n, s, o;
    const i = e[7].default,
        a = Ne(i, e, e[6], null);
    let l = [{ type: (r = e[1] ? void 0 : e[2]) }, { href: e[1] }, { tabindex: "0" }, e[5], e[4]],
        f = {};
    for (let c = 0; c < l.length; c += 1) f = de(f, l[c]);
    return {
        c() {
            (t = Le(e[1] ? "a" : "button")), a && a.c(), this.h();
        },
        l(c) {
            t = Ve(c, ((e[1] ? "a" : "button") || "null").toUpperCase(), { type: !0, href: !0, tabindex: !0 });
            var d = We(t);
            a && a.l(d), d.forEach(X), this.h();
        },
        h() {
            fe(e[1] ? "a" : "button")(t, f);
        },
        m(c, d) {
            le(c, t, d),
                a && a.m(t, null),
                e[29](t),
                (n = !0),
                s ||
                    ((o = [
                        S(t, "click", e[18]),
                        S(t, "change", e[19]),
                        S(t, "keydown", e[20]),
                        S(t, "keyup", e[21]),
                        S(t, "mouseenter", e[22]),
                        S(t, "mouseleave", e[23]),
                        S(t, "mousedown", e[24]),
                        S(t, "pointerdown", e[25]),
                        S(t, "mouseup", e[26]),
                        S(t, "pointerup", e[27]),
                    ]),
                    (s = !0));
        },
        p(c, d) {
            a && a.p && (!n || d & 64) && De(a, i, c, c[6], n ? Ue(i, c[6], d, null) : Be(c[6]), null),
                fe(c[1] ? "a" : "button")(
                    t,
                    (f = He(l, [
                        (!n || (d & 6 && r !== (r = c[1] ? void 0 : c[2]))) && { type: r },
                        (!n || d & 2) && { href: c[1] },
                        { tabindex: "0" },
                        d & 32 && c[5],
                        c[4],
                    ])),
                );
        },
        i(c) {
            n || (te(a, c), (n = !0));
        },
        o(c) {
            ee(a, c), (n = !1);
        },
        d(c) {
            c && X(t), a && a.d(c), e[29](null), (s = !1), Ke(o);
        },
    };
}
function ye(e) {
    let t, r, n, s, o, i;
    const a = e[7].default,
        l = Ne(a, e, e[6], null);
    let f = [{ type: (r = e[1] ? void 0 : e[2]) }, { href: e[1] }, { tabindex: "0" }, Ie(e[3]), e[5], e[4]],
        c = {};
    for (let d = 0; d < f.length; d += 1) c = de(c, f[d]);
    return {
        c() {
            (t = Le(e[1] ? "a" : "button")), l && l.c(), this.h();
        },
        l(d) {
            t = Ve(d, ((e[1] ? "a" : "button") || "null").toUpperCase(), { type: !0, href: !0, tabindex: !0 });
            var y = We(t);
            l && l.l(y), y.forEach(X), this.h();
        },
        h() {
            fe(e[1] ? "a" : "button")(t, c);
        },
        m(d, y) {
            le(d, t, y),
                l && l.m(t, null),
                e[28](t),
                (s = !0),
                o ||
                    ((i = [
                        S(t, "click", e[8]),
                        S(t, "change", e[9]),
                        S(t, "keydown", e[10]),
                        S(t, "keyup", e[11]),
                        S(t, "mouseenter", e[12]),
                        S(t, "mouseleave", e[13]),
                        S(t, "mousedown", e[14]),
                        S(t, "pointerdown", e[15]),
                        S(t, "mouseup", e[16]),
                        S(t, "pointerup", e[17]),
                        ht((n = _r.call(null, t, { builders: e[3] }))),
                    ]),
                    (o = !0));
        },
        p(d, y) {
            l && l.p && (!s || y & 64) && De(l, a, d, d[6], s ? Ue(a, d[6], y, null) : Be(d[6]), null),
                fe(d[1] ? "a" : "button")(
                    t,
                    (c = He(f, [
                        (!s || (y & 6 && r !== (r = d[1] ? void 0 : d[2]))) && { type: r },
                        (!s || y & 2) && { href: d[1] },
                        { tabindex: "0" },
                        y & 8 && Ie(d[3]),
                        y & 32 && d[5],
                        d[4],
                    ])),
                ),
                n && yt(n.update) && y & 8 && n.update.call(null, { builders: d[3] });
        },
        i(d) {
            s || (te(l, d), (s = !0));
        },
        o(d) {
            ee(l, d), (s = !1);
        },
        d(d) {
            d && X(t), l && l.d(d), e[28](null), (o = !1), Ke(i);
        },
    };
}
function xr(e) {
    let t, r, n, s;
    const o = [kr, Ar],
        i = [];
    function a(l, f) {
        return l[3] && l[3].length ? 0 : 1;
    }
    return (
        (t = a(e)),
        (r = i[t] = o[t](e)),
        {
            c() {
                r.c(), (n = $());
            },
            l(l) {
                r.l(l), (n = $());
            },
            m(l, f) {
                i[t].m(l, f), le(l, n, f), (s = !0);
            },
            p(l, [f]) {
                let c = t;
                (t = a(l)),
                    t === c
                        ? i[t].p(l, f)
                        : (_t(),
                          ee(i[c], 1, 1, () => {
                              i[c] = null;
                          }),
                          At(),
                          (r = i[t]),
                          r ? r.p(l, f) : ((r = i[t] = o[t](l)), r.c()),
                          te(r, 1),
                          r.m(n.parentNode, n));
            },
            i(l) {
                s || (te(r), (s = !0));
            },
            o(l) {
                ee(r), (s = !1);
            },
            d(l) {
                l && X(n), i[t].d(l);
            },
        }
    );
}
function Er(e, t, r) {
    const n = ["href", "type", "builders", "el"];
    let s = Ce(t, n),
        { $$slots: o = {}, $$scope: i } = t,
        { href: a = void 0 } = t,
        { type: l = void 0 } = t,
        { builders: f = [] } = t,
        { el: c = void 0 } = t;
    const d = { "data-button-root": "" };
    function y(u) {
        C.call(this, e, u);
    }
    function M(u) {
        C.call(this, e, u);
    }
    function z(u) {
        C.call(this, e, u);
    }
    function A(u) {
        C.call(this, e, u);
    }
    function k(u) {
        C.call(this, e, u);
    }
    function P(u) {
        C.call(this, e, u);
    }
    function _(u) {
        C.call(this, e, u);
    }
    function Z(u) {
        C.call(this, e, u);
    }
    function F(u) {
        C.call(this, e, u);
    }
    function Q(u) {
        C.call(this, e, u);
    }
    function Y(u) {
        C.call(this, e, u);
    }
    function D(u) {
        C.call(this, e, u);
    }
    function B(u) {
        C.call(this, e, u);
    }
    function N(u) {
        C.call(this, e, u);
    }
    function U(u) {
        C.call(this, e, u);
    }
    function K(u) {
        C.call(this, e, u);
    }
    function p(u) {
        C.call(this, e, u);
    }
    function g(u) {
        C.call(this, e, u);
    }
    function m(u) {
        C.call(this, e, u);
    }
    function v(u) {
        C.call(this, e, u);
    }
    function h(u) {
        Se[u ? "unshift" : "push"](() => {
            (c = u), r(0, c);
        });
    }
    function w(u) {
        Se[u ? "unshift" : "push"](() => {
            (c = u), r(0, c);
        });
    }
    return (
        (e.$$set = (u) => {
            (t = de(de({}, t), gt(u))),
                r(5, (s = Ce(t, n))),
                "href" in u && r(1, (a = u.href)),
                "type" in u && r(2, (l = u.type)),
                "builders" in u && r(3, (f = u.builders)),
                "el" in u && r(0, (c = u.el)),
                "$$scope" in u && r(6, (i = u.$$scope));
        }),
        [c, a, l, f, d, s, i, o, y, M, z, A, k, P, _, Z, F, Q, Y, D, B, N, U, K, p, g, m, v, h, w]
    );
}
class Br extends vt {
    constructor(t) {
        super(), wt(this, t, Er, xr, ke, { href: 1, type: 2, builders: 3, el: 0 });
    }
}
const Ur = {
    INDEX: "/",
    POSTS: "/posts",
    CREDITS: "/credits",
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    SETTINGS: "/settings/profile",
    SETTINGS_APPEARANCE: "/settings/appearance",
};
export {
    fr as A,
    Br as B,
    Tr as C,
    kt as a,
    Pr as b,
    Or as c,
    Nr as d,
    zr as e,
    gr as f,
    jr as g,
    cr as h,
    lt as i,
    Vr as j,
    J as k,
    Dr as l,
    it as m,
    ir as n,
    ut as o,
    ct as p,
    W as q,
    Ur as r,
    Lr as s,
    lr as t,
    Fr as u,
    st as v,
    pe as w,
    Wr as x,
    Ir as y,
    Gr as z,
};
