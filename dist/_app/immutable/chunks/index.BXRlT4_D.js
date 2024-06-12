var G = Object.defineProperty;
var J = (t, e, n) => (e in t ? G(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (t[e] = n));
var F = (t, e, n) => (J(t, typeof e != "symbol" ? e + "" : e, n), n);
import {
    n as w,
    X as K,
    f as X,
    Y as Q,
    H as k,
    E as R,
    R as O,
    Z as T,
    F as I,
    _ as U,
    b as W,
    $ as tt,
    a0 as et,
    a1 as nt,
    a2 as it,
    a3 as V,
    a4 as st,
    a5 as rt,
    a6 as at,
    a7 as ft,
    a8 as ot,
} from "./scheduler.CCxz69I-.js";
const Y = typeof window < "u";
let N = Y ? () => window.performance.now() : () => Date.now(),
    B = Y ? (t) => requestAnimationFrame(t) : w;
const E = new Set();
function Z(t) {
    E.forEach((e) => {
        e.c(t) || (E.delete(e), e.f());
    }),
        E.size !== 0 && B(Z);
}
function D(t) {
    let e;
    return (
        E.size === 0 && B(Z),
        {
            promise: new Promise((n) => {
                E.add((e = { c: t, f: n }));
            }),
            abort() {
                E.delete(e);
            },
        }
    );
}
const M = new Map();
let P = 0;
function ut(t) {
    let e = 5381,
        n = t.length;
    for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
    return e >>> 0;
}
function lt(t, e) {
    const n = { stylesheet: Q(e), rules: {} };
    return M.set(t, n), n;
}
function z(t, e, n, s, u, a, l, i = 0) {
    const c = 16.666 / s;
    let r = `{
`;
    for (let $ = 0; $ <= 1; $ += c) {
        const m = e + (n - e) * a($);
        r +=
            $ * 100 +
            `%{${l(m, 1 - m)}}
`;
    }
    const d =
            r +
            `100% {${l(n, 1 - n)}}
}`,
        o = `__svelte_${ut(d)}_${i}`,
        g = K(t),
        { stylesheet: h, rules: f } = M.get(g) || lt(g, t);
    f[o] || ((f[o] = !0), h.insertRule(`@keyframes ${o} ${d}`, h.cssRules.length));
    const _ = t.style.animation || "";
    return (t.style.animation = `${_ ? `${_}, ` : ""}${o} ${s}ms linear ${u}ms 1 both`), (P += 1), o;
}
function A(t, e) {
    const n = (t.style.animation || "").split(", "),
        s = n.filter(e ? (a) => a.indexOf(e) < 0 : (a) => a.indexOf("__svelte") === -1),
        u = n.length - s.length;
    u && ((t.style.animation = s.join(", ")), (P -= u), P || ct());
}
function ct() {
    B(() => {
        P ||
            (M.forEach((t) => {
                const { ownerNode: e } = t.stylesheet;
                e && X(e);
            }),
            M.clear());
    });
}
let S;
function H() {
    return (
        S ||
            ((S = Promise.resolve()),
            S.then(() => {
                S = null;
            })),
        S
    );
}
function v(t, e, n) {
    t.dispatchEvent(T(`${e ? "intro" : "outro"}${n}`));
}
const C = new Set();
let p;
function yt() {
    p = { r: 0, c: [], p };
}
function xt() {
    p.r || k(p.c), (p = p.p);
}
function dt(t, e) {
    t && t.i && (C.delete(t), t.i(e));
}
function vt(t, e, n, s) {
    if (t && t.o) {
        if (C.has(t)) return;
        C.add(t),
            p.c.push(() => {
                C.delete(t), s && (n && t.d(1), s());
            }),
            t.o(e);
    } else s && s();
}
const L = { duration: 0 };
function wt(t, e, n) {
    const s = { direction: "in" };
    let u = e(t, n, s),
        a = !1,
        l,
        i,
        c = 0;
    function r() {
        l && A(t, l);
    }
    function d() {
        const { delay: g = 0, duration: h = 300, easing: f = I, tick: _ = w, css: $ } = u || L;
        $ && (l = z(t, 0, 1, h, g, f, $, c++)), _(0, 1);
        const m = N() + g,
            y = m + h;
        i && i.abort(),
            (a = !0),
            O(() => v(t, !0, "start")),
            (i = D((x) => {
                if (a) {
                    if (x >= y) return _(1, 0), v(t, !0, "end"), r(), (a = !1);
                    if (x >= m) {
                        const b = f((x - m) / h);
                        _(b, 1 - b);
                    }
                }
                return a;
            }));
    }
    let o = !1;
    return {
        start() {
            o || ((o = !0), A(t), R(u) ? ((u = u(s)), H().then(d)) : d());
        },
        invalidate() {
            o = !1;
        },
        end() {
            a && (r(), (a = !1));
        },
    };
}
function bt(t, e, n) {
    const s = { direction: "out" };
    let u = e(t, n, s),
        a = !0,
        l;
    const i = p;
    i.r += 1;
    let c;
    function r() {
        const { delay: d = 0, duration: o = 300, easing: g = I, tick: h = w, css: f } = u || L;
        f && (l = z(t, 1, 0, o, d, g, f));
        const _ = N() + d,
            $ = _ + o;
        O(() => v(t, !1, "start")),
            "inert" in t && ((c = t.inert), (t.inert = !0)),
            D((m) => {
                if (a) {
                    if (m >= $) return h(0, 1), v(t, !1, "end"), --i.r || k(i.c), !1;
                    if (m >= _) {
                        const y = g((m - _) / o);
                        h(1 - y, y);
                    }
                }
                return a;
            });
    }
    return (
        R(u)
            ? H().then(() => {
                  (u = u(s)), r();
              })
            : r(),
        {
            end(d) {
                d && "inert" in t && (t.inert = c), d && u.tick && u.tick(1, 0), a && (l && A(t, l), (a = !1));
            },
        }
    );
}
function Et(t, e, n, s) {
    let a = e(t, n, { direction: "both" }),
        l = s ? 0 : 1,
        i = null,
        c = null,
        r = null,
        d;
    function o() {
        r && A(t, r);
    }
    function g(f, _) {
        const $ = f.b - l;
        return (
            (_ *= Math.abs($)), { a: l, b: f.b, d: $, duration: _, start: f.start, end: f.start + _, group: f.group }
        );
    }
    function h(f) {
        const { delay: _ = 0, duration: $ = 300, easing: m = I, tick: y = w, css: x } = a || L,
            b = { start: N() + _, b: f };
        f || ((b.group = p), (p.r += 1)),
            "inert" in t && (f ? d !== void 0 && (t.inert = d) : ((d = t.inert), (t.inert = !0))),
            i || c
                ? (c = b)
                : (x && (o(), (r = z(t, l, f, $, _, m, x))),
                  f && y(0, 1),
                  (i = g(b, $)),
                  O(() => v(t, f, "start")),
                  D((j) => {
                      if (
                          (c &&
                              j > c.start &&
                              ((i = g(c, $)),
                              (c = null),
                              v(t, i.b, "start"),
                              x && (o(), (r = z(t, l, i.b, i.duration, 0, m, a.css)))),
                          i)
                      ) {
                          if (j >= i.end)
                              y((l = i.b), 1 - l),
                                  v(t, i.b, "end"),
                                  c || (i.b ? o() : --i.group.r || k(i.group.c)),
                                  (i = null);
                          else if (j >= i.start) {
                              const q = j - i.start;
                              (l = i.a + i.d * m(q / i.duration)), y(l, 1 - l);
                          }
                      }
                      return !!(i || c);
                  }));
    }
    return {
        run(f) {
            R(a)
                ? H().then(() => {
                      (a = a({ direction: f ? "in" : "out" })), h(f);
                  })
                : h(f);
        },
        end() {
            o(), (i = c = null);
        },
    };
}
function kt(t, e, n) {
    const s = t.$$.props[e];
    s !== void 0 && ((t.$$.bound[s] = n), n(t.$$.ctx[s]));
}
function St(t) {
    t && t.c();
}
function Ot(t, e) {
    t && t.l(e);
}
function _t(t, e, n) {
    const { fragment: s, after_update: u } = t.$$;
    s && s.m(e, n),
        O(() => {
            const a = t.$$.on_mount.map(st).filter(R);
            t.$$.on_destroy ? t.$$.on_destroy.push(...a) : k(a), (t.$$.on_mount = []);
        }),
        u.forEach(O);
}
function $t(t, e) {
    const n = t.$$;
    n.fragment !== null &&
        (nt(n.after_update),
        k(n.on_destroy),
        n.fragment && n.fragment.d(e),
        (n.on_destroy = n.fragment = null),
        (n.ctx = []));
}
function ht(t, e) {
    t.$$.dirty[0] === -1 && (rt.push(t), at(), t.$$.dirty.fill(0)), (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Rt(t, e, n, s, u, a, l = null, i = [-1]) {
    const c = it;
    V(t);
    const r = (t.$$ = {
        fragment: null,
        ctx: [],
        props: a,
        update: w,
        not_equal: u,
        bound: U(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(e.context || (c ? c.$$.context : [])),
        callbacks: U(),
        dirty: i,
        skip_bound: !1,
        root: e.target || c.$$.root,
    });
    l && l(r.root);
    let d = !1;
    if (
        ((r.ctx = n
            ? n(t, e.props || {}, (o, g, ...h) => {
                  const f = h.length ? h[0] : g;
                  return (
                      r.ctx &&
                          u(r.ctx[o], (r.ctx[o] = f)) &&
                          (!r.skip_bound && r.bound[o] && r.bound[o](f), d && ht(t, o)),
                      g
                  );
              })
            : []),
        r.update(),
        (d = !0),
        k(r.before_update),
        (r.fragment = s ? s(r.ctx) : !1),
        e.target)
    ) {
        if (e.hydrate) {
            ft();
            const o = W(e.target);
            r.fragment && r.fragment.l(o), o.forEach(X);
        } else r.fragment && r.fragment.c();
        e.intro && dt(t.$$.fragment), _t(t, e.target, e.anchor), ot(), tt();
    }
    V(c);
}
class jt {
    constructor() {
        F(this, "$$");
        F(this, "$$set");
    }
    $destroy() {
        $t(this, 1), (this.$destroy = w);
    }
    $on(e, n) {
        if (!R(n)) return w;
        const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return (
            s.push(n),
            () => {
                const u = s.indexOf(n);
                u !== -1 && s.splice(u, 1);
            }
        );
    }
    $set(e) {
        this.$$set && !et(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
    }
}
const gt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: new Set() })).v.add(gt);
export {
    jt as S,
    Ot as a,
    vt as b,
    St as c,
    $t as d,
    kt as e,
    xt as f,
    yt as g,
    wt as h,
    Rt as i,
    bt as j,
    Et as k,
    _t as m,
    dt as t,
};
