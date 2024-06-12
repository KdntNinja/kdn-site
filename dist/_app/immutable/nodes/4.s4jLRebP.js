import {
    s as J,
    e as S,
    c as L,
    b as V,
    f as u,
    l as j,
    m as H,
    i as d,
    h as I,
    a as P,
    g as T,
    p as K,
    q as F,
    r as R,
    u as te,
    t as y,
    d as A,
    n as se,
    o as ne,
} from "../chunks/scheduler.CCxz69I-.js";
import { S as Q, i as X, c as _, a as g, m as h, t as v, b as w, d as b, e as W } from "../chunks/index.BXRlT4_D.js";
import { r as q } from "../chunks/routes.BurMO2Cv.js";
import {
    g as ae,
    s as re,
    a as O,
    b as oe,
    h as le,
    d as ie,
    e as fe,
    f as $e,
    o as ce,
} from "../chunks/firebase.BWW6NFj2.js";
import { C as ue } from "../chunks/card.C_2LXiek.js";
import { C as me, a as pe, b as de, c as _e } from "../chunks/card-title.DfG4Skik.js";
import { C as ge, I as Y, c as he, g as ve } from "../chunks/input.EnLd8Tr8.js";
import { B as we } from "../chunks/index.OiyrjFVc.js";
import { L as z } from "../chunks/label.B47Zk4xs.js";
import { g as Z } from "../chunks/entry.VNHXcdGV.js";
function be(i) {
    let e;
    return {
        c() {
            e = y("Login");
        },
        l(t) {
            e = A(t, "Login");
        },
        m(t, s) {
            d(t, e, s);
        },
        d(t) {
            t && u(e);
        },
    };
}
function Ce(i) {
    let e;
    return {
        c() {
            e = y("Enter your credentials to login.");
        },
        l(t) {
            e = A(t, "Enter your credentials to login.");
        },
        m(t, s) {
            d(t, e, s);
        },
        d(t) {
            t && u(e);
        },
    };
}
function De(i) {
    let e, t, s, r;
    return (
        (e = new de({ props: { $$slots: { default: [be] }, $$scope: { ctx: i } } })),
        (s = new _e({ props: { $$slots: { default: [Ce] }, $$scope: { ctx: i } } })),
        {
            c() {
                _(e.$$.fragment), (t = P()), _(s.$$.fragment);
            },
            l(a) {
                g(e.$$.fragment, a), (t = T(a)), g(s.$$.fragment, a);
            },
            m(a, o) {
                h(e, a, o), d(a, t, o), h(s, a, o), (r = !0);
            },
            p(a, o) {
                const f = {};
                o & 64 && (f.$$scope = { dirty: o, ctx: a }), e.$set(f);
                const p = {};
                o & 64 && (p.$$scope = { dirty: o, ctx: a }), s.$set(p);
            },
            i(a) {
                r || (v(e.$$.fragment, a), v(s.$$.fragment, a), (r = !0));
            },
            o(a) {
                w(e.$$.fragment, a), w(s.$$.fragment, a), (r = !1);
            },
            d(a) {
                a && u(t), b(e, a), b(s, a);
            },
        }
    );
}
function Ee(i) {
    let e;
    return {
        c() {
            e = y("Email");
        },
        l(t) {
            e = A(t, "Email");
        },
        m(t, s) {
            d(t, e, s);
        },
        d(t) {
            t && u(e);
        },
    };
}
function Ie(i) {
    let e;
    return {
        c() {
            e = y("Password");
        },
        l(t) {
            e = A(t, "Password");
        },
        m(t, s) {
            d(t, e, s);
        },
        d(t) {
            t && u(e);
        },
    };
}
function Se(i) {
    let e, t, s, r, a, o, f, p, l, n, c, m, E, D;
    r = new z({ props: { for: "email", $$slots: { default: [Ee] }, $$scope: { ctx: i } } });
    function B($) {
        i[3]($);
    }
    let G = { id: "email", placeholder: "Your email" };
    i[0] !== void 0 && (G.value = i[0]),
        (o = new Y({ props: G })),
        F.push(() => W(o, "value", B)),
        (n = new z({ props: { for: "password", $$slots: { default: [Ie] }, $$scope: { ctx: i } } }));
    function ee($) {
        i[4]($);
    }
    let N = { id: "password", type: "password", placeholder: "Your password" };
    return (
        i[1] !== void 0 && (N.value = i[1]),
        (m = new Y({ props: N })),
        F.push(() => W(m, "value", ee)),
        {
            c() {
                (e = S("form")),
                    (t = S("div")),
                    (s = S("div")),
                    _(r.$$.fragment),
                    (a = P()),
                    _(o.$$.fragment),
                    (p = P()),
                    (l = S("div")),
                    _(n.$$.fragment),
                    (c = P()),
                    _(m.$$.fragment),
                    this.h();
            },
            l($) {
                e = L($, "FORM", {});
                var C = V(e);
                t = L(C, "DIV", { class: !0 });
                var x = V(t);
                s = L(x, "DIV", { class: !0 });
                var M = V(s);
                g(r.$$.fragment, M),
                    (a = T(M)),
                    g(o.$$.fragment, M),
                    M.forEach(u),
                    (p = T(x)),
                    (l = L(x, "DIV", { class: !0 }));
                var k = V(l);
                g(n.$$.fragment, k),
                    (c = T(k)),
                    g(m.$$.fragment, k),
                    k.forEach(u),
                    x.forEach(u),
                    C.forEach(u),
                    this.h();
            },
            h() {
                j(s, "class", "flex flex-col space-y-1.5"),
                    j(l, "class", "flex flex-col space-y-1.5"),
                    j(t, "class", "grid w-full items-center gap-4");
            },
            m($, C) {
                d($, e, C),
                    I(e, t),
                    I(t, s),
                    h(r, s, null),
                    I(s, a),
                    h(o, s, null),
                    I(t, p),
                    I(t, l),
                    h(n, l, null),
                    I(l, c),
                    h(m, l, null),
                    (D = !0);
            },
            p($, C) {
                const x = {};
                C & 64 && (x.$$scope = { dirty: C, ctx: $ }), r.$set(x);
                const M = {};
                !f && C & 1 && ((f = !0), (M.value = $[0]), R(() => (f = !1))), o.$set(M);
                const k = {};
                C & 64 && (k.$$scope = { dirty: C, ctx: $ }), n.$set(k);
                const U = {};
                !E && C & 2 && ((E = !0), (U.value = $[1]), R(() => (E = !1))), m.$set(U);
            },
            i($) {
                D || (v(r.$$.fragment, $), v(o.$$.fragment, $), v(n.$$.fragment, $), v(m.$$.fragment, $), (D = !0));
            },
            o($) {
                w(r.$$.fragment, $), w(o.$$.fragment, $), w(n.$$.fragment, $), w(m.$$.fragment, $), (D = !1);
            },
            d($) {
                $ && u(e), b(r), b(o), b(n), b(m);
            },
        }
    );
}
function Le(i) {
    let e;
    return {
        c() {
            e = y("Login");
        },
        l(t) {
            e = A(t, "Login");
        },
        m(t, s) {
            d(t, e, s);
        },
        d(t) {
            t && u(e);
        },
    };
}
function Pe(i) {
    let e,
        t,
        s,
        r,
        a = `<img src="${ve}" alt="Google logo"/>`,
        o,
        f,
        p;
    return (
        (t = new we({ props: { $$slots: { default: [Le] }, $$scope: { ctx: i } } })),
        t.$on("click", i[5]),
        {
            c() {
                (e = S("div")), _(t.$$.fragment), (s = P()), (r = S("button")), (r.innerHTML = a), this.h();
            },
            l(l) {
                e = L(l, "DIV", { class: !0 });
                var n = V(e);
                g(t.$$.fragment, n),
                    (s = T(n)),
                    (r = L(n, "BUTTON", { class: !0, "data-svelte-h": !0 })),
                    K(r) !== "svelte-veytja" && (r.innerHTML = a),
                    n.forEach(u),
                    this.h();
            },
            h() {
                j(r, "class", "ml-4"), j(e, "class", "flex justify-center");
            },
            m(l, n) {
                d(l, e, n), h(t, e, null), I(e, s), I(e, r), (o = !0), f || ((p = te(r, "click", he)), (f = !0));
            },
            p(l, n) {
                const c = {};
                n & 64 && (c.$$scope = { dirty: n, ctx: l }), t.$set(c);
            },
            i(l) {
                o || (v(t.$$.fragment, l), (o = !0));
            },
            o(l) {
                w(t.$$.fragment, l), (o = !1);
            },
            d(l) {
                l && u(e), b(t), (f = !1), p();
            },
        }
    );
}
function Te(i) {
    let e,
        t,
        s,
        r,
        a,
        o,
        f,
        p = `<a href="${q.SIGNUP}" class="text-blue-500 hover:underline">Don&#39;t have an account? Sign Up</a>`,
        l;
    return (
        (e = new me({ props: { $$slots: { default: [De] }, $$scope: { ctx: i } } })),
        (s = new pe({ props: { $$slots: { default: [Se] }, $$scope: { ctx: i } } })),
        (a = new ge({ props: { class: "flex justify-between", $$slots: { default: [Pe] }, $$scope: { ctx: i } } })),
        {
            c() {
                _(e.$$.fragment),
                    (t = P()),
                    _(s.$$.fragment),
                    (r = P()),
                    _(a.$$.fragment),
                    (o = P()),
                    (f = S("div")),
                    (f.innerHTML = p),
                    this.h();
            },
            l(n) {
                g(e.$$.fragment, n),
                    (t = T(n)),
                    g(s.$$.fragment, n),
                    (r = T(n)),
                    g(a.$$.fragment, n),
                    (o = T(n)),
                    (f = L(n, "DIV", { class: !0, "data-svelte-h": !0 })),
                    K(f) !== "svelte-1al7gwq" && (f.innerHTML = p),
                    this.h();
            },
            h() {
                j(f, "class", "flex justify-center p-4");
            },
            m(n, c) {
                h(e, n, c), d(n, t, c), h(s, n, c), d(n, r, c), h(a, n, c), d(n, o, c), d(n, f, c), (l = !0);
            },
            p(n, c) {
                const m = {};
                c & 64 && (m.$$scope = { dirty: c, ctx: n }), e.$set(m);
                const E = {};
                c & 67 && (E.$$scope = { dirty: c, ctx: n }), s.$set(E);
                const D = {};
                c & 67 && (D.$$scope = { dirty: c, ctx: n }), a.$set(D);
            },
            i(n) {
                l || (v(e.$$.fragment, n), v(s.$$.fragment, n), v(a.$$.fragment, n), (l = !0));
            },
            o(n) {
                w(e.$$.fragment, n), w(s.$$.fragment, n), w(a.$$.fragment, n), (l = !1);
            },
            d(n) {
                n && (u(t), u(r), u(o), u(f)), b(e, n), b(s, n), b(a, n);
            },
        }
    );
}
function xe(i) {
    let e, t, s, r;
    return (
        (s = new ue({ props: { class: "w-[350px]", $$slots: { default: [Te] }, $$scope: { ctx: i } } })),
        {
            c() {
                (e = S("main")), (t = S("div")), _(s.$$.fragment), this.h();
            },
            l(a) {
                e = L(a, "MAIN", {});
                var o = V(e);
                t = L(o, "DIV", { class: !0, style: !0 });
                var f = V(t);
                g(s.$$.fragment, f), f.forEach(u), o.forEach(u), this.h();
            },
            h() {
                j(t, "class", "card-container"),
                    H(t, "display", "flex"),
                    H(t, "justify-content", "center"),
                    H(t, "align-items", "center"),
                    H(t, "height", "100vh");
            },
            m(a, o) {
                d(a, e, o), I(e, t), h(s, t, null), (r = !0);
            },
            p(a, [o]) {
                const f = {};
                o & 67 && (f.$$scope = { dirty: o, ctx: a }), s.$set(f);
            },
            i(a) {
                r || (v(s.$$.fragment, a), (r = !0));
            },
            o(a) {
                w(s.$$.fragment, a), (r = !1);
            },
            d(a) {
                a && u(e), b(s);
            },
        }
    );
}
function Me(i, e, t) {
    let s = "",
        r = "";
    const a = async (l, n) => {
        if (!l || !n) {
            alert("Please enter your email and password.");
            return;
        }
        const c = ae();
        try {
            await re(O, oe);
            const E = (await le(O, l, n)).user;
            if (E) {
                const D = ie(c, "users", E.uid);
                (await fe(D)).exists() || (await $e(D, { group: "default", isAdmin: !1 }, { merge: !0 })),
                    await Z(q.POSTS);
            }
        } catch (m) {
            console.error(m);
        }
    };
    function o(l) {
        (s = l), t(0, s);
    }
    function f(l) {
        (r = l), t(1, r);
    }
    return [
        s,
        r,
        a,
        o,
        f,
        (l) => {
            l.preventDefault(), a(s, r);
        },
    ];
}
class ke extends Q {
    constructor(e) {
        super(), X(this, e, Me, xe, J, {});
    }
}
function Ve(i) {
    let e, t;
    return (
        (e = new ke({})),
        {
            c() {
                _(e.$$.fragment);
            },
            l(s) {
                g(e.$$.fragment, s);
            },
            m(s, r) {
                h(e, s, r), (t = !0);
            },
            p: se,
            i(s) {
                t || (v(e.$$.fragment, s), (t = !0));
            },
            o(s) {
                w(e.$$.fragment, s), (t = !1);
            },
            d(s) {
                b(e, s);
            },
        }
    );
}
function je(i) {
    return (
        ne(() => {
            ce(O, (e) => {
                e && Z(q.POSTS);
            });
        }),
        []
    );
}
class Re extends Q {
    constructor(e) {
        super(), X(this, e, je, Ve, J, {});
    }
}
export { Re as component };
