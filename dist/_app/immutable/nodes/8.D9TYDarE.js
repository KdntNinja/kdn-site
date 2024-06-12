import {
    ag as Oe,
    ah as pe,
    s as F,
    I as j,
    i as C,
    f as p,
    B as P,
    k as ne,
    w as y,
    C as ee,
    q as se,
    v as W,
    e as T,
    c as V,
    b as R,
    x,
    Q as _e,
    y as Z,
    z as Q,
    A as J,
    n as oe,
    u as H,
    H as Be,
    G as z,
    r as je,
    ac as fe,
    ad as de,
    l as I,
    ai as ce,
    h as B,
    a as N,
    g as q,
    o as Ke,
    ab as We,
    t as ve,
    d as be,
    p as Y,
} from "../chunks/scheduler.CCxz69I-.js";
import {
    S as U,
    i as G,
    g as ie,
    b as k,
    f as ae,
    t as b,
    c as D,
    a as A,
    m as L,
    d as M,
    e as Fe,
} from "../chunks/index.BXRlT4_D.js";
import { g as O, a as re } from "../chunks/spread.CgU5AtxT.js";
import {
    z as $e,
    c as Ze,
    d as Qe,
    f as Je,
    j as Xe,
    h as Ye,
    i as xe,
    C as he,
    L as ke,
} from "../chunks/index.CPE75c9D.js";
import { d as et, w as tt, g as lt } from "../chunks/entry.VNHXcdGV.js";
import {
    o as st,
    s as rt,
    f as ot,
    m as Ee,
    g as nt,
    h as it,
    d as ye,
    i as ue,
    j as at,
    k as Ie,
    l as ut,
    n as ft,
    p as dt,
    c as me,
    r as ct,
} from "../chunks/routes.BurMO2Cv.js";
import { o as mt } from "../chunks/overridable.Bfoym59e.js";
import { t as _t, r as gt, g as ht } from "../chunks/separator.CIQzuoOT.js";
import { c as pt } from "../chunks/attrs.BDvkrEDx.js";
import { m as De, o as vt, d as Ae, k as Le, e as bt, f as kt } from "../chunks/firebase.BWW6NFj2.js";
import { B as wt, S as Ct } from "../chunks/separator.DP0n8qmL.js";
import { c as $t } from "../chunks/label.DSIJsmca.js";
function Et(r) {
    return window.getComputedStyle(r).getPropertyValue("direction");
}
const yt = { orientation: "vertical", loop: !0, disabled: !1, required: !1, defaultValue: void 0 },
    It = "radio-group",
    { name: Me, selector: Te } = ft(It);
function Dt(r) {
    const e = { ...yt, ...r },
        l = _t(st(e, "value")),
        { disabled: t, required: s, loop: o, orientation: n } = l,
        u = e.value ?? tt(e.defaultValue),
        a = mt(u, e == null ? void 0 : e.onValueChange);
    rt(() =>
        dt(document, "focus", (h) => {
            const m = h.target;
            ue(m);
        }),
    );
    let i = !1;
    ot(a, (h) => {
        h === void 0 ? (i = !1) : (i = !0);
    });
    const f = (h) => {
            const m = h.dataset.disabled === "true",
                w = h.dataset.value;
            m || w === void 0 || a.set(w);
        },
        _ = Ee(Me(), {
            stores: [s, n],
            returned: ([h, m]) => ({ role: "radiogroup", "aria-required": h, "data-orientation": m }),
        }),
        c = Ee(Me("item"), {
            stores: [a, n, t],
            returned:
                ([h, m, w]) =>
                (E) => {
                    const S = typeof E == "string" ? E : E.value,
                        v = typeof E == "string" ? !1 : !!E.disabled,
                        te = w || v,
                        le = h === S,
                        $ = i ? (le ? 0 : -1) : 0;
                    return (
                        (i = !0),
                        {
                            disabled: te,
                            "data-value": S,
                            "data-orientation": m,
                            "data-disabled": nt(te),
                            "data-state": le ? "checked" : "unchecked",
                            "aria-checked": le,
                            type: "button",
                            role: "radio",
                            tabindex: $,
                        }
                    );
                },
            action: (h) => ({
                destroy: it(
                    ye(h, "click", () => {
                        f(h);
                    }),
                    ye(h, "keydown", (w) => {
                        const E = w.currentTarget;
                        if (!ue(E)) return;
                        const S = E.closest(Te());
                        if (!ue(S)) return;
                        const v = Array.from(S.querySelectorAll(Te("item"))).filter(
                                (X) => ue(X) && !X.hasAttribute("data-disabled"),
                            ),
                            te = v.indexOf(E),
                            le = Et(S),
                            { nextKey: $, prevKey: Ge } = at(le, n.get()),
                            Ce = o.get();
                        let K = null;
                        if (w.key === $) {
                            w.preventDefault();
                            const X = te + 1;
                            X >= v.length && Ce ? (K = v[0]) : (K = v[X]);
                        } else if (w.key === Ge) {
                            w.preventDefault();
                            const X = te - 1;
                            X < 0 && Ce ? (K = v[v.length - 1]) : (K = v[X]);
                        } else
                            w.key === Ie.HOME
                                ? (w.preventDefault(), (K = v[0]))
                                : w.key === Ie.END && (w.preventDefault(), (K = v[v.length - 1]));
                        K && (K.focus(), f(K));
                    }),
                ),
            }),
        }),
        d = ut({ value: a, disabled: t, required: s }),
        g = et(a, (h) => (m) => h === m);
    return {
        elements: { root: _, item: c, hiddenInput: d },
        states: { value: a },
        helpers: { isChecked: g },
        options: l,
    };
}
function ge() {
    return { NAME: "radio-group", ITEM_NAME: "radio-group-item", PARTS: ["root", "item", "input", "item-indicator"] };
}
function At(r) {
    const { NAME: e, PARTS: l } = ge(),
        t = pt(e, l),
        s = { ...Dt(gt(r)), getAttrs: t };
    return Oe(e, s), { ...s, updateOption: ht(s.options) };
}
function Ue() {
    const { NAME: r } = ge();
    return pe(r);
}
function Lt(r) {
    const { ITEM_NAME: e } = ge(),
        l = { ...Ue(), value: r };
    return Oe(e, l), l;
}
function Mt() {
    const { ITEM_NAME: r } = ge();
    return pe(r);
}
const Tt = (r) => ({ builder: r & 4 }),
    Ve = (r) => ({ builder: r[2] }),
    Vt = (r) => ({ builder: r & 4 }),
    Ne = (r) => ({ builder: r[2] });
function Nt(r) {
    let e, l, t, s;
    const o = r[13].default,
        n = W(o, r, r[12], Ve);
    let u = [r[2], r[4]],
        a = {};
    for (let i = 0; i < u.length; i += 1) a = y(a, u[i]);
    return {
        c() {
            (e = T("div")), n && n.c(), this.h();
        },
        l(i) {
            e = V(i, "DIV", {});
            var f = R(e);
            n && n.l(f), f.forEach(p), this.h();
        },
        h() {
            x(e, a);
        },
        m(i, f) {
            C(i, e, f), n && n.m(e, null), r[14](e), (l = !0), t || ((s = _e(r[2].action(e))), (t = !0));
        },
        p(i, f) {
            n && n.p && (!l || f & 4100) && Z(n, o, i, i[12], l ? J(o, i[12], f, Tt) : Q(i[12]), Ve),
                x(e, (a = O(u, [f & 4 && i[2], f & 16 && i[4]])));
        },
        i(i) {
            l || (b(n, i), (l = !0));
        },
        o(i) {
            k(n, i), (l = !1);
        },
        d(i) {
            i && p(e), n && n.d(i), r[14](null), (t = !1), s();
        },
    };
}
function qt(r) {
    let e;
    const l = r[13].default,
        t = W(l, r, r[12], Ne);
    return {
        c() {
            t && t.c();
        },
        l(s) {
            t && t.l(s);
        },
        m(s, o) {
            t && t.m(s, o), (e = !0);
        },
        p(s, o) {
            t && t.p && (!e || o & 4100) && Z(t, l, s, s[12], e ? J(l, s[12], o, Vt) : Q(s[12]), Ne);
        },
        i(s) {
            e || (b(t, s), (e = !0));
        },
        o(s) {
            k(t, s), (e = !1);
        },
        d(s) {
            t && t.d(s);
        },
    };
}
function Pt(r) {
    let e, l, t, s;
    const o = [qt, Nt],
        n = [];
    function u(a, i) {
        return a[1] ? 0 : 1;
    }
    return (
        (e = u(r)),
        (l = n[e] = o[e](r)),
        {
            c() {
                l.c(), (t = j());
            },
            l(a) {
                l.l(a), (t = j());
            },
            m(a, i) {
                n[e].m(a, i), C(a, t, i), (s = !0);
            },
            p(a, [i]) {
                let f = e;
                (e = u(a)),
                    e === f
                        ? n[e].p(a, i)
                        : (ie(),
                          k(n[f], 1, 1, () => {
                              n[f] = null;
                          }),
                          ae(),
                          (l = n[e]),
                          l ? l.p(a, i) : ((l = n[e] = o[e](a)), l.c()),
                          b(l, 1),
                          l.m(t.parentNode, t));
            },
            i(a) {
                s || (b(l), (s = !0));
            },
            o(a) {
                k(l), (s = !1);
            },
            d(a) {
                a && p(t), n[e].d(a);
            },
        }
    );
}
function St(r, e, l) {
    let t;
    const s = ["required", "disabled", "value", "onValueChange", "loop", "orientation", "asChild", "el"];
    let o = P(e, s),
        n,
        { $$slots: u = {}, $$scope: a } = e,
        { required: i = void 0 } = e,
        { disabled: f = void 0 } = e,
        { value: _ = void 0 } = e,
        { onValueChange: c = void 0 } = e,
        { loop: d = void 0 } = e,
        { orientation: g = void 0 } = e,
        { asChild: h = !1 } = e,
        { el: m = void 0 } = e;
    const {
        elements: { root: w },
        states: { value: E },
        updateOption: S,
        getAttrs: v,
    } = At({
        required: i,
        disabled: f,
        defaultValue: _,
        loop: d,
        orientation: g,
        onValueChange: ({ next: $ }) => (_ !== $ && (c == null || c($), l(5, (_ = $))), $),
    });
    ne(r, w, ($) => l(11, (n = $)));
    const te = v("root");
    function le($) {
        se[$ ? "unshift" : "push"](() => {
            (m = $), l(0, m);
        });
    }
    return (
        (r.$$set = ($) => {
            (e = y(y({}, e), ee($))),
                l(4, (o = P(e, s))),
                "required" in $ && l(6, (i = $.required)),
                "disabled" in $ && l(7, (f = $.disabled)),
                "value" in $ && l(5, (_ = $.value)),
                "onValueChange" in $ && l(8, (c = $.onValueChange)),
                "loop" in $ && l(9, (d = $.loop)),
                "orientation" in $ && l(10, (g = $.orientation)),
                "asChild" in $ && l(1, (h = $.asChild)),
                "el" in $ && l(0, (m = $.el)),
                "$$scope" in $ && l(12, (a = $.$$scope));
        }),
        (r.$$.update = () => {
            r.$$.dirty & 32 && _ !== void 0 && E.set(_),
                r.$$.dirty & 64 && S("required", i),
                r.$$.dirty & 128 && S("disabled", f),
                r.$$.dirty & 512 && S("loop", d),
                r.$$.dirty & 1024 && S("orientation", g),
                r.$$.dirty & 2048 && l(2, (t = n)),
                r.$$.dirty & 4 && Object.assign(t, te);
        }),
        [m, h, t, w, o, _, i, f, c, d, g, n, a, u, le]
    );
}
let Rt = class extends U {
    constructor(e) {
        super(),
            G(this, e, St, Pt, F, {
                required: 6,
                disabled: 7,
                value: 5,
                onValueChange: 8,
                loop: 9,
                orientation: 10,
                asChild: 1,
                el: 0,
            });
    }
};
const Ht = (r) => ({ builder: r & 4 }),
    qe = (r) => ({ builder: r[2] });
function zt(r) {
    let e,
        l,
        t,
        s = [r[2], r[4]],
        o = {};
    for (let n = 0; n < s.length; n += 1) o = y(o, s[n]);
    return {
        c() {
            (e = T("input")), this.h();
        },
        l(n) {
            (e = V(n, "INPUT", {})), this.h();
        },
        h() {
            x(e, o);
        },
        m(n, u) {
            C(n, e, u), e.autofocus && e.focus(), r[8](e), l || ((t = _e(r[2].action(e))), (l = !0));
        },
        p(n, u) {
            x(e, (o = O(s, [u & 4 && n[2], u & 16 && n[4]])));
        },
        i: oe,
        o: oe,
        d(n) {
            n && p(e), r[8](null), (l = !1), t();
        },
    };
}
function Ot(r) {
    let e;
    const l = r[7].default,
        t = W(l, r, r[6], qe);
    return {
        c() {
            t && t.c();
        },
        l(s) {
            t && t.l(s);
        },
        m(s, o) {
            t && t.m(s, o), (e = !0);
        },
        p(s, o) {
            t && t.p && (!e || o & 68) && Z(t, l, s, s[6], e ? J(l, s[6], o, Ht) : Q(s[6]), qe);
        },
        i(s) {
            e || (b(t, s), (e = !0));
        },
        o(s) {
            k(t, s), (e = !1);
        },
        d(s) {
            t && t.d(s);
        },
    };
}
function Bt(r) {
    let e, l, t, s;
    const o = [Ot, zt],
        n = [];
    function u(a, i) {
        return a[1] ? 0 : 1;
    }
    return (
        (e = u(r)),
        (l = n[e] = o[e](r)),
        {
            c() {
                l.c(), (t = j());
            },
            l(a) {
                l.l(a), (t = j());
            },
            m(a, i) {
                n[e].m(a, i), C(a, t, i), (s = !0);
            },
            p(a, [i]) {
                let f = e;
                (e = u(a)),
                    e === f
                        ? n[e].p(a, i)
                        : (ie(),
                          k(n[f], 1, 1, () => {
                              n[f] = null;
                          }),
                          ae(),
                          (l = n[e]),
                          l ? l.p(a, i) : ((l = n[e] = o[e](a)), l.c()),
                          b(l, 1),
                          l.m(t.parentNode, t));
            },
            i(a) {
                s || (b(l), (s = !0));
            },
            o(a) {
                k(l), (s = !1);
            },
            d(a) {
                a && p(t), n[e].d(a);
            },
        }
    );
}
function jt(r, e, l) {
    let t;
    const s = ["asChild", "el"];
    let o = P(e, s),
        n,
        { $$slots: u = {}, $$scope: a } = e,
        { asChild: i = !1 } = e,
        { el: f = void 0 } = e;
    const {
        elements: { hiddenInput: _ },
        getAttrs: c,
    } = Ue();
    ne(r, _, (h) => l(5, (n = h)));
    const d = c("input");
    function g(h) {
        se[h ? "unshift" : "push"](() => {
            (f = h), l(0, f);
        });
    }
    return (
        (r.$$set = (h) => {
            (e = y(y({}, e), ee(h))),
                l(4, (o = P(e, s))),
                "asChild" in h && l(1, (i = h.asChild)),
                "el" in h && l(0, (f = h.el)),
                "$$scope" in h && l(6, (a = h.$$scope));
        }),
        (r.$$.update = () => {
            r.$$.dirty & 32 && l(2, (t = n)), r.$$.dirty & 4 && Object.assign(t, d);
        }),
        [f, i, t, _, o, n, a, u, g]
    );
}
class Ft extends U {
    constructor(e) {
        super(), G(this, e, jt, Bt, F, { asChild: 1, el: 0 });
    }
}
const Ut = (r) => ({ builder: r & 4 }),
    Pe = (r) => ({ builder: r[2] }),
    Gt = (r) => ({ builder: r & 4 }),
    Se = (r) => ({ builder: r[2] });
function Kt(r) {
    let e, l, t, s;
    const o = r[10].default,
        n = W(o, r, r[9], Pe);
    let u = [r[2], { type: "button" }, r[5]],
        a = {};
    for (let i = 0; i < u.length; i += 1) a = y(a, u[i]);
    return {
        c() {
            (e = T("button")), n && n.c(), this.h();
        },
        l(i) {
            e = V(i, "BUTTON", { type: !0 });
            var f = R(e);
            n && n.l(f), f.forEach(p), this.h();
        },
        h() {
            x(e, a);
        },
        m(i, f) {
            C(i, e, f),
                n && n.m(e, null),
                e.autofocus && e.focus(),
                r[11](e),
                (l = !0),
                t ||
                    ((s = [_e(r[2].action(e)), H(e, "m-click", r[4]), H(e, "m-focus", r[4]), H(e, "m-keydown", r[4])]),
                    (t = !0));
        },
        p(i, f) {
            n && n.p && (!l || f & 516) && Z(n, o, i, i[9], l ? J(o, i[9], f, Ut) : Q(i[9]), Pe),
                x(e, (a = O(u, [f & 4 && i[2], { type: "button" }, f & 32 && i[5]])));
        },
        i(i) {
            l || (b(n, i), (l = !0));
        },
        o(i) {
            k(n, i), (l = !1);
        },
        d(i) {
            i && p(e), n && n.d(i), r[11](null), (t = !1), Be(s);
        },
    };
}
function Wt(r) {
    let e;
    const l = r[10].default,
        t = W(l, r, r[9], Se);
    return {
        c() {
            t && t.c();
        },
        l(s) {
            t && t.l(s);
        },
        m(s, o) {
            t && t.m(s, o), (e = !0);
        },
        p(s, o) {
            t && t.p && (!e || o & 516) && Z(t, l, s, s[9], e ? J(l, s[9], o, Gt) : Q(s[9]), Se);
        },
        i(s) {
            e || (b(t, s), (e = !0));
        },
        o(s) {
            k(t, s), (e = !1);
        },
        d(s) {
            t && t.d(s);
        },
    };
}
function Zt(r) {
    let e, l, t, s;
    const o = [Wt, Kt],
        n = [];
    function u(a, i) {
        return a[1] ? 0 : 1;
    }
    return (
        (e = u(r)),
        (l = n[e] = o[e](r)),
        {
            c() {
                l.c(), (t = j());
            },
            l(a) {
                l.l(a), (t = j());
            },
            m(a, i) {
                n[e].m(a, i), C(a, t, i), (s = !0);
            },
            p(a, [i]) {
                let f = e;
                (e = u(a)),
                    e === f
                        ? n[e].p(a, i)
                        : (ie(),
                          k(n[f], 1, 1, () => {
                              n[f] = null;
                          }),
                          ae(),
                          (l = n[e]),
                          l ? l.p(a, i) : ((l = n[e] = o[e](a)), l.c()),
                          b(l, 1),
                          l.m(t.parentNode, t));
            },
            i(a) {
                s || (b(l), (s = !0));
            },
            o(a) {
                k(l), (s = !1);
            },
            d(a) {
                a && p(t), n[e].d(a);
            },
        }
    );
}
function Qt(r, e, l) {
    let t;
    const s = ["value", "disabled", "asChild", "el"];
    let o = P(e, s),
        n,
        { $$slots: u = {}, $$scope: a } = e,
        { value: i } = e,
        { disabled: f = !1 } = e,
        { asChild: _ = !1 } = e,
        { el: c = void 0 } = e;
    const {
        elements: { item: d },
        getAttrs: g,
    } = Lt(i);
    ne(r, d, (E) => l(8, (n = E)));
    const h = $t(),
        m = g("item");
    function w(E) {
        se[E ? "unshift" : "push"](() => {
            (c = E), l(0, c);
        });
    }
    return (
        (r.$$set = (E) => {
            (e = y(y({}, e), ee(E))),
                l(5, (o = P(e, s))),
                "value" in E && l(6, (i = E.value)),
                "disabled" in E && l(7, (f = E.disabled)),
                "asChild" in E && l(1, (_ = E.asChild)),
                "el" in E && l(0, (c = E.el)),
                "$$scope" in E && l(9, (a = E.$$scope));
        }),
        (r.$$.update = () => {
            r.$$.dirty & 448 && l(2, (t = n({ value: i, disabled: f }))), r.$$.dirty & 4 && Object.assign(t, m);
        }),
        [c, _, t, d, h, o, i, f, n, a, u, w]
    );
}
let Jt = class extends U {
    constructor(e) {
        super(), G(this, e, Qt, Zt, F, { value: 6, disabled: 7, asChild: 1, el: 0 });
    }
};
const Xt = (r) => ({ checked: r & 4 }),
    Re = (r) => ({ checked: r[2], attrs: r[4] }),
    Yt = (r) => ({ checked: r & 4 }),
    He = (r) => ({ checked: r[2], attrs: r[4] });
function xt(r) {
    let e,
        l,
        t = r[2] && ze(r),
        s = [r[4], r[5]],
        o = {};
    for (let n = 0; n < s.length; n += 1) o = y(o, s[n]);
    return {
        c() {
            (e = T("div")), t && t.c(), this.h();
        },
        l(n) {
            e = V(n, "DIV", {});
            var u = R(e);
            t && t.l(u), u.forEach(p), this.h();
        },
        h() {
            x(e, o);
        },
        m(n, u) {
            C(n, e, u), t && t.m(e, null), r[9](e), (l = !0);
        },
        p(n, u) {
            n[2]
                ? t
                    ? (t.p(n, u), u & 4 && b(t, 1))
                    : ((t = ze(n)), t.c(), b(t, 1), t.m(e, null))
                : t &&
                  (ie(),
                  k(t, 1, 1, () => {
                      t = null;
                  }),
                  ae()),
                x(e, (o = O(s, [n[4], u & 32 && n[5]])));
        },
        i(n) {
            l || (b(t), (l = !0));
        },
        o(n) {
            k(t), (l = !1);
        },
        d(n) {
            n && p(e), t && t.d(), r[9](null);
        },
    };
}
function el(r) {
    let e;
    const l = r[8].default,
        t = W(l, r, r[7], He);
    return {
        c() {
            t && t.c();
        },
        l(s) {
            t && t.l(s);
        },
        m(s, o) {
            t && t.m(s, o), (e = !0);
        },
        p(s, o) {
            t && t.p && (!e || o & 132) && Z(t, l, s, s[7], e ? J(l, s[7], o, Yt) : Q(s[7]), He);
        },
        i(s) {
            e || (b(t, s), (e = !0));
        },
        o(s) {
            k(t, s), (e = !1);
        },
        d(s) {
            t && t.d(s);
        },
    };
}
function ze(r) {
    let e;
    const l = r[8].default,
        t = W(l, r, r[7], Re);
    return {
        c() {
            t && t.c();
        },
        l(s) {
            t && t.l(s);
        },
        m(s, o) {
            t && t.m(s, o), (e = !0);
        },
        p(s, o) {
            t && t.p && (!e || o & 132) && Z(t, l, s, s[7], e ? J(l, s[7], o, Xt) : Q(s[7]), Re);
        },
        i(s) {
            e || (b(t, s), (e = !0));
        },
        o(s) {
            k(t, s), (e = !1);
        },
        d(s) {
            t && t.d(s);
        },
    };
}
function tl(r) {
    let e, l, t, s;
    const o = [el, xt],
        n = [];
    function u(a, i) {
        return a[1] ? 0 : 1;
    }
    return (
        (e = u(r)),
        (l = n[e] = o[e](r)),
        {
            c() {
                l.c(), (t = j());
            },
            l(a) {
                l.l(a), (t = j());
            },
            m(a, i) {
                n[e].m(a, i), C(a, t, i), (s = !0);
            },
            p(a, [i]) {
                let f = e;
                (e = u(a)),
                    e === f
                        ? n[e].p(a, i)
                        : (ie(),
                          k(n[f], 1, 1, () => {
                              n[f] = null;
                          }),
                          ae(),
                          (l = n[e]),
                          l ? l.p(a, i) : ((l = n[e] = o[e](a)), l.c()),
                          b(l, 1),
                          l.m(t.parentNode, t));
            },
            i(a) {
                s || (b(l), (s = !0));
            },
            o(a) {
                k(l), (s = !1);
            },
            d(a) {
                a && p(t), n[e].d(a);
            },
        }
    );
}
function ll(r, e, l) {
    let t;
    const s = ["asChild", "el"];
    let o = P(e, s),
        n,
        { $$slots: u = {}, $$scope: a } = e,
        { asChild: i = !1 } = e,
        { el: f = void 0 } = e;
    const {
        helpers: { isChecked: _ },
        value: c,
        getAttrs: d,
    } = Mt();
    ne(r, _, (m) => l(6, (n = m)));
    const g = d("item-indicator");
    function h(m) {
        se[m ? "unshift" : "push"](() => {
            (f = m), l(0, f);
        });
    }
    return (
        (r.$$set = (m) => {
            (e = y(y({}, e), ee(m))),
                l(5, (o = P(e, s))),
                "asChild" in m && l(1, (i = m.asChild)),
                "el" in m && l(0, (f = m.el)),
                "$$scope" in m && l(7, (a = m.$$scope));
        }),
        (r.$$.update = () => {
            r.$$.dirty & 64 && l(2, (t = n(c)));
        }),
        [f, i, t, _, g, o, n, a, u, h]
    );
}
class sl extends U {
    constructor(e) {
        super(), G(this, e, ll, tl, F, { asChild: 1, el: 0 });
    }
}
function rl(r) {
    let e;
    const l = r[1].default,
        t = W(l, r, r[4], null);
    return {
        c() {
            t && t.c();
        },
        l(s) {
            t && t.l(s);
        },
        m(s, o) {
            t && t.m(s, o), (e = !0);
        },
        p(s, o) {
            t && t.p && (!e || o & 16) && Z(t, l, s, s[4], e ? J(l, s[4], o, null) : Q(s[4]), null);
        },
        i(s) {
            e || (b(t, s), (e = !0));
        },
        o(s) {
            k(t, s), (e = !1);
        },
        d(s) {
            t && t.d(s);
        },
    };
}
function ol(r) {
    let e, l;
    const t = [{ type: "submit" }, r[0]];
    let s = { $$slots: { default: [rl] }, $$scope: { ctx: r } };
    for (let o = 0; o < t.length; o += 1) s = y(s, t[o]);
    return (
        (e = new wt({ props: s })),
        e.$on("click", r[2]),
        e.$on("keydown", r[3]),
        {
            c() {
                D(e.$$.fragment);
            },
            l(o) {
                A(e.$$.fragment, o);
            },
            m(o, n) {
                L(e, o, n), (l = !0);
            },
            p(o, [n]) {
                const u = n & 1 ? O(t, [t[0], re(o[0])]) : {};
                n & 16 && (u.$$scope = { dirty: n, ctx: o }), e.$set(u);
            },
            i(o) {
                l || (b(e.$$.fragment, o), (l = !0));
            },
            o(o) {
                k(e.$$.fragment, o), (l = !1);
            },
            d(o) {
                M(e, o);
            },
        }
    );
}
function nl(r, e, l) {
    const t = [];
    let s = P(e, t),
        { $$slots: o = {}, $$scope: n } = e;
    function u(i) {
        z.call(this, r, i);
    }
    function a(i) {
        z.call(this, r, i);
    }
    return (
        (r.$$set = (i) => {
            (e = y(y({}, e), ee(i))), l(0, (s = P(e, t))), "$$scope" in i && l(4, (n = i.$$scope));
        }),
        [s, o, u, a, n]
    );
}
class il extends U {
    constructor(e) {
        super(), G(this, e, nl, ol, F, {});
    }
}
function al(r) {
    let e;
    const l = r[3].default,
        t = W(l, r, r[5], null);
    return {
        c() {
            t && t.c();
        },
        l(s) {
            t && t.l(s);
        },
        m(s, o) {
            t && t.m(s, o), (e = !0);
        },
        p(s, o) {
            t && t.p && (!e || o & 32) && Z(t, l, s, s[5], e ? J(l, s[5], o, null) : Q(s[5]), null);
        },
        i(s) {
            e || (b(t, s), (e = !0));
        },
        o(s) {
            k(t, s), (e = !1);
        },
        d(s) {
            t && t.d(s);
        },
    };
}
function ul(r) {
    let e, l, t;
    const s = [{ class: me("grid gap-2", r[1]) }, r[2]];
    function o(u) {
        r[4](u);
    }
    let n = { $$slots: { default: [al] }, $$scope: { ctx: r } };
    for (let u = 0; u < s.length; u += 1) n = y(n, s[u]);
    return (
        r[0] !== void 0 && (n.value = r[0]),
        (e = new Rt({ props: n })),
        se.push(() => Fe(e, "value", o)),
        {
            c() {
                D(e.$$.fragment);
            },
            l(u) {
                A(e.$$.fragment, u);
            },
            m(u, a) {
                L(e, u, a), (t = !0);
            },
            p(u, [a]) {
                const i = a & 6 ? O(s, [a & 2 && { class: me("grid gap-2", u[1]) }, a & 4 && re(u[2])]) : {};
                a & 32 && (i.$$scope = { dirty: a, ctx: u }),
                    !l && a & 1 && ((l = !0), (i.value = u[0]), je(() => (l = !1))),
                    e.$set(i);
            },
            i(u) {
                t || (b(e.$$.fragment, u), (t = !0));
            },
            o(u) {
                k(e.$$.fragment, u), (t = !1);
            },
            d(u) {
                M(e, u);
            },
        }
    );
}
function fl(r, e, l) {
    const t = ["class", "value"];
    let s = P(e, t),
        { $$slots: o = {}, $$scope: n } = e,
        { class: u = void 0 } = e,
        { value: a = void 0 } = e;
    function i(f) {
        (a = f), l(0, a);
    }
    return (
        (r.$$set = (f) => {
            (e = y(y({}, e), ee(f))),
                l(2, (s = P(e, t))),
                "class" in f && l(1, (u = f.class)),
                "value" in f && l(0, (a = f.value)),
                "$$scope" in f && l(5, (n = f.$$scope));
        }),
        [a, u, s, o, i, n]
    );
}
class dl extends U {
    constructor(e) {
        super(), G(this, e, fl, ul, F, { class: 1, value: 0 });
    }
}
function cl(r) {
    let e,
        l,
        t = [
            { width: r[0] },
            { height: r[0] },
            r[5],
            { role: r[1] },
            { "aria-label": r[3] },
            { viewBox: "0 0 15 15" },
            { fill: r[2] },
            { xmlns: "http://www.w3.org/2000/svg" },
        ],
        s = {};
    for (let o = 0; o < t.length; o += 1) s = y(s, t[o]);
    return {
        c() {
            (e = fe("svg")), (l = fe("path")), this.h();
        },
        l(o) {
            e = de(o, "svg", { width: !0, height: !0, role: !0, "aria-label": !0, viewBox: !0, fill: !0, xmlns: !0 });
            var n = R(e);
            (l = de(n, "path", { "fill-rule": !0, "clip-rule": !0, d: !0, fill: !0 })),
                R(l).forEach(p),
                n.forEach(p),
                this.h();
        },
        h() {
            I(l, "fill-rule", "evenodd"),
                I(l, "clip-rule", "evenodd"),
                I(
                    l,
                    "d",
                    "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
                ),
                I(l, "fill", "currentColor"),
                ce(e, s);
        },
        m(o, n) {
            C(o, e, n), B(e, l);
        },
        p(o, n) {
            ce(
                e,
                (s = O(t, [
                    n & 1 && { width: o[0] },
                    n & 1 && { height: o[0] },
                    n & 32 && o[5],
                    n & 2 && { role: o[1] },
                    n & 8 && { "aria-label": o[3] },
                    { viewBox: "0 0 15 15" },
                    n & 4 && { fill: o[2] },
                    { xmlns: "http://www.w3.org/2000/svg" },
                ])),
            );
        },
        d(o) {
            o && p(e);
        },
    };
}
function ml(r) {
    let e,
        l,
        t,
        s,
        o = [
            { width: r[0] },
            { height: r[0] },
            r[5],
            { role: r[1] },
            { "aria-label": r[3] },
            { viewBox: "0 0 15 15" },
            { fill: r[2] },
            { xmlns: "http://www.w3.org/2000/svg" },
        ],
        n = {};
    for (let u = 0; u < o.length; u += 1) n = y(n, o[u]);
    return {
        c() {
            (e = fe("svg")), (l = fe("path")), this.h();
        },
        l(u) {
            e = de(u, "svg", { width: !0, height: !0, role: !0, "aria-label": !0, viewBox: !0, fill: !0, xmlns: !0 });
            var a = R(e);
            (l = de(a, "path", { "fill-rule": !0, "clip-rule": !0, d: !0, fill: !0 })),
                R(l).forEach(p),
                a.forEach(p),
                this.h();
        },
        h() {
            I(l, "fill-rule", "evenodd"),
                I(l, "clip-rule", "evenodd"),
                I(
                    l,
                    "d",
                    "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
                ),
                I(l, "fill", "currentColor"),
                ce(e, n);
        },
        m(u, a) {
            C(u, e, a),
                B(e, l),
                t ||
                    ((s = [
                        H(e, "click", r[6]),
                        H(e, "keydown", r[7]),
                        H(e, "keyup", r[8]),
                        H(e, "focus", r[9]),
                        H(e, "blur", r[10]),
                        H(e, "mouseenter", r[11]),
                        H(e, "mouseleave", r[12]),
                        H(e, "mouseover", r[13]),
                        H(e, "mouseout", r[14]),
                    ]),
                    (t = !0));
        },
        p(u, a) {
            ce(
                e,
                (n = O(o, [
                    a & 1 && { width: u[0] },
                    a & 1 && { height: u[0] },
                    a & 32 && u[5],
                    a & 2 && { role: u[1] },
                    a & 8 && { "aria-label": u[3] },
                    { viewBox: "0 0 15 15" },
                    a & 4 && { fill: u[2] },
                    { xmlns: "http://www.w3.org/2000/svg" },
                ])),
            );
        },
        d(u) {
            u && p(e), (t = !1), Be(s);
        },
    };
}
function _l(r) {
    let e;
    function l(o, n) {
        return o[4] ? ml : cl;
    }
    let t = l(r),
        s = t(r);
    return {
        c() {
            s.c(), (e = j());
        },
        l(o) {
            s.l(o), (e = j());
        },
        m(o, n) {
            s.m(o, n), C(o, e, n);
        },
        p(o, [n]) {
            t === (t = l(o)) && s ? s.p(o, n) : (s.d(1), (s = t(o)), s && (s.c(), s.m(e.parentNode, e)));
        },
        i: oe,
        o: oe,
        d(o) {
            o && p(e), s.d(o);
        },
    };
}
function gl(r, e, l) {
    const t = ["size", "role", "color", "ariaLabel", "withEvents"];
    let s = P(e, t);
    const o = pe("iconCtx") ?? {};
    let { size: n = o.size || "24" } = e,
        { role: u = o.role || "img" } = e,
        { color: a = o.color || "currentColor" } = e,
        { ariaLabel: i = "check," } = e,
        { withEvents: f = !1 } = e;
    function _(v) {
        z.call(this, r, v);
    }
    function c(v) {
        z.call(this, r, v);
    }
    function d(v) {
        z.call(this, r, v);
    }
    function g(v) {
        z.call(this, r, v);
    }
    function h(v) {
        z.call(this, r, v);
    }
    function m(v) {
        z.call(this, r, v);
    }
    function w(v) {
        z.call(this, r, v);
    }
    function E(v) {
        z.call(this, r, v);
    }
    function S(v) {
        z.call(this, r, v);
    }
    return (
        (r.$$set = (v) => {
            (e = y(y({}, e), ee(v))),
                l(5, (s = P(e, t))),
                "size" in v && l(0, (n = v.size)),
                "role" in v && l(1, (u = v.role)),
                "color" in v && l(2, (a = v.color)),
                "ariaLabel" in v && l(3, (i = v.ariaLabel)),
                "withEvents" in v && l(4, (f = v.withEvents));
        }),
        [n, u, a, i, f, s, _, c, d, g, h, m, w, E, S]
    );
}
class hl extends U {
    constructor(e) {
        super(), G(this, e, gl, _l, F, { size: 0, role: 1, color: 2, ariaLabel: 3, withEvents: 4 });
    }
}
function pl(r) {
    let e, l;
    return (
        (e = new hl({ props: { class: "h-3.5 w-3.5 fill-primary" } })),
        {
            c() {
                D(e.$$.fragment);
            },
            l(t) {
                A(e.$$.fragment, t);
            },
            m(t, s) {
                L(e, t, s), (l = !0);
            },
            p: oe,
            i(t) {
                l || (b(e.$$.fragment, t), (l = !0));
            },
            o(t) {
                k(e.$$.fragment, t), (l = !1);
            },
            d(t) {
                M(e, t);
            },
        }
    );
}
function vl(r) {
    let e, l, t;
    return (
        (l = new sl({ props: { $$slots: { default: [pl] }, $$scope: { ctx: r } } })),
        {
            c() {
                (e = T("div")), D(l.$$.fragment), this.h();
            },
            l(s) {
                e = V(s, "DIV", { class: !0 });
                var o = R(e);
                A(l.$$.fragment, o), o.forEach(p), this.h();
            },
            h() {
                I(e, "class", "flex items-center justify-center");
            },
            m(s, o) {
                C(s, e, o), L(l, e, null), (t = !0);
            },
            p(s, o) {
                const n = {};
                o & 16 && (n.$$scope = { dirty: o, ctx: s }), l.$set(n);
            },
            i(s) {
                t || (b(l.$$.fragment, s), (t = !0));
            },
            o(s) {
                k(l.$$.fragment, s), (t = !1);
            },
            d(s) {
                s && p(e), M(l);
            },
        }
    );
}
function bl(r) {
    let e, l;
    const t = [
        { value: r[1] },
        {
            class: me(
                "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                r[0],
            ),
        },
        r[2],
    ];
    let s = { $$slots: { default: [vl] }, $$scope: { ctx: r } };
    for (let o = 0; o < t.length; o += 1) s = y(s, t[o]);
    return (
        (e = new Jt({ props: s })),
        e.$on("click", r[3]),
        {
            c() {
                D(e.$$.fragment);
            },
            l(o) {
                A(e.$$.fragment, o);
            },
            m(o, n) {
                L(e, o, n), (l = !0);
            },
            p(o, [n]) {
                const u =
                    n & 7
                        ? O(t, [
                              n & 2 && { value: o[1] },
                              n & 1 && {
                                  class: me(
                                      "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                      o[0],
                                  ),
                              },
                              n & 4 && re(o[2]),
                          ])
                        : {};
                n & 16 && (u.$$scope = { dirty: n, ctx: o }), e.$set(u);
            },
            i(o) {
                l || (b(e.$$.fragment, o), (l = !0));
            },
            o(o) {
                k(e.$$.fragment, o), (l = !1);
            },
            d(o) {
                M(e, o);
            },
        }
    );
}
function kl(r, e, l) {
    const t = ["class", "value"];
    let s = P(e, t),
        { class: o = void 0 } = e,
        { value: n } = e;
    function u(a) {
        z.call(this, r, a);
    }
    return (
        (r.$$set = (a) => {
            (e = y(y({}, e), ee(a))),
                l(2, (s = P(e, t))),
                "class" in a && l(0, (o = a.class)),
                "value" in a && l(1, (n = a.value));
        }),
        [o, n, s, u]
    );
}
class we extends U {
    constructor(e) {
        super(), G(this, e, kl, bl, F, { class: 0, value: 1 });
    }
}
const wl = Ft;
function Cl(r) {
    let e;
    return {
        c() {
            e = ve("Theme");
        },
        l(l) {
            e = be(l, "Theme");
        },
        m(l, t) {
            C(l, e, t);
        },
        d(l) {
            l && p(e);
        },
    };
}
function $l(r) {
    let e;
    return {
        c() {
            e = ve("Select the theme for the dashboard.");
        },
        l(l) {
            e = be(l, "Select the theme for the dashboard.");
        },
        m(l, t) {
            C(l, e, t);
        },
        d(l) {
            l && p(e);
        },
    };
}
function El(r) {
    let e,
        l,
        t,
        s,
        o =
            '<div class="space-y-2 rounded-md bg-white p-2 shadow-sm"><div class="h-2 w-[40px] rounded-lg bg-[#ecedef]"></div> <div class="h-2 w-[50px] rounded-lg bg-[#ecedef]"></div></div> <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"><div class="h-4 w-4 rounded-full bg-[#ecedef]"></div> <div class="h-2 w-[50px] rounded-lg bg-[#ecedef]"></div></div> <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"><div class="h-4 w-4 rounded-full bg-[#ecedef]"></div> <div class="h-2 w-[50px] rounded-lg bg-[#ecedef]"></div></div>',
        n,
        u,
        a =
            '<div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm"><div class="h-2 w-[40px] rounded-lg bg-slate-400"></div> <div class="h-2 w-[50px] rounded-lg bg-slate-400"></div></div> <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"><div class="h-4 w-4 rounded-full bg-slate-400"></div> <div class="h-2 w-[50px] rounded-lg bg-slate-400"></div></div> <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"><div class="h-4 w-4 rounded-full bg-slate-400"></div> <div class="h-2 w-[50px] rounded-lg bg-slate-400"></div></div>',
        i,
        f,
        _,
        c = "Auto",
        d;
    const g = [r[12], { value: "auto" }, { class: "sr-only" }];
    let h = {};
    for (let m = 0; m < g.length; m += 1) h = y(h, g[m]);
    return (
        (e = new we({ props: h })),
        {
            c() {
                D(e.$$.fragment),
                    (l = N()),
                    (t = T("div")),
                    (s = T("div")),
                    (s.innerHTML = o),
                    (n = N()),
                    (u = T("div")),
                    (u.innerHTML = a),
                    (f = N()),
                    (_ = T("span")),
                    (_.textContent = c),
                    this.h();
            },
            l(m) {
                A(e.$$.fragment, m), (l = q(m)), (t = V(m, "DIV", { class: !0 }));
                var w = R(t);
                (s = V(w, "DIV", { class: !0, "data-svelte-h": !0 })),
                    Y(s) !== "svelte-q119se" && (s.innerHTML = o),
                    (n = q(w)),
                    (u = V(w, "DIV", { class: !0, "data-svelte-h": !0 })),
                    Y(u) !== "svelte-1nlx7aw" && (u.innerHTML = a),
                    w.forEach(p),
                    (f = q(m)),
                    (_ = V(m, "SPAN", { class: !0, "data-svelte-h": !0 })),
                    Y(_) !== "svelte-ujsr11" && (_.textContent = c),
                    this.h();
            },
            h() {
                I(s, "class", "w-1/2 space-y-2 rounded-sm bg-[#ecedef] p-2"),
                    I(u, "class", "w-1/2 space-y-2 rounded-sm bg-slate-950 p-2"),
                    I(
                        t,
                        "class",
                        (i =
                            (r[0].theme === "auto"
                                ? "ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60"
                                : "") +
                            " flex items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"),
                    ),
                    I(_, "class", "block w-full p-2 text-center font-normal");
            },
            m(m, w) {
                L(e, m, w), C(m, l, w), C(m, t, w), B(t, s), B(t, n), B(t, u), C(m, f, w), C(m, _, w), (d = !0);
            },
            p(m, w) {
                const E = w & 4096 ? O(g, [re(m[12]), g[1], g[2]]) : {};
                e.$set(E),
                    (!d ||
                        (w & 1 &&
                            i !==
                                (i =
                                    (m[0].theme === "auto"
                                        ? "ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60"
                                        : "") +
                                    " flex items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"))) &&
                        I(t, "class", i);
            },
            i(m) {
                d || (b(e.$$.fragment, m), (d = !0));
            },
            o(m) {
                k(e.$$.fragment, m), (d = !1);
            },
            d(m) {
                m && (p(l), p(t), p(f), p(_)), M(e, m);
            },
        }
    );
}
function yl(r) {
    let e, l;
    return (
        (e = new ke({
            props: {
                class: "[&:has([data-state=checked])>div]:border-primary",
                $$slots: { default: [El] },
                $$scope: { ctx: r },
            },
        })),
        {
            c() {
                D(e.$$.fragment);
            },
            l(t) {
                A(e.$$.fragment, t);
            },
            m(t, s) {
                L(e, t, s), (l = !0);
            },
            p(t, s) {
                const o = {};
                s & 12289 && (o.$$scope = { dirty: s, ctx: t }), e.$set(o);
            },
            i(t) {
                l || (b(e.$$.fragment, t), (l = !0));
            },
            o(t) {
                k(e.$$.fragment, t), (l = !1);
            },
            d(t) {
                M(e, t);
            },
        }
    );
}
function Il(r) {
    let e,
        l,
        t,
        s,
        o =
            '<div class="space-y-2 rounded-md bg-white p-2 shadow-sm"><div class="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div> <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div></div> <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"><div class="h-4 w-4 rounded-full bg-[#ecedef]"></div> <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div></div> <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"><div class="h-4 w-4 rounded-full bg-[#ecedef]"></div> <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div></div>',
        n,
        u,
        a,
        i = "Light",
        f;
    const _ = [r[12], { value: "light" }, { class: "sr-only" }];
    let c = {};
    for (let d = 0; d < _.length; d += 1) c = y(c, _[d]);
    return (
        (e = new we({ props: c })),
        {
            c() {
                D(e.$$.fragment),
                    (l = N()),
                    (t = T("div")),
                    (s = T("div")),
                    (s.innerHTML = o),
                    (u = N()),
                    (a = T("span")),
                    (a.textContent = i),
                    this.h();
            },
            l(d) {
                A(e.$$.fragment, d), (l = q(d)), (t = V(d, "DIV", { class: !0 }));
                var g = R(t);
                (s = V(g, "DIV", { class: !0, "data-svelte-h": !0 })),
                    Y(s) !== "svelte-zgwrno" && (s.innerHTML = o),
                    g.forEach(p),
                    (u = q(d)),
                    (a = V(d, "SPAN", { class: !0, "data-svelte-h": !0 })),
                    Y(a) !== "svelte-iw6ioy" && (a.textContent = i),
                    this.h();
            },
            h() {
                I(s, "class", "space-y-2 rounded-sm bg-[#ecedef] p-2"),
                    I(
                        t,
                        "class",
                        (n =
                            (r[0].theme === "light"
                                ? "ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60"
                                : "") + " items-center rounded-md border-2 border-muted p-1 hover:border-accent"),
                    ),
                    I(a, "class", "block w-full p-2 text-center font-normal");
            },
            m(d, g) {
                L(e, d, g), C(d, l, g), C(d, t, g), B(t, s), C(d, u, g), C(d, a, g), (f = !0);
            },
            p(d, g) {
                const h = g & 4096 ? O(_, [re(d[12]), _[1], _[2]]) : {};
                e.$set(h),
                    (!f ||
                        (g & 1 &&
                            n !==
                                (n =
                                    (d[0].theme === "light"
                                        ? "ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60"
                                        : "") +
                                    " items-center rounded-md border-2 border-muted p-1 hover:border-accent"))) &&
                        I(t, "class", n);
            },
            i(d) {
                f || (b(e.$$.fragment, d), (f = !0));
            },
            o(d) {
                k(e.$$.fragment, d), (f = !1);
            },
            d(d) {
                d && (p(l), p(t), p(u), p(a)), M(e, d);
            },
        }
    );
}
function Dl(r) {
    let e, l;
    return (
        (e = new ke({
            props: {
                class: "[&:has([data-state=checked])>div]:border-primary",
                $$slots: { default: [Il] },
                $$scope: { ctx: r },
            },
        })),
        {
            c() {
                D(e.$$.fragment);
            },
            l(t) {
                A(e.$$.fragment, t);
            },
            m(t, s) {
                L(e, t, s), (l = !0);
            },
            p(t, s) {
                const o = {};
                s & 12289 && (o.$$scope = { dirty: s, ctx: t }), e.$set(o);
            },
            i(t) {
                l || (b(e.$$.fragment, t), (l = !0));
            },
            o(t) {
                k(e.$$.fragment, t), (l = !1);
            },
            d(t) {
                M(e, t);
            },
        }
    );
}
function Al(r) {
    let e,
        l,
        t,
        s,
        o =
            '<div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm"><div class="h-2 w-[80px] rounded-lg bg-slate-400"></div> <div class="h-2 w-[100px] rounded-lg bg-slate-400"></div></div> <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"><div class="h-4 w-4 rounded-full bg-slate-400"></div> <div class="h-2 w-[100px] rounded-lg bg-slate-400"></div></div> <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"><div class="h-4 w-4 rounded-full bg-slate-400"></div> <div class="h-2 w-[100px] rounded-lg bg-slate-400"></div></div>',
        n,
        u,
        a,
        i = "Dark",
        f;
    const _ = [r[12], { value: "dark" }, { class: "sr-only" }];
    let c = {};
    for (let d = 0; d < _.length; d += 1) c = y(c, _[d]);
    return (
        (e = new we({ props: c })),
        {
            c() {
                D(e.$$.fragment),
                    (l = N()),
                    (t = T("div")),
                    (s = T("div")),
                    (s.innerHTML = o),
                    (u = N()),
                    (a = T("span")),
                    (a.textContent = i),
                    this.h();
            },
            l(d) {
                A(e.$$.fragment, d), (l = q(d)), (t = V(d, "DIV", { class: !0 }));
                var g = R(t);
                (s = V(g, "DIV", { class: !0, "data-svelte-h": !0 })),
                    Y(s) !== "svelte-uyfui2" && (s.innerHTML = o),
                    g.forEach(p),
                    (u = q(d)),
                    (a = V(d, "SPAN", { class: !0, "data-svelte-h": !0 })),
                    Y(a) !== "svelte-qx6zme" && (a.textContent = i),
                    this.h();
            },
            h() {
                I(s, "class", "space-y-2 rounded-sm bg-slate-950 p-2"),
                    I(
                        t,
                        "class",
                        (n =
                            (r[0].theme === "dark"
                                ? "ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60"
                                : "") +
                            " items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"),
                    ),
                    I(a, "class", "block w-full p-2 text-center font-normal");
            },
            m(d, g) {
                L(e, d, g), C(d, l, g), C(d, t, g), B(t, s), C(d, u, g), C(d, a, g), (f = !0);
            },
            p(d, g) {
                const h = g & 4096 ? O(_, [re(d[12]), _[1], _[2]]) : {};
                e.$set(h),
                    (!f ||
                        (g & 1 &&
                            n !==
                                (n =
                                    (d[0].theme === "dark"
                                        ? "ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60"
                                        : "") +
                                    " items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"))) &&
                        I(t, "class", n);
            },
            i(d) {
                f || (b(e.$$.fragment, d), (f = !0));
            },
            o(d) {
                k(e.$$.fragment, d), (f = !1);
            },
            d(d) {
                d && (p(l), p(t), p(u), p(a)), M(e, d);
            },
        }
    );
}
function Ll(r) {
    let e, l;
    return (
        (e = new ke({
            props: {
                class: "[&:has([data-state=checked])>div]:border-primary",
                $$slots: { default: [Al] },
                $$scope: { ctx: r },
            },
        })),
        {
            c() {
                D(e.$$.fragment);
            },
            l(t) {
                A(e.$$.fragment, t);
            },
            m(t, s) {
                L(e, t, s), (l = !0);
            },
            p(t, s) {
                const o = {};
                s & 12289 && (o.$$scope = { dirty: s, ctx: t }), e.$set(o);
            },
            i(t) {
                l || (b(e.$$.fragment, t), (l = !0));
            },
            o(t) {
                k(e.$$.fragment, t), (l = !1);
            },
            d(t) {
                M(e, t);
            },
        }
    );
}
function Ml(r) {
    let e, l, t, s, o, n, u, a;
    return (
        (e = new he({
            props: {
                $$slots: { default: [yl, ({ attrs: i }) => ({ 12: i }), ({ attrs: i }) => (i ? 4096 : 0)] },
                $$scope: { ctx: r },
            },
        })),
        (t = new he({
            props: {
                $$slots: { default: [Dl, ({ attrs: i }) => ({ 12: i }), ({ attrs: i }) => (i ? 4096 : 0)] },
                $$scope: { ctx: r },
            },
        })),
        (o = new he({
            props: {
                $$slots: { default: [Ll, ({ attrs: i }) => ({ 12: i }), ({ attrs: i }) => (i ? 4096 : 0)] },
                $$scope: { ctx: r },
            },
        })),
        (u = new wl({ props: { name: "theme" } })),
        {
            c() {
                D(e.$$.fragment), (l = N()), D(t.$$.fragment), (s = N()), D(o.$$.fragment), (n = N()), D(u.$$.fragment);
            },
            l(i) {
                A(e.$$.fragment, i),
                    (l = q(i)),
                    A(t.$$.fragment, i),
                    (s = q(i)),
                    A(o.$$.fragment, i),
                    (n = q(i)),
                    A(u.$$.fragment, i);
            },
            m(i, f) {
                L(e, i, f), C(i, l, f), L(t, i, f), C(i, s, f), L(o, i, f), C(i, n, f), L(u, i, f), (a = !0);
            },
            p(i, f) {
                const _ = {};
                f & 12289 && (_.$$scope = { dirty: f, ctx: i }), e.$set(_);
                const c = {};
                f & 12289 && (c.$$scope = { dirty: f, ctx: i }), t.$set(c);
                const d = {};
                f & 12289 && (d.$$scope = { dirty: f, ctx: i }), o.$set(d);
            },
            i(i) {
                a || (b(e.$$.fragment, i), b(t.$$.fragment, i), b(o.$$.fragment, i), b(u.$$.fragment, i), (a = !0));
            },
            o(i) {
                k(e.$$.fragment, i), k(t.$$.fragment, i), k(o.$$.fragment, i), k(u.$$.fragment, i), (a = !1);
            },
            d(i) {
                i && (p(l), p(s), p(n)), M(e, i), M(t, i), M(o, i), M(u, i);
            },
        }
    );
}
function Tl(r) {
    let e, l, t, s, o, n, u, a, i;
    (e = new Xe({ props: { $$slots: { default: [Cl] }, $$scope: { ctx: r } } })),
        (t = new Ye({ props: { $$slots: { default: [$l] }, $$scope: { ctx: r } } })),
        (o = new xe({}));
    function f(c) {
        r[6](c);
    }
    let _ = {
        class: "grid max-w-full grid-cols-1 md:grid-cols-3 gap-8 pt-2",
        orientation: "horizontal",
        $$slots: { default: [Ml] },
        $$scope: { ctx: r },
    };
    return (
        r[0].theme !== void 0 && (_.value = r[0].theme),
        (u = new dl({ props: _ })),
        se.push(() => Fe(u, "value", f)),
        {
            c() {
                D(e.$$.fragment), (l = N()), D(t.$$.fragment), (s = N()), D(o.$$.fragment), (n = N()), D(u.$$.fragment);
            },
            l(c) {
                A(e.$$.fragment, c),
                    (l = q(c)),
                    A(t.$$.fragment, c),
                    (s = q(c)),
                    A(o.$$.fragment, c),
                    (n = q(c)),
                    A(u.$$.fragment, c);
            },
            m(c, d) {
                L(e, c, d), C(c, l, d), L(t, c, d), C(c, s, d), L(o, c, d), C(c, n, d), L(u, c, d), (i = !0);
            },
            p(c, d) {
                const g = {};
                d & 8192 && (g.$$scope = { dirty: d, ctx: c }), e.$set(g);
                const h = {};
                d & 8192 && (h.$$scope = { dirty: d, ctx: c }), t.$set(h);
                const m = {};
                d & 8193 && (m.$$scope = { dirty: d, ctx: c }),
                    !a && d & 1 && ((a = !0), (m.value = c[0].theme), je(() => (a = !1))),
                    u.$set(m);
            },
            i(c) {
                i || (b(e.$$.fragment, c), b(t.$$.fragment, c), b(o.$$.fragment, c), b(u.$$.fragment, c), (i = !0));
            },
            o(c) {
                k(e.$$.fragment, c), k(t.$$.fragment, c), k(o.$$.fragment, c), k(u.$$.fragment, c), (i = !1);
            },
            d(c) {
                c && (p(l), p(s), p(n)), M(e, c), M(t, c), M(o, c), M(u, c);
            },
        }
    );
}
function Vl(r) {
    let e;
    return {
        c() {
            e = ve("Update preferences");
        },
        l(l) {
            e = be(l, "Update preferences");
        },
        m(l, t) {
            C(l, e, t);
        },
        d(l) {
            l && p(e);
        },
    };
}
function Nl(r) {
    let e, l, t, s, o, n, u;
    return (
        (l = new Ze({ props: { form: r[1], name: "theme", $$slots: { default: [Tl] }, $$scope: { ctx: r } } })),
        (s = new il({ props: { class: "w-full md:w-auto", $$slots: { default: [Vl] }, $$scope: { ctx: r } } })),
        s.$on("click", r[4]),
        {
            c() {
                (e = T("form")), D(l.$$.fragment), (t = N()), D(s.$$.fragment), this.h();
            },
            l(a) {
                e = V(a, "FORM", { method: !0, class: !0 });
                var i = R(e);
                A(l.$$.fragment, i), (t = q(i)), A(s.$$.fragment, i), i.forEach(p), this.h();
            },
            h() {
                I(e, "method", "POST"), I(e, "class", "space-y-8 svelte-uum433");
            },
            m(a, i) {
                C(a, e, i),
                    L(l, e, null),
                    B(e, t),
                    L(s, e, null),
                    (o = !0),
                    n || ((u = _e(r[3].call(null, e))), (n = !0));
            },
            p(a, [i]) {
                const f = {};
                i & 8193 && (f.$$scope = { dirty: i, ctx: a }), l.$set(f);
                const _ = {};
                i & 8192 && (_.$$scope = { dirty: i, ctx: a }), s.$set(_);
            },
            i(a) {
                o || (b(l.$$.fragment, a), b(s.$$.fragment, a), (o = !0));
            },
            o(a) {
                k(l.$$.fragment, a), k(s.$$.fragment, a), (o = !1);
            },
            d(a) {
                a && p(e), M(l), M(s), (n = !1), u();
            },
        }
    );
}
const ql = $e.object({ theme: $e.enum(["auto", "light", "dark"], { required_error: "Please select a theme." }) });
function Pl(r, e, l) {
    let t,
        { data: s } = e;
    const o = Qe(s, { validators: Je(ql) }),
        { form: n, enhance: u } = o;
    ne(r, n, (d) => l(0, (t = d)));
    let a,
        i = null,
        f = null;
    async function _() {
        const g = De().currentUser;
        if (((f = g ? g.uid : null), f)) {
            const h = Ae(Le, "users", f),
                m = t.theme;
            await kt(h, { theme: m }, { merge: !0 });
        }
        o.reset(), location.reload();
    }
    Ke(() => {
        (a = De()),
            vt(a, async (d) => {
                if (!d) await lt(ct.LOGIN);
                else {
                    (i = d), (f = i.uid);
                    const g = Ae(Le, "settings", f),
                        m = (await bt(g)).data();
                    if (m) We(n, (t = m), t);
                    else throw new Error("User data is invalid");
                }
            });
    });
    function c(d) {
        r.$$.not_equal(t.theme, d) && ((t.theme = d), n.set(t));
    }
    return (
        (r.$$set = (d) => {
            "data" in d && l(5, (s = d.data));
        }),
        [t, o, n, u, _, s, c]
    );
}
class Sl extends U {
    constructor(e) {
        super(), G(this, e, Pl, Nl, F, { data: 5 });
    }
}
function Rl(r) {
    let e,
        l,
        t =
            '<h3 class="text-lg md:text-xl font-medium">Appearance</h3> <p class="text-sm md:text-base text-muted-foreground">Customize the appearance of the app. Automatically switch between day and night themes.</p>',
        s,
        o,
        n,
        u,
        a;
    return (
        (o = new Ct({})),
        (u = new Sl({ props: { data: r[0].form } })),
        {
            c() {
                (e = T("div")),
                    (l = T("div")),
                    (l.innerHTML = t),
                    (s = N()),
                    D(o.$$.fragment),
                    (n = N()),
                    D(u.$$.fragment),
                    this.h();
            },
            l(i) {
                e = V(i, "DIV", { class: !0 });
                var f = R(e);
                (l = V(f, "DIV", { "data-svelte-h": !0 })),
                    Y(l) !== "svelte-1jq4tsn" && (l.innerHTML = t),
                    (s = q(f)),
                    A(o.$$.fragment, f),
                    (n = q(f)),
                    A(u.$$.fragment, f),
                    f.forEach(p),
                    this.h();
            },
            h() {
                I(e, "class", "space-y-6 md:space-y-8 svelte-1gzu3nl");
            },
            m(i, f) {
                C(i, e, f), B(e, l), B(e, s), L(o, e, null), B(e, n), L(u, e, null), (a = !0);
            },
            p(i, [f]) {
                const _ = {};
                f & 1 && (_.data = i[0].form), u.$set(_);
            },
            i(i) {
                a || (b(o.$$.fragment, i), b(u.$$.fragment, i), (a = !0));
            },
            o(i) {
                k(o.$$.fragment, i), k(u.$$.fragment, i), (a = !1);
            },
            d(i) {
                i && p(e), M(o), M(u);
            },
        }
    );
}
function Hl(r, e, l) {
    let { data: t } = e;
    return (
        (r.$$set = (s) => {
            "data" in s && l(0, (t = s.data));
        }),
        [t]
    );
}
class xl extends U {
    constructor(e) {
        super(), G(this, e, Hl, Rl, F, { data: 0 });
    }
}
export { xl as component };
