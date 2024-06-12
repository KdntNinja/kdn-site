import {
    s as G,
    e as g,
    c as v,
    b as D,
    f as u,
    l as _,
    i as p,
    J as te,
    k as se,
    a as S,
    t as K,
    g as V,
    d as Q,
    h as k,
    j as ae,
    R as le,
    v as ne,
    p as U,
    y as re,
    z as ie,
    A as oe,
} from "../chunks/scheduler.CCxz69I-.js";
import {
    S as X,
    i as Y,
    t as $,
    g as Z,
    f as ee,
    b as y,
    c as B,
    a as F,
    m as H,
    d as M,
    h as ce,
    j as fe,
} from "../chunks/index.BXRlT4_D.js";
import { e as q } from "../chunks/each.DUCJrQqa.js";
import { c as T, e as ue, r as me } from "../chunks/routes.DmSXBMY8.js";
import { c as de } from "../chunks/index.txeusk_E.js";
import { p as he } from "../chunks/stores.irW_toCE.js";
import { B as _e, S as pe } from "../chunks/separator.eJqoy7Lz.js";
import { B as ge } from "../chunks/index.CboYDf0F.js";
import { g as ve } from "../chunks/entry.DdXd1qz9.js";
function z(i, e, r) {
    const a = i.slice();
    a[5] = e[r];
    const l = a[2].url.pathname === a[5].href;
    return (a[6] = l), a;
}
function J(i) {
    let e, r, a, l;
    return {
        c() {
            (e = g("div")), this.h();
        },
        l(t) {
            (e = v(t, "DIV", { class: !0 })), D(e).forEach(u), this.h();
        },
        h() {
            _(e, "class", "absolute inset-0 rounded-md bg-muted");
        },
        m(t, c) {
            p(t, e, c), (l = !0);
        },
        i(t) {
            l ||
                (t &&
                    le(() => {
                        l && (a && a.end(1), (r = ce(e, i[3], { key: "active-sidebar-tab" })), r.start());
                    }),
                (l = !0));
        },
        o(t) {
            r && r.invalidate(), t && (a = fe(e, i[4], { key: "active-sidebar-tab" })), (l = !1);
        },
        d(t) {
            t && u(e), t && a && a.end();
        },
    };
}
function $e(i) {
    let e,
        r,
        a = i[5].title + "",
        l,
        t,
        c = i[6] && J(i);
    return {
        c() {
            c && c.c(), (e = S()), (r = g("div")), (l = K(a)), (t = S()), this.h();
        },
        l(s) {
            c && c.l(s), (e = V(s)), (r = v(s, "DIV", { class: !0 }));
            var n = D(r);
            (l = Q(n, a)), n.forEach(u), (t = V(s)), this.h();
        },
        h() {
            _(r, "class", "relative");
        },
        m(s, n) {
            c && c.m(s, n), p(s, e, n), p(s, r, n), k(r, l), p(s, t, n);
        },
        p(s, n) {
            s[6]
                ? c
                    ? n & 6 && $(c, 1)
                    : ((c = J(s)), c.c(), $(c, 1), c.m(e.parentNode, e))
                : c &&
                  (Z(),
                  y(c, 1, 1, () => {
                      c = null;
                  }),
                  ee()),
                n & 2 && a !== (a = s[5].title + "") && ae(l, a);
        },
        d(s) {
            s && (u(e), u(r), u(t)), c && c.d(s);
        },
    };
}
function W(i) {
    let e, r;
    return (
        (e = new _e({
            props: {
                href: i[5].href,
                variant: "ghost",
                class: T(!i[6] && "hover:underline", "relative justify-start hover:bg-transparent"),
                "data-sveltekit-noscroll": !0,
                $$slots: { default: [$e] },
                $$scope: { ctx: i },
            },
        })),
        {
            c() {
                B(e.$$.fragment);
            },
            l(a) {
                F(e.$$.fragment, a);
            },
            m(a, l) {
                H(e, a, l), (r = !0);
            },
            p(a, l) {
                const t = {};
                l & 2 && (t.href = a[5].href),
                    l & 6 && (t.class = T(!a[6] && "hover:underline", "relative justify-start hover:bg-transparent")),
                    l & 518 && (t.$$scope = { dirty: l, ctx: a }),
                    e.$set(t);
            },
            i(a) {
                r || ($(e.$$.fragment, a), (r = !0));
            },
            o(a) {
                y(e.$$.fragment, a), (r = !1);
            },
            d(a) {
                M(e, a);
            },
        }
    );
}
function be(i) {
    let e,
        r,
        a,
        l = q(i[1]),
        t = [];
    for (let s = 0; s < l.length; s += 1) t[s] = W(z(i, l, s));
    const c = (s) =>
        y(t[s], 1, 1, () => {
            t[s] = null;
        });
    return {
        c() {
            e = g("nav");
            for (let s = 0; s < t.length; s += 1) t[s].c();
            this.h();
        },
        l(s) {
            e = v(s, "NAV", { class: !0 });
            var n = D(e);
            for (let f = 0; f < t.length; f += 1) t[f].l(n);
            n.forEach(u), this.h();
        },
        h() {
            _(e, "class", (r = T("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", i[0])));
        },
        m(s, n) {
            p(s, e, n);
            for (let f = 0; f < t.length; f += 1) t[f] && t[f].m(e, null);
            a = !0;
        },
        p(s, [n]) {
            if (n & 6) {
                l = q(s[1]);
                let f;
                for (f = 0; f < l.length; f += 1) {
                    const h = z(s, l, f);
                    t[f] ? (t[f].p(h, n), $(t[f], 1)) : ((t[f] = W(h)), t[f].c(), $(t[f], 1), t[f].m(e, null));
                }
                for (Z(), f = l.length; f < t.length; f += 1) c(f);
                ee();
            }
            (!a || (n & 1 && r !== (r = T("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", s[0])))) &&
                _(e, "class", r);
        },
        i(s) {
            if (!a) {
                for (let n = 0; n < l.length; n += 1) $(t[n]);
                a = !0;
            }
        },
        o(s) {
            t = t.filter(Boolean);
            for (let n = 0; n < t.length; n += 1) y(t[n]);
            a = !1;
        },
        d(s) {
            s && u(e), te(t, s);
        },
    };
}
function ke(i, e, r) {
    let a;
    se(i, he, (n) => r(2, (a = n)));
    let { class: l = void 0 } = e,
        { items: t } = e;
    const [c, s] = de({ duration: 250, easing: ue });
    return (
        (i.$$set = (n) => {
            "class" in n && r(0, (l = n.class)), "items" in n && r(1, (t = n.items));
        }),
        [l, t, a, c, s]
    );
}
class De extends X {
    constructor(e) {
        super(), Y(this, e, ke, be, G, { class: 0, items: 1 });
    }
}
const ye = "" + new URL("../assets/forms-light.DOMuvs_j.png", import.meta.url).href,
    Ie = "" + new URL("../assets/forms-dark.BTWkACOD.png", import.meta.url).href,
    we = "data:image/png;base64,";
function Ee(i) {
    let e;
    return {
        c() {
            e = K("Home");
        },
        l(r) {
            e = Q(r, "Home");
        },
        m(r, a) {
            p(r, e, a);
        },
        d(r) {
            r && u(e);
        },
    };
}
function Se(i) {
    let e,
        r = `<enhanced:img src="${we}" alt="Forms" class="hidden dark:block"></enhanced:img> <enhanced:img src="${ye}" alt="Forms" class="block dark:hidden"></enhanced:img> <enhanced:img src="${Ie}" alt="Forms" class="hidden dark:block"></enhanced:img>`,
        a,
        l,
        t,
        c =
            '<h2 class="text-2xl font-bold tracking-tight">Settings</h2> <p class="text-muted-foreground">Manage your account settings.</p>',
        s,
        n,
        f,
        h,
        L,
        I,
        C,
        x,
        A,
        w,
        b,
        j;
    (n = new pe({ props: { class: "my-6" } })), (I = new De({ props: { items: i[0] } }));
    const N = i[1].default,
        d = ne(N, i, i[3], null);
    return (
        (b = new ge({ props: { $$slots: { default: [Ee] }, $$scope: { ctx: i } } })),
        b.$on("click", i[2]),
        {
            c() {
                (e = g("div")),
                    (e.innerHTML = r),
                    (a = S()),
                    (l = g("div")),
                    (t = g("div")),
                    (t.innerHTML = c),
                    (s = S()),
                    B(n.$$.fragment),
                    (f = S()),
                    (h = g("div")),
                    (L = g("aside")),
                    B(I.$$.fragment),
                    (C = S()),
                    (x = g("div")),
                    d && d.c(),
                    (A = S()),
                    (w = g("div")),
                    B(b.$$.fragment),
                    this.h();
            },
            l(o) {
                (e = v(o, "DIV", { class: !0, "data-svelte-h": !0 })),
                    U(e) !== "svelte-1enc1vr" && (e.innerHTML = r),
                    (a = V(o)),
                    (l = v(o, "DIV", { class: !0 }));
                var m = D(l);
                (t = v(m, "DIV", { class: !0, "data-svelte-h": !0 })),
                    U(t) !== "svelte-19dg4te" && (t.innerHTML = c),
                    (s = V(m)),
                    F(n.$$.fragment, m),
                    (f = V(m)),
                    (h = v(m, "DIV", { class: !0 }));
                var E = D(h);
                L = v(E, "ASIDE", { class: !0 });
                var O = D(L);
                F(I.$$.fragment, O), O.forEach(u), (C = V(E)), (x = v(E, "DIV", { class: !0 }));
                var R = D(x);
                d && d.l(R), R.forEach(u), E.forEach(u), m.forEach(u), (A = V(o)), (w = v(o, "DIV", { class: !0 }));
                var P = D(w);
                F(b.$$.fragment, P), P.forEach(u), this.h();
            },
            h() {
                _(e, "class", "md:hidden"),
                    _(t, "class", "space-y-0.5"),
                    _(L, "class", "w-full lg:w-1/5"),
                    _(x, "class", "flex-1 lg:max-w-2xl"),
                    _(h, "class", "flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"),
                    _(l, "class", "hidden space-y-6 p-10 pb-16 md:block"),
                    _(w, "class", "go-home-button svelte-1o7dljc");
            },
            m(o, m) {
                p(o, e, m),
                    p(o, a, m),
                    p(o, l, m),
                    k(l, t),
                    k(l, s),
                    H(n, l, null),
                    k(l, f),
                    k(l, h),
                    k(h, L),
                    H(I, L, null),
                    k(h, C),
                    k(h, x),
                    d && d.m(x, null),
                    p(o, A, m),
                    p(o, w, m),
                    H(b, w, null),
                    (j = !0);
            },
            p(o, [m]) {
                d && d.p && (!j || m & 8) && re(d, N, o, o[3], j ? oe(N, o[3], m, null) : ie(o[3]), null);
                const E = {};
                m & 8 && (E.$$scope = { dirty: m, ctx: o }), b.$set(E);
            },
            i(o) {
                j || ($(n.$$.fragment, o), $(I.$$.fragment, o), $(d, o), $(b.$$.fragment, o), (j = !0));
            },
            o(o) {
                y(n.$$.fragment, o), y(I.$$.fragment, o), y(d, o), y(b.$$.fragment, o), (j = !1);
            },
            d(o) {
                o && (u(e), u(a), u(l), u(A), u(w)), M(n), M(I), d && d.d(o), M(b);
            },
        }
    );
}
function Ve(i, e, r) {
    let { $$slots: a = {}, $$scope: l } = e;
    const t = [
            { title: "Profile", href: "/settings/profile/" },
            { title: "Appearance", href: "/settings/appearance/" },
        ],
        c = () => ve(me.POSTS);
    return (
        (i.$$set = (s) => {
            "$$scope" in s && r(3, (l = s.$$scope));
        }),
        [t, a, c, l]
    );
}
class Ce extends X {
    constructor(e) {
        super(), Y(this, e, Ve, Se, G, {});
    }
}
export { Ce as component };
