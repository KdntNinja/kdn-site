import {
    s as ie,
    e as V,
    c as M,
    b as x,
    f as c,
    l as O,
    m as N,
    i as _,
    o as fe,
    a as I,
    g as E,
    p as ne,
    q as W,
    h as P,
    r as Y,
    u as $e,
    t as B,
    d as G,
} from "../chunks/scheduler.CCxz69I-.js";
import { S as ue, i as ce, c as g, a as h, m as v, t as w, b, d as C, e as y } from "../chunks/index.BXRlT4_D.js";
import { C as pe } from "../chunks/card.C_2LXiek.js";
import { C as me, a as de, b as _e, c as ge } from "../chunks/card-title.DfG4Skik.js";
import { C as he, I as z, g as ve, c as we } from "../chunks/input.EnLd8Tr8.js";
import { B as be } from "../chunks/index.OiyrjFVc.js";
import { L as J } from "../chunks/label.B47Zk4xs.js";
import {
    o as Ce,
    g as Se,
    s as De,
    a as K,
    b as Pe,
    c as Ie,
    d as Ee,
    e as Le,
    f as Te,
} from "../chunks/firebase.BWW6NFj2.js";
import { r as Q } from "../chunks/routes.BurMO2Cv.js";
import { g as ae } from "../chunks/entry.VNHXcdGV.js";
function ke(i) {
    let e;
    return {
        c() {
            e = B("Sign Up");
        },
        l(t) {
            e = G(t, "Sign Up");
        },
        m(t, s) {
            _(t, e, s);
        },
        d(t) {
            t && c(e);
        },
    };
}
function Ve(i) {
    let e;
    return {
        c() {
            e = B("Create a new account.");
        },
        l(t) {
            e = G(t, "Create a new account.");
        },
        m(t, s) {
            _(t, e, s);
        },
        d(t) {
            t && c(e);
        },
    };
}
function Me(i) {
    let e, t, s, r;
    return (
        (e = new _e({ props: { $$slots: { default: [ke] }, $$scope: { ctx: i } } })),
        (s = new ge({ props: { $$slots: { default: [Ve] }, $$scope: { ctx: i } } })),
        {
            c() {
                g(e.$$.fragment), (t = I()), g(s.$$.fragment);
            },
            l(n) {
                h(e.$$.fragment, n), (t = E(n)), h(s.$$.fragment, n);
            },
            m(n, o) {
                v(e, n, o), _(n, t, o), v(s, n, o), (r = !0);
            },
            p(n, o) {
                const u = {};
                o & 256 && (u.$$scope = { dirty: o, ctx: n }), e.$set(u);
                const p = {};
                o & 256 && (p.$$scope = { dirty: o, ctx: n }), s.$set(p);
            },
            i(n) {
                r || (w(e.$$.fragment, n), w(s.$$.fragment, n), (r = !0));
            },
            o(n) {
                b(e.$$.fragment, n), b(s.$$.fragment, n), (r = !1);
            },
            d(n) {
                n && c(t), C(e, n), C(s, n);
            },
        }
    );
}
function Ue(i) {
    let e;
    return {
        c() {
            e = B("Email");
        },
        l(t) {
            e = G(t, "Email");
        },
        m(t, s) {
            _(t, e, s);
        },
        d(t) {
            t && c(e);
        },
    };
}
function Oe(i) {
    let e;
    return {
        c() {
            e = B("Password");
        },
        l(t) {
            e = G(t, "Password");
        },
        m(t, s) {
            _(t, e, s);
        },
        d(t) {
            t && c(e);
        },
    };
}
function je(i) {
    let e;
    return {
        c() {
            e = B("Confirm Password");
        },
        l(t) {
            e = G(t, "Confirm Password");
        },
        m(t, s) {
            _(t, e, s);
        },
        d(t) {
            t && c(e);
        },
    };
}
function Ae(i) {
    let e, t, s, r, n, o, u, p, $, a, l, m, U, L, S, D, q, T, R, F;
    r = new J({ props: { for: "email", $$slots: { default: [Ue] }, $$scope: { ctx: i } } });
    function re(f) {
        i[4](f);
    }
    let X = { id: "email", placeholder: "Your email" };
    i[0] !== void 0 && (X.value = i[0]),
        (o = new z({ props: X })),
        W.push(() => y(o, "value", re)),
        (a = new J({ props: { for: "password", $$slots: { default: [Oe] }, $$scope: { ctx: i } } }));
    function oe(f) {
        i[5](f);
    }
    let Z = { id: "password", type: "password", placeholder: "Your password" };
    i[1] !== void 0 && (Z.value = i[1]),
        (m = new z({ props: Z })),
        W.push(() => y(m, "value", oe)),
        (D = new J({ props: { for: "confirmPassword", $$slots: { default: [je] }, $$scope: { ctx: i } } }));
    function le(f) {
        i[6](f);
    }
    let ee = { id: "confirmPassword", type: "password", placeholder: "Confirm your password" };
    return (
        i[2] !== void 0 && (ee.value = i[2]),
        (T = new z({ props: ee })),
        W.push(() => y(T, "value", le)),
        {
            c() {
                (e = V("form")),
                    (t = V("div")),
                    (s = V("div")),
                    g(r.$$.fragment),
                    (n = I()),
                    g(o.$$.fragment),
                    (p = I()),
                    ($ = V("div")),
                    g(a.$$.fragment),
                    (l = I()),
                    g(m.$$.fragment),
                    (L = I()),
                    (S = V("div")),
                    g(D.$$.fragment),
                    (q = I()),
                    g(T.$$.fragment),
                    this.h();
            },
            l(f) {
                e = M(f, "FORM", {});
                var d = x(e);
                t = M(d, "DIV", { class: !0 });
                var k = x(t);
                s = M(k, "DIV", { class: !0 });
                var j = x(s);
                h(r.$$.fragment, j),
                    (n = E(j)),
                    h(o.$$.fragment, j),
                    j.forEach(c),
                    (p = E(k)),
                    ($ = M(k, "DIV", { class: !0 }));
                var A = x($);
                h(a.$$.fragment, A),
                    (l = E(A)),
                    h(m.$$.fragment, A),
                    A.forEach(c),
                    (L = E(k)),
                    (S = M(k, "DIV", { class: !0 }));
                var H = x(S);
                h(D.$$.fragment, H),
                    (q = E(H)),
                    h(T.$$.fragment, H),
                    H.forEach(c),
                    k.forEach(c),
                    d.forEach(c),
                    this.h();
            },
            h() {
                O(s, "class", "flex flex-col space-y-1.5"),
                    O($, "class", "flex flex-col space-y-1.5"),
                    O(S, "class", "flex flex-col space-y-1.5"),
                    O(t, "class", "grid w-full items-center gap-4");
            },
            m(f, d) {
                _(f, e, d),
                    P(e, t),
                    P(t, s),
                    v(r, s, null),
                    P(s, n),
                    v(o, s, null),
                    P(t, p),
                    P(t, $),
                    v(a, $, null),
                    P($, l),
                    v(m, $, null),
                    P(t, L),
                    P(t, S),
                    v(D, S, null),
                    P(S, q),
                    v(T, S, null),
                    (F = !0);
            },
            p(f, d) {
                const k = {};
                d & 256 && (k.$$scope = { dirty: d, ctx: f }), r.$set(k);
                const j = {};
                !u && d & 1 && ((u = !0), (j.value = f[0]), Y(() => (u = !1))), o.$set(j);
                const A = {};
                d & 256 && (A.$$scope = { dirty: d, ctx: f }), a.$set(A);
                const H = {};
                !U && d & 2 && ((U = !0), (H.value = f[1]), Y(() => (U = !1))), m.$set(H);
                const te = {};
                d & 256 && (te.$$scope = { dirty: d, ctx: f }), D.$set(te);
                const se = {};
                !R && d & 4 && ((R = !0), (se.value = f[2]), Y(() => (R = !1))), T.$set(se);
            },
            i(f) {
                F ||
                    (w(r.$$.fragment, f),
                    w(o.$$.fragment, f),
                    w(a.$$.fragment, f),
                    w(m.$$.fragment, f),
                    w(D.$$.fragment, f),
                    w(T.$$.fragment, f),
                    (F = !0));
            },
            o(f) {
                b(r.$$.fragment, f),
                    b(o.$$.fragment, f),
                    b(a.$$.fragment, f),
                    b(m.$$.fragment, f),
                    b(D.$$.fragment, f),
                    b(T.$$.fragment, f),
                    (F = !1);
            },
            d(f) {
                f && c(e), C(r), C(o), C(a), C(m), C(D), C(T);
            },
        }
    );
}
function He(i) {
    let e;
    return {
        c() {
            e = B("Sign Up");
        },
        l(t) {
            e = G(t, "Sign Up");
        },
        m(t, s) {
            _(t, e, s);
        },
        d(t) {
            t && c(e);
        },
    };
}
function xe(i) {
    let e,
        t,
        s,
        r,
        n = `<img src="${ve}" alt="Google logo"/>`,
        o,
        u,
        p;
    return (
        (t = new be({ props: { $$slots: { default: [He] }, $$scope: { ctx: i } } })),
        t.$on("click", i[7]),
        {
            c() {
                (e = V("div")), g(t.$$.fragment), (s = I()), (r = V("button")), (r.innerHTML = n), this.h();
            },
            l($) {
                e = M($, "DIV", { class: !0 });
                var a = x(e);
                h(t.$$.fragment, a),
                    (s = E(a)),
                    (r = M(a, "BUTTON", { class: !0, "data-svelte-h": !0 })),
                    ne(r) !== "svelte-drkzra" && (r.innerHTML = n),
                    a.forEach(c),
                    this.h();
            },
            h() {
                O(r, "class", "ml-4"), O(e, "class", "flex justify-center");
            },
            m($, a) {
                _($, e, a), v(t, e, null), P(e, s), P(e, r), (o = !0), u || ((p = $e(r, "click", we)), (u = !0));
            },
            p($, a) {
                const l = {};
                a & 256 && (l.$$scope = { dirty: a, ctx: $ }), t.$set(l);
            },
            i($) {
                o || (w(t.$$.fragment, $), (o = !0));
            },
            o($) {
                b(t.$$.fragment, $), (o = !1);
            },
            d($) {
                $ && c(e), C(t), (u = !1), p();
            },
        }
    );
}
function Be(i) {
    let e,
        t,
        s,
        r,
        n,
        o,
        u,
        p = `<a href="${Q.LOGIN}" class="text-blue-500 hover:underline">Already have an account? Login</a>`,
        $;
    return (
        (e = new me({ props: { $$slots: { default: [Me] }, $$scope: { ctx: i } } })),
        (s = new de({ props: { $$slots: { default: [Ae] }, $$scope: { ctx: i } } })),
        (n = new he({ props: { class: "flex justify-between", $$slots: { default: [xe] }, $$scope: { ctx: i } } })),
        {
            c() {
                g(e.$$.fragment),
                    (t = I()),
                    g(s.$$.fragment),
                    (r = I()),
                    g(n.$$.fragment),
                    (o = I()),
                    (u = V("div")),
                    (u.innerHTML = p),
                    this.h();
            },
            l(a) {
                h(e.$$.fragment, a),
                    (t = E(a)),
                    h(s.$$.fragment, a),
                    (r = E(a)),
                    h(n.$$.fragment, a),
                    (o = E(a)),
                    (u = M(a, "DIV", { class: !0, "data-svelte-h": !0 })),
                    ne(u) !== "svelte-1l3xed4" && (u.innerHTML = p),
                    this.h();
            },
            h() {
                O(u, "class", "flex justify-center p-4");
            },
            m(a, l) {
                v(e, a, l), _(a, t, l), v(s, a, l), _(a, r, l), v(n, a, l), _(a, o, l), _(a, u, l), ($ = !0);
            },
            p(a, l) {
                const m = {};
                l & 256 && (m.$$scope = { dirty: l, ctx: a }), e.$set(m);
                const U = {};
                l & 263 && (U.$$scope = { dirty: l, ctx: a }), s.$set(U);
                const L = {};
                l & 259 && (L.$$scope = { dirty: l, ctx: a }), n.$set(L);
            },
            i(a) {
                $ || (w(e.$$.fragment, a), w(s.$$.fragment, a), w(n.$$.fragment, a), ($ = !0));
            },
            o(a) {
                b(e.$$.fragment, a), b(s.$$.fragment, a), b(n.$$.fragment, a), ($ = !1);
            },
            d(a) {
                a && (c(t), c(r), c(o), c(u)), C(e, a), C(s, a), C(n, a);
            },
        }
    );
}
function Ge(i) {
    let e, t, s;
    return (
        (t = new pe({ props: { class: "w-[350px]", $$slots: { default: [Be] }, $$scope: { ctx: i } } })),
        {
            c() {
                (e = V("div")), g(t.$$.fragment), this.h();
            },
            l(r) {
                e = M(r, "DIV", { class: !0, style: !0 });
                var n = x(e);
                h(t.$$.fragment, n), n.forEach(c), this.h();
            },
            h() {
                O(e, "class", "card-container"),
                    N(e, "display", "flex"),
                    N(e, "justify-content", "center"),
                    N(e, "align-items", "center"),
                    N(e, "height", "100vh");
            },
            m(r, n) {
                _(r, e, n), v(t, e, null), (s = !0);
            },
            p(r, [n]) {
                const o = {};
                n & 263 && (o.$$scope = { dirty: n, ctx: r }), t.$set(o);
            },
            i(r) {
                s || (w(t.$$.fragment, r), (s = !0));
            },
            o(r) {
                b(t.$$.fragment, r), (s = !1);
            },
            d(r) {
                r && c(e), C(t);
            },
        }
    );
}
function qe(i, e, t) {
    let s = "",
        r = "",
        n = "";
    fe(() => {
        Ce(K, (l) => {
            l && ae(Q.POSTS);
        });
    });
    const o = async (l, m) => {
        const U = Se();
        try {
            await De(K, Pe);
            const S = (await Ie(K, l, m)).user;
            if (S) {
                const D = Ee(U, "users", S.uid);
                (await Le(D)).exists() || (await Te(D, { group: "default", isAdmin: !1 }, { merge: !0 }));
            }
            await ae(Q.POSTS);
        } catch (L) {
            console.error(L);
        }
    };
    function u(l) {
        (s = l), t(0, s);
    }
    function p(l) {
        (r = l), t(1, r);
    }
    function $(l) {
        (n = l), t(2, n);
    }
    return [
        s,
        r,
        n,
        o,
        u,
        p,
        $,
        (l) => {
            l.preventDefault(), o(s, r);
        },
    ];
}
class Xe extends ue {
    constructor(e) {
        super(), ce(this, e, qe, Ge, ie, {});
    }
}
export { Xe as component };
