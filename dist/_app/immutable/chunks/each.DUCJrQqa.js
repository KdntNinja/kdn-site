import { b as k, t as q } from "./index.BXRlT4_D.js";
import { H as z } from "./scheduler.CCxz69I-.js";
function E(n) {
    return (n == null ? void 0 : n.length) !== void 0 ? n : Array.from(n);
}
function F(n, o) {
    k(n, 1, 1, () => {
        o.delete(n.key);
    });
}
function G(n, o, x, B, A, g, f, H, p, b, w, j) {
    let i = n.length,
        d = g.length,
        c = i;
    const u = {};
    for (; c--; ) u[n[c].key] = c;
    const h = [],
        a = new Map(),
        m = new Map(),
        M = [];
    for (c = d; c--; ) {
        const e = j(A, g, c),
            s = x(e);
        let t = f.get(s);
        t ? M.push(() => t.p(e, o)) : ((t = b(s, e)), t.c()),
            a.set(s, (h[c] = t)),
            s in u && m.set(s, Math.abs(c - u[s]));
    }
    const v = new Set(),
        S = new Set();
    function y(e) {
        q(e, 1), e.m(H, w), f.set(e.key, e), (w = e.first), d--;
    }
    for (; i && d; ) {
        const e = h[d - 1],
            s = n[i - 1],
            t = e.key,
            l = s.key;
        e === s
            ? ((w = e.first), i--, d--)
            : a.has(l)
              ? !f.has(t) || v.has(t)
                  ? y(e)
                  : S.has(l)
                    ? i--
                    : m.get(t) > m.get(l)
                      ? (S.add(t), y(e))
                      : (v.add(l), i--)
              : (p(s, f), i--);
    }
    for (; i--; ) {
        const e = n[i];
        a.has(e.key) || p(e, f);
    }
    for (; d; ) y(h[d - 1]);
    return z(M), h;
}
export { E as e, F as o, G as u };
