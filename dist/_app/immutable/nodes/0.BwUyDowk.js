import {
    s as j,
    I as v,
    S as H,
    T as O,
    U as W,
    f,
    h as y,
    n as p,
    o as F,
    e as q,
    c as E,
    l as h,
    i as _,
    V as N,
    v as Q,
    a as g,
    g as w,
    W as z,
    y as G,
    z as J,
    A as K,
} from "../chunks/scheduler.CCxz69I-.js";
import { S as A, i as U, c as $, a as M, m as R, t as b, b as S, d as T } from "../chunks/index.BXRlT4_D.js";
import { u as X, t as Y, d as Z, a as x, s as I, l as ee, i as te, S as ne } from "../chunks/sonner.CyAQzOIw.js";
import { p as C } from "../chunks/stores.DpCGI4la.js";
function ae(e) {
    X.set(e);
}
function se(e, t) {
    const i = document.documentElement,
        a = localStorage.getItem("mode-watcher-mode") || e,
        s = a === "light" || (a === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
    if ((i.classList[s ? "remove" : "add"]("dark"), (i.style.colorScheme = s ? "light" : "dark"), t)) {
        const n = document.querySelector('meta[name="theme-color"]');
        n && n.setAttribute("content", a === "light" ? t.light : t.dark);
    }
    localStorage.setItem("mode-watcher-mode", a);
}
function P(e) {
    let t, i;
    return {
        c() {
            (t = q("meta")), this.h();
        },
        l(a) {
            (t = E(a, "META", { name: !0, content: !0 })), this.h();
        },
        h() {
            h(t, "name", "theme-color"), h(t, "content", (i = e[0].dark));
        },
        m(a, s) {
            _(a, t, s);
        },
        p(a, s) {
            s & 1 && i !== (i = a[0].dark) && h(t, "content", i);
        },
        d(a) {
            a && f(t);
        },
    };
}
function oe(e) {
    let t,
        i,
        a = '<script nonce="%sveltekit.nonce%">(' + se.toString() + ")(" + e[1] + ");</script>",
        s,
        n = e[0] && P(e);
    return {
        c() {
            n && n.c(), (t = v()), (i = new H(!1)), (s = v()), this.h();
        },
        l(r) {
            const d = O("svelte-cpyj77", document.head);
            n && n.l(d), (t = v()), (i = W(d, !1)), (s = v()), d.forEach(f), this.h();
        },
        h() {
            i.a = s;
        },
        m(r, d) {
            n && n.m(document.head, null), y(document.head, t), i.m(a, document.head), y(document.head, s);
        },
        p(r, [d]) {
            r[0] ? (n ? n.p(r, d) : ((n = P(r)), n.c(), n.m(t.parentNode, t))) : n && (n.d(1), (n = null));
        },
        i: p,
        o: p,
        d(r) {
            r && i.d(), n && n.d(r), f(t), f(s);
        },
    };
}
function ie(e, t, i) {
    let { track: a = !0 } = t,
        { defaultMode: s = "system" } = t,
        { themeColors: n = void 0 } = t,
        { disableTransitions: r = !0 } = t;
    Y.set(n),
        Z.set(r),
        F(() => {
            const c = x.subscribe(() => {});
            I.tracking(a), I.query();
            const m = localStorage.getItem(ee);
            return (
                ae(te(m) ? m : s),
                () => {
                    c();
                }
            );
        });
    const d = `"${s}"${n ? `, ${JSON.stringify(n)}` : ""}`;
    return (
        (e.$$set = (c) => {
            "track" in c && i(2, (a = c.track)),
                "defaultMode" in c && i(3, (s = c.defaultMode)),
                "themeColors" in c && i(0, (n = c.themeColors)),
                "disableTransitions" in c && i(4, (r = c.disableTransitions));
        }),
        [n, d, a, s, r]
    );
}
class re extends A {
    constructor(t) {
        super(), U(this, t, ie, oe, j, { track: 2, defaultMode: 3, themeColors: 0, disableTransitions: 4 });
    }
}
var ce = "@vercel/speed-insights",
    de = "1.0.10",
    le = () => {
        window.si ||
            (window.si = function (...t) {
                (window.siq = window.siq || []).push(t);
            });
    };
function ue() {
    return typeof window < "u";
}
function fe() {
    try {
        const e = "production";
    } catch {}
    return "production";
}
function L() {
    return fe() === "development";
}
var D = "https://va.vercel-scripts.com/v1/speed-insights",
    me = `${D}/script.js`,
    he = `${D}/script.debug.js`,
    _e = "/_vercel/speed-insights/script.js";
function ve(e = {}) {
    var t;
    if (!ue() || e.route === null) return null;
    le();
    const a = !!e.dsn ? me : _e,
        s = e.scriptSrc || (L() ? he : a);
    if (document.head.querySelector(`script[src*="${s}"]`)) return null;
    e.beforeSend && ((t = window.si) == null || t.call(window, "beforeSend", e.beforeSend));
    const n = document.createElement("script");
    return (
        (n.src = s),
        (n.defer = !0),
        (n.dataset.sdkn = ce + (e.framework ? `/${e.framework}` : "")),
        (n.dataset.sdkv = de),
        e.sampleRate && (n.dataset.sampleRate = e.sampleRate.toString()),
        e.route && (n.dataset.route = e.route),
        e.endpoint && (n.dataset.endpoint = e.endpoint),
        e.dsn && (n.dataset.dsn = e.dsn),
        L() && e.debug === !1 && (n.dataset.debug = "false"),
        (n.onerror = () => {
            console.log(
                `[Vercel Speed Insights] Failed to load script from ${s}. Please check if any content blockers are enabled and try again.`,
            );
        }),
        document.head.appendChild(n),
        {
            setRoute: (r) => {
                n.dataset.route = r ?? void 0;
            },
        }
    );
}
function ge(e = {}) {
    var t;
    {
        const i = ve({ route: (t = N(C).route) == null ? void 0 : t.id, ...e, framework: "sveltekit" });
        i &&
            C.subscribe((a) => {
                var s;
                (s = a.route) != null && s.id && i.setRoute(a.route.id);
            });
    }
}
var we = "@vercel/analytics",
    be = "1.2.2",
    Se = () => {
        window.va ||
            (window.va = function (...t) {
                (window.vaq = window.vaq || []).push(t);
            });
    };
function V() {
    return typeof window < "u";
}
function B() {
    try {
        const e = "production";
    } catch {}
    return "production";
}
function ke(e = "auto") {
    if (e === "auto") {
        window.vam = B();
        return;
    }
    window.vam = e;
}
function ye() {
    return (V() ? window.vam : B()) || "production";
}
function k() {
    return ye() === "development";
}
var pe = "https://va.vercel-scripts.com/v1/script.debug.js",
    $e = "/_vercel/insights/script.js";
function Me(e = { debug: !0 }) {
    var t;
    if (!V()) return;
    ke(e.mode), Se(), e.beforeSend && ((t = window.va) == null || t.call(window, "beforeSend", e.beforeSend));
    const i = e.scriptSrc || (k() ? pe : $e);
    if (document.head.querySelector(`script[src*="${i}"]`)) return;
    const a = document.createElement("script");
    (a.src = i),
        (a.defer = !0),
        (a.dataset.sdkn = we + (e.framework ? `/${e.framework}` : "")),
        (a.dataset.sdkv = be),
        e.disableAutoTrack && (a.dataset.disableAutoTrack = "1"),
        e.endpoint && (a.dataset.endpoint = e.endpoint),
        e.dsn && (a.dataset.dsn = e.dsn),
        (a.onerror = () => {
            const s = k()
                ? "Please check if any ad blockers are enabled and try again."
                : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
            console.log(`[Vercel Web Analytics] Failed to load script from ${i}. ${s}`);
        }),
        k() && e.debug === !1 && (a.dataset.debug = "false"),
        document.head.appendChild(a);
}
function Re(e) {
    let t, i, a, s, n, r, d, c;
    const m = e[1].default,
        l = Q(m, e, e[0], null);
    return (
        (n = new ne({})),
        (d = new re({})),
        {
            c() {
                (t = q("img")),
                    (a = g()),
                    l && l.c(),
                    (s = g()),
                    $(n.$$.fragment),
                    (r = g()),
                    $(d.$$.fragment),
                    this.h();
            },
            l(o) {
                (t = E(o, "IMG", { src: !0, alt: !0, class: !0 })),
                    (a = w(o)),
                    l && l.l(o),
                    (s = w(o)),
                    M(n.$$.fragment, o),
                    (r = w(o)),
                    M(d.$$.fragment, o),
                    this.h();
            },
            h() {
                z(t.src, (i = "/LinkLoop.png")) || h(t, "src", i),
                    h(t, "alt", "Linkloop Logo"),
                    h(t, "class", "logo svelte-jl2mtn");
            },
            m(o, u) {
                _(o, t, u), _(o, a, u), l && l.m(o, u), _(o, s, u), R(n, o, u), _(o, r, u), R(d, o, u), (c = !0);
            },
            p(o, [u]) {
                l && l.p && (!c || u & 1) && G(l, m, o, o[0], c ? K(m, o[0], u, null) : J(o[0]), null);
            },
            i(o) {
                c || (b(l, o), b(n.$$.fragment, o), b(d.$$.fragment, o), (c = !0));
            },
            o(o) {
                S(l, o), S(n.$$.fragment, o), S(d.$$.fragment, o), (c = !1);
            },
            d(o) {
                o && (f(t), f(a), f(s), f(r)), l && l.d(o), T(n, o), T(d, o);
            },
        }
    );
}
function Te(e, t, i) {
    let { $$slots: a = {}, $$scope: s } = t;
    return (
        Me(),
        ge(),
        (e.$$set = (n) => {
            "$$scope" in n && i(0, (s = n.$$scope));
        }),
        [s, a]
    );
}
class je extends A {
    constructor(t) {
        super(), U(this, t, Te, Re, j, {});
    }
}
export { je as component };
