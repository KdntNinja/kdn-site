import { w as l } from "./routes.BurMO2Cv.js";
const x = (u, s) => {
    const n = l(u),
        e = (t, o) => {
            n.update((a) => {
                const p = t(a);
                let r = p;
                return s && (r = s({ curr: a, next: p })), o == null || o(r), r;
            });
        };
    return {
        ...n,
        update: e,
        set: (t) => {
            e(() => t);
        },
    };
};
export { x as o };
