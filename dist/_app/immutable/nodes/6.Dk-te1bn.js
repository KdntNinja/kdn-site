import {
    s as A,
    e as $,
    a as w,
    c as g,
    b as v,
    f as _,
    g as y,
    l as b,
    i as d,
    h as k,
    o as F,
    I as V,
    t as P,
    d as D,
    j as z,
    J as G,
} from "../chunks/scheduler.CCxz69I-.js";
import {
    S as K,
    i as L,
    c as H,
    a as I,
    m as j,
    f as O,
    t as E,
    b as S,
    d as B,
    g as Q,
} from "../chunks/index.BXRlT4_D.js";
import { e as x, u as U, o as W } from "../chunks/each.DUCJrQqa.js";
import { C as Y } from "../chunks/card.Ca7f7NtU.js";
import { i as M, j as q, k as J } from "../chunks/firebase.CPJmnSU3.js";
import { r as Z } from "../chunks/routes.CVgu8Yrj.js";
import { S as ee } from "../chunks/separator.5m0xWl4q.js";
import { B as te } from "../chunks/index.CqeUFQjM.js";
import { g as se } from "../chunks/entry.CzViBFHa.js";
function N(f, l, o) {
    const t = f.slice();
    return (t[3] = l[o]), t;
}
function R(f, l, o) {
    const t = f.slice();
    return (t[6] = l[o]), t;
}
function T(f) {
    let l = f[6] + "",
        o;
    return {
        c() {
            o = P(l);
        },
        l(t) {
            o = D(t, l);
        },
        m(t, m) {
            d(t, o, m);
        },
        p(t, m) {
            m & 1 && l !== (l = t[6] + "") && z(o, l);
        },
        d(t) {
            t && _(o);
        },
    };
}
function le(f) {
    let l,
        o = f[3].name + "",
        t,
        m,
        u,
        i,
        a,
        c;
    u = new ee({ props: { class: "mb-2" } });
    let h = x(f[3].rolePart),
        n = [];
    for (let e = 0; e < h.length; e += 1) n[e] = T(R(f, h, e));
    return {
        c() {
            (l = $("h2")), (t = P(o)), (m = w()), H(u.$$.fragment), (i = w()), (a = $("p"));
            for (let e = 0; e < n.length; e += 1) n[e].c();
            this.h();
        },
        l(e) {
            l = g(e, "H2", { class: !0 });
            var s = v(l);
            (t = D(s, o)), s.forEach(_), (m = y(e)), I(u.$$.fragment, e), (i = y(e)), (a = g(e, "P", { class: !0 }));
            var r = v(a);
            for (let p = 0; p < n.length; p += 1) n[p].l(r);
            r.forEach(_), this.h();
        },
        h() {
            b(l, "class", "font-medium text-2xl mb-2"), b(a, "class", "text-lg");
        },
        m(e, s) {
            d(e, l, s), k(l, t), d(e, m, s), j(u, e, s), d(e, i, s), d(e, a, s);
            for (let r = 0; r < n.length; r += 1) n[r] && n[r].m(a, null);
            c = !0;
        },
        p(e, s) {
            if (((!c || s & 1) && o !== (o = e[3].name + "") && z(t, o), s & 1)) {
                h = x(e[3].rolePart);
                let r;
                for (r = 0; r < h.length; r += 1) {
                    const p = R(e, h, r);
                    n[r] ? n[r].p(p, s) : ((n[r] = T(p)), n[r].c(), n[r].m(a, null));
                }
                for (; r < n.length; r += 1) n[r].d(1);
                n.length = h.length;
            }
        },
        i(e) {
            c || (E(u.$$.fragment, e), (c = !0));
        },
        o(e) {
            S(u.$$.fragment, e), (c = !1);
        },
        d(e) {
            e && (_(l), _(m), _(i), _(a)), B(u, e), G(n, e);
        },
    };
}
function X(f, l) {
    let o, t, m, u, i;
    return (
        (t = new Y({ props: { class: "p-4 rounded-lg shadow-md", $$slots: { default: [le] }, $$scope: { ctx: l } } })),
        {
            key: f,
            first: null,
            c() {
                (o = V()), H(t.$$.fragment), (m = w()), (u = $("br")), this.h();
            },
            l(a) {
                (o = V()), I(t.$$.fragment, a), (m = y(a)), (u = g(a, "BR", {})), this.h();
            },
            h() {
                this.first = o;
            },
            m(a, c) {
                d(a, o, c), j(t, a, c), d(a, m, c), d(a, u, c), (i = !0);
            },
            p(a, c) {
                l = a;
                const h = {};
                c & 513 && (h.$$scope = { dirty: c, ctx: l }), t.$set(h);
            },
            i(a) {
                i || (E(t.$$.fragment, a), (i = !0));
            },
            o(a) {
                S(t.$$.fragment, a), (i = !1);
            },
            d(a) {
                a && (_(o), _(m), _(u)), B(t, a);
            },
        }
    );
}
function ae(f) {
    let l;
    return {
        c() {
            l = P("Home");
        },
        l(o) {
            l = D(o, "Home");
        },
        m(o, t) {
            d(o, l, t);
        },
        d(o) {
            o && _(l);
        },
    };
}
function oe(f) {
    let l,
        o,
        t = [],
        m = new Map(),
        u,
        i,
        a,
        c,
        h = x(f[0]);
    const n = (e) => e[3].name;
    for (let e = 0; e < h.length; e += 1) {
        let s = N(f, h, e),
            r = n(s);
        m.set(r, (t[e] = X(r, s)));
    }
    return (
        (a = new te({ props: { $$slots: { default: [ae] }, $$scope: { ctx: f } } })),
        a.$on("click", f[1]),
        {
            c() {
                (l = $("div")), (o = $("div"));
                for (let e = 0; e < t.length; e += 1) t[e].c();
                (u = w()), (i = $("div")), H(a.$$.fragment), this.h();
            },
            l(e) {
                l = g(e, "DIV", { class: !0 });
                var s = v(l);
                o = g(s, "DIV", { class: !0 });
                var r = v(o);
                for (let C = 0; C < t.length; C += 1) t[C].l(r);
                r.forEach(_), (u = y(s)), (i = g(s, "DIV", { class: !0 }));
                var p = v(i);
                I(a.$$.fragment, p), p.forEach(_), s.forEach(_), this.h();
            },
            h() {
                b(o, "class", "p-4"),
                    b(i, "class", "button-right svelte-2b6u35"),
                    b(l, "class", "svelte-scroll-area rounded-md justify-center p-4 svelte-2b6u35");
            },
            m(e, s) {
                d(e, l, s), k(l, o);
                for (let r = 0; r < t.length; r += 1) t[r] && t[r].m(o, null);
                k(l, u), k(l, i), j(a, i, null), (c = !0);
            },
            p(e, [s]) {
                s & 1 && ((h = x(e[0])), Q(), (t = U(t, s, n, 1, e, h, m, o, W, X, null, N)), O());
                const r = {};
                s & 512 && (r.$$scope = { dirty: s, ctx: e }), a.$set(r);
            },
            i(e) {
                if (!c) {
                    for (let s = 0; s < h.length; s += 1) E(t[s]);
                    E(a.$$.fragment, e), (c = !0);
                }
            },
            o(e) {
                for (let s = 0; s < t.length; s += 1) S(t[s]);
                S(a.$$.fragment, e), (c = !1);
            },
            d(e) {
                e && _(l);
                for (let s = 0; s < t.length; s += 1) t[s].d();
                B(a);
            },
        }
    );
}
function re(f, l, o) {
    let t = [];
    F(async () => {
        const i = M(J, "credits"),
            a = await q(i);
        o(0, (t = a.docs.map((c) => ({ name: c.id, role: c.data().role, rolePart: c.data().role.split("\\") }))));
    });
    const m = () => {
        se(Z.INDEX);
    };
    async function u() {
        const i = M(J, "credits"),
            c = (await q(i)).docs.map((n) => ({ name: n.id, role: n.data().role }));
        let h = "";
        c.forEach((n) => {
            const e = n.role.split("\\");
            let s = "";
            e.forEach((r) => {
                s += `<li>${r}</li>`;
            }),
                (h += `
                <div class="p-4 rounded-lg shadow-md">
                    <h2 class="font-medium text-2xl mb-2">${n.name}</h2>
                    <hr class="mb-2" />
                    <ul class="text-lg">
                        ${s}
                    </ul>
                </div>
            `);
        });
    }
    return u(), [t, m];
}
class pe extends K {
    constructor(l) {
        super(), L(this, l, re, oe, A, {});
    }
}
export { pe as component };
