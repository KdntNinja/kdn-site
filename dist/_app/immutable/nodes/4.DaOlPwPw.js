import {
    s as X,
    e as S,
    c as L,
    b as j,
    f as u,
    l as x,
    m as H,
    i as d,
    h as I,
    o as Z,
    a as P,
    g as T,
    p as K,
    q as F,
    r as R,
    u as ee,
    t as y,
    d as A,
} from "../chunks/scheduler.CCxz69I-.js";
import { S as te, i as se, c as g, a as h, m as v, t as w, b, d as C, e as W } from "../chunks/index.BXRlT4_D.js";
import { C as ae } from "../chunks/card.Ca7f7NtU.js";
import { C as ne, a as re, b as oe, c as le } from "../chunks/card-title.BeghIEH_.js";
import { C as ie, I as Y, g as fe, c as ce } from "../chunks/input.JDMBaFz9.js";
import {
    o as $e,
    g as ue,
    s as pe,
    a as O,
    b as me,
    c as de,
    d as _e,
    e as ge,
    f as he,
} from "../chunks/firebase.CPJmnSU3.js";
import { B as ve } from "../chunks/index.CqeUFQjM.js";
import { L as z } from "../chunks/label.CPP9iySr.js";
import { r as q } from "../chunks/routes.CVgu8Yrj.js";
import { g as J } from "../chunks/entry.CzViBFHa.js";
function we(i) {
    let t;
    return {
        c() {
            t = y("Login");
        },
        l(e) {
            t = A(e, "Login");
        },
        m(e, s) {
            d(e, t, s);
        },
        d(e) {
            e && u(t);
        },
    };
}
function be(i) {
    let t;
    return {
        c() {
            t = y("Enter your credentials to login.");
        },
        l(e) {
            t = A(e, "Enter your credentials to login.");
        },
        m(e, s) {
            d(e, t, s);
        },
        d(e) {
            e && u(t);
        },
    };
}
function Ce(i) {
    let t, e, s, o;
    return (
        (t = new oe({ props: { $$slots: { default: [we] }, $$scope: { ctx: i } } })),
        (s = new le({ props: { $$slots: { default: [be] }, $$scope: { ctx: i } } })),
        {
            c() {
                g(t.$$.fragment), (e = P()), g(s.$$.fragment);
            },
            l(n) {
                h(t.$$.fragment, n), (e = T(n)), h(s.$$.fragment, n);
            },
            m(n, r) {
                v(t, n, r), d(n, e, r), v(s, n, r), (o = !0);
            },
            p(n, r) {
                const f = {};
                r & 64 && (f.$$scope = { dirty: r, ctx: n }), t.$set(f);
                const m = {};
                r & 64 && (m.$$scope = { dirty: r, ctx: n }), s.$set(m);
            },
            i(n) {
                o || (w(t.$$.fragment, n), w(s.$$.fragment, n), (o = !0));
            },
            o(n) {
                b(t.$$.fragment, n), b(s.$$.fragment, n), (o = !1);
            },
            d(n) {
                n && u(e), C(t, n), C(s, n);
            },
        }
    );
}
function De(i) {
    let t;
    return {
        c() {
            t = y("Email");
        },
        l(e) {
            t = A(e, "Email");
        },
        m(e, s) {
            d(e, t, s);
        },
        d(e) {
            e && u(t);
        },
    };
}
function Ee(i) {
    let t;
    return {
        c() {
            t = y("Password");
        },
        l(e) {
            t = A(e, "Password");
        },
        m(e, s) {
            d(e, t, s);
        },
        d(e) {
            e && u(t);
        },
    };
}
function Ie(i) {
    let t, e, s, o, n, r, f, m, l, a, $, p, E, D;
    o = new z({ props: { for: "email", $$slots: { default: [De] }, $$scope: { ctx: i } } });
    function B(c) {
        i[3](c);
    }
    let G = { id: "email", placeholder: "Your email" };
    i[0] !== void 0 && (G.value = i[0]),
        (r = new Y({ props: G })),
        F.push(() => W(r, "value", B)),
        (a = new z({ props: { for: "password", $$slots: { default: [Ee] }, $$scope: { ctx: i } } }));
    function Q(c) {
        i[4](c);
    }
    let N = { id: "password", type: "password", placeholder: "Your password" };
    return (
        i[1] !== void 0 && (N.value = i[1]),
        (p = new Y({ props: N })),
        F.push(() => W(p, "value", Q)),
        {
            c() {
                (t = S("form")),
                    (e = S("div")),
                    (s = S("div")),
                    g(o.$$.fragment),
                    (n = P()),
                    g(r.$$.fragment),
                    (m = P()),
                    (l = S("div")),
                    g(a.$$.fragment),
                    ($ = P()),
                    g(p.$$.fragment),
                    this.h();
            },
            l(c) {
                t = L(c, "FORM", {});
                var _ = j(t);
                e = L(_, "DIV", { class: !0 });
                var M = j(e);
                s = L(M, "DIV", { class: !0 });
                var k = j(s);
                h(o.$$.fragment, k),
                    (n = T(k)),
                    h(r.$$.fragment, k),
                    k.forEach(u),
                    (m = T(M)),
                    (l = L(M, "DIV", { class: !0 }));
                var V = j(l);
                h(a.$$.fragment, V),
                    ($ = T(V)),
                    h(p.$$.fragment, V),
                    V.forEach(u),
                    M.forEach(u),
                    _.forEach(u),
                    this.h();
            },
            h() {
                x(s, "class", "flex flex-col space-y-1.5"),
                    x(l, "class", "flex flex-col space-y-1.5"),
                    x(e, "class", "grid w-full items-center gap-4");
            },
            m(c, _) {
                d(c, t, _),
                    I(t, e),
                    I(e, s),
                    v(o, s, null),
                    I(s, n),
                    v(r, s, null),
                    I(e, m),
                    I(e, l),
                    v(a, l, null),
                    I(l, $),
                    v(p, l, null),
                    (D = !0);
            },
            p(c, _) {
                const M = {};
                _ & 64 && (M.$$scope = { dirty: _, ctx: c }), o.$set(M);
                const k = {};
                !f && _ & 1 && ((f = !0), (k.value = c[0]), R(() => (f = !1))), r.$set(k);
                const V = {};
                _ & 64 && (V.$$scope = { dirty: _, ctx: c }), a.$set(V);
                const U = {};
                !E && _ & 2 && ((E = !0), (U.value = c[1]), R(() => (E = !1))), p.$set(U);
            },
            i(c) {
                D || (w(o.$$.fragment, c), w(r.$$.fragment, c), w(a.$$.fragment, c), w(p.$$.fragment, c), (D = !0));
            },
            o(c) {
                b(o.$$.fragment, c), b(r.$$.fragment, c), b(a.$$.fragment, c), b(p.$$.fragment, c), (D = !1);
            },
            d(c) {
                c && u(t), C(o), C(r), C(a), C(p);
            },
        }
    );
}
function Se(i) {
    let t;
    return {
        c() {
            t = y("Login");
        },
        l(e) {
            t = A(e, "Login");
        },
        m(e, s) {
            d(e, t, s);
        },
        d(e) {
            e && u(t);
        },
    };
}
function Le(i) {
    let t,
        e,
        s,
        o,
        n = `<img src="${fe}" alt="Google logo"/>`,
        r,
        f,
        m;
    return (
        (e = new ve({ props: { $$slots: { default: [Se] }, $$scope: { ctx: i } } })),
        e.$on("click", i[5]),
        {
            c() {
                (t = S("div")), g(e.$$.fragment), (s = P()), (o = S("button")), (o.innerHTML = n), this.h();
            },
            l(l) {
                t = L(l, "DIV", { class: !0 });
                var a = j(t);
                h(e.$$.fragment, a),
                    (s = T(a)),
                    (o = L(a, "BUTTON", { class: !0, "data-svelte-h": !0 })),
                    K(o) !== "svelte-veytja" && (o.innerHTML = n),
                    a.forEach(u),
                    this.h();
            },
            h() {
                x(o, "class", "ml-4"), x(t, "class", "flex justify-center");
            },
            m(l, a) {
                d(l, t, a), v(e, t, null), I(t, s), I(t, o), (r = !0), f || ((m = ee(o, "click", ce)), (f = !0));
            },
            p(l, a) {
                const $ = {};
                a & 64 && ($.$$scope = { dirty: a, ctx: l }), e.$set($);
            },
            i(l) {
                r || (w(e.$$.fragment, l), (r = !0));
            },
            o(l) {
                b(e.$$.fragment, l), (r = !1);
            },
            d(l) {
                l && u(t), C(e), (f = !1), m();
            },
        }
    );
}
function Pe(i) {
    let t,
        e,
        s,
        o,
        n,
        r,
        f,
        m = `<a href="${q.SIGNUP}" class="text-blue-500 hover:underline">Don&#39;t have an account? Sign Up</a>`,
        l;
    return (
        (t = new ne({ props: { $$slots: { default: [Ce] }, $$scope: { ctx: i } } })),
        (s = new re({ props: { $$slots: { default: [Ie] }, $$scope: { ctx: i } } })),
        (n = new ie({ props: { class: "flex justify-between", $$slots: { default: [Le] }, $$scope: { ctx: i } } })),
        {
            c() {
                g(t.$$.fragment),
                    (e = P()),
                    g(s.$$.fragment),
                    (o = P()),
                    g(n.$$.fragment),
                    (r = P()),
                    (f = S("div")),
                    (f.innerHTML = m),
                    this.h();
            },
            l(a) {
                h(t.$$.fragment, a),
                    (e = T(a)),
                    h(s.$$.fragment, a),
                    (o = T(a)),
                    h(n.$$.fragment, a),
                    (r = T(a)),
                    (f = L(a, "DIV", { class: !0, "data-svelte-h": !0 })),
                    K(f) !== "svelte-1al7gwq" && (f.innerHTML = m),
                    this.h();
            },
            h() {
                x(f, "class", "flex justify-center p-4");
            },
            m(a, $) {
                v(t, a, $), d(a, e, $), v(s, a, $), d(a, o, $), v(n, a, $), d(a, r, $), d(a, f, $), (l = !0);
            },
            p(a, $) {
                const p = {};
                $ & 64 && (p.$$scope = { dirty: $, ctx: a }), t.$set(p);
                const E = {};
                $ & 67 && (E.$$scope = { dirty: $, ctx: a }), s.$set(E);
                const D = {};
                $ & 67 && (D.$$scope = { dirty: $, ctx: a }), n.$set(D);
            },
            i(a) {
                l || (w(t.$$.fragment, a), w(s.$$.fragment, a), w(n.$$.fragment, a), (l = !0));
            },
            o(a) {
                b(t.$$.fragment, a), b(s.$$.fragment, a), b(n.$$.fragment, a), (l = !1);
            },
            d(a) {
                a && (u(e), u(o), u(r), u(f)), C(t, a), C(s, a), C(n, a);
            },
        }
    );
}
function Te(i) {
    let t, e, s, o;
    return (
        (s = new ae({ props: { class: "w-[350px]", $$slots: { default: [Pe] }, $$scope: { ctx: i } } })),
        {
            c() {
                (t = S("main")), (e = S("div")), g(s.$$.fragment), this.h();
            },
            l(n) {
                t = L(n, "MAIN", {});
                var r = j(t);
                e = L(r, "DIV", { class: !0, style: !0 });
                var f = j(e);
                h(s.$$.fragment, f), f.forEach(u), r.forEach(u), this.h();
            },
            h() {
                x(e, "class", "card-container"),
                    H(e, "display", "flex"),
                    H(e, "justify-content", "center"),
                    H(e, "align-items", "center"),
                    H(e, "height", "100vh");
            },
            m(n, r) {
                d(n, t, r), I(t, e), v(s, e, null), (o = !0);
            },
            p(n, [r]) {
                const f = {};
                r & 67 && (f.$$scope = { dirty: r, ctx: n }), s.$set(f);
            },
            i(n) {
                o || (w(s.$$.fragment, n), (o = !0));
            },
            o(n) {
                b(s.$$.fragment, n), (o = !1);
            },
            d(n) {
                n && u(t), C(s);
            },
        }
    );
}
function Me(i, t, e) {
    Z(() => {
        $e(O, (l) => {
            l && J(q.POSTS);
        });
    });
    let s = "",
        o = "";
    const n = async (l, a) => {
        if (!l || !a) {
            alert("Please enter your email and password.");
            return;
        }
        const $ = ue();
        try {
            await pe(O, me);
            const E = (await de(O, l, a)).user;
            if (E) {
                const D = _e($, "users", E.uid);
                (await ge(D)).exists() || (await he(D, { group: "default", isAdmin: !1 }, { merge: !0 })),
                    await J(q.POSTS);
            }
        } catch (p) {
            console.error(p);
        }
    };
    function r(l) {
        (s = l), e(0, s);
    }
    function f(l) {
        (o = l), e(1, o);
    }
    return [
        s,
        o,
        n,
        r,
        f,
        (l) => {
            l.preventDefault(), n(s, o);
        },
    ];
}
class Ge extends te {
    constructor(t) {
        super(), se(this, t, Me, Te, X, {});
    }
}
export { Ge as component };
