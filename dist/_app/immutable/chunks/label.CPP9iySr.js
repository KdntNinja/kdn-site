import { s as d, w as c, B as m, C as b, G as g, v as h, y as v, z as $, A as L } from "./scheduler.CCxz69I-.js";
import { S as w, i as C, c as S, a as j, m as q, t as _, b as f, d as z } from "./index.BXRlT4_D.js";
import { g as A, a as B } from "./spread.CgU5AtxT.js";
import { c as u } from "./routes.CVgu8Yrj.js";
import { L as G } from "./label.BWluq0Fw.js";
function N(o) {
    let e;
    const l = o[2].default,
        a = h(l, o, o[4], null);
    return {
        c() {
            a && a.c();
        },
        l(s) {
            a && a.l(s);
        },
        m(s, t) {
            a && a.m(s, t), (e = !0);
        },
        p(s, t) {
            a && a.p && (!e || t & 16) && v(a, l, s, s[4], e ? L(l, s[4], t, null) : $(s[4]), null);
        },
        i(s) {
            e || (_(a, s), (e = !0));
        },
        o(s) {
            f(a, s), (e = !1);
        },
        d(s) {
            a && a.d(s);
        },
    };
}
function P(o) {
    let e, l;
    const a = [
        {
            class: u(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                o[0],
            ),
        },
        o[1],
    ];
    let s = { $$slots: { default: [N] }, $$scope: { ctx: o } };
    for (let t = 0; t < a.length; t += 1) s = c(s, a[t]);
    return (
        (e = new G({ props: s })),
        e.$on("mousedown", o[3]),
        {
            c() {
                S(e.$$.fragment);
            },
            l(t) {
                j(e.$$.fragment, t);
            },
            m(t, n) {
                q(e, t, n), (l = !0);
            },
            p(t, [n]) {
                const i =
                    n & 3
                        ? A(a, [
                              n & 1 && {
                                  class: u(
                                      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                      t[0],
                                  ),
                              },
                              n & 2 && B(t[1]),
                          ])
                        : {};
                n & 16 && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
            },
            i(t) {
                l || (_(e.$$.fragment, t), (l = !0));
            },
            o(t) {
                f(e.$$.fragment, t), (l = !1);
            },
            d(t) {
                z(e, t);
            },
        }
    );
}
function k(o, e, l) {
    const a = ["class"];
    let s = m(e, a),
        { $$slots: t = {}, $$scope: n } = e,
        { class: i = void 0 } = e;
    function p(r) {
        g.call(this, o, r);
    }
    return (
        (o.$$set = (r) => {
            (e = c(c({}, e), b(r))),
                l(1, (s = m(e, a))),
                "class" in r && l(0, (i = r.class)),
                "$$scope" in r && l(4, (n = r.$$scope));
        }),
        [i, s, t, p, n]
    );
}
class I extends w {
    constructor(e) {
        super(), C(this, e, k, P, d, { class: 0 });
    }
}
export { I as L };
