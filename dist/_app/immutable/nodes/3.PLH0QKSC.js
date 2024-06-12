import {
    s as K,
    e as E,
    a as v,
    c as P,
    b as U,
    f as i,
    g as k,
    l as D,
    m as x,
    i as m,
    o as N,
    t as S,
    d as w,
    p as O,
    h as R,
} from "../chunks/scheduler.CCxz69I-.js";
import { S as T, i as V, c as p, a as _, m as d, t as g, b as h, d as b } from "../chunks/index.BXRlT4_D.js";
import { C as W } from "../chunks/card.Ca7f7NtU.js";
import { C as q, a as y, b as H, c as M } from "../chunks/card-title.BeghIEH_.js";
import { B as j } from "../chunks/index.CqeUFQjM.js";
import { r as I } from "../chunks/routes.CVgu8Yrj.js";
import { o as z, a as F } from "../chunks/firebase.CPJmnSU3.js";
import { g as L } from "../chunks/entry.CzViBFHa.js";
function J($) {
    let e;
    return {
        c() {
            e = S("Credits");
        },
        l(t) {
            e = w(t, "Credits");
        },
        m(t, n) {
            m(t, e, n);
        },
        d(t) {
            t && i(e);
        },
    };
}
function Q($) {
    let e;
    return {
        c() {
            e = S("Welcome to LinkLoop!");
        },
        l(t) {
            e = w(t, "Welcome to LinkLoop!");
        },
        m(t, n) {
            m(t, e, n);
        },
        d(t) {
            t && i(e);
        },
    };
}
function X($) {
    let e, t;
    return (
        (e = new H({ props: { $$slots: { default: [Q] }, $$scope: { ctx: $ } } })),
        {
            c() {
                p(e.$$.fragment);
            },
            l(n) {
                _(e.$$.fragment, n);
            },
            m(n, r) {
                d(e, n, r), (t = !0);
            },
            p(n, r) {
                const s = {};
                r & 8 && (s.$$scope = { dirty: r, ctx: n }), e.$set(s);
            },
            i(n) {
                t || (g(e.$$.fragment, n), (t = !0));
            },
            o(n) {
                h(e.$$.fragment, n), (t = !1);
            },
            d(n) {
                b(e, n);
            },
        }
    );
}
function Y($) {
    let e;
    return {
        c() {
            e = S("Keeps you linked and in the loop.");
        },
        l(t) {
            e = w(t, "Keeps you linked and in the loop.");
        },
        m(t, n) {
            m(t, e, n);
        },
        d(t) {
            t && i(e);
        },
    };
}
function Z($) {
    let e;
    return {
        c() {
            e = S("Log In");
        },
        l(t) {
            e = w(t, "Log In");
        },
        m(t, n) {
            m(t, e, n);
        },
        d(t) {
            t && i(e);
        },
    };
}
function ee($) {
    let e;
    return {
        c() {
            e = S("Sign Up");
        },
        l(t) {
            e = w(t, "Sign Up");
        },
        m(t, n) {
            m(t, e, n);
        },
        d(t) {
            t && i(e);
        },
    };
}
function te($) {
    let e,
        t,
        n,
        r = "Please log in or sign up to continue.",
        s,
        l,
        a,
        c,
        u,
        C;
    return (
        (e = new M({ props: { $$slots: { default: [Y] }, $$scope: { ctx: $ } } })),
        (a = new j({
            props: {
                "aria-label": "Log In",
                class: "mr-4 font-bold py-2 px-4 rounded",
                $$slots: { default: [Z] },
                $$scope: { ctx: $ },
            },
        })),
        a.$on("click", $[1]),
        (u = new j({
            props: {
                "aria-label": "Sign Up",
                class: "ml-4 font-bold py-2 px-4 rounded",
                $$slots: { default: [ee] },
                $$scope: { ctx: $ },
            },
        })),
        u.$on("click", $[2]),
        {
            c() {
                p(e.$$.fragment),
                    (t = v()),
                    (n = E("p")),
                    (n.textContent = r),
                    (s = v()),
                    (l = E("div")),
                    p(a.$$.fragment),
                    (c = v()),
                    p(u.$$.fragment),
                    this.h();
            },
            l(o) {
                _(e.$$.fragment, o),
                    (t = k(o)),
                    (n = P(o, "P", { class: !0, "data-svelte-h": !0 })),
                    O(n) !== "svelte-14bh9ti" && (n.textContent = r),
                    (s = k(o)),
                    (l = P(o, "DIV", { class: !0 }));
                var f = U(l);
                _(a.$$.fragment, f), (c = k(f)), _(u.$$.fragment, f), f.forEach(i), this.h();
            },
            h() {
                D(n, "class", "mb-4 text-lg"), D(l, "class", "flex justify-center mt-8");
            },
            m(o, f) {
                d(e, o, f),
                    m(o, t, f),
                    m(o, n, f),
                    m(o, s, f),
                    m(o, l, f),
                    d(a, l, null),
                    R(l, c),
                    d(u, l, null),
                    (C = !0);
            },
            p(o, f) {
                const A = {};
                f & 8 && (A.$$scope = { dirty: f, ctx: o }), e.$set(A);
                const B = {};
                f & 8 && (B.$$scope = { dirty: f, ctx: o }), a.$set(B);
                const G = {};
                f & 8 && (G.$$scope = { dirty: f, ctx: o }), u.$set(G);
            },
            i(o) {
                C || (g(e.$$.fragment, o), g(a.$$.fragment, o), g(u.$$.fragment, o), (C = !0));
            },
            o(o) {
                h(e.$$.fragment, o), h(a.$$.fragment, o), h(u.$$.fragment, o), (C = !1);
            },
            d(o) {
                o && (i(t), i(n), i(s), i(l)), b(e, o), b(a), b(u);
            },
        }
    );
}
function ne($) {
    let e, t, n, r;
    return (
        (e = new q({ props: { $$slots: { default: [X] }, $$scope: { ctx: $ } } })),
        (n = new y({ props: { $$slots: { default: [te] }, $$scope: { ctx: $ } } })),
        {
            c() {
                p(e.$$.fragment), (t = v()), p(n.$$.fragment);
            },
            l(s) {
                _(e.$$.fragment, s), (t = k(s)), _(n.$$.fragment, s);
            },
            m(s, l) {
                d(e, s, l), m(s, t, l), d(n, s, l), (r = !0);
            },
            p(s, l) {
                const a = {};
                l & 8 && (a.$$scope = { dirty: l, ctx: s }), e.$set(a);
                const c = {};
                l & 8 && (c.$$scope = { dirty: l, ctx: s }), n.$set(c);
            },
            i(s) {
                r || (g(e.$$.fragment, s), g(n.$$.fragment, s), (r = !0));
            },
            o(s) {
                h(e.$$.fragment, s), h(n.$$.fragment, s), (r = !1);
            },
            d(s) {
                s && i(t), b(e, s), b(n, s);
            },
        }
    );
}
function se($) {
    let e, t, n, r, s, l;
    return (
        (t = new j({
            props: {
                "aria-label": "Credits",
                class: "ml-4 font-bold py-2 px-4 rounded",
                $$slots: { default: [J] },
                $$scope: { ctx: $ },
            },
        })),
        t.$on("click", $[0]),
        (s = new W({ props: { class: "w-[350px]", $$slots: { default: [ne] }, $$scope: { ctx: $ } } })),
        {
            c() {
                (e = E("header")), p(t.$$.fragment), (n = v()), (r = E("div")), p(s.$$.fragment), this.h();
            },
            l(a) {
                e = P(a, "HEADER", { class: !0 });
                var c = U(e);
                _(t.$$.fragment, c), c.forEach(i), (n = k(a)), (r = P(a, "DIV", { class: !0, style: !0 }));
                var u = U(r);
                _(s.$$.fragment, u), u.forEach(i), this.h();
            },
            h() {
                D(e, "class", "svelte-tp6knx"),
                    D(r, "class", "card-container"),
                    x(r, "display", "flex"),
                    x(r, "justify-content", "center"),
                    x(r, "align-items", "center"),
                    x(r, "height", "100vh");
            },
            m(a, c) {
                m(a, e, c), d(t, e, null), m(a, n, c), m(a, r, c), d(s, r, null), (l = !0);
            },
            p(a, [c]) {
                const u = {};
                c & 8 && (u.$$scope = { dirty: c, ctx: a }), t.$set(u);
                const C = {};
                c & 8 && (C.$$scope = { dirty: c, ctx: a }), s.$set(C);
            },
            i(a) {
                l || (g(t.$$.fragment, a), g(s.$$.fragment, a), (l = !0));
            },
            o(a) {
                h(t.$$.fragment, a), h(s.$$.fragment, a), (l = !1);
            },
            d(a) {
                a && (i(e), i(n), i(r)), b(t), b(s);
            },
        }
    );
}
function ae($) {
    return (
        N(() => {
            z(F, (r) => {
                r && L(I.POSTS);
            });
        }),
        [() => L(I.CREDITS), () => L(I.LOGIN), () => L(I.SIGNUP)]
    );
}
class me extends T {
    constructor(e) {
        super(), V(this, e, ae, se, K, {});
    }
}
export { me as component };
