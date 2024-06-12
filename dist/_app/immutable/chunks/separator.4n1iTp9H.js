import {
    s as z,
    I as y,
    i as O,
    f as _,
    B as v,
    k as D,
    w as m,
    C as M,
    q as R,
    e as T,
    c as q,
    b as B,
    x as A,
    Q as I,
    n as S,
    v as U,
    y as j,
    z as G,
    A as K,
} from "./scheduler.CCxz69I-.js";
import { S as Q, i as V, g as W, b as h, f as F, t as b } from "./index.BXRlT4_D.js";
import { g as H } from "./spread.CgU5AtxT.js";
import { w as J, m as L } from "./routes.CVgu8Yrj.js";
import { w as X } from "./entry.CzViBFHa.js";
import { c as Y } from "./attrs.BDvkrEDx.js";
function Z(n) {
    const t = {};
    return (
        Object.keys(n).forEach((e) => {
            const o = e,
                r = n[o];
            t[o] = J(X(r));
        }),
        t
    );
}
const w = { orientation: "horizontal", decorative: !1 },
    x = (n) => {
        const t = { ...w, ...n },
            e = Z(t),
            { orientation: o, decorative: r } = e;
        return {
            elements: {
                root: L("separator", {
                    stores: [o, r],
                    returned: ([i, c]) => ({
                        role: c ? "none" : "separator",
                        "aria-orientation": i === "vertical" ? i : void 0,
                        "aria-hidden": c,
                        "data-orientation": i,
                    }),
                }),
            },
            options: e,
        };
    };
function $(n) {
    const t = {};
    for (const e in n) {
        const o = n[e];
        o !== void 0 && (t[e] = o);
    }
    return t;
}
function tt(n) {
    return function (t, e) {
        if (e === void 0) return;
        const o = n[t];
        o && o.set(e);
    };
}
function et() {
    return { NAME: "separator", PARTS: ["root"] };
}
function ot(n) {
    const { NAME: t, PARTS: e } = et(),
        o = Y(t, e),
        r = { ...x($(n)), getAttrs: o };
    return { ...r, updateOption: tt(r.options) };
}
const nt = (n) => ({ builder: n & 4 }),
    C = (n) => ({ builder: n[2] });
function rt(n) {
    let t,
        e,
        o,
        r = [n[2], n[4]],
        a = {};
    for (let i = 0; i < r.length; i += 1) a = m(a, r[i]);
    return {
        c() {
            (t = T("div")), this.h();
        },
        l(i) {
            (t = q(i, "DIV", {})), B(t).forEach(_), this.h();
        },
        h() {
            A(t, a);
        },
        m(i, c) {
            O(i, t, c), n[10](t), e || ((o = I(n[2].action(t))), (e = !0));
        },
        p(i, c) {
            A(t, (a = H(r, [c & 4 && i[2], c & 16 && i[4]])));
        },
        i: S,
        o: S,
        d(i) {
            i && _(t), n[10](null), (e = !1), o();
        },
    };
}
function it(n) {
    let t;
    const e = n[9].default,
        o = U(e, n, n[8], C);
    return {
        c() {
            o && o.c();
        },
        l(r) {
            o && o.l(r);
        },
        m(r, a) {
            o && o.m(r, a), (t = !0);
        },
        p(r, a) {
            o && o.p && (!t || a & 260) && j(o, e, r, r[8], t ? K(e, r[8], a, nt) : G(r[8]), C);
        },
        i(r) {
            t || (b(o, r), (t = !0));
        },
        o(r) {
            h(o, r), (t = !1);
        },
        d(r) {
            o && o.d(r);
        },
    };
}
function st(n) {
    let t, e, o, r;
    const a = [it, rt],
        i = [];
    function c(s, u) {
        return s[1] ? 0 : 1;
    }
    return (
        (t = c(n)),
        (e = i[t] = a[t](n)),
        {
            c() {
                e.c(), (o = y());
            },
            l(s) {
                e.l(s), (o = y());
            },
            m(s, u) {
                i[t].m(s, u), O(s, o, u), (r = !0);
            },
            p(s, [u]) {
                let f = t;
                (t = c(s)),
                    t === f
                        ? i[t].p(s, u)
                        : (W(),
                          h(i[f], 1, 1, () => {
                              i[f] = null;
                          }),
                          F(),
                          (e = i[t]),
                          e ? e.p(s, u) : ((e = i[t] = a[t](s)), e.c()),
                          b(e, 1),
                          e.m(o.parentNode, o));
            },
            i(s) {
                r || (b(e), (r = !0));
            },
            o(s) {
                h(e), (r = !1);
            },
            d(s) {
                s && _(o), i[t].d(s);
            },
        }
    );
}
function at(n, t, e) {
    let o;
    const r = ["orientation", "decorative", "asChild", "el"];
    let a = v(t, r),
        i,
        { $$slots: c = {}, $$scope: s } = t,
        { orientation: u = "horizontal" } = t,
        { decorative: f = !0 } = t,
        { asChild: p = !1 } = t,
        { el: d = void 0 } = t;
    const {
        elements: { root: g },
        updateOption: k,
        getAttrs: E,
    } = ot({ orientation: u, decorative: f });
    D(n, g, (l) => e(7, (i = l)));
    const N = E("root");
    function P(l) {
        R[l ? "unshift" : "push"](() => {
            (d = l), e(0, d);
        });
    }
    return (
        (n.$$set = (l) => {
            (t = m(m({}, t), M(l))),
                e(4, (a = v(t, r))),
                "orientation" in l && e(5, (u = l.orientation)),
                "decorative" in l && e(6, (f = l.decorative)),
                "asChild" in l && e(1, (p = l.asChild)),
                "el" in l && e(0, (d = l.el)),
                "$$scope" in l && e(8, (s = l.$$scope));
        }),
        (n.$$.update = () => {
            n.$$.dirty & 32 && k("orientation", u),
                n.$$.dirty & 64 && k("decorative", f),
                n.$$.dirty & 128 && e(2, (o = i)),
                n.$$.dirty & 4 && Object.assign(o, N);
        }),
        [d, p, o, g, a, u, f, i, s, c, P]
    );
}
class mt extends Q {
    constructor(t) {
        super(), V(this, t, at, st, z, { orientation: 5, decorative: 6, asChild: 1, el: 0 });
    }
}
export { mt as S, tt as g, $ as r, Z as t };
