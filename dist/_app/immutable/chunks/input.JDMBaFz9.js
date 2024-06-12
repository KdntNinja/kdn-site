import {
    s as y,
    v as L,
    w as h,
    e as k,
    c as D,
    b as V,
    f as v,
    x as m,
    i as w,
    y as J,
    z as K,
    A as M,
    B as _,
    C,
    N as b,
    u as r,
    n as p,
    H as Q,
    G as c,
} from "./scheduler.CCxz69I-.js";
import { S as I, i as P, t as X, b as Y } from "./index.BXRlT4_D.js";
import { g as S } from "./spread.CgU5AtxT.js";
import { c as g, r as Z } from "./routes.CVgu8Yrj.js";
import { G as x, g as $, l as ee, a as se, d as te, e as le, f as ne } from "./firebase.CPJmnSU3.js";
function ae(s) {
    let e, o, i;
    const d = s[3].default,
        a = L(d, s, s[2], null);
    let u = [{ class: (o = g("flex items-center p-6 pt-0", s[0])) }, s[1]],
        n = {};
    for (let l = 0; l < u.length; l += 1) n = h(n, u[l]);
    return {
        c() {
            (e = k("div")), a && a.c(), this.h();
        },
        l(l) {
            e = D(l, "DIV", { class: !0 });
            var f = V(e);
            a && a.l(f), f.forEach(v), this.h();
        },
        h() {
            m(e, n);
        },
        m(l, f) {
            w(l, e, f), a && a.m(e, null), (i = !0);
        },
        p(l, [f]) {
            a && a.p && (!i || f & 4) && J(a, d, l, l[2], i ? M(d, l[2], f, null) : K(l[2]), null),
                m(
                    e,
                    (n = S(u, [
                        (!i || (f & 1 && o !== (o = g("flex items-center p-6 pt-0", l[0])))) && { class: o },
                        f & 2 && l[1],
                    ])),
                );
        },
        i(l) {
            i || (X(a, l), (i = !0));
        },
        o(l) {
            Y(a, l), (i = !1);
        },
        d(l) {
            l && v(e), a && a.d(l);
        },
    };
}
function oe(s, e, o) {
    const i = ["class"];
    let d = _(e, i),
        { $$slots: a = {}, $$scope: u } = e,
        { class: n = void 0 } = e;
    return (
        (s.$$set = (l) => {
            (e = h(h({}, e), C(l))),
                o(1, (d = _(e, i))),
                "class" in l && o(0, (n = l.class)),
                "$$scope" in l && o(2, (u = l.$$scope));
        }),
        [n, d, u, a]
    );
}
class me extends I {
    constructor(e) {
        super(), P(this, e, oe, ae, y, { class: 0 });
    }
}
const _e = "" + new URL("../assets/Google.B9qdDu9j.svg", import.meta.url).href,
    ge = async () => {
        const s = new x(),
            e = $();
        try {
            const i = (await ee(se, s)).user;
            if (i) {
                const d = te(e, "users", i.uid);
                (await le(d)).exists() || (await ne(d, { group: "default", isAdmin: !1 }, { merge: !0 }));
            }
            window.location.href = Z.POSTS;
        } catch (o) {
            console.error(o);
        }
    };
function ie(s) {
    let e,
        o,
        i,
        d,
        a = [
            {
                class: (o = g(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    s[1],
                )),
            },
            { readOnly: s[2] },
            s[3],
        ],
        u = {};
    for (let n = 0; n < a.length; n += 1) u = h(u, a[n]);
    return {
        c() {
            (e = k("input")), this.h();
        },
        l(n) {
            (e = D(n, "INPUT", { class: !0 })), this.h();
        },
        h() {
            m(e, u);
        },
        m(n, l) {
            w(n, e, l),
                e.autofocus && e.focus(),
                b(e, s[0]),
                i ||
                    ((d = [
                        r(e, "input", s[20]),
                        r(e, "blur", s[4]),
                        r(e, "change", s[5]),
                        r(e, "click", s[6]),
                        r(e, "focus", s[7]),
                        r(e, "focusin", s[8]),
                        r(e, "focusout", s[9]),
                        r(e, "keydown", s[10]),
                        r(e, "keypress", s[11]),
                        r(e, "keyup", s[12]),
                        r(e, "mouseover", s[13]),
                        r(e, "mouseenter", s[14]),
                        r(e, "mouseleave", s[15]),
                        r(e, "mousemove", s[16]),
                        r(e, "paste", s[17]),
                        r(e, "input", s[18]),
                        r(e, "wheel", s[19], { passive: !0 }),
                    ]),
                    (i = !0));
        },
        p(n, [l]) {
            m(
                e,
                (u = S(a, [
                    l & 2 &&
                        o !==
                            (o = g(
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                n[1],
                            )) && { class: o },
                    l & 4 && { readOnly: n[2] },
                    l & 8 && n[3],
                ])),
            ),
                l & 1 && e.value !== n[0] && b(e, n[0]);
        },
        i: p,
        o: p,
        d(n) {
            n && v(e), (i = !1), Q(d);
        },
    };
}
function re(s, e, o) {
    const i = ["class", "value", "readonly"];
    let d = _(e, i),
        { class: a = void 0 } = e,
        { value: u = void 0 } = e,
        { readonly: n = void 0 } = e;
    function l(t) {
        c.call(this, s, t);
    }
    function f(t) {
        c.call(this, s, t);
    }
    function G(t) {
        c.call(this, s, t);
    }
    function N(t) {
        c.call(this, s, t);
    }
    function A(t) {
        c.call(this, s, t);
    }
    function O(t) {
        c.call(this, s, t);
    }
    function q(t) {
        c.call(this, s, t);
    }
    function B(t) {
        c.call(this, s, t);
    }
    function R(t) {
        c.call(this, s, t);
    }
    function T(t) {
        c.call(this, s, t);
    }
    function U(t) {
        c.call(this, s, t);
    }
    function W(t) {
        c.call(this, s, t);
    }
    function j(t) {
        c.call(this, s, t);
    }
    function z(t) {
        c.call(this, s, t);
    }
    function E(t) {
        c.call(this, s, t);
    }
    function F(t) {
        c.call(this, s, t);
    }
    function H() {
        (u = this.value), o(0, u);
    }
    return (
        (s.$$set = (t) => {
            (e = h(h({}, e), C(t))),
                o(3, (d = _(e, i))),
                "class" in t && o(1, (a = t.class)),
                "value" in t && o(0, (u = t.value)),
                "readonly" in t && o(2, (n = t.readonly));
        }),
        [u, a, n, d, l, f, G, N, A, O, q, B, R, T, U, W, j, z, E, F, H]
    );
}
class ve extends I {
    constructor(e) {
        super(), P(this, e, re, ie, y, { class: 1, value: 0, readonly: 2 });
    }
}
export { me as C, ve as I, ge as c, _e as g };
