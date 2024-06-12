import { s as z, w as u, B as m, C as k, G as b, v as B, y as N, z as j, A as C } from "./scheduler.CCxz69I-.js";
import { S, i as V, c as q, a as A, m as G, t as v, b as h, d as P } from "./index.BXRlT4_D.js";
import { g as D, a as E } from "./spread.CgU5AtxT.js";
import { c as g, B as F, b as H } from "./routes.DmSXBMY8.js";
function I(a) {
    let e;
    const o = a[5].default,
        s = B(o, a, a[8], null);
    return {
        c() {
            s && s.c();
        },
        l(n) {
            s && s.l(n);
        },
        m(n, t) {
            s && s.m(n, t), (e = !0);
        },
        p(n, t) {
            s && s.p && (!e || t & 256) && N(s, o, n, n[8], e ? C(o, n[8], t, null) : j(n[8]), null);
        },
        i(n) {
            e || (v(s, n), (e = !0));
        },
        o(n) {
            h(s, n), (e = !1);
        },
        d(n) {
            s && s.d(n);
        },
    };
}
function J(a) {
    let e, o;
    const s = [
        { builders: a[3] },
        { class: g(_({ variant: a[1], size: a[2], className: a[0] })) },
        { type: "button" },
        a[4],
    ];
    let n = { $$slots: { default: [I] }, $$scope: { ctx: a } };
    for (let t = 0; t < s.length; t += 1) n = u(n, s[t]);
    return (
        (e = new F({ props: n })),
        e.$on("click", a[6]),
        e.$on("keydown", a[7]),
        {
            c() {
                q(e.$$.fragment);
            },
            l(t) {
                A(e.$$.fragment, t);
            },
            m(t, i) {
                G(e, t, i), (o = !0);
            },
            p(t, [i]) {
                const l =
                    i & 31
                        ? D(s, [
                              i & 8 && { builders: t[3] },
                              i & 7 && { class: g(_({ variant: t[1], size: t[2], className: t[0] })) },
                              s[2],
                              i & 16 && E(t[4]),
                          ])
                        : {};
                i & 256 && (l.$$scope = { dirty: i, ctx: t }), e.$set(l);
            },
            i(t) {
                o || (v(e.$$.fragment, t), (o = !0));
            },
            o(t) {
                h(e.$$.fragment, t), (o = !1);
            },
            d(t) {
                P(e, t);
            },
        }
    );
}
function K(a, e, o) {
    const s = ["class", "variant", "size", "builders"];
    let n = m(e, s),
        { $$slots: t = {}, $$scope: i } = e,
        { class: l = void 0 } = e,
        { variant: c = "default" } = e,
        { size: f = "default" } = e,
        { builders: d = [] } = e;
    function p(r) {
        b.call(this, a, r);
    }
    function y(r) {
        b.call(this, a, r);
    }
    return (
        (a.$$set = (r) => {
            (e = u(u({}, e), k(r))),
                o(4, (n = m(e, s))),
                "class" in r && o(0, (l = r.class)),
                "variant" in r && o(1, (c = r.variant)),
                "size" in r && o(2, (f = r.size)),
                "builders" in r && o(3, (d = r.builders)),
                "$$scope" in r && o(8, (i = r.$$scope));
        }),
        [l, c, f, d, n, t, p, y, i]
    );
}
class R extends S {
    constructor(e) {
        super(), V(this, e, K, J, z, { class: 0, variant: 1, size: 2, builders: 3 });
    }
}
const _ = H({
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: { default: "h-10 px-4 py-2", sm: "h-9 rounded-md px-3", lg: "h-11 rounded-md px-8", icon: "h-10 w-10" },
    },
    defaultVariants: { variant: "default", size: "default" },
});
export { R as B, _ as b };
