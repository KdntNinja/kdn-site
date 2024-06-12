import {
    s as H,
    v as ce,
    y as me,
    z as de,
    A as _e,
    k as Z,
    n as j,
    a9 as oe,
    w as P,
    B as x,
    C as be,
    e as V,
    c as z,
    b as X,
    f as b,
    l as B,
    i as E,
    x as ue,
    N as fe,
    u as h,
    H as ve,
    G as k,
    a as N,
    g as S,
    p as Ve,
    h as O,
    aa as Ge,
    Q as Je,
    o as Qe,
    I as Ae,
    J as Xe,
    t as K,
    d as W,
    ab as he,
    M as Ke,
    q as we,
    r as ke,
} from "../chunks/scheduler.CCxz69I-.js";
import {
    S as G,
    i as J,
    t as g,
    b as $,
    c as y,
    a as I,
    m as D,
    d as U,
    g as We,
    f as Ye,
    e as ye,
} from "../chunks/index.BXRlT4_D.js";
import { e as Te } from "../chunks/each.DUCJrQqa.js";
import { g as ee, a as re } from "../chunks/spread.CgU5AtxT.js";
import {
    g as Ze,
    s as xe,
    e as et,
    a as ie,
    L as tt,
    b as st,
    F as nt,
    z as ne,
    c as rt,
    d as at,
    f as lt,
    C as Ie,
    h as ze,
    i as De,
    j as ot,
} from "../chunks/index.CF5a0hBY.js";
import { c as R, r as it } from "../chunks/routes.DmSXBMY8.js";
import { w as Y, g as ut } from "../chunks/entry.DdXd1qz9.js";
import { B as Me, S as ft } from "../chunks/separator.eJqoy7Lz.js";
import {
    m as Ce,
    o as ct,
    d as qe,
    k as $e,
    n as mt,
    j as dt,
    q as _t,
    w as pt,
    i as gt,
    f as ht,
} from "../chunks/firebase.CPJmnSU3.js";
const $t = (t) => ({ value: t & 4, errors: t & 128, tainted: t & 256, constraints: t & 3 }),
    Ne = (t) => ({ value: t[2], errors: t[7], tainted: t[8], constraints: t[1][t[0]] });
function bt(t) {
    let e;
    const n = t[21].default,
        s = ce(n, t, t[20], Ne);
    return {
        c() {
            s && s.c();
        },
        l(l) {
            s && s.l(l);
        },
        m(l, r) {
            s && s.m(l, r), (e = !0);
        },
        p(l, [r]) {
            s && s.p && (!e || r & 1048967) && me(s, n, l, l[20], e ? _e(n, l[20], r, $t) : de(l[20]), Ne);
        },
        i(l) {
            e || (g(s, l), (e = !0));
        },
        o(l) {
            $(s, l), (e = !1);
        },
        d(l) {
            s && s.d(l);
        },
    };
}
function vt(t) {
    const [e, n] = t.split(/[[\]]/);
    return [e, n];
}
function wt(t, e, n) {
    let s,
        l,
        r,
        a,
        o,
        i,
        u,
        f = j,
        c = () => (f(), (f = oe(a, (F) => n(15, (u = F)))), a),
        p,
        T,
        C,
        L = j,
        w = () => (L(), (L = oe(r, (F) => n(18, (C = F)))), r),
        v,
        d = j,
        A = () => (d(), (d = oe(l, (F) => n(1, (v = F)))), l),
        q,
        m = j,
        ae = () => (m(), (m = oe(s, (F) => n(19, (q = F)))), s),
        te,
        M;
    t.$$.on_destroy.push(() => f()),
        t.$$.on_destroy.push(() => L()),
        t.$$.on_destroy.push(() => d()),
        t.$$.on_destroy.push(() => m());
    let { $$slots: _ = {}, $$scope: Ue } = e,
        { form: le } = e,
        { name: Q } = e;
    const { descriptionId: Ee } = Ze();
    Z(t, Ee, (F) => n(16, (p = F)));
    const se = {
            name: Y(o),
            errors: Y([]),
            constraints: Y({}),
            tainted: Y(!1),
            fieldErrorsId: Y(),
            descriptionId: Y(p),
            form: le,
        },
        { tainted: pe, errors: ge, descriptionId: Fe } = se;
    return (
        Z(t, pe, (F) => n(8, (M = F))),
        Z(t, ge, (F) => n(7, (te = F))),
        Z(t, Fe, (F) => n(17, (T = F))),
        xe(se),
        (t.$$set = (F) => {
            "form" in F && n(13, (le = F.form)),
                "name" in F && n(0, (Q = F.name)),
                "$$scope" in F && n(20, (Ue = F.$$scope));
        }),
        (t.$$.update = () => {
            t.$$.dirty & 8192 &&
                ae(
                    n(
                        6,
                        ({ errors: s, constraints: l, tainted: r, form: a } = le),
                        s,
                        A(n(5, l)),
                        w(n(4, r)),
                        c(n(3, a)),
                    ),
                ),
                t.$$.dirty & 1 && n(14, ([o] = vt(Q)), o),
                t.$$.dirty & 16384 && se.name.set(o),
                t.$$.dirty & 524289 && ge.set(et(ie(Q, q))),
                t.$$.dirty & 3 && se.constraints.set(ie(Q, v) ?? {}),
                t.$$.dirty & 262145 && pe.set(C ? ie(Q, C) === !0 : !1),
                t.$$.dirty & 196608 && !T && p && se.descriptionId.set(p),
                t.$$.dirty & 32769 && n(2, (i = ie(Q, u)));
        }),
        [Q, v, i, a, r, l, s, te, M, Ee, pe, ge, Fe, le, o, u, p, T, C, q, Ue, _]
    );
}
class kt extends G {
    constructor(e) {
        super(), J(this, e, wt, bt, H, { form: 13, name: 0 });
    }
}
const yt = (t) => ({}),
    Se = (t) => ({ labelAttrs: t[2] });
function It(t) {
    let e;
    const n = t[4].default,
        s = ce(n, t, t[5], Se);
    return {
        c() {
            s && s.c();
        },
        l(l) {
            s && s.l(l);
        },
        m(l, r) {
            s && s.m(l, r), (e = !0);
        },
        p(l, r) {
            s && s.p && (!e || r & 32) && me(s, n, l, l[5], e ? _e(n, l[5], r, yt) : de(l[5]), Se);
        },
        i(l) {
            e || (g(s, l), (e = !0));
        },
        o(l) {
            $(s, l), (e = !1);
        },
        d(l) {
            s && s.d(l);
        },
    };
}
function Dt(t) {
    let e, n;
    const s = [t[1], { class: R("data-[fs-error]:text-destructive", t[0]) }, t[3]];
    let l = { $$slots: { default: [It] }, $$scope: { ctx: t } };
    for (let r = 0; r < s.length; r += 1) l = P(l, s[r]);
    return (
        (e = new tt({ props: l })),
        {
            c() {
                y(e.$$.fragment);
            },
            l(r) {
                I(e.$$.fragment, r);
            },
            m(r, a) {
                D(e, r, a), (n = !0);
            },
            p(r, [a]) {
                const o =
                    a & 11
                        ? ee(s, [
                              a & 2 && re(r[1]),
                              a & 1 && { class: R("data-[fs-error]:text-destructive", r[0]) },
                              a & 8 && re(r[3]),
                          ])
                        : {};
                a & 32 && (o.$$scope = { dirty: a, ctx: r }), e.$set(o);
            },
            i(r) {
                n || (g(e.$$.fragment, r), (n = !0));
            },
            o(r) {
                $(e.$$.fragment, r), (n = !1);
            },
            d(r) {
                U(e, r);
            },
        }
    );
}
function Ut(t, e, n) {
    const s = ["class"];
    let l = x(e, s),
        r,
        { $$slots: a = {}, $$scope: o } = e,
        { class: i = void 0 } = e;
    const { labelAttrs: u } = st();
    return (
        Z(t, u, (f) => n(1, (r = f))),
        (t.$$set = (f) => {
            (e = P(P({}, e), be(f))),
                n(3, (l = x(e, s))),
                "class" in f && n(0, (i = f.class)),
                "$$scope" in f && n(5, (o = f.$$scope));
        }),
        [i, r, u, l, a, o]
    );
}
class je extends G {
    constructor(e) {
        super(), J(this, e, Ut, Dt, H, { class: 0 });
    }
}
const Et = (t) => ({ constraints: t & 32, errors: t & 64, tainted: t & 128, value: t & 256 }),
    Le = (t) => ({ constraints: t[5], errors: t[6], tainted: t[7], value: t[8] });
function Ft(t) {
    let e, n, s;
    const l = t[3].default,
        r = ce(l, t, t[4], Le);
    return {
        c() {
            (e = V("div")), r && r.c(), this.h();
        },
        l(a) {
            e = z(a, "DIV", { class: !0 });
            var o = X(e);
            r && r.l(o), o.forEach(b), this.h();
        },
        h() {
            B(e, "class", (n = R("space-y-2", t[2])));
        },
        m(a, o) {
            E(a, e, o), r && r.m(e, null), (s = !0);
        },
        p(a, o) {
            r && r.p && (!s || o & 496) && me(r, l, a, a[4], s ? _e(l, a[4], o, Et) : de(a[4]), Le),
                (!s || (o & 4 && n !== (n = R("space-y-2", a[2])))) && B(e, "class", n);
        },
        i(a) {
            s || (g(r, a), (s = !0));
        },
        o(a) {
            $(r, a), (s = !1);
        },
        d(a) {
            a && b(e), r && r.d(a);
        },
    };
}
function At(t) {
    let e, n;
    return (
        (e = new nt({
            props: {
                form: t[0],
                name: t[1],
                $$slots: {
                    default: [
                        Ft,
                        ({ constraints: s, errors: l, tainted: r, value: a }) => ({ 5: s, 6: l, 7: r, 8: a }),
                        ({ constraints: s, errors: l, tainted: r, value: a }) =>
                            (s ? 32 : 0) | (l ? 64 : 0) | (r ? 128 : 0) | (a ? 256 : 0),
                    ],
                },
                $$scope: { ctx: t },
            },
        })),
        {
            c() {
                y(e.$$.fragment);
            },
            l(s) {
                I(e.$$.fragment, s);
            },
            m(s, l) {
                D(e, s, l), (n = !0);
            },
            p(s, [l]) {
                const r = {};
                l & 1 && (r.form = s[0]),
                    l & 2 && (r.name = s[1]),
                    l & 500 && (r.$$scope = { dirty: l, ctx: s }),
                    e.$set(r);
            },
            i(s) {
                n || (g(e.$$.fragment, s), (n = !0));
            },
            o(s) {
                $(e.$$.fragment, s), (n = !1);
            },
            d(s) {
                U(e, s);
            },
        }
    );
}
function Tt(t, e, n) {
    let { $$slots: s = {}, $$scope: l } = e,
        { form: r } = e,
        { name: a } = e,
        { class: o = void 0 } = e;
    return (
        (t.$$set = (i) => {
            "form" in i && n(0, (r = i.form)),
                "name" in i && n(1, (a = i.name)),
                "class" in i && n(2, (o = i.class)),
                "$$scope" in i && n(4, (l = i.$$scope));
        }),
        [r, a, o, s, l]
    );
}
class Pe extends G {
    constructor(e) {
        super(), J(this, e, Tt, At, H, { form: 0, name: 1, class: 2 });
    }
}
const Ct = (t) => ({ constraints: t & 32, errors: t & 64, tainted: t & 128, value: t & 256 }),
    Re = (t) => ({ constraints: t[5], errors: t[6], tainted: t[7], value: t[8] });
function qt(t) {
    let e, n, s;
    const l = t[3].default,
        r = ce(l, t, t[4], Re);
    return {
        c() {
            (e = V("div")), r && r.c(), this.h();
        },
        l(a) {
            e = z(a, "DIV", { class: !0 });
            var o = X(e);
            r && r.l(o), o.forEach(b), this.h();
        },
        h() {
            B(e, "class", (n = R("space-y-2", t[2])));
        },
        m(a, o) {
            E(a, e, o), r && r.m(e, null), (s = !0);
        },
        p(a, o) {
            r && r.p && (!s || o & 496) && me(r, l, a, a[4], s ? _e(l, a[4], o, Ct) : de(a[4]), Re),
                (!s || (o & 4 && n !== (n = R("space-y-2", a[2])))) && B(e, "class", n);
        },
        i(a) {
            s || (g(r, a), (s = !0));
        },
        o(a) {
            $(r, a), (s = !1);
        },
        d(a) {
            a && b(e), r && r.d(a);
        },
    };
}
function Nt(t) {
    let e, n;
    return (
        (e = new kt({
            props: {
                form: t[0],
                name: t[1],
                $$slots: {
                    default: [
                        qt,
                        ({ constraints: s, errors: l, tainted: r, value: a }) => ({ 5: s, 6: l, 7: r, 8: a }),
                        ({ constraints: s, errors: l, tainted: r, value: a }) =>
                            (s ? 32 : 0) | (l ? 64 : 0) | (r ? 128 : 0) | (a ? 256 : 0),
                    ],
                },
                $$scope: { ctx: t },
            },
        })),
        {
            c() {
                y(e.$$.fragment);
            },
            l(s) {
                I(e.$$.fragment, s);
            },
            m(s, l) {
                D(e, s, l), (n = !0);
            },
            p(s, [l]) {
                const r = {};
                l & 1 && (r.form = s[0]),
                    l & 2 && (r.name = s[1]),
                    l & 500 && (r.$$scope = { dirty: l, ctx: s }),
                    e.$set(r);
            },
            i(s) {
                n || (g(e.$$.fragment, s), (n = !0));
            },
            o(s) {
                $(e.$$.fragment, s), (n = !1);
            },
            d(s) {
                U(e, s);
            },
        }
    );
}
function St(t, e, n) {
    let { $$slots: s = {}, $$scope: l } = e,
        { form: r } = e,
        { name: a } = e,
        { class: o = void 0 } = e;
    return (
        (t.$$set = (i) => {
            "form" in i && n(0, (r = i.form)),
                "name" in i && n(1, (a = i.name)),
                "class" in i && n(2, (o = i.class)),
                "$$scope" in i && n(4, (l = i.$$scope));
        }),
        [r, a, o, s, l]
    );
}
class Lt extends G {
    constructor(e) {
        super(), J(this, e, St, Nt, H, { form: 0, name: 1, class: 2 });
    }
}
function Pt(t) {
    let e,
        n,
        s,
        l,
        r = [
            {
                class: (n = R(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    t[1],
                )),
            },
            { readOnly: t[2] },
            t[3],
        ],
        a = {};
    for (let o = 0; o < r.length; o += 1) a = P(a, r[o]);
    return {
        c() {
            (e = V("input")), this.h();
        },
        l(o) {
            (e = z(o, "INPUT", { class: !0 })), this.h();
        },
        h() {
            ue(e, a);
        },
        m(o, i) {
            E(o, e, i),
                e.autofocus && e.focus(),
                fe(e, t[0]),
                s ||
                    ((l = [
                        h(e, "input", t[20]),
                        h(e, "blur", t[4]),
                        h(e, "change", t[5]),
                        h(e, "click", t[6]),
                        h(e, "focus", t[7]),
                        h(e, "focusin", t[8]),
                        h(e, "focusout", t[9]),
                        h(e, "keydown", t[10]),
                        h(e, "keypress", t[11]),
                        h(e, "keyup", t[12]),
                        h(e, "mouseover", t[13]),
                        h(e, "mouseenter", t[14]),
                        h(e, "mouseleave", t[15]),
                        h(e, "mousemove", t[16]),
                        h(e, "paste", t[17]),
                        h(e, "input", t[18]),
                        h(e, "wheel", t[19], { passive: !0 }),
                    ]),
                    (s = !0));
        },
        p(o, [i]) {
            ue(
                e,
                (a = ee(r, [
                    i & 2 &&
                        n !==
                            (n = R(
                                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                o[1],
                            )) && { class: n },
                    i & 4 && { readOnly: o[2] },
                    i & 8 && o[3],
                ])),
            ),
                i & 1 && e.value !== o[0] && fe(e, o[0]);
        },
        i: j,
        o: j,
        d(o) {
            o && b(e), (s = !1), ve(l);
        },
    };
}
function Rt(t, e, n) {
    const s = ["class", "value", "readonly"];
    let l = x(e, s),
        { class: r = void 0 } = e,
        { value: a = void 0 } = e,
        { readonly: o = void 0 } = e;
    function i(_) {
        k.call(this, t, _);
    }
    function u(_) {
        k.call(this, t, _);
    }
    function f(_) {
        k.call(this, t, _);
    }
    function c(_) {
        k.call(this, t, _);
    }
    function p(_) {
        k.call(this, t, _);
    }
    function T(_) {
        k.call(this, t, _);
    }
    function C(_) {
        k.call(this, t, _);
    }
    function L(_) {
        k.call(this, t, _);
    }
    function w(_) {
        k.call(this, t, _);
    }
    function v(_) {
        k.call(this, t, _);
    }
    function d(_) {
        k.call(this, t, _);
    }
    function A(_) {
        k.call(this, t, _);
    }
    function q(_) {
        k.call(this, t, _);
    }
    function m(_) {
        k.call(this, t, _);
    }
    function ae(_) {
        k.call(this, t, _);
    }
    function te(_) {
        k.call(this, t, _);
    }
    function M() {
        (a = this.value), n(0, a);
    }
    return (
        (t.$$set = (_) => {
            (e = P(P({}, e), be(_))),
                n(3, (l = x(e, s))),
                "class" in _ && n(1, (r = _.class)),
                "value" in _ && n(0, (a = _.value)),
                "readonly" in _ && n(2, (o = _.readonly));
        }),
        [a, r, o, l, i, u, f, c, p, T, C, L, w, v, d, A, q, m, ae, te, M]
    );
}
class He extends G {
    constructor(e) {
        super(), J(this, e, Rt, Pt, H, { class: 1, value: 0, readonly: 2 });
    }
}
function Ot(t) {
    let e,
        n,
        s,
        l,
        r = [
            {
                class: (n = R(
                    "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    t[1],
                )),
            },
            { readOnly: t[2] },
            t[3],
        ],
        a = {};
    for (let o = 0; o < r.length; o += 1) a = P(a, r[o]);
    return {
        c() {
            (e = V("textarea")), this.h();
        },
        l(o) {
            (e = z(o, "TEXTAREA", { class: !0 })), X(e).forEach(b), this.h();
        },
        h() {
            ue(e, a);
        },
        m(o, i) {
            E(o, e, i),
                e.autofocus && e.focus(),
                fe(e, t[0]),
                s ||
                    ((l = [
                        h(e, "input", t[16]),
                        h(e, "blur", t[4]),
                        h(e, "change", t[5]),
                        h(e, "click", t[6]),
                        h(e, "focus", t[7]),
                        h(e, "keydown", t[8]),
                        h(e, "keypress", t[9]),
                        h(e, "keyup", t[10]),
                        h(e, "mouseover", t[11]),
                        h(e, "mouseenter", t[12]),
                        h(e, "mouseleave", t[13]),
                        h(e, "paste", t[14]),
                        h(e, "input", t[15]),
                    ]),
                    (s = !0));
        },
        p(o, [i]) {
            ue(
                e,
                (a = ee(r, [
                    i & 2 &&
                        n !==
                            (n = R(
                                "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                o[1],
                            )) && { class: n },
                    i & 4 && { readOnly: o[2] },
                    i & 8 && o[3],
                ])),
            ),
                i & 1 && fe(e, o[0]);
        },
        i: j,
        o: j,
        d(o) {
            o && b(e), (s = !1), ve(l);
        },
    };
}
function Bt(t, e, n) {
    const s = ["class", "value", "readonly"];
    let l = x(e, s),
        { class: r = void 0 } = e,
        { value: a = void 0 } = e,
        { readonly: o = void 0 } = e;
    function i(m) {
        k.call(this, t, m);
    }
    function u(m) {
        k.call(this, t, m);
    }
    function f(m) {
        k.call(this, t, m);
    }
    function c(m) {
        k.call(this, t, m);
    }
    function p(m) {
        k.call(this, t, m);
    }
    function T(m) {
        k.call(this, t, m);
    }
    function C(m) {
        k.call(this, t, m);
    }
    function L(m) {
        k.call(this, t, m);
    }
    function w(m) {
        k.call(this, t, m);
    }
    function v(m) {
        k.call(this, t, m);
    }
    function d(m) {
        k.call(this, t, m);
    }
    function A(m) {
        k.call(this, t, m);
    }
    function q() {
        (a = this.value), n(0, a);
    }
    return (
        (t.$$set = (m) => {
            (e = P(P({}, e), be(m))),
                n(3, (l = x(e, s))),
                "class" in m && n(1, (r = m.class)),
                "value" in m && n(0, (a = m.value)),
                "readonly" in m && n(2, (o = m.readonly));
        }),
        [a, r, o, l, i, u, f, c, p, T, C, L, w, v, d, A, q]
    );
}
class Vt extends G {
    constructor(e) {
        super(), J(this, e, Bt, Ot, H, { class: 1, value: 0, readonly: 2 });
    }
}
function Oe(t, e, n) {
    const s = t.slice();
    return (s[15] = e[n]), (s[16] = e), (s[17] = n), s;
}
function zt(t) {
    let e;
    return {
        c() {
            e = K("Username");
        },
        l(n) {
            e = W(n, "Username");
        },
        m(n, s) {
            E(n, e, s);
        },
        d(n) {
            n && b(e);
        },
    };
}
function Mt(t) {
    let e, n, s, l, r;
    e = new je({ props: { $$slots: { default: [zt] }, $$scope: { ctx: t } } });
    const a = [{ placeholder: t[0] ? t[0].displayName || (t[0].email ? t[0].email.split("@")[0] : "") : "" }, t[18]];
    function o(u) {
        t[9](u);
    }
    let i = {};
    for (let u = 0; u < a.length; u += 1) i = P(i, a[u]);
    return (
        t[1].username !== void 0 && (i.value = t[1].username),
        (s = new He({ props: i })),
        we.push(() => ye(s, "value", o)),
        {
            c() {
                y(e.$$.fragment), (n = N()), y(s.$$.fragment);
            },
            l(u) {
                I(e.$$.fragment, u), (n = S(u)), I(s.$$.fragment, u);
            },
            m(u, f) {
                D(e, u, f), E(u, n, f), D(s, u, f), (r = !0);
            },
            p(u, f) {
                const c = {};
                f & 524288 && (c.$$scope = { dirty: f, ctx: u }), e.$set(c);
                const p =
                    f & 262145
                        ? ee(a, [
                              f & 1 && {
                                  placeholder: u[0]
                                      ? u[0].displayName || (u[0].email ? u[0].email.split("@")[0] : "")
                                      : "",
                              },
                              f & 262144 && re(u[18]),
                          ])
                        : {};
                !l && f & 2 && ((l = !0), (p.value = u[1].username), ke(() => (l = !1))), s.$set(p);
            },
            i(u) {
                r || (g(e.$$.fragment, u), g(s.$$.fragment, u), (r = !0));
            },
            o(u) {
                $(e.$$.fragment, u), $(s.$$.fragment, u), (r = !1);
            },
            d(u) {
                u && b(n), U(e, u), U(s, u);
            },
        }
    );
}
function jt(t) {
    let e;
    return {
        c() {
            e = K("This is your public display name. It can be your real name or a pseudonym.");
        },
        l(n) {
            e = W(n, "This is your public display name. It can be your real name or a pseudonym.");
        },
        m(n, s) {
            E(n, e, s);
        },
        d(n) {
            n && b(e);
        },
    };
}
function Ht(t) {
    let e, n, s, l, r, a;
    return (
        (e = new Ie({
            props: {
                $$slots: { default: [Mt, ({ attrs: o }) => ({ 18: o }), ({ attrs: o }) => (o ? 262144 : 0)] },
                $$scope: { ctx: t },
            },
        })),
        (s = new ze({ props: { $$slots: { default: [jt] }, $$scope: { ctx: t } } })),
        (r = new De({ props: { class: "text-red-500" } })),
        {
            c() {
                y(e.$$.fragment), (n = N()), y(s.$$.fragment), (l = N()), y(r.$$.fragment);
            },
            l(o) {
                I(e.$$.fragment, o), (n = S(o)), I(s.$$.fragment, o), (l = S(o)), I(r.$$.fragment, o);
            },
            m(o, i) {
                D(e, o, i), E(o, n, i), D(s, o, i), E(o, l, i), D(r, o, i), (a = !0);
            },
            p(o, i) {
                const u = {};
                i & 786435 && (u.$$scope = { dirty: i, ctx: o }), e.$set(u);
                const f = {};
                i & 524288 && (f.$$scope = { dirty: i, ctx: o }), s.$set(f);
            },
            i(o) {
                a || (g(e.$$.fragment, o), g(s.$$.fragment, o), g(r.$$.fragment, o), (a = !0));
            },
            o(o) {
                $(e.$$.fragment, o), $(s.$$.fragment, o), $(r.$$.fragment, o), (a = !1);
            },
            d(o) {
                o && (b(n), b(l)), U(e, o), U(s, o), U(r, o);
            },
        }
    );
}
function Gt(t) {
    let e;
    return {
        c() {
            e = K("Bio");
        },
        l(n) {
            e = W(n, "Bio");
        },
        m(n, s) {
            E(n, e, s);
        },
        d(n) {
            n && b(e);
        },
    };
}
function Jt(t) {
    let e, n, s, l, r;
    e = new je({ props: { $$slots: { default: [Gt] }, $$scope: { ctx: t } } });
    const a = [t[18]];
    function o(u) {
        t[10](u);
    }
    let i = {};
    for (let u = 0; u < a.length; u += 1) i = P(i, a[u]);
    return (
        t[1].bio !== void 0 && (i.value = t[1].bio),
        (s = new Vt({ props: i })),
        we.push(() => ye(s, "value", o)),
        {
            c() {
                y(e.$$.fragment), (n = N()), y(s.$$.fragment);
            },
            l(u) {
                I(e.$$.fragment, u), (n = S(u)), I(s.$$.fragment, u);
            },
            m(u, f) {
                D(e, u, f), E(u, n, f), D(s, u, f), (r = !0);
            },
            p(u, f) {
                const c = {};
                f & 524288 && (c.$$scope = { dirty: f, ctx: u }), e.$set(c);
                const p = f & 262144 ? ee(a, [re(u[18])]) : {};
                !l && f & 2 && ((l = !0), (p.value = u[1].bio), ke(() => (l = !1))), s.$set(p);
            },
            i(u) {
                r || (g(e.$$.fragment, u), g(s.$$.fragment, u), (r = !0));
            },
            o(u) {
                $(e.$$.fragment, u), $(s.$$.fragment, u), (r = !1);
            },
            d(u) {
                u && b(n), U(e, u), U(s, u);
            },
        }
    );
}
function Qt(t) {
    let e, n, s, l;
    return (
        (e = new Ie({
            props: {
                $$slots: { default: [Jt, ({ attrs: r }) => ({ 18: r }), ({ attrs: r }) => (r ? 262144 : 0)] },
                $$scope: { ctx: t },
            },
        })),
        (s = new De({})),
        {
            c() {
                y(e.$$.fragment), (n = N()), y(s.$$.fragment);
            },
            l(r) {
                I(e.$$.fragment, r), (n = S(r)), I(s.$$.fragment, r);
            },
            m(r, a) {
                D(e, r, a), E(r, n, a), D(s, r, a), (l = !0);
            },
            p(r, a) {
                const o = {};
                a & 786434 && (o.$$scope = { dirty: a, ctx: r }), e.$set(o);
            },
            i(r) {
                l || (g(e.$$.fragment, r), g(s.$$.fragment, r), (l = !0));
            },
            o(r) {
                $(e.$$.fragment, r), $(s.$$.fragment, r), (l = !1);
            },
            d(r) {
                r && b(n), U(e, r), U(s, r);
            },
        }
    );
}
function Xt(t) {
    let e;
    return {
        c() {
            e = K("URLs");
        },
        l(n) {
            e = W(n, "URLs");
        },
        m(n, s) {
            E(n, e, s);
        },
        d(n) {
            n && b(e);
        },
    };
}
function Kt(t) {
    let e;
    return {
        c() {
            e = K("Add links to your website, blog, or social media profiles.");
        },
        l(n) {
            e = W(n, "Add links to your website, blog, or social media profiles.");
        },
        m(n, s) {
            E(n, e, s);
        },
        d(n) {
            n && b(e);
        },
    };
}
function Wt(t) {
    let e;
    return {
        c() {
            e = K("Delete URL");
        },
        l(n) {
            e = W(n, "Delete URL");
        },
        m(n, s) {
            E(n, e, s);
        },
        d(n) {
            n && b(e);
        },
    };
}
function Yt(t) {
    let e, n, s, l, r, a;
    const o = [t[18], { class: "flex-grow" }];
    function i(c) {
        t[11](c, t[17]);
    }
    let u = {};
    for (let c = 0; c < o.length; c += 1) u = P(u, o[c]);
    t[1].urls[t[17]] !== void 0 && (u.value = t[1].urls[t[17]]),
        (n = new He({ props: u })),
        we.push(() => ye(n, "value", i));
    function f() {
        return t[12](t[17]);
    }
    return (
        (r = new Me({
            props: {
                type: "button",
                variant: "outline",
                size: "sm",
                class: "ml-2",
                $$slots: { default: [Wt] },
                $$scope: { ctx: t },
            },
        })),
        r.$on("click", f),
        {
            c() {
                (e = V("div")), y(n.$$.fragment), (l = N()), y(r.$$.fragment), this.h();
            },
            l(c) {
                e = z(c, "DIV", { class: !0 });
                var p = X(e);
                I(n.$$.fragment, p), (l = S(p)), I(r.$$.fragment, p), p.forEach(b), this.h();
            },
            h() {
                B(e, "class", "flex items-center");
            },
            m(c, p) {
                E(c, e, p), D(n, e, null), O(e, l), D(r, e, null), (a = !0);
            },
            p(c, p) {
                t = c;
                const T = p & 262144 ? ee(o, [re(t[18]), o[1]]) : {};
                !s && p & 2 && ((s = !0), (T.value = t[1].urls[t[17]]), ke(() => (s = !1))), n.$set(T);
                const C = {};
                p & 524288 && (C.$$scope = { dirty: p, ctx: t }), r.$set(C);
            },
            i(c) {
                a || (g(n.$$.fragment, c), g(r.$$.fragment, c), (a = !0));
            },
            o(c) {
                $(n.$$.fragment, c), $(r.$$.fragment, c), (a = !1);
            },
            d(c) {
                c && b(e), U(n), U(r);
            },
        }
    );
}
function Zt(t) {
    let e, n, s, l, r, a, o;
    return (
        (e = new ze({
            props: { class: R(t[17] !== 0 && "sr-only"), $$slots: { default: [Kt] }, $$scope: { ctx: t } },
        })),
        (s = new Ie({
            props: {
                $$slots: { default: [Yt, ({ attrs: i }) => ({ 18: i }), ({ attrs: i }) => (i ? 262144 : 0)] },
                $$scope: { ctx: t },
            },
        })),
        (r = new De({})),
        {
            c() {
                y(e.$$.fragment), (n = N()), y(s.$$.fragment), (l = N()), y(r.$$.fragment), (a = N());
            },
            l(i) {
                I(e.$$.fragment, i), (n = S(i)), I(s.$$.fragment, i), (l = S(i)), I(r.$$.fragment, i), (a = S(i));
            },
            m(i, u) {
                D(e, i, u), E(i, n, u), D(s, i, u), E(i, l, u), D(r, i, u), E(i, a, u), (o = !0);
            },
            p(i, u) {
                const f = {};
                u & 524288 && (f.$$scope = { dirty: u, ctx: i }), e.$set(f);
                const c = {};
                u & 786434 && (c.$$scope = { dirty: u, ctx: i }), s.$set(c);
            },
            i(i) {
                o || (g(e.$$.fragment, i), g(s.$$.fragment, i), g(r.$$.fragment, i), (o = !0));
            },
            o(i) {
                $(e.$$.fragment, i), $(s.$$.fragment, i), $(r.$$.fragment, i), (o = !1);
            },
            d(i) {
                i && (b(n), b(l), b(a)), U(e, i), U(s, i), U(r, i);
            },
        }
    );
}
function Be(t) {
    let e, n;
    return (
        (e = new Lt({
            props: { form: t[2], name: "urls[" + t[17] + "]", $$slots: { default: [Zt] }, $$scope: { ctx: t } },
        })),
        {
            c() {
                y(e.$$.fragment);
            },
            l(s) {
                I(e.$$.fragment, s);
            },
            m(s, l) {
                D(e, s, l), (n = !0);
            },
            p(s, l) {
                const r = {};
                l & 524290 && (r.$$scope = { dirty: l, ctx: s }), e.$set(r);
            },
            i(s) {
                n || (g(e.$$.fragment, s), (n = !0));
            },
            o(s) {
                $(e.$$.fragment, s), (n = !1);
            },
            d(s) {
                U(e, s);
            },
        }
    );
}
function xt(t) {
    let e, n, s, l;
    e = new ot({ props: { $$slots: { default: [Xt] }, $$scope: { ctx: t } } });
    let r = Te(t[1].urls),
        a = [];
    for (let i = 0; i < r.length; i += 1) a[i] = Be(Oe(t, r, i));
    const o = (i) =>
        $(a[i], 1, 1, () => {
            a[i] = null;
        });
    return {
        c() {
            y(e.$$.fragment), (n = N());
            for (let i = 0; i < a.length; i += 1) a[i].c();
            s = Ae();
        },
        l(i) {
            I(e.$$.fragment, i), (n = S(i));
            for (let u = 0; u < a.length; u += 1) a[u].l(i);
            s = Ae();
        },
        m(i, u) {
            D(e, i, u), E(i, n, u);
            for (let f = 0; f < a.length; f += 1) a[f] && a[f].m(i, u);
            E(i, s, u), (l = !0);
        },
        p(i, u) {
            const f = {};
            if ((u & 524288 && (f.$$scope = { dirty: u, ctx: i }), e.$set(f), u & 262214)) {
                r = Te(i[1].urls);
                let c;
                for (c = 0; c < r.length; c += 1) {
                    const p = Oe(i, r, c);
                    a[c] ? (a[c].p(p, u), g(a[c], 1)) : ((a[c] = Be(p)), a[c].c(), g(a[c], 1), a[c].m(s.parentNode, s));
                }
                for (We(), c = r.length; c < a.length; c += 1) o(c);
                Ye();
            }
        },
        i(i) {
            if (!l) {
                g(e.$$.fragment, i);
                for (let u = 0; u < r.length; u += 1) g(a[u]);
                l = !0;
            }
        },
        o(i) {
            $(e.$$.fragment, i), (a = a.filter(Boolean));
            for (let u = 0; u < a.length; u += 1) $(a[u]);
            l = !1;
        },
        d(i) {
            i && (b(n), b(s)), U(e, i), Xe(a, i);
        },
    };
}
function es(t) {
    let e;
    return {
        c() {
            e = K("Add URL");
        },
        l(n) {
            e = W(n, "Add URL");
        },
        m(n, s) {
            E(n, e, s);
        },
        d(n) {
            n && b(e);
        },
    };
}
function ts(t) {
    let e,
        n,
        s,
        l,
        r,
        a,
        o,
        i,
        u,
        f,
        c,
        p = "Update profile",
        T,
        C,
        L;
    return (
        (n = new Pe({ props: { form: t[2], name: "username", $$slots: { default: [Ht] }, $$scope: { ctx: t } } })),
        (l = new Pe({ props: { form: t[2], name: "bio", $$slots: { default: [Qt] }, $$scope: { ctx: t } } })),
        (o = new rt({ props: { form: t[2], name: "urls", $$slots: { default: [xt] }, $$scope: { ctx: t } } })),
        (u = new Me({
            props: {
                type: "button",
                variant: "outline",
                size: "sm",
                class: "mt-2",
                $$slots: { default: [es] },
                $$scope: { ctx: t },
            },
        })),
        u.$on("click", t[5]),
        {
            c() {
                (e = V("form")),
                    y(n.$$.fragment),
                    (s = N()),
                    y(l.$$.fragment),
                    (r = N()),
                    (a = V("div")),
                    y(o.$$.fragment),
                    (i = N()),
                    y(u.$$.fragment),
                    (f = N()),
                    (c = V("button")),
                    (c.textContent = p),
                    this.h();
            },
            l(w) {
                e = z(w, "FORM", { method: !0, class: !0, id: !0 });
                var v = X(e);
                I(n.$$.fragment, v), (s = S(v)), I(l.$$.fragment, v), (r = S(v)), (a = z(v, "DIV", {}));
                var d = X(a);
                I(o.$$.fragment, d),
                    (i = S(d)),
                    I(u.$$.fragment, d),
                    d.forEach(b),
                    (f = S(v)),
                    (c = z(v, "BUTTON", { class: !0, "data-svelte-h": !0 })),
                    Ve(c) !== "svelte-4r08ew" && (c.textContent = p),
                    v.forEach(b),
                    this.h();
            },
            h() {
                B(c, "class", "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"),
                    B(e, "method", "POST"),
                    B(e, "class", "space-y-8"),
                    B(e, "id", "profile-form");
            },
            m(w, v) {
                E(w, e, v),
                    D(n, e, null),
                    O(e, s),
                    D(l, e, null),
                    O(e, r),
                    O(e, a),
                    D(o, a, null),
                    O(a, i),
                    D(u, a, null),
                    O(e, f),
                    O(e, c),
                    (T = !0),
                    C || ((L = [h(c, "click", Ge(t[7])), Je(t[4].call(null, e))]), (C = !0));
            },
            p(w, [v]) {
                const d = {};
                v & 524291 && (d.$$scope = { dirty: v, ctx: w }), n.$set(d);
                const A = {};
                v & 524290 && (A.$$scope = { dirty: v, ctx: w }), l.$set(A);
                const q = {};
                v & 524290 && (q.$$scope = { dirty: v, ctx: w }), o.$set(q);
                const m = {};
                v & 524288 && (m.$$scope = { dirty: v, ctx: w }), u.$set(m);
            },
            i(w) {
                T || (g(n.$$.fragment, w), g(l.$$.fragment, w), g(o.$$.fragment, w), g(u.$$.fragment, w), (T = !0));
            },
            o(w) {
                $(n.$$.fragment, w), $(l.$$.fragment, w), $(o.$$.fragment, w), $(u.$$.fragment, w), (T = !1);
            },
            d(w) {
                w && b(e), U(n), U(l), U(o), U(u), (C = !1), ve(L);
            },
        }
    );
}
const ss = ne.object({
    username: ne
        .string()
        .min(2, "Username must be at least 2 characters.")
        .max(15, "Username must not be longer than 15 characters"),
    bio: ne.string().min(4).max(160),
    urls: ne.array(ne.string().url()).default(["https://kdnsite.xyz"]),
});
function ns(t, e, n) {
    let s,
        { data: l } = e;
    const r = at(l, { validators: lt(ss) }),
        { form: a, enhance: o } = r;
    Z(t, a, (d) => n(1, (s = d)));
    let i,
        u = null,
        f = null;
    function c() {
        he(a, (s.urls = [...s.urls, ""]), s),
            Ke().then(() => {
                const d = Array.from(document.querySelectorAll("#profile-form input[name='urls']")),
                    A = d[d.length - 1];
                A && A.focus();
            });
    }
    function p(d) {
        he(a, (s.urls = s.urls.filter((A, q) => q !== d)), s);
    }
    async function T(d) {
        d.preventDefault();
        const q = Ce().currentUser;
        if (((f = q ? q.uid : null), f)) {
            const m = qe($e, "profiles", f);
            if ((await dt(_t(gt($e, "profiles"), pt("username", "==", s.username)))).docs.some((M) => M.id !== f))
                console.log("Username is already taken"), window.location.reload();
            else if (s.username.trim() === "") console.log("Username cannot be empty"), window.location.reload();
            else
                try {
                    console.log("Saving data:", s), await ht(m, s), window.location.reload();
                } catch (M) {
                    console.error("Failed to update user data:", M), window.location.reload();
                }
        }
    }
    Qe(() => {
        (i = Ce()),
            ct(i, async (d) => {
                if (!d) await ut(it.LOGIN);
                else {
                    n(0, (u = d)), (f = u.uid);
                    const A = qe($e, "profiles", f);
                    mt(A, (q) => {
                        const m = q.data();
                        if (m) he(a, (s = m), s);
                        else throw new Error("User data is invalid");
                    });
                }
            });
    });
    function C(d) {
        t.$$.not_equal(s.username, d) && ((s.username = d), a.set(s));
    }
    function L(d) {
        t.$$.not_equal(s.bio, d) && ((s.bio = d), a.set(s));
    }
    function w(d, A) {
        t.$$.not_equal(s.urls[A], d) && ((s.urls[A] = d), a.set(s));
    }
    const v = (d) => p(d);
    return (
        (t.$$set = (d) => {
            "data" in d && n(8, (l = d.data));
        }),
        [u, s, r, a, o, c, p, T, l, C, L, w, v]
    );
}
class rs extends G {
    constructor(e) {
        super(), J(this, e, ns, ts, H, { data: 8 });
    }
}
function as(t) {
    let e,
        n,
        s =
            '<h3 class="text-lg font-medium svelte-9r9wpq">Profile</h3> <p class="text-sm text-muted-foreground svelte-9r9wpq">This is how others will see you on the site.</p>',
        l,
        r,
        a,
        o,
        i;
    return (
        (r = new ft({})),
        (o = new rs({ props: { data: t[0].form } })),
        {
            c() {
                (e = V("div")),
                    (n = V("div")),
                    (n.innerHTML = s),
                    (l = N()),
                    y(r.$$.fragment),
                    (a = N()),
                    y(o.$$.fragment),
                    this.h();
            },
            l(u) {
                e = z(u, "DIV", { class: !0 });
                var f = X(e);
                (n = z(f, "DIV", { "data-svelte-h": !0 })),
                    Ve(n) !== "svelte-1eiii3c" && (n.innerHTML = s),
                    (l = S(f)),
                    I(r.$$.fragment, f),
                    (a = S(f)),
                    I(o.$$.fragment, f),
                    f.forEach(b),
                    this.h();
            },
            h() {
                B(e, "class", "space-y-6");
            },
            m(u, f) {
                E(u, e, f), O(e, n), O(e, l), D(r, e, null), O(e, a), D(o, e, null), (i = !0);
            },
            p(u, [f]) {
                const c = {};
                f & 1 && (c.data = u[0].form), o.$set(c);
            },
            i(u) {
                i || (g(r.$$.fragment, u), g(o.$$.fragment, u), (i = !0));
            },
            o(u) {
                $(r.$$.fragment, u), $(o.$$.fragment, u), (i = !1);
            },
            d(u) {
                u && b(e), U(r), U(o);
            },
        }
    );
}
function ls(t, e, n) {
    let { data: s } = e;
    return (
        (t.$$set = (l) => {
            "data" in l && n(0, (s = l.data));
        }),
        [s]
    );
}
class gs extends G {
    constructor(e) {
        super(), J(this, e, ls, as, H, { data: 0 });
    }
}
export { gs as component };
