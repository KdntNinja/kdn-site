import {
    P as q,
    s as M,
    I as p,
    i as A,
    f as m,
    B as g,
    k as N,
    w as b,
    C as R,
    q as j,
    v as D,
    e as z,
    c as H,
    b as I,
    x as k,
    Q as O,
    u as Q,
    y as E,
    z as L,
    A as v,
    H as F,
} from "./scheduler.CCxz69I-.js";
import { S as G, i as J, g as K, b as _, f as U, t as d } from "./index.BXRlT4_D.js";
import { g as V } from "./spread.CgU5AtxT.js";
import { m as W, d as X } from "./routes.CVgu8Yrj.js";
import { c as Y } from "./attrs.BDvkrEDx.js";
function Z() {
    return {
        elements: {
            root: W("label", {
                action: (e) => ({
                    destroy: X(e, "mousedown", (l) => {
                        !l.defaultPrevented && l.detail > 1 && l.preventDefault();
                    }),
                }),
            }),
        },
    };
}
function w() {
    const s = q();
    return (e) => {
        const { originalEvent: t } = e.detail,
            { cancelable: l } = e,
            n = t.type;
        s(n, { originalEvent: t, currentTarget: t.currentTarget }, { cancelable: l }) || e.preventDefault();
    };
}
function x() {
    const s = "label",
        t = Y(s, ["root"]);
    return { NAME: s, getAttrs: t };
}
const $ = (s) => ({ builder: s & 4 }),
    C = (s) => ({ builder: s[2] }),
    ee = (s) => ({ builder: s & 4 }),
    y = (s) => ({ builder: s[2] });
function te(s) {
    let e, t, l, n;
    const u = s[8].default,
        a = D(u, s, s[7], C);
    let f = [s[2], s[5]],
        r = {};
    for (let o = 0; o < f.length; o += 1) r = b(r, f[o]);
    return {
        c() {
            (e = z("label")), a && a.c(), this.h();
        },
        l(o) {
            e = H(o, "LABEL", {});
            var i = I(e);
            a && a.l(i), i.forEach(m), this.h();
        },
        h() {
            k(e, r);
        },
        m(o, i) {
            A(o, e, i),
                a && a.m(e, null),
                s[9](e),
                (t = !0),
                l || ((n = [O(s[2].action(e)), Q(e, "m-mousedown", s[4])]), (l = !0));
        },
        p(o, i) {
            a && a.p && (!t || i & 132) && E(a, u, o, o[7], t ? v(u, o[7], i, $) : L(o[7]), C),
                k(e, (r = V(f, [i & 4 && o[2], i & 32 && o[5]])));
        },
        i(o) {
            t || (d(a, o), (t = !0));
        },
        o(o) {
            _(a, o), (t = !1);
        },
        d(o) {
            o && m(e), a && a.d(o), s[9](null), (l = !1), F(n);
        },
    };
}
function se(s) {
    let e;
    const t = s[8].default,
        l = D(t, s, s[7], y);
    return {
        c() {
            l && l.c();
        },
        l(n) {
            l && l.l(n);
        },
        m(n, u) {
            l && l.m(n, u), (e = !0);
        },
        p(n, u) {
            l && l.p && (!e || u & 132) && E(l, t, n, n[7], e ? v(t, n[7], u, ee) : L(n[7]), y);
        },
        i(n) {
            e || (d(l, n), (e = !0));
        },
        o(n) {
            _(l, n), (e = !1);
        },
        d(n) {
            l && l.d(n);
        },
    };
}
function le(s) {
    let e, t, l, n;
    const u = [se, te],
        a = [];
    function f(r, o) {
        return r[1] ? 0 : 1;
    }
    return (
        (e = f(s)),
        (t = a[e] = u[e](s)),
        {
            c() {
                t.c(), (l = p());
            },
            l(r) {
                t.l(r), (l = p());
            },
            m(r, o) {
                a[e].m(r, o), A(r, l, o), (n = !0);
            },
            p(r, [o]) {
                let i = e;
                (e = f(r)),
                    e === i
                        ? a[e].p(r, o)
                        : (K(),
                          _(a[i], 1, 1, () => {
                              a[i] = null;
                          }),
                          U(),
                          (t = a[e]),
                          t ? t.p(r, o) : ((t = a[e] = u[e](r)), t.c()),
                          d(t, 1),
                          t.m(l.parentNode, l));
            },
            i(r) {
                n || (d(t), (n = !0));
            },
            o(r) {
                _(t), (n = !1);
            },
            d(r) {
                r && m(l), a[e].d(r);
            },
        }
    );
}
function oe(s, e, t) {
    let l;
    const n = ["asChild", "el"];
    let u = g(e, n),
        a,
        { $$slots: f = {}, $$scope: r } = e,
        { asChild: o = !1 } = e,
        { el: i = void 0 } = e;
    const {
        elements: { root: h },
    } = Z();
    N(s, h, (c) => t(6, (a = c)));
    const P = w(),
        { getAttrs: S } = x(),
        T = S("root");
    function B(c) {
        j[c ? "unshift" : "push"](() => {
            (i = c), t(0, i);
        });
    }
    return (
        (s.$$set = (c) => {
            (e = b(b({}, e), R(c))),
                t(5, (u = g(e, n))),
                "asChild" in c && t(1, (o = c.asChild)),
                "el" in c && t(0, (i = c.el)),
                "$$scope" in c && t(7, (r = c.$$scope));
        }),
        (s.$$.update = () => {
            s.$$.dirty & 64 && t(2, (l = a)), s.$$.dirty & 4 && Object.assign(l, T);
        }),
        [i, o, l, h, P, u, a, r, f, B]
    );
}
class ce extends G {
    constructor(e) {
        super(), J(this, e, oe, le, M, { asChild: 1, el: 0 });
    }
}
export { ce as L, w as c };
