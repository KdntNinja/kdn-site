import { a as C } from "./routes.BurMO2Cv.js";
import { D as w, w as x, E as B, F as R } from "./scheduler.CCxz69I-.js";
function v(s, { delay: l = 0, duration: c = 400, easing: r = R } = {}) {
    const g = +getComputedStyle(s).opacity;
    return { delay: l, duration: c, easing: r, css: (i) => `opacity: ${i * g}` };
}
function D(s, { delay: l = 0, duration: c = 400, easing: r = C, x: g = 0, y: i = 0, opacity: a = 0 } = {}) {
    const n = getComputedStyle(s),
        f = +n.opacity,
        o = n.transform === "none" ? "" : n.transform,
        t = f * (1 - a),
        [p, u] = w(g),
        [y, $] = w(i);
    return {
        delay: l,
        duration: c,
        easing: r,
        css: (d, h) => `
			transform: ${o} translate(${(1 - d) * p}${u}, ${(1 - d) * y}${$});
			opacity: ${f - t * h}`,
    };
}
function E({ fallback: s, ...l }) {
    const c = new Map(),
        r = new Map();
    function g(a, n, f) {
        const { delay: o = 0, duration: t = (e) => Math.sqrt(e) * 30, easing: p = C } = x(x({}, l), f),
            u = a.getBoundingClientRect(),
            y = n.getBoundingClientRect(),
            $ = u.left - y.left,
            d = u.top - y.top,
            h = u.width / y.width,
            k = u.height / y.height,
            M = Math.sqrt($ * $ + d * d),
            m = getComputedStyle(n),
            S = m.transform === "none" ? "" : m.transform,
            q = +m.opacity;
        return {
            delay: o,
            duration: B(t) ? t(M) : t,
            easing: p,
            css: (e, _) => `
				opacity: ${e * q};
				transform-origin: top left;
				transform: ${S} translate(${_ * $}px,${_ * d}px) scale(${e + (1 - e) * h}, ${e + (1 - e) * k});
			`,
        };
    }
    function i(a, n, f) {
        return (o, t) => (
            a.set(t.key, o),
            () => {
                if (n.has(t.key)) {
                    const p = n.get(t.key);
                    return n.delete(t.key), g(p, o, t);
                }
                return a.delete(t.key), s && s(o, t, f);
            }
        );
    }
    return [i(r, c, !1), i(c, r, !0)];
}
export { D as a, E as c, v as f };
