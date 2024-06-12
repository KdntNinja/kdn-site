import { s as p, w as c, B as f, C as z, G as h, v as A, y as G, z as w, A as D } from "./scheduler.CCxz69I-.js";
import { S as k, i as y, c as S, a as B, m as N, t as m, b as g, d as j } from "./index.BXRlT4_D.js";
import { g as C, a as P } from "./spread.CgU5AtxT.js";
import { c as d, B as E, b as F } from "./routes.CVgu8Yrj.js";
import { S as H } from "./separator.4n1iTp9H.js";
function I(a) {
    let t;
    const o = a[5].default,
        s = A(o, a, a[8], null);
    return {
        c() {
            s && s.c();
        },
        l(r) {
            s && s.l(r);
        },
        m(r, e) {
            s && s.m(r, e), (t = !0);
        },
        p(r, e) {
            s && s.p && (!t || e & 256) && G(s, o, r, r[8], t ? D(o, r[8], e, null) : w(r[8]), null);
        },
        i(r) {
            t || (m(s, r), (t = !0));
        },
        o(r) {
            g(s, r), (t = !1);
        },
        d(r) {
            s && s.d(r);
        },
    };
}
function J(a) {
    let t, o;
    const s = [
        { builders: a[3] },
        { class: d(_({ variant: a[1], size: a[2], className: a[0] })) },
        { type: "button" },
        a[4],
    ];
    let r = { $$slots: { default: [I] }, $$scope: { ctx: a } };
    for (let e = 0; e < s.length; e += 1) r = c(r, s[e]);
    return (
        (t = new E({ props: r })),
        t.$on("click", a[6]),
        t.$on("keydown", a[7]),
        {
            c() {
                S(t.$$.fragment);
            },
            l(e) {
                B(t.$$.fragment, e);
            },
            m(e, n) {
                N(t, e, n), (o = !0);
            },
            p(e, [n]) {
                const l =
                    n & 31
                        ? C(s, [
                              n & 8 && { builders: e[3] },
                              n & 7 && { class: d(_({ variant: e[1], size: e[2], className: e[0] })) },
                              s[2],
                              n & 16 && P(e[4]),
                          ])
                        : {};
                n & 256 && (l.$$scope = { dirty: n, ctx: e }), t.$set(l);
            },
            i(e) {
                o || (m(t.$$.fragment, e), (o = !0));
            },
            o(e) {
                g(t.$$.fragment, e), (o = !1);
            },
            d(e) {
                j(t, e);
            },
        }
    );
}
function K(a, t, o) {
    const s = ["class", "variant", "size", "builders"];
    let r = f(t, s),
        { $$slots: e = {}, $$scope: n } = t,
        { class: l = void 0 } = t,
        { variant: u = "default" } = t,
        { size: b = "default" } = t,
        { builders: v = [] } = t;
    function V(i) {
        h.call(this, a, i);
    }
    function q(i) {
        h.call(this, a, i);
    }
    return (
        (a.$$set = (i) => {
            (t = c(c({}, t), z(i))),
                o(4, (r = f(t, s))),
                "class" in i && o(0, (l = i.class)),
                "variant" in i && o(1, (u = i.variant)),
                "size" in i && o(2, (b = i.size)),
                "builders" in i && o(3, (v = i.builders)),
                "$$scope" in i && o(8, (n = i.$$scope));
        }),
        [l, u, b, v, r, e, V, q, n]
    );
}
class W extends k {
    constructor(t) {
        super(), y(this, t, K, J, p, { class: 0, variant: 1, size: 2, builders: 3 });
    }
}
const _ = F({
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9",
        },
    },
    defaultVariants: { variant: "default", size: "default" },
});
function L(a) {
    let t, o;
    const s = [
        { class: d("shrink-0 bg-border", a[1] === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", a[0]) },
        { orientation: a[1] },
        { decorative: a[2] },
        a[3],
    ];
    let r = {};
    for (let e = 0; e < s.length; e += 1) r = c(r, s[e]);
    return (
        (t = new H({ props: r })),
        {
            c() {
                S(t.$$.fragment);
            },
            l(e) {
                B(t.$$.fragment, e);
            },
            m(e, n) {
                N(t, e, n), (o = !0);
            },
            p(e, [n]) {
                const l =
                    n & 15
                        ? C(s, [
                              n & 3 && {
                                  class: d(
                                      "shrink-0 bg-border",
                                      e[1] === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                                      e[0],
                                  ),
                              },
                              n & 2 && { orientation: e[1] },
                              n & 4 && { decorative: e[2] },
                              n & 8 && P(e[3]),
                          ])
                        : {};
                t.$set(l);
            },
            i(e) {
                o || (m(t.$$.fragment, e), (o = !0));
            },
            o(e) {
                g(t.$$.fragment, e), (o = !1);
            },
            d(e) {
                j(t, e);
            },
        }
    );
}
function M(a, t, o) {
    const s = ["class", "orientation", "decorative"];
    let r = f(t, s),
        { class: e = void 0 } = t,
        { orientation: n = "horizontal" } = t,
        { decorative: l = void 0 } = t;
    return (
        (a.$$set = (u) => {
            (t = c(c({}, t), z(u))),
                o(3, (r = f(t, s))),
                "class" in u && o(0, (e = u.class)),
                "orientation" in u && o(1, (n = u.orientation)),
                "decorative" in u && o(2, (l = u.decorative));
        }),
        [e, n, l, r]
    );
}
class X extends k {
    constructor(t) {
        super(), y(this, t, M, L, p, { class: 0, orientation: 1, decorative: 2 });
    }
}
export { W as B, X as S };
