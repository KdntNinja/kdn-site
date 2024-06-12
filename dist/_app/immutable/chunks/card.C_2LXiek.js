import {
    s as g,
    v as h,
    w as d,
    e as v,
    c as b,
    b as p,
    f as u,
    x as _,
    i as C,
    y as S,
    z as q,
    A as z,
    B as f,
    C as A,
} from "./scheduler.CCxz69I-.js";
import { S as B, i as D, t as E, b as I } from "./index.BXRlT4_D.js";
import { g as N } from "./spread.CgU5AtxT.js";
import { c as m } from "./routes.BurMO2Cv.js";
function P(r) {
    let e, o, a;
    const n = r[3].default,
        t = h(n, r, r[2], null);
    let c = [{ class: (o = m("rounded-lg border bg-card text-card-foreground shadow-sm", r[0])) }, r[1]],
        i = {};
    for (let s = 0; s < c.length; s += 1) i = d(i, c[s]);
    return {
        c() {
            (e = v("div")), t && t.c(), this.h();
        },
        l(s) {
            e = b(s, "DIV", { class: !0 });
            var l = p(e);
            t && t.l(l), l.forEach(u), this.h();
        },
        h() {
            _(e, i);
        },
        m(s, l) {
            C(s, e, l), t && t.m(e, null), (a = !0);
        },
        p(s, [l]) {
            t && t.p && (!a || l & 4) && S(t, n, s, s[2], a ? z(n, s[2], l, null) : q(s[2]), null),
                _(
                    e,
                    (i = N(c, [
                        (!a ||
                            (l & 1 &&
                                o !== (o = m("rounded-lg border bg-card text-card-foreground shadow-sm", s[0])))) && {
                            class: o,
                        },
                        l & 2 && s[1],
                    ])),
                );
        },
        i(s) {
            a || (E(t, s), (a = !0));
        },
        o(s) {
            I(t, s), (a = !1);
        },
        d(s) {
            s && u(e), t && t.d(s);
        },
    };
}
function V(r, e, o) {
    const a = ["class"];
    let n = f(e, a),
        { $$slots: t = {}, $$scope: c } = e,
        { class: i = void 0 } = e;
    return (
        (r.$$set = (s) => {
            (e = d(d({}, e), A(s))),
                o(1, (n = f(e, a))),
                "class" in s && o(0, (i = s.class)),
                "$$scope" in s && o(2, (c = s.$$scope));
        }),
        [i, n, c, t]
    );
}
class G extends B {
    constructor(e) {
        super(), D(this, e, V, P, g, { class: 0 });
    }
}
export { G as C };
