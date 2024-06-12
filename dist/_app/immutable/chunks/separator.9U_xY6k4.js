import { s as _, w as c, B as m, C as u } from "./scheduler.CCxz69I-.js";
import { S as p, i as d, c as g, a as h, m as v, t as b, b as S, d as z } from "./index.BXRlT4_D.js";
import { g as k, a as C } from "./spread.CgU5AtxT.js";
import { c as f } from "./routes.DmSXBMY8.js";
import { S as j } from "./separator.P9TE4O0p.js";
function q(r) {
    let e, a;
    const i = [
        { class: f("shrink-0 bg-border", r[1] === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", r[0]) },
        { orientation: r[1] },
        { decorative: r[2] },
        r[3],
    ];
    let n = {};
    for (let t = 0; t < i.length; t += 1) n = c(n, i[t]);
    return (
        (e = new j({ props: n })),
        {
            c() {
                g(e.$$.fragment);
            },
            l(t) {
                h(e.$$.fragment, t);
            },
            m(t, o) {
                v(e, t, o), (a = !0);
            },
            p(t, [o]) {
                const l =
                    o & 15
                        ? k(i, [
                              o & 3 && {
                                  class: f(
                                      "shrink-0 bg-border",
                                      t[1] === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                                      t[0],
                                  ),
                              },
                              o & 2 && { orientation: t[1] },
                              o & 4 && { decorative: t[2] },
                              o & 8 && C(t[3]),
                          ])
                        : {};
                e.$set(l);
            },
            i(t) {
                a || (b(e.$$.fragment, t), (a = !0));
            },
            o(t) {
                S(e.$$.fragment, t), (a = !1);
            },
            d(t) {
                z(e, t);
            },
        }
    );
}
function B(r, e, a) {
    const i = ["class", "orientation", "decorative"];
    let n = m(e, i),
        { class: t = void 0 } = e,
        { orientation: o = "horizontal" } = e,
        { decorative: l = void 0 } = e;
    return (
        (r.$$set = (s) => {
            (e = c(c({}, e), u(s))),
                a(3, (n = m(e, i))),
                "class" in s && a(0, (t = s.class)),
                "orientation" in s && a(1, (o = s.orientation)),
                "decorative" in s && a(2, (l = s.decorative));
        }),
        [t, o, l, n]
    );
}
class E extends p {
    constructor(e) {
        super(), d(this, e, B, q, _, { class: 0, orientation: 1, decorative: 2 });
    }
}
export { E as S };
