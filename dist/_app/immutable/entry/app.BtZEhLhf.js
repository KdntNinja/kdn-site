const __vite__fileDeps = [
        "../nodes/0.BwUyDowk.js",
        "../chunks/scheduler.CCxz69I-.js",
        "../chunks/index.BXRlT4_D.js",
        "../chunks/sonner.CyAQzOIw.js",
        "../chunks/spread.CgU5AtxT.js",
        "../chunks/each.DUCJrQqa.js",
        "../chunks/entry.CzViBFHa.js",
        "../assets/sonner.436keKGd.css",
        "../chunks/stores.DpCGI4la.js",
        "../assets/0.C_q3zic9.css",
        "../nodes/1.rBeSBvzz.js",
        "../nodes/2.CMbc2S0e.js",
        "../chunks/routes.CVgu8Yrj.js",
        "../chunks/index.BMeQlXbm.js",
        "../chunks/separator.IFhk9s1e.js",
        "../chunks/separator.4n1iTp9H.js",
        "../chunks/attrs.BDvkrEDx.js",
        "../chunks/index.CqeUFQjM.js",
        "../assets/2.Fr4Mr7tq.css",
        "../nodes/3.PLH0QKSC.js",
        "../chunks/card.Ca7f7NtU.js",
        "../chunks/card-title.BeghIEH_.js",
        "../chunks/firebase.CPJmnSU3.js",
        "../assets/3.BocunpdN.css",
        "../nodes/4.DaOlPwPw.js",
        "../chunks/input.JDMBaFz9.js",
        "../chunks/label.CPP9iySr.js",
        "../chunks/label.BWluq0Fw.js",
        "../nodes/5.CCJ9-C3I.js",
        "../nodes/6.Dk-te1bn.js",
        "../chunks/separator.5m0xWl4q.js",
        "../assets/6.BWFe8c6H.css",
        "../nodes/7.BjPQ0hxe.js",
        "../chunks/overridable.BXTZSpIR.js",
        "../assets/7.DVJSGOI9.css",
        "../nodes/8.DHNSRoA_.js",
        "../chunks/index.BtcfTsIq.js",
        "../assets/index.Crp_yK76.css",
        "../assets/8.BanOn4MP.css",
        "../nodes/9.B29ryLn6.js",
        "../assets/9.Chv9c6yj.css",
    ],
    __vite__mapDeps = (i) => i.map((i) => __vite__fileDeps[i]);
import {
    s as U,
    a as j,
    I as p,
    g as K,
    i as b,
    f as g,
    K as W,
    o as z,
    e as F,
    c as G,
    b as H,
    l as T,
    m as L,
    t as J,
    d as Q,
    j as X,
    q as D,
    L as k,
    M as Y,
} from "../chunks/scheduler.CCxz69I-.js";
import {
    S as Z,
    i as M,
    b as d,
    f as y,
    t as h,
    g as A,
    c as E,
    a as O,
    m as v,
    d as R,
} from "../chunks/index.BXRlT4_D.js";
const x = "modulepreload",
    ee = function (f, e) {
        return new URL(f, e).href;
    },
    V = {},
    w = function (e, n, s) {
        let r = Promise.resolve();
        if (n && n.length > 0) {
            const _ = document.getElementsByTagName("link"),
                t = document.querySelector("meta[property=csp-nonce]"),
                o = (t == null ? void 0 : t.nonce) || (t == null ? void 0 : t.getAttribute("nonce"));
            r = Promise.all(
                n.map((i) => {
                    if (((i = ee(i, s)), i in V)) return;
                    V[i] = !0;
                    const c = i.endsWith(".css"),
                        l = c ? '[rel="stylesheet"]' : "";
                    if (!!s)
                        for (let P = _.length - 1; P >= 0; P--) {
                            const I = _[P];
                            if (I.href === i && (!c || I.rel === "stylesheet")) return;
                        }
                    else if (document.querySelector(`link[href="${i}"]${l}`)) return;
                    const u = document.createElement("link");
                    if (
                        ((u.rel = c ? "stylesheet" : x),
                        c || ((u.as = "script"), (u.crossOrigin = "")),
                        (u.href = i),
                        o && u.setAttribute("nonce", o),
                        document.head.appendChild(u),
                        c)
                    )
                        return new Promise((P, I) => {
                            u.addEventListener("load", P),
                                u.addEventListener("error", () => I(new Error(`Unable to preload CSS for ${i}`)));
                        });
                }),
            );
        }
        return r
            .then(() => e())
            .catch((_) => {
                const t = new Event("vite:preloadError", { cancelable: !0 });
                if (((t.payload = _), window.dispatchEvent(t), !t.defaultPrevented)) throw _;
            });
    },
    _e = {};
function te(f) {
    let e, n, s;
    var r = f[1][0];
    function _(t, o) {
        return { props: { data: t[3], form: t[2] } };
    }
    return (
        r && ((e = k(r, _(f))), f[15](e)),
        {
            c() {
                e && E(e.$$.fragment), (n = p());
            },
            l(t) {
                e && O(e.$$.fragment, t), (n = p());
            },
            m(t, o) {
                e && v(e, t, o), b(t, n, o), (s = !0);
            },
            p(t, o) {
                if (o & 2 && r !== (r = t[1][0])) {
                    if (e) {
                        A();
                        const i = e;
                        d(i.$$.fragment, 1, 0, () => {
                            R(i, 1);
                        }),
                            y();
                    }
                    r
                        ? ((e = k(r, _(t))), t[15](e), E(e.$$.fragment), h(e.$$.fragment, 1), v(e, n.parentNode, n))
                        : (e = null);
                } else if (r) {
                    const i = {};
                    o & 8 && (i.data = t[3]), o & 4 && (i.form = t[2]), e.$set(i);
                }
            },
            i(t) {
                s || (e && h(e.$$.fragment, t), (s = !0));
            },
            o(t) {
                e && d(e.$$.fragment, t), (s = !1);
            },
            d(t) {
                t && g(n), f[15](null), e && R(e, t);
            },
        }
    );
}
function ne(f) {
    let e, n, s;
    var r = f[1][0];
    function _(t, o) {
        return { props: { data: t[3], $$slots: { default: [oe] }, $$scope: { ctx: t } } };
    }
    return (
        r && ((e = k(r, _(f))), f[14](e)),
        {
            c() {
                e && E(e.$$.fragment), (n = p());
            },
            l(t) {
                e && O(e.$$.fragment, t), (n = p());
            },
            m(t, o) {
                e && v(e, t, o), b(t, n, o), (s = !0);
            },
            p(t, o) {
                if (o & 2 && r !== (r = t[1][0])) {
                    if (e) {
                        A();
                        const i = e;
                        d(i.$$.fragment, 1, 0, () => {
                            R(i, 1);
                        }),
                            y();
                    }
                    r
                        ? ((e = k(r, _(t))), t[14](e), E(e.$$.fragment), h(e.$$.fragment, 1), v(e, n.parentNode, n))
                        : (e = null);
                } else if (r) {
                    const i = {};
                    o & 8 && (i.data = t[3]), o & 65591 && (i.$$scope = { dirty: o, ctx: t }), e.$set(i);
                }
            },
            i(t) {
                s || (e && h(e.$$.fragment, t), (s = !0));
            },
            o(t) {
                e && d(e.$$.fragment, t), (s = !1);
            },
            d(t) {
                t && g(n), f[14](null), e && R(e, t);
            },
        }
    );
}
function ie(f) {
    let e, n, s;
    var r = f[1][1];
    function _(t, o) {
        return { props: { data: t[4], form: t[2] } };
    }
    return (
        r && ((e = k(r, _(f))), f[13](e)),
        {
            c() {
                e && E(e.$$.fragment), (n = p());
            },
            l(t) {
                e && O(e.$$.fragment, t), (n = p());
            },
            m(t, o) {
                e && v(e, t, o), b(t, n, o), (s = !0);
            },
            p(t, o) {
                if (o & 2 && r !== (r = t[1][1])) {
                    if (e) {
                        A();
                        const i = e;
                        d(i.$$.fragment, 1, 0, () => {
                            R(i, 1);
                        }),
                            y();
                    }
                    r
                        ? ((e = k(r, _(t))), t[13](e), E(e.$$.fragment), h(e.$$.fragment, 1), v(e, n.parentNode, n))
                        : (e = null);
                } else if (r) {
                    const i = {};
                    o & 16 && (i.data = t[4]), o & 4 && (i.form = t[2]), e.$set(i);
                }
            },
            i(t) {
                s || (e && h(e.$$.fragment, t), (s = !0));
            },
            o(t) {
                e && d(e.$$.fragment, t), (s = !1);
            },
            d(t) {
                t && g(n), f[13](null), e && R(e, t);
            },
        }
    );
}
function re(f) {
    let e, n, s;
    var r = f[1][1];
    function _(t, o) {
        return { props: { data: t[4], $$slots: { default: [se] }, $$scope: { ctx: t } } };
    }
    return (
        r && ((e = k(r, _(f))), f[12](e)),
        {
            c() {
                e && E(e.$$.fragment), (n = p());
            },
            l(t) {
                e && O(e.$$.fragment, t), (n = p());
            },
            m(t, o) {
                e && v(e, t, o), b(t, n, o), (s = !0);
            },
            p(t, o) {
                if (o & 2 && r !== (r = t[1][1])) {
                    if (e) {
                        A();
                        const i = e;
                        d(i.$$.fragment, 1, 0, () => {
                            R(i, 1);
                        }),
                            y();
                    }
                    r
                        ? ((e = k(r, _(t))), t[12](e), E(e.$$.fragment), h(e.$$.fragment, 1), v(e, n.parentNode, n))
                        : (e = null);
                } else if (r) {
                    const i = {};
                    o & 16 && (i.data = t[4]), o & 65575 && (i.$$scope = { dirty: o, ctx: t }), e.$set(i);
                }
            },
            i(t) {
                s || (e && h(e.$$.fragment, t), (s = !0));
            },
            o(t) {
                e && d(e.$$.fragment, t), (s = !1);
            },
            d(t) {
                t && g(n), f[12](null), e && R(e, t);
            },
        }
    );
}
function se(f) {
    let e, n, s;
    var r = f[1][2];
    function _(t, o) {
        return { props: { data: t[5], form: t[2] } };
    }
    return (
        r && ((e = k(r, _(f))), f[11](e)),
        {
            c() {
                e && E(e.$$.fragment), (n = p());
            },
            l(t) {
                e && O(e.$$.fragment, t), (n = p());
            },
            m(t, o) {
                e && v(e, t, o), b(t, n, o), (s = !0);
            },
            p(t, o) {
                if (o & 2 && r !== (r = t[1][2])) {
                    if (e) {
                        A();
                        const i = e;
                        d(i.$$.fragment, 1, 0, () => {
                            R(i, 1);
                        }),
                            y();
                    }
                    r
                        ? ((e = k(r, _(t))), t[11](e), E(e.$$.fragment), h(e.$$.fragment, 1), v(e, n.parentNode, n))
                        : (e = null);
                } else if (r) {
                    const i = {};
                    o & 32 && (i.data = t[5]), o & 4 && (i.form = t[2]), e.$set(i);
                }
            },
            i(t) {
                s || (e && h(e.$$.fragment, t), (s = !0));
            },
            o(t) {
                e && d(e.$$.fragment, t), (s = !1);
            },
            d(t) {
                t && g(n), f[11](null), e && R(e, t);
            },
        }
    );
}
function oe(f) {
    let e, n, s, r;
    const _ = [re, ie],
        t = [];
    function o(i, c) {
        return i[1][2] ? 0 : 1;
    }
    return (
        (e = o(f)),
        (n = t[e] = _[e](f)),
        {
            c() {
                n.c(), (s = p());
            },
            l(i) {
                n.l(i), (s = p());
            },
            m(i, c) {
                t[e].m(i, c), b(i, s, c), (r = !0);
            },
            p(i, c) {
                let l = e;
                (e = o(i)),
                    e === l
                        ? t[e].p(i, c)
                        : (A(),
                          d(t[l], 1, 1, () => {
                              t[l] = null;
                          }),
                          y(),
                          (n = t[e]),
                          n ? n.p(i, c) : ((n = t[e] = _[e](i)), n.c()),
                          h(n, 1),
                          n.m(s.parentNode, s));
            },
            i(i) {
                r || (h(n), (r = !0));
            },
            o(i) {
                d(n), (r = !1);
            },
            d(i) {
                i && g(s), t[e].d(i);
            },
        }
    );
}
function $(f) {
    let e,
        n = f[7] && N(f);
    return {
        c() {
            (e = F("div")), n && n.c(), this.h();
        },
        l(s) {
            e = G(s, "DIV", { id: !0, "aria-live": !0, "aria-atomic": !0, style: !0 });
            var r = H(e);
            n && n.l(r), r.forEach(g), this.h();
        },
        h() {
            T(e, "id", "svelte-announcer"),
                T(e, "aria-live", "assertive"),
                T(e, "aria-atomic", "true"),
                L(e, "position", "absolute"),
                L(e, "left", "0"),
                L(e, "top", "0"),
                L(e, "clip", "rect(0 0 0 0)"),
                L(e, "clip-path", "inset(50%)"),
                L(e, "overflow", "hidden"),
                L(e, "white-space", "nowrap"),
                L(e, "width", "1px"),
                L(e, "height", "1px");
        },
        m(s, r) {
            b(s, e, r), n && n.m(e, null);
        },
        p(s, r) {
            s[7] ? (n ? n.p(s, r) : ((n = N(s)), n.c(), n.m(e, null))) : n && (n.d(1), (n = null));
        },
        d(s) {
            s && g(e), n && n.d();
        },
    };
}
function N(f) {
    let e;
    return {
        c() {
            e = J(f[8]);
        },
        l(n) {
            e = Q(n, f[8]);
        },
        m(n, s) {
            b(n, e, s);
        },
        p(n, s) {
            s & 256 && X(e, n[8]);
        },
        d(n) {
            n && g(e);
        },
    };
}
function fe(f) {
    let e, n, s, r, _;
    const t = [ne, te],
        o = [];
    function i(l, m) {
        return l[1][1] ? 0 : 1;
    }
    (e = i(f)), (n = o[e] = t[e](f));
    let c = f[6] && $(f);
    return {
        c() {
            n.c(), (s = j()), c && c.c(), (r = p());
        },
        l(l) {
            n.l(l), (s = K(l)), c && c.l(l), (r = p());
        },
        m(l, m) {
            o[e].m(l, m), b(l, s, m), c && c.m(l, m), b(l, r, m), (_ = !0);
        },
        p(l, [m]) {
            let u = e;
            (e = i(l)),
                e === u
                    ? o[e].p(l, m)
                    : (A(),
                      d(o[u], 1, 1, () => {
                          o[u] = null;
                      }),
                      y(),
                      (n = o[e]),
                      n ? n.p(l, m) : ((n = o[e] = t[e](l)), n.c()),
                      h(n, 1),
                      n.m(s.parentNode, s)),
                l[6] ? (c ? c.p(l, m) : ((c = $(l)), c.c(), c.m(r.parentNode, r))) : c && (c.d(1), (c = null));
        },
        i(l) {
            _ || (h(n), (_ = !0));
        },
        o(l) {
            d(n), (_ = !1);
        },
        d(l) {
            l && (g(s), g(r)), o[e].d(l), c && c.d(l);
        },
    };
}
function le(f, e, n) {
    let { stores: s } = e,
        { page: r } = e,
        { constructors: _ } = e,
        { components: t = [] } = e,
        { form: o } = e,
        { data_0: i = null } = e,
        { data_1: c = null } = e,
        { data_2: l = null } = e;
    W(s.page.notify);
    let m = !1,
        u = !1,
        P = null;
    z(() => {
        const a = s.page.subscribe(() => {
            m &&
                (n(7, (u = !0)),
                Y().then(() => {
                    n(8, (P = document.title || "untitled page"));
                }));
        });
        return n(6, (m = !0)), a;
    });
    function I(a) {
        D[a ? "unshift" : "push"](() => {
            (t[2] = a), n(0, t);
        });
    }
    function S(a) {
        D[a ? "unshift" : "push"](() => {
            (t[1] = a), n(0, t);
        });
    }
    function q(a) {
        D[a ? "unshift" : "push"](() => {
            (t[1] = a), n(0, t);
        });
    }
    function C(a) {
        D[a ? "unshift" : "push"](() => {
            (t[0] = a), n(0, t);
        });
    }
    function B(a) {
        D[a ? "unshift" : "push"](() => {
            (t[0] = a), n(0, t);
        });
    }
    return (
        (f.$$set = (a) => {
            "stores" in a && n(9, (s = a.stores)),
                "page" in a && n(10, (r = a.page)),
                "constructors" in a && n(1, (_ = a.constructors)),
                "components" in a && n(0, (t = a.components)),
                "form" in a && n(2, (o = a.form)),
                "data_0" in a && n(3, (i = a.data_0)),
                "data_1" in a && n(4, (c = a.data_1)),
                "data_2" in a && n(5, (l = a.data_2));
        }),
        (f.$$.update = () => {
            f.$$.dirty & 1536 && s.page.set(r);
        }),
        [t, _, o, i, c, l, m, u, P, s, r, I, S, q, C, B]
    );
}
class ue extends Z {
    constructor(e) {
        super(),
            M(this, e, le, fe, U, {
                stores: 9,
                page: 10,
                constructors: 1,
                components: 0,
                form: 2,
                data_0: 3,
                data_1: 4,
                data_2: 5,
            });
    }
}
const me = [
        () =>
            w(() => import("../nodes/0.BwUyDowk.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), import.meta.url),
        () => w(() => import("../nodes/1.rBeSBvzz.js"), __vite__mapDeps([10, 1, 2, 8, 6]), import.meta.url),
        () =>
            w(
                () => import("../nodes/2.CMbc2S0e.js"),
                __vite__mapDeps([11, 1, 2, 5, 12, 6, 4, 13, 8, 14, 15, 16, 17, 18]),
                import.meta.url,
            ),
        () =>
            w(
                () => import("../nodes/3.PLH0QKSC.js"),
                __vite__mapDeps([19, 1, 2, 20, 4, 12, 6, 21, 17, 22, 23]),
                import.meta.url,
            ),
        () =>
            w(
                () => import("../nodes/4.DaOlPwPw.js"),
                __vite__mapDeps([24, 1, 2, 20, 4, 12, 6, 21, 25, 22, 17, 26, 27, 16]),
                import.meta.url,
            ),
        () =>
            w(
                () => import("../nodes/5.CCJ9-C3I.js"),
                __vite__mapDeps([28, 1, 2, 20, 4, 12, 6, 21, 25, 22, 17, 26, 27, 16]),
                import.meta.url,
            ),
        () =>
            w(
                () => import("../nodes/6.Dk-te1bn.js"),
                __vite__mapDeps([29, 1, 2, 5, 20, 4, 12, 6, 22, 30, 15, 16, 17, 31]),
                import.meta.url,
            ),
        () =>
            w(
                () => import("../nodes/7.BjPQ0hxe.js"),
                __vite__mapDeps([32, 1, 2, 12, 6, 4, 33, 15, 16, 27, 17, 3, 5, 7, 22, 26, 30, 13, 34]),
                import.meta.url,
            ),
        () =>
            w(
                () => import("../nodes/8.DHNSRoA_.js"),
                __vite__mapDeps([35, 1, 2, 4, 36, 6, 8, 12, 27, 16, 5, 14, 15, 37, 33, 22, 38]),
                import.meta.url,
            ),
        () =>
            w(
                () => import("../nodes/9.B29ryLn6.js"),
                __vite__mapDeps([39, 1, 2, 5, 4, 36, 6, 8, 12, 27, 16, 14, 15, 37, 22, 40]),
                import.meta.url,
            ),
    ],
    pe = [],
    de = {
        "/": [3],
        "/auth/login": [4],
        "/auth/signup": [5],
        "/credits": [6],
        "/posts": [7],
        "/settings/appearance": [-9, [2]],
        "/settings/profile": [-10, [2]],
    },
    he = {
        handleError: ({ error: f }) => {
            console.error(f);
        },
        reroute: () => {},
    };
export { de as dictionary, he as hooks, _e as matchers, me as nodes, ue as root, pe as server_loads };
