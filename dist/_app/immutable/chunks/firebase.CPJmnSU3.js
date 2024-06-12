var Yo = {};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wc = function (n) {
        const e = [];
        let t = 0;
        for (let r = 0; r < n.length; r++) {
            let i = n.charCodeAt(r);
            i < 128
                ? (e[t++] = i)
                : i < 2048
                  ? ((e[t++] = (i >> 6) | 192), (e[t++] = (i & 63) | 128))
                  : (i & 64512) === 55296 && r + 1 < n.length && (n.charCodeAt(r + 1) & 64512) === 56320
                    ? ((i = 65536 + ((i & 1023) << 10) + (n.charCodeAt(++r) & 1023)),
                      (e[t++] = (i >> 18) | 240),
                      (e[t++] = ((i >> 12) & 63) | 128),
                      (e[t++] = ((i >> 6) & 63) | 128),
                      (e[t++] = (i & 63) | 128))
                    : ((e[t++] = (i >> 12) | 224), (e[t++] = ((i >> 6) & 63) | 128), (e[t++] = (i & 63) | 128));
        }
        return e;
    },
    kh = function (n) {
        const e = [];
        let t = 0,
            r = 0;
        for (; t < n.length; ) {
            const i = n[t++];
            if (i < 128) e[r++] = String.fromCharCode(i);
            else if (i > 191 && i < 224) {
                const s = n[t++];
                e[r++] = String.fromCharCode(((i & 31) << 6) | (s & 63));
            } else if (i > 239 && i < 365) {
                const s = n[t++],
                    o = n[t++],
                    a = n[t++],
                    c = (((i & 7) << 18) | ((s & 63) << 12) | ((o & 63) << 6) | (a & 63)) - 65536;
                (e[r++] = String.fromCharCode(55296 + (c >> 10))), (e[r++] = String.fromCharCode(56320 + (c & 1023)));
            } else {
                const s = n[t++],
                    o = n[t++];
                e[r++] = String.fromCharCode(((i & 15) << 12) | ((s & 63) << 6) | (o & 63));
            }
        }
        return e.join("");
    },
    Ac = {
        byteToCharMap_: null,
        charToByteMap_: null,
        byteToCharMapWebSafe_: null,
        charToByteMapWebSafe_: null,
        ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + "+/=";
        },
        get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + "-_.";
        },
        HAS_NATIVE_SUPPORT: typeof atob == "function",
        encodeByteArray(n, e) {
            if (!Array.isArray(n)) throw Error("encodeByteArray takes an array as a parameter");
            this.init_();
            const t = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
                r = [];
            for (let i = 0; i < n.length; i += 3) {
                const s = n[i],
                    o = i + 1 < n.length,
                    a = o ? n[i + 1] : 0,
                    c = i + 2 < n.length,
                    u = c ? n[i + 2] : 0,
                    l = s >> 2,
                    h = ((s & 3) << 4) | (a >> 4);
                let d = ((a & 15) << 2) | (u >> 6),
                    p = u & 63;
                c || ((p = 64), o || (d = 64)), r.push(t[l], t[h], t[d], t[p]);
            }
            return r.join("");
        },
        encodeString(n, e) {
            return this.HAS_NATIVE_SUPPORT && !e ? btoa(n) : this.encodeByteArray(wc(n), e);
        },
        decodeString(n, e) {
            return this.HAS_NATIVE_SUPPORT && !e ? atob(n) : kh(this.decodeStringToByteArray(n, e));
        },
        decodeStringToByteArray(n, e) {
            this.init_();
            const t = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
                r = [];
            for (let i = 0; i < n.length; ) {
                const s = t[n.charAt(i++)],
                    a = i < n.length ? t[n.charAt(i)] : 0;
                ++i;
                const u = i < n.length ? t[n.charAt(i)] : 64;
                ++i;
                const h = i < n.length ? t[n.charAt(i)] : 64;
                if ((++i, s == null || a == null || u == null || h == null)) throw new Dh();
                const d = (s << 2) | (a >> 4);
                if ((r.push(d), u !== 64)) {
                    const p = ((a << 4) & 240) | (u >> 2);
                    if ((r.push(p), h !== 64)) {
                        const I = ((u << 6) & 192) | h;
                        r.push(I);
                    }
                }
            }
            return r;
        },
        init_() {
            if (!this.byteToCharMap_) {
                (this.byteToCharMap_ = {}),
                    (this.charToByteMap_ = {}),
                    (this.byteToCharMapWebSafe_ = {}),
                    (this.charToByteMapWebSafe_ = {});
                for (let n = 0; n < this.ENCODED_VALS.length; n++)
                    (this.byteToCharMap_[n] = this.ENCODED_VALS.charAt(n)),
                        (this.charToByteMap_[this.byteToCharMap_[n]] = n),
                        (this.byteToCharMapWebSafe_[n] = this.ENCODED_VALS_WEBSAFE.charAt(n)),
                        (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]] = n),
                        n >= this.ENCODED_VALS_BASE.length &&
                            ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)] = n),
                            (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)] = n));
            }
        },
    };
class Dh extends Error {
    constructor() {
        super(...arguments), (this.name = "DecodeBase64StringError");
    }
}
const Vh = function (n) {
        const e = wc(n);
        return Ac.encodeByteArray(e, !0);
    },
    Ir = function (n) {
        return Vh(n).replace(/\./g, "");
    },
    Rc = function (n) {
        try {
            return Ac.decodeString(n, !0);
        } catch (e) {
            console.error("base64Decode failed: ", e);
        }
        return null;
    };
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Nh() {
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
    throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Oh = () => Nh().__FIREBASE_DEFAULTS__,
    Mh = () => {
        if (typeof process > "u" || typeof Yo > "u") return;
        const n = Yo.__FIREBASE_DEFAULTS__;
        if (n) return JSON.parse(n);
    },
    Lh = () => {
        if (typeof document > "u") return;
        let n;
        try {
            n = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
        } catch {
            return;
        }
        const e = n && Rc(n[1]);
        return e && JSON.parse(e);
    },
    $r = () => {
        try {
            return Oh() || Mh() || Lh();
        } catch (n) {
            console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);
            return;
        }
    },
    Pc = (n) => {
        var e, t;
        return (t = (e = $r()) === null || e === void 0 ? void 0 : e.emulatorHosts) === null || t === void 0
            ? void 0
            : t[n];
    },
    xh = (n) => {
        const e = Pc(n);
        if (!e) return;
        const t = e.lastIndexOf(":");
        if (t <= 0 || t + 1 === e.length) throw new Error(`Invalid host ${e} with no separate hostname and port!`);
        const r = parseInt(e.substring(t + 1), 10);
        return e[0] === "[" ? [e.substring(1, t - 1), r] : [e.substring(0, t), r];
    },
    Sc = () => {
        var n;
        return (n = $r()) === null || n === void 0 ? void 0 : n.config;
    },
    Cc = (n) => {
        var e;
        return (e = $r()) === null || e === void 0 ? void 0 : e[`_${n}`];
    };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fh {
    constructor() {
        (this.reject = () => {}),
            (this.resolve = () => {}),
            (this.promise = new Promise((e, t) => {
                (this.resolve = e), (this.reject = t);
            }));
    }
    wrapCallback(e) {
        return (t, r) => {
            t ? this.reject(t) : this.resolve(r),
                typeof e == "function" && (this.promise.catch(() => {}), e.length === 1 ? e(t) : e(t, r));
        };
    }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Uh(n, e) {
    if (n.uid)
        throw new Error(
            'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.',
        );
    const t = { alg: "none", type: "JWT" },
        r = e || "demo-project",
        i = n.iat || 0,
        s = n.sub || n.user_id;
    if (!s) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
    const o = Object.assign(
        {
            iss: `https://securetoken.google.com/${r}`,
            aud: r,
            iat: i,
            exp: i + 3600,
            auth_time: i,
            sub: s,
            user_id: s,
            firebase: { sign_in_provider: "custom", identities: {} },
        },
        n,
    );
    return [Ir(JSON.stringify(t)), Ir(JSON.stringify(o)), ""].join(".");
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ee() {
    return typeof navigator < "u" && typeof navigator.userAgent == "string" ? navigator.userAgent : "";
}
function Bh() {
    return (
        typeof window < "u" &&
        !!(window.cordova || window.phonegap || window.PhoneGap) &&
        /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ee())
    );
}
function qh() {
    var n;
    const e = (n = $r()) === null || n === void 0 ? void 0 : n.forceEnvironment;
    if (e === "node") return !0;
    if (e === "browser") return !1;
    try {
        return Object.prototype.toString.call(global.process) === "[object process]";
    } catch {
        return !1;
    }
}
function jh() {
    const n = typeof chrome == "object" ? chrome.runtime : typeof browser == "object" ? browser.runtime : void 0;
    return typeof n == "object" && n.id !== void 0;
}
function $h() {
    return typeof navigator == "object" && navigator.product === "ReactNative";
}
function zh() {
    const n = ee();
    return n.indexOf("MSIE ") >= 0 || n.indexOf("Trident/") >= 0;
}
function Hh() {
    return (
        !qh() &&
        !!navigator.userAgent &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
}
function Gh() {
    try {
        return typeof indexedDB == "object";
    } catch {
        return !1;
    }
}
function Wh() {
    return new Promise((n, e) => {
        try {
            let t = !0;
            const r = "validate-browser-context-for-indexeddb-analytics-module",
                i = self.indexedDB.open(r);
            (i.onsuccess = () => {
                i.result.close(), t || self.indexedDB.deleteDatabase(r), n(!0);
            }),
                (i.onupgradeneeded = () => {
                    t = !1;
                }),
                (i.onerror = () => {
                    var s;
                    e(((s = i.error) === null || s === void 0 ? void 0 : s.message) || "");
                });
        } catch (t) {
            e(t);
        }
    });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Kh = "FirebaseError";
class Be extends Error {
    constructor(e, t, r) {
        super(t),
            (this.code = e),
            (this.customData = r),
            (this.name = Kh),
            Object.setPrototypeOf(this, Be.prototype),
            Error.captureStackTrace && Error.captureStackTrace(this, Ln.prototype.create);
    }
}
class Ln {
    constructor(e, t, r) {
        (this.service = e), (this.serviceName = t), (this.errors = r);
    }
    create(e, ...t) {
        const r = t[0] || {},
            i = `${this.service}/${e}`,
            s = this.errors[e],
            o = s ? Qh(s, r) : "Error",
            a = `${this.serviceName}: ${o} (${i}).`;
        return new Be(i, a, r);
    }
}
function Qh(n, e) {
    return n.replace(Jh, (t, r) => {
        const i = e[r];
        return i != null ? String(i) : `<${r}?>`;
    });
}
const Jh = /\{\$([^}]+)}/g;
function Yh(n) {
    for (const e in n) if (Object.prototype.hasOwnProperty.call(n, e)) return !1;
    return !0;
}
function Tr(n, e) {
    if (n === e) return !0;
    const t = Object.keys(n),
        r = Object.keys(e);
    for (const i of t) {
        if (!r.includes(i)) return !1;
        const s = n[i],
            o = e[i];
        if (Xo(s) && Xo(o)) {
            if (!Tr(s, o)) return !1;
        } else if (s !== o) return !1;
    }
    for (const i of r) if (!t.includes(i)) return !1;
    return !0;
}
function Xo(n) {
    return n !== null && typeof n == "object";
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function xn(n) {
    const e = [];
    for (const [t, r] of Object.entries(n))
        Array.isArray(r)
            ? r.forEach((i) => {
                  e.push(encodeURIComponent(t) + "=" + encodeURIComponent(i));
              })
            : e.push(encodeURIComponent(t) + "=" + encodeURIComponent(r));
    return e.length ? "&" + e.join("&") : "";
}
function on(n) {
    const e = {};
    return (
        n
            .replace(/^\?/, "")
            .split("&")
            .forEach((r) => {
                if (r) {
                    const [i, s] = r.split("=");
                    e[decodeURIComponent(i)] = decodeURIComponent(s);
                }
            }),
        e
    );
}
function an(n) {
    const e = n.indexOf("?");
    if (!e) return "";
    const t = n.indexOf("#", e);
    return n.substring(e, t > 0 ? t : void 0);
}
function Xh(n, e) {
    const t = new Zh(n, e);
    return t.subscribe.bind(t);
}
class Zh {
    constructor(e, t) {
        (this.observers = []),
            (this.unsubscribes = []),
            (this.observerCount = 0),
            (this.task = Promise.resolve()),
            (this.finalized = !1),
            (this.onNoObservers = t),
            this.task
                .then(() => {
                    e(this);
                })
                .catch((r) => {
                    this.error(r);
                });
    }
    next(e) {
        this.forEachObserver((t) => {
            t.next(e);
        });
    }
    error(e) {
        this.forEachObserver((t) => {
            t.error(e);
        }),
            this.close(e);
    }
    complete() {
        this.forEachObserver((e) => {
            e.complete();
        }),
            this.close();
    }
    subscribe(e, t, r) {
        let i;
        if (e === void 0 && t === void 0 && r === void 0) throw new Error("Missing Observer.");
        ed(e, ["next", "error", "complete"]) ? (i = e) : (i = { next: e, error: t, complete: r }),
            i.next === void 0 && (i.next = ki),
            i.error === void 0 && (i.error = ki),
            i.complete === void 0 && (i.complete = ki);
        const s = this.unsubscribeOne.bind(this, this.observers.length);
        return (
            this.finalized &&
                this.task.then(() => {
                    try {
                        this.finalError ? i.error(this.finalError) : i.complete();
                    } catch {}
                }),
            this.observers.push(i),
            s
        );
    }
    unsubscribeOne(e) {
        this.observers === void 0 ||
            this.observers[e] === void 0 ||
            (delete this.observers[e],
            (this.observerCount -= 1),
            this.observerCount === 0 && this.onNoObservers !== void 0 && this.onNoObservers(this));
    }
    forEachObserver(e) {
        if (!this.finalized) for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
    }
    sendOne(e, t) {
        this.task.then(() => {
            if (this.observers !== void 0 && this.observers[e] !== void 0)
                try {
                    t(this.observers[e]);
                } catch (r) {
                    typeof console < "u" && console.error && console.error(r);
                }
        });
    }
    close(e) {
        this.finalized ||
            ((this.finalized = !0),
            e !== void 0 && (this.finalError = e),
            this.task.then(() => {
                (this.observers = void 0), (this.onNoObservers = void 0);
            }));
    }
}
function ed(n, e) {
    if (typeof n != "object" || n === null) return !1;
    for (const t of e) if (t in n && typeof n[t] == "function") return !0;
    return !1;
}
function ki() {}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $(n) {
    return n && n._delegate ? n._delegate : n;
}
class mt {
    constructor(e, t, r) {
        (this.name = e),
            (this.instanceFactory = t),
            (this.type = r),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = "LAZY"),
            (this.onInstanceCreated = null);
    }
    setInstantiationMode(e) {
        return (this.instantiationMode = e), this;
    }
    setMultipleInstances(e) {
        return (this.multipleInstances = e), this;
    }
    setServiceProps(e) {
        return (this.serviceProps = e), this;
    }
    setInstanceCreatedCallback(e) {
        return (this.onInstanceCreated = e), this;
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ut = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class td {
    constructor(e, t) {
        (this.name = e),
            (this.container = t),
            (this.component = null),
            (this.instances = new Map()),
            (this.instancesDeferred = new Map()),
            (this.instancesOptions = new Map()),
            (this.onInitCallbacks = new Map());
    }
    get(e) {
        const t = this.normalizeInstanceIdentifier(e);
        if (!this.instancesDeferred.has(t)) {
            const r = new Fh();
            if ((this.instancesDeferred.set(t, r), this.isInitialized(t) || this.shouldAutoInitialize()))
                try {
                    const i = this.getOrInitializeService({ instanceIdentifier: t });
                    i && r.resolve(i);
                } catch {}
        }
        return this.instancesDeferred.get(t).promise;
    }
    getImmediate(e) {
        var t;
        const r = this.normalizeInstanceIdentifier(e == null ? void 0 : e.identifier),
            i = (t = e == null ? void 0 : e.optional) !== null && t !== void 0 ? t : !1;
        if (this.isInitialized(r) || this.shouldAutoInitialize())
            try {
                return this.getOrInitializeService({ instanceIdentifier: r });
            } catch (s) {
                if (i) return null;
                throw s;
            }
        else {
            if (i) return null;
            throw Error(`Service ${this.name} is not available`);
        }
    }
    getComponent() {
        return this.component;
    }
    setComponent(e) {
        if (e.name !== this.name) throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
        if (this.component) throw Error(`Component for ${this.name} has already been provided`);
        if (((this.component = e), !!this.shouldAutoInitialize())) {
            if (rd(e))
                try {
                    this.getOrInitializeService({ instanceIdentifier: ut });
                } catch {}
            for (const [t, r] of this.instancesDeferred.entries()) {
                const i = this.normalizeInstanceIdentifier(t);
                try {
                    const s = this.getOrInitializeService({ instanceIdentifier: i });
                    r.resolve(s);
                } catch {}
            }
        }
    }
    clearInstance(e = ut) {
        this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e);
    }
    async delete() {
        const e = Array.from(this.instances.values());
        await Promise.all([
            ...e.filter((t) => "INTERNAL" in t).map((t) => t.INTERNAL.delete()),
            ...e.filter((t) => "_delete" in t).map((t) => t._delete()),
        ]);
    }
    isComponentSet() {
        return this.component != null;
    }
    isInitialized(e = ut) {
        return this.instances.has(e);
    }
    getOptions(e = ut) {
        return this.instancesOptions.get(e) || {};
    }
    initialize(e = {}) {
        const { options: t = {} } = e,
            r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
        if (this.isInitialized(r)) throw Error(`${this.name}(${r}) has already been initialized`);
        if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
        const i = this.getOrInitializeService({ instanceIdentifier: r, options: t });
        for (const [s, o] of this.instancesDeferred.entries()) {
            const a = this.normalizeInstanceIdentifier(s);
            r === a && o.resolve(i);
        }
        return i;
    }
    onInit(e, t) {
        var r;
        const i = this.normalizeInstanceIdentifier(t),
            s = (r = this.onInitCallbacks.get(i)) !== null && r !== void 0 ? r : new Set();
        s.add(e), this.onInitCallbacks.set(i, s);
        const o = this.instances.get(i);
        return (
            o && e(o, i),
            () => {
                s.delete(e);
            }
        );
    }
    invokeOnInitCallbacks(e, t) {
        const r = this.onInitCallbacks.get(t);
        if (r)
            for (const i of r)
                try {
                    i(e, t);
                } catch {}
    }
    getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
        let r = this.instances.get(e);
        if (
            !r &&
            this.component &&
            ((r = this.component.instanceFactory(this.container, { instanceIdentifier: nd(e), options: t })),
            this.instances.set(e, r),
            this.instancesOptions.set(e, t),
            this.invokeOnInitCallbacks(r, e),
            this.component.onInstanceCreated)
        )
            try {
                this.component.onInstanceCreated(this.container, e, r);
            } catch {}
        return r || null;
    }
    normalizeInstanceIdentifier(e = ut) {
        return this.component ? (this.component.multipleInstances ? e : ut) : e;
    }
    shouldAutoInitialize() {
        return !!this.component && this.component.instantiationMode !== "EXPLICIT";
    }
}
function nd(n) {
    return n === ut ? void 0 : n;
}
function rd(n) {
    return n.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class id {
    constructor(e) {
        (this.name = e), (this.providers = new Map());
    }
    addComponent(e) {
        const t = this.getProvider(e.name);
        if (t.isComponentSet()) throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
        t.setComponent(e);
    }
    addOrOverwriteComponent(e) {
        this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
    }
    getProvider(e) {
        if (this.providers.has(e)) return this.providers.get(e);
        const t = new td(e, this);
        return this.providers.set(e, t), t;
    }
    getProviders() {
        return Array.from(this.providers.values());
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var b;
(function (n) {
    (n[(n.DEBUG = 0)] = "DEBUG"),
        (n[(n.VERBOSE = 1)] = "VERBOSE"),
        (n[(n.INFO = 2)] = "INFO"),
        (n[(n.WARN = 3)] = "WARN"),
        (n[(n.ERROR = 4)] = "ERROR"),
        (n[(n.SILENT = 5)] = "SILENT");
})(b || (b = {}));
const sd = { debug: b.DEBUG, verbose: b.VERBOSE, info: b.INFO, warn: b.WARN, error: b.ERROR, silent: b.SILENT },
    od = b.INFO,
    ad = { [b.DEBUG]: "log", [b.VERBOSE]: "log", [b.INFO]: "info", [b.WARN]: "warn", [b.ERROR]: "error" },
    cd = (n, e, ...t) => {
        if (e < n.logLevel) return;
        const r = new Date().toISOString(),
            i = ad[e];
        if (i) console[i](`[${r}]  ${n.name}:`, ...t);
        else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
    };
class ks {
    constructor(e) {
        (this.name = e), (this._logLevel = od), (this._logHandler = cd), (this._userLogHandler = null);
    }
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(e) {
        if (!(e in b)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
        this._logLevel = e;
    }
    setLogLevel(e) {
        this._logLevel = typeof e == "string" ? sd[e] : e;
    }
    get logHandler() {
        return this._logHandler;
    }
    set logHandler(e) {
        if (typeof e != "function") throw new TypeError("Value assigned to `logHandler` must be a function");
        this._logHandler = e;
    }
    get userLogHandler() {
        return this._userLogHandler;
    }
    set userLogHandler(e) {
        this._userLogHandler = e;
    }
    debug(...e) {
        this._userLogHandler && this._userLogHandler(this, b.DEBUG, ...e), this._logHandler(this, b.DEBUG, ...e);
    }
    log(...e) {
        this._userLogHandler && this._userLogHandler(this, b.VERBOSE, ...e), this._logHandler(this, b.VERBOSE, ...e);
    }
    info(...e) {
        this._userLogHandler && this._userLogHandler(this, b.INFO, ...e), this._logHandler(this, b.INFO, ...e);
    }
    warn(...e) {
        this._userLogHandler && this._userLogHandler(this, b.WARN, ...e), this._logHandler(this, b.WARN, ...e);
    }
    error(...e) {
        this._userLogHandler && this._userLogHandler(this, b.ERROR, ...e), this._logHandler(this, b.ERROR, ...e);
    }
}
const ud = (n, e) => e.some((t) => n instanceof t);
let Zo, ea;
function ld() {
    return Zo || (Zo = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function hd() {
    return (
        ea || (ea = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])
    );
}
const bc = new WeakMap(),
    Qi = new WeakMap(),
    kc = new WeakMap(),
    Di = new WeakMap(),
    Ds = new WeakMap();
function dd(n) {
    const e = new Promise((t, r) => {
        const i = () => {
                n.removeEventListener("success", s), n.removeEventListener("error", o);
            },
            s = () => {
                t(Ke(n.result)), i();
            },
            o = () => {
                r(n.error), i();
            };
        n.addEventListener("success", s), n.addEventListener("error", o);
    });
    return (
        e
            .then((t) => {
                t instanceof IDBCursor && bc.set(t, n);
            })
            .catch(() => {}),
        Ds.set(e, n),
        e
    );
}
function fd(n) {
    if (Qi.has(n)) return;
    const e = new Promise((t, r) => {
        const i = () => {
                n.removeEventListener("complete", s),
                    n.removeEventListener("error", o),
                    n.removeEventListener("abort", o);
            },
            s = () => {
                t(), i();
            },
            o = () => {
                r(n.error || new DOMException("AbortError", "AbortError")), i();
            };
        n.addEventListener("complete", s), n.addEventListener("error", o), n.addEventListener("abort", o);
    });
    Qi.set(n, e);
}
let Ji = {
    get(n, e, t) {
        if (n instanceof IDBTransaction) {
            if (e === "done") return Qi.get(n);
            if (e === "objectStoreNames") return n.objectStoreNames || kc.get(n);
            if (e === "store") return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
        }
        return Ke(n[e]);
    },
    set(n, e, t) {
        return (n[e] = t), !0;
    },
    has(n, e) {
        return n instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in n;
    },
};
function pd(n) {
    Ji = n(Ji);
}
function md(n) {
    return n === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)
        ? function (e, ...t) {
              const r = n.call(Vi(this), e, ...t);
              return kc.set(r, e.sort ? e.sort() : [e]), Ke(r);
          }
        : hd().includes(n)
          ? function (...e) {
                return n.apply(Vi(this), e), Ke(bc.get(this));
            }
          : function (...e) {
                return Ke(n.apply(Vi(this), e));
            };
}
function gd(n) {
    return typeof n == "function" ? md(n) : (n instanceof IDBTransaction && fd(n), ud(n, ld()) ? new Proxy(n, Ji) : n);
}
function Ke(n) {
    if (n instanceof IDBRequest) return dd(n);
    if (Di.has(n)) return Di.get(n);
    const e = gd(n);
    return e !== n && (Di.set(n, e), Ds.set(e, n)), e;
}
const Vi = (n) => Ds.get(n);
function _d(n, e, { blocked: t, upgrade: r, blocking: i, terminated: s } = {}) {
    const o = indexedDB.open(n, e),
        a = Ke(o);
    return (
        r &&
            o.addEventListener("upgradeneeded", (c) => {
                r(Ke(o.result), c.oldVersion, c.newVersion, Ke(o.transaction), c);
            }),
        t && o.addEventListener("blocked", (c) => t(c.oldVersion, c.newVersion, c)),
        a
            .then((c) => {
                s && c.addEventListener("close", () => s()),
                    i && c.addEventListener("versionchange", (u) => i(u.oldVersion, u.newVersion, u));
            })
            .catch(() => {}),
        a
    );
}
const yd = ["get", "getKey", "getAll", "getAllKeys", "count"],
    vd = ["put", "add", "delete", "clear"],
    Ni = new Map();
function ta(n, e) {
    if (!(n instanceof IDBDatabase && !(e in n) && typeof e == "string")) return;
    if (Ni.get(e)) return Ni.get(e);
    const t = e.replace(/FromIndex$/, ""),
        r = e !== t,
        i = vd.includes(t);
    if (!(t in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || yd.includes(t))) return;
    const s = async function (o, ...a) {
        const c = this.transaction(o, i ? "readwrite" : "readonly");
        let u = c.store;
        return r && (u = u.index(a.shift())), (await Promise.all([u[t](...a), i && c.done]))[0];
    };
    return Ni.set(e, s), s;
}
pd((n) => ({ ...n, get: (e, t, r) => ta(e, t) || n.get(e, t, r), has: (e, t) => !!ta(e, t) || n.has(e, t) }));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ed {
    constructor(e) {
        this.container = e;
    }
    getPlatformInfoString() {
        return this.container
            .getProviders()
            .map((t) => {
                if (Id(t)) {
                    const r = t.getImmediate();
                    return `${r.library}/${r.version}`;
                } else return null;
            })
            .filter((t) => t)
            .join(" ");
    }
}
function Id(n) {
    const e = n.getComponent();
    return (e == null ? void 0 : e.type) === "VERSION";
}
const Yi = "@firebase/app",
    na = "0.10.2";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const gt = new ks("@firebase/app"),
    Td = "@firebase/app-compat",
    wd = "@firebase/analytics-compat",
    Ad = "@firebase/analytics",
    Rd = "@firebase/app-check-compat",
    Pd = "@firebase/app-check",
    Sd = "@firebase/auth",
    Cd = "@firebase/auth-compat",
    bd = "@firebase/database",
    kd = "@firebase/database-compat",
    Dd = "@firebase/functions",
    Vd = "@firebase/functions-compat",
    Nd = "@firebase/installations",
    Od = "@firebase/installations-compat",
    Md = "@firebase/messaging",
    Ld = "@firebase/messaging-compat",
    xd = "@firebase/performance",
    Fd = "@firebase/performance-compat",
    Ud = "@firebase/remote-config",
    Bd = "@firebase/remote-config-compat",
    qd = "@firebase/storage",
    jd = "@firebase/storage-compat",
    $d = "@firebase/firestore",
    zd = "@firebase/firestore-compat",
    Hd = "firebase",
    Gd = "10.11.1";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Xi = "[DEFAULT]",
    Wd = {
        [Yi]: "fire-core",
        [Td]: "fire-core-compat",
        [Ad]: "fire-analytics",
        [wd]: "fire-analytics-compat",
        [Pd]: "fire-app-check",
        [Rd]: "fire-app-check-compat",
        [Sd]: "fire-auth",
        [Cd]: "fire-auth-compat",
        [bd]: "fire-rtdb",
        [kd]: "fire-rtdb-compat",
        [Dd]: "fire-fn",
        [Vd]: "fire-fn-compat",
        [Nd]: "fire-iid",
        [Od]: "fire-iid-compat",
        [Md]: "fire-fcm",
        [Ld]: "fire-fcm-compat",
        [xd]: "fire-perf",
        [Fd]: "fire-perf-compat",
        [Ud]: "fire-rc",
        [Bd]: "fire-rc-compat",
        [qd]: "fire-gcs",
        [jd]: "fire-gcs-compat",
        [$d]: "fire-fst",
        [zd]: "fire-fst-compat",
        "fire-js": "fire-js",
        [Hd]: "fire-js-all",
    };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wr = new Map(),
    Kd = new Map(),
    Zi = new Map();
function ra(n, e) {
    try {
        n.container.addComponent(e);
    } catch (t) {
        gt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`, t);
    }
}
function Ft(n) {
    const e = n.name;
    if (Zi.has(e)) return gt.debug(`There were multiple attempts to register component ${e}.`), !1;
    Zi.set(e, n);
    for (const t of wr.values()) ra(t, n);
    for (const t of Kd.values()) ra(t, n);
    return !0;
}
function Vs(n, e) {
    const t = n.container.getProvider("heartbeat").getImmediate({ optional: !0 });
    return t && t.triggerHeartbeat(), n.container.getProvider(e);
}
function _e(n) {
    return n.settings !== void 0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Qd = {
        "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
        "bad-app-name": "Illegal App name: '{$appName}'",
        "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
        "app-deleted": "Firebase App named '{$appName}' already deleted",
        "server-app-deleted": "Firebase Server App has been deleted",
        "no-options": "Need to provide options, when not being deployed to hosting via source.",
        "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
        "invalid-log-argument": "First argument to `onLog` must be null or a function.",
        "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
        "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
        "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
        "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
        "finalization-registry-not-supported":
            "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
        "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments.",
    },
    Qe = new Ln("app", "Firebase", Qd);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Jd {
    constructor(e, t, r) {
        (this._isDeleted = !1),
            (this._options = Object.assign({}, e)),
            (this._config = Object.assign({}, t)),
            (this._name = t.name),
            (this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled),
            (this._container = r),
            this.container.addComponent(new mt("app", () => this, "PUBLIC"));
    }
    get automaticDataCollectionEnabled() {
        return this.checkDestroyed(), this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
        this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
    }
    get name() {
        return this.checkDestroyed(), this._name;
    }
    get options() {
        return this.checkDestroyed(), this._options;
    }
    get config() {
        return this.checkDestroyed(), this._config;
    }
    get container() {
        return this._container;
    }
    get isDeleted() {
        return this._isDeleted;
    }
    set isDeleted(e) {
        this._isDeleted = e;
    }
    checkDestroyed() {
        if (this.isDeleted) throw Qe.create("app-deleted", { appName: this._name });
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Kt = Gd;
function Dc(n, e = {}) {
    let t = n;
    typeof e != "object" && (e = { name: e });
    const r = Object.assign({ name: Xi, automaticDataCollectionEnabled: !1 }, e),
        i = r.name;
    if (typeof i != "string" || !i) throw Qe.create("bad-app-name", { appName: String(i) });
    if ((t || (t = Sc()), !t)) throw Qe.create("no-options");
    const s = wr.get(i);
    if (s) {
        if (Tr(t, s.options) && Tr(r, s.config)) return s;
        throw Qe.create("duplicate-app", { appName: i });
    }
    const o = new id(i);
    for (const c of Zi.values()) o.addComponent(c);
    const a = new Jd(t, r, o);
    return wr.set(i, a), a;
}
function Vc(n = Xi) {
    const e = wr.get(n);
    if (!e && n === Xi && Sc()) return Dc();
    if (!e) throw Qe.create("no-app", { appName: n });
    return e;
}
function Je(n, e, t) {
    var r;
    let i = (r = Wd[n]) !== null && r !== void 0 ? r : n;
    t && (i += `-${t}`);
    const s = i.match(/\s|\//),
        o = e.match(/\s|\//);
    if (s || o) {
        const a = [`Unable to register library "${i}" with version "${e}":`];
        s && a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),
            s && o && a.push("and"),
            o && a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),
            gt.warn(a.join(" "));
        return;
    }
    Ft(new mt(`${i}-version`, () => ({ library: i, version: e }), "VERSION"));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Yd = "firebase-heartbeat-database",
    Xd = 1,
    yn = "firebase-heartbeat-store";
let Oi = null;
function Nc() {
    return (
        Oi ||
            (Oi = _d(Yd, Xd, {
                upgrade: (n, e) => {
                    switch (e) {
                        case 0:
                            try {
                                n.createObjectStore(yn);
                            } catch (t) {
                                console.warn(t);
                            }
                    }
                },
            }).catch((n) => {
                throw Qe.create("idb-open", { originalErrorMessage: n.message });
            })),
        Oi
    );
}
async function Zd(n) {
    try {
        const t = (await Nc()).transaction(yn),
            r = await t.objectStore(yn).get(Oc(n));
        return await t.done, r;
    } catch (e) {
        if (e instanceof Be) gt.warn(e.message);
        else {
            const t = Qe.create("idb-get", { originalErrorMessage: e == null ? void 0 : e.message });
            gt.warn(t.message);
        }
    }
}
async function ia(n, e) {
    try {
        const r = (await Nc()).transaction(yn, "readwrite");
        await r.objectStore(yn).put(e, Oc(n)), await r.done;
    } catch (t) {
        if (t instanceof Be) gt.warn(t.message);
        else {
            const r = Qe.create("idb-set", { originalErrorMessage: t == null ? void 0 : t.message });
            gt.warn(r.message);
        }
    }
}
function Oc(n) {
    return `${n.name}!${n.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ef = 1024,
    tf = 30 * 24 * 60 * 60 * 1e3;
class nf {
    constructor(e) {
        (this.container = e), (this._heartbeatsCache = null);
        const t = this.container.getProvider("app").getImmediate();
        (this._storage = new sf(t)),
            (this._heartbeatsCachePromise = this._storage.read().then((r) => ((this._heartbeatsCache = r), r)));
    }
    async triggerHeartbeat() {
        var e, t;
        const i = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),
            s = sa();
        if (
            !(
                ((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null &&
                ((this._heartbeatsCache = await this._heartbeatsCachePromise),
                ((t = this._heartbeatsCache) === null || t === void 0 ? void 0 : t.heartbeats) == null)
            ) &&
            !(
                this._heartbeatsCache.lastSentHeartbeatDate === s ||
                this._heartbeatsCache.heartbeats.some((o) => o.date === s)
            )
        )
            return (
                this._heartbeatsCache.heartbeats.push({ date: s, agent: i }),
                (this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((o) => {
                    const a = new Date(o.date).valueOf();
                    return Date.now() - a <= tf;
                })),
                this._storage.overwrite(this._heartbeatsCache)
            );
    }
    async getHeartbeatsHeader() {
        var e;
        if (
            (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
            ((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null ||
                this._heartbeatsCache.heartbeats.length === 0)
        )
            return "";
        const t = sa(),
            { heartbeatsToSend: r, unsentEntries: i } = rf(this._heartbeatsCache.heartbeats),
            s = Ir(JSON.stringify({ version: 2, heartbeats: r }));
        return (
            (this._heartbeatsCache.lastSentHeartbeatDate = t),
            i.length > 0
                ? ((this._heartbeatsCache.heartbeats = i), await this._storage.overwrite(this._heartbeatsCache))
                : ((this._heartbeatsCache.heartbeats = []), this._storage.overwrite(this._heartbeatsCache)),
            s
        );
    }
}
function sa() {
    return new Date().toISOString().substring(0, 10);
}
function rf(n, e = ef) {
    const t = [];
    let r = n.slice();
    for (const i of n) {
        const s = t.find((o) => o.agent === i.agent);
        if (s) {
            if ((s.dates.push(i.date), oa(t) > e)) {
                s.dates.pop();
                break;
            }
        } else if ((t.push({ agent: i.agent, dates: [i.date] }), oa(t) > e)) {
            t.pop();
            break;
        }
        r = r.slice(1);
    }
    return { heartbeatsToSend: t, unsentEntries: r };
}
class sf {
    constructor(e) {
        (this.app = e), (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
    }
    async runIndexedDBEnvironmentCheck() {
        return Gh()
            ? Wh()
                  .then(() => !0)
                  .catch(() => !1)
            : !1;
    }
    async read() {
        if (await this._canUseIndexedDBPromise) {
            const t = await Zd(this.app);
            return t != null && t.heartbeats ? t : { heartbeats: [] };
        } else return { heartbeats: [] };
    }
    async overwrite(e) {
        var t;
        if (await this._canUseIndexedDBPromise) {
            const i = await this.read();
            return ia(this.app, {
                lastSentHeartbeatDate:
                    (t = e.lastSentHeartbeatDate) !== null && t !== void 0 ? t : i.lastSentHeartbeatDate,
                heartbeats: e.heartbeats,
            });
        } else return;
    }
    async add(e) {
        var t;
        if (await this._canUseIndexedDBPromise) {
            const i = await this.read();
            return ia(this.app, {
                lastSentHeartbeatDate:
                    (t = e.lastSentHeartbeatDate) !== null && t !== void 0 ? t : i.lastSentHeartbeatDate,
                heartbeats: [...i.heartbeats, ...e.heartbeats],
            });
        } else return;
    }
}
function oa(n) {
    return Ir(JSON.stringify({ version: 2, heartbeats: n })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function of(n) {
    Ft(new mt("platform-logger", (e) => new Ed(e), "PRIVATE")),
        Ft(new mt("heartbeat", (e) => new nf(e), "PRIVATE")),
        Je(Yi, na, n),
        Je(Yi, na, "esm2017"),
        Je("fire-js", "");
}
of("");
function Ns(n, e) {
    var t = {};
    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
    if (n != null && typeof Object.getOwnPropertySymbols == "function")
        for (var i = 0, r = Object.getOwnPropertySymbols(n); i < r.length; i++)
            e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[i]) && (t[r[i]] = n[r[i]]);
    return t;
}
function Mc() {
    return {
        "dependent-sdk-initialized-before-auth":
            "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
    };
}
const af = Mc,
    Lc = new Ln("auth", "Firebase", Mc());
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ar = new ks("@firebase/auth");
function cf(n, ...e) {
    Ar.logLevel <= b.WARN && Ar.warn(`Auth (${Kt}): ${n}`, ...e);
}
function fr(n, ...e) {
    Ar.logLevel <= b.ERROR && Ar.error(`Auth (${Kt}): ${n}`, ...e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ge(n, ...e) {
    throw Ms(n, ...e);
}
function ye(n, ...e) {
    return Ms(n, ...e);
}
function Os(n, e, t) {
    const r = Object.assign(Object.assign({}, af()), { [e]: t });
    return new Ln("auth", "Firebase", r).create(e, { appName: n.name });
}
function Ne(n) {
    return Os(
        n,
        "operation-not-supported-in-this-environment",
        "Operations that alter the current user are not supported in conjunction with FirebaseServerApp",
    );
}
function uf(n, e, t) {
    const r = t;
    if (!(e instanceof r))
        throw (
            (r.name !== e.constructor.name && ge(n, "argument-error"),
            Os(
                n,
                "argument-error",
                `Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`,
            ))
        );
}
function Ms(n, ...e) {
    if (typeof n != "string") {
        const t = e[0],
            r = [...e.slice(1)];
        return r[0] && (r[0].appName = n.name), n._errorFactory.create(t, ...r);
    }
    return Lc.create(n, ...e);
}
function w(n, e, ...t) {
    if (!n) throw Ms(e, ...t);
}
function be(n) {
    const e = "INTERNAL ASSERTION FAILED: " + n;
    throw (fr(e), new Error(e));
}
function Me(n, e) {
    n || be(e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function es() {
    var n;
    return (typeof self < "u" && ((n = self.location) === null || n === void 0 ? void 0 : n.href)) || "";
}
function lf() {
    return aa() === "http:" || aa() === "https:";
}
function aa() {
    var n;
    return (typeof self < "u" && ((n = self.location) === null || n === void 0 ? void 0 : n.protocol)) || null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function hf() {
    return typeof navigator < "u" &&
        navigator &&
        "onLine" in navigator &&
        typeof navigator.onLine == "boolean" &&
        (lf() || jh() || "connection" in navigator)
        ? navigator.onLine
        : !0;
}
function df() {
    if (typeof navigator > "u") return null;
    const n = navigator;
    return (n.languages && n.languages[0]) || n.language || null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fn {
    constructor(e, t) {
        (this.shortDelay = e),
            (this.longDelay = t),
            Me(t > e, "Short delay should be less than long delay!"),
            (this.isMobile = Bh() || $h());
    }
    get() {
        return hf() ? (this.isMobile ? this.longDelay : this.shortDelay) : Math.min(5e3, this.shortDelay);
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ls(n, e) {
    Me(n.emulator, "Emulator should always be set here");
    const { url: t } = n.emulator;
    return e ? `${t}${e.startsWith("/") ? e.slice(1) : e}` : t;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class xc {
    static initialize(e, t, r) {
        (this.fetchImpl = e), t && (this.headersImpl = t), r && (this.responseImpl = r);
    }
    static fetch() {
        if (this.fetchImpl) return this.fetchImpl;
        if (typeof self < "u" && "fetch" in self) return self.fetch;
        if (typeof globalThis < "u" && globalThis.fetch) return globalThis.fetch;
        if (typeof fetch < "u") return fetch;
        be(
            "Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
        );
    }
    static headers() {
        if (this.headersImpl) return this.headersImpl;
        if (typeof self < "u" && "Headers" in self) return self.Headers;
        if (typeof globalThis < "u" && globalThis.Headers) return globalThis.Headers;
        if (typeof Headers < "u") return Headers;
        be(
            "Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
        );
    }
    static response() {
        if (this.responseImpl) return this.responseImpl;
        if (typeof self < "u" && "Response" in self) return self.Response;
        if (typeof globalThis < "u" && globalThis.Response) return globalThis.Response;
        if (typeof Response < "u") return Response;
        be(
            "Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
        );
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ff = {
    CREDENTIAL_MISMATCH: "custom-token-mismatch",
    MISSING_CUSTOM_TOKEN: "internal-error",
    INVALID_IDENTIFIER: "invalid-email",
    MISSING_CONTINUE_URI: "internal-error",
    INVALID_PASSWORD: "wrong-password",
    MISSING_PASSWORD: "missing-password",
    INVALID_LOGIN_CREDENTIALS: "invalid-credential",
    EMAIL_EXISTS: "email-already-in-use",
    PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
    INVALID_IDP_RESPONSE: "invalid-credential",
    INVALID_PENDING_TOKEN: "invalid-credential",
    FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
    MISSING_REQ_TYPE: "internal-error",
    EMAIL_NOT_FOUND: "user-not-found",
    RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
    EXPIRED_OOB_CODE: "expired-action-code",
    INVALID_OOB_CODE: "invalid-action-code",
    MISSING_OOB_CODE: "internal-error",
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
    INVALID_ID_TOKEN: "invalid-user-token",
    TOKEN_EXPIRED: "user-token-expired",
    USER_NOT_FOUND: "user-token-expired",
    TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
    PASSWORD_DOES_NOT_MEET_REQUIREMENTS: "password-does-not-meet-requirements",
    INVALID_CODE: "invalid-verification-code",
    INVALID_SESSION_INFO: "invalid-verification-id",
    INVALID_TEMPORARY_PROOF: "invalid-credential",
    MISSING_SESSION_INFO: "missing-verification-id",
    SESSION_EXPIRED: "code-expired",
    MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
    UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
    INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
    ADMIN_ONLY_OPERATION: "admin-restricted-operation",
    INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
    MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
    MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
    MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
    SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
    SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
    BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
    RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
    MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
    INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
    INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
    MISSING_CLIENT_TYPE: "missing-client-type",
    MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
    INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
    INVALID_REQ_TYPE: "invalid-req-type",
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const pf = new Fn(3e4, 6e4);
function tt(n, e) {
    return n.tenantId && !e.tenantId ? Object.assign(Object.assign({}, e), { tenantId: n.tenantId }) : e;
}
async function nt(n, e, t, r, i = {}) {
    return Fc(n, i, async () => {
        let s = {},
            o = {};
        r && (e === "GET" ? (o = r) : (s = { body: JSON.stringify(r) }));
        const a = xn(Object.assign({ key: n.config.apiKey }, o)).slice(1),
            c = await n._getAdditionalHeaders();
        return (
            (c["Content-Type"] = "application/json"),
            n.languageCode && (c["X-Firebase-Locale"] = n.languageCode),
            xc.fetch()(
                Uc(n, n.config.apiHost, t, a),
                Object.assign({ method: e, headers: c, referrerPolicy: "no-referrer" }, s),
            )
        );
    });
}
async function Fc(n, e, t) {
    n._canInitEmulator = !1;
    const r = Object.assign(Object.assign({}, ff), e);
    try {
        const i = new gf(n),
            s = await Promise.race([t(), i.promise]);
        i.clearNetworkTimeout();
        const o = await s.json();
        if ("needConfirmation" in o) throw ir(n, "account-exists-with-different-credential", o);
        if (s.ok && !("errorMessage" in o)) return o;
        {
            const a = s.ok ? o.errorMessage : o.error.message,
                [c, u] = a.split(" : ");
            if (c === "FEDERATED_USER_ID_ALREADY_LINKED") throw ir(n, "credential-already-in-use", o);
            if (c === "EMAIL_EXISTS") throw ir(n, "email-already-in-use", o);
            if (c === "USER_DISABLED") throw ir(n, "user-disabled", o);
            const l = r[c] || c.toLowerCase().replace(/[_\s]+/g, "-");
            if (u) throw Os(n, l, u);
            ge(n, l);
        }
    } catch (i) {
        if (i instanceof Be) throw i;
        ge(n, "network-request-failed", { message: String(i) });
    }
}
async function Un(n, e, t, r, i = {}) {
    const s = await nt(n, e, t, r, i);
    return "mfaPendingCredential" in s && ge(n, "multi-factor-auth-required", { _serverResponse: s }), s;
}
function Uc(n, e, t, r) {
    const i = `${e}${t}?${r}`;
    return n.config.emulator ? Ls(n.config, i) : `${n.config.apiScheme}://${i}`;
}
function mf(n) {
    switch (n) {
        case "ENFORCE":
            return "ENFORCE";
        case "AUDIT":
            return "AUDIT";
        case "OFF":
            return "OFF";
        default:
            return "ENFORCEMENT_STATE_UNSPECIFIED";
    }
}
class gf {
    constructor(e) {
        (this.auth = e),
            (this.timer = null),
            (this.promise = new Promise((t, r) => {
                this.timer = setTimeout(() => r(ye(this.auth, "network-request-failed")), pf.get());
            }));
    }
    clearNetworkTimeout() {
        clearTimeout(this.timer);
    }
}
function ir(n, e, t) {
    const r = { appName: n.name };
    t.email && (r.email = t.email), t.phoneNumber && (r.phoneNumber = t.phoneNumber);
    const i = ye(n, e, r);
    return (i.customData._tokenResponse = t), i;
}
function ca(n) {
    return n !== void 0 && n.enterprise !== void 0;
}
class _f {
    constructor(e) {
        if (((this.siteKey = ""), (this.recaptchaEnforcementState = []), e.recaptchaKey === void 0))
            throw new Error("recaptchaKey undefined");
        (this.siteKey = e.recaptchaKey.split("/")[3]), (this.recaptchaEnforcementState = e.recaptchaEnforcementState);
    }
    getProviderEnforcementState(e) {
        if (!this.recaptchaEnforcementState || this.recaptchaEnforcementState.length === 0) return null;
        for (const t of this.recaptchaEnforcementState)
            if (t.provider && t.provider === e) return mf(t.enforcementState);
        return null;
    }
    isProviderEnabled(e) {
        return this.getProviderEnforcementState(e) === "ENFORCE" || this.getProviderEnforcementState(e) === "AUDIT";
    }
}
async function yf(n, e) {
    return nt(n, "GET", "/v2/recaptchaConfig", tt(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function vf(n, e) {
    return nt(n, "POST", "/v1/accounts:delete", e);
}
async function Bc(n, e) {
    return nt(n, "POST", "/v1/accounts:lookup", e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function fn(n) {
    if (n)
        try {
            const e = new Date(Number(n));
            if (!isNaN(e.getTime())) return e.toUTCString();
        } catch {}
}
async function Ef(n, e = !1) {
    const t = $(n),
        r = await t.getIdToken(e),
        i = xs(r);
    w(i && i.exp && i.auth_time && i.iat, t.auth, "internal-error");
    const s = typeof i.firebase == "object" ? i.firebase : void 0,
        o = s == null ? void 0 : s.sign_in_provider;
    return {
        claims: i,
        token: r,
        authTime: fn(Mi(i.auth_time)),
        issuedAtTime: fn(Mi(i.iat)),
        expirationTime: fn(Mi(i.exp)),
        signInProvider: o || null,
        signInSecondFactor: (s == null ? void 0 : s.sign_in_second_factor) || null,
    };
}
function Mi(n) {
    return Number(n) * 1e3;
}
function xs(n) {
    const [e, t, r] = n.split(".");
    if (e === void 0 || t === void 0 || r === void 0) return fr("JWT malformed, contained fewer than 3 sections"), null;
    try {
        const i = Rc(t);
        return i ? JSON.parse(i) : (fr("Failed to decode base64 JWT payload"), null);
    } catch (i) {
        return fr("Caught error parsing JWT payload as JSON", i == null ? void 0 : i.toString()), null;
    }
}
function ua(n) {
    const e = xs(n);
    return (
        w(e, "internal-error"),
        w(typeof e.exp < "u", "internal-error"),
        w(typeof e.iat < "u", "internal-error"),
        Number(e.exp) - Number(e.iat)
    );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function vn(n, e, t = !1) {
    if (t) return e;
    try {
        return await e;
    } catch (r) {
        throw (r instanceof Be && If(r) && n.auth.currentUser === n && (await n.auth.signOut()), r);
    }
}
function If({ code: n }) {
    return n === "auth/user-disabled" || n === "auth/user-token-expired";
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Tf {
    constructor(e) {
        (this.user = e), (this.isRunning = !1), (this.timerId = null), (this.errorBackoff = 3e4);
    }
    _start() {
        this.isRunning || ((this.isRunning = !0), this.schedule());
    }
    _stop() {
        this.isRunning && ((this.isRunning = !1), this.timerId !== null && clearTimeout(this.timerId));
    }
    getInterval(e) {
        var t;
        if (e) {
            const r = this.errorBackoff;
            return (this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4)), r;
        } else {
            this.errorBackoff = 3e4;
            const i =
                ((t = this.user.stsTokenManager.expirationTime) !== null && t !== void 0 ? t : 0) - Date.now() - 3e5;
            return Math.max(0, i);
        }
    }
    schedule(e = !1) {
        if (!this.isRunning) return;
        const t = this.getInterval(e);
        this.timerId = setTimeout(async () => {
            await this.iteration();
        }, t);
    }
    async iteration() {
        try {
            await this.user.getIdToken(!0);
        } catch (e) {
            (e == null ? void 0 : e.code) === "auth/network-request-failed" && this.schedule(!0);
            return;
        }
        this.schedule();
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ts {
    constructor(e, t) {
        (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
    }
    _initializeTime() {
        (this.lastSignInTime = fn(this.lastLoginAt)), (this.creationTime = fn(this.createdAt));
    }
    _copy(e) {
        (this.createdAt = e.createdAt), (this.lastLoginAt = e.lastLoginAt), this._initializeTime();
    }
    toJSON() {
        return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Rr(n) {
    var e;
    const t = n.auth,
        r = await n.getIdToken(),
        i = await vn(n, Bc(t, { idToken: r }));
    w(i == null ? void 0 : i.users.length, t, "internal-error");
    const s = i.users[0];
    n._notifyReloadListener(s);
    const o = !((e = s.providerUserInfo) === null || e === void 0) && e.length ? qc(s.providerUserInfo) : [],
        a = Af(n.providerData, o),
        c = n.isAnonymous,
        u = !(n.email && s.passwordHash) && !(a != null && a.length),
        l = c ? u : !1,
        h = {
            uid: s.localId,
            displayName: s.displayName || null,
            photoURL: s.photoUrl || null,
            email: s.email || null,
            emailVerified: s.emailVerified || !1,
            phoneNumber: s.phoneNumber || null,
            tenantId: s.tenantId || null,
            providerData: a,
            metadata: new ts(s.createdAt, s.lastLoginAt),
            isAnonymous: l,
        };
    Object.assign(n, h);
}
async function wf(n) {
    const e = $(n);
    await Rr(e), await e.auth._persistUserIfCurrent(e), e.auth._notifyListenersIfCurrent(e);
}
function Af(n, e) {
    return [...n.filter((r) => !e.some((i) => i.providerId === r.providerId)), ...e];
}
function qc(n) {
    return n.map((e) => {
        var { providerId: t } = e,
            r = Ns(e, ["providerId"]);
        return {
            providerId: t,
            uid: r.rawId || "",
            displayName: r.displayName || null,
            email: r.email || null,
            phoneNumber: r.phoneNumber || null,
            photoURL: r.photoUrl || null,
        };
    });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Rf(n, e) {
    const t = await Fc(n, {}, async () => {
        const r = xn({ grant_type: "refresh_token", refresh_token: e }).slice(1),
            { tokenApiHost: i, apiKey: s } = n.config,
            o = Uc(n, i, "/v1/token", `key=${s}`),
            a = await n._getAdditionalHeaders();
        return (
            (a["Content-Type"] = "application/x-www-form-urlencoded"),
            xc.fetch()(o, { method: "POST", headers: a, body: r })
        );
    });
    return { accessToken: t.access_token, expiresIn: t.expires_in, refreshToken: t.refresh_token };
}
async function Pf(n, e) {
    return nt(n, "POST", "/v2/accounts:revokeToken", tt(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Dt {
    constructor() {
        (this.refreshToken = null), (this.accessToken = null), (this.expirationTime = null);
    }
    get isExpired() {
        return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
    }
    updateFromServerResponse(e) {
        w(e.idToken, "internal-error"),
            w(typeof e.idToken < "u", "internal-error"),
            w(typeof e.refreshToken < "u", "internal-error");
        const t = "expiresIn" in e && typeof e.expiresIn < "u" ? Number(e.expiresIn) : ua(e.idToken);
        this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
    }
    updateFromIdToken(e) {
        w(e.length !== 0, "internal-error");
        const t = ua(e);
        this.updateTokensAndExpiration(e, null, t);
    }
    async getToken(e, t = !1) {
        return !t && this.accessToken && !this.isExpired
            ? this.accessToken
            : (w(this.refreshToken, e, "user-token-expired"),
              this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null);
    }
    clearRefreshToken() {
        this.refreshToken = null;
    }
    async refresh(e, t) {
        const { accessToken: r, refreshToken: i, expiresIn: s } = await Rf(e, t);
        this.updateTokensAndExpiration(r, i, Number(s));
    }
    updateTokensAndExpiration(e, t, r) {
        (this.refreshToken = t || null), (this.accessToken = e || null), (this.expirationTime = Date.now() + r * 1e3);
    }
    static fromJSON(e, t) {
        const { refreshToken: r, accessToken: i, expirationTime: s } = t,
            o = new Dt();
        return (
            r && (w(typeof r == "string", "internal-error", { appName: e }), (o.refreshToken = r)),
            i && (w(typeof i == "string", "internal-error", { appName: e }), (o.accessToken = i)),
            s && (w(typeof s == "number", "internal-error", { appName: e }), (o.expirationTime = s)),
            o
        );
    }
    toJSON() {
        return { refreshToken: this.refreshToken, accessToken: this.accessToken, expirationTime: this.expirationTime };
    }
    _assign(e) {
        (this.accessToken = e.accessToken),
            (this.refreshToken = e.refreshToken),
            (this.expirationTime = e.expirationTime);
    }
    _clone() {
        return Object.assign(new Dt(), this.toJSON());
    }
    _performRefresh() {
        return be("not implemented");
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function je(n, e) {
    w(typeof n == "string" || typeof n > "u", "internal-error", { appName: e });
}
class ke {
    constructor(e) {
        var { uid: t, auth: r, stsTokenManager: i } = e,
            s = Ns(e, ["uid", "auth", "stsTokenManager"]);
        (this.providerId = "firebase"),
            (this.proactiveRefresh = new Tf(this)),
            (this.reloadUserInfo = null),
            (this.reloadListener = null),
            (this.uid = t),
            (this.auth = r),
            (this.stsTokenManager = i),
            (this.accessToken = i.accessToken),
            (this.displayName = s.displayName || null),
            (this.email = s.email || null),
            (this.emailVerified = s.emailVerified || !1),
            (this.phoneNumber = s.phoneNumber || null),
            (this.photoURL = s.photoURL || null),
            (this.isAnonymous = s.isAnonymous || !1),
            (this.tenantId = s.tenantId || null),
            (this.providerData = s.providerData ? [...s.providerData] : []),
            (this.metadata = new ts(s.createdAt || void 0, s.lastLoginAt || void 0));
    }
    async getIdToken(e) {
        const t = await vn(this, this.stsTokenManager.getToken(this.auth, e));
        return (
            w(t, this.auth, "internal-error"),
            this.accessToken !== t &&
                ((this.accessToken = t),
                await this.auth._persistUserIfCurrent(this),
                this.auth._notifyListenersIfCurrent(this)),
            t
        );
    }
    getIdTokenResult(e) {
        return Ef(this, e);
    }
    reload() {
        return wf(this);
    }
    _assign(e) {
        this !== e &&
            (w(this.uid === e.uid, this.auth, "internal-error"),
            (this.displayName = e.displayName),
            (this.photoURL = e.photoURL),
            (this.email = e.email),
            (this.emailVerified = e.emailVerified),
            (this.phoneNumber = e.phoneNumber),
            (this.isAnonymous = e.isAnonymous),
            (this.tenantId = e.tenantId),
            (this.providerData = e.providerData.map((t) => Object.assign({}, t))),
            this.metadata._copy(e.metadata),
            this.stsTokenManager._assign(e.stsTokenManager));
    }
    _clone(e) {
        const t = new ke(
            Object.assign(Object.assign({}, this), { auth: e, stsTokenManager: this.stsTokenManager._clone() }),
        );
        return t.metadata._copy(this.metadata), t;
    }
    _onReload(e) {
        w(!this.reloadListener, this.auth, "internal-error"),
            (this.reloadListener = e),
            this.reloadUserInfo && (this._notifyReloadListener(this.reloadUserInfo), (this.reloadUserInfo = null));
    }
    _notifyReloadListener(e) {
        this.reloadListener ? this.reloadListener(e) : (this.reloadUserInfo = e);
    }
    _startProactiveRefresh() {
        this.proactiveRefresh._start();
    }
    _stopProactiveRefresh() {
        this.proactiveRefresh._stop();
    }
    async _updateTokensIfNecessary(e, t = !1) {
        let r = !1;
        e.idToken &&
            e.idToken !== this.stsTokenManager.accessToken &&
            (this.stsTokenManager.updateFromServerResponse(e), (r = !0)),
            t && (await Rr(this)),
            await this.auth._persistUserIfCurrent(this),
            r && this.auth._notifyListenersIfCurrent(this);
    }
    async delete() {
        if (_e(this.auth.app)) return Promise.reject(Ne(this.auth));
        const e = await this.getIdToken();
        return (
            await vn(this, vf(this.auth, { idToken: e })), this.stsTokenManager.clearRefreshToken(), this.auth.signOut()
        );
    }
    toJSON() {
        return Object.assign(
            Object.assign(
                {
                    uid: this.uid,
                    email: this.email || void 0,
                    emailVerified: this.emailVerified,
                    displayName: this.displayName || void 0,
                    isAnonymous: this.isAnonymous,
                    photoURL: this.photoURL || void 0,
                    phoneNumber: this.phoneNumber || void 0,
                    tenantId: this.tenantId || void 0,
                    providerData: this.providerData.map((e) => Object.assign({}, e)),
                    stsTokenManager: this.stsTokenManager.toJSON(),
                    _redirectEventId: this._redirectEventId,
                },
                this.metadata.toJSON(),
            ),
            { apiKey: this.auth.config.apiKey, appName: this.auth.name },
        );
    }
    get refreshToken() {
        return this.stsTokenManager.refreshToken || "";
    }
    static _fromJSON(e, t) {
        var r, i, s, o, a, c, u, l;
        const h = (r = t.displayName) !== null && r !== void 0 ? r : void 0,
            d = (i = t.email) !== null && i !== void 0 ? i : void 0,
            p = (s = t.phoneNumber) !== null && s !== void 0 ? s : void 0,
            I = (o = t.photoURL) !== null && o !== void 0 ? o : void 0,
            T = (a = t.tenantId) !== null && a !== void 0 ? a : void 0,
            v = (c = t._redirectEventId) !== null && c !== void 0 ? c : void 0,
            V = (u = t.createdAt) !== null && u !== void 0 ? u : void 0,
            U = (l = t.lastLoginAt) !== null && l !== void 0 ? l : void 0,
            { uid: K, emailVerified: fe, isAnonymous: at, providerData: Ie, stsTokenManager: ct } = t;
        w(K && ct, e, "internal-error");
        const Jo = Dt.fromJSON(this.name, ct);
        w(typeof K == "string", e, "internal-error"),
            je(h, e.name),
            je(d, e.name),
            w(typeof fe == "boolean", e, "internal-error"),
            w(typeof at == "boolean", e, "internal-error"),
            je(p, e.name),
            je(I, e.name),
            je(T, e.name),
            je(v, e.name),
            je(V, e.name),
            je(U, e.name);
        const tn = new ke({
            uid: K,
            auth: e,
            email: d,
            emailVerified: fe,
            displayName: h,
            isAnonymous: at,
            photoURL: I,
            phoneNumber: p,
            tenantId: T,
            stsTokenManager: Jo,
            createdAt: V,
            lastLoginAt: U,
        });
        return (
            Ie && Array.isArray(Ie) && (tn.providerData = Ie.map((rr) => Object.assign({}, rr))),
            v && (tn._redirectEventId = v),
            tn
        );
    }
    static async _fromIdTokenResponse(e, t, r = !1) {
        const i = new Dt();
        i.updateFromServerResponse(t);
        const s = new ke({ uid: t.localId, auth: e, stsTokenManager: i, isAnonymous: r });
        return await Rr(s), s;
    }
    static async _fromGetAccountInfoResponse(e, t, r) {
        const i = t.users[0];
        w(i.localId !== void 0, "internal-error");
        const s = i.providerUserInfo !== void 0 ? qc(i.providerUserInfo) : [],
            o = !(i.email && i.passwordHash) && !(s != null && s.length),
            a = new Dt();
        a.updateFromIdToken(r);
        const c = new ke({ uid: i.localId, auth: e, stsTokenManager: a, isAnonymous: o }),
            u = {
                uid: i.localId,
                displayName: i.displayName || null,
                photoURL: i.photoUrl || null,
                email: i.email || null,
                emailVerified: i.emailVerified || !1,
                phoneNumber: i.phoneNumber || null,
                tenantId: i.tenantId || null,
                providerData: s,
                metadata: new ts(i.createdAt, i.lastLoginAt),
                isAnonymous: !(i.email && i.passwordHash) && !(s != null && s.length),
            };
        return Object.assign(c, u), c;
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const la = new Map();
function De(n) {
    Me(n instanceof Function, "Expected a class definition");
    let e = la.get(n);
    return e
        ? (Me(e instanceof n, "Instance stored in cache mismatched with class"), e)
        : ((e = new n()), la.set(n, e), e);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class jc {
    constructor() {
        (this.type = "NONE"), (this.storage = {});
    }
    async _isAvailable() {
        return !0;
    }
    async _set(e, t) {
        this.storage[e] = t;
    }
    async _get(e) {
        const t = this.storage[e];
        return t === void 0 ? null : t;
    }
    async _remove(e) {
        delete this.storage[e];
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
}
jc.type = "NONE";
const ha = jc;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function pr(n, e, t) {
    return `firebase:${n}:${e}:${t}`;
}
class Vt {
    constructor(e, t, r) {
        (this.persistence = e), (this.auth = t), (this.userKey = r);
        const { config: i, name: s } = this.auth;
        (this.fullUserKey = pr(this.userKey, i.apiKey, s)),
            (this.fullPersistenceKey = pr("persistence", i.apiKey, s)),
            (this.boundEventHandler = t._onStorageEvent.bind(t)),
            this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
    }
    setCurrentUser(e) {
        return this.persistence._set(this.fullUserKey, e.toJSON());
    }
    async getCurrentUser() {
        const e = await this.persistence._get(this.fullUserKey);
        return e ? ke._fromJSON(this.auth, e) : null;
    }
    removeCurrentUser() {
        return this.persistence._remove(this.fullUserKey);
    }
    savePersistenceForRedirect() {
        return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
    }
    async setPersistence(e) {
        if (this.persistence === e) return;
        const t = await this.getCurrentUser();
        if ((await this.removeCurrentUser(), (this.persistence = e), t)) return this.setCurrentUser(t);
    }
    delete() {
        this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
    }
    static async create(e, t, r = "authUser") {
        if (!t.length) return new Vt(De(ha), e, r);
        const i = (
            await Promise.all(
                t.map(async (u) => {
                    if (await u._isAvailable()) return u;
                }),
            )
        ).filter((u) => u);
        let s = i[0] || De(ha);
        const o = pr(r, e.config.apiKey, e.name);
        let a = null;
        for (const u of t)
            try {
                const l = await u._get(o);
                if (l) {
                    const h = ke._fromJSON(e, l);
                    u !== s && (a = h), (s = u);
                    break;
                }
            } catch {}
        const c = i.filter((u) => u._shouldAllowMigration);
        return !s._shouldAllowMigration || !c.length
            ? new Vt(s, e, r)
            : ((s = c[0]),
              a && (await s._set(o, a.toJSON())),
              await Promise.all(
                  t.map(async (u) => {
                      if (u !== s)
                          try {
                              await u._remove(o);
                          } catch {}
                  }),
              ),
              new Vt(s, e, r));
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function da(n) {
    const e = n.toLowerCase();
    if (e.includes("opera/") || e.includes("opr/") || e.includes("opios/")) return "Opera";
    if (Hc(e)) return "IEMobile";
    if (e.includes("msie") || e.includes("trident/")) return "IE";
    if (e.includes("edge/")) return "Edge";
    if ($c(e)) return "Firefox";
    if (e.includes("silk/")) return "Silk";
    if (Wc(e)) return "Blackberry";
    if (Kc(e)) return "Webos";
    if (Fs(e)) return "Safari";
    if ((e.includes("chrome/") || zc(e)) && !e.includes("edge/")) return "Chrome";
    if (Gc(e)) return "Android";
    {
        const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
            r = n.match(t);
        if ((r == null ? void 0 : r.length) === 2) return r[1];
    }
    return "Other";
}
function $c(n = ee()) {
    return /firefox\//i.test(n);
}
function Fs(n = ee()) {
    const e = n.toLowerCase();
    return e.includes("safari/") && !e.includes("chrome/") && !e.includes("crios/") && !e.includes("android");
}
function zc(n = ee()) {
    return /crios\//i.test(n);
}
function Hc(n = ee()) {
    return /iemobile/i.test(n);
}
function Gc(n = ee()) {
    return /android/i.test(n);
}
function Wc(n = ee()) {
    return /blackberry/i.test(n);
}
function Kc(n = ee()) {
    return /webos/i.test(n);
}
function zr(n = ee()) {
    return /iphone|ipad|ipod/i.test(n) || (/macintosh/i.test(n) && /mobile/i.test(n));
}
function Sf(n = ee()) {
    var e;
    return zr(n) && !!(!((e = window.navigator) === null || e === void 0) && e.standalone);
}
function Cf() {
    return zh() && document.documentMode === 10;
}
function Qc(n = ee()) {
    return zr(n) || Gc(n) || Kc(n) || Wc(n) || /windows phone/i.test(n) || Hc(n);
}
function bf() {
    try {
        return !!(window && window !== window.top);
    } catch {
        return !1;
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Jc(n, e = []) {
    let t;
    switch (n) {
        case "Browser":
            t = da(ee());
            break;
        case "Worker":
            t = `${da(ee())}-${n}`;
            break;
        default:
            t = n;
    }
    const r = e.length ? e.join(",") : "FirebaseCore-web";
    return `${t}/JsCore/${Kt}/${r}`;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class kf {
    constructor(e) {
        (this.auth = e), (this.queue = []);
    }
    pushCallback(e, t) {
        const r = (s) =>
            new Promise((o, a) => {
                try {
                    const c = e(s);
                    o(c);
                } catch (c) {
                    a(c);
                }
            });
        (r.onAbort = t), this.queue.push(r);
        const i = this.queue.length - 1;
        return () => {
            this.queue[i] = () => Promise.resolve();
        };
    }
    async runMiddleware(e) {
        if (this.auth.currentUser === e) return;
        const t = [];
        try {
            for (const r of this.queue) await r(e), r.onAbort && t.push(r.onAbort);
        } catch (r) {
            t.reverse();
            for (const i of t)
                try {
                    i();
                } catch {}
            throw this.auth._errorFactory.create("login-blocked", { originalMessage: r == null ? void 0 : r.message });
        }
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Df(n, e = {}) {
    return nt(n, "GET", "/v2/passwordPolicy", tt(n, e));
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Vf = 6;
class Nf {
    constructor(e) {
        var t, r, i, s;
        const o = e.customStrengthOptions;
        (this.customStrengthOptions = {}),
            (this.customStrengthOptions.minPasswordLength =
                (t = o.minPasswordLength) !== null && t !== void 0 ? t : Vf),
            o.maxPasswordLength && (this.customStrengthOptions.maxPasswordLength = o.maxPasswordLength),
            o.containsLowercaseCharacter !== void 0 &&
                (this.customStrengthOptions.containsLowercaseLetter = o.containsLowercaseCharacter),
            o.containsUppercaseCharacter !== void 0 &&
                (this.customStrengthOptions.containsUppercaseLetter = o.containsUppercaseCharacter),
            o.containsNumericCharacter !== void 0 &&
                (this.customStrengthOptions.containsNumericCharacter = o.containsNumericCharacter),
            o.containsNonAlphanumericCharacter !== void 0 &&
                (this.customStrengthOptions.containsNonAlphanumericCharacter = o.containsNonAlphanumericCharacter),
            (this.enforcementState = e.enforcementState),
            this.enforcementState === "ENFORCEMENT_STATE_UNSPECIFIED" && (this.enforcementState = "OFF"),
            (this.allowedNonAlphanumericCharacters =
                (i = (r = e.allowedNonAlphanumericCharacters) === null || r === void 0 ? void 0 : r.join("")) !==
                    null && i !== void 0
                    ? i
                    : ""),
            (this.forceUpgradeOnSignin = (s = e.forceUpgradeOnSignin) !== null && s !== void 0 ? s : !1),
            (this.schemaVersion = e.schemaVersion);
    }
    validatePassword(e) {
        var t, r, i, s, o, a;
        const c = { isValid: !0, passwordPolicy: this };
        return (
            this.validatePasswordLengthOptions(e, c),
            this.validatePasswordCharacterOptions(e, c),
            c.isValid && (c.isValid = (t = c.meetsMinPasswordLength) !== null && t !== void 0 ? t : !0),
            c.isValid && (c.isValid = (r = c.meetsMaxPasswordLength) !== null && r !== void 0 ? r : !0),
            c.isValid && (c.isValid = (i = c.containsLowercaseLetter) !== null && i !== void 0 ? i : !0),
            c.isValid && (c.isValid = (s = c.containsUppercaseLetter) !== null && s !== void 0 ? s : !0),
            c.isValid && (c.isValid = (o = c.containsNumericCharacter) !== null && o !== void 0 ? o : !0),
            c.isValid && (c.isValid = (a = c.containsNonAlphanumericCharacter) !== null && a !== void 0 ? a : !0),
            c
        );
    }
    validatePasswordLengthOptions(e, t) {
        const r = this.customStrengthOptions.minPasswordLength,
            i = this.customStrengthOptions.maxPasswordLength;
        r && (t.meetsMinPasswordLength = e.length >= r), i && (t.meetsMaxPasswordLength = e.length <= i);
    }
    validatePasswordCharacterOptions(e, t) {
        this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
        let r;
        for (let i = 0; i < e.length; i++)
            (r = e.charAt(i)),
                this.updatePasswordCharacterOptionsStatuses(
                    t,
                    r >= "a" && r <= "z",
                    r >= "A" && r <= "Z",
                    r >= "0" && r <= "9",
                    this.allowedNonAlphanumericCharacters.includes(r),
                );
    }
    updatePasswordCharacterOptionsStatuses(e, t, r, i, s) {
        this.customStrengthOptions.containsLowercaseLetter &&
            (e.containsLowercaseLetter || (e.containsLowercaseLetter = t)),
            this.customStrengthOptions.containsUppercaseLetter &&
                (e.containsUppercaseLetter || (e.containsUppercaseLetter = r)),
            this.customStrengthOptions.containsNumericCharacter &&
                (e.containsNumericCharacter || (e.containsNumericCharacter = i)),
            this.customStrengthOptions.containsNonAlphanumericCharacter &&
                (e.containsNonAlphanumericCharacter || (e.containsNonAlphanumericCharacter = s));
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Of {
    constructor(e, t, r, i) {
        (this.app = e),
            (this.heartbeatServiceProvider = t),
            (this.appCheckServiceProvider = r),
            (this.config = i),
            (this.currentUser = null),
            (this.emulatorConfig = null),
            (this.operations = Promise.resolve()),
            (this.authStateSubscription = new fa(this)),
            (this.idTokenSubscription = new fa(this)),
            (this.beforeStateQueue = new kf(this)),
            (this.redirectUser = null),
            (this.isProactiveRefreshEnabled = !1),
            (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
            (this._canInitEmulator = !0),
            (this._isInitialized = !1),
            (this._deleted = !1),
            (this._initializationPromise = null),
            (this._popupRedirectResolver = null),
            (this._errorFactory = Lc),
            (this._agentRecaptchaConfig = null),
            (this._tenantRecaptchaConfigs = {}),
            (this._projectPasswordPolicy = null),
            (this._tenantPasswordPolicies = {}),
            (this.lastNotifiedUid = void 0),
            (this.languageCode = null),
            (this.tenantId = null),
            (this.settings = { appVerificationDisabledForTesting: !1 }),
            (this.frameworks = []),
            (this.name = e.name),
            (this.clientVersion = i.sdkClientVersion);
    }
    _initializeWithPersistence(e, t) {
        return (
            t && (this._popupRedirectResolver = De(t)),
            (this._initializationPromise = this.queue(async () => {
                var r, i;
                if (!this._deleted && ((this.persistenceManager = await Vt.create(this, e)), !this._deleted)) {
                    if (!((r = this._popupRedirectResolver) === null || r === void 0) && r._shouldInitProactively)
                        try {
                            await this._popupRedirectResolver._initialize(this);
                        } catch {}
                    await this.initializeCurrentUser(t),
                        (this.lastNotifiedUid =
                            ((i = this.currentUser) === null || i === void 0 ? void 0 : i.uid) || null),
                        !this._deleted && (this._isInitialized = !0);
                }
            })),
            this._initializationPromise
        );
    }
    async _onStorageEvent() {
        if (this._deleted) return;
        const e = await this.assertedPersistence.getCurrentUser();
        if (!(!this.currentUser && !e)) {
            if (this.currentUser && e && this.currentUser.uid === e.uid) {
                this._currentUser._assign(e), await this.currentUser.getIdToken();
                return;
            }
            await this._updateCurrentUser(e, !0);
        }
    }
    async initializeCurrentUserFromIdToken(e) {
        try {
            const t = await Bc(this, { idToken: e }),
                r = await ke._fromGetAccountInfoResponse(this, t, e);
            await this.directlySetCurrentUser(r);
        } catch (t) {
            console.warn("FirebaseServerApp could not login user with provided authIdToken: ", t),
                await this.directlySetCurrentUser(null);
        }
    }
    async initializeCurrentUser(e) {
        var t;
        if (_e(this.app)) {
            const o = this.app.settings.authIdToken;
            return o
                ? new Promise((a) => {
                      setTimeout(() => this.initializeCurrentUserFromIdToken(o).then(a, a));
                  })
                : this.directlySetCurrentUser(null);
        }
        const r = await this.assertedPersistence.getCurrentUser();
        let i = r,
            s = !1;
        if (e && this.config.authDomain) {
            await this.getOrInitRedirectPersistenceManager();
            const o = (t = this.redirectUser) === null || t === void 0 ? void 0 : t._redirectEventId,
                a = i == null ? void 0 : i._redirectEventId,
                c = await this.tryRedirectSignIn(e);
            (!o || o === a) && c != null && c.user && ((i = c.user), (s = !0));
        }
        if (!i) return this.directlySetCurrentUser(null);
        if (!i._redirectEventId) {
            if (s)
                try {
                    await this.beforeStateQueue.runMiddleware(i);
                } catch (o) {
                    (i = r), this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(o));
                }
            return i ? this.reloadAndSetCurrentUserOrClear(i) : this.directlySetCurrentUser(null);
        }
        return (
            w(this._popupRedirectResolver, this, "argument-error"),
            await this.getOrInitRedirectPersistenceManager(),
            this.redirectUser && this.redirectUser._redirectEventId === i._redirectEventId
                ? this.directlySetCurrentUser(i)
                : this.reloadAndSetCurrentUserOrClear(i)
        );
    }
    async tryRedirectSignIn(e) {
        let t = null;
        try {
            t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
        } catch {
            await this._setRedirectUser(null);
        }
        return t;
    }
    async reloadAndSetCurrentUserOrClear(e) {
        try {
            await Rr(e);
        } catch (t) {
            if ((t == null ? void 0 : t.code) !== "auth/network-request-failed")
                return this.directlySetCurrentUser(null);
        }
        return this.directlySetCurrentUser(e);
    }
    useDeviceLanguage() {
        this.languageCode = df();
    }
    async _delete() {
        this._deleted = !0;
    }
    async updateCurrentUser(e) {
        if (_e(this.app)) return Promise.reject(Ne(this));
        const t = e ? $(e) : null;
        return (
            t && w(t.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token"),
            this._updateCurrentUser(t && t._clone(this))
        );
    }
    async _updateCurrentUser(e, t = !1) {
        if (!this._deleted)
            return (
                e && w(this.tenantId === e.tenantId, this, "tenant-id-mismatch"),
                t || (await this.beforeStateQueue.runMiddleware(e)),
                this.queue(async () => {
                    await this.directlySetCurrentUser(e), this.notifyAuthListeners();
                })
            );
    }
    async signOut() {
        return _e(this.app)
            ? Promise.reject(Ne(this))
            : (await this.beforeStateQueue.runMiddleware(null),
              (this.redirectPersistenceManager || this._popupRedirectResolver) && (await this._setRedirectUser(null)),
              this._updateCurrentUser(null, !0));
    }
    setPersistence(e) {
        return _e(this.app)
            ? Promise.reject(Ne(this))
            : this.queue(async () => {
                  await this.assertedPersistence.setPersistence(De(e));
              });
    }
    _getRecaptchaConfig() {
        return this.tenantId == null ? this._agentRecaptchaConfig : this._tenantRecaptchaConfigs[this.tenantId];
    }
    async validatePassword(e) {
        this._getPasswordPolicyInternal() || (await this._updatePasswordPolicy());
        const t = this._getPasswordPolicyInternal();
        return t.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
            ? Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version", {}))
            : t.validatePassword(e);
    }
    _getPasswordPolicyInternal() {
        return this.tenantId === null ? this._projectPasswordPolicy : this._tenantPasswordPolicies[this.tenantId];
    }
    async _updatePasswordPolicy() {
        const e = await Df(this),
            t = new Nf(e);
        this.tenantId === null ? (this._projectPasswordPolicy = t) : (this._tenantPasswordPolicies[this.tenantId] = t);
    }
    _getPersistence() {
        return this.assertedPersistence.persistence.type;
    }
    _updateErrorMap(e) {
        this._errorFactory = new Ln("auth", "Firebase", e());
    }
    onAuthStateChanged(e, t, r) {
        return this.registerStateListener(this.authStateSubscription, e, t, r);
    }
    beforeAuthStateChanged(e, t) {
        return this.beforeStateQueue.pushCallback(e, t);
    }
    onIdTokenChanged(e, t, r) {
        return this.registerStateListener(this.idTokenSubscription, e, t, r);
    }
    authStateReady() {
        return new Promise((e, t) => {
            if (this.currentUser) e();
            else {
                const r = this.onAuthStateChanged(() => {
                    r(), e();
                }, t);
            }
        });
    }
    async revokeAccessToken(e) {
        if (this.currentUser) {
            const t = await this.currentUser.getIdToken(),
                r = { providerId: "apple.com", tokenType: "ACCESS_TOKEN", token: e, idToken: t };
            this.tenantId != null && (r.tenantId = this.tenantId), await Pf(this, r);
        }
    }
    toJSON() {
        var e;
        return {
            apiKey: this.config.apiKey,
            authDomain: this.config.authDomain,
            appName: this.name,
            currentUser: (e = this._currentUser) === null || e === void 0 ? void 0 : e.toJSON(),
        };
    }
    async _setRedirectUser(e, t) {
        const r = await this.getOrInitRedirectPersistenceManager(t);
        return e === null ? r.removeCurrentUser() : r.setCurrentUser(e);
    }
    async getOrInitRedirectPersistenceManager(e) {
        if (!this.redirectPersistenceManager) {
            const t = (e && De(e)) || this._popupRedirectResolver;
            w(t, this, "argument-error"),
                (this.redirectPersistenceManager = await Vt.create(this, [De(t._redirectPersistence)], "redirectUser")),
                (this.redirectUser = await this.redirectPersistenceManager.getCurrentUser());
        }
        return this.redirectPersistenceManager;
    }
    async _redirectUserForId(e) {
        var t, r;
        return (
            this._isInitialized && (await this.queue(async () => {})),
            ((t = this._currentUser) === null || t === void 0 ? void 0 : t._redirectEventId) === e
                ? this._currentUser
                : ((r = this.redirectUser) === null || r === void 0 ? void 0 : r._redirectEventId) === e
                  ? this.redirectUser
                  : null
        );
    }
    async _persistUserIfCurrent(e) {
        if (e === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(e));
    }
    _notifyListenersIfCurrent(e) {
        e === this.currentUser && this.notifyAuthListeners();
    }
    _key() {
        return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
    }
    _startProactiveRefresh() {
        (this.isProactiveRefreshEnabled = !0), this.currentUser && this._currentUser._startProactiveRefresh();
    }
    _stopProactiveRefresh() {
        (this.isProactiveRefreshEnabled = !1), this.currentUser && this._currentUser._stopProactiveRefresh();
    }
    get _currentUser() {
        return this.currentUser;
    }
    notifyAuthListeners() {
        var e, t;
        if (!this._isInitialized) return;
        this.idTokenSubscription.next(this.currentUser);
        const r =
            (t = (e = this.currentUser) === null || e === void 0 ? void 0 : e.uid) !== null && t !== void 0 ? t : null;
        this.lastNotifiedUid !== r && ((this.lastNotifiedUid = r), this.authStateSubscription.next(this.currentUser));
    }
    registerStateListener(e, t, r, i) {
        if (this._deleted) return () => {};
        const s = typeof t == "function" ? t : t.next.bind(t);
        let o = !1;
        const a = this._isInitialized ? Promise.resolve() : this._initializationPromise;
        if (
            (w(a, this, "internal-error"),
            a.then(() => {
                o || s(this.currentUser);
            }),
            typeof t == "function")
        ) {
            const c = e.addObserver(t, r, i);
            return () => {
                (o = !0), c();
            };
        } else {
            const c = e.addObserver(t);
            return () => {
                (o = !0), c();
            };
        }
    }
    async directlySetCurrentUser(e) {
        this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(),
            e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
            (this.currentUser = e),
            e ? await this.assertedPersistence.setCurrentUser(e) : await this.assertedPersistence.removeCurrentUser();
    }
    queue(e) {
        return (this.operations = this.operations.then(e, e)), this.operations;
    }
    get assertedPersistence() {
        return w(this.persistenceManager, this, "internal-error"), this.persistenceManager;
    }
    _logFramework(e) {
        !e ||
            this.frameworks.includes(e) ||
            (this.frameworks.push(e),
            this.frameworks.sort(),
            (this.clientVersion = Jc(this.config.clientPlatform, this._getFrameworks())));
    }
    _getFrameworks() {
        return this.frameworks;
    }
    async _getAdditionalHeaders() {
        var e;
        const t = { "X-Client-Version": this.clientVersion };
        this.app.options.appId && (t["X-Firebase-gmpid"] = this.app.options.appId);
        const r = await ((e = this.heartbeatServiceProvider.getImmediate({ optional: !0 })) === null || e === void 0
            ? void 0
            : e.getHeartbeatsHeader());
        r && (t["X-Firebase-Client"] = r);
        const i = await this._getAppCheckToken();
        return i && (t["X-Firebase-AppCheck"] = i), t;
    }
    async _getAppCheckToken() {
        var e;
        const t = await ((e = this.appCheckServiceProvider.getImmediate({ optional: !0 })) === null || e === void 0
            ? void 0
            : e.getToken());
        return (
            t != null && t.error && cf(`Error while retrieving App Check token: ${t.error}`),
            t == null ? void 0 : t.token
        );
    }
}
function rt(n) {
    return $(n);
}
class fa {
    constructor(e) {
        (this.auth = e), (this.observer = null), (this.addObserver = Xh((t) => (this.observer = t)));
    }
    get next() {
        return w(this.observer, this.auth, "internal-error"), this.observer.next.bind(this.observer);
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let Hr = {
    async loadJS() {
        throw new Error("Unable to load external scripts");
    },
    recaptchaV2Script: "",
    recaptchaEnterpriseScript: "",
    gapiScript: "",
};
function Mf(n) {
    Hr = n;
}
function Yc(n) {
    return Hr.loadJS(n);
}
function Lf() {
    return Hr.recaptchaEnterpriseScript;
}
function xf() {
    return Hr.gapiScript;
}
function Ff(n) {
    return `__${n}${Math.floor(Math.random() * 1e6)}`;
}
const Uf = "recaptcha-enterprise",
    Bf = "NO_RECAPTCHA";
class qf {
    constructor(e) {
        (this.type = Uf), (this.auth = rt(e));
    }
    async verify(e = "verify", t = !1) {
        async function r(s) {
            if (!t) {
                if (s.tenantId == null && s._agentRecaptchaConfig != null) return s._agentRecaptchaConfig.siteKey;
                if (s.tenantId != null && s._tenantRecaptchaConfigs[s.tenantId] !== void 0)
                    return s._tenantRecaptchaConfigs[s.tenantId].siteKey;
            }
            return new Promise(async (o, a) => {
                yf(s, { clientType: "CLIENT_TYPE_WEB", version: "RECAPTCHA_ENTERPRISE" })
                    .then((c) => {
                        if (c.recaptchaKey === void 0) a(new Error("recaptcha Enterprise site key undefined"));
                        else {
                            const u = new _f(c);
                            return (
                                s.tenantId == null
                                    ? (s._agentRecaptchaConfig = u)
                                    : (s._tenantRecaptchaConfigs[s.tenantId] = u),
                                o(u.siteKey)
                            );
                        }
                    })
                    .catch((c) => {
                        a(c);
                    });
            });
        }
        function i(s, o, a) {
            const c = window.grecaptcha;
            ca(c)
                ? c.enterprise.ready(() => {
                      c.enterprise
                          .execute(s, { action: e })
                          .then((u) => {
                              o(u);
                          })
                          .catch(() => {
                              o(Bf);
                          });
                  })
                : a(Error("No reCAPTCHA enterprise script loaded."));
        }
        return new Promise((s, o) => {
            r(this.auth)
                .then((a) => {
                    if (!t && ca(window.grecaptcha)) i(a, s, o);
                    else {
                        if (typeof window > "u") {
                            o(new Error("RecaptchaVerifier is only supported in browser"));
                            return;
                        }
                        let c = Lf();
                        c.length !== 0 && (c += a),
                            Yc(c)
                                .then(() => {
                                    i(a, s, o);
                                })
                                .catch((u) => {
                                    o(u);
                                });
                    }
                })
                .catch((a) => {
                    o(a);
                });
        });
    }
}
async function pa(n, e, t, r = !1) {
    const i = new qf(n);
    let s;
    try {
        s = await i.verify(t);
    } catch {
        s = await i.verify(t, !0);
    }
    const o = Object.assign({}, e);
    return (
        r ? Object.assign(o, { captchaResp: s }) : Object.assign(o, { captchaResponse: s }),
        Object.assign(o, { clientType: "CLIENT_TYPE_WEB" }),
        Object.assign(o, { recaptchaVersion: "RECAPTCHA_ENTERPRISE" }),
        o
    );
}
async function ns(n, e, t, r) {
    var i;
    if (!((i = n._getRecaptchaConfig()) === null || i === void 0) && i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")) {
        const s = await pa(n, e, t, t === "getOobCode");
        return r(n, s);
    } else
        return r(n, e).catch(async (s) => {
            if (s.code === "auth/missing-recaptcha-token") {
                console.log(
                    `${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`,
                );
                const o = await pa(n, e, t, t === "getOobCode");
                return r(n, o);
            } else return Promise.reject(s);
        });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function jf(n, e) {
    const t = Vs(n, "auth");
    if (t.isInitialized()) {
        const i = t.getImmediate(),
            s = t.getOptions();
        if (Tr(s, e ?? {})) return i;
        ge(i, "already-initialized");
    }
    return t.initialize({ options: e });
}
function $f(n, e) {
    const t = (e == null ? void 0 : e.persistence) || [],
        r = (Array.isArray(t) ? t : [t]).map(De);
    e != null && e.errorMap && n._updateErrorMap(e.errorMap),
        n._initializeWithPersistence(r, e == null ? void 0 : e.popupRedirectResolver);
}
function zf(n, e, t) {
    const r = rt(n);
    w(r._canInitEmulator, r, "emulator-config-failed"), w(/^https?:\/\//.test(e), r, "invalid-emulator-scheme");
    const i = !1,
        s = Xc(e),
        { host: o, port: a } = Hf(e),
        c = a === null ? "" : `:${a}`;
    (r.config.emulator = { url: `${s}//${o}${c}/` }),
        (r.settings.appVerificationDisabledForTesting = !0),
        (r.emulatorConfig = Object.freeze({
            host: o,
            port: a,
            protocol: s.replace(":", ""),
            options: Object.freeze({ disableWarnings: i }),
        })),
        Gf();
}
function Xc(n) {
    const e = n.indexOf(":");
    return e < 0 ? "" : n.substr(0, e + 1);
}
function Hf(n) {
    const e = Xc(n),
        t = /(\/\/)?([^?#/]+)/.exec(n.substr(e.length));
    if (!t) return { host: "", port: null };
    const r = t[2].split("@").pop() || "",
        i = /^(\[[^\]]+\])(:|$)/.exec(r);
    if (i) {
        const s = i[1];
        return { host: s, port: ma(r.substr(s.length + 1)) };
    } else {
        const [s, o] = r.split(":");
        return { host: s, port: ma(o) };
    }
}
function ma(n) {
    if (!n) return null;
    const e = Number(n);
    return isNaN(e) ? null : e;
}
function Gf() {
    function n() {
        const e = document.createElement("p"),
            t = e.style;
        (e.innerText = "Running in emulator mode. Do not use with production credentials."),
            (t.position = "fixed"),
            (t.width = "100%"),
            (t.backgroundColor = "#ffffff"),
            (t.border = ".1em solid #000000"),
            (t.color = "#b50000"),
            (t.bottom = "0px"),
            (t.left = "0px"),
            (t.margin = "0px"),
            (t.zIndex = "10000"),
            (t.textAlign = "center"),
            e.classList.add("firebase-emulator-warning"),
            document.body.appendChild(e);
    }
    typeof console < "u" &&
        typeof console.info == "function" &&
        console.info(
            "WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.",
        ),
        typeof window < "u" &&
            typeof document < "u" &&
            (document.readyState === "loading" ? window.addEventListener("DOMContentLoaded", n) : n());
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Us {
    constructor(e, t) {
        (this.providerId = e), (this.signInMethod = t);
    }
    toJSON() {
        return be("not implemented");
    }
    _getIdTokenResponse(e) {
        return be("not implemented");
    }
    _linkToIdToken(e, t) {
        return be("not implemented");
    }
    _getReauthenticationResolver(e) {
        return be("not implemented");
    }
}
async function Wf(n, e) {
    return nt(n, "POST", "/v1/accounts:signUp", e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Kf(n, e) {
    return Un(n, "POST", "/v1/accounts:signInWithPassword", tt(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Qf(n, e) {
    return Un(n, "POST", "/v1/accounts:signInWithEmailLink", tt(n, e));
}
async function Jf(n, e) {
    return Un(n, "POST", "/v1/accounts:signInWithEmailLink", tt(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class En extends Us {
    constructor(e, t, r, i = null) {
        super("password", r), (this._email = e), (this._password = t), (this._tenantId = i);
    }
    static _fromEmailAndPassword(e, t) {
        return new En(e, t, "password");
    }
    static _fromEmailAndCode(e, t, r = null) {
        return new En(e, t, "emailLink", r);
    }
    toJSON() {
        return {
            email: this._email,
            password: this._password,
            signInMethod: this.signInMethod,
            tenantId: this._tenantId,
        };
    }
    static fromJSON(e) {
        const t = typeof e == "string" ? JSON.parse(e) : e;
        if (t != null && t.email && t != null && t.password) {
            if (t.signInMethod === "password") return this._fromEmailAndPassword(t.email, t.password);
            if (t.signInMethod === "emailLink") return this._fromEmailAndCode(t.email, t.password, t.tenantId);
        }
        return null;
    }
    async _getIdTokenResponse(e) {
        switch (this.signInMethod) {
            case "password":
                const t = {
                    returnSecureToken: !0,
                    email: this._email,
                    password: this._password,
                    clientType: "CLIENT_TYPE_WEB",
                };
                return ns(e, t, "signInWithPassword", Kf);
            case "emailLink":
                return Qf(e, { email: this._email, oobCode: this._password });
            default:
                ge(e, "internal-error");
        }
    }
    async _linkToIdToken(e, t) {
        switch (this.signInMethod) {
            case "password":
                const r = {
                    idToken: t,
                    returnSecureToken: !0,
                    email: this._email,
                    password: this._password,
                    clientType: "CLIENT_TYPE_WEB",
                };
                return ns(e, r, "signUpPassword", Wf);
            case "emailLink":
                return Jf(e, { idToken: t, email: this._email, oobCode: this._password });
            default:
                ge(e, "internal-error");
        }
    }
    _getReauthenticationResolver(e) {
        return this._getIdTokenResponse(e);
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Nt(n, e) {
    return Un(n, "POST", "/v1/accounts:signInWithIdp", tt(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Yf = "http://localhost";
class _t extends Us {
    constructor() {
        super(...arguments), (this.pendingToken = null);
    }
    static _fromParams(e) {
        const t = new _t(e.providerId, e.signInMethod);
        return (
            e.idToken || e.accessToken
                ? (e.idToken && (t.idToken = e.idToken),
                  e.accessToken && (t.accessToken = e.accessToken),
                  e.nonce && !e.pendingToken && (t.nonce = e.nonce),
                  e.pendingToken && (t.pendingToken = e.pendingToken))
                : e.oauthToken && e.oauthTokenSecret
                  ? ((t.accessToken = e.oauthToken), (t.secret = e.oauthTokenSecret))
                  : ge("argument-error"),
            t
        );
    }
    toJSON() {
        return {
            idToken: this.idToken,
            accessToken: this.accessToken,
            secret: this.secret,
            nonce: this.nonce,
            pendingToken: this.pendingToken,
            providerId: this.providerId,
            signInMethod: this.signInMethod,
        };
    }
    static fromJSON(e) {
        const t = typeof e == "string" ? JSON.parse(e) : e,
            { providerId: r, signInMethod: i } = t,
            s = Ns(t, ["providerId", "signInMethod"]);
        if (!r || !i) return null;
        const o = new _t(r, i);
        return (
            (o.idToken = s.idToken || void 0),
            (o.accessToken = s.accessToken || void 0),
            (o.secret = s.secret),
            (o.nonce = s.nonce),
            (o.pendingToken = s.pendingToken || null),
            o
        );
    }
    _getIdTokenResponse(e) {
        const t = this.buildRequest();
        return Nt(e, t);
    }
    _linkToIdToken(e, t) {
        const r = this.buildRequest();
        return (r.idToken = t), Nt(e, r);
    }
    _getReauthenticationResolver(e) {
        const t = this.buildRequest();
        return (t.autoCreate = !1), Nt(e, t);
    }
    buildRequest() {
        const e = { requestUri: Yf, returnSecureToken: !0 };
        if (this.pendingToken) e.pendingToken = this.pendingToken;
        else {
            const t = {};
            this.idToken && (t.id_token = this.idToken),
                this.accessToken && (t.access_token = this.accessToken),
                this.secret && (t.oauth_token_secret = this.secret),
                (t.providerId = this.providerId),
                this.nonce && !this.pendingToken && (t.nonce = this.nonce),
                (e.postBody = xn(t));
        }
        return e;
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Xf(n) {
    switch (n) {
        case "recoverEmail":
            return "RECOVER_EMAIL";
        case "resetPassword":
            return "PASSWORD_RESET";
        case "signIn":
            return "EMAIL_SIGNIN";
        case "verifyEmail":
            return "VERIFY_EMAIL";
        case "verifyAndChangeEmail":
            return "VERIFY_AND_CHANGE_EMAIL";
        case "revertSecondFactorAddition":
            return "REVERT_SECOND_FACTOR_ADDITION";
        default:
            return null;
    }
}
function Zf(n) {
    const e = on(an(n)).link,
        t = e ? on(an(e)).deep_link_id : null,
        r = on(an(n)).deep_link_id;
    return (r ? on(an(r)).link : null) || r || t || e || n;
}
class Bs {
    constructor(e) {
        var t, r, i, s, o, a;
        const c = on(an(e)),
            u = (t = c.apiKey) !== null && t !== void 0 ? t : null,
            l = (r = c.oobCode) !== null && r !== void 0 ? r : null,
            h = Xf((i = c.mode) !== null && i !== void 0 ? i : null);
        w(u && l && h, "argument-error"),
            (this.apiKey = u),
            (this.operation = h),
            (this.code = l),
            (this.continueUrl = (s = c.continueUrl) !== null && s !== void 0 ? s : null),
            (this.languageCode = (o = c.languageCode) !== null && o !== void 0 ? o : null),
            (this.tenantId = (a = c.tenantId) !== null && a !== void 0 ? a : null);
    }
    static parseLink(e) {
        const t = Zf(e);
        try {
            return new Bs(t);
        } catch {
            return null;
        }
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Qt {
    constructor() {
        this.providerId = Qt.PROVIDER_ID;
    }
    static credential(e, t) {
        return En._fromEmailAndPassword(e, t);
    }
    static credentialWithLink(e, t) {
        const r = Bs.parseLink(t);
        return w(r, "argument-error"), En._fromEmailAndCode(e, r.code, r.tenantId);
    }
}
Qt.PROVIDER_ID = "password";
Qt.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
Qt.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qs {
    constructor(e) {
        (this.providerId = e), (this.defaultLanguageCode = null), (this.customParameters = {});
    }
    setDefaultLanguage(e) {
        this.defaultLanguageCode = e;
    }
    setCustomParameters(e) {
        return (this.customParameters = e), this;
    }
    getCustomParameters() {
        return this.customParameters;
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bn extends qs {
    constructor() {
        super(...arguments), (this.scopes = []);
    }
    addScope(e) {
        return this.scopes.includes(e) || this.scopes.push(e), this;
    }
    getScopes() {
        return [...this.scopes];
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $e extends Bn {
    constructor() {
        super("facebook.com");
    }
    static credential(e) {
        return _t._fromParams({ providerId: $e.PROVIDER_ID, signInMethod: $e.FACEBOOK_SIGN_IN_METHOD, accessToken: e });
    }
    static credentialFromResult(e) {
        return $e.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
        return $e.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
        if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken) return null;
        try {
            return $e.credential(e.oauthAccessToken);
        } catch {
            return null;
        }
    }
}
$e.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
$e.PROVIDER_ID = "facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ze extends Bn {
    constructor() {
        super("google.com"), this.addScope("profile");
    }
    static credential(e, t) {
        return _t._fromParams({
            providerId: ze.PROVIDER_ID,
            signInMethod: ze.GOOGLE_SIGN_IN_METHOD,
            idToken: e,
            accessToken: t,
        });
    }
    static credentialFromResult(e) {
        return ze.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
        return ze.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
        if (!e) return null;
        const { oauthIdToken: t, oauthAccessToken: r } = e;
        if (!t && !r) return null;
        try {
            return ze.credential(t, r);
        } catch {
            return null;
        }
    }
}
ze.GOOGLE_SIGN_IN_METHOD = "google.com";
ze.PROVIDER_ID = "google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class He extends Bn {
    constructor() {
        super("github.com");
    }
    static credential(e) {
        return _t._fromParams({ providerId: He.PROVIDER_ID, signInMethod: He.GITHUB_SIGN_IN_METHOD, accessToken: e });
    }
    static credentialFromResult(e) {
        return He.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
        return He.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
        if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken) return null;
        try {
            return He.credential(e.oauthAccessToken);
        } catch {
            return null;
        }
    }
}
He.GITHUB_SIGN_IN_METHOD = "github.com";
He.PROVIDER_ID = "github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ge extends Bn {
    constructor() {
        super("twitter.com");
    }
    static credential(e, t) {
        return _t._fromParams({
            providerId: Ge.PROVIDER_ID,
            signInMethod: Ge.TWITTER_SIGN_IN_METHOD,
            oauthToken: e,
            oauthTokenSecret: t,
        });
    }
    static credentialFromResult(e) {
        return Ge.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
        return Ge.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
        if (!e) return null;
        const { oauthAccessToken: t, oauthTokenSecret: r } = e;
        if (!t || !r) return null;
        try {
            return Ge.credential(t, r);
        } catch {
            return null;
        }
    }
}
Ge.TWITTER_SIGN_IN_METHOD = "twitter.com";
Ge.PROVIDER_ID = "twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ep(n, e) {
    return Un(n, "POST", "/v1/accounts:signUp", tt(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yt {
    constructor(e) {
        (this.user = e.user),
            (this.providerId = e.providerId),
            (this._tokenResponse = e._tokenResponse),
            (this.operationType = e.operationType);
    }
    static async _fromIdTokenResponse(e, t, r, i = !1) {
        const s = await ke._fromIdTokenResponse(e, r, i),
            o = ga(r);
        return new yt({ user: s, providerId: o, _tokenResponse: r, operationType: t });
    }
    static async _forOperation(e, t, r) {
        await e._updateTokensIfNecessary(r, !0);
        const i = ga(r);
        return new yt({ user: e, providerId: i, _tokenResponse: r, operationType: t });
    }
}
function ga(n) {
    return n.providerId ? n.providerId : "phoneNumber" in n ? "phone" : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Pr extends Be {
    constructor(e, t, r, i) {
        var s;
        super(t.code, t.message),
            (this.operationType = r),
            (this.user = i),
            Object.setPrototypeOf(this, Pr.prototype),
            (this.customData = {
                appName: e.name,
                tenantId: (s = e.tenantId) !== null && s !== void 0 ? s : void 0,
                _serverResponse: t.customData._serverResponse,
                operationType: r,
            });
    }
    static _fromErrorAndOperation(e, t, r, i) {
        return new Pr(e, t, r, i);
    }
}
function Zc(n, e, t, r) {
    return (e === "reauthenticate" ? t._getReauthenticationResolver(n) : t._getIdTokenResponse(n)).catch((s) => {
        throw s.code === "auth/multi-factor-auth-required" ? Pr._fromErrorAndOperation(n, s, e, r) : s;
    });
}
async function tp(n, e, t = !1) {
    const r = await vn(n, e._linkToIdToken(n.auth, await n.getIdToken()), t);
    return yt._forOperation(n, "link", r);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function np(n, e, t = !1) {
    const { auth: r } = n;
    if (_e(r.app)) return Promise.reject(Ne(r));
    const i = "reauthenticate";
    try {
        const s = await vn(n, Zc(r, i, e, n), t);
        w(s.idToken, r, "internal-error");
        const o = xs(s.idToken);
        w(o, r, "internal-error");
        const { sub: a } = o;
        return w(n.uid === a, r, "user-mismatch"), yt._forOperation(n, i, s);
    } catch (s) {
        throw ((s == null ? void 0 : s.code) === "auth/user-not-found" && ge(r, "user-mismatch"), s);
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function eu(n, e, t = !1) {
    if (_e(n.app)) return Promise.reject(Ne(n));
    const r = "signIn",
        i = await Zc(n, r, e),
        s = await yt._fromIdTokenResponse(n, r, i);
    return t || (await n._updateCurrentUser(s.user)), s;
}
async function rp(n, e) {
    return eu(rt(n), e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function tu(n) {
    const e = rt(n);
    e._getPasswordPolicyInternal() && (await e._updatePasswordPolicy());
}
async function Pv(n, e, t) {
    if (_e(n.app)) return Promise.reject(Ne(n));
    const r = rt(n),
        o = await ns(
            r,
            { returnSecureToken: !0, email: e, password: t, clientType: "CLIENT_TYPE_WEB" },
            "signUpPassword",
            ep,
        ).catch((c) => {
            throw (c.code === "auth/password-does-not-meet-requirements" && tu(n), c);
        }),
        a = await yt._fromIdTokenResponse(r, "signIn", o);
    return await r._updateCurrentUser(a.user), a;
}
function Sv(n, e, t) {
    return _e(n.app)
        ? Promise.reject(Ne(n))
        : rp($(n), Qt.credential(e, t)).catch(async (r) => {
              throw (r.code === "auth/password-does-not-meet-requirements" && tu(n), r);
          });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Cv(n, e) {
    return $(n).setPersistence(e);
}
function ip(n, e, t, r) {
    return $(n).onIdTokenChanged(e, t, r);
}
function sp(n, e, t) {
    return $(n).beforeAuthStateChanged(e, t);
}
function bv(n, e, t, r) {
    return $(n).onAuthStateChanged(e, t, r);
}
const Sr = "__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class nu {
    constructor(e, t) {
        (this.storageRetriever = e), (this.type = t);
    }
    _isAvailable() {
        try {
            return this.storage
                ? (this.storage.setItem(Sr, "1"), this.storage.removeItem(Sr), Promise.resolve(!0))
                : Promise.resolve(!1);
        } catch {
            return Promise.resolve(!1);
        }
    }
    _set(e, t) {
        return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
    }
    _get(e) {
        const t = this.storage.getItem(e);
        return Promise.resolve(t ? JSON.parse(t) : null);
    }
    _remove(e) {
        return this.storage.removeItem(e), Promise.resolve();
    }
    get storage() {
        return this.storageRetriever();
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function op() {
    const n = ee();
    return Fs(n) || zr(n);
}
const ap = 1e3,
    cp = 10;
class ru extends nu {
    constructor() {
        super(() => window.localStorage, "LOCAL"),
            (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
            (this.listeners = {}),
            (this.localCache = {}),
            (this.pollTimer = null),
            (this.safariLocalStorageNotSynced = op() && bf()),
            (this.fallbackToPolling = Qc()),
            (this._shouldAllowMigration = !0);
    }
    forAllChangedKeys(e) {
        for (const t of Object.keys(this.listeners)) {
            const r = this.storage.getItem(t),
                i = this.localCache[t];
            r !== i && e(t, i, r);
        }
    }
    onStorageEvent(e, t = !1) {
        if (!e.key) {
            this.forAllChangedKeys((o, a, c) => {
                this.notifyListeners(o, c);
            });
            return;
        }
        const r = e.key;
        if ((t ? this.detachListener() : this.stopPolling(), this.safariLocalStorageNotSynced)) {
            const o = this.storage.getItem(r);
            if (e.newValue !== o)
                e.newValue !== null ? this.storage.setItem(r, e.newValue) : this.storage.removeItem(r);
            else if (this.localCache[r] === e.newValue && !t) return;
        }
        const i = () => {
                const o = this.storage.getItem(r);
                (!t && this.localCache[r] === o) || this.notifyListeners(r, o);
            },
            s = this.storage.getItem(r);
        Cf() && s !== e.newValue && e.newValue !== e.oldValue ? setTimeout(i, cp) : i();
    }
    notifyListeners(e, t) {
        this.localCache[e] = t;
        const r = this.listeners[e];
        if (r) for (const i of Array.from(r)) i(t && JSON.parse(t));
    }
    startPolling() {
        this.stopPolling(),
            (this.pollTimer = setInterval(() => {
                this.forAllChangedKeys((e, t, r) => {
                    this.onStorageEvent(new StorageEvent("storage", { key: e, oldValue: t, newValue: r }), !0);
                });
            }, ap));
    }
    stopPolling() {
        this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
    }
    attachListener() {
        window.addEventListener("storage", this.boundEventHandler);
    }
    detachListener() {
        window.removeEventListener("storage", this.boundEventHandler);
    }
    _addListener(e, t) {
        Object.keys(this.listeners).length === 0 &&
            (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
            this.listeners[e] || ((this.listeners[e] = new Set()), (this.localCache[e] = this.storage.getItem(e))),
            this.listeners[e].add(t);
    }
    _removeListener(e, t) {
        this.listeners[e] && (this.listeners[e].delete(t), this.listeners[e].size === 0 && delete this.listeners[e]),
            Object.keys(this.listeners).length === 0 && (this.detachListener(), this.stopPolling());
    }
    async _set(e, t) {
        await super._set(e, t), (this.localCache[e] = JSON.stringify(t));
    }
    async _get(e) {
        const t = await super._get(e);
        return (this.localCache[e] = JSON.stringify(t)), t;
    }
    async _remove(e) {
        await super._remove(e), delete this.localCache[e];
    }
}
ru.type = "LOCAL";
const up = ru;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class iu extends nu {
    constructor() {
        super(() => window.sessionStorage, "SESSION");
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
}
iu.type = "SESSION";
const su = iu;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function lp(n) {
    return Promise.all(
        n.map(async (e) => {
            try {
                return { fulfilled: !0, value: await e };
            } catch (t) {
                return { fulfilled: !1, reason: t };
            }
        }),
    );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Gr {
    constructor(e) {
        (this.eventTarget = e), (this.handlersMap = {}), (this.boundEventHandler = this.handleEvent.bind(this));
    }
    static _getInstance(e) {
        const t = this.receivers.find((i) => i.isListeningto(e));
        if (t) return t;
        const r = new Gr(e);
        return this.receivers.push(r), r;
    }
    isListeningto(e) {
        return this.eventTarget === e;
    }
    async handleEvent(e) {
        const t = e,
            { eventId: r, eventType: i, data: s } = t.data,
            o = this.handlersMap[i];
        if (!(o != null && o.size)) return;
        t.ports[0].postMessage({ status: "ack", eventId: r, eventType: i });
        const a = Array.from(o).map(async (u) => u(t.origin, s)),
            c = await lp(a);
        t.ports[0].postMessage({ status: "done", eventId: r, eventType: i, response: c });
    }
    _subscribe(e, t) {
        Object.keys(this.handlersMap).length === 0 &&
            this.eventTarget.addEventListener("message", this.boundEventHandler),
            this.handlersMap[e] || (this.handlersMap[e] = new Set()),
            this.handlersMap[e].add(t);
    }
    _unsubscribe(e, t) {
        this.handlersMap[e] && t && this.handlersMap[e].delete(t),
            (!t || this.handlersMap[e].size === 0) && delete this.handlersMap[e],
            Object.keys(this.handlersMap).length === 0 &&
                this.eventTarget.removeEventListener("message", this.boundEventHandler);
    }
}
Gr.receivers = [];
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function js(n = "", e = 10) {
    let t = "";
    for (let r = 0; r < e; r++) t += Math.floor(Math.random() * 10);
    return n + t;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hp {
    constructor(e) {
        (this.target = e), (this.handlers = new Set());
    }
    removeMessageHandler(e) {
        e.messageChannel &&
            (e.messageChannel.port1.removeEventListener("message", e.onMessage), e.messageChannel.port1.close()),
            this.handlers.delete(e);
    }
    async _send(e, t, r = 50) {
        const i = typeof MessageChannel < "u" ? new MessageChannel() : null;
        if (!i) throw new Error("connection_unavailable");
        let s, o;
        return new Promise((a, c) => {
            const u = js("", 20);
            i.port1.start();
            const l = setTimeout(() => {
                c(new Error("unsupported_event"));
            }, r);
            (o = {
                messageChannel: i,
                onMessage(h) {
                    const d = h;
                    if (d.data.eventId === u)
                        switch (d.data.status) {
                            case "ack":
                                clearTimeout(l),
                                    (s = setTimeout(() => {
                                        c(new Error("timeout"));
                                    }, 3e3));
                                break;
                            case "done":
                                clearTimeout(s), a(d.data.response);
                                break;
                            default:
                                clearTimeout(l), clearTimeout(s), c(new Error("invalid_response"));
                                break;
                        }
                },
            }),
                this.handlers.add(o),
                i.port1.addEventListener("message", o.onMessage),
                this.target.postMessage({ eventType: e, eventId: u, data: t }, [i.port2]);
        }).finally(() => {
            o && this.removeMessageHandler(o);
        });
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Re() {
    return window;
}
function dp(n) {
    Re().location.href = n;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ou() {
    return typeof Re().WorkerGlobalScope < "u" && typeof Re().importScripts == "function";
}
async function fp() {
    if (!(navigator != null && navigator.serviceWorker)) return null;
    try {
        return (await navigator.serviceWorker.ready).active;
    } catch {
        return null;
    }
}
function pp() {
    var n;
    return (
        ((n = navigator == null ? void 0 : navigator.serviceWorker) === null || n === void 0 ? void 0 : n.controller) ||
        null
    );
}
function mp() {
    return ou() ? self : null;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const au = "firebaseLocalStorageDb",
    gp = 1,
    Cr = "firebaseLocalStorage",
    cu = "fbase_key";
class qn {
    constructor(e) {
        this.request = e;
    }
    toPromise() {
        return new Promise((e, t) => {
            this.request.addEventListener("success", () => {
                e(this.request.result);
            }),
                this.request.addEventListener("error", () => {
                    t(this.request.error);
                });
        });
    }
}
function Wr(n, e) {
    return n.transaction([Cr], e ? "readwrite" : "readonly").objectStore(Cr);
}
function _p() {
    const n = indexedDB.deleteDatabase(au);
    return new qn(n).toPromise();
}
function rs() {
    const n = indexedDB.open(au, gp);
    return new Promise((e, t) => {
        n.addEventListener("error", () => {
            t(n.error);
        }),
            n.addEventListener("upgradeneeded", () => {
                const r = n.result;
                try {
                    r.createObjectStore(Cr, { keyPath: cu });
                } catch (i) {
                    t(i);
                }
            }),
            n.addEventListener("success", async () => {
                const r = n.result;
                r.objectStoreNames.contains(Cr) ? e(r) : (r.close(), await _p(), e(await rs()));
            });
    });
}
async function _a(n, e, t) {
    const r = Wr(n, !0).put({ [cu]: e, value: t });
    return new qn(r).toPromise();
}
async function yp(n, e) {
    const t = Wr(n, !1).get(e),
        r = await new qn(t).toPromise();
    return r === void 0 ? null : r.value;
}
function ya(n, e) {
    const t = Wr(n, !0).delete(e);
    return new qn(t).toPromise();
}
const vp = 800,
    Ep = 3;
class uu {
    constructor() {
        (this.type = "LOCAL"),
            (this._shouldAllowMigration = !0),
            (this.listeners = {}),
            (this.localCache = {}),
            (this.pollTimer = null),
            (this.pendingWrites = 0),
            (this.receiver = null),
            (this.sender = null),
            (this.serviceWorkerReceiverAvailable = !1),
            (this.activeServiceWorker = null),
            (this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(
                () => {},
                () => {},
            ));
    }
    async _openDb() {
        return this.db ? this.db : ((this.db = await rs()), this.db);
    }
    async _withRetries(e) {
        let t = 0;
        for (;;)
            try {
                const r = await this._openDb();
                return await e(r);
            } catch (r) {
                if (t++ > Ep) throw r;
                this.db && (this.db.close(), (this.db = void 0));
            }
    }
    async initializeServiceWorkerMessaging() {
        return ou() ? this.initializeReceiver() : this.initializeSender();
    }
    async initializeReceiver() {
        (this.receiver = Gr._getInstance(mp())),
            this.receiver._subscribe("keyChanged", async (e, t) => ({
                keyProcessed: (await this._poll()).includes(t.key),
            })),
            this.receiver._subscribe("ping", async (e, t) => ["keyChanged"]);
    }
    async initializeSender() {
        var e, t;
        if (((this.activeServiceWorker = await fp()), !this.activeServiceWorker)) return;
        this.sender = new hp(this.activeServiceWorker);
        const r = await this.sender._send("ping", {}, 800);
        r &&
            !((e = r[0]) === null || e === void 0) &&
            e.fulfilled &&
            !((t = r[0]) === null || t === void 0) &&
            t.value.includes("keyChanged") &&
            (this.serviceWorkerReceiverAvailable = !0);
    }
    async notifyServiceWorker(e) {
        if (!(!this.sender || !this.activeServiceWorker || pp() !== this.activeServiceWorker))
            try {
                await this.sender._send("keyChanged", { key: e }, this.serviceWorkerReceiverAvailable ? 800 : 50);
            } catch {}
    }
    async _isAvailable() {
        try {
            if (!indexedDB) return !1;
            const e = await rs();
            return await _a(e, Sr, "1"), await ya(e, Sr), !0;
        } catch {}
        return !1;
    }
    async _withPendingWrite(e) {
        this.pendingWrites++;
        try {
            await e();
        } finally {
            this.pendingWrites--;
        }
    }
    async _set(e, t) {
        return this._withPendingWrite(
            async () => (
                await this._withRetries((r) => _a(r, e, t)), (this.localCache[e] = t), this.notifyServiceWorker(e)
            ),
        );
    }
    async _get(e) {
        const t = await this._withRetries((r) => yp(r, e));
        return (this.localCache[e] = t), t;
    }
    async _remove(e) {
        return this._withPendingWrite(
            async () => (
                await this._withRetries((t) => ya(t, e)), delete this.localCache[e], this.notifyServiceWorker(e)
            ),
        );
    }
    async _poll() {
        const e = await this._withRetries((i) => {
            const s = Wr(i, !1).getAll();
            return new qn(s).toPromise();
        });
        if (!e) return [];
        if (this.pendingWrites !== 0) return [];
        const t = [],
            r = new Set();
        if (e.length !== 0)
            for (const { fbase_key: i, value: s } of e)
                r.add(i),
                    JSON.stringify(this.localCache[i]) !== JSON.stringify(s) && (this.notifyListeners(i, s), t.push(i));
        for (const i of Object.keys(this.localCache))
            this.localCache[i] && !r.has(i) && (this.notifyListeners(i, null), t.push(i));
        return t;
    }
    notifyListeners(e, t) {
        this.localCache[e] = t;
        const r = this.listeners[e];
        if (r) for (const i of Array.from(r)) i(t);
    }
    startPolling() {
        this.stopPolling(), (this.pollTimer = setInterval(async () => this._poll(), vp));
    }
    stopPolling() {
        this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
    }
    _addListener(e, t) {
        Object.keys(this.listeners).length === 0 && this.startPolling(),
            this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
            this.listeners[e].add(t);
    }
    _removeListener(e, t) {
        this.listeners[e] && (this.listeners[e].delete(t), this.listeners[e].size === 0 && delete this.listeners[e]),
            Object.keys(this.listeners).length === 0 && this.stopPolling();
    }
}
uu.type = "LOCAL";
const Ip = uu;
new Fn(3e4, 6e4);
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function lu(n, e) {
    return e ? De(e) : (w(n._popupRedirectResolver, n, "argument-error"), n._popupRedirectResolver);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $s extends Us {
    constructor(e) {
        super("custom", "custom"), (this.params = e);
    }
    _getIdTokenResponse(e) {
        return Nt(e, this._buildIdpRequest());
    }
    _linkToIdToken(e, t) {
        return Nt(e, this._buildIdpRequest(t));
    }
    _getReauthenticationResolver(e) {
        return Nt(e, this._buildIdpRequest());
    }
    _buildIdpRequest(e) {
        const t = {
            requestUri: this.params.requestUri,
            sessionId: this.params.sessionId,
            postBody: this.params.postBody,
            tenantId: this.params.tenantId,
            pendingToken: this.params.pendingToken,
            returnSecureToken: !0,
            returnIdpCredential: !0,
        };
        return e && (t.idToken = e), t;
    }
}
function Tp(n) {
    return eu(n.auth, new $s(n), n.bypassAuthState);
}
function wp(n) {
    const { auth: e, user: t } = n;
    return w(t, e, "internal-error"), np(t, new $s(n), n.bypassAuthState);
}
async function Ap(n) {
    const { auth: e, user: t } = n;
    return w(t, e, "internal-error"), tp(t, new $s(n), n.bypassAuthState);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hu {
    constructor(e, t, r, i, s = !1) {
        (this.auth = e),
            (this.resolver = r),
            (this.user = i),
            (this.bypassAuthState = s),
            (this.pendingPromise = null),
            (this.eventManager = null),
            (this.filter = Array.isArray(t) ? t : [t]);
    }
    execute() {
        return new Promise(async (e, t) => {
            this.pendingPromise = { resolve: e, reject: t };
            try {
                (this.eventManager = await this.resolver._initialize(this.auth)),
                    await this.onExecution(),
                    this.eventManager.registerConsumer(this);
            } catch (r) {
                this.reject(r);
            }
        });
    }
    async onAuthEvent(e) {
        const { urlResponse: t, sessionId: r, postBody: i, tenantId: s, error: o, type: a } = e;
        if (o) {
            this.reject(o);
            return;
        }
        const c = {
            auth: this.auth,
            requestUri: t,
            sessionId: r,
            tenantId: s || void 0,
            postBody: i || void 0,
            user: this.user,
            bypassAuthState: this.bypassAuthState,
        };
        try {
            this.resolve(await this.getIdpTask(a)(c));
        } catch (u) {
            this.reject(u);
        }
    }
    onError(e) {
        this.reject(e);
    }
    getIdpTask(e) {
        switch (e) {
            case "signInViaPopup":
            case "signInViaRedirect":
                return Tp;
            case "linkViaPopup":
            case "linkViaRedirect":
                return Ap;
            case "reauthViaPopup":
            case "reauthViaRedirect":
                return wp;
            default:
                ge(this.auth, "internal-error");
        }
    }
    resolve(e) {
        Me(this.pendingPromise, "Pending promise was never set"),
            this.pendingPromise.resolve(e),
            this.unregisterAndCleanUp();
    }
    reject(e) {
        Me(this.pendingPromise, "Pending promise was never set"),
            this.pendingPromise.reject(e),
            this.unregisterAndCleanUp();
    }
    unregisterAndCleanUp() {
        this.eventManager && this.eventManager.unregisterConsumer(this), (this.pendingPromise = null), this.cleanUp();
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Rp = new Fn(2e3, 1e4);
async function kv(n, e, t) {
    if (_e(n.app)) return Promise.reject(ye(n, "operation-not-supported-in-this-environment"));
    const r = rt(n);
    uf(n, e, qs);
    const i = lu(r, t);
    return new lt(r, "signInViaPopup", e, i).executeNotNull();
}
class lt extends hu {
    constructor(e, t, r, i, s) {
        super(e, t, i, s),
            (this.provider = r),
            (this.authWindow = null),
            (this.pollId = null),
            lt.currentPopupAction && lt.currentPopupAction.cancel(),
            (lt.currentPopupAction = this);
    }
    async executeNotNull() {
        const e = await this.execute();
        return w(e, this.auth, "internal-error"), e;
    }
    async onExecution() {
        Me(this.filter.length === 1, "Popup operations only handle one event");
        const e = js();
        (this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e)),
            (this.authWindow.associatedEvent = e),
            this.resolver._originValidation(this.auth).catch((t) => {
                this.reject(t);
            }),
            this.resolver._isIframeWebStorageSupported(this.auth, (t) => {
                t || this.reject(ye(this.auth, "web-storage-unsupported"));
            }),
            this.pollUserCancellation();
    }
    get eventId() {
        var e;
        return ((e = this.authWindow) === null || e === void 0 ? void 0 : e.associatedEvent) || null;
    }
    cancel() {
        this.reject(ye(this.auth, "cancelled-popup-request"));
    }
    cleanUp() {
        this.authWindow && this.authWindow.close(),
            this.pollId && window.clearTimeout(this.pollId),
            (this.authWindow = null),
            (this.pollId = null),
            (lt.currentPopupAction = null);
    }
    pollUserCancellation() {
        const e = () => {
            var t, r;
            if (
                !((r = (t = this.authWindow) === null || t === void 0 ? void 0 : t.window) === null || r === void 0) &&
                r.closed
            ) {
                this.pollId = window.setTimeout(() => {
                    (this.pollId = null), this.reject(ye(this.auth, "popup-closed-by-user"));
                }, 8e3);
                return;
            }
            this.pollId = window.setTimeout(e, Rp.get());
        };
        e();
    }
}
lt.currentPopupAction = null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Pp = "pendingRedirect",
    mr = new Map();
class Sp extends hu {
    constructor(e, t, r = !1) {
        super(e, ["signInViaRedirect", "linkViaRedirect", "reauthViaRedirect", "unknown"], t, void 0, r),
            (this.eventId = null);
    }
    async execute() {
        let e = mr.get(this.auth._key());
        if (!e) {
            try {
                const r = (await Cp(this.resolver, this.auth)) ? await super.execute() : null;
                e = () => Promise.resolve(r);
            } catch (t) {
                e = () => Promise.reject(t);
            }
            mr.set(this.auth._key(), e);
        }
        return this.bypassAuthState || mr.set(this.auth._key(), () => Promise.resolve(null)), e();
    }
    async onAuthEvent(e) {
        if (e.type === "signInViaRedirect") return super.onAuthEvent(e);
        if (e.type === "unknown") {
            this.resolve(null);
            return;
        }
        if (e.eventId) {
            const t = await this.auth._redirectUserForId(e.eventId);
            if (t) return (this.user = t), super.onAuthEvent(e);
            this.resolve(null);
        }
    }
    async onExecution() {}
    cleanUp() {}
}
async function Cp(n, e) {
    const t = Dp(e),
        r = kp(n);
    if (!(await r._isAvailable())) return !1;
    const i = (await r._get(t)) === "true";
    return await r._remove(t), i;
}
function bp(n, e) {
    mr.set(n._key(), e);
}
function kp(n) {
    return De(n._redirectPersistence);
}
function Dp(n) {
    return pr(Pp, n.config.apiKey, n.name);
}
async function Vp(n, e, t = !1) {
    if (_e(n.app)) return Promise.reject(Ne(n));
    const r = rt(n),
        i = lu(r, e),
        o = await new Sp(r, i, t).execute();
    return (
        o &&
            !t &&
            (delete o.user._redirectEventId, await r._persistUserIfCurrent(o.user), await r._setRedirectUser(null, e)),
        o
    );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Np = 10 * 60 * 1e3;
class Op {
    constructor(e) {
        (this.auth = e),
            (this.cachedEventUids = new Set()),
            (this.consumers = new Set()),
            (this.queuedRedirectEvent = null),
            (this.hasHandledPotentialRedirect = !1),
            (this.lastProcessedEventTime = Date.now());
    }
    registerConsumer(e) {
        this.consumers.add(e),
            this.queuedRedirectEvent &&
                this.isEventForConsumer(this.queuedRedirectEvent, e) &&
                (this.sendToConsumer(this.queuedRedirectEvent, e),
                this.saveEventToCache(this.queuedRedirectEvent),
                (this.queuedRedirectEvent = null));
    }
    unregisterConsumer(e) {
        this.consumers.delete(e);
    }
    onEvent(e) {
        if (this.hasEventBeenHandled(e)) return !1;
        let t = !1;
        return (
            this.consumers.forEach((r) => {
                this.isEventForConsumer(e, r) && ((t = !0), this.sendToConsumer(e, r), this.saveEventToCache(e));
            }),
            this.hasHandledPotentialRedirect ||
                !Mp(e) ||
                ((this.hasHandledPotentialRedirect = !0), t || ((this.queuedRedirectEvent = e), (t = !0))),
            t
        );
    }
    sendToConsumer(e, t) {
        var r;
        if (e.error && !du(e)) {
            const i = ((r = e.error.code) === null || r === void 0 ? void 0 : r.split("auth/")[1]) || "internal-error";
            t.onError(ye(this.auth, i));
        } else t.onAuthEvent(e);
    }
    isEventForConsumer(e, t) {
        const r = t.eventId === null || (!!e.eventId && e.eventId === t.eventId);
        return t.filter.includes(e.type) && r;
    }
    hasEventBeenHandled(e) {
        return (
            Date.now() - this.lastProcessedEventTime >= Np && this.cachedEventUids.clear(),
            this.cachedEventUids.has(va(e))
        );
    }
    saveEventToCache(e) {
        this.cachedEventUids.add(va(e)), (this.lastProcessedEventTime = Date.now());
    }
}
function va(n) {
    return [n.type, n.eventId, n.sessionId, n.tenantId].filter((e) => e).join("-");
}
function du({ type: n, error: e }) {
    return n === "unknown" && (e == null ? void 0 : e.code) === "auth/no-auth-event";
}
function Mp(n) {
    switch (n.type) {
        case "signInViaRedirect":
        case "linkViaRedirect":
        case "reauthViaRedirect":
            return !0;
        case "unknown":
            return du(n);
        default:
            return !1;
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Lp(n, e = {}) {
    return nt(n, "GET", "/v1/projects", e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const xp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    Fp = /^https?/;
async function Up(n) {
    if (n.config.emulator) return;
    const { authorizedDomains: e } = await Lp(n);
    for (const t of e)
        try {
            if (Bp(t)) return;
        } catch {}
    ge(n, "unauthorized-domain");
}
function Bp(n) {
    const e = es(),
        { protocol: t, hostname: r } = new URL(e);
    if (n.startsWith("chrome-extension://")) {
        const o = new URL(n);
        return o.hostname === "" && r === ""
            ? t === "chrome-extension:" && n.replace("chrome-extension://", "") === e.replace("chrome-extension://", "")
            : t === "chrome-extension:" && o.hostname === r;
    }
    if (!Fp.test(t)) return !1;
    if (xp.test(n)) return r === n;
    const i = n.replace(/\./g, "\\.");
    return new RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(r);
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const qp = new Fn(3e4, 6e4);
function Ea() {
    const n = Re().___jsl;
    if (n != null && n.H) {
        for (const e of Object.keys(n.H))
            if (((n.H[e].r = n.H[e].r || []), (n.H[e].L = n.H[e].L || []), (n.H[e].r = [...n.H[e].L]), n.CP))
                for (let t = 0; t < n.CP.length; t++) n.CP[t] = null;
    }
}
function jp(n) {
    return new Promise((e, t) => {
        var r, i, s;
        function o() {
            Ea(),
                gapi.load("gapi.iframes", {
                    callback: () => {
                        e(gapi.iframes.getContext());
                    },
                    ontimeout: () => {
                        Ea(), t(ye(n, "network-request-failed"));
                    },
                    timeout: qp.get(),
                });
        }
        if (!((i = (r = Re().gapi) === null || r === void 0 ? void 0 : r.iframes) === null || i === void 0) && i.Iframe)
            e(gapi.iframes.getContext());
        else if (!((s = Re().gapi) === null || s === void 0) && s.load) o();
        else {
            const a = Ff("iframefcb");
            return (
                (Re()[a] = () => {
                    gapi.load ? o() : t(ye(n, "network-request-failed"));
                }),
                Yc(`${xf()}?onload=${a}`).catch((c) => t(c))
            );
        }
    }).catch((e) => {
        throw ((gr = null), e);
    });
}
let gr = null;
function $p(n) {
    return (gr = gr || jp(n)), gr;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const zp = new Fn(5e3, 15e3),
    Hp = "__/auth/iframe",
    Gp = "emulator/auth/iframe",
    Wp = {
        style: { position: "absolute", top: "-100px", width: "1px", height: "1px" },
        "aria-hidden": "true",
        tabindex: "-1",
    },
    Kp = new Map([
        ["identitytoolkit.googleapis.com", "p"],
        ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
        ["test-identitytoolkit.sandbox.googleapis.com", "t"],
    ]);
function Qp(n) {
    const e = n.config;
    w(e.authDomain, n, "auth-domain-config-required");
    const t = e.emulator ? Ls(e, Gp) : `https://${n.config.authDomain}/${Hp}`,
        r = { apiKey: e.apiKey, appName: n.name, v: Kt },
        i = Kp.get(n.config.apiHost);
    i && (r.eid = i);
    const s = n._getFrameworks();
    return s.length && (r.fw = s.join(",")), `${t}?${xn(r).slice(1)}`;
}
async function Jp(n) {
    const e = await $p(n),
        t = Re().gapi;
    return (
        w(t, n, "internal-error"),
        e.open(
            {
                where: document.body,
                url: Qp(n),
                messageHandlersFilter: t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                attributes: Wp,
                dontclear: !0,
            },
            (r) =>
                new Promise(async (i, s) => {
                    await r.restyle({ setHideOnLeave: !1 });
                    const o = ye(n, "network-request-failed"),
                        a = Re().setTimeout(() => {
                            s(o);
                        }, zp.get());
                    function c() {
                        Re().clearTimeout(a), i(r);
                    }
                    r.ping(c).then(c, () => {
                        s(o);
                    });
                }),
        )
    );
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Yp = { location: "yes", resizable: "yes", statusbar: "yes", toolbar: "no" },
    Xp = 500,
    Zp = 600,
    em = "_blank",
    tm = "http://localhost";
class Ia {
    constructor(e) {
        (this.window = e), (this.associatedEvent = null);
    }
    close() {
        if (this.window)
            try {
                this.window.close();
            } catch {}
    }
}
function nm(n, e, t, r = Xp, i = Zp) {
    const s = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
        o = Math.max((window.screen.availWidth - r) / 2, 0).toString();
    let a = "";
    const c = Object.assign(Object.assign({}, Yp), { width: r.toString(), height: i.toString(), top: s, left: o }),
        u = ee().toLowerCase();
    t && (a = zc(u) ? em : t), $c(u) && ((e = e || tm), (c.scrollbars = "yes"));
    const l = Object.entries(c).reduce((d, [p, I]) => `${d}${p}=${I},`, "");
    if (Sf(u) && a !== "_self") return rm(e || "", a), new Ia(null);
    const h = window.open(e || "", a, l);
    w(h, n, "popup-blocked");
    try {
        h.focus();
    } catch {}
    return new Ia(h);
}
function rm(n, e) {
    const t = document.createElement("a");
    (t.href = n), (t.target = e);
    const r = document.createEvent("MouseEvent");
    r.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), t.dispatchEvent(r);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const im = "__/auth/handler",
    sm = "emulator/auth/handler",
    om = encodeURIComponent("fac");
async function Ta(n, e, t, r, i, s) {
    w(n.config.authDomain, n, "auth-domain-config-required"), w(n.config.apiKey, n, "invalid-api-key");
    const o = { apiKey: n.config.apiKey, appName: n.name, authType: t, redirectUrl: r, v: Kt, eventId: i };
    if (e instanceof qs) {
        e.setDefaultLanguage(n.languageCode),
            (o.providerId = e.providerId || ""),
            Yh(e.getCustomParameters()) || (o.customParameters = JSON.stringify(e.getCustomParameters()));
        for (const [l, h] of Object.entries({})) o[l] = h;
    }
    if (e instanceof Bn) {
        const l = e.getScopes().filter((h) => h !== "");
        l.length > 0 && (o.scopes = l.join(","));
    }
    n.tenantId && (o.tid = n.tenantId);
    const a = o;
    for (const l of Object.keys(a)) a[l] === void 0 && delete a[l];
    const c = await n._getAppCheckToken(),
        u = c ? `#${om}=${encodeURIComponent(c)}` : "";
    return `${am(n)}?${xn(a).slice(1)}${u}`;
}
function am({ config: n }) {
    return n.emulator ? Ls(n, sm) : `https://${n.authDomain}/${im}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Li = "webStorageSupport";
class cm {
    constructor() {
        (this.eventManagers = {}),
            (this.iframes = {}),
            (this.originValidationPromises = {}),
            (this._redirectPersistence = su),
            (this._completeRedirectFn = Vp),
            (this._overrideRedirectResult = bp);
    }
    async _openPopup(e, t, r, i) {
        var s;
        Me(
            (s = this.eventManagers[e._key()]) === null || s === void 0 ? void 0 : s.manager,
            "_initialize() not called before _openPopup()",
        );
        const o = await Ta(e, t, r, es(), i);
        return nm(e, o, js());
    }
    async _openRedirect(e, t, r, i) {
        await this._originValidation(e);
        const s = await Ta(e, t, r, es(), i);
        return dp(s), new Promise(() => {});
    }
    _initialize(e) {
        const t = e._key();
        if (this.eventManagers[t]) {
            const { manager: i, promise: s } = this.eventManagers[t];
            return i ? Promise.resolve(i) : (Me(s, "If manager is not set, promise should be"), s);
        }
        const r = this.initAndGetManager(e);
        return (
            (this.eventManagers[t] = { promise: r }),
            r.catch(() => {
                delete this.eventManagers[t];
            }),
            r
        );
    }
    async initAndGetManager(e) {
        const t = await Jp(e),
            r = new Op(e);
        return (
            t.register(
                "authEvent",
                (i) => (
                    w(i == null ? void 0 : i.authEvent, e, "invalid-auth-event"),
                    { status: r.onEvent(i.authEvent) ? "ACK" : "ERROR" }
                ),
                gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
            ),
            (this.eventManagers[e._key()] = { manager: r }),
            (this.iframes[e._key()] = t),
            r
        );
    }
    _isIframeWebStorageSupported(e, t) {
        this.iframes[e._key()].send(
            Li,
            { type: Li },
            (i) => {
                var s;
                const o = (s = i == null ? void 0 : i[0]) === null || s === void 0 ? void 0 : s[Li];
                o !== void 0 && t(!!o), ge(e, "internal-error");
            },
            gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
        );
    }
    _originValidation(e) {
        const t = e._key();
        return (
            this.originValidationPromises[t] || (this.originValidationPromises[t] = Up(e)),
            this.originValidationPromises[t]
        );
    }
    get _shouldInitProactively() {
        return Qc() || Fs() || zr();
    }
}
const um = cm;
var wa = "@firebase/auth",
    Aa = "1.7.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lm {
    constructor(e) {
        (this.auth = e), (this.internalListeners = new Map());
    }
    getUid() {
        var e;
        return (
            this.assertAuthConfigured(), ((e = this.auth.currentUser) === null || e === void 0 ? void 0 : e.uid) || null
        );
    }
    async getToken(e) {
        return (
            this.assertAuthConfigured(),
            await this.auth._initializationPromise,
            this.auth.currentUser ? { accessToken: await this.auth.currentUser.getIdToken(e) } : null
        );
    }
    addAuthTokenListener(e) {
        if ((this.assertAuthConfigured(), this.internalListeners.has(e))) return;
        const t = this.auth.onIdTokenChanged((r) => {
            e((r == null ? void 0 : r.stsTokenManager.accessToken) || null);
        });
        this.internalListeners.set(e, t), this.updateProactiveRefresh();
    }
    removeAuthTokenListener(e) {
        this.assertAuthConfigured();
        const t = this.internalListeners.get(e);
        t && (this.internalListeners.delete(e), t(), this.updateProactiveRefresh());
    }
    assertAuthConfigured() {
        w(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth");
    }
    updateProactiveRefresh() {
        this.internalListeners.size > 0 ? this.auth._startProactiveRefresh() : this.auth._stopProactiveRefresh();
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function hm(n) {
    switch (n) {
        case "Node":
            return "node";
        case "ReactNative":
            return "rn";
        case "Worker":
            return "webworker";
        case "Cordova":
            return "cordova";
        case "WebExtension":
            return "web-extension";
        default:
            return;
    }
}
function dm(n) {
    Ft(
        new mt(
            "auth",
            (e, { options: t }) => {
                const r = e.getProvider("app").getImmediate(),
                    i = e.getProvider("heartbeat"),
                    s = e.getProvider("app-check-internal"),
                    { apiKey: o, authDomain: a } = r.options;
                w(o && !o.includes(":"), "invalid-api-key", { appName: r.name });
                const c = {
                        apiKey: o,
                        authDomain: a,
                        clientPlatform: n,
                        apiHost: "identitytoolkit.googleapis.com",
                        tokenApiHost: "securetoken.googleapis.com",
                        apiScheme: "https",
                        sdkClientVersion: Jc(n),
                    },
                    u = new Of(r, i, s, c);
                return $f(u, t), u;
            },
            "PUBLIC",
        )
            .setInstantiationMode("EXPLICIT")
            .setInstanceCreatedCallback((e, t, r) => {
                e.getProvider("auth-internal").initialize();
            }),
    ),
        Ft(
            new mt(
                "auth-internal",
                (e) => {
                    const t = rt(e.getProvider("auth").getImmediate());
                    return ((r) => new lm(r))(t);
                },
                "PRIVATE",
            ).setInstantiationMode("EXPLICIT"),
        ),
        Je(wa, Aa, hm(n)),
        Je(wa, Aa, "esm2017");
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const fm = 5 * 60,
    pm = Cc("authIdTokenMaxAge") || fm;
let Ra = null;
const mm = (n) => async (e) => {
    const t = e && (await e.getIdTokenResult()),
        r = t && (new Date().getTime() - Date.parse(t.issuedAtTime)) / 1e3;
    if (r && r > pm) return;
    const i = t == null ? void 0 : t.token;
    Ra !== i &&
        ((Ra = i),
        await fetch(n, { method: i ? "POST" : "DELETE", headers: i ? { Authorization: `Bearer ${i}` } : {} }));
};
function gm(n = Vc()) {
    const e = Vs(n, "auth");
    if (e.isInitialized()) return e.getImmediate();
    const t = jf(n, { popupRedirectResolver: um, persistence: [Ip, up, su] }),
        r = Cc("authTokenSyncURL");
    if (r && typeof isSecureContext == "boolean" && isSecureContext) {
        const s = new URL(r, location.origin);
        if (location.origin === s.origin) {
            const o = mm(s.toString());
            sp(t, o, () => o(t.currentUser)), ip(t, (a) => o(a));
        }
    }
    const i = Pc("auth");
    return i && zf(t, `http://${i}`), t;
}
function _m() {
    var n, e;
    return (e = (n = document.getElementsByTagName("head")) === null || n === void 0 ? void 0 : n[0]) !== null &&
        e !== void 0
        ? e
        : document;
}
Mf({
    loadJS(n) {
        return new Promise((e, t) => {
            const r = document.createElement("script");
            r.setAttribute("src", n),
                (r.onload = e),
                (r.onerror = (i) => {
                    const s = ye("internal-error");
                    (s.customData = i), t(s);
                }),
                (r.type = "text/javascript"),
                (r.charset = "UTF-8"),
                _m().appendChild(r);
        });
    },
    gapiScript: "https://apis.google.com/js/api.js",
    recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
    recaptchaEnterpriseScript: "https://www.google.com/recaptcha/enterprise.js?render=",
});
dm("Browser");
var ym = "firebase",
    vm = "10.11.1";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Je(ym, vm, "app");
var Em =
        typeof globalThis < "u"
            ? globalThis
            : typeof window < "u"
              ? window
              : typeof global < "u"
                ? global
                : typeof self < "u"
                  ? self
                  : {},
    g,
    zs = zs || {},
    R = Em || self;
function Kr(n) {
    var e = typeof n;
    return (
        (e = e != "object" ? e : n ? (Array.isArray(n) ? "array" : e) : "null"),
        e == "array" || (e == "object" && typeof n.length == "number")
    );
}
function Qr(n) {
    var e = typeof n;
    return (e == "object" && n != null) || e == "function";
}
function Im(n) {
    return (Object.prototype.hasOwnProperty.call(n, xi) && n[xi]) || (n[xi] = ++Tm);
}
var xi = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
    Tm = 0;
function wm(n, e, t) {
    return n.call.apply(n.bind, arguments);
}
function Am(n, e, t) {
    if (!n) throw Error();
    if (2 < arguments.length) {
        var r = Array.prototype.slice.call(arguments, 2);
        return function () {
            var i = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(i, r), n.apply(e, i);
        };
    }
    return function () {
        return n.apply(e, arguments);
    };
}
function ie(n, e, t) {
    return (
        Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1
            ? (ie = wm)
            : (ie = Am),
        ie.apply(null, arguments)
    );
}
function sr(n, e) {
    var t = Array.prototype.slice.call(arguments, 1);
    return function () {
        var r = t.slice();
        return r.push.apply(r, arguments), n.apply(this, r);
    };
}
function W(n, e) {
    function t() {}
    (t.prototype = e.prototype),
        (n.$ = e.prototype),
        (n.prototype = new t()),
        (n.prototype.constructor = n),
        (n.ac = function (r, i, s) {
            for (var o = Array(arguments.length - 2), a = 2; a < arguments.length; a++) o[a - 2] = arguments[a];
            return e.prototype[i].apply(r, o);
        });
}
function it() {
    (this.s = this.s), (this.o = this.o);
}
var Rm = 0;
it.prototype.s = !1;
it.prototype.sa = function () {
    !this.s && ((this.s = !0), this.N(), Rm != 0) && Im(this);
};
it.prototype.N = function () {
    if (this.o) for (; this.o.length; ) this.o.shift()();
};
const fu = Array.prototype.indexOf
    ? function (n, e) {
          return Array.prototype.indexOf.call(n, e, void 0);
      }
    : function (n, e) {
          if (typeof n == "string") return typeof e != "string" || e.length != 1 ? -1 : n.indexOf(e, 0);
          for (let t = 0; t < n.length; t++) if (t in n && n[t] === e) return t;
          return -1;
      };
function Hs(n) {
    const e = n.length;
    if (0 < e) {
        const t = Array(e);
        for (let r = 0; r < e; r++) t[r] = n[r];
        return t;
    }
    return [];
}
function Pa(n, e) {
    for (let t = 1; t < arguments.length; t++) {
        const r = arguments[t];
        if (Kr(r)) {
            const i = n.length || 0,
                s = r.length || 0;
            n.length = i + s;
            for (let o = 0; o < s; o++) n[i + o] = r[o];
        } else n.push(r);
    }
}
function se(n, e) {
    (this.type = n), (this.g = this.target = e), (this.defaultPrevented = !1);
}
se.prototype.h = function () {
    this.defaultPrevented = !0;
};
var Pm = (function () {
    if (!R.addEventListener || !Object.defineProperty) return !1;
    var n = !1,
        e = Object.defineProperty({}, "passive", {
            get: function () {
                n = !0;
            },
        });
    try {
        const t = () => {};
        R.addEventListener("test", t, e), R.removeEventListener("test", t, e);
    } catch {}
    return n;
})();
function In(n) {
    return /^[\s\xa0]*$/.test(n);
}
function Jr() {
    var n = R.navigator;
    return n && (n = n.userAgent) ? n : "";
}
function Te(n) {
    return Jr().indexOf(n) != -1;
}
function Gs(n) {
    return Gs[" "](n), n;
}
Gs[" "] = function () {};
function Sm(n, e) {
    var t = Eg;
    return Object.prototype.hasOwnProperty.call(t, n) ? t[n] : (t[n] = e(n));
}
var Cm = Te("Opera"),
    Ut = Te("Trident") || Te("MSIE"),
    pu = Te("Edge"),
    is = pu || Ut,
    mu =
        Te("Gecko") &&
        !(Jr().toLowerCase().indexOf("webkit") != -1 && !Te("Edge")) &&
        !(Te("Trident") || Te("MSIE")) &&
        !Te("Edge"),
    bm = Jr().toLowerCase().indexOf("webkit") != -1 && !Te("Edge");
function gu() {
    var n = R.document;
    return n ? n.documentMode : void 0;
}
var ss;
e: {
    var Fi = "",
        Ui = (function () {
            var n = Jr();
            if (mu) return /rv:([^\);]+)(\)|;)/.exec(n);
            if (pu) return /Edge\/([\d\.]+)/.exec(n);
            if (Ut) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);
            if (bm) return /WebKit\/(\S+)/.exec(n);
            if (Cm) return /(?:Version)[ \/]?(\S+)/.exec(n);
        })();
    if ((Ui && (Fi = Ui ? Ui[1] : ""), Ut)) {
        var Bi = gu();
        if (Bi != null && Bi > parseFloat(Fi)) {
            ss = String(Bi);
            break e;
        }
    }
    ss = Fi;
}
var os;
if (R.document && Ut) {
    var Sa = gu();
    os = Sa || parseInt(ss, 10) || void 0;
} else os = void 0;
var km = os;
function Tn(n, e) {
    if (
        (se.call(this, n ? n.type : ""),
        (this.relatedTarget = this.g = this.target = null),
        (this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0),
        (this.key = ""),
        (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
        (this.state = null),
        (this.pointerId = 0),
        (this.pointerType = ""),
        (this.i = null),
        n)
    ) {
        var t = (this.type = n.type),
            r = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : null;
        if (((this.target = n.target || n.srcElement), (this.g = e), (e = n.relatedTarget))) {
            if (mu) {
                e: {
                    try {
                        Gs(e.nodeName);
                        var i = !0;
                        break e;
                    } catch {}
                    i = !1;
                }
                i || (e = null);
            }
        } else t == "mouseover" ? (e = n.fromElement) : t == "mouseout" && (e = n.toElement);
        (this.relatedTarget = e),
            r
                ? ((this.clientX = r.clientX !== void 0 ? r.clientX : r.pageX),
                  (this.clientY = r.clientY !== void 0 ? r.clientY : r.pageY),
                  (this.screenX = r.screenX || 0),
                  (this.screenY = r.screenY || 0))
                : ((this.clientX = n.clientX !== void 0 ? n.clientX : n.pageX),
                  (this.clientY = n.clientY !== void 0 ? n.clientY : n.pageY),
                  (this.screenX = n.screenX || 0),
                  (this.screenY = n.screenY || 0)),
            (this.button = n.button),
            (this.key = n.key || ""),
            (this.ctrlKey = n.ctrlKey),
            (this.altKey = n.altKey),
            (this.shiftKey = n.shiftKey),
            (this.metaKey = n.metaKey),
            (this.pointerId = n.pointerId || 0),
            (this.pointerType = typeof n.pointerType == "string" ? n.pointerType : Dm[n.pointerType] || ""),
            (this.state = n.state),
            (this.i = n),
            n.defaultPrevented && Tn.$.h.call(this);
    }
}
W(Tn, se);
var Dm = { 2: "touch", 3: "pen", 4: "mouse" };
Tn.prototype.h = function () {
    Tn.$.h.call(this);
    var n = this.i;
    n.preventDefault ? n.preventDefault() : (n.returnValue = !1);
};
var Yr = "closure_listenable_" + ((1e6 * Math.random()) | 0),
    Vm = 0;
function Nm(n, e, t, r, i) {
    (this.listener = n),
        (this.proxy = null),
        (this.src = e),
        (this.type = t),
        (this.capture = !!r),
        (this.la = i),
        (this.key = ++Vm),
        (this.fa = this.ia = !1);
}
function Xr(n) {
    (n.fa = !0), (n.listener = null), (n.proxy = null), (n.src = null), (n.la = null);
}
function Ws(n, e, t) {
    for (const r in n) e.call(t, n[r], r, n);
}
function Om(n, e) {
    for (const t in n) e.call(void 0, n[t], t, n);
}
function _u(n) {
    const e = {};
    for (const t in n) e[t] = n[t];
    return e;
}
const Ca = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function yu(n, e) {
    let t, r;
    for (let i = 1; i < arguments.length; i++) {
        r = arguments[i];
        for (t in r) n[t] = r[t];
        for (let s = 0; s < Ca.length; s++) (t = Ca[s]), Object.prototype.hasOwnProperty.call(r, t) && (n[t] = r[t]);
    }
}
function Zr(n) {
    (this.src = n), (this.g = {}), (this.h = 0);
}
Zr.prototype.add = function (n, e, t, r, i) {
    var s = n.toString();
    (n = this.g[s]), n || ((n = this.g[s] = []), this.h++);
    var o = cs(n, e, r, i);
    return -1 < o ? ((e = n[o]), t || (e.ia = !1)) : ((e = new Nm(e, this.src, s, !!r, i)), (e.ia = t), n.push(e)), e;
};
function as(n, e) {
    var t = e.type;
    if (t in n.g) {
        var r = n.g[t],
            i = fu(r, e),
            s;
        (s = 0 <= i) && Array.prototype.splice.call(r, i, 1),
            s && (Xr(e), n.g[t].length == 0 && (delete n.g[t], n.h--));
    }
}
function cs(n, e, t, r) {
    for (var i = 0; i < n.length; ++i) {
        var s = n[i];
        if (!s.fa && s.listener == e && s.capture == !!t && s.la == r) return i;
    }
    return -1;
}
var Ks = "closure_lm_" + ((1e6 * Math.random()) | 0),
    qi = {};
function vu(n, e, t, r, i) {
    if (Array.isArray(e)) {
        for (var s = 0; s < e.length; s++) vu(n, e[s], t, r, i);
        return null;
    }
    return (t = Tu(t)), n && n[Yr] ? n.O(e, t, Qr(r) ? !!r.capture : !!r, i) : Mm(n, e, t, !1, r, i);
}
function Mm(n, e, t, r, i, s) {
    if (!e) throw Error("Invalid event type");
    var o = Qr(i) ? !!i.capture : !!i,
        a = Js(n);
    if ((a || (n[Ks] = a = new Zr(n)), (t = a.add(e, t, r, o, s)), t.proxy)) return t;
    if (((r = Lm()), (t.proxy = r), (r.src = n), (r.listener = t), n.addEventListener))
        Pm || (i = o), i === void 0 && (i = !1), n.addEventListener(e.toString(), r, i);
    else if (n.attachEvent) n.attachEvent(Iu(e.toString()), r);
    else if (n.addListener && n.removeListener) n.addListener(r);
    else throw Error("addEventListener and attachEvent are unavailable.");
    return t;
}
function Lm() {
    function n(t) {
        return e.call(n.src, n.listener, t);
    }
    const e = xm;
    return n;
}
function Eu(n, e, t, r, i) {
    if (Array.isArray(e)) for (var s = 0; s < e.length; s++) Eu(n, e[s], t, r, i);
    else
        (r = Qr(r) ? !!r.capture : !!r),
            (t = Tu(t)),
            n && n[Yr]
                ? ((n = n.i),
                  (e = String(e).toString()),
                  e in n.g &&
                      ((s = n.g[e]),
                      (t = cs(s, t, r, i)),
                      -1 < t &&
                          (Xr(s[t]), Array.prototype.splice.call(s, t, 1), s.length == 0 && (delete n.g[e], n.h--))))
                : n &&
                  (n = Js(n)) &&
                  ((e = n.g[e.toString()]), (n = -1), e && (n = cs(e, t, r, i)), (t = -1 < n ? e[n] : null) && Qs(t));
}
function Qs(n) {
    if (typeof n != "number" && n && !n.fa) {
        var e = n.src;
        if (e && e[Yr]) as(e.i, n);
        else {
            var t = n.type,
                r = n.proxy;
            e.removeEventListener
                ? e.removeEventListener(t, r, n.capture)
                : e.detachEvent
                  ? e.detachEvent(Iu(t), r)
                  : e.addListener && e.removeListener && e.removeListener(r),
                (t = Js(e)) ? (as(t, n), t.h == 0 && ((t.src = null), (e[Ks] = null))) : Xr(n);
        }
    }
}
function Iu(n) {
    return n in qi ? qi[n] : (qi[n] = "on" + n);
}
function xm(n, e) {
    if (n.fa) n = !0;
    else {
        e = new Tn(e, this);
        var t = n.listener,
            r = n.la || n.src;
        n.ia && Qs(n), (n = t.call(r, e));
    }
    return n;
}
function Js(n) {
    return (n = n[Ks]), n instanceof Zr ? n : null;
}
var ji = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
function Tu(n) {
    return typeof n == "function"
        ? n
        : (n[ji] ||
              (n[ji] = function (e) {
                  return n.handleEvent(e);
              }),
          n[ji]);
}
function G() {
    it.call(this), (this.i = new Zr(this)), (this.S = this), (this.J = null);
}
W(G, it);
G.prototype[Yr] = !0;
G.prototype.removeEventListener = function (n, e, t, r) {
    Eu(this, n, e, t, r);
};
function X(n, e) {
    var t,
        r = n.J;
    if (r) for (t = []; r; r = r.J) t.push(r);
    if (((n = n.S), (r = e.type || e), typeof e == "string")) e = new se(e, n);
    else if (e instanceof se) e.target = e.target || n;
    else {
        var i = e;
        (e = new se(r, n)), yu(e, i);
    }
    if (((i = !0), t))
        for (var s = t.length - 1; 0 <= s; s--) {
            var o = (e.g = t[s]);
            i = or(o, r, !0, e) && i;
        }
    if (((o = e.g = n), (i = or(o, r, !0, e) && i), (i = or(o, r, !1, e) && i), t))
        for (s = 0; s < t.length; s++) (o = e.g = t[s]), (i = or(o, r, !1, e) && i);
}
G.prototype.N = function () {
    if ((G.$.N.call(this), this.i)) {
        var n = this.i,
            e;
        for (e in n.g) {
            for (var t = n.g[e], r = 0; r < t.length; r++) Xr(t[r]);
            delete n.g[e], n.h--;
        }
    }
    this.J = null;
};
G.prototype.O = function (n, e, t, r) {
    return this.i.add(String(n), e, !1, t, r);
};
G.prototype.P = function (n, e, t, r) {
    return this.i.add(String(n), e, !0, t, r);
};
function or(n, e, t, r) {
    if (((e = n.i.g[String(e)]), !e)) return !0;
    e = e.concat();
    for (var i = !0, s = 0; s < e.length; ++s) {
        var o = e[s];
        if (o && !o.fa && o.capture == t) {
            var a = o.listener,
                c = o.la || o.src;
            o.ia && as(n.i, o), (i = a.call(c, r) !== !1 && i);
        }
    }
    return i && !r.defaultPrevented;
}
var Ys = R.JSON.stringify;
class Fm {
    constructor(e, t) {
        (this.i = e), (this.j = t), (this.h = 0), (this.g = null);
    }
    get() {
        let e;
        return 0 < this.h ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null)) : (e = this.i()), e;
    }
}
function Um() {
    var n = Xs;
    let e = null;
    return n.g && ((e = n.g), (n.g = n.g.next), n.g || (n.h = null), (e.next = null)), e;
}
class Bm {
    constructor() {
        this.h = this.g = null;
    }
    add(e, t) {
        const r = wu.get();
        r.set(e, t), this.h ? (this.h.next = r) : (this.g = r), (this.h = r);
    }
}
var wu = new Fm(
    () => new qm(),
    (n) => n.reset(),
);
class qm {
    constructor() {
        this.next = this.g = this.h = null;
    }
    set(e, t) {
        (this.h = e), (this.g = t), (this.next = null);
    }
    reset() {
        this.next = this.g = this.h = null;
    }
}
function jm(n) {
    var e = 1;
    n = n.split(":");
    const t = [];
    for (; 0 < e && n.length; ) t.push(n.shift()), e--;
    return n.length && t.push(n.join(":")), t;
}
function $m(n) {
    R.setTimeout(() => {
        throw n;
    }, 0);
}
let wn,
    An = !1,
    Xs = new Bm(),
    Au = () => {
        const n = R.Promise.resolve(void 0);
        wn = () => {
            n.then(zm);
        };
    };
var zm = () => {
    for (var n; (n = Um()); ) {
        try {
            n.h.call(n.g);
        } catch (t) {
            $m(t);
        }
        var e = wu;
        e.j(n), 100 > e.h && (e.h++, (n.next = e.g), (e.g = n));
    }
    An = !1;
};
function ei(n, e) {
    G.call(this), (this.h = n || 1), (this.g = e || R), (this.j = ie(this.qb, this)), (this.l = Date.now());
}
W(ei, G);
g = ei.prototype;
g.ga = !1;
g.T = null;
g.qb = function () {
    if (this.ga) {
        var n = Date.now() - this.l;
        0 < n && n < 0.8 * this.h
            ? (this.T = this.g.setTimeout(this.j, this.h - n))
            : (this.T && (this.g.clearTimeout(this.T), (this.T = null)),
              X(this, "tick"),
              this.ga && (Zs(this), this.start()));
    }
};
g.start = function () {
    (this.ga = !0), this.T || ((this.T = this.g.setTimeout(this.j, this.h)), (this.l = Date.now()));
};
function Zs(n) {
    (n.ga = !1), n.T && (n.g.clearTimeout(n.T), (n.T = null));
}
g.N = function () {
    ei.$.N.call(this), Zs(this), delete this.g;
};
function eo(n, e, t) {
    if (typeof n == "function") t && (n = ie(n, t));
    else if (n && typeof n.handleEvent == "function") n = ie(n.handleEvent, n);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(e) ? -1 : R.setTimeout(n, e || 0);
}
function Ru(n) {
    n.g = eo(() => {
        (n.g = null), n.i && ((n.i = !1), Ru(n));
    }, n.j);
    const e = n.h;
    (n.h = null), n.m.apply(null, e);
}
class Hm extends it {
    constructor(e, t) {
        super(), (this.m = e), (this.j = t), (this.h = null), (this.i = !1), (this.g = null);
    }
    l(e) {
        (this.h = arguments), this.g ? (this.i = !0) : Ru(this);
    }
    N() {
        super.N(), this.g && (R.clearTimeout(this.g), (this.g = null), (this.i = !1), (this.h = null));
    }
}
function Rn(n) {
    it.call(this), (this.h = n), (this.g = {});
}
W(Rn, it);
var ba = [];
function Pu(n, e, t, r) {
    Array.isArray(t) || (t && (ba[0] = t.toString()), (t = ba));
    for (var i = 0; i < t.length; i++) {
        var s = vu(e, t[i], r || n.handleEvent, !1, n.h || n);
        if (!s) break;
        n.g[s.key] = s;
    }
}
function Su(n) {
    Ws(
        n.g,
        function (e, t) {
            this.g.hasOwnProperty(t) && Qs(e);
        },
        n,
    ),
        (n.g = {});
}
Rn.prototype.N = function () {
    Rn.$.N.call(this), Su(this);
};
Rn.prototype.handleEvent = function () {
    throw Error("EventHandler.handleEvent not implemented");
};
function ti() {
    this.g = !0;
}
ti.prototype.Ea = function () {
    this.g = !1;
};
function Gm(n, e, t, r, i, s) {
    n.info(function () {
        if (n.g)
            if (s)
                for (var o = "", a = s.split("&"), c = 0; c < a.length; c++) {
                    var u = a[c].split("=");
                    if (1 < u.length) {
                        var l = u[0];
                        u = u[1];
                        var h = l.split("_");
                        o = 2 <= h.length && h[1] == "type" ? o + (l + "=" + u + "&") : o + (l + "=redacted&");
                    }
                }
            else o = null;
        else o = s;
        return (
            "XMLHTTP REQ (" +
            r +
            ") [attempt " +
            i +
            "]: " +
            e +
            `
` +
            t +
            `
` +
            o
        );
    });
}
function Wm(n, e, t, r, i, s, o) {
    n.info(function () {
        return (
            "XMLHTTP RESP (" +
            r +
            ") [ attempt " +
            i +
            "]: " +
            e +
            `
` +
            t +
            `
` +
            s +
            " " +
            o
        );
    });
}
function kt(n, e, t, r) {
    n.info(function () {
        return "XMLHTTP TEXT (" + e + "): " + Qm(n, t) + (r ? " " + r : "");
    });
}
function Km(n, e) {
    n.info(function () {
        return "TIMEOUT: " + e;
    });
}
ti.prototype.info = function () {};
function Qm(n, e) {
    if (!n.g) return e;
    if (!e) return null;
    try {
        var t = JSON.parse(e);
        if (t) {
            for (n = 0; n < t.length; n++)
                if (Array.isArray(t[n])) {
                    var r = t[n];
                    if (!(2 > r.length)) {
                        var i = r[1];
                        if (Array.isArray(i) && !(1 > i.length)) {
                            var s = i[0];
                            if (s != "noop" && s != "stop" && s != "close")
                                for (var o = 1; o < i.length; o++) i[o] = "";
                        }
                    }
                }
        }
        return Ys(t);
    } catch {
        return e;
    }
}
var Tt = {},
    ka = null;
function ni() {
    return (ka = ka || new G());
}
Tt.Ta = "serverreachability";
function Cu(n) {
    se.call(this, Tt.Ta, n);
}
W(Cu, se);
function Pn(n) {
    const e = ni();
    X(e, new Cu(e));
}
Tt.STAT_EVENT = "statevent";
function bu(n, e) {
    se.call(this, Tt.STAT_EVENT, n), (this.stat = e);
}
W(bu, se);
function ce(n) {
    const e = ni();
    X(e, new bu(e, n));
}
Tt.Ua = "timingevent";
function ku(n, e) {
    se.call(this, Tt.Ua, n), (this.size = e);
}
W(ku, se);
function jn(n, e) {
    if (typeof n != "function") throw Error("Fn must not be null and must be a function");
    return R.setTimeout(function () {
        n();
    }, e);
}
var ri = { NO_ERROR: 0, rb: 1, Eb: 2, Db: 3, yb: 4, Cb: 5, Fb: 6, Qa: 7, TIMEOUT: 8, Ib: 9 },
    Du = {
        wb: "complete",
        Sb: "success",
        Ra: "error",
        Qa: "abort",
        Kb: "ready",
        Lb: "readystatechange",
        TIMEOUT: "timeout",
        Gb: "incrementaldata",
        Jb: "progress",
        zb: "downloadprogress",
        $b: "uploadprogress",
    };
function to() {}
to.prototype.h = null;
function Da(n) {
    return n.h || (n.h = n.i());
}
function Vu() {}
var $n = { OPEN: "a", vb: "b", Ra: "c", Hb: "d" };
function no() {
    se.call(this, "d");
}
W(no, se);
function ro() {
    se.call(this, "c");
}
W(ro, se);
var us;
function ii() {}
W(ii, to);
ii.prototype.g = function () {
    return new XMLHttpRequest();
};
ii.prototype.i = function () {
    return {};
};
us = new ii();
function zn(n, e, t, r) {
    (this.l = n),
        (this.j = e),
        (this.m = t),
        (this.W = r || 1),
        (this.U = new Rn(this)),
        (this.P = Jm),
        (n = is ? 125 : void 0),
        (this.V = new ei(n)),
        (this.I = null),
        (this.i = !1),
        (this.u = this.B = this.A = this.L = this.G = this.Y = this.C = null),
        (this.F = []),
        (this.g = null),
        (this.o = 0),
        (this.s = this.v = null),
        (this.ca = -1),
        (this.J = !1),
        (this.O = 0),
        (this.M = null),
        (this.ba = this.K = this.aa = this.S = !1),
        (this.h = new Nu());
}
function Nu() {
    (this.i = null), (this.g = ""), (this.h = !1);
}
var Jm = 45e3,
    Ou = {},
    ls = {};
g = zn.prototype;
g.setTimeout = function (n) {
    this.P = n;
};
function hs(n, e, t) {
    (n.L = 1), (n.A = oi(Le(e))), (n.u = t), (n.S = !0), Mu(n, null);
}
function Mu(n, e) {
    (n.G = Date.now()), Hn(n), (n.B = Le(n.A));
    var t = n.B,
        r = n.W;
    Array.isArray(r) || (r = [String(r)]),
        $u(t.i, "t", r),
        (n.o = 0),
        (t = n.l.J),
        (n.h = new Nu()),
        (n.g = ll(n.l, t ? e : null, !n.u)),
        0 < n.O && (n.M = new Hm(ie(n.Pa, n, n.g), n.O)),
        Pu(n.U, n.g, "readystatechange", n.nb),
        (e = n.I ? _u(n.I) : {}),
        n.u
            ? (n.v || (n.v = "POST"),
              (e["Content-Type"] = "application/x-www-form-urlencoded"),
              n.g.ha(n.B, n.v, n.u, e))
            : ((n.v = "GET"), n.g.ha(n.B, n.v, null, e)),
        Pn(),
        Gm(n.j, n.v, n.B, n.m, n.W, n.u);
}
g.nb = function (n) {
    n = n.target;
    const e = this.M;
    e && we(n) == 3 ? e.l() : this.Pa(n);
};
g.Pa = function (n) {
    try {
        if (n == this.g)
            e: {
                const l = we(this.g);
                var e = this.g.Ia();
                const h = this.g.da();
                if (!(3 > l) && (l != 3 || is || (this.g && (this.h.h || this.g.ja() || Ma(this.g))))) {
                    this.J || l != 4 || e == 7 || (e == 8 || 0 >= h ? Pn(3) : Pn(2)), si(this);
                    var t = this.g.da();
                    this.ca = t;
                    t: if (Lu(this)) {
                        var r = Ma(this.g);
                        n = "";
                        var i = r.length,
                            s = we(this.g) == 4;
                        if (!this.h.i) {
                            if (typeof TextDecoder > "u") {
                                ht(this), pn(this);
                                var o = "";
                                break t;
                            }
                            this.h.i = new R.TextDecoder();
                        }
                        for (e = 0; e < i; e++)
                            (this.h.h = !0), (n += this.h.i.decode(r[e], { stream: s && e == i - 1 }));
                        (r.length = 0), (this.h.g += n), (this.o = 0), (o = this.h.g);
                    } else o = this.g.ja();
                    if (((this.i = t == 200), Wm(this.j, this.v, this.B, this.m, this.W, l, t), this.i)) {
                        if (this.aa && !this.K) {
                            t: {
                                if (this.g) {
                                    var a,
                                        c = this.g;
                                    if ((a = c.g ? c.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !In(a)) {
                                        var u = a;
                                        break t;
                                    }
                                }
                                u = null;
                            }
                            if ((t = u))
                                kt(this.j, this.m, t, "Initial handshake response via X-HTTP-Initial-Response"),
                                    (this.K = !0),
                                    ds(this, t);
                            else {
                                (this.i = !1), (this.s = 3), ce(12), ht(this), pn(this);
                                break e;
                            }
                        }
                        this.S
                            ? (xu(this, l, o),
                              is && this.i && l == 3 && (Pu(this.U, this.V, "tick", this.mb), this.V.start()))
                            : (kt(this.j, this.m, o, null), ds(this, o)),
                            l == 4 && ht(this),
                            this.i && !this.J && (l == 4 ? ol(this.l, this) : ((this.i = !1), Hn(this)));
                    } else
                        _g(this.g),
                            t == 400 && 0 < o.indexOf("Unknown SID") ? ((this.s = 3), ce(12)) : ((this.s = 0), ce(13)),
                            ht(this),
                            pn(this);
                }
            }
    } catch {
    } finally {
    }
};
function Lu(n) {
    return n.g ? n.v == "GET" && n.L != 2 && n.l.Ha : !1;
}
function xu(n, e, t) {
    let r = !0,
        i;
    for (; !n.J && n.o < t.length; )
        if (((i = Ym(n, t)), i == ls)) {
            e == 4 && ((n.s = 4), ce(14), (r = !1)), kt(n.j, n.m, null, "[Incomplete Response]");
            break;
        } else if (i == Ou) {
            (n.s = 4), ce(15), kt(n.j, n.m, t, "[Invalid Chunk]"), (r = !1);
            break;
        } else kt(n.j, n.m, i, null), ds(n, i);
    Lu(n) && n.o != 0 && ((n.h.g = n.h.g.slice(n.o)), (n.o = 0)),
        e != 4 || t.length != 0 || n.h.h || ((n.s = 1), ce(16), (r = !1)),
        (n.i = n.i && r),
        r
            ? 0 < t.length &&
              !n.ba &&
              ((n.ba = !0),
              (e = n.l),
              e.g == n &&
                  e.ca &&
                  !e.M &&
                  (e.l.info("Great, no buffering proxy detected. Bytes received: " + t.length),
                  uo(e),
                  (e.M = !0),
                  ce(11)))
            : (kt(n.j, n.m, t, "[Invalid Chunked Response]"), ht(n), pn(n));
}
g.mb = function () {
    if (this.g) {
        var n = we(this.g),
            e = this.g.ja();
        this.o < e.length && (si(this), xu(this, n, e), this.i && n != 4 && Hn(this));
    }
};
function Ym(n, e) {
    var t = n.o,
        r = e.indexOf(
            `
`,
            t,
        );
    return r == -1
        ? ls
        : ((t = Number(e.substring(t, r))),
          isNaN(t) ? Ou : ((r += 1), r + t > e.length ? ls : ((e = e.slice(r, r + t)), (n.o = r + t), e)));
}
g.cancel = function () {
    (this.J = !0), ht(this);
};
function Hn(n) {
    (n.Y = Date.now() + n.P), Fu(n, n.P);
}
function Fu(n, e) {
    if (n.C != null) throw Error("WatchDog timer not null");
    n.C = jn(ie(n.lb, n), e);
}
function si(n) {
    n.C && (R.clearTimeout(n.C), (n.C = null));
}
g.lb = function () {
    this.C = null;
    const n = Date.now();
    0 <= n - this.Y
        ? (Km(this.j, this.B), this.L != 2 && (Pn(), ce(17)), ht(this), (this.s = 2), pn(this))
        : Fu(this, this.Y - n);
};
function pn(n) {
    n.l.H == 0 || n.J || ol(n.l, n);
}
function ht(n) {
    si(n);
    var e = n.M;
    e && typeof e.sa == "function" && e.sa(),
        (n.M = null),
        Zs(n.V),
        Su(n.U),
        n.g && ((e = n.g), (n.g = null), e.abort(), e.sa());
}
function ds(n, e) {
    try {
        var t = n.l;
        if (t.H != 0 && (t.g == n || fs(t.i, n))) {
            if (!n.K && fs(t.i, n) && t.H == 3) {
                try {
                    var r = t.Ja.g.parse(e);
                } catch {
                    r = null;
                }
                if (Array.isArray(r) && r.length == 3) {
                    var i = r;
                    if (i[0] == 0) {
                        e: if (!t.u) {
                            if (t.g)
                                if (t.g.G + 3e3 < n.G) Dr(t), ui(t);
                                else break e;
                            co(t), ce(18);
                        }
                    } else
                        (t.Fa = i[1]),
                            0 < t.Fa - t.V && 37500 > i[2] && t.G && t.A == 0 && !t.v && (t.v = jn(ie(t.ib, t), 6e3));
                    if (1 >= Gu(t.i) && t.oa) {
                        try {
                            t.oa();
                        } catch {}
                        t.oa = void 0;
                    }
                } else dt(t, 11);
            } else if (((n.K || t.g == n) && Dr(t), !In(e)))
                for (i = t.Ja.g.parse(e), e = 0; e < i.length; e++) {
                    let u = i[e];
                    if (((t.V = u[0]), (u = u[1]), t.H == 2))
                        if (u[0] == "c") {
                            (t.K = u[1]), (t.pa = u[2]);
                            const l = u[3];
                            l != null && ((t.ra = l), t.l.info("VER=" + t.ra));
                            const h = u[4];
                            h != null && ((t.Ga = h), t.l.info("SVER=" + t.Ga));
                            const d = u[5];
                            d != null &&
                                typeof d == "number" &&
                                0 < d &&
                                ((r = 1.5 * d), (t.L = r), t.l.info("backChannelRequestTimeoutMs_=" + r)),
                                (r = t);
                            const p = n.g;
                            if (p) {
                                const I = p.g ? p.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                                if (I) {
                                    var s = r.i;
                                    s.g ||
                                        (I.indexOf("spdy") == -1 && I.indexOf("quic") == -1 && I.indexOf("h2") == -1) ||
                                        ((s.j = s.l), (s.g = new Set()), s.h && (io(s, s.h), (s.h = null)));
                                }
                                if (r.F) {
                                    const T = p.g ? p.g.getResponseHeader("X-HTTP-Session-Id") : null;
                                    T && ((r.Da = T), L(r.I, r.F, T));
                                }
                            }
                            (t.H = 3),
                                t.h && t.h.Ba(),
                                t.ca && ((t.S = Date.now() - n.G), t.l.info("Handshake RTT: " + t.S + "ms")),
                                (r = t);
                            var o = n;
                            if (((r.wa = ul(r, r.J ? r.pa : null, r.Y)), o.K)) {
                                Wu(r.i, o);
                                var a = o,
                                    c = r.L;
                                c && a.setTimeout(c), a.C && (si(a), Hn(a)), (r.g = o);
                            } else il(r);
                            0 < t.j.length && li(t);
                        } else (u[0] != "stop" && u[0] != "close") || dt(t, 7);
                    else
                        t.H == 3 &&
                            (u[0] == "stop" || u[0] == "close"
                                ? u[0] == "stop"
                                    ? dt(t, 7)
                                    : ao(t)
                                : u[0] != "noop" && t.h && t.h.Aa(u),
                            (t.A = 0));
                }
        }
        Pn(4);
    } catch {}
}
function Xm(n) {
    if (n.Z && typeof n.Z == "function") return n.Z();
    if ((typeof Map < "u" && n instanceof Map) || (typeof Set < "u" && n instanceof Set)) return Array.from(n.values());
    if (typeof n == "string") return n.split("");
    if (Kr(n)) {
        for (var e = [], t = n.length, r = 0; r < t; r++) e.push(n[r]);
        return e;
    }
    (e = []), (t = 0);
    for (r in n) e[t++] = n[r];
    return e;
}
function Zm(n) {
    if (n.ta && typeof n.ta == "function") return n.ta();
    if (!n.Z || typeof n.Z != "function") {
        if (typeof Map < "u" && n instanceof Map) return Array.from(n.keys());
        if (!(typeof Set < "u" && n instanceof Set)) {
            if (Kr(n) || typeof n == "string") {
                var e = [];
                n = n.length;
                for (var t = 0; t < n; t++) e.push(t);
                return e;
            }
            (e = []), (t = 0);
            for (const r in n) e[t++] = r;
            return e;
        }
    }
}
function Uu(n, e) {
    if (n.forEach && typeof n.forEach == "function") n.forEach(e, void 0);
    else if (Kr(n) || typeof n == "string") Array.prototype.forEach.call(n, e, void 0);
    else for (var t = Zm(n), r = Xm(n), i = r.length, s = 0; s < i; s++) e.call(void 0, r[s], t && t[s], n);
}
var Bu = RegExp(
    "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$",
);
function eg(n, e) {
    if (n) {
        n = n.split("&");
        for (var t = 0; t < n.length; t++) {
            var r = n[t].indexOf("="),
                i = null;
            if (0 <= r) {
                var s = n[t].substring(0, r);
                i = n[t].substring(r + 1);
            } else s = n[t];
            e(s, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "");
        }
    }
}
function pt(n) {
    if (((this.g = this.s = this.j = ""), (this.m = null), (this.o = this.l = ""), (this.h = !1), n instanceof pt)) {
        (this.h = n.h), br(this, n.j), (this.s = n.s), (this.g = n.g), kr(this, n.m), (this.l = n.l);
        var e = n.i,
            t = new Sn();
        (t.i = e.i), e.g && ((t.g = new Map(e.g)), (t.h = e.h)), Va(this, t), (this.o = n.o);
    } else
        n && (e = String(n).match(Bu))
            ? ((this.h = !1),
              br(this, e[1] || "", !0),
              (this.s = cn(e[2] || "")),
              (this.g = cn(e[3] || "", !0)),
              kr(this, e[4]),
              (this.l = cn(e[5] || "", !0)),
              Va(this, e[6] || "", !0),
              (this.o = cn(e[7] || "")))
            : ((this.h = !1), (this.i = new Sn(null, this.h)));
}
pt.prototype.toString = function () {
    var n = [],
        e = this.j;
    e && n.push(un(e, Na, !0), ":");
    var t = this.g;
    return (
        (t || e == "file") &&
            (n.push("//"),
            (e = this.s) && n.push(un(e, Na, !0), "@"),
            n.push(encodeURIComponent(String(t)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            (t = this.m),
            t != null && n.push(":", String(t))),
        (t = this.l) && (this.g && t.charAt(0) != "/" && n.push("/"), n.push(un(t, t.charAt(0) == "/" ? rg : ng, !0))),
        (t = this.i.toString()) && n.push("?", t),
        (t = this.o) && n.push("#", un(t, sg)),
        n.join("")
    );
};
function Le(n) {
    return new pt(n);
}
function br(n, e, t) {
    (n.j = t ? cn(e, !0) : e), n.j && (n.j = n.j.replace(/:$/, ""));
}
function kr(n, e) {
    if (e) {
        if (((e = Number(e)), isNaN(e) || 0 > e)) throw Error("Bad port number " + e);
        n.m = e;
    } else n.m = null;
}
function Va(n, e, t) {
    e instanceof Sn ? ((n.i = e), og(n.i, n.h)) : (t || (e = un(e, ig)), (n.i = new Sn(e, n.h)));
}
function L(n, e, t) {
    n.i.set(e, t);
}
function oi(n) {
    return (
        L(
            n,
            "zx",
            Math.floor(2147483648 * Math.random()).toString(36) +
                Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36),
        ),
        n
    );
}
function cn(n, e) {
    return n ? (e ? decodeURI(n.replace(/%25/g, "%2525")) : decodeURIComponent(n)) : "";
}
function un(n, e, t) {
    return typeof n == "string"
        ? ((n = encodeURI(n).replace(e, tg)), t && (n = n.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), n)
        : null;
}
function tg(n) {
    return (n = n.charCodeAt(0)), "%" + ((n >> 4) & 15).toString(16) + (n & 15).toString(16);
}
var Na = /[#\/\?@]/g,
    ng = /[#\?:]/g,
    rg = /[#\?]/g,
    ig = /[#\?@]/g,
    sg = /#/g;
function Sn(n, e) {
    (this.h = this.g = null), (this.i = n || null), (this.j = !!e);
}
function st(n) {
    n.g ||
        ((n.g = new Map()),
        (n.h = 0),
        n.i &&
            eg(n.i, function (e, t) {
                n.add(decodeURIComponent(e.replace(/\+/g, " ")), t);
            }));
}
g = Sn.prototype;
g.add = function (n, e) {
    st(this), (this.i = null), (n = Jt(this, n));
    var t = this.g.get(n);
    return t || this.g.set(n, (t = [])), t.push(e), (this.h += 1), this;
};
function qu(n, e) {
    st(n), (e = Jt(n, e)), n.g.has(e) && ((n.i = null), (n.h -= n.g.get(e).length), n.g.delete(e));
}
function ju(n, e) {
    return st(n), (e = Jt(n, e)), n.g.has(e);
}
g.forEach = function (n, e) {
    st(this),
        this.g.forEach(function (t, r) {
            t.forEach(function (i) {
                n.call(e, i, r, this);
            }, this);
        }, this);
};
g.ta = function () {
    st(this);
    const n = Array.from(this.g.values()),
        e = Array.from(this.g.keys()),
        t = [];
    for (let r = 0; r < e.length; r++) {
        const i = n[r];
        for (let s = 0; s < i.length; s++) t.push(e[r]);
    }
    return t;
};
g.Z = function (n) {
    st(this);
    let e = [];
    if (typeof n == "string") ju(this, n) && (e = e.concat(this.g.get(Jt(this, n))));
    else {
        n = Array.from(this.g.values());
        for (let t = 0; t < n.length; t++) e = e.concat(n[t]);
    }
    return e;
};
g.set = function (n, e) {
    return (
        st(this),
        (this.i = null),
        (n = Jt(this, n)),
        ju(this, n) && (this.h -= this.g.get(n).length),
        this.g.set(n, [e]),
        (this.h += 1),
        this
    );
};
g.get = function (n, e) {
    return n ? ((n = this.Z(n)), 0 < n.length ? String(n[0]) : e) : e;
};
function $u(n, e, t) {
    qu(n, e), 0 < t.length && ((n.i = null), n.g.set(Jt(n, e), Hs(t)), (n.h += t.length));
}
g.toString = function () {
    if (this.i) return this.i;
    if (!this.g) return "";
    const n = [],
        e = Array.from(this.g.keys());
    for (var t = 0; t < e.length; t++) {
        var r = e[t];
        const s = encodeURIComponent(String(r)),
            o = this.Z(r);
        for (r = 0; r < o.length; r++) {
            var i = s;
            o[r] !== "" && (i += "=" + encodeURIComponent(String(o[r]))), n.push(i);
        }
    }
    return (this.i = n.join("&"));
};
function Jt(n, e) {
    return (e = String(e)), n.j && (e = e.toLowerCase()), e;
}
function og(n, e) {
    e &&
        !n.j &&
        (st(n),
        (n.i = null),
        n.g.forEach(function (t, r) {
            var i = r.toLowerCase();
            r != i && (qu(this, r), $u(this, i, t));
        }, n)),
        (n.j = e);
}
var ag = class {
    constructor(n, e) {
        (this.g = n), (this.map = e);
    }
};
function zu(n) {
    (this.l = n || cg),
        R.PerformanceNavigationTiming
            ? ((n = R.performance.getEntriesByType("navigation")),
              (n = 0 < n.length && (n[0].nextHopProtocol == "hq" || n[0].nextHopProtocol == "h2")))
            : (n = !!(R.g && R.g.Ka && R.g.Ka() && R.g.Ka().dc)),
        (this.j = n ? this.l : 1),
        (this.g = null),
        1 < this.j && (this.g = new Set()),
        (this.h = null),
        (this.i = []);
}
var cg = 10;
function Hu(n) {
    return n.h ? !0 : n.g ? n.g.size >= n.j : !1;
}
function Gu(n) {
    return n.h ? 1 : n.g ? n.g.size : 0;
}
function fs(n, e) {
    return n.h ? n.h == e : n.g ? n.g.has(e) : !1;
}
function io(n, e) {
    n.g ? n.g.add(e) : (n.h = e);
}
function Wu(n, e) {
    n.h && n.h == e ? (n.h = null) : n.g && n.g.has(e) && n.g.delete(e);
}
zu.prototype.cancel = function () {
    if (((this.i = Ku(this)), this.h)) this.h.cancel(), (this.h = null);
    else if (this.g && this.g.size !== 0) {
        for (const n of this.g.values()) n.cancel();
        this.g.clear();
    }
};
function Ku(n) {
    if (n.h != null) return n.i.concat(n.h.F);
    if (n.g != null && n.g.size !== 0) {
        let e = n.i;
        for (const t of n.g.values()) e = e.concat(t.F);
        return e;
    }
    return Hs(n.i);
}
var ug = class {
    stringify(n) {
        return R.JSON.stringify(n, void 0);
    }
    parse(n) {
        return R.JSON.parse(n, void 0);
    }
};
function lg() {
    this.g = new ug();
}
function hg(n, e, t) {
    const r = t || "";
    try {
        Uu(n, function (i, s) {
            let o = i;
            Qr(i) && (o = Ys(i)), e.push(r + s + "=" + encodeURIComponent(o));
        });
    } catch (i) {
        throw (e.push(r + "type=" + encodeURIComponent("_badmap")), i);
    }
}
function dg(n, e) {
    const t = new ti();
    if (R.Image) {
        const r = new Image();
        (r.onload = sr(ar, t, r, "TestLoadImage: loaded", !0, e)),
            (r.onerror = sr(ar, t, r, "TestLoadImage: error", !1, e)),
            (r.onabort = sr(ar, t, r, "TestLoadImage: abort", !1, e)),
            (r.ontimeout = sr(ar, t, r, "TestLoadImage: timeout", !1, e)),
            R.setTimeout(function () {
                r.ontimeout && r.ontimeout();
            }, 1e4),
            (r.src = n);
    } else e(!1);
}
function ar(n, e, t, r, i) {
    try {
        (e.onload = null), (e.onerror = null), (e.onabort = null), (e.ontimeout = null), i(r);
    } catch {}
}
function Gn(n) {
    (this.l = n.ec || null), (this.j = n.ob || !1);
}
W(Gn, to);
Gn.prototype.g = function () {
    return new ai(this.l, this.j);
};
Gn.prototype.i = (function (n) {
    return function () {
        return n;
    };
})({});
function ai(n, e) {
    G.call(this),
        (this.F = n),
        (this.u = e),
        (this.m = void 0),
        (this.readyState = so),
        (this.status = 0),
        (this.responseType = this.responseText = this.response = this.statusText = ""),
        (this.onreadystatechange = null),
        (this.v = new Headers()),
        (this.h = null),
        (this.C = "GET"),
        (this.B = ""),
        (this.g = !1),
        (this.A = this.j = this.l = null);
}
W(ai, G);
var so = 0;
g = ai.prototype;
g.open = function (n, e) {
    if (this.readyState != so) throw (this.abort(), Error("Error reopening a connection"));
    (this.C = n), (this.B = e), (this.readyState = 1), Cn(this);
};
g.send = function (n) {
    if (this.readyState != 1) throw (this.abort(), Error("need to call open() first. "));
    this.g = !0;
    const e = { headers: this.v, method: this.C, credentials: this.m, cache: void 0 };
    n && (e.body = n), (this.F || R).fetch(new Request(this.B, e)).then(this.$a.bind(this), this.ka.bind(this));
};
g.abort = function () {
    (this.response = this.responseText = ""),
        (this.v = new Headers()),
        (this.status = 0),
        this.j && this.j.cancel("Request was aborted.").catch(() => {}),
        1 <= this.readyState && this.g && this.readyState != 4 && ((this.g = !1), Wn(this)),
        (this.readyState = so);
};
g.$a = function (n) {
    if (
        this.g &&
        ((this.l = n),
        this.h ||
            ((this.status = this.l.status),
            (this.statusText = this.l.statusText),
            (this.h = n.headers),
            (this.readyState = 2),
            Cn(this)),
        this.g && ((this.readyState = 3), Cn(this), this.g))
    )
        if (this.responseType === "arraybuffer") n.arrayBuffer().then(this.Ya.bind(this), this.ka.bind(this));
        else if (typeof R.ReadableStream < "u" && "body" in n) {
            if (((this.j = n.body.getReader()), this.u)) {
                if (this.responseType)
                    throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
                this.response = [];
            } else (this.response = this.responseText = ""), (this.A = new TextDecoder());
            Qu(this);
        } else n.text().then(this.Za.bind(this), this.ka.bind(this));
};
function Qu(n) {
    n.j.read().then(n.Xa.bind(n)).catch(n.ka.bind(n));
}
g.Xa = function (n) {
    if (this.g) {
        if (this.u && n.value) this.response.push(n.value);
        else if (!this.u) {
            var e = n.value ? n.value : new Uint8Array(0);
            (e = this.A.decode(e, { stream: !n.done })) && (this.response = this.responseText += e);
        }
        n.done ? Wn(this) : Cn(this), this.readyState == 3 && Qu(this);
    }
};
g.Za = function (n) {
    this.g && ((this.response = this.responseText = n), Wn(this));
};
g.Ya = function (n) {
    this.g && ((this.response = n), Wn(this));
};
g.ka = function () {
    this.g && Wn(this);
};
function Wn(n) {
    (n.readyState = 4), (n.l = null), (n.j = null), (n.A = null), Cn(n);
}
g.setRequestHeader = function (n, e) {
    this.v.append(n, e);
};
g.getResponseHeader = function (n) {
    return (this.h && this.h.get(n.toLowerCase())) || "";
};
g.getAllResponseHeaders = function () {
    if (!this.h) return "";
    const n = [],
        e = this.h.entries();
    for (var t = e.next(); !t.done; ) (t = t.value), n.push(t[0] + ": " + t[1]), (t = e.next());
    return n.join(`\r
`);
};
function Cn(n) {
    n.onreadystatechange && n.onreadystatechange.call(n);
}
Object.defineProperty(ai.prototype, "withCredentials", {
    get: function () {
        return this.m === "include";
    },
    set: function (n) {
        this.m = n ? "include" : "same-origin";
    },
});
var fg = R.JSON.parse;
function F(n) {
    G.call(this),
        (this.headers = new Map()),
        (this.u = n || null),
        (this.h = !1),
        (this.C = this.g = null),
        (this.I = ""),
        (this.m = 0),
        (this.j = ""),
        (this.l = this.G = this.v = this.F = !1),
        (this.B = 0),
        (this.A = null),
        (this.K = Ju),
        (this.L = this.M = !1);
}
W(F, G);
var Ju = "",
    pg = /^https?$/i,
    mg = ["POST", "PUT"];
g = F.prototype;
g.Oa = function (n) {
    this.M = n;
};
g.ha = function (n, e, t, r) {
    if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.I + "; newUri=" + n);
    (e = e ? e.toUpperCase() : "GET"),
        (this.I = n),
        (this.j = ""),
        (this.m = 0),
        (this.F = !1),
        (this.h = !0),
        (this.g = this.u ? this.u.g() : us.g()),
        (this.C = this.u ? Da(this.u) : Da(us)),
        (this.g.onreadystatechange = ie(this.La, this));
    try {
        (this.G = !0), this.g.open(e, String(n), !0), (this.G = !1);
    } catch (s) {
        Oa(this, s);
        return;
    }
    if (((n = t || ""), (t = new Map(this.headers)), r))
        if (Object.getPrototypeOf(r) === Object.prototype) for (var i in r) t.set(i, r[i]);
        else if (typeof r.keys == "function" && typeof r.get == "function")
            for (const s of r.keys()) t.set(s, r.get(s));
        else throw Error("Unknown input type for opt_headers: " + String(r));
    (r = Array.from(t.keys()).find((s) => s.toLowerCase() == "content-type")),
        (i = R.FormData && n instanceof R.FormData),
        !(0 <= fu(mg, e)) || r || i || t.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    for (const [s, o] of t) this.g.setRequestHeader(s, o);
    this.K && (this.g.responseType = this.K),
        "withCredentials" in this.g && this.g.withCredentials !== this.M && (this.g.withCredentials = this.M);
    try {
        Zu(this),
            0 < this.B &&
                ((this.L = gg(this.g))
                    ? ((this.g.timeout = this.B), (this.g.ontimeout = ie(this.ua, this)))
                    : (this.A = eo(this.ua, this.B, this))),
            (this.v = !0),
            this.g.send(n),
            (this.v = !1);
    } catch (s) {
        Oa(this, s);
    }
};
function gg(n) {
    return Ut && typeof n.timeout == "number" && n.ontimeout !== void 0;
}
g.ua = function () {
    typeof zs < "u" &&
        this.g &&
        ((this.j = "Timed out after " + this.B + "ms, aborting"), (this.m = 8), X(this, "timeout"), this.abort(8));
};
function Oa(n, e) {
    (n.h = !1), n.g && ((n.l = !0), n.g.abort(), (n.l = !1)), (n.j = e), (n.m = 5), Yu(n), ci(n);
}
function Yu(n) {
    n.F || ((n.F = !0), X(n, "complete"), X(n, "error"));
}
g.abort = function (n) {
    this.g &&
        this.h &&
        ((this.h = !1),
        (this.l = !0),
        this.g.abort(),
        (this.l = !1),
        (this.m = n || 7),
        X(this, "complete"),
        X(this, "abort"),
        ci(this));
};
g.N = function () {
    this.g && (this.h && ((this.h = !1), (this.l = !0), this.g.abort(), (this.l = !1)), ci(this, !0)), F.$.N.call(this);
};
g.La = function () {
    this.s || (this.G || this.v || this.l ? Xu(this) : this.kb());
};
g.kb = function () {
    Xu(this);
};
function Xu(n) {
    if (n.h && typeof zs < "u" && (!n.C[1] || we(n) != 4 || n.da() != 2)) {
        if (n.v && we(n) == 4) eo(n.La, 0, n);
        else if ((X(n, "readystatechange"), we(n) == 4)) {
            n.h = !1;
            try {
                const o = n.da();
                e: switch (o) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var e = !0;
                        break e;
                    default:
                        e = !1;
                }
                var t;
                if (!(t = e)) {
                    var r;
                    if ((r = o === 0)) {
                        var i = String(n.I).match(Bu)[1] || null;
                        !i && R.self && R.self.location && (i = R.self.location.protocol.slice(0, -1)),
                            (r = !pg.test(i ? i.toLowerCase() : ""));
                    }
                    t = r;
                }
                if (t) X(n, "complete"), X(n, "success");
                else {
                    n.m = 6;
                    try {
                        var s = 2 < we(n) ? n.g.statusText : "";
                    } catch {
                        s = "";
                    }
                    (n.j = s + " [" + n.da() + "]"), Yu(n);
                }
            } finally {
                ci(n);
            }
        }
    }
}
function ci(n, e) {
    if (n.g) {
        Zu(n);
        const t = n.g,
            r = n.C[0] ? () => {} : null;
        (n.g = null), (n.C = null), e || X(n, "ready");
        try {
            t.onreadystatechange = r;
        } catch {}
    }
}
function Zu(n) {
    n.g && n.L && (n.g.ontimeout = null), n.A && (R.clearTimeout(n.A), (n.A = null));
}
g.isActive = function () {
    return !!this.g;
};
function we(n) {
    return n.g ? n.g.readyState : 0;
}
g.da = function () {
    try {
        return 2 < we(this) ? this.g.status : -1;
    } catch {
        return -1;
    }
};
g.ja = function () {
    try {
        return this.g ? this.g.responseText : "";
    } catch {
        return "";
    }
};
g.Wa = function (n) {
    if (this.g) {
        var e = this.g.responseText;
        return n && e.indexOf(n) == 0 && (e = e.substring(n.length)), fg(e);
    }
};
function Ma(n) {
    try {
        if (!n.g) return null;
        if ("response" in n.g) return n.g.response;
        switch (n.K) {
            case Ju:
            case "text":
                return n.g.responseText;
            case "arraybuffer":
                if ("mozResponseArrayBuffer" in n.g) return n.g.mozResponseArrayBuffer;
        }
        return null;
    } catch {
        return null;
    }
}
function _g(n) {
    const e = {};
    n = ((n.g && 2 <= we(n) && n.g.getAllResponseHeaders()) || "").split(`\r
`);
    for (let r = 0; r < n.length; r++) {
        if (In(n[r])) continue;
        var t = jm(n[r]);
        const i = t[0];
        if (((t = t[1]), typeof t != "string")) continue;
        t = t.trim();
        const s = e[i] || [];
        (e[i] = s), s.push(t);
    }
    Om(e, function (r) {
        return r.join(", ");
    });
}
g.Ia = function () {
    return this.m;
};
g.Sa = function () {
    return typeof this.j == "string" ? this.j : String(this.j);
};
function el(n) {
    let e = "";
    return (
        Ws(n, function (t, r) {
            (e += r),
                (e += ":"),
                (e += t),
                (e += `\r
`);
        }),
        e
    );
}
function oo(n, e, t) {
    e: {
        for (r in t) {
            var r = !1;
            break e;
        }
        r = !0;
    }
    r || ((t = el(t)), typeof n == "string" ? t != null && encodeURIComponent(String(t)) : L(n, e, t));
}
function nn(n, e, t) {
    return (t && t.internalChannelParams && t.internalChannelParams[n]) || e;
}
function tl(n) {
    (this.Ga = 0),
        (this.j = []),
        (this.l = new ti()),
        (this.pa = this.wa = this.I = this.Y = this.g = this.Da = this.F = this.na = this.o = this.U = this.s = null),
        (this.fb = this.W = 0),
        (this.cb = nn("failFast", !1, n)),
        (this.G = this.v = this.u = this.m = this.h = null),
        (this.aa = !0),
        (this.Fa = this.V = -1),
        (this.ba = this.A = this.C = 0),
        (this.ab = nn("baseRetryDelayMs", 5e3, n)),
        (this.hb = nn("retryDelaySeedMs", 1e4, n)),
        (this.eb = nn("forwardChannelMaxRetries", 2, n)),
        (this.xa = nn("forwardChannelRequestTimeoutMs", 2e4, n)),
        (this.va = (n && n.xmlHttpFactory) || void 0),
        (this.Ha = (n && n.useFetchStreams) || !1),
        (this.L = void 0),
        (this.J = (n && n.supportsCrossDomainXhr) || !1),
        (this.K = ""),
        (this.i = new zu(n && n.concurrentRequestLimit)),
        (this.Ja = new lg()),
        (this.P = (n && n.fastHandshake) || !1),
        (this.O = (n && n.encodeInitMessageHeaders) || !1),
        this.P && this.O && (this.O = !1),
        (this.bb = (n && n.bc) || !1),
        n && n.Ea && this.l.Ea(),
        n && n.forceLongPolling && (this.aa = !1),
        (this.ca = (!this.P && this.aa && n && n.detectBufferingProxy) || !1),
        (this.qa = void 0),
        n && n.longPollingTimeout && 0 < n.longPollingTimeout && (this.qa = n.longPollingTimeout),
        (this.oa = void 0),
        (this.S = 0),
        (this.M = !1),
        (this.ma = this.B = null);
}
g = tl.prototype;
g.ra = 8;
g.H = 1;
function ao(n) {
    if ((nl(n), n.H == 3)) {
        var e = n.W++,
            t = Le(n.I);
        if (
            (L(t, "SID", n.K),
            L(t, "RID", e),
            L(t, "TYPE", "terminate"),
            Kn(n, t),
            (e = new zn(n, n.l, e)),
            (e.L = 2),
            (e.A = oi(Le(t))),
            (t = !1),
            R.navigator && R.navigator.sendBeacon)
        )
            try {
                t = R.navigator.sendBeacon(e.A.toString(), "");
            } catch {}
        !t && R.Image && ((new Image().src = e.A), (t = !0)),
            t || ((e.g = ll(e.l, null)), e.g.ha(e.A)),
            (e.G = Date.now()),
            Hn(e);
    }
    cl(n);
}
function ui(n) {
    n.g && (uo(n), n.g.cancel(), (n.g = null));
}
function nl(n) {
    ui(n),
        n.u && (R.clearTimeout(n.u), (n.u = null)),
        Dr(n),
        n.i.cancel(),
        n.m && (typeof n.m == "number" && R.clearTimeout(n.m), (n.m = null));
}
function li(n) {
    if (!Hu(n.i) && !n.m) {
        n.m = !0;
        var e = n.Na;
        wn || Au(), An || (wn(), (An = !0)), Xs.add(e, n), (n.C = 0);
    }
}
function yg(n, e) {
    return Gu(n.i) >= n.i.j - (n.m ? 1 : 0)
        ? !1
        : n.m
          ? ((n.j = e.F.concat(n.j)), !0)
          : n.H == 1 || n.H == 2 || n.C >= (n.cb ? 0 : n.eb)
            ? !1
            : ((n.m = jn(ie(n.Na, n, e), al(n, n.C))), n.C++, !0);
}
g.Na = function (n) {
    if (this.m)
        if (((this.m = null), this.H == 1)) {
            if (!n) {
                (this.W = Math.floor(1e5 * Math.random())), (n = this.W++);
                const i = new zn(this, this.l, n);
                let s = this.s;
                if (
                    (this.U && (s ? ((s = _u(s)), yu(s, this.U)) : (s = this.U)),
                    this.o !== null || this.O || ((i.I = s), (s = null)),
                    this.P)
                )
                    e: {
                        for (var e = 0, t = 0; t < this.j.length; t++) {
                            t: {
                                var r = this.j[t];
                                if ("__data__" in r.map && ((r = r.map.__data__), typeof r == "string")) {
                                    r = r.length;
                                    break t;
                                }
                                r = void 0;
                            }
                            if (r === void 0) break;
                            if (((e += r), 4096 < e)) {
                                e = t;
                                break e;
                            }
                            if (e === 4096 || t === this.j.length - 1) {
                                e = t + 1;
                                break e;
                            }
                        }
                        e = 1e3;
                    }
                else e = 1e3;
                (e = rl(this, i, e)),
                    (t = Le(this.I)),
                    L(t, "RID", n),
                    L(t, "CVER", 22),
                    this.F && L(t, "X-HTTP-Session-Id", this.F),
                    Kn(this, t),
                    s &&
                        (this.O
                            ? (e = "headers=" + encodeURIComponent(String(el(s))) + "&" + e)
                            : this.o && oo(t, this.o, s)),
                    io(this.i, i),
                    this.bb && L(t, "TYPE", "init"),
                    this.P ? (L(t, "$req", e), L(t, "SID", "null"), (i.aa = !0), hs(i, t, null)) : hs(i, t, e),
                    (this.H = 2);
            }
        } else this.H == 3 && (n ? La(this, n) : this.j.length == 0 || Hu(this.i) || La(this));
};
function La(n, e) {
    var t;
    e ? (t = e.m) : (t = n.W++);
    const r = Le(n.I);
    L(r, "SID", n.K),
        L(r, "RID", t),
        L(r, "AID", n.V),
        Kn(n, r),
        n.o && n.s && oo(r, n.o, n.s),
        (t = new zn(n, n.l, t, n.C + 1)),
        n.o === null && (t.I = n.s),
        e && (n.j = e.F.concat(n.j)),
        (e = rl(n, t, 1e3)),
        t.setTimeout(Math.round(0.5 * n.xa) + Math.round(0.5 * n.xa * Math.random())),
        io(n.i, t),
        hs(t, r, e);
}
function Kn(n, e) {
    n.na &&
        Ws(n.na, function (t, r) {
            L(e, r, t);
        }),
        n.h &&
            Uu({}, function (t, r) {
                L(e, r, t);
            });
}
function rl(n, e, t) {
    t = Math.min(n.j.length, t);
    var r = n.h ? ie(n.h.Va, n.h, n) : null;
    e: {
        var i = n.j;
        let s = -1;
        for (;;) {
            const o = ["count=" + t];
            s == -1 ? (0 < t ? ((s = i[0].g), o.push("ofs=" + s)) : (s = 0)) : o.push("ofs=" + s);
            let a = !0;
            for (let c = 0; c < t; c++) {
                let u = i[c].g;
                const l = i[c].map;
                if (((u -= s), 0 > u)) (s = Math.max(0, i[c].g - 100)), (a = !1);
                else
                    try {
                        hg(l, o, "req" + u + "_");
                    } catch {
                        r && r(l);
                    }
            }
            if (a) {
                r = o.join("&");
                break e;
            }
        }
    }
    return (n = n.j.splice(0, t)), (e.F = n), r;
}
function il(n) {
    if (!n.g && !n.u) {
        n.ba = 1;
        var e = n.Ma;
        wn || Au(), An || (wn(), (An = !0)), Xs.add(e, n), (n.A = 0);
    }
}
function co(n) {
    return n.g || n.u || 3 <= n.A ? !1 : (n.ba++, (n.u = jn(ie(n.Ma, n), al(n, n.A))), n.A++, !0);
}
g.Ma = function () {
    if (((this.u = null), sl(this), this.ca && !(this.M || this.g == null || 0 >= this.S))) {
        var n = 2 * this.S;
        this.l.info("BP detection timer enabled: " + n), (this.B = jn(ie(this.jb, this), n));
    }
};
g.jb = function () {
    this.B &&
        ((this.B = null),
        this.l.info("BP detection timeout reached."),
        this.l.info("Buffering proxy detected and switch to long-polling!"),
        (this.G = !1),
        (this.M = !0),
        ce(10),
        ui(this),
        sl(this));
};
function uo(n) {
    n.B != null && (R.clearTimeout(n.B), (n.B = null));
}
function sl(n) {
    (n.g = new zn(n, n.l, "rpc", n.ba)), n.o === null && (n.g.I = n.s), (n.g.O = 0);
    var e = Le(n.wa);
    L(e, "RID", "rpc"),
        L(e, "SID", n.K),
        L(e, "AID", n.V),
        L(e, "CI", n.G ? "0" : "1"),
        !n.G && n.qa && L(e, "TO", n.qa),
        L(e, "TYPE", "xmlhttp"),
        Kn(n, e),
        n.o && n.s && oo(e, n.o, n.s),
        n.L && n.g.setTimeout(n.L);
    var t = n.g;
    (n = n.pa), (t.L = 1), (t.A = oi(Le(e))), (t.u = null), (t.S = !0), Mu(t, n);
}
g.ib = function () {
    this.v != null && ((this.v = null), ui(this), co(this), ce(19));
};
function Dr(n) {
    n.v != null && (R.clearTimeout(n.v), (n.v = null));
}
function ol(n, e) {
    var t = null;
    if (n.g == e) {
        Dr(n), uo(n), (n.g = null);
        var r = 2;
    } else if (fs(n.i, e)) (t = e.F), Wu(n.i, e), (r = 1);
    else return;
    if (n.H != 0) {
        if (e.i)
            if (r == 1) {
                (t = e.u ? e.u.length : 0), (e = Date.now() - e.G);
                var i = n.C;
                (r = ni()), X(r, new ku(r, t)), li(n);
            } else il(n);
        else if (((i = e.s), i == 3 || (i == 0 && 0 < e.ca) || !((r == 1 && yg(n, e)) || (r == 2 && co(n)))))
            switch ((t && 0 < t.length && ((e = n.i), (e.i = e.i.concat(t))), i)) {
                case 1:
                    dt(n, 5);
                    break;
                case 4:
                    dt(n, 10);
                    break;
                case 3:
                    dt(n, 6);
                    break;
                default:
                    dt(n, 2);
            }
    }
}
function al(n, e) {
    let t = n.ab + Math.floor(Math.random() * n.hb);
    return n.isActive() || (t *= 2), t * e;
}
function dt(n, e) {
    if ((n.l.info("Error code " + e), e == 2)) {
        var t = null;
        n.h && (t = null);
        var r = ie(n.pb, n);
        t ||
            ((t = new pt("//www.google.com/images/cleardot.gif")),
            (R.location && R.location.protocol == "http") || br(t, "https"),
            oi(t)),
            dg(t.toString(), r);
    } else ce(2);
    (n.H = 0), n.h && n.h.za(e), cl(n), nl(n);
}
g.pb = function (n) {
    n ? (this.l.info("Successfully pinged google.com"), ce(2)) : (this.l.info("Failed to ping google.com"), ce(1));
};
function cl(n) {
    if (((n.H = 0), (n.ma = []), n.h)) {
        const e = Ku(n.i);
        (e.length != 0 || n.j.length != 0) &&
            (Pa(n.ma, e), Pa(n.ma, n.j), (n.i.i.length = 0), Hs(n.j), (n.j.length = 0)),
            n.h.ya();
    }
}
function ul(n, e, t) {
    var r = t instanceof pt ? Le(t) : new pt(t);
    if (r.g != "") e && (r.g = e + "." + r.g), kr(r, r.m);
    else {
        var i = R.location;
        (r = i.protocol), (e = e ? e + "." + i.hostname : i.hostname), (i = +i.port);
        var s = new pt(null);
        r && br(s, r), e && (s.g = e), i && kr(s, i), t && (s.l = t), (r = s);
    }
    return (t = n.F), (e = n.Da), t && e && L(r, t, e), L(r, "VER", n.ra), Kn(n, r), r;
}
function ll(n, e, t) {
    if (e && !n.J) throw Error("Can't create secondary domain capable XhrIo object.");
    return (e = n.Ha && !n.va ? new F(new Gn({ ob: t })) : new F(n.va)), e.Oa(n.J), e;
}
g.isActive = function () {
    return !!this.h && this.h.isActive(this);
};
function hl() {}
g = hl.prototype;
g.Ba = function () {};
g.Aa = function () {};
g.za = function () {};
g.ya = function () {};
g.isActive = function () {
    return !0;
};
g.Va = function () {};
function Vr() {
    if (Ut && !(10 <= Number(km))) throw Error("Environmental error: no available transport.");
}
Vr.prototype.g = function (n, e) {
    return new de(n, e);
};
function de(n, e) {
    G.call(this),
        (this.g = new tl(e)),
        (this.l = n),
        (this.h = (e && e.messageUrlParams) || null),
        (n = (e && e.messageHeaders) || null),
        e &&
            e.clientProtocolHeaderRequired &&
            (n ? (n["X-Client-Protocol"] = "webchannel") : (n = { "X-Client-Protocol": "webchannel" })),
        (this.g.s = n),
        (n = (e && e.initMessageHeaders) || null),
        e &&
            e.messageContentType &&
            (n
                ? (n["X-WebChannel-Content-Type"] = e.messageContentType)
                : (n = { "X-WebChannel-Content-Type": e.messageContentType })),
        e && e.Ca && (n ? (n["X-WebChannel-Client-Profile"] = e.Ca) : (n = { "X-WebChannel-Client-Profile": e.Ca })),
        (this.g.U = n),
        (n = e && e.cc) && !In(n) && (this.g.o = n),
        (this.A = (e && e.supportsCrossDomainXhr) || !1),
        (this.v = (e && e.sendRawJson) || !1),
        (e = e && e.httpSessionIdParam) &&
            !In(e) &&
            ((this.g.F = e), (n = this.h), n !== null && e in n && ((n = this.h), e in n && delete n[e])),
        (this.j = new Yt(this));
}
W(de, G);
de.prototype.m = function () {
    (this.g.h = this.j), this.A && (this.g.J = !0);
    var n = this.g,
        e = this.l,
        t = this.h || void 0;
    ce(0), (n.Y = e), (n.na = t || {}), (n.G = n.aa), (n.I = ul(n, null, n.Y)), li(n);
};
de.prototype.close = function () {
    ao(this.g);
};
de.prototype.u = function (n) {
    var e = this.g;
    if (typeof n == "string") {
        var t = {};
        (t.__data__ = n), (n = t);
    } else this.v && ((t = {}), (t.__data__ = Ys(n)), (n = t));
    e.j.push(new ag(e.fb++, n)), e.H == 3 && li(e);
};
de.prototype.N = function () {
    (this.g.h = null), delete this.j, ao(this.g), delete this.g, de.$.N.call(this);
};
function dl(n) {
    no.call(this),
        n.__headers__ &&
            ((this.headers = n.__headers__),
            (this.statusCode = n.__status__),
            delete n.__headers__,
            delete n.__status__);
    var e = n.__sm__;
    if (e) {
        e: {
            for (const t in e) {
                n = t;
                break e;
            }
            n = void 0;
        }
        (this.i = n) && ((n = this.i), (e = e !== null && n in e ? e[n] : void 0)), (this.data = e);
    } else this.data = n;
}
W(dl, no);
function fl() {
    ro.call(this), (this.status = 1);
}
W(fl, ro);
function Yt(n) {
    this.g = n;
}
W(Yt, hl);
Yt.prototype.Ba = function () {
    X(this.g, "a");
};
Yt.prototype.Aa = function (n) {
    X(this.g, new dl(n));
};
Yt.prototype.za = function (n) {
    X(this.g, new fl());
};
Yt.prototype.ya = function () {
    X(this.g, "b");
};
function vg() {
    this.blockSize = -1;
}
function ve() {
    (this.blockSize = -1),
        (this.blockSize = 64),
        (this.g = Array(4)),
        (this.m = Array(this.blockSize)),
        (this.i = this.h = 0),
        this.reset();
}
W(ve, vg);
ve.prototype.reset = function () {
    (this.g[0] = 1732584193),
        (this.g[1] = 4023233417),
        (this.g[2] = 2562383102),
        (this.g[3] = 271733878),
        (this.i = this.h = 0);
};
function $i(n, e, t) {
    t || (t = 0);
    var r = Array(16);
    if (typeof e == "string")
        for (var i = 0; 16 > i; ++i)
            r[i] = e.charCodeAt(t++) | (e.charCodeAt(t++) << 8) | (e.charCodeAt(t++) << 16) | (e.charCodeAt(t++) << 24);
    else for (i = 0; 16 > i; ++i) r[i] = e[t++] | (e[t++] << 8) | (e[t++] << 16) | (e[t++] << 24);
    (e = n.g[0]), (t = n.g[1]), (i = n.g[2]);
    var s = n.g[3],
        o = (e + (s ^ (t & (i ^ s))) + r[0] + 3614090360) & 4294967295;
    (e = t + (((o << 7) & 4294967295) | (o >>> 25))),
        (o = (s + (i ^ (e & (t ^ i))) + r[1] + 3905402710) & 4294967295),
        (s = e + (((o << 12) & 4294967295) | (o >>> 20))),
        (o = (i + (t ^ (s & (e ^ t))) + r[2] + 606105819) & 4294967295),
        (i = s + (((o << 17) & 4294967295) | (o >>> 15))),
        (o = (t + (e ^ (i & (s ^ e))) + r[3] + 3250441966) & 4294967295),
        (t = i + (((o << 22) & 4294967295) | (o >>> 10))),
        (o = (e + (s ^ (t & (i ^ s))) + r[4] + 4118548399) & 4294967295),
        (e = t + (((o << 7) & 4294967295) | (o >>> 25))),
        (o = (s + (i ^ (e & (t ^ i))) + r[5] + 1200080426) & 4294967295),
        (s = e + (((o << 12) & 4294967295) | (o >>> 20))),
        (o = (i + (t ^ (s & (e ^ t))) + r[6] + 2821735955) & 4294967295),
        (i = s + (((o << 17) & 4294967295) | (o >>> 15))),
        (o = (t + (e ^ (i & (s ^ e))) + r[7] + 4249261313) & 4294967295),
        (t = i + (((o << 22) & 4294967295) | (o >>> 10))),
        (o = (e + (s ^ (t & (i ^ s))) + r[8] + 1770035416) & 4294967295),
        (e = t + (((o << 7) & 4294967295) | (o >>> 25))),
        (o = (s + (i ^ (e & (t ^ i))) + r[9] + 2336552879) & 4294967295),
        (s = e + (((o << 12) & 4294967295) | (o >>> 20))),
        (o = (i + (t ^ (s & (e ^ t))) + r[10] + 4294925233) & 4294967295),
        (i = s + (((o << 17) & 4294967295) | (o >>> 15))),
        (o = (t + (e ^ (i & (s ^ e))) + r[11] + 2304563134) & 4294967295),
        (t = i + (((o << 22) & 4294967295) | (o >>> 10))),
        (o = (e + (s ^ (t & (i ^ s))) + r[12] + 1804603682) & 4294967295),
        (e = t + (((o << 7) & 4294967295) | (o >>> 25))),
        (o = (s + (i ^ (e & (t ^ i))) + r[13] + 4254626195) & 4294967295),
        (s = e + (((o << 12) & 4294967295) | (o >>> 20))),
        (o = (i + (t ^ (s & (e ^ t))) + r[14] + 2792965006) & 4294967295),
        (i = s + (((o << 17) & 4294967295) | (o >>> 15))),
        (o = (t + (e ^ (i & (s ^ e))) + r[15] + 1236535329) & 4294967295),
        (t = i + (((o << 22) & 4294967295) | (o >>> 10))),
        (o = (e + (i ^ (s & (t ^ i))) + r[1] + 4129170786) & 4294967295),
        (e = t + (((o << 5) & 4294967295) | (o >>> 27))),
        (o = (s + (t ^ (i & (e ^ t))) + r[6] + 3225465664) & 4294967295),
        (s = e + (((o << 9) & 4294967295) | (o >>> 23))),
        (o = (i + (e ^ (t & (s ^ e))) + r[11] + 643717713) & 4294967295),
        (i = s + (((o << 14) & 4294967295) | (o >>> 18))),
        (o = (t + (s ^ (e & (i ^ s))) + r[0] + 3921069994) & 4294967295),
        (t = i + (((o << 20) & 4294967295) | (o >>> 12))),
        (o = (e + (i ^ (s & (t ^ i))) + r[5] + 3593408605) & 4294967295),
        (e = t + (((o << 5) & 4294967295) | (o >>> 27))),
        (o = (s + (t ^ (i & (e ^ t))) + r[10] + 38016083) & 4294967295),
        (s = e + (((o << 9) & 4294967295) | (o >>> 23))),
        (o = (i + (e ^ (t & (s ^ e))) + r[15] + 3634488961) & 4294967295),
        (i = s + (((o << 14) & 4294967295) | (o >>> 18))),
        (o = (t + (s ^ (e & (i ^ s))) + r[4] + 3889429448) & 4294967295),
        (t = i + (((o << 20) & 4294967295) | (o >>> 12))),
        (o = (e + (i ^ (s & (t ^ i))) + r[9] + 568446438) & 4294967295),
        (e = t + (((o << 5) & 4294967295) | (o >>> 27))),
        (o = (s + (t ^ (i & (e ^ t))) + r[14] + 3275163606) & 4294967295),
        (s = e + (((o << 9) & 4294967295) | (o >>> 23))),
        (o = (i + (e ^ (t & (s ^ e))) + r[3] + 4107603335) & 4294967295),
        (i = s + (((o << 14) & 4294967295) | (o >>> 18))),
        (o = (t + (s ^ (e & (i ^ s))) + r[8] + 1163531501) & 4294967295),
        (t = i + (((o << 20) & 4294967295) | (o >>> 12))),
        (o = (e + (i ^ (s & (t ^ i))) + r[13] + 2850285829) & 4294967295),
        (e = t + (((o << 5) & 4294967295) | (o >>> 27))),
        (o = (s + (t ^ (i & (e ^ t))) + r[2] + 4243563512) & 4294967295),
        (s = e + (((o << 9) & 4294967295) | (o >>> 23))),
        (o = (i + (e ^ (t & (s ^ e))) + r[7] + 1735328473) & 4294967295),
        (i = s + (((o << 14) & 4294967295) | (o >>> 18))),
        (o = (t + (s ^ (e & (i ^ s))) + r[12] + 2368359562) & 4294967295),
        (t = i + (((o << 20) & 4294967295) | (o >>> 12))),
        (o = (e + (t ^ i ^ s) + r[5] + 4294588738) & 4294967295),
        (e = t + (((o << 4) & 4294967295) | (o >>> 28))),
        (o = (s + (e ^ t ^ i) + r[8] + 2272392833) & 4294967295),
        (s = e + (((o << 11) & 4294967295) | (o >>> 21))),
        (o = (i + (s ^ e ^ t) + r[11] + 1839030562) & 4294967295),
        (i = s + (((o << 16) & 4294967295) | (o >>> 16))),
        (o = (t + (i ^ s ^ e) + r[14] + 4259657740) & 4294967295),
        (t = i + (((o << 23) & 4294967295) | (o >>> 9))),
        (o = (e + (t ^ i ^ s) + r[1] + 2763975236) & 4294967295),
        (e = t + (((o << 4) & 4294967295) | (o >>> 28))),
        (o = (s + (e ^ t ^ i) + r[4] + 1272893353) & 4294967295),
        (s = e + (((o << 11) & 4294967295) | (o >>> 21))),
        (o = (i + (s ^ e ^ t) + r[7] + 4139469664) & 4294967295),
        (i = s + (((o << 16) & 4294967295) | (o >>> 16))),
        (o = (t + (i ^ s ^ e) + r[10] + 3200236656) & 4294967295),
        (t = i + (((o << 23) & 4294967295) | (o >>> 9))),
        (o = (e + (t ^ i ^ s) + r[13] + 681279174) & 4294967295),
        (e = t + (((o << 4) & 4294967295) | (o >>> 28))),
        (o = (s + (e ^ t ^ i) + r[0] + 3936430074) & 4294967295),
        (s = e + (((o << 11) & 4294967295) | (o >>> 21))),
        (o = (i + (s ^ e ^ t) + r[3] + 3572445317) & 4294967295),
        (i = s + (((o << 16) & 4294967295) | (o >>> 16))),
        (o = (t + (i ^ s ^ e) + r[6] + 76029189) & 4294967295),
        (t = i + (((o << 23) & 4294967295) | (o >>> 9))),
        (o = (e + (t ^ i ^ s) + r[9] + 3654602809) & 4294967295),
        (e = t + (((o << 4) & 4294967295) | (o >>> 28))),
        (o = (s + (e ^ t ^ i) + r[12] + 3873151461) & 4294967295),
        (s = e + (((o << 11) & 4294967295) | (o >>> 21))),
        (o = (i + (s ^ e ^ t) + r[15] + 530742520) & 4294967295),
        (i = s + (((o << 16) & 4294967295) | (o >>> 16))),
        (o = (t + (i ^ s ^ e) + r[2] + 3299628645) & 4294967295),
        (t = i + (((o << 23) & 4294967295) | (o >>> 9))),
        (o = (e + (i ^ (t | ~s)) + r[0] + 4096336452) & 4294967295),
        (e = t + (((o << 6) & 4294967295) | (o >>> 26))),
        (o = (s + (t ^ (e | ~i)) + r[7] + 1126891415) & 4294967295),
        (s = e + (((o << 10) & 4294967295) | (o >>> 22))),
        (o = (i + (e ^ (s | ~t)) + r[14] + 2878612391) & 4294967295),
        (i = s + (((o << 15) & 4294967295) | (o >>> 17))),
        (o = (t + (s ^ (i | ~e)) + r[5] + 4237533241) & 4294967295),
        (t = i + (((o << 21) & 4294967295) | (o >>> 11))),
        (o = (e + (i ^ (t | ~s)) + r[12] + 1700485571) & 4294967295),
        (e = t + (((o << 6) & 4294967295) | (o >>> 26))),
        (o = (s + (t ^ (e | ~i)) + r[3] + 2399980690) & 4294967295),
        (s = e + (((o << 10) & 4294967295) | (o >>> 22))),
        (o = (i + (e ^ (s | ~t)) + r[10] + 4293915773) & 4294967295),
        (i = s + (((o << 15) & 4294967295) | (o >>> 17))),
        (o = (t + (s ^ (i | ~e)) + r[1] + 2240044497) & 4294967295),
        (t = i + (((o << 21) & 4294967295) | (o >>> 11))),
        (o = (e + (i ^ (t | ~s)) + r[8] + 1873313359) & 4294967295),
        (e = t + (((o << 6) & 4294967295) | (o >>> 26))),
        (o = (s + (t ^ (e | ~i)) + r[15] + 4264355552) & 4294967295),
        (s = e + (((o << 10) & 4294967295) | (o >>> 22))),
        (o = (i + (e ^ (s | ~t)) + r[6] + 2734768916) & 4294967295),
        (i = s + (((o << 15) & 4294967295) | (o >>> 17))),
        (o = (t + (s ^ (i | ~e)) + r[13] + 1309151649) & 4294967295),
        (t = i + (((o << 21) & 4294967295) | (o >>> 11))),
        (o = (e + (i ^ (t | ~s)) + r[4] + 4149444226) & 4294967295),
        (e = t + (((o << 6) & 4294967295) | (o >>> 26))),
        (o = (s + (t ^ (e | ~i)) + r[11] + 3174756917) & 4294967295),
        (s = e + (((o << 10) & 4294967295) | (o >>> 22))),
        (o = (i + (e ^ (s | ~t)) + r[2] + 718787259) & 4294967295),
        (i = s + (((o << 15) & 4294967295) | (o >>> 17))),
        (o = (t + (s ^ (i | ~e)) + r[9] + 3951481745) & 4294967295),
        (n.g[0] = (n.g[0] + e) & 4294967295),
        (n.g[1] = (n.g[1] + (i + (((o << 21) & 4294967295) | (o >>> 11)))) & 4294967295),
        (n.g[2] = (n.g[2] + i) & 4294967295),
        (n.g[3] = (n.g[3] + s) & 4294967295);
}
ve.prototype.j = function (n, e) {
    e === void 0 && (e = n.length);
    for (var t = e - this.blockSize, r = this.m, i = this.h, s = 0; s < e; ) {
        if (i == 0) for (; s <= t; ) $i(this, n, s), (s += this.blockSize);
        if (typeof n == "string") {
            for (; s < e; )
                if (((r[i++] = n.charCodeAt(s++)), i == this.blockSize)) {
                    $i(this, r), (i = 0);
                    break;
                }
        } else
            for (; s < e; )
                if (((r[i++] = n[s++]), i == this.blockSize)) {
                    $i(this, r), (i = 0);
                    break;
                }
    }
    (this.h = i), (this.i += e);
};
ve.prototype.l = function () {
    var n = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
    n[0] = 128;
    for (var e = 1; e < n.length - 8; ++e) n[e] = 0;
    var t = 8 * this.i;
    for (e = n.length - 8; e < n.length; ++e) (n[e] = t & 255), (t /= 256);
    for (this.j(n), n = Array(16), e = t = 0; 4 > e; ++e)
        for (var r = 0; 32 > r; r += 8) n[t++] = (this.g[e] >>> r) & 255;
    return n;
};
function N(n, e) {
    this.h = e;
    for (var t = [], r = !0, i = n.length - 1; 0 <= i; i--) {
        var s = n[i] | 0;
        (r && s == e) || ((t[i] = s), (r = !1));
    }
    this.g = t;
}
var Eg = {};
function lo(n) {
    return -128 <= n && 128 > n
        ? Sm(n, function (e) {
              return new N([e | 0], 0 > e ? -1 : 0);
          })
        : new N([n | 0], 0 > n ? -1 : 0);
}
function Ae(n) {
    if (isNaN(n) || !isFinite(n)) return Ot;
    if (0 > n) return J(Ae(-n));
    for (var e = [], t = 1, r = 0; n >= t; r++) (e[r] = (n / t) | 0), (t *= ps);
    return new N(e, 0);
}
function pl(n, e) {
    if (n.length == 0) throw Error("number format error: empty string");
    if (((e = e || 10), 2 > e || 36 < e)) throw Error("radix out of range: " + e);
    if (n.charAt(0) == "-") return J(pl(n.substring(1), e));
    if (0 <= n.indexOf("-")) throw Error('number format error: interior "-" character');
    for (var t = Ae(Math.pow(e, 8)), r = Ot, i = 0; i < n.length; i += 8) {
        var s = Math.min(8, n.length - i),
            o = parseInt(n.substring(i, i + s), e);
        8 > s ? ((s = Ae(Math.pow(e, s))), (r = r.R(s).add(Ae(o)))) : ((r = r.R(t)), (r = r.add(Ae(o))));
    }
    return r;
}
var ps = 4294967296,
    Ot = lo(0),
    ms = lo(1),
    xa = lo(16777216);
g = N.prototype;
g.ea = function () {
    if (pe(this)) return -J(this).ea();
    for (var n = 0, e = 1, t = 0; t < this.g.length; t++) {
        var r = this.D(t);
        (n += (0 <= r ? r : ps + r) * e), (e *= ps);
    }
    return n;
};
g.toString = function (n) {
    if (((n = n || 10), 2 > n || 36 < n)) throw Error("radix out of range: " + n);
    if (Ve(this)) return "0";
    if (pe(this)) return "-" + J(this).toString(n);
    for (var e = Ae(Math.pow(n, 6)), t = this, r = ""; ; ) {
        var i = Or(t, e).g;
        t = Nr(t, i.R(e));
        var s = ((0 < t.g.length ? t.g[0] : t.h) >>> 0).toString(n);
        if (((t = i), Ve(t))) return s + r;
        for (; 6 > s.length; ) s = "0" + s;
        r = s + r;
    }
};
g.D = function (n) {
    return 0 > n ? 0 : n < this.g.length ? this.g[n] : this.h;
};
function Ve(n) {
    if (n.h != 0) return !1;
    for (var e = 0; e < n.g.length; e++) if (n.g[e] != 0) return !1;
    return !0;
}
function pe(n) {
    return n.h == -1;
}
g.X = function (n) {
    return (n = Nr(this, n)), pe(n) ? -1 : Ve(n) ? 0 : 1;
};
function J(n) {
    for (var e = n.g.length, t = [], r = 0; r < e; r++) t[r] = ~n.g[r];
    return new N(t, ~n.h).add(ms);
}
g.abs = function () {
    return pe(this) ? J(this) : this;
};
g.add = function (n) {
    for (var e = Math.max(this.g.length, n.g.length), t = [], r = 0, i = 0; i <= e; i++) {
        var s = r + (this.D(i) & 65535) + (n.D(i) & 65535),
            o = (s >>> 16) + (this.D(i) >>> 16) + (n.D(i) >>> 16);
        (r = o >>> 16), (s &= 65535), (o &= 65535), (t[i] = (o << 16) | s);
    }
    return new N(t, t[t.length - 1] & -2147483648 ? -1 : 0);
};
function Nr(n, e) {
    return n.add(J(e));
}
g.R = function (n) {
    if (Ve(this) || Ve(n)) return Ot;
    if (pe(this)) return pe(n) ? J(this).R(J(n)) : J(J(this).R(n));
    if (pe(n)) return J(this.R(J(n)));
    if (0 > this.X(xa) && 0 > n.X(xa)) return Ae(this.ea() * n.ea());
    for (var e = this.g.length + n.g.length, t = [], r = 0; r < 2 * e; r++) t[r] = 0;
    for (r = 0; r < this.g.length; r++)
        for (var i = 0; i < n.g.length; i++) {
            var s = this.D(r) >>> 16,
                o = this.D(r) & 65535,
                a = n.D(i) >>> 16,
                c = n.D(i) & 65535;
            (t[2 * r + 2 * i] += o * c),
                cr(t, 2 * r + 2 * i),
                (t[2 * r + 2 * i + 1] += s * c),
                cr(t, 2 * r + 2 * i + 1),
                (t[2 * r + 2 * i + 1] += o * a),
                cr(t, 2 * r + 2 * i + 1),
                (t[2 * r + 2 * i + 2] += s * a),
                cr(t, 2 * r + 2 * i + 2);
        }
    for (r = 0; r < e; r++) t[r] = (t[2 * r + 1] << 16) | t[2 * r];
    for (r = e; r < 2 * e; r++) t[r] = 0;
    return new N(t, 0);
};
function cr(n, e) {
    for (; (n[e] & 65535) != n[e]; ) (n[e + 1] += n[e] >>> 16), (n[e] &= 65535), e++;
}
function rn(n, e) {
    (this.g = n), (this.h = e);
}
function Or(n, e) {
    if (Ve(e)) throw Error("division by zero");
    if (Ve(n)) return new rn(Ot, Ot);
    if (pe(n)) return (e = Or(J(n), e)), new rn(J(e.g), J(e.h));
    if (pe(e)) return (e = Or(n, J(e))), new rn(J(e.g), e.h);
    if (30 < n.g.length) {
        if (pe(n) || pe(e)) throw Error("slowDivide_ only works with positive integers.");
        for (var t = ms, r = e; 0 >= r.X(n); ) (t = Fa(t)), (r = Fa(r));
        var i = Pt(t, 1),
            s = Pt(r, 1);
        for (r = Pt(r, 2), t = Pt(t, 2); !Ve(r); ) {
            var o = s.add(r);
            0 >= o.X(n) && ((i = i.add(t)), (s = o)), (r = Pt(r, 1)), (t = Pt(t, 1));
        }
        return (e = Nr(n, i.R(e))), new rn(i, e);
    }
    for (i = Ot; 0 <= n.X(e); ) {
        for (
            t = Math.max(1, Math.floor(n.ea() / e.ea())),
                r = Math.ceil(Math.log(t) / Math.LN2),
                r = 48 >= r ? 1 : Math.pow(2, r - 48),
                s = Ae(t),
                o = s.R(e);
            pe(o) || 0 < o.X(n);

        )
            (t -= r), (s = Ae(t)), (o = s.R(e));
        Ve(s) && (s = ms), (i = i.add(s)), (n = Nr(n, o));
    }
    return new rn(i, n);
}
g.gb = function (n) {
    return Or(this, n).h;
};
g.and = function (n) {
    for (var e = Math.max(this.g.length, n.g.length), t = [], r = 0; r < e; r++) t[r] = this.D(r) & n.D(r);
    return new N(t, this.h & n.h);
};
g.or = function (n) {
    for (var e = Math.max(this.g.length, n.g.length), t = [], r = 0; r < e; r++) t[r] = this.D(r) | n.D(r);
    return new N(t, this.h | n.h);
};
g.xor = function (n) {
    for (var e = Math.max(this.g.length, n.g.length), t = [], r = 0; r < e; r++) t[r] = this.D(r) ^ n.D(r);
    return new N(t, this.h ^ n.h);
};
function Fa(n) {
    for (var e = n.g.length + 1, t = [], r = 0; r < e; r++) t[r] = (n.D(r) << 1) | (n.D(r - 1) >>> 31);
    return new N(t, n.h);
}
function Pt(n, e) {
    var t = e >> 5;
    e %= 32;
    for (var r = n.g.length - t, i = [], s = 0; s < r; s++)
        i[s] = 0 < e ? (n.D(s + t) >>> e) | (n.D(s + t + 1) << (32 - e)) : n.D(s + t);
    return new N(i, n.h);
}
Vr.prototype.createWebChannel = Vr.prototype.g;
de.prototype.send = de.prototype.u;
de.prototype.open = de.prototype.m;
de.prototype.close = de.prototype.close;
ri.NO_ERROR = 0;
ri.TIMEOUT = 8;
ri.HTTP_ERROR = 6;
Du.COMPLETE = "complete";
Vu.EventType = $n;
$n.OPEN = "a";
$n.CLOSE = "b";
$n.ERROR = "c";
$n.MESSAGE = "d";
G.prototype.listen = G.prototype.O;
F.prototype.listenOnce = F.prototype.P;
F.prototype.getLastError = F.prototype.Sa;
F.prototype.getLastErrorCode = F.prototype.Ia;
F.prototype.getStatus = F.prototype.da;
F.prototype.getResponseJson = F.prototype.Wa;
F.prototype.getResponseText = F.prototype.ja;
F.prototype.send = F.prototype.ha;
F.prototype.setWithCredentials = F.prototype.Oa;
ve.prototype.digest = ve.prototype.l;
ve.prototype.reset = ve.prototype.reset;
ve.prototype.update = ve.prototype.j;
N.prototype.add = N.prototype.add;
N.prototype.multiply = N.prototype.R;
N.prototype.modulo = N.prototype.gb;
N.prototype.compare = N.prototype.X;
N.prototype.toNumber = N.prototype.ea;
N.prototype.toString = N.prototype.toString;
N.prototype.getBits = N.prototype.D;
N.fromNumber = Ae;
N.fromString = pl;
var Ig = function () {
        return new Vr();
    },
    Tg = function () {
        return ni();
    },
    zi = ri,
    wg = Du,
    Ag = Tt,
    Ua = {
        xb: 0,
        Ab: 1,
        Bb: 2,
        Ub: 3,
        Zb: 4,
        Wb: 5,
        Xb: 6,
        Vb: 7,
        Tb: 8,
        Yb: 9,
        PROXY: 10,
        NOPROXY: 11,
        Rb: 12,
        Nb: 13,
        Ob: 14,
        Mb: 15,
        Pb: 16,
        Qb: 17,
        tb: 18,
        sb: 19,
        ub: 20,
    },
    Rg = Gn,
    ur = Vu,
    Pg = F,
    Sg = ve,
    Mt = N;
const Ba = "@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ne {
    constructor(e) {
        this.uid = e;
    }
    isAuthenticated() {
        return this.uid != null;
    }
    toKey() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }
    isEqual(e) {
        return e.uid === this.uid;
    }
}
(ne.UNAUTHENTICATED = new ne(null)),
    (ne.GOOGLE_CREDENTIALS = new ne("google-credentials-uid")),
    (ne.FIRST_PARTY = new ne("first-party-uid")),
    (ne.MOCK_USER = new ne("mock-user"));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let Xt = "10.11.1";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const vt = new ks("@firebase/firestore");
function sn() {
    return vt.logLevel;
}
function y(n, ...e) {
    if (vt.logLevel <= b.DEBUG) {
        const t = e.map(ho);
        vt.debug(`Firestore (${Xt}): ${n}`, ...t);
    }
}
function xe(n, ...e) {
    if (vt.logLevel <= b.ERROR) {
        const t = e.map(ho);
        vt.error(`Firestore (${Xt}): ${n}`, ...t);
    }
}
function Bt(n, ...e) {
    if (vt.logLevel <= b.WARN) {
        const t = e.map(ho);
        vt.warn(`Firestore (${Xt}): ${n}`, ...t);
    }
}
function ho(n) {
    if (typeof n == "string") return n;
    try {
        /**
         * @license
         * Copyright 2020 Google LLC
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */ return (function (t) {
            return JSON.stringify(t);
        })(n);
    } catch {
        return n;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function A(n = "Unexpected state") {
    const e = `FIRESTORE (${Xt}) INTERNAL ASSERTION FAILED: ` + n;
    throw (xe(e), new Error(e));
}
function M(n, e) {
    n || A();
}
function S(n, e) {
    return n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const f = {
    OK: "ok",
    CANCELLED: "cancelled",
    UNKNOWN: "unknown",
    INVALID_ARGUMENT: "invalid-argument",
    DEADLINE_EXCEEDED: "deadline-exceeded",
    NOT_FOUND: "not-found",
    ALREADY_EXISTS: "already-exists",
    PERMISSION_DENIED: "permission-denied",
    UNAUTHENTICATED: "unauthenticated",
    RESOURCE_EXHAUSTED: "resource-exhausted",
    FAILED_PRECONDITION: "failed-precondition",
    ABORTED: "aborted",
    OUT_OF_RANGE: "out-of-range",
    UNIMPLEMENTED: "unimplemented",
    INTERNAL: "internal",
    UNAVAILABLE: "unavailable",
    DATA_LOSS: "data-loss",
};
class _ extends Be {
    constructor(e, t) {
        super(e, t),
            (this.code = e),
            (this.message = t),
            (this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Oe {
    constructor() {
        this.promise = new Promise((e, t) => {
            (this.resolve = e), (this.reject = t);
        });
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ml {
    constructor(e, t) {
        (this.user = t),
            (this.type = "OAuth"),
            (this.headers = new Map()),
            this.headers.set("Authorization", `Bearer ${e}`);
    }
}
class Cg {
    getToken() {
        return Promise.resolve(null);
    }
    invalidateToken() {}
    start(e, t) {
        e.enqueueRetryable(() => t(ne.UNAUTHENTICATED));
    }
    shutdown() {}
}
class bg {
    constructor(e) {
        (this.token = e), (this.changeListener = null);
    }
    getToken() {
        return Promise.resolve(this.token);
    }
    invalidateToken() {}
    start(e, t) {
        (this.changeListener = t), e.enqueueRetryable(() => t(this.token.user));
    }
    shutdown() {
        this.changeListener = null;
    }
}
class kg {
    constructor(e) {
        (this.t = e),
            (this.currentUser = ne.UNAUTHENTICATED),
            (this.i = 0),
            (this.forceRefresh = !1),
            (this.auth = null);
    }
    start(e, t) {
        let r = this.i;
        const i = (c) => (this.i !== r ? ((r = this.i), t(c)) : Promise.resolve());
        let s = new Oe();
        this.o = () => {
            this.i++,
                (this.currentUser = this.u()),
                s.resolve(),
                (s = new Oe()),
                e.enqueueRetryable(() => i(this.currentUser));
        };
        const o = () => {
                const c = s;
                e.enqueueRetryable(async () => {
                    await c.promise, await i(this.currentUser);
                });
            },
            a = (c) => {
                y("FirebaseAuthCredentialsProvider", "Auth detected"),
                    (this.auth = c),
                    this.auth.addAuthTokenListener(this.o),
                    o();
            };
        this.t.onInit((c) => a(c)),
            setTimeout(() => {
                if (!this.auth) {
                    const c = this.t.getImmediate({ optional: !0 });
                    c
                        ? a(c)
                        : (y("FirebaseAuthCredentialsProvider", "Auth not yet detected"), s.resolve(), (s = new Oe()));
                }
            }, 0),
            o();
    }
    getToken() {
        const e = this.i,
            t = this.forceRefresh;
        return (
            (this.forceRefresh = !1),
            this.auth
                ? this.auth
                      .getToken(t)
                      .then((r) =>
                          this.i !== e
                              ? (y("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."),
                                this.getToken())
                              : r
                                ? (M(typeof r.accessToken == "string"), new ml(r.accessToken, this.currentUser))
                                : null,
                      )
                : Promise.resolve(null)
        );
    }
    invalidateToken() {
        this.forceRefresh = !0;
    }
    shutdown() {
        this.auth && this.auth.removeAuthTokenListener(this.o);
    }
    u() {
        const e = this.auth && this.auth.getUid();
        return M(e === null || typeof e == "string"), new ne(e);
    }
}
class Dg {
    constructor(e, t, r) {
        (this.l = e),
            (this.h = t),
            (this.P = r),
            (this.type = "FirstParty"),
            (this.user = ne.FIRST_PARTY),
            (this.I = new Map());
    }
    T() {
        return this.P ? this.P() : null;
    }
    get headers() {
        this.I.set("X-Goog-AuthUser", this.l);
        const e = this.T();
        return (
            e && this.I.set("Authorization", e), this.h && this.I.set("X-Goog-Iam-Authorization-Token", this.h), this.I
        );
    }
}
class Vg {
    constructor(e, t, r) {
        (this.l = e), (this.h = t), (this.P = r);
    }
    getToken() {
        return Promise.resolve(new Dg(this.l, this.h, this.P));
    }
    start(e, t) {
        e.enqueueRetryable(() => t(ne.FIRST_PARTY));
    }
    shutdown() {}
    invalidateToken() {}
}
class Ng {
    constructor(e) {
        (this.value = e),
            (this.type = "AppCheck"),
            (this.headers = new Map()),
            e && e.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
    }
}
class Og {
    constructor(e) {
        (this.A = e), (this.forceRefresh = !1), (this.appCheck = null), (this.R = null);
    }
    start(e, t) {
        const r = (s) => {
            s.error != null &&
                y(
                    "FirebaseAppCheckTokenProvider",
                    `Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`,
                );
            const o = s.token !== this.R;
            return (
                (this.R = s.token),
                y("FirebaseAppCheckTokenProvider", `Received ${o ? "new" : "existing"} token.`),
                o ? t(s.token) : Promise.resolve()
            );
        };
        this.o = (s) => {
            e.enqueueRetryable(() => r(s));
        };
        const i = (s) => {
            y("FirebaseAppCheckTokenProvider", "AppCheck detected"),
                (this.appCheck = s),
                this.appCheck.addTokenListener(this.o);
        };
        this.A.onInit((s) => i(s)),
            setTimeout(() => {
                if (!this.appCheck) {
                    const s = this.A.getImmediate({ optional: !0 });
                    s ? i(s) : y("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
                }
            }, 0);
    }
    getToken() {
        const e = this.forceRefresh;
        return (
            (this.forceRefresh = !1),
            this.appCheck
                ? this.appCheck
                      .getToken(e)
                      .then((t) => (t ? (M(typeof t.token == "string"), (this.R = t.token), new Ng(t.token)) : null))
                : Promise.resolve(null)
        );
    }
    invalidateToken() {
        this.forceRefresh = !0;
    }
    shutdown() {
        this.appCheck && this.appCheck.removeTokenListener(this.o);
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Mg(n) {
    const e = typeof self < "u" && (self.crypto || self.msCrypto),
        t = new Uint8Array(n);
    if (e && typeof e.getRandomValues == "function") e.getRandomValues(t);
    else for (let r = 0; r < n; r++) t[r] = Math.floor(256 * Math.random());
    return t;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gl {
    static newId() {
        const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            t = Math.floor(256 / e.length) * e.length;
        let r = "";
        for (; r.length < 20; ) {
            const i = Mg(40);
            for (let s = 0; s < i.length; ++s) r.length < 20 && i[s] < t && (r += e.charAt(i[s] % e.length));
        }
        return r;
    }
}
function D(n, e) {
    return n < e ? -1 : n > e ? 1 : 0;
}
function qt(n, e, t) {
    return n.length === e.length && n.every((r, i) => t(r, e[i]));
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class z {
    constructor(e, t) {
        if (((this.seconds = e), (this.nanoseconds = t), t < 0))
            throw new _(f.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
        if (t >= 1e9) throw new _(f.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
        if (e < -62135596800) throw new _(f.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
        if (e >= 253402300800) throw new _(f.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
    }
    static now() {
        return z.fromMillis(Date.now());
    }
    static fromDate(e) {
        return z.fromMillis(e.getTime());
    }
    static fromMillis(e) {
        const t = Math.floor(e / 1e3),
            r = Math.floor(1e6 * (e - 1e3 * t));
        return new z(t, r);
    }
    toDate() {
        return new Date(this.toMillis());
    }
    toMillis() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }
    _compareTo(e) {
        return this.seconds === e.seconds ? D(this.nanoseconds, e.nanoseconds) : D(this.seconds, e.seconds);
    }
    isEqual(e) {
        return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
    }
    toString() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }
    toJSON() {
        return { seconds: this.seconds, nanoseconds: this.nanoseconds };
    }
    valueOf() {
        const e = this.seconds - -62135596800;
        return String(e).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class P {
    constructor(e) {
        this.timestamp = e;
    }
    static fromTimestamp(e) {
        return new P(e);
    }
    static min() {
        return new P(new z(0, 0));
    }
    static max() {
        return new P(new z(253402300799, 999999999));
    }
    compareTo(e) {
        return this.timestamp._compareTo(e.timestamp);
    }
    isEqual(e) {
        return this.timestamp.isEqual(e.timestamp);
    }
    toMicroseconds() {
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }
    toString() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }
    toTimestamp() {
        return this.timestamp;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class bn {
    constructor(e, t, r) {
        t === void 0 ? (t = 0) : t > e.length && A(),
            r === void 0 ? (r = e.length - t) : r > e.length - t && A(),
            (this.segments = e),
            (this.offset = t),
            (this.len = r);
    }
    get length() {
        return this.len;
    }
    isEqual(e) {
        return bn.comparator(this, e) === 0;
    }
    child(e) {
        const t = this.segments.slice(this.offset, this.limit());
        return (
            e instanceof bn
                ? e.forEach((r) => {
                      t.push(r);
                  })
                : t.push(e),
            this.construct(t)
        );
    }
    limit() {
        return this.offset + this.length;
    }
    popFirst(e) {
        return (e = e === void 0 ? 1 : e), this.construct(this.segments, this.offset + e, this.length - e);
    }
    popLast() {
        return this.construct(this.segments, this.offset, this.length - 1);
    }
    firstSegment() {
        return this.segments[this.offset];
    }
    lastSegment() {
        return this.get(this.length - 1);
    }
    get(e) {
        return this.segments[this.offset + e];
    }
    isEmpty() {
        return this.length === 0;
    }
    isPrefixOf(e) {
        if (e.length < this.length) return !1;
        for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
        return !0;
    }
    isImmediateParentOf(e) {
        if (this.length + 1 !== e.length) return !1;
        for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
        return !0;
    }
    forEach(e) {
        for (let t = this.offset, r = this.limit(); t < r; t++) e(this.segments[t]);
    }
    toArray() {
        return this.segments.slice(this.offset, this.limit());
    }
    static comparator(e, t) {
        const r = Math.min(e.length, t.length);
        for (let i = 0; i < r; i++) {
            const s = e.get(i),
                o = t.get(i);
            if (s < o) return -1;
            if (s > o) return 1;
        }
        return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
    }
}
class O extends bn {
    construct(e, t, r) {
        return new O(e, t, r);
    }
    canonicalString() {
        return this.toArray().join("/");
    }
    toString() {
        return this.canonicalString();
    }
    toUriEncodedString() {
        return this.toArray().map(encodeURIComponent).join("/");
    }
    static fromString(...e) {
        const t = [];
        for (const r of e) {
            if (r.indexOf("//") >= 0)
                throw new _(f.INVALID_ARGUMENT, `Invalid segment (${r}). Paths must not contain // in them.`);
            t.push(...r.split("/").filter((i) => i.length > 0));
        }
        return new O(t);
    }
    static emptyPath() {
        return new O([]);
    }
}
const Lg = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class Y extends bn {
    construct(e, t, r) {
        return new Y(e, t, r);
    }
    static isValidIdentifier(e) {
        return Lg.test(e);
    }
    canonicalString() {
        return this.toArray()
            .map(
                (e) => (
                    (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
                    Y.isValidIdentifier(e) || (e = "`" + e + "`"),
                    e
                ),
            )
            .join(".");
    }
    toString() {
        return this.canonicalString();
    }
    isKeyField() {
        return this.length === 1 && this.get(0) === "__name__";
    }
    static keyField() {
        return new Y(["__name__"]);
    }
    static fromServerFormat(e) {
        const t = [];
        let r = "",
            i = 0;
        const s = () => {
            if (r.length === 0)
                throw new _(
                    f.INVALID_ARGUMENT,
                    `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
                );
            t.push(r), (r = "");
        };
        let o = !1;
        for (; i < e.length; ) {
            const a = e[i];
            if (a === "\\") {
                if (i + 1 === e.length) throw new _(f.INVALID_ARGUMENT, "Path has trailing escape character: " + e);
                const c = e[i + 1];
                if (c !== "\\" && c !== "." && c !== "`")
                    throw new _(f.INVALID_ARGUMENT, "Path has invalid escape sequence: " + e);
                (r += c), (i += 2);
            } else a === "`" ? ((o = !o), i++) : a !== "." || o ? ((r += a), i++) : (s(), i++);
        }
        if ((s(), o)) throw new _(f.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
        return new Y(t);
    }
    static emptyPath() {
        return new Y([]);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class E {
    constructor(e) {
        this.path = e;
    }
    static fromPath(e) {
        return new E(O.fromString(e));
    }
    static fromName(e) {
        return new E(O.fromString(e).popFirst(5));
    }
    static empty() {
        return new E(O.emptyPath());
    }
    get collectionGroup() {
        return this.path.popLast().lastSegment();
    }
    hasCollectionId(e) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
    }
    getCollectionGroup() {
        return this.path.get(this.path.length - 2);
    }
    getCollectionPath() {
        return this.path.popLast();
    }
    isEqual(e) {
        return e !== null && O.comparator(this.path, e.path) === 0;
    }
    toString() {
        return this.path.toString();
    }
    static comparator(e, t) {
        return O.comparator(e.path, t.path);
    }
    static isDocumentKey(e) {
        return e.length % 2 == 0;
    }
    static fromSegments(e) {
        return new E(new O(e.slice()));
    }
}
function xg(n, e) {
    const t = n.toTimestamp().seconds,
        r = n.toTimestamp().nanoseconds + 1,
        i = P.fromTimestamp(r === 1e9 ? new z(t + 1, 0) : new z(t, r));
    return new Xe(i, E.empty(), e);
}
function Fg(n) {
    return new Xe(n.readTime, n.key, -1);
}
class Xe {
    constructor(e, t, r) {
        (this.readTime = e), (this.documentKey = t), (this.largestBatchId = r);
    }
    static min() {
        return new Xe(P.min(), E.empty(), -1);
    }
    static max() {
        return new Xe(P.max(), E.empty(), -1);
    }
}
function Ug(n, e) {
    let t = n.readTime.compareTo(e.readTime);
    return t !== 0
        ? t
        : ((t = E.comparator(n.documentKey, e.documentKey)), t !== 0 ? t : D(n.largestBatchId, e.largestBatchId));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Bg =
    "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
class qg {
    constructor() {
        this.onCommittedListeners = [];
    }
    addOnCommittedListener(e) {
        this.onCommittedListeners.push(e);
    }
    raiseOnCommittedEvent() {
        this.onCommittedListeners.forEach((e) => e());
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Qn(n) {
    if (n.code !== f.FAILED_PRECONDITION || n.message !== Bg) throw n;
    y("LocalStore", "Unexpectedly lost primary lease");
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class m {
    constructor(e) {
        (this.nextCallback = null),
            (this.catchCallback = null),
            (this.result = void 0),
            (this.error = void 0),
            (this.isDone = !1),
            (this.callbackAttached = !1),
            e(
                (t) => {
                    (this.isDone = !0), (this.result = t), this.nextCallback && this.nextCallback(t);
                },
                (t) => {
                    (this.isDone = !0), (this.error = t), this.catchCallback && this.catchCallback(t);
                },
            );
    }
    catch(e) {
        return this.next(void 0, e);
    }
    next(e, t) {
        return (
            this.callbackAttached && A(),
            (this.callbackAttached = !0),
            this.isDone
                ? this.error
                    ? this.wrapFailure(t, this.error)
                    : this.wrapSuccess(e, this.result)
                : new m((r, i) => {
                      (this.nextCallback = (s) => {
                          this.wrapSuccess(e, s).next(r, i);
                      }),
                          (this.catchCallback = (s) => {
                              this.wrapFailure(t, s).next(r, i);
                          });
                  })
        );
    }
    toPromise() {
        return new Promise((e, t) => {
            this.next(e, t);
        });
    }
    wrapUserFunction(e) {
        try {
            const t = e();
            return t instanceof m ? t : m.resolve(t);
        } catch (t) {
            return m.reject(t);
        }
    }
    wrapSuccess(e, t) {
        return e ? this.wrapUserFunction(() => e(t)) : m.resolve(t);
    }
    wrapFailure(e, t) {
        return e ? this.wrapUserFunction(() => e(t)) : m.reject(t);
    }
    static resolve(e) {
        return new m((t, r) => {
            t(e);
        });
    }
    static reject(e) {
        return new m((t, r) => {
            r(e);
        });
    }
    static waitFor(e) {
        return new m((t, r) => {
            let i = 0,
                s = 0,
                o = !1;
            e.forEach((a) => {
                ++i,
                    a.next(
                        () => {
                            ++s, o && s === i && t();
                        },
                        (c) => r(c),
                    );
            }),
                (o = !0),
                s === i && t();
        });
    }
    static or(e) {
        let t = m.resolve(!1);
        for (const r of e) t = t.next((i) => (i ? m.resolve(i) : r()));
        return t;
    }
    static forEach(e, t) {
        const r = [];
        return (
            e.forEach((i, s) => {
                r.push(t.call(this, i, s));
            }),
            this.waitFor(r)
        );
    }
    static mapArray(e, t) {
        return new m((r, i) => {
            const s = e.length,
                o = new Array(s);
            let a = 0;
            for (let c = 0; c < s; c++) {
                const u = c;
                t(e[u]).next(
                    (l) => {
                        (o[u] = l), ++a, a === s && r(o);
                    },
                    (l) => i(l),
                );
            }
        });
    }
    static doWhile(e, t) {
        return new m((r, i) => {
            const s = () => {
                e() === !0
                    ? t().next(() => {
                          s();
                      }, i)
                    : r();
            };
            s();
        });
    }
}
function jg(n) {
    const e = n.match(/Android ([\d.]+)/i),
        t = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
    return Number(t);
}
function Jn(n) {
    return n.name === "IndexedDbTransactionError";
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class fo {
    constructor(e, t) {
        (this.previousValue = e),
            t && ((t.sequenceNumberHandler = (r) => this.ie(r)), (this.se = (r) => t.writeSequenceNumber(r)));
    }
    ie(e) {
        return (this.previousValue = Math.max(e, this.previousValue)), this.previousValue;
    }
    next() {
        const e = ++this.previousValue;
        return this.se && this.se(e), e;
    }
}
fo.oe = -1;
function hi(n) {
    return n == null;
}
function Mr(n) {
    return n === 0 && 1 / n == -1 / 0;
}
function $g(n) {
    return (
        typeof n == "number" &&
        Number.isInteger(n) &&
        !Mr(n) &&
        n <= Number.MAX_SAFE_INTEGER &&
        n >= Number.MIN_SAFE_INTEGER
    );
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function qa(n) {
    let e = 0;
    for (const t in n) Object.prototype.hasOwnProperty.call(n, t) && e++;
    return e;
}
function wt(n, e) {
    for (const t in n) Object.prototype.hasOwnProperty.call(n, t) && e(t, n[t]);
}
function _l(n) {
    for (const e in n) if (Object.prototype.hasOwnProperty.call(n, e)) return !1;
    return !0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class x {
    constructor(e, t) {
        (this.comparator = e), (this.root = t || Q.EMPTY);
    }
    insert(e, t) {
        return new x(this.comparator, this.root.insert(e, t, this.comparator).copy(null, null, Q.BLACK, null, null));
    }
    remove(e) {
        return new x(this.comparator, this.root.remove(e, this.comparator).copy(null, null, Q.BLACK, null, null));
    }
    get(e) {
        let t = this.root;
        for (; !t.isEmpty(); ) {
            const r = this.comparator(e, t.key);
            if (r === 0) return t.value;
            r < 0 ? (t = t.left) : r > 0 && (t = t.right);
        }
        return null;
    }
    indexOf(e) {
        let t = 0,
            r = this.root;
        for (; !r.isEmpty(); ) {
            const i = this.comparator(e, r.key);
            if (i === 0) return t + r.left.size;
            i < 0 ? (r = r.left) : ((t += r.left.size + 1), (r = r.right));
        }
        return -1;
    }
    isEmpty() {
        return this.root.isEmpty();
    }
    get size() {
        return this.root.size;
    }
    minKey() {
        return this.root.minKey();
    }
    maxKey() {
        return this.root.maxKey();
    }
    inorderTraversal(e) {
        return this.root.inorderTraversal(e);
    }
    forEach(e) {
        this.inorderTraversal((t, r) => (e(t, r), !1));
    }
    toString() {
        const e = [];
        return this.inorderTraversal((t, r) => (e.push(`${t}:${r}`), !1)), `{${e.join(", ")}}`;
    }
    reverseTraversal(e) {
        return this.root.reverseTraversal(e);
    }
    getIterator() {
        return new lr(this.root, null, this.comparator, !1);
    }
    getIteratorFrom(e) {
        return new lr(this.root, e, this.comparator, !1);
    }
    getReverseIterator() {
        return new lr(this.root, null, this.comparator, !0);
    }
    getReverseIteratorFrom(e) {
        return new lr(this.root, e, this.comparator, !0);
    }
}
class lr {
    constructor(e, t, r, i) {
        (this.isReverse = i), (this.nodeStack = []);
        let s = 1;
        for (; !e.isEmpty(); )
            if (((s = t ? r(e.key, t) : 1), t && i && (s *= -1), s < 0)) e = this.isReverse ? e.left : e.right;
            else {
                if (s === 0) {
                    this.nodeStack.push(e);
                    break;
                }
                this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
            }
    }
    getNext() {
        let e = this.nodeStack.pop();
        const t = { key: e.key, value: e.value };
        if (this.isReverse) for (e = e.left; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.right);
        else for (e = e.right; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.left);
        return t;
    }
    hasNext() {
        return this.nodeStack.length > 0;
    }
    peek() {
        if (this.nodeStack.length === 0) return null;
        const e = this.nodeStack[this.nodeStack.length - 1];
        return { key: e.key, value: e.value };
    }
}
class Q {
    constructor(e, t, r, i, s) {
        (this.key = e),
            (this.value = t),
            (this.color = r ?? Q.RED),
            (this.left = i ?? Q.EMPTY),
            (this.right = s ?? Q.EMPTY),
            (this.size = this.left.size + 1 + this.right.size);
    }
    copy(e, t, r, i, s) {
        return new Q(e ?? this.key, t ?? this.value, r ?? this.color, i ?? this.left, s ?? this.right);
    }
    isEmpty() {
        return !1;
    }
    inorderTraversal(e) {
        return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e);
    }
    reverseTraversal(e) {
        return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e);
    }
    min() {
        return this.left.isEmpty() ? this : this.left.min();
    }
    minKey() {
        return this.min().key;
    }
    maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
    }
    insert(e, t, r) {
        let i = this;
        const s = r(e, i.key);
        return (
            (i =
                s < 0
                    ? i.copy(null, null, null, i.left.insert(e, t, r), null)
                    : s === 0
                      ? i.copy(null, t, null, null, null)
                      : i.copy(null, null, null, null, i.right.insert(e, t, r))),
            i.fixUp()
        );
    }
    removeMin() {
        if (this.left.isEmpty()) return Q.EMPTY;
        let e = this;
        return (
            e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()),
            (e = e.copy(null, null, null, e.left.removeMin(), null)),
            e.fixUp()
        );
    }
    remove(e, t) {
        let r,
            i = this;
        if (t(e, i.key) < 0)
            i.left.isEmpty() || i.left.isRed() || i.left.left.isRed() || (i = i.moveRedLeft()),
                (i = i.copy(null, null, null, i.left.remove(e, t), null));
        else {
            if (
                (i.left.isRed() && (i = i.rotateRight()),
                i.right.isEmpty() || i.right.isRed() || i.right.left.isRed() || (i = i.moveRedRight()),
                t(e, i.key) === 0)
            ) {
                if (i.right.isEmpty()) return Q.EMPTY;
                (r = i.right.min()), (i = i.copy(r.key, r.value, null, null, i.right.removeMin()));
            }
            i = i.copy(null, null, null, null, i.right.remove(e, t));
        }
        return i.fixUp();
    }
    isRed() {
        return this.color;
    }
    fixUp() {
        let e = this;
        return (
            e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
            e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
            e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
            e
        );
    }
    moveRedLeft() {
        let e = this.colorFlip();
        return (
            e.right.left.isRed() &&
                ((e = e.copy(null, null, null, null, e.right.rotateRight())),
                (e = e.rotateLeft()),
                (e = e.colorFlip())),
            e
        );
    }
    moveRedRight() {
        let e = this.colorFlip();
        return e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())), e;
    }
    rotateLeft() {
        const e = this.copy(null, null, Q.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, e, null);
    }
    rotateRight() {
        const e = this.copy(null, null, Q.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, e);
    }
    colorFlip() {
        const e = this.left.copy(null, null, !this.left.color, null, null),
            t = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, e, t);
    }
    checkMaxDepth() {
        const e = this.check();
        return Math.pow(2, e) <= this.size + 1;
    }
    check() {
        if ((this.isRed() && this.left.isRed()) || this.right.isRed()) throw A();
        const e = this.left.check();
        if (e !== this.right.check()) throw A();
        return e + (this.isRed() ? 0 : 1);
    }
}
(Q.EMPTY = null), (Q.RED = !0), (Q.BLACK = !1);
Q.EMPTY = new (class {
    constructor() {
        this.size = 0;
    }
    get key() {
        throw A();
    }
    get value() {
        throw A();
    }
    get color() {
        throw A();
    }
    get left() {
        throw A();
    }
    get right() {
        throw A();
    }
    copy(e, t, r, i, s) {
        return this;
    }
    insert(e, t, r) {
        return new Q(e, t);
    }
    remove(e, t) {
        return this;
    }
    isEmpty() {
        return !0;
    }
    inorderTraversal(e) {
        return !1;
    }
    reverseTraversal(e) {
        return !1;
    }
    minKey() {
        return null;
    }
    maxKey() {
        return null;
    }
    isRed() {
        return !1;
    }
    checkMaxDepth() {
        return !0;
    }
    check() {
        return 0;
    }
})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Z {
    constructor(e) {
        (this.comparator = e), (this.data = new x(this.comparator));
    }
    has(e) {
        return this.data.get(e) !== null;
    }
    first() {
        return this.data.minKey();
    }
    last() {
        return this.data.maxKey();
    }
    get size() {
        return this.data.size;
    }
    indexOf(e) {
        return this.data.indexOf(e);
    }
    forEach(e) {
        this.data.inorderTraversal((t, r) => (e(t), !1));
    }
    forEachInRange(e, t) {
        const r = this.data.getIteratorFrom(e[0]);
        for (; r.hasNext(); ) {
            const i = r.getNext();
            if (this.comparator(i.key, e[1]) >= 0) return;
            t(i.key);
        }
    }
    forEachWhile(e, t) {
        let r;
        for (r = t !== void 0 ? this.data.getIteratorFrom(t) : this.data.getIterator(); r.hasNext(); )
            if (!e(r.getNext().key)) return;
    }
    firstAfterOrEqual(e) {
        const t = this.data.getIteratorFrom(e);
        return t.hasNext() ? t.getNext().key : null;
    }
    getIterator() {
        return new ja(this.data.getIterator());
    }
    getIteratorFrom(e) {
        return new ja(this.data.getIteratorFrom(e));
    }
    add(e) {
        return this.copy(this.data.remove(e).insert(e, !0));
    }
    delete(e) {
        return this.has(e) ? this.copy(this.data.remove(e)) : this;
    }
    isEmpty() {
        return this.data.isEmpty();
    }
    unionWith(e) {
        let t = this;
        return (
            t.size < e.size && ((t = e), (e = this)),
            e.forEach((r) => {
                t = t.add(r);
            }),
            t
        );
    }
    isEqual(e) {
        if (!(e instanceof Z) || this.size !== e.size) return !1;
        const t = this.data.getIterator(),
            r = e.data.getIterator();
        for (; t.hasNext(); ) {
            const i = t.getNext().key,
                s = r.getNext().key;
            if (this.comparator(i, s) !== 0) return !1;
        }
        return !0;
    }
    toArray() {
        const e = [];
        return (
            this.forEach((t) => {
                e.push(t);
            }),
            e
        );
    }
    toString() {
        const e = [];
        return this.forEach((t) => e.push(t)), "SortedSet(" + e.toString() + ")";
    }
    copy(e) {
        const t = new Z(this.comparator);
        return (t.data = e), t;
    }
}
class ja {
    constructor(e) {
        this.iter = e;
    }
    getNext() {
        return this.iter.getNext().key;
    }
    hasNext() {
        return this.iter.hasNext();
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class he {
    constructor(e) {
        (this.fields = e), e.sort(Y.comparator);
    }
    static empty() {
        return new he([]);
    }
    unionWith(e) {
        let t = new Z(Y.comparator);
        for (const r of this.fields) t = t.add(r);
        for (const r of e) t = t.add(r);
        return new he(t.toArray());
    }
    covers(e) {
        for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
        return !1;
    }
    isEqual(e) {
        return qt(this.fields, e.fields, (t, r) => t.isEqual(r));
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yl extends Error {
    constructor() {
        super(...arguments), (this.name = "Base64DecodeError");
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ae {
    constructor(e) {
        this.binaryString = e;
    }
    static fromBase64String(e) {
        const t = (function (i) {
            try {
                return atob(i);
            } catch (s) {
                throw typeof DOMException < "u" && s instanceof DOMException
                    ? new yl("Invalid base64 string: " + s)
                    : s;
            }
        })(e);
        return new ae(t);
    }
    static fromUint8Array(e) {
        const t = (function (i) {
            let s = "";
            for (let o = 0; o < i.length; ++o) s += String.fromCharCode(i[o]);
            return s;
        })(e);
        return new ae(t);
    }
    [Symbol.iterator]() {
        let e = 0;
        return {
            next: () =>
                e < this.binaryString.length
                    ? { value: this.binaryString.charCodeAt(e++), done: !1 }
                    : { value: void 0, done: !0 },
        };
    }
    toBase64() {
        return (function (t) {
            return btoa(t);
        })(this.binaryString);
    }
    toUint8Array() {
        return (function (t) {
            const r = new Uint8Array(t.length);
            for (let i = 0; i < t.length; i++) r[i] = t.charCodeAt(i);
            return r;
        })(this.binaryString);
    }
    approximateByteSize() {
        return 2 * this.binaryString.length;
    }
    compareTo(e) {
        return D(this.binaryString, e.binaryString);
    }
    isEqual(e) {
        return this.binaryString === e.binaryString;
    }
}
ae.EMPTY_BYTE_STRING = new ae("");
const zg = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function Ze(n) {
    if ((M(!!n), typeof n == "string")) {
        let e = 0;
        const t = zg.exec(n);
        if ((M(!!t), t[1])) {
            let i = t[1];
            (i = (i + "000000000").substr(0, 9)), (e = Number(i));
        }
        const r = new Date(n);
        return { seconds: Math.floor(r.getTime() / 1e3), nanos: e };
    }
    return { seconds: q(n.seconds), nanos: q(n.nanos) };
}
function q(n) {
    return typeof n == "number" ? n : typeof n == "string" ? Number(n) : 0;
}
function Et(n) {
    return typeof n == "string" ? ae.fromBase64String(n) : ae.fromUint8Array(n);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function di(n) {
    var e, t;
    return (
        ((t = (((e = n == null ? void 0 : n.mapValue) === null || e === void 0 ? void 0 : e.fields) || {}).__type__) ===
            null || t === void 0
            ? void 0
            : t.stringValue) === "server_timestamp"
    );
}
function po(n) {
    const e = n.mapValue.fields.__previous_value__;
    return di(e) ? po(e) : e;
}
function kn(n) {
    const e = Ze(n.mapValue.fields.__local_write_time__.timestampValue);
    return new z(e.seconds, e.nanos);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Hg {
    constructor(e, t, r, i, s, o, a, c, u) {
        (this.databaseId = e),
            (this.appId = t),
            (this.persistenceKey = r),
            (this.host = i),
            (this.ssl = s),
            (this.forceLongPolling = o),
            (this.autoDetectLongPolling = a),
            (this.longPollingOptions = c),
            (this.useFetchStreams = u);
    }
}
class Dn {
    constructor(e, t) {
        (this.projectId = e), (this.database = t || "(default)");
    }
    static empty() {
        return new Dn("", "");
    }
    get isDefaultDatabase() {
        return this.database === "(default)";
    }
    isEqual(e) {
        return e instanceof Dn && e.projectId === this.projectId && e.database === this.database;
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const hr = { mapValue: { fields: { __type__: { stringValue: "__max__" } } } };
function It(n) {
    return "nullValue" in n
        ? 0
        : "booleanValue" in n
          ? 1
          : "integerValue" in n || "doubleValue" in n
            ? 2
            : "timestampValue" in n
              ? 3
              : "stringValue" in n
                ? 5
                : "bytesValue" in n
                  ? 6
                  : "referenceValue" in n
                    ? 7
                    : "geoPointValue" in n
                      ? 8
                      : "arrayValue" in n
                        ? 9
                        : "mapValue" in n
                          ? di(n)
                              ? 4
                              : Gg(n)
                                ? 9007199254740991
                                : 10
                          : A();
}
function Ce(n, e) {
    if (n === e) return !0;
    const t = It(n);
    if (t !== It(e)) return !1;
    switch (t) {
        case 0:
        case 9007199254740991:
            return !0;
        case 1:
            return n.booleanValue === e.booleanValue;
        case 4:
            return kn(n).isEqual(kn(e));
        case 3:
            return (function (i, s) {
                if (
                    typeof i.timestampValue == "string" &&
                    typeof s.timestampValue == "string" &&
                    i.timestampValue.length === s.timestampValue.length
                )
                    return i.timestampValue === s.timestampValue;
                const o = Ze(i.timestampValue),
                    a = Ze(s.timestampValue);
                return o.seconds === a.seconds && o.nanos === a.nanos;
            })(n, e);
        case 5:
            return n.stringValue === e.stringValue;
        case 6:
            return (function (i, s) {
                return Et(i.bytesValue).isEqual(Et(s.bytesValue));
            })(n, e);
        case 7:
            return n.referenceValue === e.referenceValue;
        case 8:
            return (function (i, s) {
                return (
                    q(i.geoPointValue.latitude) === q(s.geoPointValue.latitude) &&
                    q(i.geoPointValue.longitude) === q(s.geoPointValue.longitude)
                );
            })(n, e);
        case 2:
            return (function (i, s) {
                if ("integerValue" in i && "integerValue" in s) return q(i.integerValue) === q(s.integerValue);
                if ("doubleValue" in i && "doubleValue" in s) {
                    const o = q(i.doubleValue),
                        a = q(s.doubleValue);
                    return o === a ? Mr(o) === Mr(a) : isNaN(o) && isNaN(a);
                }
                return !1;
            })(n, e);
        case 9:
            return qt(n.arrayValue.values || [], e.arrayValue.values || [], Ce);
        case 10:
            return (function (i, s) {
                const o = i.mapValue.fields || {},
                    a = s.mapValue.fields || {};
                if (qa(o) !== qa(a)) return !1;
                for (const c in o) if (o.hasOwnProperty(c) && (a[c] === void 0 || !Ce(o[c], a[c]))) return !1;
                return !0;
            })(n, e);
        default:
            return A();
    }
}
function Vn(n, e) {
    return (n.values || []).find((t) => Ce(t, e)) !== void 0;
}
function jt(n, e) {
    if (n === e) return 0;
    const t = It(n),
        r = It(e);
    if (t !== r) return D(t, r);
    switch (t) {
        case 0:
        case 9007199254740991:
            return 0;
        case 1:
            return D(n.booleanValue, e.booleanValue);
        case 2:
            return (function (s, o) {
                const a = q(s.integerValue || s.doubleValue),
                    c = q(o.integerValue || o.doubleValue);
                return a < c ? -1 : a > c ? 1 : a === c ? 0 : isNaN(a) ? (isNaN(c) ? 0 : -1) : 1;
            })(n, e);
        case 3:
            return $a(n.timestampValue, e.timestampValue);
        case 4:
            return $a(kn(n), kn(e));
        case 5:
            return D(n.stringValue, e.stringValue);
        case 6:
            return (function (s, o) {
                const a = Et(s),
                    c = Et(o);
                return a.compareTo(c);
            })(n.bytesValue, e.bytesValue);
        case 7:
            return (function (s, o) {
                const a = s.split("/"),
                    c = o.split("/");
                for (let u = 0; u < a.length && u < c.length; u++) {
                    const l = D(a[u], c[u]);
                    if (l !== 0) return l;
                }
                return D(a.length, c.length);
            })(n.referenceValue, e.referenceValue);
        case 8:
            return (function (s, o) {
                const a = D(q(s.latitude), q(o.latitude));
                return a !== 0 ? a : D(q(s.longitude), q(o.longitude));
            })(n.geoPointValue, e.geoPointValue);
        case 9:
            return (function (s, o) {
                const a = s.values || [],
                    c = o.values || [];
                for (let u = 0; u < a.length && u < c.length; ++u) {
                    const l = jt(a[u], c[u]);
                    if (l) return l;
                }
                return D(a.length, c.length);
            })(n.arrayValue, e.arrayValue);
        case 10:
            return (function (s, o) {
                if (s === hr.mapValue && o === hr.mapValue) return 0;
                if (s === hr.mapValue) return 1;
                if (o === hr.mapValue) return -1;
                const a = s.fields || {},
                    c = Object.keys(a),
                    u = o.fields || {},
                    l = Object.keys(u);
                c.sort(), l.sort();
                for (let h = 0; h < c.length && h < l.length; ++h) {
                    const d = D(c[h], l[h]);
                    if (d !== 0) return d;
                    const p = jt(a[c[h]], u[l[h]]);
                    if (p !== 0) return p;
                }
                return D(c.length, l.length);
            })(n.mapValue, e.mapValue);
        default:
            throw A();
    }
}
function $a(n, e) {
    if (typeof n == "string" && typeof e == "string" && n.length === e.length) return D(n, e);
    const t = Ze(n),
        r = Ze(e),
        i = D(t.seconds, r.seconds);
    return i !== 0 ? i : D(t.nanos, r.nanos);
}
function $t(n) {
    return gs(n);
}
function gs(n) {
    return "nullValue" in n
        ? "null"
        : "booleanValue" in n
          ? "" + n.booleanValue
          : "integerValue" in n
            ? "" + n.integerValue
            : "doubleValue" in n
              ? "" + n.doubleValue
              : "timestampValue" in n
                ? (function (t) {
                      const r = Ze(t);
                      return `time(${r.seconds},${r.nanos})`;
                  })(n.timestampValue)
                : "stringValue" in n
                  ? n.stringValue
                  : "bytesValue" in n
                    ? (function (t) {
                          return Et(t).toBase64();
                      })(n.bytesValue)
                    : "referenceValue" in n
                      ? (function (t) {
                            return E.fromName(t).toString();
                        })(n.referenceValue)
                      : "geoPointValue" in n
                        ? (function (t) {
                              return `geo(${t.latitude},${t.longitude})`;
                          })(n.geoPointValue)
                        : "arrayValue" in n
                          ? (function (t) {
                                let r = "[",
                                    i = !0;
                                for (const s of t.values || []) i ? (i = !1) : (r += ","), (r += gs(s));
                                return r + "]";
                            })(n.arrayValue)
                          : "mapValue" in n
                            ? (function (t) {
                                  const r = Object.keys(t.fields || {}).sort();
                                  let i = "{",
                                      s = !0;
                                  for (const o of r) s ? (s = !1) : (i += ","), (i += `${o}:${gs(t.fields[o])}`);
                                  return i + "}";
                              })(n.mapValue)
                            : A();
}
function Lr(n, e) {
    return { referenceValue: `projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}` };
}
function _s(n) {
    return !!n && "integerValue" in n;
}
function mo(n) {
    return !!n && "arrayValue" in n;
}
function za(n) {
    return !!n && "nullValue" in n;
}
function Ha(n) {
    return !!n && "doubleValue" in n && isNaN(Number(n.doubleValue));
}
function _r(n) {
    return !!n && "mapValue" in n;
}
function mn(n) {
    if (n.geoPointValue) return { geoPointValue: Object.assign({}, n.geoPointValue) };
    if (n.timestampValue && typeof n.timestampValue == "object")
        return { timestampValue: Object.assign({}, n.timestampValue) };
    if (n.mapValue) {
        const e = { mapValue: { fields: {} } };
        return wt(n.mapValue.fields, (t, r) => (e.mapValue.fields[t] = mn(r))), e;
    }
    if (n.arrayValue) {
        const e = { arrayValue: { values: [] } };
        for (let t = 0; t < (n.arrayValue.values || []).length; ++t)
            e.arrayValue.values[t] = mn(n.arrayValue.values[t]);
        return e;
    }
    return Object.assign({}, n);
}
function Gg(n) {
    return (((n.mapValue || {}).fields || {}).__type__ || {}).stringValue === "__max__";
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ue {
    constructor(e) {
        this.value = e;
    }
    static empty() {
        return new ue({ mapValue: {} });
    }
    field(e) {
        if (e.isEmpty()) return this.value;
        {
            let t = this.value;
            for (let r = 0; r < e.length - 1; ++r) if (((t = (t.mapValue.fields || {})[e.get(r)]), !_r(t))) return null;
            return (t = (t.mapValue.fields || {})[e.lastSegment()]), t || null;
        }
    }
    set(e, t) {
        this.getFieldsMap(e.popLast())[e.lastSegment()] = mn(t);
    }
    setAll(e) {
        let t = Y.emptyPath(),
            r = {},
            i = [];
        e.forEach((o, a) => {
            if (!t.isImmediateParentOf(a)) {
                const c = this.getFieldsMap(t);
                this.applyChanges(c, r, i), (r = {}), (i = []), (t = a.popLast());
            }
            o ? (r[a.lastSegment()] = mn(o)) : i.push(a.lastSegment());
        });
        const s = this.getFieldsMap(t);
        this.applyChanges(s, r, i);
    }
    delete(e) {
        const t = this.field(e.popLast());
        _r(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()];
    }
    isEqual(e) {
        return Ce(this.value, e.value);
    }
    getFieldsMap(e) {
        let t = this.value;
        t.mapValue.fields || (t.mapValue = { fields: {} });
        for (let r = 0; r < e.length; ++r) {
            let i = t.mapValue.fields[e.get(r)];
            (_r(i) && i.mapValue.fields) || ((i = { mapValue: { fields: {} } }), (t.mapValue.fields[e.get(r)] = i)),
                (t = i);
        }
        return t.mapValue.fields;
    }
    applyChanges(e, t, r) {
        wt(t, (i, s) => (e[i] = s));
        for (const i of r) delete e[i];
    }
    clone() {
        return new ue(mn(this.value));
    }
}
function vl(n) {
    const e = [];
    return (
        wt(n.fields, (t, r) => {
            const i = new Y([t]);
            if (_r(r)) {
                const s = vl(r.mapValue).fields;
                if (s.length === 0) e.push(i);
                else for (const o of s) e.push(i.child(o));
            } else e.push(i);
        }),
        new he(e)
    );
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class re {
    constructor(e, t, r, i, s, o, a) {
        (this.key = e),
            (this.documentType = t),
            (this.version = r),
            (this.readTime = i),
            (this.createTime = s),
            (this.data = o),
            (this.documentState = a);
    }
    static newInvalidDocument(e) {
        return new re(e, 0, P.min(), P.min(), P.min(), ue.empty(), 0);
    }
    static newFoundDocument(e, t, r, i) {
        return new re(e, 1, t, P.min(), r, i, 0);
    }
    static newNoDocument(e, t) {
        return new re(e, 2, t, P.min(), P.min(), ue.empty(), 0);
    }
    static newUnknownDocument(e, t) {
        return new re(e, 3, t, P.min(), P.min(), ue.empty(), 2);
    }
    convertToFoundDocument(e, t) {
        return (
            !this.createTime.isEqual(P.min()) ||
                (this.documentType !== 2 && this.documentType !== 0) ||
                (this.createTime = e),
            (this.version = e),
            (this.documentType = 1),
            (this.data = t),
            (this.documentState = 0),
            this
        );
    }
    convertToNoDocument(e) {
        return (this.version = e), (this.documentType = 2), (this.data = ue.empty()), (this.documentState = 0), this;
    }
    convertToUnknownDocument(e) {
        return (this.version = e), (this.documentType = 3), (this.data = ue.empty()), (this.documentState = 2), this;
    }
    setHasCommittedMutations() {
        return (this.documentState = 2), this;
    }
    setHasLocalMutations() {
        return (this.documentState = 1), (this.version = P.min()), this;
    }
    setReadTime(e) {
        return (this.readTime = e), this;
    }
    get hasLocalMutations() {
        return this.documentState === 1;
    }
    get hasCommittedMutations() {
        return this.documentState === 2;
    }
    get hasPendingWrites() {
        return this.hasLocalMutations || this.hasCommittedMutations;
    }
    isValidDocument() {
        return this.documentType !== 0;
    }
    isFoundDocument() {
        return this.documentType === 1;
    }
    isNoDocument() {
        return this.documentType === 2;
    }
    isUnknownDocument() {
        return this.documentType === 3;
    }
    isEqual(e) {
        return (
            e instanceof re &&
            this.key.isEqual(e.key) &&
            this.version.isEqual(e.version) &&
            this.documentType === e.documentType &&
            this.documentState === e.documentState &&
            this.data.isEqual(e.data)
        );
    }
    mutableCopy() {
        return new re(
            this.key,
            this.documentType,
            this.version,
            this.readTime,
            this.createTime,
            this.data.clone(),
            this.documentState,
        );
    }
    toString() {
        return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
    }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zt {
    constructor(e, t) {
        (this.position = e), (this.inclusive = t);
    }
}
function Ga(n, e, t) {
    let r = 0;
    for (let i = 0; i < n.position.length; i++) {
        const s = e[i],
            o = n.position[i];
        if (
            (s.field.isKeyField()
                ? (r = E.comparator(E.fromName(o.referenceValue), t.key))
                : (r = jt(o, t.data.field(s.field))),
            s.dir === "desc" && (r *= -1),
            r !== 0)
        )
            break;
    }
    return r;
}
function Wa(n, e) {
    if (n === null) return e === null;
    if (e === null || n.inclusive !== e.inclusive || n.position.length !== e.position.length) return !1;
    for (let t = 0; t < n.position.length; t++) if (!Ce(n.position[t], e.position[t])) return !1;
    return !0;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Nn {
    constructor(e, t = "asc") {
        (this.field = e), (this.dir = t);
    }
}
function Wg(n, e) {
    return n.dir === e.dir && n.field.isEqual(e.field);
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class El {}
class j extends El {
    constructor(e, t, r) {
        super(), (this.field = e), (this.op = t), (this.value = r);
    }
    static create(e, t, r) {
        return e.isKeyField()
            ? t === "in" || t === "not-in"
                ? this.createKeyFieldInFilter(e, t, r)
                : new Qg(e, t, r)
            : t === "array-contains"
              ? new Xg(e, r)
              : t === "in"
                ? new Zg(e, r)
                : t === "not-in"
                  ? new e_(e, r)
                  : t === "array-contains-any"
                    ? new t_(e, r)
                    : new j(e, t, r);
    }
    static createKeyFieldInFilter(e, t, r) {
        return t === "in" ? new Jg(e, r) : new Yg(e, r);
    }
    matches(e) {
        const t = e.data.field(this.field);
        return this.op === "!="
            ? t !== null && this.matchesComparison(jt(t, this.value))
            : t !== null && It(this.value) === It(t) && this.matchesComparison(jt(t, this.value));
    }
    matchesComparison(e) {
        switch (this.op) {
            case "<":
                return e < 0;
            case "<=":
                return e <= 0;
            case "==":
                return e === 0;
            case "!=":
                return e !== 0;
            case ">":
                return e > 0;
            case ">=":
                return e >= 0;
            default:
                return A();
        }
    }
    isInequality() {
        return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0;
    }
    getFlattenedFilters() {
        return [this];
    }
    getFilters() {
        return [this];
    }
}
class Ee extends El {
    constructor(e, t) {
        super(), (this.filters = e), (this.op = t), (this.ae = null);
    }
    static create(e, t) {
        return new Ee(e, t);
    }
    matches(e) {
        return Il(this)
            ? this.filters.find((t) => !t.matches(e)) === void 0
            : this.filters.find((t) => t.matches(e)) !== void 0;
    }
    getFlattenedFilters() {
        return (
            this.ae !== null || (this.ae = this.filters.reduce((e, t) => e.concat(t.getFlattenedFilters()), [])),
            this.ae
        );
    }
    getFilters() {
        return Object.assign([], this.filters);
    }
}
function Il(n) {
    return n.op === "and";
}
function Tl(n) {
    return Kg(n) && Il(n);
}
function Kg(n) {
    for (const e of n.filters) if (e instanceof Ee) return !1;
    return !0;
}
function ys(n) {
    if (n instanceof j) return n.field.canonicalString() + n.op.toString() + $t(n.value);
    if (Tl(n)) return n.filters.map((e) => ys(e)).join(",");
    {
        const e = n.filters.map((t) => ys(t)).join(",");
        return `${n.op}(${e})`;
    }
}
function wl(n, e) {
    return n instanceof j
        ? (function (r, i) {
              return i instanceof j && r.op === i.op && r.field.isEqual(i.field) && Ce(r.value, i.value);
          })(n, e)
        : n instanceof Ee
          ? (function (r, i) {
                return i instanceof Ee && r.op === i.op && r.filters.length === i.filters.length
                    ? r.filters.reduce((s, o, a) => s && wl(o, i.filters[a]), !0)
                    : !1;
            })(n, e)
          : void A();
}
function Al(n) {
    return n instanceof j
        ? (function (t) {
              return `${t.field.canonicalString()} ${t.op} ${$t(t.value)}`;
          })(n)
        : n instanceof Ee
          ? (function (t) {
                return t.op.toString() + " {" + t.getFilters().map(Al).join(" ,") + "}";
            })(n)
          : "Filter";
}
class Qg extends j {
    constructor(e, t, r) {
        super(e, t, r), (this.key = E.fromName(r.referenceValue));
    }
    matches(e) {
        const t = E.comparator(e.key, this.key);
        return this.matchesComparison(t);
    }
}
class Jg extends j {
    constructor(e, t) {
        super(e, "in", t), (this.keys = Rl("in", t));
    }
    matches(e) {
        return this.keys.some((t) => t.isEqual(e.key));
    }
}
class Yg extends j {
    constructor(e, t) {
        super(e, "not-in", t), (this.keys = Rl("not-in", t));
    }
    matches(e) {
        return !this.keys.some((t) => t.isEqual(e.key));
    }
}
function Rl(n, e) {
    var t;
    return (((t = e.arrayValue) === null || t === void 0 ? void 0 : t.values) || []).map((r) =>
        E.fromName(r.referenceValue),
    );
}
class Xg extends j {
    constructor(e, t) {
        super(e, "array-contains", t);
    }
    matches(e) {
        const t = e.data.field(this.field);
        return mo(t) && Vn(t.arrayValue, this.value);
    }
}
class Zg extends j {
    constructor(e, t) {
        super(e, "in", t);
    }
    matches(e) {
        const t = e.data.field(this.field);
        return t !== null && Vn(this.value.arrayValue, t);
    }
}
class e_ extends j {
    constructor(e, t) {
        super(e, "not-in", t);
    }
    matches(e) {
        if (Vn(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
        const t = e.data.field(this.field);
        return t !== null && !Vn(this.value.arrayValue, t);
    }
}
class t_ extends j {
    constructor(e, t) {
        super(e, "array-contains-any", t);
    }
    matches(e) {
        const t = e.data.field(this.field);
        return !(!mo(t) || !t.arrayValue.values) && t.arrayValue.values.some((r) => Vn(this.value.arrayValue, r));
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class n_ {
    constructor(e, t = null, r = [], i = [], s = null, o = null, a = null) {
        (this.path = e),
            (this.collectionGroup = t),
            (this.orderBy = r),
            (this.filters = i),
            (this.limit = s),
            (this.startAt = o),
            (this.endAt = a),
            (this.ue = null);
    }
}
function Ka(n, e = null, t = [], r = [], i = null, s = null, o = null) {
    return new n_(n, e, t, r, i, s, o);
}
function go(n) {
    const e = S(n);
    if (e.ue === null) {
        let t = e.path.canonicalString();
        e.collectionGroup !== null && (t += "|cg:" + e.collectionGroup),
            (t += "|f:"),
            (t += e.filters.map((r) => ys(r)).join(",")),
            (t += "|ob:"),
            (t += e.orderBy
                .map((r) =>
                    (function (s) {
                        return s.field.canonicalString() + s.dir;
                    })(r),
                )
                .join(",")),
            hi(e.limit) || ((t += "|l:"), (t += e.limit)),
            e.startAt &&
                ((t += "|lb:"),
                (t += e.startAt.inclusive ? "b:" : "a:"),
                (t += e.startAt.position.map((r) => $t(r)).join(","))),
            e.endAt &&
                ((t += "|ub:"),
                (t += e.endAt.inclusive ? "a:" : "b:"),
                (t += e.endAt.position.map((r) => $t(r)).join(","))),
            (e.ue = t);
    }
    return e.ue;
}
function _o(n, e) {
    if (n.limit !== e.limit || n.orderBy.length !== e.orderBy.length) return !1;
    for (let t = 0; t < n.orderBy.length; t++) if (!Wg(n.orderBy[t], e.orderBy[t])) return !1;
    if (n.filters.length !== e.filters.length) return !1;
    for (let t = 0; t < n.filters.length; t++) if (!wl(n.filters[t], e.filters[t])) return !1;
    return (
        n.collectionGroup === e.collectionGroup &&
        !!n.path.isEqual(e.path) &&
        !!Wa(n.startAt, e.startAt) &&
        Wa(n.endAt, e.endAt)
    );
}
function vs(n) {
    return E.isDocumentKey(n.path) && n.collectionGroup === null && n.filters.length === 0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class At {
    constructor(e, t = null, r = [], i = [], s = null, o = "F", a = null, c = null) {
        (this.path = e),
            (this.collectionGroup = t),
            (this.explicitOrderBy = r),
            (this.filters = i),
            (this.limit = s),
            (this.limitType = o),
            (this.startAt = a),
            (this.endAt = c),
            (this.ce = null),
            (this.le = null),
            (this.he = null),
            this.startAt,
            this.endAt;
    }
}
function r_(n, e, t, r, i, s, o, a) {
    return new At(n, e, t, r, i, s, o, a);
}
function fi(n) {
    return new At(n);
}
function Qa(n) {
    return (
        n.filters.length === 0 &&
        n.limit === null &&
        n.startAt == null &&
        n.endAt == null &&
        (n.explicitOrderBy.length === 0 || (n.explicitOrderBy.length === 1 && n.explicitOrderBy[0].field.isKeyField()))
    );
}
function yo(n) {
    return n.collectionGroup !== null;
}
function Lt(n) {
    const e = S(n);
    if (e.ce === null) {
        e.ce = [];
        const t = new Set();
        for (const s of e.explicitOrderBy) e.ce.push(s), t.add(s.field.canonicalString());
        const r = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc";
        (function (o) {
            let a = new Z(Y.comparator);
            return (
                o.filters.forEach((c) => {
                    c.getFlattenedFilters().forEach((u) => {
                        u.isInequality() && (a = a.add(u.field));
                    });
                }),
                a
            );
        })(e).forEach((s) => {
            t.has(s.canonicalString()) || s.isKeyField() || e.ce.push(new Nn(s, r));
        }),
            t.has(Y.keyField().canonicalString()) || e.ce.push(new Nn(Y.keyField(), r));
    }
    return e.ce;
}
function Pe(n) {
    const e = S(n);
    return e.le || (e.le = i_(e, Lt(n))), e.le;
}
function i_(n, e) {
    if (n.limitType === "F") return Ka(n.path, n.collectionGroup, e, n.filters, n.limit, n.startAt, n.endAt);
    {
        e = e.map((i) => {
            const s = i.dir === "desc" ? "asc" : "desc";
            return new Nn(i.field, s);
        });
        const t = n.endAt ? new zt(n.endAt.position, n.endAt.inclusive) : null,
            r = n.startAt ? new zt(n.startAt.position, n.startAt.inclusive) : null;
        return Ka(n.path, n.collectionGroup, e, n.filters, n.limit, t, r);
    }
}
function Es(n, e) {
    const t = n.filters.concat([e]);
    return new At(n.path, n.collectionGroup, n.explicitOrderBy.slice(), t, n.limit, n.limitType, n.startAt, n.endAt);
}
function Is(n, e, t) {
    return new At(n.path, n.collectionGroup, n.explicitOrderBy.slice(), n.filters.slice(), e, t, n.startAt, n.endAt);
}
function pi(n, e) {
    return _o(Pe(n), Pe(e)) && n.limitType === e.limitType;
}
function Pl(n) {
    return `${go(Pe(n))}|lt:${n.limitType}`;
}
function St(n) {
    return `Query(target=${(function (t) {
        let r = t.path.canonicalString();
        return (
            t.collectionGroup !== null && (r += " collectionGroup=" + t.collectionGroup),
            t.filters.length > 0 && (r += `, filters: [${t.filters.map((i) => Al(i)).join(", ")}]`),
            hi(t.limit) || (r += ", limit: " + t.limit),
            t.orderBy.length > 0 &&
                (r += `, orderBy: [${t.orderBy
                    .map((i) =>
                        (function (o) {
                            return `${o.field.canonicalString()} (${o.dir})`;
                        })(i),
                    )
                    .join(", ")}]`),
            t.startAt &&
                ((r += ", startAt: "),
                (r += t.startAt.inclusive ? "b:" : "a:"),
                (r += t.startAt.position.map((i) => $t(i)).join(","))),
            t.endAt &&
                ((r += ", endAt: "),
                (r += t.endAt.inclusive ? "a:" : "b:"),
                (r += t.endAt.position.map((i) => $t(i)).join(","))),
            `Target(${r})`
        );
    })(Pe(n))}; limitType=${n.limitType})`;
}
function mi(n, e) {
    return (
        e.isFoundDocument() &&
        (function (r, i) {
            const s = i.key.path;
            return r.collectionGroup !== null
                ? i.key.hasCollectionId(r.collectionGroup) && r.path.isPrefixOf(s)
                : E.isDocumentKey(r.path)
                  ? r.path.isEqual(s)
                  : r.path.isImmediateParentOf(s);
        })(n, e) &&
        (function (r, i) {
            for (const s of Lt(r)) if (!s.field.isKeyField() && i.data.field(s.field) === null) return !1;
            return !0;
        })(n, e) &&
        (function (r, i) {
            for (const s of r.filters) if (!s.matches(i)) return !1;
            return !0;
        })(n, e) &&
        (function (r, i) {
            return !(
                (r.startAt &&
                    !(function (o, a, c) {
                        const u = Ga(o, a, c);
                        return o.inclusive ? u <= 0 : u < 0;
                    })(r.startAt, Lt(r), i)) ||
                (r.endAt &&
                    !(function (o, a, c) {
                        const u = Ga(o, a, c);
                        return o.inclusive ? u >= 0 : u > 0;
                    })(r.endAt, Lt(r), i))
            );
        })(n, e)
    );
}
function s_(n) {
    return n.collectionGroup || (n.path.length % 2 == 1 ? n.path.lastSegment() : n.path.get(n.path.length - 2));
}
function Sl(n) {
    return (e, t) => {
        let r = !1;
        for (const i of Lt(n)) {
            const s = o_(i, e, t);
            if (s !== 0) return s;
            r = r || i.field.isKeyField();
        }
        return 0;
    };
}
function o_(n, e, t) {
    const r = n.field.isKeyField()
        ? E.comparator(e.key, t.key)
        : (function (s, o, a) {
              const c = o.data.field(s),
                  u = a.data.field(s);
              return c !== null && u !== null ? jt(c, u) : A();
          })(n.field, e, t);
    switch (n.dir) {
        case "asc":
            return r;
        case "desc":
            return -1 * r;
        default:
            return A();
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Zt {
    constructor(e, t) {
        (this.mapKeyFn = e), (this.equalsFn = t), (this.inner = {}), (this.innerSize = 0);
    }
    get(e) {
        const t = this.mapKeyFn(e),
            r = this.inner[t];
        if (r !== void 0) {
            for (const [i, s] of r) if (this.equalsFn(i, e)) return s;
        }
    }
    has(e) {
        return this.get(e) !== void 0;
    }
    set(e, t) {
        const r = this.mapKeyFn(e),
            i = this.inner[r];
        if (i === void 0) return (this.inner[r] = [[e, t]]), void this.innerSize++;
        for (let s = 0; s < i.length; s++) if (this.equalsFn(i[s][0], e)) return void (i[s] = [e, t]);
        i.push([e, t]), this.innerSize++;
    }
    delete(e) {
        const t = this.mapKeyFn(e),
            r = this.inner[t];
        if (r === void 0) return !1;
        for (let i = 0; i < r.length; i++)
            if (this.equalsFn(r[i][0], e))
                return r.length === 1 ? delete this.inner[t] : r.splice(i, 1), this.innerSize--, !0;
        return !1;
    }
    forEach(e) {
        wt(this.inner, (t, r) => {
            for (const [i, s] of r) e(i, s);
        });
    }
    isEmpty() {
        return _l(this.inner);
    }
    size() {
        return this.innerSize;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const a_ = new x(E.comparator);
function Fe() {
    return a_;
}
const Cl = new x(E.comparator);
function ln(...n) {
    let e = Cl;
    for (const t of n) e = e.insert(t.key, t);
    return e;
}
function bl(n) {
    let e = Cl;
    return n.forEach((t, r) => (e = e.insert(t, r.overlayedDocument))), e;
}
function ft() {
    return gn();
}
function kl() {
    return gn();
}
function gn() {
    return new Zt(
        (n) => n.toString(),
        (n, e) => n.isEqual(e),
    );
}
const c_ = new x(E.comparator),
    u_ = new Z(E.comparator);
function C(...n) {
    let e = u_;
    for (const t of n) e = e.add(t);
    return e;
}
const l_ = new Z(D);
function h_() {
    return l_;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Dl(n, e) {
    if (n.useProto3Json) {
        if (isNaN(e)) return { doubleValue: "NaN" };
        if (e === 1 / 0) return { doubleValue: "Infinity" };
        if (e === -1 / 0) return { doubleValue: "-Infinity" };
    }
    return { doubleValue: Mr(e) ? "-0" : e };
}
function Vl(n) {
    return { integerValue: "" + n };
}
function d_(n, e) {
    return $g(e) ? Vl(e) : Dl(n, e);
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gi {
    constructor() {
        this._ = void 0;
    }
}
function f_(n, e, t) {
    return n instanceof xr
        ? (function (i, s) {
              const o = {
                  fields: {
                      __type__: { stringValue: "server_timestamp" },
                      __local_write_time__: { timestampValue: { seconds: i.seconds, nanos: i.nanoseconds } },
                  },
              };
              return s && di(s) && (s = po(s)), s && (o.fields.__previous_value__ = s), { mapValue: o };
          })(t, e)
        : n instanceof On
          ? Ol(n, e)
          : n instanceof Mn
            ? Ml(n, e)
            : (function (i, s) {
                  const o = Nl(i, s),
                      a = Ja(o) + Ja(i.Pe);
                  return _s(o) && _s(i.Pe) ? Vl(a) : Dl(i.serializer, a);
              })(n, e);
}
function p_(n, e, t) {
    return n instanceof On ? Ol(n, e) : n instanceof Mn ? Ml(n, e) : t;
}
function Nl(n, e) {
    return n instanceof Fr
        ? (function (r) {
              return (
                  _s(r) ||
                  (function (s) {
                      return !!s && "doubleValue" in s;
                  })(r)
              );
          })(e)
            ? e
            : { integerValue: 0 }
        : null;
}
class xr extends gi {}
class On extends gi {
    constructor(e) {
        super(), (this.elements = e);
    }
}
function Ol(n, e) {
    const t = Ll(e);
    for (const r of n.elements) t.some((i) => Ce(i, r)) || t.push(r);
    return { arrayValue: { values: t } };
}
class Mn extends gi {
    constructor(e) {
        super(), (this.elements = e);
    }
}
function Ml(n, e) {
    let t = Ll(e);
    for (const r of n.elements) t = t.filter((i) => !Ce(i, r));
    return { arrayValue: { values: t } };
}
class Fr extends gi {
    constructor(e, t) {
        super(), (this.serializer = e), (this.Pe = t);
    }
}
function Ja(n) {
    return q(n.integerValue || n.doubleValue);
}
function Ll(n) {
    return mo(n) && n.arrayValue.values ? n.arrayValue.values.slice() : [];
}
function m_(n, e) {
    return (
        n.field.isEqual(e.field) &&
        (function (r, i) {
            return (r instanceof On && i instanceof On) || (r instanceof Mn && i instanceof Mn)
                ? qt(r.elements, i.elements, Ce)
                : r instanceof Fr && i instanceof Fr
                  ? Ce(r.Pe, i.Pe)
                  : r instanceof xr && i instanceof xr;
        })(n.transform, e.transform)
    );
}
class g_ {
    constructor(e, t) {
        (this.version = e), (this.transformResults = t);
    }
}
class me {
    constructor(e, t) {
        (this.updateTime = e), (this.exists = t);
    }
    static none() {
        return new me();
    }
    static exists(e) {
        return new me(void 0, e);
    }
    static updateTime(e) {
        return new me(e);
    }
    get isNone() {
        return this.updateTime === void 0 && this.exists === void 0;
    }
    isEqual(e) {
        return (
            this.exists === e.exists &&
            (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime)
        );
    }
}
function yr(n, e) {
    return n.updateTime !== void 0
        ? e.isFoundDocument() && e.version.isEqual(n.updateTime)
        : n.exists === void 0 || n.exists === e.isFoundDocument();
}
class _i {}
function xl(n, e) {
    if (!n.hasLocalMutations || (e && e.fields.length === 0)) return null;
    if (e === null) return n.isNoDocument() ? new vo(n.key, me.none()) : new Yn(n.key, n.data, me.none());
    {
        const t = n.data,
            r = ue.empty();
        let i = new Z(Y.comparator);
        for (let s of e.fields)
            if (!i.has(s)) {
                let o = t.field(s);
                o === null && s.length > 1 && ((s = s.popLast()), (o = t.field(s))),
                    o === null ? r.delete(s) : r.set(s, o),
                    (i = i.add(s));
            }
        return new ot(n.key, r, new he(i.toArray()), me.none());
    }
}
function __(n, e, t) {
    n instanceof Yn
        ? (function (i, s, o) {
              const a = i.value.clone(),
                  c = Xa(i.fieldTransforms, s, o.transformResults);
              a.setAll(c), s.convertToFoundDocument(o.version, a).setHasCommittedMutations();
          })(n, e, t)
        : n instanceof ot
          ? (function (i, s, o) {
                if (!yr(i.precondition, s)) return void s.convertToUnknownDocument(o.version);
                const a = Xa(i.fieldTransforms, s, o.transformResults),
                    c = s.data;
                c.setAll(Fl(i)), c.setAll(a), s.convertToFoundDocument(o.version, c).setHasCommittedMutations();
            })(n, e, t)
          : (function (i, s, o) {
                s.convertToNoDocument(o.version).setHasCommittedMutations();
            })(0, e, t);
}
function _n(n, e, t, r) {
    return n instanceof Yn
        ? (function (s, o, a, c) {
              if (!yr(s.precondition, o)) return a;
              const u = s.value.clone(),
                  l = Za(s.fieldTransforms, c, o);
              return u.setAll(l), o.convertToFoundDocument(o.version, u).setHasLocalMutations(), null;
          })(n, e, t, r)
        : n instanceof ot
          ? (function (s, o, a, c) {
                if (!yr(s.precondition, o)) return a;
                const u = Za(s.fieldTransforms, c, o),
                    l = o.data;
                return (
                    l.setAll(Fl(s)),
                    l.setAll(u),
                    o.convertToFoundDocument(o.version, l).setHasLocalMutations(),
                    a === null ? null : a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((h) => h.field))
                );
            })(n, e, t, r)
          : (function (s, o, a) {
                return yr(s.precondition, o) ? (o.convertToNoDocument(o.version).setHasLocalMutations(), null) : a;
            })(n, e, t);
}
function y_(n, e) {
    let t = null;
    for (const r of n.fieldTransforms) {
        const i = e.data.field(r.field),
            s = Nl(r.transform, i || null);
        s != null && (t === null && (t = ue.empty()), t.set(r.field, s));
    }
    return t || null;
}
function Ya(n, e) {
    return (
        n.type === e.type &&
        !!n.key.isEqual(e.key) &&
        !!n.precondition.isEqual(e.precondition) &&
        !!(function (r, i) {
            return (r === void 0 && i === void 0) || (!(!r || !i) && qt(r, i, (s, o) => m_(s, o)));
        })(n.fieldTransforms, e.fieldTransforms) &&
        (n.type === 0
            ? n.value.isEqual(e.value)
            : n.type !== 1 || (n.data.isEqual(e.data) && n.fieldMask.isEqual(e.fieldMask)))
    );
}
class Yn extends _i {
    constructor(e, t, r, i = []) {
        super(), (this.key = e), (this.value = t), (this.precondition = r), (this.fieldTransforms = i), (this.type = 0);
    }
    getFieldMask() {
        return null;
    }
}
class ot extends _i {
    constructor(e, t, r, i, s = []) {
        super(),
            (this.key = e),
            (this.data = t),
            (this.fieldMask = r),
            (this.precondition = i),
            (this.fieldTransforms = s),
            (this.type = 1);
    }
    getFieldMask() {
        return this.fieldMask;
    }
}
function Fl(n) {
    const e = new Map();
    return (
        n.fieldMask.fields.forEach((t) => {
            if (!t.isEmpty()) {
                const r = n.data.field(t);
                e.set(t, r);
            }
        }),
        e
    );
}
function Xa(n, e, t) {
    const r = new Map();
    M(n.length === t.length);
    for (let i = 0; i < t.length; i++) {
        const s = n[i],
            o = s.transform,
            a = e.data.field(s.field);
        r.set(s.field, p_(o, a, t[i]));
    }
    return r;
}
function Za(n, e, t) {
    const r = new Map();
    for (const i of n) {
        const s = i.transform,
            o = t.data.field(i.field);
        r.set(i.field, f_(s, o, e));
    }
    return r;
}
class vo extends _i {
    constructor(e, t) {
        super(), (this.key = e), (this.precondition = t), (this.type = 2), (this.fieldTransforms = []);
    }
    getFieldMask() {
        return null;
    }
}
class v_ extends _i {
    constructor(e, t) {
        super(), (this.key = e), (this.precondition = t), (this.type = 3), (this.fieldTransforms = []);
    }
    getFieldMask() {
        return null;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class E_ {
    constructor(e, t, r, i) {
        (this.batchId = e), (this.localWriteTime = t), (this.baseMutations = r), (this.mutations = i);
    }
    applyToRemoteDocument(e, t) {
        const r = t.mutationResults;
        for (let i = 0; i < this.mutations.length; i++) {
            const s = this.mutations[i];
            s.key.isEqual(e.key) && __(s, e, r[i]);
        }
    }
    applyToLocalView(e, t) {
        for (const r of this.baseMutations) r.key.isEqual(e.key) && (t = _n(r, e, t, this.localWriteTime));
        for (const r of this.mutations) r.key.isEqual(e.key) && (t = _n(r, e, t, this.localWriteTime));
        return t;
    }
    applyToLocalDocumentSet(e, t) {
        const r = kl();
        return (
            this.mutations.forEach((i) => {
                const s = e.get(i.key),
                    o = s.overlayedDocument;
                let a = this.applyToLocalView(o, s.mutatedFields);
                a = t.has(i.key) ? null : a;
                const c = xl(o, a);
                c !== null && r.set(i.key, c), o.isValidDocument() || o.convertToNoDocument(P.min());
            }),
            r
        );
    }
    keys() {
        return this.mutations.reduce((e, t) => e.add(t.key), C());
    }
    isEqual(e) {
        return (
            this.batchId === e.batchId &&
            qt(this.mutations, e.mutations, (t, r) => Ya(t, r)) &&
            qt(this.baseMutations, e.baseMutations, (t, r) => Ya(t, r))
        );
    }
}
class Eo {
    constructor(e, t, r, i) {
        (this.batch = e), (this.commitVersion = t), (this.mutationResults = r), (this.docVersions = i);
    }
    static from(e, t, r) {
        M(e.mutations.length === r.length);
        let i = (function () {
            return c_;
        })();
        const s = e.mutations;
        for (let o = 0; o < s.length; o++) i = i.insert(s[o].key, r[o].version);
        return new Eo(e, t, r, i);
    }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class I_ {
    constructor(e, t) {
        (this.largestBatchId = e), (this.mutation = t);
    }
    getKey() {
        return this.mutation.key;
    }
    isEqual(e) {
        return e !== null && this.mutation === e.mutation;
    }
    toString() {
        return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class T_ {
    constructor(e, t) {
        (this.count = e), (this.unchangedNames = t);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var B, k;
function w_(n) {
    switch (n) {
        default:
            return A();
        case f.CANCELLED:
        case f.UNKNOWN:
        case f.DEADLINE_EXCEEDED:
        case f.RESOURCE_EXHAUSTED:
        case f.INTERNAL:
        case f.UNAVAILABLE:
        case f.UNAUTHENTICATED:
            return !1;
        case f.INVALID_ARGUMENT:
        case f.NOT_FOUND:
        case f.ALREADY_EXISTS:
        case f.PERMISSION_DENIED:
        case f.FAILED_PRECONDITION:
        case f.ABORTED:
        case f.OUT_OF_RANGE:
        case f.UNIMPLEMENTED:
        case f.DATA_LOSS:
            return !0;
    }
}
function Ul(n) {
    if (n === void 0) return xe("GRPC error has no .code"), f.UNKNOWN;
    switch (n) {
        case B.OK:
            return f.OK;
        case B.CANCELLED:
            return f.CANCELLED;
        case B.UNKNOWN:
            return f.UNKNOWN;
        case B.DEADLINE_EXCEEDED:
            return f.DEADLINE_EXCEEDED;
        case B.RESOURCE_EXHAUSTED:
            return f.RESOURCE_EXHAUSTED;
        case B.INTERNAL:
            return f.INTERNAL;
        case B.UNAVAILABLE:
            return f.UNAVAILABLE;
        case B.UNAUTHENTICATED:
            return f.UNAUTHENTICATED;
        case B.INVALID_ARGUMENT:
            return f.INVALID_ARGUMENT;
        case B.NOT_FOUND:
            return f.NOT_FOUND;
        case B.ALREADY_EXISTS:
            return f.ALREADY_EXISTS;
        case B.PERMISSION_DENIED:
            return f.PERMISSION_DENIED;
        case B.FAILED_PRECONDITION:
            return f.FAILED_PRECONDITION;
        case B.ABORTED:
            return f.ABORTED;
        case B.OUT_OF_RANGE:
            return f.OUT_OF_RANGE;
        case B.UNIMPLEMENTED:
            return f.UNIMPLEMENTED;
        case B.DATA_LOSS:
            return f.DATA_LOSS;
        default:
            return A();
    }
}
((k = B || (B = {}))[(k.OK = 0)] = "OK"),
    (k[(k.CANCELLED = 1)] = "CANCELLED"),
    (k[(k.UNKNOWN = 2)] = "UNKNOWN"),
    (k[(k.INVALID_ARGUMENT = 3)] = "INVALID_ARGUMENT"),
    (k[(k.DEADLINE_EXCEEDED = 4)] = "DEADLINE_EXCEEDED"),
    (k[(k.NOT_FOUND = 5)] = "NOT_FOUND"),
    (k[(k.ALREADY_EXISTS = 6)] = "ALREADY_EXISTS"),
    (k[(k.PERMISSION_DENIED = 7)] = "PERMISSION_DENIED"),
    (k[(k.UNAUTHENTICATED = 16)] = "UNAUTHENTICATED"),
    (k[(k.RESOURCE_EXHAUSTED = 8)] = "RESOURCE_EXHAUSTED"),
    (k[(k.FAILED_PRECONDITION = 9)] = "FAILED_PRECONDITION"),
    (k[(k.ABORTED = 10)] = "ABORTED"),
    (k[(k.OUT_OF_RANGE = 11)] = "OUT_OF_RANGE"),
    (k[(k.UNIMPLEMENTED = 12)] = "UNIMPLEMENTED"),
    (k[(k.INTERNAL = 13)] = "INTERNAL"),
    (k[(k.UNAVAILABLE = 14)] = "UNAVAILABLE"),
    (k[(k.DATA_LOSS = 15)] = "DATA_LOSS");
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function A_() {
    return new TextEncoder();
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const R_ = new Mt([4294967295, 4294967295], 0);
function ec(n) {
    const e = A_().encode(n),
        t = new Sg();
    return t.update(e), new Uint8Array(t.digest());
}
function tc(n) {
    const e = new DataView(n.buffer),
        t = e.getUint32(0, !0),
        r = e.getUint32(4, !0),
        i = e.getUint32(8, !0),
        s = e.getUint32(12, !0);
    return [new Mt([t, r], 0), new Mt([i, s], 0)];
}
class Io {
    constructor(e, t, r) {
        if (((this.bitmap = e), (this.padding = t), (this.hashCount = r), t < 0 || t >= 8))
            throw new hn(`Invalid padding: ${t}`);
        if (r < 0) throw new hn(`Invalid hash count: ${r}`);
        if (e.length > 0 && this.hashCount === 0) throw new hn(`Invalid hash count: ${r}`);
        if (e.length === 0 && t !== 0) throw new hn(`Invalid padding when bitmap length is 0: ${t}`);
        (this.Ie = 8 * e.length - t), (this.Te = Mt.fromNumber(this.Ie));
    }
    Ee(e, t, r) {
        let i = e.add(t.multiply(Mt.fromNumber(r)));
        return i.compare(R_) === 1 && (i = new Mt([i.getBits(0), i.getBits(1)], 0)), i.modulo(this.Te).toNumber();
    }
    de(e) {
        return (this.bitmap[Math.floor(e / 8)] & (1 << e % 8)) != 0;
    }
    mightContain(e) {
        if (this.Ie === 0) return !1;
        const t = ec(e),
            [r, i] = tc(t);
        for (let s = 0; s < this.hashCount; s++) {
            const o = this.Ee(r, i, s);
            if (!this.de(o)) return !1;
        }
        return !0;
    }
    static create(e, t, r) {
        const i = e % 8 == 0 ? 0 : 8 - (e % 8),
            s = new Uint8Array(Math.ceil(e / 8)),
            o = new Io(s, i, t);
        return r.forEach((a) => o.insert(a)), o;
    }
    insert(e) {
        if (this.Ie === 0) return;
        const t = ec(e),
            [r, i] = tc(t);
        for (let s = 0; s < this.hashCount; s++) {
            const o = this.Ee(r, i, s);
            this.Ae(o);
        }
    }
    Ae(e) {
        const t = Math.floor(e / 8),
            r = e % 8;
        this.bitmap[t] |= 1 << r;
    }
}
class hn extends Error {
    constructor() {
        super(...arguments), (this.name = "BloomFilterError");
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yi {
    constructor(e, t, r, i, s) {
        (this.snapshotVersion = e),
            (this.targetChanges = t),
            (this.targetMismatches = r),
            (this.documentUpdates = i),
            (this.resolvedLimboDocuments = s);
    }
    static createSynthesizedRemoteEventForCurrentChange(e, t, r) {
        const i = new Map();
        return (
            i.set(e, Xn.createSynthesizedTargetChangeForCurrentChange(e, t, r)), new yi(P.min(), i, new x(D), Fe(), C())
        );
    }
}
class Xn {
    constructor(e, t, r, i, s) {
        (this.resumeToken = e),
            (this.current = t),
            (this.addedDocuments = r),
            (this.modifiedDocuments = i),
            (this.removedDocuments = s);
    }
    static createSynthesizedTargetChangeForCurrentChange(e, t, r) {
        return new Xn(r, t, C(), C(), C());
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vr {
    constructor(e, t, r, i) {
        (this.Re = e), (this.removedTargetIds = t), (this.key = r), (this.Ve = i);
    }
}
class Bl {
    constructor(e, t) {
        (this.targetId = e), (this.me = t);
    }
}
class ql {
    constructor(e, t, r = ae.EMPTY_BYTE_STRING, i = null) {
        (this.state = e), (this.targetIds = t), (this.resumeToken = r), (this.cause = i);
    }
}
class nc {
    constructor() {
        (this.fe = 0), (this.ge = ic()), (this.pe = ae.EMPTY_BYTE_STRING), (this.ye = !1), (this.we = !0);
    }
    get current() {
        return this.ye;
    }
    get resumeToken() {
        return this.pe;
    }
    get Se() {
        return this.fe !== 0;
    }
    get be() {
        return this.we;
    }
    De(e) {
        e.approximateByteSize() > 0 && ((this.we = !0), (this.pe = e));
    }
    Ce() {
        let e = C(),
            t = C(),
            r = C();
        return (
            this.ge.forEach((i, s) => {
                switch (s) {
                    case 0:
                        e = e.add(i);
                        break;
                    case 2:
                        t = t.add(i);
                        break;
                    case 1:
                        r = r.add(i);
                        break;
                    default:
                        A();
                }
            }),
            new Xn(this.pe, this.ye, e, t, r)
        );
    }
    ve() {
        (this.we = !1), (this.ge = ic());
    }
    Fe(e, t) {
        (this.we = !0), (this.ge = this.ge.insert(e, t));
    }
    Me(e) {
        (this.we = !0), (this.ge = this.ge.remove(e));
    }
    xe() {
        this.fe += 1;
    }
    Oe() {
        (this.fe -= 1), M(this.fe >= 0);
    }
    Ne() {
        (this.we = !0), (this.ye = !0);
    }
}
class P_ {
    constructor(e) {
        (this.Le = e), (this.Be = new Map()), (this.ke = Fe()), (this.qe = rc()), (this.Qe = new x(D));
    }
    Ke(e) {
        for (const t of e.Re) e.Ve && e.Ve.isFoundDocument() ? this.$e(t, e.Ve) : this.Ue(t, e.key, e.Ve);
        for (const t of e.removedTargetIds) this.Ue(t, e.key, e.Ve);
    }
    We(e) {
        this.forEachTarget(e, (t) => {
            const r = this.Ge(t);
            switch (e.state) {
                case 0:
                    this.ze(t) && r.De(e.resumeToken);
                    break;
                case 1:
                    r.Oe(), r.Se || r.ve(), r.De(e.resumeToken);
                    break;
                case 2:
                    r.Oe(), r.Se || this.removeTarget(t);
                    break;
                case 3:
                    this.ze(t) && (r.Ne(), r.De(e.resumeToken));
                    break;
                case 4:
                    this.ze(t) && (this.je(t), r.De(e.resumeToken));
                    break;
                default:
                    A();
            }
        });
    }
    forEachTarget(e, t) {
        e.targetIds.length > 0
            ? e.targetIds.forEach(t)
            : this.Be.forEach((r, i) => {
                  this.ze(i) && t(i);
              });
    }
    He(e) {
        const t = e.targetId,
            r = e.me.count,
            i = this.Je(t);
        if (i) {
            const s = i.target;
            if (vs(s))
                if (r === 0) {
                    const o = new E(s.path);
                    this.Ue(t, o, re.newNoDocument(o, P.min()));
                } else M(r === 1);
            else {
                const o = this.Ye(t);
                if (o !== r) {
                    const a = this.Ze(e),
                        c = a ? this.Xe(a, e, o) : 1;
                    if (c !== 0) {
                        this.je(t);
                        const u =
                            c === 2
                                ? "TargetPurposeExistenceFilterMismatchBloom"
                                : "TargetPurposeExistenceFilterMismatch";
                        this.Qe = this.Qe.insert(t, u);
                    }
                }
            }
        }
    }
    Ze(e) {
        const t = e.me.unchangedNames;
        if (!t || !t.bits) return null;
        const {
            bits: { bitmap: r = "", padding: i = 0 },
            hashCount: s = 0,
        } = t;
        let o, a;
        try {
            o = Et(r).toUint8Array();
        } catch (c) {
            if (c instanceof yl)
                return (
                    Bt(
                        "Decoding the base64 bloom filter in existence filter failed (" +
                            c.message +
                            "); ignoring the bloom filter and falling back to full re-query.",
                    ),
                    null
                );
            throw c;
        }
        try {
            a = new Io(o, i, s);
        } catch (c) {
            return Bt(c instanceof hn ? "BloomFilter error: " : "Applying bloom filter failed: ", c), null;
        }
        return a.Ie === 0 ? null : a;
    }
    Xe(e, t, r) {
        return t.me.count === r - this.nt(e, t.targetId) ? 0 : 2;
    }
    nt(e, t) {
        const r = this.Le.getRemoteKeysForTarget(t);
        let i = 0;
        return (
            r.forEach((s) => {
                const o = this.Le.tt(),
                    a = `projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;
                e.mightContain(a) || (this.Ue(t, s, null), i++);
            }),
            i
        );
    }
    rt(e) {
        const t = new Map();
        this.Be.forEach((s, o) => {
            const a = this.Je(o);
            if (a) {
                if (s.current && vs(a.target)) {
                    const c = new E(a.target.path);
                    this.ke.get(c) !== null || this.it(o, c) || this.Ue(o, c, re.newNoDocument(c, e));
                }
                s.be && (t.set(o, s.Ce()), s.ve());
            }
        });
        let r = C();
        this.qe.forEach((s, o) => {
            let a = !0;
            o.forEachWhile((c) => {
                const u = this.Je(c);
                return !u || u.purpose === "TargetPurposeLimboResolution" || ((a = !1), !1);
            }),
                a && (r = r.add(s));
        }),
            this.ke.forEach((s, o) => o.setReadTime(e));
        const i = new yi(e, t, this.Qe, this.ke, r);
        return (this.ke = Fe()), (this.qe = rc()), (this.Qe = new x(D)), i;
    }
    $e(e, t) {
        if (!this.ze(e)) return;
        const r = this.it(e, t.key) ? 2 : 0;
        this.Ge(e).Fe(t.key, r),
            (this.ke = this.ke.insert(t.key, t)),
            (this.qe = this.qe.insert(t.key, this.st(t.key).add(e)));
    }
    Ue(e, t, r) {
        if (!this.ze(e)) return;
        const i = this.Ge(e);
        this.it(e, t) ? i.Fe(t, 1) : i.Me(t),
            (this.qe = this.qe.insert(t, this.st(t).delete(e))),
            r && (this.ke = this.ke.insert(t, r));
    }
    removeTarget(e) {
        this.Be.delete(e);
    }
    Ye(e) {
        const t = this.Ge(e).Ce();
        return this.Le.getRemoteKeysForTarget(e).size + t.addedDocuments.size - t.removedDocuments.size;
    }
    xe(e) {
        this.Ge(e).xe();
    }
    Ge(e) {
        let t = this.Be.get(e);
        return t || ((t = new nc()), this.Be.set(e, t)), t;
    }
    st(e) {
        let t = this.qe.get(e);
        return t || ((t = new Z(D)), (this.qe = this.qe.insert(e, t))), t;
    }
    ze(e) {
        const t = this.Je(e) !== null;
        return t || y("WatchChangeAggregator", "Detected inactive target", e), t;
    }
    Je(e) {
        const t = this.Be.get(e);
        return t && t.Se ? null : this.Le.ot(e);
    }
    je(e) {
        this.Be.set(e, new nc()),
            this.Le.getRemoteKeysForTarget(e).forEach((t) => {
                this.Ue(e, t, null);
            });
    }
    it(e, t) {
        return this.Le.getRemoteKeysForTarget(e).has(t);
    }
}
function rc() {
    return new x(E.comparator);
}
function ic() {
    return new x(E.comparator);
}
const S_ = { asc: "ASCENDING", desc: "DESCENDING" },
    C_ = {
        "<": "LESS_THAN",
        "<=": "LESS_THAN_OR_EQUAL",
        ">": "GREATER_THAN",
        ">=": "GREATER_THAN_OR_EQUAL",
        "==": "EQUAL",
        "!=": "NOT_EQUAL",
        "array-contains": "ARRAY_CONTAINS",
        in: "IN",
        "not-in": "NOT_IN",
        "array-contains-any": "ARRAY_CONTAINS_ANY",
    },
    b_ = { and: "AND", or: "OR" };
class k_ {
    constructor(e, t) {
        (this.databaseId = e), (this.useProto3Json = t);
    }
}
function Ts(n, e) {
    return n.useProto3Json || hi(e) ? e : { value: e };
}
function Ur(n, e) {
    return n.useProto3Json
        ? `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`
        : { seconds: "" + e.seconds, nanos: e.nanoseconds };
}
function jl(n, e) {
    return n.useProto3Json ? e.toBase64() : e.toUint8Array();
}
function D_(n, e) {
    return Ur(n, e.toTimestamp());
}
function Se(n) {
    return (
        M(!!n),
        P.fromTimestamp(
            (function (t) {
                const r = Ze(t);
                return new z(r.seconds, r.nanos);
            })(n),
        )
    );
}
function To(n, e) {
    return ws(n, e).canonicalString();
}
function ws(n, e) {
    const t = (function (i) {
        return new O(["projects", i.projectId, "databases", i.database]);
    })(n).child("documents");
    return e === void 0 ? t : t.child(e);
}
function $l(n) {
    const e = O.fromString(n);
    return M(Kl(e)), e;
}
function As(n, e) {
    return To(n.databaseId, e.path);
}
function Hi(n, e) {
    const t = $l(e);
    if (t.get(1) !== n.databaseId.projectId)
        throw new _(
            f.INVALID_ARGUMENT,
            "Tried to deserialize key from different project: " + t.get(1) + " vs " + n.databaseId.projectId,
        );
    if (t.get(3) !== n.databaseId.database)
        throw new _(
            f.INVALID_ARGUMENT,
            "Tried to deserialize key from different database: " + t.get(3) + " vs " + n.databaseId.database,
        );
    return new E(Hl(t));
}
function zl(n, e) {
    return To(n.databaseId, e);
}
function V_(n) {
    const e = $l(n);
    return e.length === 4 ? O.emptyPath() : Hl(e);
}
function Rs(n) {
    return new O(["projects", n.databaseId.projectId, "databases", n.databaseId.database]).canonicalString();
}
function Hl(n) {
    return M(n.length > 4 && n.get(4) === "documents"), n.popFirst(5);
}
function sc(n, e, t) {
    return { name: As(n, e), fields: t.value.mapValue.fields };
}
function N_(n, e) {
    let t;
    if ("targetChange" in e) {
        e.targetChange;
        const r = (function (u) {
                return u === "NO_CHANGE"
                    ? 0
                    : u === "ADD"
                      ? 1
                      : u === "REMOVE"
                        ? 2
                        : u === "CURRENT"
                          ? 3
                          : u === "RESET"
                            ? 4
                            : A();
            })(e.targetChange.targetChangeType || "NO_CHANGE"),
            i = e.targetChange.targetIds || [],
            s = (function (u, l) {
                return u.useProto3Json
                    ? (M(l === void 0 || typeof l == "string"), ae.fromBase64String(l || ""))
                    : (M(l === void 0 || l instanceof Buffer || l instanceof Uint8Array),
                      ae.fromUint8Array(l || new Uint8Array()));
            })(n, e.targetChange.resumeToken),
            o = e.targetChange.cause,
            a =
                o &&
                (function (u) {
                    const l = u.code === void 0 ? f.UNKNOWN : Ul(u.code);
                    return new _(l, u.message || "");
                })(o);
        t = new ql(r, i, s, a || null);
    } else if ("documentChange" in e) {
        e.documentChange;
        const r = e.documentChange;
        r.document, r.document.name, r.document.updateTime;
        const i = Hi(n, r.document.name),
            s = Se(r.document.updateTime),
            o = r.document.createTime ? Se(r.document.createTime) : P.min(),
            a = new ue({ mapValue: { fields: r.document.fields } }),
            c = re.newFoundDocument(i, s, o, a),
            u = r.targetIds || [],
            l = r.removedTargetIds || [];
        t = new vr(u, l, c.key, c);
    } else if ("documentDelete" in e) {
        e.documentDelete;
        const r = e.documentDelete;
        r.document;
        const i = Hi(n, r.document),
            s = r.readTime ? Se(r.readTime) : P.min(),
            o = re.newNoDocument(i, s),
            a = r.removedTargetIds || [];
        t = new vr([], a, o.key, o);
    } else if ("documentRemove" in e) {
        e.documentRemove;
        const r = e.documentRemove;
        r.document;
        const i = Hi(n, r.document),
            s = r.removedTargetIds || [];
        t = new vr([], s, i, null);
    } else {
        if (!("filter" in e)) return A();
        {
            e.filter;
            const r = e.filter;
            r.targetId;
            const { count: i = 0, unchangedNames: s } = r,
                o = new T_(i, s),
                a = r.targetId;
            t = new Bl(a, o);
        }
    }
    return t;
}
function O_(n, e) {
    let t;
    if (e instanceof Yn) t = { update: sc(n, e.key, e.value) };
    else if (e instanceof vo) t = { delete: As(n, e.key) };
    else if (e instanceof ot) t = { update: sc(n, e.key, e.data), updateMask: $_(e.fieldMask) };
    else {
        if (!(e instanceof v_)) return A();
        t = { verify: As(n, e.key) };
    }
    return (
        e.fieldTransforms.length > 0 &&
            (t.updateTransforms = e.fieldTransforms.map((r) =>
                (function (s, o) {
                    const a = o.transform;
                    if (a instanceof xr)
                        return { fieldPath: o.field.canonicalString(), setToServerValue: "REQUEST_TIME" };
                    if (a instanceof On)
                        return { fieldPath: o.field.canonicalString(), appendMissingElements: { values: a.elements } };
                    if (a instanceof Mn)
                        return { fieldPath: o.field.canonicalString(), removeAllFromArray: { values: a.elements } };
                    if (a instanceof Fr) return { fieldPath: o.field.canonicalString(), increment: a.Pe };
                    throw A();
                })(0, r),
            )),
        e.precondition.isNone ||
            (t.currentDocument = (function (i, s) {
                return s.updateTime !== void 0
                    ? { updateTime: D_(i, s.updateTime) }
                    : s.exists !== void 0
                      ? { exists: s.exists }
                      : A();
            })(n, e.precondition)),
        t
    );
}
function M_(n, e) {
    return n && n.length > 0
        ? (M(e !== void 0),
          n.map((t) =>
              (function (i, s) {
                  let o = i.updateTime ? Se(i.updateTime) : Se(s);
                  return o.isEqual(P.min()) && (o = Se(s)), new g_(o, i.transformResults || []);
              })(t, e),
          ))
        : [];
}
function L_(n, e) {
    return { documents: [zl(n, e.path)] };
}
function x_(n, e) {
    const t = { structuredQuery: {} },
        r = e.path;
    let i;
    e.collectionGroup !== null
        ? ((i = r), (t.structuredQuery.from = [{ collectionId: e.collectionGroup, allDescendants: !0 }]))
        : ((i = r.popLast()), (t.structuredQuery.from = [{ collectionId: r.lastSegment() }])),
        (t.parent = zl(n, i));
    const s = (function (u) {
        if (u.length !== 0) return Wl(Ee.create(u, "and"));
    })(e.filters);
    s && (t.structuredQuery.where = s);
    const o = (function (u) {
        if (u.length !== 0)
            return u.map((l) =>
                (function (d) {
                    return { field: Ct(d.field), direction: B_(d.dir) };
                })(l),
            );
    })(e.orderBy);
    o && (t.structuredQuery.orderBy = o);
    const a = Ts(n, e.limit);
    return (
        a !== null && (t.structuredQuery.limit = a),
        e.startAt &&
            (t.structuredQuery.startAt = (function (u) {
                return { before: u.inclusive, values: u.position };
            })(e.startAt)),
        e.endAt &&
            (t.structuredQuery.endAt = (function (u) {
                return { before: !u.inclusive, values: u.position };
            })(e.endAt)),
        { _t: t, parent: i }
    );
}
function F_(n) {
    let e = V_(n.parent);
    const t = n.structuredQuery,
        r = t.from ? t.from.length : 0;
    let i = null;
    if (r > 0) {
        M(r === 1);
        const l = t.from[0];
        l.allDescendants ? (i = l.collectionId) : (e = e.child(l.collectionId));
    }
    let s = [];
    t.where &&
        (s = (function (h) {
            const d = Gl(h);
            return d instanceof Ee && Tl(d) ? d.getFilters() : [d];
        })(t.where));
    let o = [];
    t.orderBy &&
        (o = (function (h) {
            return h.map((d) =>
                (function (I) {
                    return new Nn(
                        bt(I.field),
                        (function (v) {
                            switch (v) {
                                case "ASCENDING":
                                    return "asc";
                                case "DESCENDING":
                                    return "desc";
                                default:
                                    return;
                            }
                        })(I.direction),
                    );
                })(d),
            );
        })(t.orderBy));
    let a = null;
    t.limit &&
        (a = (function (h) {
            let d;
            return (d = typeof h == "object" ? h.value : h), hi(d) ? null : d;
        })(t.limit));
    let c = null;
    t.startAt &&
        (c = (function (h) {
            const d = !!h.before,
                p = h.values || [];
            return new zt(p, d);
        })(t.startAt));
    let u = null;
    return (
        t.endAt &&
            (u = (function (h) {
                const d = !h.before,
                    p = h.values || [];
                return new zt(p, d);
            })(t.endAt)),
        r_(e, i, o, s, a, "F", c, u)
    );
}
function U_(n, e) {
    const t = (function (i) {
        switch (i) {
            case "TargetPurposeListen":
                return null;
            case "TargetPurposeExistenceFilterMismatch":
                return "existence-filter-mismatch";
            case "TargetPurposeExistenceFilterMismatchBloom":
                return "existence-filter-mismatch-bloom";
            case "TargetPurposeLimboResolution":
                return "limbo-document";
            default:
                return A();
        }
    })(e.purpose);
    return t == null ? null : { "goog-listen-tags": t };
}
function Gl(n) {
    return n.unaryFilter !== void 0
        ? (function (t) {
              switch (t.unaryFilter.op) {
                  case "IS_NAN":
                      const r = bt(t.unaryFilter.field);
                      return j.create(r, "==", { doubleValue: NaN });
                  case "IS_NULL":
                      const i = bt(t.unaryFilter.field);
                      return j.create(i, "==", { nullValue: "NULL_VALUE" });
                  case "IS_NOT_NAN":
                      const s = bt(t.unaryFilter.field);
                      return j.create(s, "!=", { doubleValue: NaN });
                  case "IS_NOT_NULL":
                      const o = bt(t.unaryFilter.field);
                      return j.create(o, "!=", { nullValue: "NULL_VALUE" });
                  default:
                      return A();
              }
          })(n)
        : n.fieldFilter !== void 0
          ? (function (t) {
                return j.create(
                    bt(t.fieldFilter.field),
                    (function (i) {
                        switch (i) {
                            case "EQUAL":
                                return "==";
                            case "NOT_EQUAL":
                                return "!=";
                            case "GREATER_THAN":
                                return ">";
                            case "GREATER_THAN_OR_EQUAL":
                                return ">=";
                            case "LESS_THAN":
                                return "<";
                            case "LESS_THAN_OR_EQUAL":
                                return "<=";
                            case "ARRAY_CONTAINS":
                                return "array-contains";
                            case "IN":
                                return "in";
                            case "NOT_IN":
                                return "not-in";
                            case "ARRAY_CONTAINS_ANY":
                                return "array-contains-any";
                            default:
                                return A();
                        }
                    })(t.fieldFilter.op),
                    t.fieldFilter.value,
                );
            })(n)
          : n.compositeFilter !== void 0
            ? (function (t) {
                  return Ee.create(
                      t.compositeFilter.filters.map((r) => Gl(r)),
                      (function (i) {
                          switch (i) {
                              case "AND":
                                  return "and";
                              case "OR":
                                  return "or";
                              default:
                                  return A();
                          }
                      })(t.compositeFilter.op),
                  );
              })(n)
            : A();
}
function B_(n) {
    return S_[n];
}
function q_(n) {
    return C_[n];
}
function j_(n) {
    return b_[n];
}
function Ct(n) {
    return { fieldPath: n.canonicalString() };
}
function bt(n) {
    return Y.fromServerFormat(n.fieldPath);
}
function Wl(n) {
    return n instanceof j
        ? (function (t) {
              if (t.op === "==") {
                  if (Ha(t.value)) return { unaryFilter: { field: Ct(t.field), op: "IS_NAN" } };
                  if (za(t.value)) return { unaryFilter: { field: Ct(t.field), op: "IS_NULL" } };
              } else if (t.op === "!=") {
                  if (Ha(t.value)) return { unaryFilter: { field: Ct(t.field), op: "IS_NOT_NAN" } };
                  if (za(t.value)) return { unaryFilter: { field: Ct(t.field), op: "IS_NOT_NULL" } };
              }
              return { fieldFilter: { field: Ct(t.field), op: q_(t.op), value: t.value } };
          })(n)
        : n instanceof Ee
          ? (function (t) {
                const r = t.getFilters().map((i) => Wl(i));
                return r.length === 1 ? r[0] : { compositeFilter: { op: j_(t.op), filters: r } };
            })(n)
          : A();
}
function $_(n) {
    const e = [];
    return n.fields.forEach((t) => e.push(t.canonicalString())), { fieldPaths: e };
}
function Kl(n) {
    return n.length >= 4 && n.get(0) === "projects" && n.get(2) === "databases";
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class We {
    constructor(e, t, r, i, s = P.min(), o = P.min(), a = ae.EMPTY_BYTE_STRING, c = null) {
        (this.target = e),
            (this.targetId = t),
            (this.purpose = r),
            (this.sequenceNumber = i),
            (this.snapshotVersion = s),
            (this.lastLimboFreeSnapshotVersion = o),
            (this.resumeToken = a),
            (this.expectedCount = c);
    }
    withSequenceNumber(e) {
        return new We(
            this.target,
            this.targetId,
            this.purpose,
            e,
            this.snapshotVersion,
            this.lastLimboFreeSnapshotVersion,
            this.resumeToken,
            this.expectedCount,
        );
    }
    withResumeToken(e, t) {
        return new We(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            t,
            this.lastLimboFreeSnapshotVersion,
            e,
            null,
        );
    }
    withExpectedCount(e) {
        return new We(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            this.snapshotVersion,
            this.lastLimboFreeSnapshotVersion,
            this.resumeToken,
            e,
        );
    }
    withLastLimboFreeSnapshotVersion(e) {
        return new We(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            this.snapshotVersion,
            e,
            this.resumeToken,
            this.expectedCount,
        );
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class z_ {
    constructor(e) {
        this.ut = e;
    }
}
function H_(n) {
    const e = F_({ parent: n.parent, structuredQuery: n.structuredQuery });
    return n.limitType === "LAST" ? Is(e, e.limit, "L") : e;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class G_ {
    constructor() {
        this.on = new W_();
    }
    addToCollectionParentIndex(e, t) {
        return this.on.add(t), m.resolve();
    }
    getCollectionParents(e, t) {
        return m.resolve(this.on.getEntries(t));
    }
    addFieldIndex(e, t) {
        return m.resolve();
    }
    deleteFieldIndex(e, t) {
        return m.resolve();
    }
    deleteAllFieldIndexes(e) {
        return m.resolve();
    }
    createTargetIndexes(e, t) {
        return m.resolve();
    }
    getDocumentsMatchingTarget(e, t) {
        return m.resolve(null);
    }
    getIndexType(e, t) {
        return m.resolve(0);
    }
    getFieldIndexes(e, t) {
        return m.resolve([]);
    }
    getNextCollectionGroupToUpdate(e) {
        return m.resolve(null);
    }
    getMinOffset(e, t) {
        return m.resolve(Xe.min());
    }
    getMinOffsetFromCollectionGroup(e, t) {
        return m.resolve(Xe.min());
    }
    updateCollectionGroup(e, t, r) {
        return m.resolve();
    }
    updateIndexEntries(e, t) {
        return m.resolve();
    }
}
class W_ {
    constructor() {
        this.index = {};
    }
    add(e) {
        const t = e.lastSegment(),
            r = e.popLast(),
            i = this.index[t] || new Z(O.comparator),
            s = !i.has(r);
        return (this.index[t] = i.add(r)), s;
    }
    has(e) {
        const t = e.lastSegment(),
            r = e.popLast(),
            i = this.index[t];
        return i && i.has(r);
    }
    getEntries(e) {
        return (this.index[e] || new Z(O.comparator)).toArray();
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ht {
    constructor(e) {
        this.xn = e;
    }
    next() {
        return (this.xn += 2), this.xn;
    }
    static On() {
        return new Ht(0);
    }
    static Nn() {
        return new Ht(-1);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class K_ {
    constructor() {
        (this.changes = new Zt(
            (e) => e.toString(),
            (e, t) => e.isEqual(t),
        )),
            (this.changesApplied = !1);
    }
    addEntry(e) {
        this.assertNotApplied(), this.changes.set(e.key, e);
    }
    removeEntry(e, t) {
        this.assertNotApplied(), this.changes.set(e, re.newInvalidDocument(e).setReadTime(t));
    }
    getEntry(e, t) {
        this.assertNotApplied();
        const r = this.changes.get(t);
        return r !== void 0 ? m.resolve(r) : this.getFromCache(e, t);
    }
    getEntries(e, t) {
        return this.getAllFromCache(e, t);
    }
    apply(e) {
        return this.assertNotApplied(), (this.changesApplied = !0), this.applyChanges(e);
    }
    assertNotApplied() {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Q_ {
    constructor(e, t) {
        (this.overlayedDocument = e), (this.mutatedFields = t);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class J_ {
    constructor(e, t, r, i) {
        (this.remoteDocumentCache = e),
            (this.mutationQueue = t),
            (this.documentOverlayCache = r),
            (this.indexManager = i);
    }
    getDocument(e, t) {
        let r = null;
        return this.documentOverlayCache
            .getOverlay(e, t)
            .next((i) => ((r = i), this.remoteDocumentCache.getEntry(e, t)))
            .next((i) => (r !== null && _n(r.mutation, i, he.empty(), z.now()), i));
    }
    getDocuments(e, t) {
        return this.remoteDocumentCache
            .getEntries(e, t)
            .next((r) => this.getLocalViewOfDocuments(e, r, C()).next(() => r));
    }
    getLocalViewOfDocuments(e, t, r = C()) {
        const i = ft();
        return this.populateOverlays(e, i, t).next(() =>
            this.computeViews(e, t, i, r).next((s) => {
                let o = ln();
                return (
                    s.forEach((a, c) => {
                        o = o.insert(a, c.overlayedDocument);
                    }),
                    o
                );
            }),
        );
    }
    getOverlayedDocuments(e, t) {
        const r = ft();
        return this.populateOverlays(e, r, t).next(() => this.computeViews(e, t, r, C()));
    }
    populateOverlays(e, t, r) {
        const i = [];
        return (
            r.forEach((s) => {
                t.has(s) || i.push(s);
            }),
            this.documentOverlayCache.getOverlays(e, i).next((s) => {
                s.forEach((o, a) => {
                    t.set(o, a);
                });
            })
        );
    }
    computeViews(e, t, r, i) {
        let s = Fe();
        const o = gn(),
            a = (function () {
                return gn();
            })();
        return (
            t.forEach((c, u) => {
                const l = r.get(u.key);
                i.has(u.key) && (l === void 0 || l.mutation instanceof ot)
                    ? (s = s.insert(u.key, u))
                    : l !== void 0
                      ? (o.set(u.key, l.mutation.getFieldMask()), _n(l.mutation, u, l.mutation.getFieldMask(), z.now()))
                      : o.set(u.key, he.empty());
            }),
            this.recalculateAndSaveOverlays(e, s).next(
                (c) => (
                    c.forEach((u, l) => o.set(u, l)),
                    t.forEach((u, l) => {
                        var h;
                        return a.set(u, new Q_(l, (h = o.get(u)) !== null && h !== void 0 ? h : null));
                    }),
                    a
                ),
            )
        );
    }
    recalculateAndSaveOverlays(e, t) {
        const r = gn();
        let i = new x((o, a) => o - a),
            s = C();
        return this.mutationQueue
            .getAllMutationBatchesAffectingDocumentKeys(e, t)
            .next((o) => {
                for (const a of o)
                    a.keys().forEach((c) => {
                        const u = t.get(c);
                        if (u === null) return;
                        let l = r.get(c) || he.empty();
                        (l = a.applyToLocalView(u, l)), r.set(c, l);
                        const h = (i.get(a.batchId) || C()).add(c);
                        i = i.insert(a.batchId, h);
                    });
            })
            .next(() => {
                const o = [],
                    a = i.getReverseIterator();
                for (; a.hasNext(); ) {
                    const c = a.getNext(),
                        u = c.key,
                        l = c.value,
                        h = kl();
                    l.forEach((d) => {
                        if (!s.has(d)) {
                            const p = xl(t.get(d), r.get(d));
                            p !== null && h.set(d, p), (s = s.add(d));
                        }
                    }),
                        o.push(this.documentOverlayCache.saveOverlays(e, u, h));
                }
                return m.waitFor(o);
            })
            .next(() => r);
    }
    recalculateAndSaveOverlaysForDocumentKeys(e, t) {
        return this.remoteDocumentCache.getEntries(e, t).next((r) => this.recalculateAndSaveOverlays(e, r));
    }
    getDocumentsMatchingQuery(e, t, r, i) {
        return (function (o) {
            return E.isDocumentKey(o.path) && o.collectionGroup === null && o.filters.length === 0;
        })(t)
            ? this.getDocumentsMatchingDocumentQuery(e, t.path)
            : yo(t)
              ? this.getDocumentsMatchingCollectionGroupQuery(e, t, r, i)
              : this.getDocumentsMatchingCollectionQuery(e, t, r, i);
    }
    getNextDocuments(e, t, r, i) {
        return this.remoteDocumentCache.getAllFromCollectionGroup(e, t, r, i).next((s) => {
            const o =
                i - s.size > 0
                    ? this.documentOverlayCache.getOverlaysForCollectionGroup(e, t, r.largestBatchId, i - s.size)
                    : m.resolve(ft());
            let a = -1,
                c = s;
            return o.next((u) =>
                m
                    .forEach(
                        u,
                        (l, h) => (
                            a < h.largestBatchId && (a = h.largestBatchId),
                            s.get(l)
                                ? m.resolve()
                                : this.remoteDocumentCache.getEntry(e, l).next((d) => {
                                      c = c.insert(l, d);
                                  })
                        ),
                    )
                    .next(() => this.populateOverlays(e, u, s))
                    .next(() => this.computeViews(e, c, u, C()))
                    .next((l) => ({ batchId: a, changes: bl(l) })),
            );
        });
    }
    getDocumentsMatchingDocumentQuery(e, t) {
        return this.getDocument(e, new E(t)).next((r) => {
            let i = ln();
            return r.isFoundDocument() && (i = i.insert(r.key, r)), i;
        });
    }
    getDocumentsMatchingCollectionGroupQuery(e, t, r, i) {
        const s = t.collectionGroup;
        let o = ln();
        return this.indexManager.getCollectionParents(e, s).next((a) =>
            m
                .forEach(a, (c) => {
                    const u = (function (h, d) {
                        return new At(
                            d,
                            null,
                            h.explicitOrderBy.slice(),
                            h.filters.slice(),
                            h.limit,
                            h.limitType,
                            h.startAt,
                            h.endAt,
                        );
                    })(t, c.child(s));
                    return this.getDocumentsMatchingCollectionQuery(e, u, r, i).next((l) => {
                        l.forEach((h, d) => {
                            o = o.insert(h, d);
                        });
                    });
                })
                .next(() => o),
        );
    }
    getDocumentsMatchingCollectionQuery(e, t, r, i) {
        let s;
        return this.documentOverlayCache
            .getOverlaysForCollection(e, t.path, r.largestBatchId)
            .next((o) => ((s = o), this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, r, s, i)))
            .next((o) => {
                s.forEach((c, u) => {
                    const l = u.getKey();
                    o.get(l) === null && (o = o.insert(l, re.newInvalidDocument(l)));
                });
                let a = ln();
                return (
                    o.forEach((c, u) => {
                        const l = s.get(c);
                        l !== void 0 && _n(l.mutation, u, he.empty(), z.now()), mi(t, u) && (a = a.insert(c, u));
                    }),
                    a
                );
            });
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Y_ {
    constructor(e) {
        (this.serializer = e), (this.ur = new Map()), (this.cr = new Map());
    }
    getBundleMetadata(e, t) {
        return m.resolve(this.ur.get(t));
    }
    saveBundleMetadata(e, t) {
        return (
            this.ur.set(
                t.id,
                (function (i) {
                    return { id: i.id, version: i.version, createTime: Se(i.createTime) };
                })(t),
            ),
            m.resolve()
        );
    }
    getNamedQuery(e, t) {
        return m.resolve(this.cr.get(t));
    }
    saveNamedQuery(e, t) {
        return (
            this.cr.set(
                t.name,
                (function (i) {
                    return { name: i.name, query: H_(i.bundledQuery), readTime: Se(i.readTime) };
                })(t),
            ),
            m.resolve()
        );
    }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class X_ {
    constructor() {
        (this.overlays = new x(E.comparator)), (this.lr = new Map());
    }
    getOverlay(e, t) {
        return m.resolve(this.overlays.get(t));
    }
    getOverlays(e, t) {
        const r = ft();
        return m
            .forEach(t, (i) =>
                this.getOverlay(e, i).next((s) => {
                    s !== null && r.set(i, s);
                }),
            )
            .next(() => r);
    }
    saveOverlays(e, t, r) {
        return (
            r.forEach((i, s) => {
                this.lt(e, t, s);
            }),
            m.resolve()
        );
    }
    removeOverlaysForBatchId(e, t, r) {
        const i = this.lr.get(r);
        return (
            i !== void 0 && (i.forEach((s) => (this.overlays = this.overlays.remove(s))), this.lr.delete(r)),
            m.resolve()
        );
    }
    getOverlaysForCollection(e, t, r) {
        const i = ft(),
            s = t.length + 1,
            o = new E(t.child("")),
            a = this.overlays.getIteratorFrom(o);
        for (; a.hasNext(); ) {
            const c = a.getNext().value,
                u = c.getKey();
            if (!t.isPrefixOf(u.path)) break;
            u.path.length === s && c.largestBatchId > r && i.set(c.getKey(), c);
        }
        return m.resolve(i);
    }
    getOverlaysForCollectionGroup(e, t, r, i) {
        let s = new x((u, l) => u - l);
        const o = this.overlays.getIterator();
        for (; o.hasNext(); ) {
            const u = o.getNext().value;
            if (u.getKey().getCollectionGroup() === t && u.largestBatchId > r) {
                let l = s.get(u.largestBatchId);
                l === null && ((l = ft()), (s = s.insert(u.largestBatchId, l))), l.set(u.getKey(), u);
            }
        }
        const a = ft(),
            c = s.getIterator();
        for (; c.hasNext() && (c.getNext().value.forEach((u, l) => a.set(u, l)), !(a.size() >= i)); );
        return m.resolve(a);
    }
    lt(e, t, r) {
        const i = this.overlays.get(r.key);
        if (i !== null) {
            const o = this.lr.get(i.largestBatchId).delete(r.key);
            this.lr.set(i.largestBatchId, o);
        }
        this.overlays = this.overlays.insert(r.key, new I_(t, r));
        let s = this.lr.get(t);
        s === void 0 && ((s = C()), this.lr.set(t, s)), this.lr.set(t, s.add(r.key));
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class wo {
    constructor() {
        (this.hr = new Z(H.Pr)), (this.Ir = new Z(H.Tr));
    }
    isEmpty() {
        return this.hr.isEmpty();
    }
    addReference(e, t) {
        const r = new H(e, t);
        (this.hr = this.hr.add(r)), (this.Ir = this.Ir.add(r));
    }
    Er(e, t) {
        e.forEach((r) => this.addReference(r, t));
    }
    removeReference(e, t) {
        this.dr(new H(e, t));
    }
    Ar(e, t) {
        e.forEach((r) => this.removeReference(r, t));
    }
    Rr(e) {
        const t = new E(new O([])),
            r = new H(t, e),
            i = new H(t, e + 1),
            s = [];
        return (
            this.Ir.forEachInRange([r, i], (o) => {
                this.dr(o), s.push(o.key);
            }),
            s
        );
    }
    Vr() {
        this.hr.forEach((e) => this.dr(e));
    }
    dr(e) {
        (this.hr = this.hr.delete(e)), (this.Ir = this.Ir.delete(e));
    }
    mr(e) {
        const t = new E(new O([])),
            r = new H(t, e),
            i = new H(t, e + 1);
        let s = C();
        return (
            this.Ir.forEachInRange([r, i], (o) => {
                s = s.add(o.key);
            }),
            s
        );
    }
    containsKey(e) {
        const t = new H(e, 0),
            r = this.hr.firstAfterOrEqual(t);
        return r !== null && e.isEqual(r.key);
    }
}
class H {
    constructor(e, t) {
        (this.key = e), (this.gr = t);
    }
    static Pr(e, t) {
        return E.comparator(e.key, t.key) || D(e.gr, t.gr);
    }
    static Tr(e, t) {
        return D(e.gr, t.gr) || E.comparator(e.key, t.key);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Z_ {
    constructor(e, t) {
        (this.indexManager = e),
            (this.referenceDelegate = t),
            (this.mutationQueue = []),
            (this.pr = 1),
            (this.yr = new Z(H.Pr));
    }
    checkEmpty(e) {
        return m.resolve(this.mutationQueue.length === 0);
    }
    addMutationBatch(e, t, r, i) {
        const s = this.pr;
        this.pr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
        const o = new E_(s, t, r, i);
        this.mutationQueue.push(o);
        for (const a of i)
            (this.yr = this.yr.add(new H(a.key, s))),
                this.indexManager.addToCollectionParentIndex(e, a.key.path.popLast());
        return m.resolve(o);
    }
    lookupMutationBatch(e, t) {
        return m.resolve(this.wr(t));
    }
    getNextMutationBatchAfterBatchId(e, t) {
        const r = t + 1,
            i = this.Sr(r),
            s = i < 0 ? 0 : i;
        return m.resolve(this.mutationQueue.length > s ? this.mutationQueue[s] : null);
    }
    getHighestUnacknowledgedBatchId() {
        return m.resolve(this.mutationQueue.length === 0 ? -1 : this.pr - 1);
    }
    getAllMutationBatches(e) {
        return m.resolve(this.mutationQueue.slice());
    }
    getAllMutationBatchesAffectingDocumentKey(e, t) {
        const r = new H(t, 0),
            i = new H(t, Number.POSITIVE_INFINITY),
            s = [];
        return (
            this.yr.forEachInRange([r, i], (o) => {
                const a = this.wr(o.gr);
                s.push(a);
            }),
            m.resolve(s)
        );
    }
    getAllMutationBatchesAffectingDocumentKeys(e, t) {
        let r = new Z(D);
        return (
            t.forEach((i) => {
                const s = new H(i, 0),
                    o = new H(i, Number.POSITIVE_INFINITY);
                this.yr.forEachInRange([s, o], (a) => {
                    r = r.add(a.gr);
                });
            }),
            m.resolve(this.br(r))
        );
    }
    getAllMutationBatchesAffectingQuery(e, t) {
        const r = t.path,
            i = r.length + 1;
        let s = r;
        E.isDocumentKey(s) || (s = s.child(""));
        const o = new H(new E(s), 0);
        let a = new Z(D);
        return (
            this.yr.forEachWhile((c) => {
                const u = c.key.path;
                return !!r.isPrefixOf(u) && (u.length === i && (a = a.add(c.gr)), !0);
            }, o),
            m.resolve(this.br(a))
        );
    }
    br(e) {
        const t = [];
        return (
            e.forEach((r) => {
                const i = this.wr(r);
                i !== null && t.push(i);
            }),
            t
        );
    }
    removeMutationBatch(e, t) {
        M(this.Dr(t.batchId, "removed") === 0), this.mutationQueue.shift();
        let r = this.yr;
        return m
            .forEach(t.mutations, (i) => {
                const s = new H(i.key, t.batchId);
                return (r = r.delete(s)), this.referenceDelegate.markPotentiallyOrphaned(e, i.key);
            })
            .next(() => {
                this.yr = r;
            });
    }
    Fn(e) {}
    containsKey(e, t) {
        const r = new H(t, 0),
            i = this.yr.firstAfterOrEqual(r);
        return m.resolve(t.isEqual(i && i.key));
    }
    performConsistencyCheck(e) {
        return this.mutationQueue.length, m.resolve();
    }
    Dr(e, t) {
        return this.Sr(e);
    }
    Sr(e) {
        return this.mutationQueue.length === 0 ? 0 : e - this.mutationQueue[0].batchId;
    }
    wr(e) {
        const t = this.Sr(e);
        return t < 0 || t >= this.mutationQueue.length ? null : this.mutationQueue[t];
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ey {
    constructor(e) {
        (this.Cr = e),
            (this.docs = (function () {
                return new x(E.comparator);
            })()),
            (this.size = 0);
    }
    setIndexManager(e) {
        this.indexManager = e;
    }
    addEntry(e, t) {
        const r = t.key,
            i = this.docs.get(r),
            s = i ? i.size : 0,
            o = this.Cr(t);
        return (
            (this.docs = this.docs.insert(r, { document: t.mutableCopy(), size: o })),
            (this.size += o - s),
            this.indexManager.addToCollectionParentIndex(e, r.path.popLast())
        );
    }
    removeEntry(e) {
        const t = this.docs.get(e);
        t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
    }
    getEntry(e, t) {
        const r = this.docs.get(t);
        return m.resolve(r ? r.document.mutableCopy() : re.newInvalidDocument(t));
    }
    getEntries(e, t) {
        let r = Fe();
        return (
            t.forEach((i) => {
                const s = this.docs.get(i);
                r = r.insert(i, s ? s.document.mutableCopy() : re.newInvalidDocument(i));
            }),
            m.resolve(r)
        );
    }
    getDocumentsMatchingQuery(e, t, r, i) {
        let s = Fe();
        const o = t.path,
            a = new E(o.child("")),
            c = this.docs.getIteratorFrom(a);
        for (; c.hasNext(); ) {
            const {
                key: u,
                value: { document: l },
            } = c.getNext();
            if (!o.isPrefixOf(u.path)) break;
            u.path.length > o.length + 1 ||
                Ug(Fg(l), r) <= 0 ||
                ((i.has(l.key) || mi(t, l)) && (s = s.insert(l.key, l.mutableCopy())));
        }
        return m.resolve(s);
    }
    getAllFromCollectionGroup(e, t, r, i) {
        A();
    }
    vr(e, t) {
        return m.forEach(this.docs, (r) => t(r));
    }
    newChangeBuffer(e) {
        return new ty(this);
    }
    getSize(e) {
        return m.resolve(this.size);
    }
}
class ty extends K_ {
    constructor(e) {
        super(), (this._r = e);
    }
    applyChanges(e) {
        const t = [];
        return (
            this.changes.forEach((r, i) => {
                i.isValidDocument() ? t.push(this._r.addEntry(e, i)) : this._r.removeEntry(r);
            }),
            m.waitFor(t)
        );
    }
    getFromCache(e, t) {
        return this._r.getEntry(e, t);
    }
    getAllFromCache(e, t) {
        return this._r.getEntries(e, t);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ny {
    constructor(e) {
        (this.persistence = e),
            (this.Fr = new Zt((t) => go(t), _o)),
            (this.lastRemoteSnapshotVersion = P.min()),
            (this.highestTargetId = 0),
            (this.Mr = 0),
            (this.Or = new wo()),
            (this.targetCount = 0),
            (this.Nr = Ht.On());
    }
    forEachTarget(e, t) {
        return this.Fr.forEach((r, i) => t(i)), m.resolve();
    }
    getLastRemoteSnapshotVersion(e) {
        return m.resolve(this.lastRemoteSnapshotVersion);
    }
    getHighestSequenceNumber(e) {
        return m.resolve(this.Mr);
    }
    allocateTargetId(e) {
        return (this.highestTargetId = this.Nr.next()), m.resolve(this.highestTargetId);
    }
    setTargetsMetadata(e, t, r) {
        return r && (this.lastRemoteSnapshotVersion = r), t > this.Mr && (this.Mr = t), m.resolve();
    }
    kn(e) {
        this.Fr.set(e.target, e);
        const t = e.targetId;
        t > this.highestTargetId && ((this.Nr = new Ht(t)), (this.highestTargetId = t)),
            e.sequenceNumber > this.Mr && (this.Mr = e.sequenceNumber);
    }
    addTargetData(e, t) {
        return this.kn(t), (this.targetCount += 1), m.resolve();
    }
    updateTargetData(e, t) {
        return this.kn(t), m.resolve();
    }
    removeTargetData(e, t) {
        return this.Fr.delete(t.target), this.Or.Rr(t.targetId), (this.targetCount -= 1), m.resolve();
    }
    removeTargets(e, t, r) {
        let i = 0;
        const s = [];
        return (
            this.Fr.forEach((o, a) => {
                a.sequenceNumber <= t &&
                    r.get(a.targetId) === null &&
                    (this.Fr.delete(o), s.push(this.removeMatchingKeysForTargetId(e, a.targetId)), i++);
            }),
            m.waitFor(s).next(() => i)
        );
    }
    getTargetCount(e) {
        return m.resolve(this.targetCount);
    }
    getTargetData(e, t) {
        const r = this.Fr.get(t) || null;
        return m.resolve(r);
    }
    addMatchingKeys(e, t, r) {
        return this.Or.Er(t, r), m.resolve();
    }
    removeMatchingKeys(e, t, r) {
        this.Or.Ar(t, r);
        const i = this.persistence.referenceDelegate,
            s = [];
        return (
            i &&
                t.forEach((o) => {
                    s.push(i.markPotentiallyOrphaned(e, o));
                }),
            m.waitFor(s)
        );
    }
    removeMatchingKeysForTargetId(e, t) {
        return this.Or.Rr(t), m.resolve();
    }
    getMatchingKeysForTargetId(e, t) {
        const r = this.Or.mr(t);
        return m.resolve(r);
    }
    containsKey(e, t) {
        return m.resolve(this.Or.containsKey(t));
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ry {
    constructor(e, t) {
        (this.Lr = {}),
            (this.overlays = {}),
            (this.Br = new fo(0)),
            (this.kr = !1),
            (this.kr = !0),
            (this.referenceDelegate = e(this)),
            (this.qr = new ny(this)),
            (this.indexManager = new G_()),
            (this.remoteDocumentCache = (function (i) {
                return new ey(i);
            })((r) => this.referenceDelegate.Qr(r))),
            (this.serializer = new z_(t)),
            (this.Kr = new Y_(this.serializer));
    }
    start() {
        return Promise.resolve();
    }
    shutdown() {
        return (this.kr = !1), Promise.resolve();
    }
    get started() {
        return this.kr;
    }
    setDatabaseDeletedListener() {}
    setNetworkEnabled() {}
    getIndexManager(e) {
        return this.indexManager;
    }
    getDocumentOverlayCache(e) {
        let t = this.overlays[e.toKey()];
        return t || ((t = new X_()), (this.overlays[e.toKey()] = t)), t;
    }
    getMutationQueue(e, t) {
        let r = this.Lr[e.toKey()];
        return r || ((r = new Z_(t, this.referenceDelegate)), (this.Lr[e.toKey()] = r)), r;
    }
    getTargetCache() {
        return this.qr;
    }
    getRemoteDocumentCache() {
        return this.remoteDocumentCache;
    }
    getBundleCache() {
        return this.Kr;
    }
    runTransaction(e, t, r) {
        y("MemoryPersistence", "Starting transaction:", e);
        const i = new iy(this.Br.next());
        return (
            this.referenceDelegate.$r(),
            r(i)
                .next((s) => this.referenceDelegate.Ur(i).next(() => s))
                .toPromise()
                .then((s) => (i.raiseOnCommittedEvent(), s))
        );
    }
    Wr(e, t) {
        return m.or(Object.values(this.Lr).map((r) => () => r.containsKey(e, t)));
    }
}
class iy extends qg {
    constructor(e) {
        super(), (this.currentSequenceNumber = e);
    }
}
class Ao {
    constructor(e) {
        (this.persistence = e), (this.Gr = new wo()), (this.zr = null);
    }
    static jr(e) {
        return new Ao(e);
    }
    get Hr() {
        if (this.zr) return this.zr;
        throw A();
    }
    addReference(e, t, r) {
        return this.Gr.addReference(r, t), this.Hr.delete(r.toString()), m.resolve();
    }
    removeReference(e, t, r) {
        return this.Gr.removeReference(r, t), this.Hr.add(r.toString()), m.resolve();
    }
    markPotentiallyOrphaned(e, t) {
        return this.Hr.add(t.toString()), m.resolve();
    }
    removeTarget(e, t) {
        this.Gr.Rr(t.targetId).forEach((i) => this.Hr.add(i.toString()));
        const r = this.persistence.getTargetCache();
        return r
            .getMatchingKeysForTargetId(e, t.targetId)
            .next((i) => {
                i.forEach((s) => this.Hr.add(s.toString()));
            })
            .next(() => r.removeTargetData(e, t));
    }
    $r() {
        this.zr = new Set();
    }
    Ur(e) {
        const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        return m
            .forEach(this.Hr, (r) => {
                const i = E.fromPath(r);
                return this.Jr(e, i).next((s) => {
                    s || t.removeEntry(i, P.min());
                });
            })
            .next(() => ((this.zr = null), t.apply(e)));
    }
    updateLimboDocument(e, t) {
        return this.Jr(e, t).next((r) => {
            r ? this.Hr.delete(t.toString()) : this.Hr.add(t.toString());
        });
    }
    Qr(e) {
        return 0;
    }
    Jr(e, t) {
        return m.or([
            () => m.resolve(this.Gr.containsKey(t)),
            () => this.persistence.getTargetCache().containsKey(e, t),
            () => this.persistence.Wr(e, t),
        ]);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ro {
    constructor(e, t, r, i) {
        (this.targetId = e), (this.fromCache = t), (this.ki = r), (this.qi = i);
    }
    static Qi(e, t) {
        let r = C(),
            i = C();
        for (const s of t.docChanges)
            switch (s.type) {
                case 0:
                    r = r.add(s.doc.key);
                    break;
                case 1:
                    i = i.add(s.doc.key);
            }
        return new Ro(e, t.fromCache, r, i);
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sy {
    constructor() {
        this._documentReadCount = 0;
    }
    get documentReadCount() {
        return this._documentReadCount;
    }
    incrementDocumentReadCount(e) {
        this._documentReadCount += e;
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oy {
    constructor() {
        (this.Ki = !1),
            (this.$i = !1),
            (this.Ui = 100),
            (this.Wi = (function () {
                return Hh() ? 8 : jg(ee()) > 0 ? 6 : 4;
            })());
    }
    initialize(e, t) {
        (this.Gi = e), (this.indexManager = t), (this.Ki = !0);
    }
    getDocumentsMatchingQuery(e, t, r, i) {
        const s = { result: null };
        return this.zi(e, t)
            .next((o) => {
                s.result = o;
            })
            .next(() => {
                if (!s.result)
                    return this.ji(e, t, i, r).next((o) => {
                        s.result = o;
                    });
            })
            .next(() => {
                if (s.result) return;
                const o = new sy();
                return this.Hi(e, t, o).next((a) => {
                    if (((s.result = a), this.$i)) return this.Ji(e, t, o, a.size);
                });
            })
            .next(() => s.result);
    }
    Ji(e, t, r, i) {
        return r.documentReadCount < this.Ui
            ? (sn() <= b.DEBUG &&
                  y(
                      "QueryEngine",
                      "SDK will not create cache indexes for query:",
                      St(t),
                      "since it only creates cache indexes for collection contains",
                      "more than or equal to",
                      this.Ui,
                      "documents",
                  ),
              m.resolve())
            : (sn() <= b.DEBUG &&
                  y(
                      "QueryEngine",
                      "Query:",
                      St(t),
                      "scans",
                      r.documentReadCount,
                      "local documents and returns",
                      i,
                      "documents as results.",
                  ),
              r.documentReadCount > this.Wi * i
                  ? (sn() <= b.DEBUG &&
                        y(
                            "QueryEngine",
                            "The SDK decides to create cache indexes for query:",
                            St(t),
                            "as using cache indexes may help improve performance.",
                        ),
                    this.indexManager.createTargetIndexes(e, Pe(t)))
                  : m.resolve());
    }
    zi(e, t) {
        if (Qa(t)) return m.resolve(null);
        let r = Pe(t);
        return this.indexManager.getIndexType(e, r).next((i) =>
            i === 0
                ? null
                : (t.limit !== null && i === 1 && ((t = Is(t, null, "F")), (r = Pe(t))),
                  this.indexManager.getDocumentsMatchingTarget(e, r).next((s) => {
                      const o = C(...s);
                      return this.Gi.getDocuments(e, o).next((a) =>
                          this.indexManager.getMinOffset(e, r).next((c) => {
                              const u = this.Yi(t, a);
                              return this.Zi(t, u, o, c.readTime) ? this.zi(e, Is(t, null, "F")) : this.Xi(e, u, t, c);
                          }),
                      );
                  })),
        );
    }
    ji(e, t, r, i) {
        return Qa(t) || i.isEqual(P.min())
            ? m.resolve(null)
            : this.Gi.getDocuments(e, r).next((s) => {
                  const o = this.Yi(t, s);
                  return this.Zi(t, o, r, i)
                      ? m.resolve(null)
                      : (sn() <= b.DEBUG &&
                            y(
                                "QueryEngine",
                                "Re-using previous result from %s to execute query: %s",
                                i.toString(),
                                St(t),
                            ),
                        this.Xi(e, o, t, xg(i, -1)).next((a) => a));
              });
    }
    Yi(e, t) {
        let r = new Z(Sl(e));
        return (
            t.forEach((i, s) => {
                mi(e, s) && (r = r.add(s));
            }),
            r
        );
    }
    Zi(e, t, r, i) {
        if (e.limit === null) return !1;
        if (r.size !== t.size) return !0;
        const s = e.limitType === "F" ? t.last() : t.first();
        return !!s && (s.hasPendingWrites || s.version.compareTo(i) > 0);
    }
    Hi(e, t, r) {
        return (
            sn() <= b.DEBUG && y("QueryEngine", "Using full collection scan to execute query:", St(t)),
            this.Gi.getDocumentsMatchingQuery(e, t, Xe.min(), r)
        );
    }
    Xi(e, t, r, i) {
        return this.Gi.getDocumentsMatchingQuery(e, r, i).next(
            (s) => (
                t.forEach((o) => {
                    s = s.insert(o.key, o);
                }),
                s
            ),
        );
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ay {
    constructor(e, t, r, i) {
        (this.persistence = e),
            (this.es = t),
            (this.serializer = i),
            (this.ts = new x(D)),
            (this.ns = new Zt((s) => go(s), _o)),
            (this.rs = new Map()),
            (this.ss = e.getRemoteDocumentCache()),
            (this.qr = e.getTargetCache()),
            (this.Kr = e.getBundleCache()),
            this.os(r);
    }
    os(e) {
        (this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e)),
            (this.indexManager = this.persistence.getIndexManager(e)),
            (this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager)),
            (this.localDocuments = new J_(this.ss, this.mutationQueue, this.documentOverlayCache, this.indexManager)),
            this.ss.setIndexManager(this.indexManager),
            this.es.initialize(this.localDocuments, this.indexManager);
    }
    collectGarbage(e) {
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (t) => e.collect(t, this.ts));
    }
}
function cy(n, e, t, r) {
    return new ay(n, e, t, r);
}
async function Ql(n, e) {
    const t = S(n);
    return await t.persistence.runTransaction("Handle user change", "readonly", (r) => {
        let i;
        return t.mutationQueue
            .getAllMutationBatches(r)
            .next((s) => ((i = s), t.os(e), t.mutationQueue.getAllMutationBatches(r)))
            .next((s) => {
                const o = [],
                    a = [];
                let c = C();
                for (const u of i) {
                    o.push(u.batchId);
                    for (const l of u.mutations) c = c.add(l.key);
                }
                for (const u of s) {
                    a.push(u.batchId);
                    for (const l of u.mutations) c = c.add(l.key);
                }
                return t.localDocuments
                    .getDocuments(r, c)
                    .next((u) => ({ _s: u, removedBatchIds: o, addedBatchIds: a }));
            });
    });
}
function uy(n, e) {
    const t = S(n);
    return t.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (r) => {
        const i = e.batch.keys(),
            s = t.ss.newChangeBuffer({ trackRemovals: !0 });
        return (function (a, c, u, l) {
            const h = u.batch,
                d = h.keys();
            let p = m.resolve();
            return (
                d.forEach((I) => {
                    p = p
                        .next(() => l.getEntry(c, I))
                        .next((T) => {
                            const v = u.docVersions.get(I);
                            M(v !== null),
                                T.version.compareTo(v) < 0 &&
                                    (h.applyToRemoteDocument(T, u),
                                    T.isValidDocument() && (T.setReadTime(u.commitVersion), l.addEntry(T)));
                        });
                }),
                p.next(() => a.mutationQueue.removeMutationBatch(c, h))
            );
        })(t, r, e, s)
            .next(() => s.apply(r))
            .next(() => t.mutationQueue.performConsistencyCheck(r))
            .next(() => t.documentOverlayCache.removeOverlaysForBatchId(r, i, e.batch.batchId))
            .next(() =>
                t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                    r,
                    (function (a) {
                        let c = C();
                        for (let u = 0; u < a.mutationResults.length; ++u)
                            a.mutationResults[u].transformResults.length > 0 && (c = c.add(a.batch.mutations[u].key));
                        return c;
                    })(e),
                ),
            )
            .next(() => t.localDocuments.getDocuments(r, i));
    });
}
function Jl(n) {
    const e = S(n);
    return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (t) =>
        e.qr.getLastRemoteSnapshotVersion(t),
    );
}
function ly(n, e) {
    const t = S(n),
        r = e.snapshotVersion;
    let i = t.ts;
    return t.persistence
        .runTransaction("Apply remote event", "readwrite-primary", (s) => {
            const o = t.ss.newChangeBuffer({ trackRemovals: !0 });
            i = t.ts;
            const a = [];
            e.targetChanges.forEach((l, h) => {
                const d = i.get(h);
                if (!d) return;
                a.push(
                    t.qr
                        .removeMatchingKeys(s, l.removedDocuments, h)
                        .next(() => t.qr.addMatchingKeys(s, l.addedDocuments, h)),
                );
                let p = d.withSequenceNumber(s.currentSequenceNumber);
                e.targetMismatches.get(h) !== null
                    ? (p = p.withResumeToken(ae.EMPTY_BYTE_STRING, P.min()).withLastLimboFreeSnapshotVersion(P.min()))
                    : l.resumeToken.approximateByteSize() > 0 && (p = p.withResumeToken(l.resumeToken, r)),
                    (i = i.insert(h, p)),
                    (function (T, v, V) {
                        return T.resumeToken.approximateByteSize() === 0 ||
                            v.snapshotVersion.toMicroseconds() - T.snapshotVersion.toMicroseconds() >= 3e8
                            ? !0
                            : V.addedDocuments.size + V.modifiedDocuments.size + V.removedDocuments.size > 0;
                    })(d, p, l) && a.push(t.qr.updateTargetData(s, p));
            });
            let c = Fe(),
                u = C();
            if (
                (e.documentUpdates.forEach((l) => {
                    e.resolvedLimboDocuments.has(l) &&
                        a.push(t.persistence.referenceDelegate.updateLimboDocument(s, l));
                }),
                a.push(
                    hy(s, o, e.documentUpdates).next((l) => {
                        (c = l.us), (u = l.cs);
                    }),
                ),
                !r.isEqual(P.min()))
            ) {
                const l = t.qr
                    .getLastRemoteSnapshotVersion(s)
                    .next((h) => t.qr.setTargetsMetadata(s, s.currentSequenceNumber, r));
                a.push(l);
            }
            return m
                .waitFor(a)
                .next(() => o.apply(s))
                .next(() => t.localDocuments.getLocalViewOfDocuments(s, c, u))
                .next(() => c);
        })
        .then((s) => ((t.ts = i), s));
}
function hy(n, e, t) {
    let r = C(),
        i = C();
    return (
        t.forEach((s) => (r = r.add(s))),
        e.getEntries(n, r).next((s) => {
            let o = Fe();
            return (
                t.forEach((a, c) => {
                    const u = s.get(a);
                    c.isFoundDocument() !== u.isFoundDocument() && (i = i.add(a)),
                        c.isNoDocument() && c.version.isEqual(P.min())
                            ? (e.removeEntry(a, c.readTime), (o = o.insert(a, c)))
                            : !u.isValidDocument() ||
                                c.version.compareTo(u.version) > 0 ||
                                (c.version.compareTo(u.version) === 0 && u.hasPendingWrites)
                              ? (e.addEntry(c), (o = o.insert(a, c)))
                              : y(
                                    "LocalStore",
                                    "Ignoring outdated watch update for ",
                                    a,
                                    ". Current version:",
                                    u.version,
                                    " Watch version:",
                                    c.version,
                                );
                }),
                { us: o, cs: i }
            );
        })
    );
}
function dy(n, e) {
    const t = S(n);
    return t.persistence.runTransaction(
        "Get next mutation batch",
        "readonly",
        (r) => (e === void 0 && (e = -1), t.mutationQueue.getNextMutationBatchAfterBatchId(r, e)),
    );
}
function fy(n, e) {
    const t = S(n);
    return t.persistence
        .runTransaction("Allocate target", "readwrite", (r) => {
            let i;
            return t.qr
                .getTargetData(r, e)
                .next((s) =>
                    s
                        ? ((i = s), m.resolve(i))
                        : t.qr
                              .allocateTargetId(r)
                              .next(
                                  (o) => (
                                      (i = new We(e, o, "TargetPurposeListen", r.currentSequenceNumber)),
                                      t.qr.addTargetData(r, i).next(() => i)
                                  ),
                              ),
                );
        })
        .then((r) => {
            const i = t.ts.get(r.targetId);
            return (
                (i === null || r.snapshotVersion.compareTo(i.snapshotVersion) > 0) &&
                    ((t.ts = t.ts.insert(r.targetId, r)), t.ns.set(e, r.targetId)),
                r
            );
        });
}
async function Ps(n, e, t) {
    const r = S(n),
        i = r.ts.get(e),
        s = t ? "readwrite" : "readwrite-primary";
    try {
        t ||
            (await r.persistence.runTransaction("Release target", s, (o) =>
                r.persistence.referenceDelegate.removeTarget(o, i),
            ));
    } catch (o) {
        if (!Jn(o)) throw o;
        y("LocalStore", `Failed to update sequence numbers for target ${e}: ${o}`);
    }
    (r.ts = r.ts.remove(e)), r.ns.delete(i.target);
}
function oc(n, e, t) {
    const r = S(n);
    let i = P.min(),
        s = C();
    return r.persistence.runTransaction("Execute query", "readwrite", (o) =>
        (function (c, u, l) {
            const h = S(c),
                d = h.ns.get(l);
            return d !== void 0 ? m.resolve(h.ts.get(d)) : h.qr.getTargetData(u, l);
        })(r, o, Pe(e))
            .next((a) => {
                if (a)
                    return (
                        (i = a.lastLimboFreeSnapshotVersion),
                        r.qr.getMatchingKeysForTargetId(o, a.targetId).next((c) => {
                            s = c;
                        })
                    );
            })
            .next(() => r.es.getDocumentsMatchingQuery(o, e, t ? i : P.min(), t ? s : C()))
            .next((a) => (py(r, s_(e), a), { documents: a, ls: s })),
    );
}
function py(n, e, t) {
    let r = n.rs.get(e) || P.min();
    t.forEach((i, s) => {
        s.readTime.compareTo(r) > 0 && (r = s.readTime);
    }),
        n.rs.set(e, r);
}
class ac {
    constructor() {
        this.activeTargetIds = h_();
    }
    ds(e) {
        this.activeTargetIds = this.activeTargetIds.add(e);
    }
    As(e) {
        this.activeTargetIds = this.activeTargetIds.delete(e);
    }
    Es() {
        const e = { activeTargetIds: this.activeTargetIds.toArray(), updateTimeMs: Date.now() };
        return JSON.stringify(e);
    }
}
class my {
    constructor() {
        (this.eo = new ac()), (this.no = {}), (this.onlineStateHandler = null), (this.sequenceNumberHandler = null);
    }
    addPendingMutation(e) {}
    updateMutationState(e, t, r) {}
    addLocalQueryTarget(e) {
        return this.eo.ds(e), this.no[e] || "not-current";
    }
    updateQueryState(e, t, r) {
        this.no[e] = t;
    }
    removeLocalQueryTarget(e) {
        this.eo.As(e);
    }
    isLocalQueryTarget(e) {
        return this.eo.activeTargetIds.has(e);
    }
    clearQueryState(e) {
        delete this.no[e];
    }
    getAllActiveQueryTargets() {
        return this.eo.activeTargetIds;
    }
    isActiveQueryTarget(e) {
        return this.eo.activeTargetIds.has(e);
    }
    start() {
        return (this.eo = new ac()), Promise.resolve();
    }
    handleUserChange(e, t, r) {}
    setOnlineState(e) {}
    shutdown() {}
    writeSequenceNumber(e) {}
    notifyBundleLoaded(e) {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gy {
    ro(e) {}
    shutdown() {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cc {
    constructor() {
        (this.io = () => this.so()), (this.oo = () => this._o()), (this.ao = []), this.uo();
    }
    ro(e) {
        this.ao.push(e);
    }
    shutdown() {
        window.removeEventListener("online", this.io), window.removeEventListener("offline", this.oo);
    }
    uo() {
        window.addEventListener("online", this.io), window.addEventListener("offline", this.oo);
    }
    so() {
        y("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (const e of this.ao) e(0);
    }
    _o() {
        y("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (const e of this.ao) e(1);
    }
    static D() {
        return typeof window < "u" && window.addEventListener !== void 0 && window.removeEventListener !== void 0;
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let dr = null;
function Gi() {
    return (
        dr === null
            ? (dr = (function () {
                  return 268435456 + Math.round(2147483648 * Math.random());
              })())
            : dr++,
        "0x" + dr.toString(16)
    );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const _y = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery",
    RunAggregationQuery: "runAggregationQuery",
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yy {
    constructor(e) {
        (this.co = e.co), (this.lo = e.lo);
    }
    ho(e) {
        this.Po = e;
    }
    Io(e) {
        this.To = e;
    }
    Eo(e) {
        this.Ao = e;
    }
    onMessage(e) {
        this.Ro = e;
    }
    close() {
        this.lo();
    }
    send(e) {
        this.co(e);
    }
    Vo() {
        this.Po();
    }
    mo() {
        this.To();
    }
    fo(e) {
        this.Ao(e);
    }
    po(e) {
        this.Ro(e);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const te = "WebChannelConnection";
class vy extends class {
    constructor(t) {
        (this.databaseInfo = t), (this.databaseId = t.databaseId);
        const r = t.ssl ? "https" : "http",
            i = encodeURIComponent(this.databaseId.projectId),
            s = encodeURIComponent(this.databaseId.database);
        (this.yo = r + "://" + t.host),
            (this.wo = `projects/${i}/databases/${s}`),
            (this.So =
                this.databaseId.database === "(default)" ? `project_id=${i}` : `project_id=${i}&database_id=${s}`);
    }
    get bo() {
        return !1;
    }
    Do(t, r, i, s, o) {
        const a = Gi(),
            c = this.Co(t, r.toUriEncodedString());
        y("RestConnection", `Sending RPC '${t}' ${a}:`, c, i);
        const u = { "google-cloud-resource-prefix": this.wo, "x-goog-request-params": this.So };
        return (
            this.vo(u, s, o),
            this.Fo(t, c, u, i).then(
                (l) => (y("RestConnection", `Received RPC '${t}' ${a}: `, l), l),
                (l) => {
                    throw (
                        (Bt("RestConnection", `RPC '${t}' ${a} failed with error: `, l, "url: ", c, "request:", i), l)
                    );
                },
            )
        );
    }
    Mo(t, r, i, s, o, a) {
        return this.Do(t, r, i, s, o);
    }
    vo(t, r, i) {
        (t["X-Goog-Api-Client"] = (function () {
            return "gl-js/ fire/" + Xt;
        })()),
            (t["Content-Type"] = "text/plain"),
            this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId),
            r && r.headers.forEach((s, o) => (t[o] = s)),
            i && i.headers.forEach((s, o) => (t[o] = s));
    }
    Co(t, r) {
        const i = _y[t];
        return `${this.yo}/v1/${r}:${i}`;
    }
    terminate() {}
} {
    constructor(e) {
        super(e),
            (this.forceLongPolling = e.forceLongPolling),
            (this.autoDetectLongPolling = e.autoDetectLongPolling),
            (this.useFetchStreams = e.useFetchStreams),
            (this.longPollingOptions = e.longPollingOptions);
    }
    Fo(e, t, r, i) {
        const s = Gi();
        return new Promise((o, a) => {
            const c = new Pg();
            c.setWithCredentials(!0),
                c.listenOnce(wg.COMPLETE, () => {
                    try {
                        switch (c.getLastErrorCode()) {
                            case zi.NO_ERROR:
                                const l = c.getResponseJson();
                                y(te, `XHR for RPC '${e}' ${s} received:`, JSON.stringify(l)), o(l);
                                break;
                            case zi.TIMEOUT:
                                y(te, `RPC '${e}' ${s} timed out`), a(new _(f.DEADLINE_EXCEEDED, "Request time out"));
                                break;
                            case zi.HTTP_ERROR:
                                const h = c.getStatus();
                                if (
                                    (y(
                                        te,
                                        `RPC '${e}' ${s} failed with status:`,
                                        h,
                                        "response text:",
                                        c.getResponseText(),
                                    ),
                                    h > 0)
                                ) {
                                    let d = c.getResponseJson();
                                    Array.isArray(d) && (d = d[0]);
                                    const p = d == null ? void 0 : d.error;
                                    if (p && p.status && p.message) {
                                        const I = (function (v) {
                                            const V = v.toLowerCase().replace(/_/g, "-");
                                            return Object.values(f).indexOf(V) >= 0 ? V : f.UNKNOWN;
                                        })(p.status);
                                        a(new _(I, p.message));
                                    } else a(new _(f.UNKNOWN, "Server responded with status " + c.getStatus()));
                                } else a(new _(f.UNAVAILABLE, "Connection failed."));
                                break;
                            default:
                                A();
                        }
                    } finally {
                        y(te, `RPC '${e}' ${s} completed.`);
                    }
                });
            const u = JSON.stringify(i);
            y(te, `RPC '${e}' ${s} sending request:`, i), c.send(t, "POST", u, r, 15);
        });
    }
    xo(e, t, r) {
        const i = Gi(),
            s = [this.yo, "/", "google.firestore.v1.Firestore", "/", e, "/channel"],
            o = Ig(),
            a = Tg(),
            c = {
                httpSessionIdParam: "gsessionid",
                initMessageHeaders: {},
                messageUrlParams: {
                    database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`,
                },
                sendRawJson: !0,
                supportsCrossDomainXhr: !0,
                internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
                forceLongPolling: this.forceLongPolling,
                detectBufferingProxy: this.autoDetectLongPolling,
            },
            u = this.longPollingOptions.timeoutSeconds;
        u !== void 0 && (c.longPollingTimeout = Math.round(1e3 * u)),
            this.useFetchStreams && (c.xmlHttpFactory = new Rg({})),
            this.vo(c.initMessageHeaders, t, r),
            (c.encodeInitMessageHeaders = !0);
        const l = s.join("");
        y(te, `Creating RPC '${e}' stream ${i}: ${l}`, c);
        const h = o.createWebChannel(l, c);
        let d = !1,
            p = !1;
        const I = new yy({
                co: (v) => {
                    p
                        ? y(te, `Not sending because RPC '${e}' stream ${i} is closed:`, v)
                        : (d || (y(te, `Opening RPC '${e}' stream ${i} transport.`), h.open(), (d = !0)),
                          y(te, `RPC '${e}' stream ${i} sending:`, v),
                          h.send(v));
                },
                lo: () => h.close(),
            }),
            T = (v, V, U) => {
                v.listen(V, (K) => {
                    try {
                        U(K);
                    } catch (fe) {
                        setTimeout(() => {
                            throw fe;
                        }, 0);
                    }
                });
            };
        return (
            T(h, ur.EventType.OPEN, () => {
                p || (y(te, `RPC '${e}' stream ${i} transport opened.`), I.Vo());
            }),
            T(h, ur.EventType.CLOSE, () => {
                p || ((p = !0), y(te, `RPC '${e}' stream ${i} transport closed`), I.fo());
            }),
            T(h, ur.EventType.ERROR, (v) => {
                p ||
                    ((p = !0),
                    Bt(te, `RPC '${e}' stream ${i} transport errored:`, v),
                    I.fo(new _(f.UNAVAILABLE, "The operation could not be completed")));
            }),
            T(h, ur.EventType.MESSAGE, (v) => {
                var V;
                if (!p) {
                    const U = v.data[0];
                    M(!!U);
                    const K = U,
                        fe = K.error || ((V = K[0]) === null || V === void 0 ? void 0 : V.error);
                    if (fe) {
                        y(te, `RPC '${e}' stream ${i} received error:`, fe);
                        const at = fe.status;
                        let Ie = (function (tn) {
                                const rr = B[tn];
                                if (rr !== void 0) return Ul(rr);
                            })(at),
                            ct = fe.message;
                        Ie === void 0 &&
                            ((Ie = f.INTERNAL), (ct = "Unknown error status: " + at + " with message " + fe.message)),
                            (p = !0),
                            I.fo(new _(Ie, ct)),
                            h.close();
                    } else y(te, `RPC '${e}' stream ${i} received:`, U), I.po(U);
                }
            }),
            T(a, Ag.STAT_EVENT, (v) => {
                v.stat === Ua.PROXY
                    ? y(te, `RPC '${e}' stream ${i} detected buffering proxy`)
                    : v.stat === Ua.NOPROXY && y(te, `RPC '${e}' stream ${i} detected no buffering proxy`);
            }),
            setTimeout(() => {
                I.mo();
            }, 0),
            I
        );
    }
}
function Wi() {
    return typeof document < "u" ? document : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function vi(n) {
    return new k_(n, !0);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Yl {
    constructor(e, t, r = 1e3, i = 1.5, s = 6e4) {
        (this.si = e),
            (this.timerId = t),
            (this.Oo = r),
            (this.No = i),
            (this.Lo = s),
            (this.Bo = 0),
            (this.ko = null),
            (this.qo = Date.now()),
            this.reset();
    }
    reset() {
        this.Bo = 0;
    }
    Qo() {
        this.Bo = this.Lo;
    }
    Ko(e) {
        this.cancel();
        const t = Math.floor(this.Bo + this.$o()),
            r = Math.max(0, Date.now() - this.qo),
            i = Math.max(0, t - r);
        i > 0 &&
            y(
                "ExponentialBackoff",
                `Backing off for ${i} ms (base delay: ${this.Bo} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`,
            ),
            (this.ko = this.si.enqueueAfterDelay(this.timerId, i, () => ((this.qo = Date.now()), e()))),
            (this.Bo *= this.No),
            this.Bo < this.Oo && (this.Bo = this.Oo),
            this.Bo > this.Lo && (this.Bo = this.Lo);
    }
    Uo() {
        this.ko !== null && (this.ko.skipDelay(), (this.ko = null));
    }
    cancel() {
        this.ko !== null && (this.ko.cancel(), (this.ko = null));
    }
    $o() {
        return (Math.random() - 0.5) * this.Bo;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xl {
    constructor(e, t, r, i, s, o, a, c) {
        (this.si = e),
            (this.Wo = r),
            (this.Go = i),
            (this.connection = s),
            (this.authCredentialsProvider = o),
            (this.appCheckCredentialsProvider = a),
            (this.listener = c),
            (this.state = 0),
            (this.zo = 0),
            (this.jo = null),
            (this.Ho = null),
            (this.stream = null),
            (this.Jo = new Yl(e, t));
    }
    Yo() {
        return this.state === 1 || this.state === 5 || this.Zo();
    }
    Zo() {
        return this.state === 2 || this.state === 3;
    }
    start() {
        this.state !== 4 ? this.auth() : this.Xo();
    }
    async stop() {
        this.Yo() && (await this.close(0));
    }
    e_() {
        (this.state = 0), this.Jo.reset();
    }
    t_() {
        this.Zo() && this.jo === null && (this.jo = this.si.enqueueAfterDelay(this.Wo, 6e4, () => this.n_()));
    }
    r_(e) {
        this.i_(), this.stream.send(e);
    }
    async n_() {
        if (this.Zo()) return this.close(0);
    }
    i_() {
        this.jo && (this.jo.cancel(), (this.jo = null));
    }
    s_() {
        this.Ho && (this.Ho.cancel(), (this.Ho = null));
    }
    async close(e, t) {
        this.i_(),
            this.s_(),
            this.Jo.cancel(),
            this.zo++,
            e !== 4
                ? this.Jo.reset()
                : t && t.code === f.RESOURCE_EXHAUSTED
                  ? (xe(t.toString()),
                    xe("Using maximum backoff delay to prevent overloading the backend."),
                    this.Jo.Qo())
                  : t &&
                    t.code === f.UNAUTHENTICATED &&
                    this.state !== 3 &&
                    (this.authCredentialsProvider.invalidateToken(),
                    this.appCheckCredentialsProvider.invalidateToken()),
            this.stream !== null && (this.o_(), this.stream.close(), (this.stream = null)),
            (this.state = e),
            await this.listener.Eo(t);
    }
    o_() {}
    auth() {
        this.state = 1;
        const e = this.__(this.zo),
            t = this.zo;
        Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(
            ([r, i]) => {
                this.zo === t && this.a_(r, i);
            },
            (r) => {
                e(() => {
                    const i = new _(f.UNKNOWN, "Fetching auth token failed: " + r.message);
                    return this.u_(i);
                });
            },
        );
    }
    a_(e, t) {
        const r = this.__(this.zo);
        (this.stream = this.c_(e, t)),
            this.stream.ho(() => {
                r(() => this.listener.ho());
            }),
            this.stream.Io(() => {
                r(
                    () => (
                        (this.state = 2),
                        (this.Ho = this.si.enqueueAfterDelay(
                            this.Go,
                            1e4,
                            () => (this.Zo() && (this.state = 3), Promise.resolve()),
                        )),
                        this.listener.Io()
                    ),
                );
            }),
            this.stream.Eo((i) => {
                r(() => this.u_(i));
            }),
            this.stream.onMessage((i) => {
                r(() => this.onMessage(i));
            });
    }
    Xo() {
        (this.state = 5),
            this.Jo.Ko(async () => {
                (this.state = 0), this.start();
            });
    }
    u_(e) {
        return y("PersistentStream", `close with error: ${e}`), (this.stream = null), this.close(4, e);
    }
    __(e) {
        return (t) => {
            this.si.enqueueAndForget(() =>
                this.zo === e
                    ? t()
                    : (y("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."),
                      Promise.resolve()),
            );
        };
    }
}
class Ey extends Xl {
    constructor(e, t, r, i, s, o) {
        super(e, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", t, r, i, o),
            (this.serializer = s);
    }
    c_(e, t) {
        return this.connection.xo("Listen", e, t);
    }
    onMessage(e) {
        this.Jo.reset();
        const t = N_(this.serializer, e),
            r = (function (s) {
                if (!("targetChange" in s)) return P.min();
                const o = s.targetChange;
                return o.targetIds && o.targetIds.length ? P.min() : o.readTime ? Se(o.readTime) : P.min();
            })(e);
        return this.listener.l_(t, r);
    }
    h_(e) {
        const t = {};
        (t.database = Rs(this.serializer)),
            (t.addTarget = (function (s, o) {
                let a;
                const c = o.target;
                if (
                    ((a = vs(c) ? { documents: L_(s, c) } : { query: x_(s, c)._t }),
                    (a.targetId = o.targetId),
                    o.resumeToken.approximateByteSize() > 0)
                ) {
                    a.resumeToken = jl(s, o.resumeToken);
                    const u = Ts(s, o.expectedCount);
                    u !== null && (a.expectedCount = u);
                } else if (o.snapshotVersion.compareTo(P.min()) > 0) {
                    a.readTime = Ur(s, o.snapshotVersion.toTimestamp());
                    const u = Ts(s, o.expectedCount);
                    u !== null && (a.expectedCount = u);
                }
                return a;
            })(this.serializer, e));
        const r = U_(this.serializer, e);
        r && (t.labels = r), this.r_(t);
    }
    P_(e) {
        const t = {};
        (t.database = Rs(this.serializer)), (t.removeTarget = e), this.r_(t);
    }
}
class Iy extends Xl {
    constructor(e, t, r, i, s, o) {
        super(e, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", t, r, i, o),
            (this.serializer = s),
            (this.I_ = !1);
    }
    get T_() {
        return this.I_;
    }
    start() {
        (this.I_ = !1), (this.lastStreamToken = void 0), super.start();
    }
    o_() {
        this.I_ && this.E_([]);
    }
    c_(e, t) {
        return this.connection.xo("Write", e, t);
    }
    onMessage(e) {
        if ((M(!!e.streamToken), (this.lastStreamToken = e.streamToken), this.I_)) {
            this.Jo.reset();
            const t = M_(e.writeResults, e.commitTime),
                r = Se(e.commitTime);
            return this.listener.d_(r, t);
        }
        return M(!e.writeResults || e.writeResults.length === 0), (this.I_ = !0), this.listener.A_();
    }
    R_() {
        const e = {};
        (e.database = Rs(this.serializer)), this.r_(e);
    }
    E_(e) {
        const t = { streamToken: this.lastStreamToken, writes: e.map((r) => O_(this.serializer, r)) };
        this.r_(t);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ty extends class {} {
    constructor(e, t, r, i) {
        super(),
            (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.connection = r),
            (this.serializer = i),
            (this.V_ = !1);
    }
    m_() {
        if (this.V_) throw new _(f.FAILED_PRECONDITION, "The client has already been terminated.");
    }
    Do(e, t, r, i) {
        return (
            this.m_(),
            Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
                .then(([s, o]) => this.connection.Do(e, ws(t, r), i, s, o))
                .catch((s) => {
                    throw s.name === "FirebaseError"
                        ? (s.code === f.UNAUTHENTICATED &&
                              (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()),
                          s)
                        : new _(f.UNKNOWN, s.toString());
                })
        );
    }
    Mo(e, t, r, i, s) {
        return (
            this.m_(),
            Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
                .then(([o, a]) => this.connection.Mo(e, ws(t, r), i, o, a, s))
                .catch((o) => {
                    throw o.name === "FirebaseError"
                        ? (o.code === f.UNAUTHENTICATED &&
                              (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()),
                          o)
                        : new _(f.UNKNOWN, o.toString());
                })
        );
    }
    terminate() {
        (this.V_ = !0), this.connection.terminate();
    }
}
class wy {
    constructor(e, t) {
        (this.asyncQueue = e),
            (this.onlineStateHandler = t),
            (this.state = "Unknown"),
            (this.g_ = 0),
            (this.p_ = null),
            (this.y_ = !0);
    }
    w_() {
        this.g_ === 0 &&
            (this.S_("Unknown"),
            (this.p_ = this.asyncQueue.enqueueAfterDelay(
                "online_state_timeout",
                1e4,
                () => (
                    (this.p_ = null),
                    this.b_("Backend didn't respond within 10 seconds."),
                    this.S_("Offline"),
                    Promise.resolve()
                ),
            )));
    }
    D_(e) {
        this.state === "Online"
            ? this.S_("Unknown")
            : (this.g_++,
              this.g_ >= 1 &&
                  (this.C_(),
                  this.b_(`Connection failed 1 times. Most recent error: ${e.toString()}`),
                  this.S_("Offline")));
    }
    set(e) {
        this.C_(), (this.g_ = 0), e === "Online" && (this.y_ = !1), this.S_(e);
    }
    S_(e) {
        e !== this.state && ((this.state = e), this.onlineStateHandler(e));
    }
    b_(e) {
        const t = `Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
        this.y_ ? (xe(t), (this.y_ = !1)) : y("OnlineStateTracker", t);
    }
    C_() {
        this.p_ !== null && (this.p_.cancel(), (this.p_ = null));
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ay {
    constructor(e, t, r, i, s) {
        (this.localStore = e),
            (this.datastore = t),
            (this.asyncQueue = r),
            (this.remoteSyncer = {}),
            (this.v_ = []),
            (this.F_ = new Map()),
            (this.M_ = new Set()),
            (this.x_ = []),
            (this.O_ = s),
            this.O_.ro((o) => {
                r.enqueueAndForget(async () => {
                    Rt(this) &&
                        (y("RemoteStore", "Restarting streams for network reachability change."),
                        await (async function (c) {
                            const u = S(c);
                            u.M_.add(4), await Zn(u), u.N_.set("Unknown"), u.M_.delete(4), await Ei(u);
                        })(this));
                });
            }),
            (this.N_ = new wy(r, i));
    }
}
async function Ei(n) {
    if (Rt(n)) for (const e of n.x_) await e(!0);
}
async function Zn(n) {
    for (const e of n.x_) await e(!1);
}
function Zl(n, e) {
    const t = S(n);
    t.F_.has(e.targetId) || (t.F_.set(e.targetId, e), bo(t) ? Co(t) : en(t).Zo() && So(t, e));
}
function Po(n, e) {
    const t = S(n),
        r = en(t);
    t.F_.delete(e), r.Zo() && eh(t, e), t.F_.size === 0 && (r.Zo() ? r.t_() : Rt(t) && t.N_.set("Unknown"));
}
function So(n, e) {
    if ((n.L_.xe(e.targetId), e.resumeToken.approximateByteSize() > 0 || e.snapshotVersion.compareTo(P.min()) > 0)) {
        const t = n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;
        e = e.withExpectedCount(t);
    }
    en(n).h_(e);
}
function eh(n, e) {
    n.L_.xe(e), en(n).P_(e);
}
function Co(n) {
    (n.L_ = new P_({
        getRemoteKeysForTarget: (e) => n.remoteSyncer.getRemoteKeysForTarget(e),
        ot: (e) => n.F_.get(e) || null,
        tt: () => n.datastore.serializer.databaseId,
    })),
        en(n).start(),
        n.N_.w_();
}
function bo(n) {
    return Rt(n) && !en(n).Yo() && n.F_.size > 0;
}
function Rt(n) {
    return S(n).M_.size === 0;
}
function th(n) {
    n.L_ = void 0;
}
async function Ry(n) {
    n.N_.set("Online");
}
async function Py(n) {
    n.F_.forEach((e, t) => {
        So(n, e);
    });
}
async function Sy(n, e) {
    th(n), bo(n) ? (n.N_.D_(e), Co(n)) : n.N_.set("Unknown");
}
async function Cy(n, e, t) {
    if ((n.N_.set("Online"), e instanceof ql && e.state === 2 && e.cause))
        try {
            await (async function (i, s) {
                const o = s.cause;
                for (const a of s.targetIds)
                    i.F_.has(a) && (await i.remoteSyncer.rejectListen(a, o), i.F_.delete(a), i.L_.removeTarget(a));
            })(n, e);
        } catch (r) {
            y("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), r), await Br(n, r);
        }
    else if ((e instanceof vr ? n.L_.Ke(e) : e instanceof Bl ? n.L_.He(e) : n.L_.We(e), !t.isEqual(P.min())))
        try {
            const r = await Jl(n.localStore);
            t.compareTo(r) >= 0 &&
                (await (function (s, o) {
                    const a = s.L_.rt(o);
                    return (
                        a.targetChanges.forEach((c, u) => {
                            if (c.resumeToken.approximateByteSize() > 0) {
                                const l = s.F_.get(u);
                                l && s.F_.set(u, l.withResumeToken(c.resumeToken, o));
                            }
                        }),
                        a.targetMismatches.forEach((c, u) => {
                            const l = s.F_.get(c);
                            if (!l) return;
                            s.F_.set(c, l.withResumeToken(ae.EMPTY_BYTE_STRING, l.snapshotVersion)), eh(s, c);
                            const h = new We(l.target, c, u, l.sequenceNumber);
                            So(s, h);
                        }),
                        s.remoteSyncer.applyRemoteEvent(a)
                    );
                })(n, t));
        } catch (r) {
            y("RemoteStore", "Failed to raise snapshot:", r), await Br(n, r);
        }
}
async function Br(n, e, t) {
    if (!Jn(e)) throw e;
    n.M_.add(1),
        await Zn(n),
        n.N_.set("Offline"),
        t || (t = () => Jl(n.localStore)),
        n.asyncQueue.enqueueRetryable(async () => {
            y("RemoteStore", "Retrying IndexedDB access"), await t(), n.M_.delete(1), await Ei(n);
        });
}
function nh(n, e) {
    return e().catch((t) => Br(n, t, e));
}
async function Ii(n) {
    const e = S(n),
        t = et(e);
    let r = e.v_.length > 0 ? e.v_[e.v_.length - 1].batchId : -1;
    for (; by(e); )
        try {
            const i = await dy(e.localStore, r);
            if (i === null) {
                e.v_.length === 0 && t.t_();
                break;
            }
            (r = i.batchId), ky(e, i);
        } catch (i) {
            await Br(e, i);
        }
    rh(e) && ih(e);
}
function by(n) {
    return Rt(n) && n.v_.length < 10;
}
function ky(n, e) {
    n.v_.push(e);
    const t = et(n);
    t.Zo() && t.T_ && t.E_(e.mutations);
}
function rh(n) {
    return Rt(n) && !et(n).Yo() && n.v_.length > 0;
}
function ih(n) {
    et(n).start();
}
async function Dy(n) {
    et(n).R_();
}
async function Vy(n) {
    const e = et(n);
    for (const t of n.v_) e.E_(t.mutations);
}
async function Ny(n, e, t) {
    const r = n.v_.shift(),
        i = Eo.from(r, e, t);
    await nh(n, () => n.remoteSyncer.applySuccessfulWrite(i)), await Ii(n);
}
async function Oy(n, e) {
    e &&
        et(n).T_ &&
        (await (async function (r, i) {
            if (
                (function (o) {
                    return w_(o) && o !== f.ABORTED;
                })(i.code)
            ) {
                const s = r.v_.shift();
                et(r).e_(), await nh(r, () => r.remoteSyncer.rejectFailedWrite(s.batchId, i)), await Ii(r);
            }
        })(n, e)),
        rh(n) && ih(n);
}
async function uc(n, e) {
    const t = S(n);
    t.asyncQueue.verifyOperationInProgress(), y("RemoteStore", "RemoteStore received new credentials");
    const r = Rt(t);
    t.M_.add(3),
        await Zn(t),
        r && t.N_.set("Unknown"),
        await t.remoteSyncer.handleCredentialChange(e),
        t.M_.delete(3),
        await Ei(t);
}
async function My(n, e) {
    const t = S(n);
    e ? (t.M_.delete(2), await Ei(t)) : e || (t.M_.add(2), await Zn(t), t.N_.set("Unknown"));
}
function en(n) {
    return (
        n.B_ ||
            ((n.B_ = (function (t, r, i) {
                const s = S(t);
                return s.m_(), new Ey(r, s.connection, s.authCredentials, s.appCheckCredentials, s.serializer, i);
            })(n.datastore, n.asyncQueue, {
                ho: Ry.bind(null, n),
                Io: Py.bind(null, n),
                Eo: Sy.bind(null, n),
                l_: Cy.bind(null, n),
            })),
            n.x_.push(async (e) => {
                e ? (n.B_.e_(), bo(n) ? Co(n) : n.N_.set("Unknown")) : (await n.B_.stop(), th(n));
            })),
        n.B_
    );
}
function et(n) {
    return (
        n.k_ ||
            ((n.k_ = (function (t, r, i) {
                const s = S(t);
                return s.m_(), new Iy(r, s.connection, s.authCredentials, s.appCheckCredentials, s.serializer, i);
            })(n.datastore, n.asyncQueue, {
                ho: () => Promise.resolve(),
                Io: Dy.bind(null, n),
                Eo: Oy.bind(null, n),
                A_: Vy.bind(null, n),
                d_: Ny.bind(null, n),
            })),
            n.x_.push(async (e) => {
                e
                    ? (n.k_.e_(), await Ii(n))
                    : (await n.k_.stop(),
                      n.v_.length > 0 &&
                          (y("RemoteStore", `Stopping write stream with ${n.v_.length} pending writes`), (n.v_ = [])));
            })),
        n.k_
    );
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ko {
    constructor(e, t, r, i, s) {
        (this.asyncQueue = e),
            (this.timerId = t),
            (this.targetTimeMs = r),
            (this.op = i),
            (this.removalCallback = s),
            (this.deferred = new Oe()),
            (this.then = this.deferred.promise.then.bind(this.deferred.promise)),
            this.deferred.promise.catch((o) => {});
    }
    get promise() {
        return this.deferred.promise;
    }
    static createAndSchedule(e, t, r, i, s) {
        const o = Date.now() + r,
            a = new ko(e, t, o, i, s);
        return a.start(r), a;
    }
    start(e) {
        this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
    }
    skipDelay() {
        return this.handleDelayElapsed();
    }
    cancel(e) {
        this.timerHandle !== null &&
            (this.clearTimeout(),
            this.deferred.reject(new _(f.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))));
    }
    handleDelayElapsed() {
        this.asyncQueue.enqueueAndForget(() =>
            this.timerHandle !== null
                ? (this.clearTimeout(), this.op().then((e) => this.deferred.resolve(e)))
                : Promise.resolve(),
        );
    }
    clearTimeout() {
        this.timerHandle !== null &&
            (this.removalCallback(this), clearTimeout(this.timerHandle), (this.timerHandle = null));
    }
}
function Do(n, e) {
    if ((xe("AsyncQueue", `${e}: ${n}`), Jn(n))) return new _(f.UNAVAILABLE, `${e}: ${n}`);
    throw n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class xt {
    constructor(e) {
        (this.comparator = e ? (t, r) => e(t, r) || E.comparator(t.key, r.key) : (t, r) => E.comparator(t.key, r.key)),
            (this.keyedMap = ln()),
            (this.sortedSet = new x(this.comparator));
    }
    static emptySet(e) {
        return new xt(e.comparator);
    }
    has(e) {
        return this.keyedMap.get(e) != null;
    }
    get(e) {
        return this.keyedMap.get(e);
    }
    first() {
        return this.sortedSet.minKey();
    }
    last() {
        return this.sortedSet.maxKey();
    }
    isEmpty() {
        return this.sortedSet.isEmpty();
    }
    indexOf(e) {
        const t = this.keyedMap.get(e);
        return t ? this.sortedSet.indexOf(t) : -1;
    }
    get size() {
        return this.sortedSet.size;
    }
    forEach(e) {
        this.sortedSet.inorderTraversal((t, r) => (e(t), !1));
    }
    add(e) {
        const t = this.delete(e.key);
        return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null));
    }
    delete(e) {
        const t = this.get(e);
        return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this;
    }
    isEqual(e) {
        if (!(e instanceof xt) || this.size !== e.size) return !1;
        const t = this.sortedSet.getIterator(),
            r = e.sortedSet.getIterator();
        for (; t.hasNext(); ) {
            const i = t.getNext().key,
                s = r.getNext().key;
            if (!i.isEqual(s)) return !1;
        }
        return !0;
    }
    toString() {
        const e = [];
        return (
            this.forEach((t) => {
                e.push(t.toString());
            }),
            e.length === 0
                ? "DocumentSet ()"
                : `DocumentSet (
  ` +
                  e.join(`  
`) +
                  `
)`
        );
    }
    copy(e, t) {
        const r = new xt();
        return (r.comparator = this.comparator), (r.keyedMap = e), (r.sortedSet = t), r;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lc {
    constructor() {
        this.q_ = new x(E.comparator);
    }
    track(e) {
        const t = e.doc.key,
            r = this.q_.get(t);
        r
            ? e.type !== 0 && r.type === 3
                ? (this.q_ = this.q_.insert(t, e))
                : e.type === 3 && r.type !== 1
                  ? (this.q_ = this.q_.insert(t, { type: r.type, doc: e.doc }))
                  : e.type === 2 && r.type === 2
                    ? (this.q_ = this.q_.insert(t, { type: 2, doc: e.doc }))
                    : e.type === 2 && r.type === 0
                      ? (this.q_ = this.q_.insert(t, { type: 0, doc: e.doc }))
                      : e.type === 1 && r.type === 0
                        ? (this.q_ = this.q_.remove(t))
                        : e.type === 1 && r.type === 2
                          ? (this.q_ = this.q_.insert(t, { type: 1, doc: r.doc }))
                          : e.type === 0 && r.type === 1
                            ? (this.q_ = this.q_.insert(t, { type: 2, doc: e.doc }))
                            : A()
            : (this.q_ = this.q_.insert(t, e));
    }
    Q_() {
        const e = [];
        return (
            this.q_.inorderTraversal((t, r) => {
                e.push(r);
            }),
            e
        );
    }
}
class Gt {
    constructor(e, t, r, i, s, o, a, c, u) {
        (this.query = e),
            (this.docs = t),
            (this.oldDocs = r),
            (this.docChanges = i),
            (this.mutatedKeys = s),
            (this.fromCache = o),
            (this.syncStateChanged = a),
            (this.excludesMetadataChanges = c),
            (this.hasCachedResults = u);
    }
    static fromInitialDocuments(e, t, r, i, s) {
        const o = [];
        return (
            t.forEach((a) => {
                o.push({ type: 0, doc: a });
            }),
            new Gt(e, t, xt.emptySet(t), o, r, i, !0, !1, s)
        );
    }
    get hasPendingWrites() {
        return !this.mutatedKeys.isEmpty();
    }
    isEqual(e) {
        if (
            !(
                this.fromCache === e.fromCache &&
                this.hasCachedResults === e.hasCachedResults &&
                this.syncStateChanged === e.syncStateChanged &&
                this.mutatedKeys.isEqual(e.mutatedKeys) &&
                pi(this.query, e.query) &&
                this.docs.isEqual(e.docs) &&
                this.oldDocs.isEqual(e.oldDocs)
            )
        )
            return !1;
        const t = this.docChanges,
            r = e.docChanges;
        if (t.length !== r.length) return !1;
        for (let i = 0; i < t.length; i++) if (t[i].type !== r[i].type || !t[i].doc.isEqual(r[i].doc)) return !1;
        return !0;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ly {
    constructor() {
        (this.K_ = void 0), (this.U_ = []);
    }
    W_() {
        return this.U_.some((e) => e.G_());
    }
}
class xy {
    constructor() {
        (this.queries = new Zt((e) => Pl(e), pi)), (this.onlineState = "Unknown"), (this.z_ = new Set());
    }
}
async function Vo(n, e) {
    const t = S(n);
    let r = 3;
    const i = e.query;
    let s = t.queries.get(i);
    s ? !s.W_() && e.G_() && (r = 2) : ((s = new Ly()), (r = e.G_() ? 0 : 1));
    try {
        switch (r) {
            case 0:
                s.K_ = await t.onListen(i, !0);
                break;
            case 1:
                s.K_ = await t.onListen(i, !1);
                break;
            case 2:
                await t.onFirstRemoteStoreListen(i);
        }
    } catch (o) {
        const a = Do(o, `Initialization of query '${St(e.query)}' failed`);
        return void e.onError(a);
    }
    t.queries.set(i, s), s.U_.push(e), e.j_(t.onlineState), s.K_ && e.H_(s.K_) && Oo(t);
}
async function No(n, e) {
    const t = S(n),
        r = e.query;
    let i = 3;
    const s = t.queries.get(r);
    if (s) {
        const o = s.U_.indexOf(e);
        o >= 0 && (s.U_.splice(o, 1), s.U_.length === 0 ? (i = e.G_() ? 0 : 1) : !s.W_() && e.G_() && (i = 2));
    }
    switch (i) {
        case 0:
            return t.queries.delete(r), t.onUnlisten(r, !0);
        case 1:
            return t.queries.delete(r), t.onUnlisten(r, !1);
        case 2:
            return t.onLastRemoteStoreUnlisten(r);
        default:
            return;
    }
}
function Fy(n, e) {
    const t = S(n);
    let r = !1;
    for (const i of e) {
        const s = i.query,
            o = t.queries.get(s);
        if (o) {
            for (const a of o.U_) a.H_(i) && (r = !0);
            o.K_ = i;
        }
    }
    r && Oo(t);
}
function Uy(n, e, t) {
    const r = S(n),
        i = r.queries.get(e);
    if (i) for (const s of i.U_) s.onError(t);
    r.queries.delete(e);
}
function Oo(n) {
    n.z_.forEach((e) => {
        e.next();
    });
}
var Ss, hc;
((hc = Ss || (Ss = {})).J_ = "default"), (hc.Cache = "cache");
class Mo {
    constructor(e, t, r) {
        (this.query = e),
            (this.Y_ = t),
            (this.Z_ = !1),
            (this.X_ = null),
            (this.onlineState = "Unknown"),
            (this.options = r || {});
    }
    H_(e) {
        if (!this.options.includeMetadataChanges) {
            const r = [];
            for (const i of e.docChanges) i.type !== 3 && r.push(i);
            e = new Gt(
                e.query,
                e.docs,
                e.oldDocs,
                r,
                e.mutatedKeys,
                e.fromCache,
                e.syncStateChanged,
                !0,
                e.hasCachedResults,
            );
        }
        let t = !1;
        return (
            this.Z_
                ? this.ea(e) && (this.Y_.next(e), (t = !0))
                : this.ta(e, this.onlineState) && (this.na(e), (t = !0)),
            (this.X_ = e),
            t
        );
    }
    onError(e) {
        this.Y_.error(e);
    }
    j_(e) {
        this.onlineState = e;
        let t = !1;
        return this.X_ && !this.Z_ && this.ta(this.X_, e) && (this.na(this.X_), (t = !0)), t;
    }
    ta(e, t) {
        if (!e.fromCache || !this.G_()) return !0;
        const r = t !== "Offline";
        return (!this.options.ra || !r) && (!e.docs.isEmpty() || e.hasCachedResults || t === "Offline");
    }
    ea(e) {
        if (e.docChanges.length > 0) return !0;
        const t = this.X_ && this.X_.hasPendingWrites !== e.hasPendingWrites;
        return !(!e.syncStateChanged && !t) && this.options.includeMetadataChanges === !0;
    }
    na(e) {
        (e = Gt.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults)),
            (this.Z_ = !0),
            this.Y_.next(e);
    }
    G_() {
        return this.options.source !== Ss.Cache;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sh {
    constructor(e) {
        this.key = e;
    }
}
class oh {
    constructor(e) {
        this.key = e;
    }
}
class By {
    constructor(e, t) {
        (this.query = e),
            (this.la = t),
            (this.ha = null),
            (this.hasCachedResults = !1),
            (this.current = !1),
            (this.Pa = C()),
            (this.mutatedKeys = C()),
            (this.Ia = Sl(e)),
            (this.Ta = new xt(this.Ia));
    }
    get Ea() {
        return this.la;
    }
    da(e, t) {
        const r = t ? t.Aa : new lc(),
            i = t ? t.Ta : this.Ta;
        let s = t ? t.mutatedKeys : this.mutatedKeys,
            o = i,
            a = !1;
        const c = this.query.limitType === "F" && i.size === this.query.limit ? i.last() : null,
            u = this.query.limitType === "L" && i.size === this.query.limit ? i.first() : null;
        if (
            (e.inorderTraversal((l, h) => {
                const d = i.get(l),
                    p = mi(this.query, h) ? h : null,
                    I = !!d && this.mutatedKeys.has(d.key),
                    T = !!p && (p.hasLocalMutations || (this.mutatedKeys.has(p.key) && p.hasCommittedMutations));
                let v = !1;
                d && p
                    ? d.data.isEqual(p.data)
                        ? I !== T && (r.track({ type: 3, doc: p }), (v = !0))
                        : this.Ra(d, p) ||
                          (r.track({ type: 2, doc: p }),
                          (v = !0),
                          ((c && this.Ia(p, c) > 0) || (u && this.Ia(p, u) < 0)) && (a = !0))
                    : !d && p
                      ? (r.track({ type: 0, doc: p }), (v = !0))
                      : d && !p && (r.track({ type: 1, doc: d }), (v = !0), (c || u) && (a = !0)),
                    v &&
                        (p
                            ? ((o = o.add(p)), (s = T ? s.add(l) : s.delete(l)))
                            : ((o = o.delete(l)), (s = s.delete(l))));
            }),
            this.query.limit !== null)
        )
            for (; o.size > this.query.limit; ) {
                const l = this.query.limitType === "F" ? o.last() : o.first();
                (o = o.delete(l.key)), (s = s.delete(l.key)), r.track({ type: 1, doc: l });
            }
        return { Ta: o, Aa: r, Zi: a, mutatedKeys: s };
    }
    Ra(e, t) {
        return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations;
    }
    applyChanges(e, t, r, i) {
        const s = this.Ta;
        (this.Ta = e.Ta), (this.mutatedKeys = e.mutatedKeys);
        const o = e.Aa.Q_();
        o.sort(
            (l, h) =>
                (function (p, I) {
                    const T = (v) => {
                        switch (v) {
                            case 0:
                                return 1;
                            case 2:
                            case 3:
                                return 2;
                            case 1:
                                return 0;
                            default:
                                return A();
                        }
                    };
                    return T(p) - T(I);
                })(l.type, h.type) || this.Ia(l.doc, h.doc),
        ),
            this.Va(r),
            (i = i != null && i);
        const a = t && !i ? this.ma() : [],
            c = this.Pa.size === 0 && this.current && !i ? 1 : 0,
            u = c !== this.ha;
        return (
            (this.ha = c),
            o.length !== 0 || u
                ? {
                      snapshot: new Gt(
                          this.query,
                          e.Ta,
                          s,
                          o,
                          e.mutatedKeys,
                          c === 0,
                          u,
                          !1,
                          !!r && r.resumeToken.approximateByteSize() > 0,
                      ),
                      fa: a,
                  }
                : { fa: a }
        );
    }
    j_(e) {
        return this.current && e === "Offline"
            ? ((this.current = !1),
              this.applyChanges({ Ta: this.Ta, Aa: new lc(), mutatedKeys: this.mutatedKeys, Zi: !1 }, !1))
            : { fa: [] };
    }
    ga(e) {
        return !this.la.has(e) && !!this.Ta.has(e) && !this.Ta.get(e).hasLocalMutations;
    }
    Va(e) {
        e &&
            (e.addedDocuments.forEach((t) => (this.la = this.la.add(t))),
            e.modifiedDocuments.forEach((t) => {}),
            e.removedDocuments.forEach((t) => (this.la = this.la.delete(t))),
            (this.current = e.current));
    }
    ma() {
        if (!this.current) return [];
        const e = this.Pa;
        (this.Pa = C()),
            this.Ta.forEach((r) => {
                this.ga(r.key) && (this.Pa = this.Pa.add(r.key));
            });
        const t = [];
        return (
            e.forEach((r) => {
                this.Pa.has(r) || t.push(new oh(r));
            }),
            this.Pa.forEach((r) => {
                e.has(r) || t.push(new sh(r));
            }),
            t
        );
    }
    pa(e) {
        (this.la = e.ls), (this.Pa = C());
        const t = this.da(e.documents);
        return this.applyChanges(t, !0);
    }
    ya() {
        return Gt.fromInitialDocuments(this.query, this.Ta, this.mutatedKeys, this.ha === 0, this.hasCachedResults);
    }
}
class qy {
    constructor(e, t, r) {
        (this.query = e), (this.targetId = t), (this.view = r);
    }
}
class jy {
    constructor(e) {
        (this.key = e), (this.wa = !1);
    }
}
class $y {
    constructor(e, t, r, i, s, o) {
        (this.localStore = e),
            (this.remoteStore = t),
            (this.eventManager = r),
            (this.sharedClientState = i),
            (this.currentUser = s),
            (this.maxConcurrentLimboResolutions = o),
            (this.Sa = {}),
            (this.ba = new Zt((a) => Pl(a), pi)),
            (this.Da = new Map()),
            (this.Ca = new Set()),
            (this.va = new x(E.comparator)),
            (this.Fa = new Map()),
            (this.Ma = new wo()),
            (this.xa = {}),
            (this.Oa = new Map()),
            (this.Na = Ht.Nn()),
            (this.onlineState = "Unknown"),
            (this.La = void 0);
    }
    get isPrimaryClient() {
        return this.La === !0;
    }
}
async function zy(n, e, t = !0) {
    const r = dh(n);
    let i;
    const s = r.ba.get(e);
    return (
        s ? (r.sharedClientState.addLocalQueryTarget(s.targetId), (i = s.view.ya())) : (i = await ah(r, e, t, !0)), i
    );
}
async function Hy(n, e) {
    const t = dh(n);
    await ah(t, e, !0, !1);
}
async function ah(n, e, t, r) {
    const i = await fy(n.localStore, Pe(e)),
        s = i.targetId,
        o = t ? n.sharedClientState.addLocalQueryTarget(s) : "not-current";
    let a;
    return (
        r && (a = await Gy(n, e, s, o === "current", i.resumeToken)), n.isPrimaryClient && t && Zl(n.remoteStore, i), a
    );
}
async function Gy(n, e, t, r, i) {
    n.Ba = (h, d, p) =>
        (async function (T, v, V, U) {
            let K = v.view.da(V);
            K.Zi && (K = await oc(T.localStore, v.query, !1).then(({ documents: ct }) => v.view.da(ct, K)));
            const fe = U && U.targetChanges.get(v.targetId),
                at = U && U.targetMismatches.get(v.targetId) != null,
                Ie = v.view.applyChanges(K, T.isPrimaryClient, fe, at);
            return fc(T, v.targetId, Ie.fa), Ie.snapshot;
        })(n, h, d, p);
    const s = await oc(n.localStore, e, !0),
        o = new By(e, s.ls),
        a = o.da(s.documents),
        c = Xn.createSynthesizedTargetChangeForCurrentChange(t, r && n.onlineState !== "Offline", i),
        u = o.applyChanges(a, n.isPrimaryClient, c);
    fc(n, t, u.fa);
    const l = new qy(e, t, o);
    return n.ba.set(e, l), n.Da.has(t) ? n.Da.get(t).push(e) : n.Da.set(t, [e]), u.snapshot;
}
async function Wy(n, e, t) {
    const r = S(n),
        i = r.ba.get(e),
        s = r.Da.get(i.targetId);
    if (s.length > 1)
        return (
            r.Da.set(
                i.targetId,
                s.filter((o) => !pi(o, e)),
            ),
            void r.ba.delete(e)
        );
    r.isPrimaryClient
        ? (r.sharedClientState.removeLocalQueryTarget(i.targetId),
          r.sharedClientState.isActiveQueryTarget(i.targetId) ||
              (await Ps(r.localStore, i.targetId, !1)
                  .then(() => {
                      r.sharedClientState.clearQueryState(i.targetId),
                          t && Po(r.remoteStore, i.targetId),
                          Cs(r, i.targetId);
                  })
                  .catch(Qn)))
        : (Cs(r, i.targetId), await Ps(r.localStore, i.targetId, !0));
}
async function Ky(n, e) {
    const t = S(n),
        r = t.ba.get(e),
        i = t.Da.get(r.targetId);
    t.isPrimaryClient &&
        i.length === 1 &&
        (t.sharedClientState.removeLocalQueryTarget(r.targetId), Po(t.remoteStore, r.targetId));
}
async function Qy(n, e, t) {
    const r = nv(n);
    try {
        const i = await (function (o, a) {
            const c = S(o),
                u = z.now(),
                l = a.reduce((p, I) => p.add(I.key), C());
            let h, d;
            return c.persistence
                .runTransaction("Locally write mutations", "readwrite", (p) => {
                    let I = Fe(),
                        T = C();
                    return c.ss
                        .getEntries(p, l)
                        .next((v) => {
                            (I = v),
                                I.forEach((V, U) => {
                                    U.isValidDocument() || (T = T.add(V));
                                });
                        })
                        .next(() => c.localDocuments.getOverlayedDocuments(p, I))
                        .next((v) => {
                            h = v;
                            const V = [];
                            for (const U of a) {
                                const K = y_(U, h.get(U.key).overlayedDocument);
                                K != null && V.push(new ot(U.key, K, vl(K.value.mapValue), me.exists(!0)));
                            }
                            return c.mutationQueue.addMutationBatch(p, u, V, a);
                        })
                        .next((v) => {
                            d = v;
                            const V = v.applyToLocalDocumentSet(h, T);
                            return c.documentOverlayCache.saveOverlays(p, v.batchId, V);
                        });
                })
                .then(() => ({ batchId: d.batchId, changes: bl(h) }));
        })(r.localStore, e);
        r.sharedClientState.addPendingMutation(i.batchId),
            (function (o, a, c) {
                let u = o.xa[o.currentUser.toKey()];
                u || (u = new x(D)), (u = u.insert(a, c)), (o.xa[o.currentUser.toKey()] = u);
            })(r, i.batchId, t),
            await er(r, i.changes),
            await Ii(r.remoteStore);
    } catch (i) {
        const s = Do(i, "Failed to persist write");
        t.reject(s);
    }
}
async function ch(n, e) {
    const t = S(n);
    try {
        const r = await ly(t.localStore, e);
        e.targetChanges.forEach((i, s) => {
            const o = t.Fa.get(s);
            o &&
                (M(i.addedDocuments.size + i.modifiedDocuments.size + i.removedDocuments.size <= 1),
                i.addedDocuments.size > 0
                    ? (o.wa = !0)
                    : i.modifiedDocuments.size > 0
                      ? M(o.wa)
                      : i.removedDocuments.size > 0 && (M(o.wa), (o.wa = !1)));
        }),
            await er(t, r, e);
    } catch (r) {
        await Qn(r);
    }
}
function dc(n, e, t) {
    const r = S(n);
    if ((r.isPrimaryClient && t === 0) || (!r.isPrimaryClient && t === 1)) {
        const i = [];
        r.ba.forEach((s, o) => {
            const a = o.view.j_(e);
            a.snapshot && i.push(a.snapshot);
        }),
            (function (o, a) {
                const c = S(o);
                c.onlineState = a;
                let u = !1;
                c.queries.forEach((l, h) => {
                    for (const d of h.U_) d.j_(a) && (u = !0);
                }),
                    u && Oo(c);
            })(r.eventManager, e),
            i.length && r.Sa.l_(i),
            (r.onlineState = e),
            r.isPrimaryClient && r.sharedClientState.setOnlineState(e);
    }
}
async function Jy(n, e, t) {
    const r = S(n);
    r.sharedClientState.updateQueryState(e, "rejected", t);
    const i = r.Fa.get(e),
        s = i && i.key;
    if (s) {
        let o = new x(E.comparator);
        o = o.insert(s, re.newNoDocument(s, P.min()));
        const a = C().add(s),
            c = new yi(P.min(), new Map(), new x(D), o, a);
        await ch(r, c), (r.va = r.va.remove(s)), r.Fa.delete(e), Lo(r);
    } else
        await Ps(r.localStore, e, !1)
            .then(() => Cs(r, e, t))
            .catch(Qn);
}
async function Yy(n, e) {
    const t = S(n),
        r = e.batch.batchId;
    try {
        const i = await uy(t.localStore, e);
        lh(t, r, null), uh(t, r), t.sharedClientState.updateMutationState(r, "acknowledged"), await er(t, i);
    } catch (i) {
        await Qn(i);
    }
}
async function Xy(n, e, t) {
    const r = S(n);
    try {
        const i = await (function (o, a) {
            const c = S(o);
            return c.persistence.runTransaction("Reject batch", "readwrite-primary", (u) => {
                let l;
                return c.mutationQueue
                    .lookupMutationBatch(u, a)
                    .next((h) => (M(h !== null), (l = h.keys()), c.mutationQueue.removeMutationBatch(u, h)))
                    .next(() => c.mutationQueue.performConsistencyCheck(u))
                    .next(() => c.documentOverlayCache.removeOverlaysForBatchId(u, l, a))
                    .next(() => c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u, l))
                    .next(() => c.localDocuments.getDocuments(u, l));
            });
        })(r.localStore, e);
        lh(r, e, t), uh(r, e), r.sharedClientState.updateMutationState(e, "rejected", t), await er(r, i);
    } catch (i) {
        await Qn(i);
    }
}
function uh(n, e) {
    (n.Oa.get(e) || []).forEach((t) => {
        t.resolve();
    }),
        n.Oa.delete(e);
}
function lh(n, e, t) {
    const r = S(n);
    let i = r.xa[r.currentUser.toKey()];
    if (i) {
        const s = i.get(e);
        s && (t ? s.reject(t) : s.resolve(), (i = i.remove(e))), (r.xa[r.currentUser.toKey()] = i);
    }
}
function Cs(n, e, t = null) {
    n.sharedClientState.removeLocalQueryTarget(e);
    for (const r of n.Da.get(e)) n.ba.delete(r), t && n.Sa.ka(r, t);
    n.Da.delete(e),
        n.isPrimaryClient &&
            n.Ma.Rr(e).forEach((r) => {
                n.Ma.containsKey(r) || hh(n, r);
            });
}
function hh(n, e) {
    n.Ca.delete(e.path.canonicalString());
    const t = n.va.get(e);
    t !== null && (Po(n.remoteStore, t), (n.va = n.va.remove(e)), n.Fa.delete(t), Lo(n));
}
function fc(n, e, t) {
    for (const r of t)
        r instanceof sh
            ? (n.Ma.addReference(r.key, e), Zy(n, r))
            : r instanceof oh
              ? (y("SyncEngine", "Document no longer in limbo: " + r.key),
                n.Ma.removeReference(r.key, e),
                n.Ma.containsKey(r.key) || hh(n, r.key))
              : A();
}
function Zy(n, e) {
    const t = e.key,
        r = t.path.canonicalString();
    n.va.get(t) || n.Ca.has(r) || (y("SyncEngine", "New document in limbo: " + t), n.Ca.add(r), Lo(n));
}
function Lo(n) {
    for (; n.Ca.size > 0 && n.va.size < n.maxConcurrentLimboResolutions; ) {
        const e = n.Ca.values().next().value;
        n.Ca.delete(e);
        const t = new E(O.fromString(e)),
            r = n.Na.next();
        n.Fa.set(r, new jy(t)),
            (n.va = n.va.insert(t, r)),
            Zl(n.remoteStore, new We(Pe(fi(t.path)), r, "TargetPurposeLimboResolution", fo.oe));
    }
}
async function er(n, e, t) {
    const r = S(n),
        i = [],
        s = [],
        o = [];
    r.ba.isEmpty() ||
        (r.ba.forEach((a, c) => {
            o.push(
                r.Ba(c, e, t).then((u) => {
                    if (
                        ((u || t) &&
                            r.isPrimaryClient &&
                            r.sharedClientState.updateQueryState(
                                c.targetId,
                                u != null && u.fromCache ? "not-current" : "current",
                            ),
                        u)
                    ) {
                        i.push(u);
                        const l = Ro.Qi(c.targetId, u);
                        s.push(l);
                    }
                }),
            );
        }),
        await Promise.all(o),
        r.Sa.l_(i),
        await (async function (c, u) {
            const l = S(c);
            try {
                await l.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (h) =>
                    m.forEach(u, (d) =>
                        m
                            .forEach(d.ki, (p) => l.persistence.referenceDelegate.addReference(h, d.targetId, p))
                            .next(() =>
                                m.forEach(d.qi, (p) =>
                                    l.persistence.referenceDelegate.removeReference(h, d.targetId, p),
                                ),
                            ),
                    ),
                );
            } catch (h) {
                if (!Jn(h)) throw h;
                y("LocalStore", "Failed to update sequence numbers: " + h);
            }
            for (const h of u) {
                const d = h.targetId;
                if (!h.fromCache) {
                    const p = l.ts.get(d),
                        I = p.snapshotVersion,
                        T = p.withLastLimboFreeSnapshotVersion(I);
                    l.ts = l.ts.insert(d, T);
                }
            }
        })(r.localStore, s));
}
async function ev(n, e) {
    const t = S(n);
    if (!t.currentUser.isEqual(e)) {
        y("SyncEngine", "User change. New user:", e.toKey());
        const r = await Ql(t.localStore, e);
        (t.currentUser = e),
            (function (s, o) {
                s.Oa.forEach((a) => {
                    a.forEach((c) => {
                        c.reject(new _(f.CANCELLED, o));
                    });
                }),
                    s.Oa.clear();
            })(t, "'waitForPendingWrites' promise is rejected due to a user change."),
            t.sharedClientState.handleUserChange(e, r.removedBatchIds, r.addedBatchIds),
            await er(t, r._s);
    }
}
function tv(n, e) {
    const t = S(n),
        r = t.Fa.get(e);
    if (r && r.wa) return C().add(r.key);
    {
        let i = C();
        const s = t.Da.get(e);
        if (!s) return i;
        for (const o of s) {
            const a = t.ba.get(o);
            i = i.unionWith(a.view.Ea);
        }
        return i;
    }
}
function dh(n) {
    const e = S(n);
    return (
        (e.remoteStore.remoteSyncer.applyRemoteEvent = ch.bind(null, e)),
        (e.remoteStore.remoteSyncer.getRemoteKeysForTarget = tv.bind(null, e)),
        (e.remoteStore.remoteSyncer.rejectListen = Jy.bind(null, e)),
        (e.Sa.l_ = Fy.bind(null, e.eventManager)),
        (e.Sa.ka = Uy.bind(null, e.eventManager)),
        e
    );
}
function nv(n) {
    const e = S(n);
    return (
        (e.remoteStore.remoteSyncer.applySuccessfulWrite = Yy.bind(null, e)),
        (e.remoteStore.remoteSyncer.rejectFailedWrite = Xy.bind(null, e)),
        e
    );
}
class pc {
    constructor() {
        this.synchronizeTabs = !1;
    }
    async initialize(e) {
        (this.serializer = vi(e.databaseInfo.databaseId)),
            (this.sharedClientState = this.createSharedClientState(e)),
            (this.persistence = this.createPersistence(e)),
            await this.persistence.start(),
            (this.localStore = this.createLocalStore(e)),
            (this.gcScheduler = this.createGarbageCollectionScheduler(e, this.localStore)),
            (this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(e, this.localStore));
    }
    createGarbageCollectionScheduler(e, t) {
        return null;
    }
    createIndexBackfillerScheduler(e, t) {
        return null;
    }
    createLocalStore(e) {
        return cy(this.persistence, new oy(), e.initialUser, this.serializer);
    }
    createPersistence(e) {
        return new ry(Ao.jr, this.serializer);
    }
    createSharedClientState(e) {
        return new my();
    }
    async terminate() {
        var e, t;
        (e = this.gcScheduler) === null || e === void 0 || e.stop(),
            (t = this.indexBackfillerScheduler) === null || t === void 0 || t.stop(),
            this.sharedClientState.shutdown(),
            await this.persistence.shutdown();
    }
}
class rv {
    async initialize(e, t) {
        this.localStore ||
            ((this.localStore = e.localStore),
            (this.sharedClientState = e.sharedClientState),
            (this.datastore = this.createDatastore(t)),
            (this.remoteStore = this.createRemoteStore(t)),
            (this.eventManager = this.createEventManager(t)),
            (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
            (this.sharedClientState.onlineStateHandler = (r) => dc(this.syncEngine, r, 1)),
            (this.remoteStore.remoteSyncer.handleCredentialChange = ev.bind(null, this.syncEngine)),
            await My(this.remoteStore, this.syncEngine.isPrimaryClient));
    }
    createEventManager(e) {
        return (function () {
            return new xy();
        })();
    }
    createDatastore(e) {
        const t = vi(e.databaseInfo.databaseId),
            r = (function (s) {
                return new vy(s);
            })(e.databaseInfo);
        return (function (s, o, a, c) {
            return new Ty(s, o, a, c);
        })(e.authCredentials, e.appCheckCredentials, r, t);
    }
    createRemoteStore(e) {
        return (function (r, i, s, o, a) {
            return new Ay(r, i, s, o, a);
        })(
            this.localStore,
            this.datastore,
            e.asyncQueue,
            (t) => dc(this.syncEngine, t, 0),
            (function () {
                return cc.D() ? new cc() : new gy();
            })(),
        );
    }
    createSyncEngine(e, t) {
        return (function (i, s, o, a, c, u, l) {
            const h = new $y(i, s, o, a, c, u);
            return l && (h.La = !0), h;
        })(
            this.localStore,
            this.remoteStore,
            this.eventManager,
            this.sharedClientState,
            e.initialUser,
            e.maxConcurrentLimboResolutions,
            t,
        );
    }
    async terminate() {
        var e;
        await (async function (r) {
            const i = S(r);
            y("RemoteStore", "RemoteStore shutting down."),
                i.M_.add(5),
                await Zn(i),
                i.O_.shutdown(),
                i.N_.set("Unknown");
        })(this.remoteStore),
            (e = this.datastore) === null || e === void 0 || e.terminate();
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class xo {
    constructor(e) {
        (this.observer = e), (this.muted = !1);
    }
    next(e) {
        this.observer.next && this.Ka(this.observer.next, e);
    }
    error(e) {
        this.observer.error
            ? this.Ka(this.observer.error, e)
            : xe("Uncaught Error in snapshot listener:", e.toString());
    }
    $a() {
        this.muted = !0;
    }
    Ka(e, t) {
        this.muted ||
            setTimeout(() => {
                this.muted || e(t);
            }, 0);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class iv {
    constructor(e, t, r, i) {
        (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.asyncQueue = r),
            (this.databaseInfo = i),
            (this.user = ne.UNAUTHENTICATED),
            (this.clientId = gl.newId()),
            (this.authCredentialListener = () => Promise.resolve()),
            (this.appCheckCredentialListener = () => Promise.resolve()),
            this.authCredentials.start(r, async (s) => {
                y("FirestoreClient", "Received user=", s.uid), await this.authCredentialListener(s), (this.user = s);
            }),
            this.appCheckCredentials.start(
                r,
                (s) => (
                    y("FirestoreClient", "Received new app check token=", s),
                    this.appCheckCredentialListener(s, this.user)
                ),
            );
    }
    get configuration() {
        return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            authCredentials: this.authCredentials,
            appCheckCredentials: this.appCheckCredentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100,
        };
    }
    setCredentialChangeListener(e) {
        this.authCredentialListener = e;
    }
    setAppCheckTokenChangeListener(e) {
        this.appCheckCredentialListener = e;
    }
    verifyNotTerminated() {
        if (this.asyncQueue.isShuttingDown)
            throw new _(f.FAILED_PRECONDITION, "The client has already been terminated.");
    }
    terminate() {
        this.asyncQueue.enterRestrictedMode();
        const e = new Oe();
        return (
            this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
                try {
                    this._onlineComponents && (await this._onlineComponents.terminate()),
                        this._offlineComponents && (await this._offlineComponents.terminate()),
                        this.authCredentials.shutdown(),
                        this.appCheckCredentials.shutdown(),
                        e.resolve();
                } catch (t) {
                    const r = Do(t, "Failed to shutdown persistence");
                    e.reject(r);
                }
            }),
            e.promise
        );
    }
}
async function Ki(n, e) {
    n.asyncQueue.verifyOperationInProgress(), y("FirestoreClient", "Initializing OfflineComponentProvider");
    const t = n.configuration;
    await e.initialize(t);
    let r = t.initialUser;
    n.setCredentialChangeListener(async (i) => {
        r.isEqual(i) || (await Ql(e.localStore, i), (r = i));
    }),
        e.persistence.setDatabaseDeletedListener(() => n.terminate()),
        (n._offlineComponents = e);
}
async function mc(n, e) {
    n.asyncQueue.verifyOperationInProgress();
    const t = await ov(n);
    y("FirestoreClient", "Initializing OnlineComponentProvider"),
        await e.initialize(t, n.configuration),
        n.setCredentialChangeListener((r) => uc(e.remoteStore, r)),
        n.setAppCheckTokenChangeListener((r, i) => uc(e.remoteStore, i)),
        (n._onlineComponents = e);
}
function sv(n) {
    return n.name === "FirebaseError"
        ? n.code === f.FAILED_PRECONDITION || n.code === f.UNIMPLEMENTED
        : !(typeof DOMException < "u" && n instanceof DOMException) || n.code === 22 || n.code === 20 || n.code === 11;
}
async function ov(n) {
    if (!n._offlineComponents)
        if (n._uninitializedComponentsProvider) {
            y("FirestoreClient", "Using user provided OfflineComponentProvider");
            try {
                await Ki(n, n._uninitializedComponentsProvider._offline);
            } catch (e) {
                const t = e;
                if (!sv(t)) throw t;
                Bt("Error using user provided cache. Falling back to memory cache: " + t), await Ki(n, new pc());
            }
        } else y("FirestoreClient", "Using default OfflineComponentProvider"), await Ki(n, new pc());
    return n._offlineComponents;
}
async function fh(n) {
    return (
        n._onlineComponents ||
            (n._uninitializedComponentsProvider
                ? (y("FirestoreClient", "Using user provided OnlineComponentProvider"),
                  await mc(n, n._uninitializedComponentsProvider._online))
                : (y("FirestoreClient", "Using default OnlineComponentProvider"), await mc(n, new rv()))),
        n._onlineComponents
    );
}
function av(n) {
    return fh(n).then((e) => e.syncEngine);
}
async function qr(n) {
    const e = await fh(n),
        t = e.eventManager;
    return (
        (t.onListen = zy.bind(null, e.syncEngine)),
        (t.onUnlisten = Wy.bind(null, e.syncEngine)),
        (t.onFirstRemoteStoreListen = Hy.bind(null, e.syncEngine)),
        (t.onLastRemoteStoreUnlisten = Ky.bind(null, e.syncEngine)),
        t
    );
}
function cv(n, e, t = {}) {
    const r = new Oe();
    return (
        n.asyncQueue.enqueueAndForget(async () =>
            (function (s, o, a, c, u) {
                const l = new xo({
                        next: (d) => {
                            o.enqueueAndForget(() => No(s, h));
                            const p = d.docs.has(a);
                            !p && d.fromCache
                                ? u.reject(
                                      new _(f.UNAVAILABLE, "Failed to get document because the client is offline."),
                                  )
                                : p && d.fromCache && c && c.source === "server"
                                  ? u.reject(
                                        new _(
                                            f.UNAVAILABLE,
                                            'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)',
                                        ),
                                    )
                                  : u.resolve(d);
                        },
                        error: (d) => u.reject(d),
                    }),
                    h = new Mo(fi(a.path), l, { includeMetadataChanges: !0, ra: !0 });
                return Vo(s, h);
            })(await qr(n), n.asyncQueue, e, t, r),
        ),
        r.promise
    );
}
function uv(n, e, t = {}) {
    const r = new Oe();
    return (
        n.asyncQueue.enqueueAndForget(async () =>
            (function (s, o, a, c, u) {
                const l = new xo({
                        next: (d) => {
                            o.enqueueAndForget(() => No(s, h)),
                                d.fromCache && c.source === "server"
                                    ? u.reject(
                                          new _(
                                              f.UNAVAILABLE,
                                              'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)',
                                          ),
                                      )
                                    : u.resolve(d);
                        },
                        error: (d) => u.reject(d),
                    }),
                    h = new Mo(a, l, { includeMetadataChanges: !0, ra: !0 });
                return Vo(s, h);
            })(await qr(n), n.asyncQueue, e, t, r),
        ),
        r.promise
    );
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ph(n) {
    const e = {};
    return n.timeoutSeconds !== void 0 && (e.timeoutSeconds = n.timeoutSeconds), e;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const gc = new Map();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function mh(n, e, t) {
    if (!t) throw new _(f.INVALID_ARGUMENT, `Function ${n}() cannot be called with an empty ${e}.`);
}
function lv(n, e, t, r) {
    if (e === !0 && r === !0) throw new _(f.INVALID_ARGUMENT, `${n} and ${t} cannot be used together.`);
}
function _c(n) {
    if (!E.isDocumentKey(n))
        throw new _(
            f.INVALID_ARGUMENT,
            `Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`,
        );
}
function yc(n) {
    if (E.isDocumentKey(n))
        throw new _(
            f.INVALID_ARGUMENT,
            `Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`,
        );
}
function Ti(n) {
    if (n === void 0) return "undefined";
    if (n === null) return "null";
    if (typeof n == "string") return n.length > 20 && (n = `${n.substring(0, 20)}...`), JSON.stringify(n);
    if (typeof n == "number" || typeof n == "boolean") return "" + n;
    if (typeof n == "object") {
        if (n instanceof Array) return "an array";
        {
            const e = (function (r) {
                return r.constructor ? r.constructor.name : null;
            })(n);
            return e ? `a custom ${e} object` : "an object";
        }
    }
    return typeof n == "function" ? "a function" : A();
}
function le(n, e) {
    if (("_delegate" in n && (n = n._delegate), !(n instanceof e))) {
        if (e.name === n.constructor.name)
            throw new _(
                f.INVALID_ARGUMENT,
                "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?",
            );
        {
            const t = Ti(n);
            throw new _(f.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${t}`);
        }
    }
    return n;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vc {
    constructor(e) {
        var t, r;
        if (e.host === void 0) {
            if (e.ssl !== void 0) throw new _(f.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            (this.host = "firestore.googleapis.com"), (this.ssl = !0);
        } else (this.host = e.host), (this.ssl = (t = e.ssl) === null || t === void 0 || t);
        if (
            ((this.credentials = e.credentials),
            (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
            (this.localCache = e.localCache),
            e.cacheSizeBytes === void 0)
        )
            this.cacheSizeBytes = 41943040;
        else {
            if (e.cacheSizeBytes !== -1 && e.cacheSizeBytes < 1048576)
                throw new _(f.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
            this.cacheSizeBytes = e.cacheSizeBytes;
        }
        lv(
            "experimentalForceLongPolling",
            e.experimentalForceLongPolling,
            "experimentalAutoDetectLongPolling",
            e.experimentalAutoDetectLongPolling,
        ),
            (this.experimentalForceLongPolling = !!e.experimentalForceLongPolling),
            this.experimentalForceLongPolling
                ? (this.experimentalAutoDetectLongPolling = !1)
                : e.experimentalAutoDetectLongPolling === void 0
                  ? (this.experimentalAutoDetectLongPolling = !0)
                  : (this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling),
            (this.experimentalLongPollingOptions = ph(
                (r = e.experimentalLongPollingOptions) !== null && r !== void 0 ? r : {},
            )),
            (function (s) {
                if (s.timeoutSeconds !== void 0) {
                    if (isNaN(s.timeoutSeconds))
                        throw new _(
                            f.INVALID_ARGUMENT,
                            `invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`,
                        );
                    if (s.timeoutSeconds < 5)
                        throw new _(
                            f.INVALID_ARGUMENT,
                            `invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`,
                        );
                    if (s.timeoutSeconds > 30)
                        throw new _(
                            f.INVALID_ARGUMENT,
                            `invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`,
                        );
                }
            })(this.experimentalLongPollingOptions),
            (this.useFetchStreams = !!e.useFetchStreams);
    }
    isEqual(e) {
        return (
            this.host === e.host &&
            this.ssl === e.ssl &&
            this.credentials === e.credentials &&
            this.cacheSizeBytes === e.cacheSizeBytes &&
            this.experimentalForceLongPolling === e.experimentalForceLongPolling &&
            this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling &&
            (function (r, i) {
                return r.timeoutSeconds === i.timeoutSeconds;
            })(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) &&
            this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
            this.useFetchStreams === e.useFetchStreams
        );
    }
}
class wi {
    constructor(e, t, r, i) {
        (this._authCredentials = e),
            (this._appCheckCredentials = t),
            (this._databaseId = r),
            (this._app = i),
            (this.type = "firestore-lite"),
            (this._persistenceKey = "(lite)"),
            (this._settings = new vc({})),
            (this._settingsFrozen = !1);
    }
    get app() {
        if (!this._app)
            throw new _(
                f.FAILED_PRECONDITION,
                "Firestore was not initialized using the Firebase SDK. 'app' is not available",
            );
        return this._app;
    }
    get _initialized() {
        return this._settingsFrozen;
    }
    get _terminated() {
        return this._terminateTask !== void 0;
    }
    _setSettings(e) {
        if (this._settingsFrozen)
            throw new _(
                f.FAILED_PRECONDITION,
                "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.",
            );
        (this._settings = new vc(e)),
            e.credentials !== void 0 &&
                (this._authCredentials = (function (r) {
                    if (!r) return new Cg();
                    switch (r.type) {
                        case "firstParty":
                            return new Vg(r.sessionIndex || "0", r.iamToken || null, r.authTokenFactory || null);
                        case "provider":
                            return r.client;
                        default:
                            throw new _(
                                f.INVALID_ARGUMENT,
                                "makeAuthCredentialsProvider failed due to invalid credential type",
                            );
                    }
                })(e.credentials));
    }
    _getSettings() {
        return this._settings;
    }
    _freezeSettings() {
        return (this._settingsFrozen = !0), this._settings;
    }
    _delete() {
        return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
    }
    toJSON() {
        return { app: this._app, databaseId: this._databaseId, settings: this._settings };
    }
    _terminate() {
        return (
            (function (t) {
                const r = gc.get(t);
                r && (y("ComponentProvider", "Removing Datastore"), gc.delete(t), r.terminate());
            })(this),
            Promise.resolve()
        );
    }
}
function hv(n, e, t, r = {}) {
    var i;
    const s = (n = le(n, wi))._getSettings(),
        o = `${e}:${t}`;
    if (
        (s.host !== "firestore.googleapis.com" &&
            s.host !== o &&
            Bt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),
        n._setSettings(Object.assign(Object.assign({}, s), { host: o, ssl: !1 })),
        r.mockUserToken)
    ) {
        let a, c;
        if (typeof r.mockUserToken == "string") (a = r.mockUserToken), (c = ne.MOCK_USER);
        else {
            a = Uh(r.mockUserToken, (i = n._app) === null || i === void 0 ? void 0 : i.options.projectId);
            const u = r.mockUserToken.sub || r.mockUserToken.user_id;
            if (!u) throw new _(f.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
            c = new ne(u);
        }
        n._authCredentials = new bg(new ml(a, c));
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qe {
    constructor(e, t, r) {
        (this.converter = t), (this._query = r), (this.type = "query"), (this.firestore = e);
    }
    withConverter(e) {
        return new qe(this.firestore, e, this._query);
    }
}
class oe {
    constructor(e, t, r) {
        (this.converter = t), (this._key = r), (this.type = "document"), (this.firestore = e);
    }
    get _path() {
        return this._key.path;
    }
    get id() {
        return this._key.path.lastSegment();
    }
    get path() {
        return this._key.path.canonicalString();
    }
    get parent() {
        return new Ye(this.firestore, this.converter, this._key.path.popLast());
    }
    withConverter(e) {
        return new oe(this.firestore, e, this._key);
    }
}
class Ye extends qe {
    constructor(e, t, r) {
        super(e, t, fi(r)), (this._path = r), (this.type = "collection");
    }
    get id() {
        return this._query.path.lastSegment();
    }
    get path() {
        return this._query.path.canonicalString();
    }
    get parent() {
        const e = this._path.popLast();
        return e.isEmpty() ? null : new oe(this.firestore, null, new E(e));
    }
    withConverter(e) {
        return new Ye(this.firestore, e, this._path);
    }
}
function Ov(n, e, ...t) {
    if (((n = $(n)), mh("collection", "path", e), n instanceof wi)) {
        const r = O.fromString(e, ...t);
        return yc(r), new Ye(n, null, r);
    }
    {
        if (!(n instanceof oe || n instanceof Ye))
            throw new _(
                f.INVALID_ARGUMENT,
                "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore",
            );
        const r = n._path.child(O.fromString(e, ...t));
        return yc(r), new Ye(n.firestore, null, r);
    }
}
function dv(n, e, ...t) {
    if (((n = $(n)), arguments.length === 1 && (e = gl.newId()), mh("doc", "path", e), n instanceof wi)) {
        const r = O.fromString(e, ...t);
        return _c(r), new oe(n, null, new E(r));
    }
    {
        if (!(n instanceof oe || n instanceof Ye))
            throw new _(
                f.INVALID_ARGUMENT,
                "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore",
            );
        const r = n._path.child(O.fromString(e, ...t));
        return _c(r), new oe(n.firestore, n instanceof Ye ? n.converter : null, new E(r));
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class fv {
    constructor() {
        (this.iu = Promise.resolve()),
            (this.su = []),
            (this.ou = !1),
            (this._u = []),
            (this.au = null),
            (this.uu = !1),
            (this.cu = !1),
            (this.lu = []),
            (this.Jo = new Yl(this, "async_queue_retry")),
            (this.hu = () => {
                const t = Wi();
                t && y("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.Jo.Uo();
            });
        const e = Wi();
        e && typeof e.addEventListener == "function" && e.addEventListener("visibilitychange", this.hu);
    }
    get isShuttingDown() {
        return this.ou;
    }
    enqueueAndForget(e) {
        this.enqueue(e);
    }
    enqueueAndForgetEvenWhileRestricted(e) {
        this.Pu(), this.Iu(e);
    }
    enterRestrictedMode(e) {
        if (!this.ou) {
            (this.ou = !0), (this.cu = e || !1);
            const t = Wi();
            t && typeof t.removeEventListener == "function" && t.removeEventListener("visibilitychange", this.hu);
        }
    }
    enqueue(e) {
        if ((this.Pu(), this.ou)) return new Promise(() => {});
        const t = new Oe();
        return this.Iu(() =>
            this.ou && this.cu ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise),
        ).then(() => t.promise);
    }
    enqueueRetryable(e) {
        this.enqueueAndForget(() => (this.su.push(e), this.Tu()));
    }
    async Tu() {
        if (this.su.length !== 0) {
            try {
                await this.su[0](), this.su.shift(), this.Jo.reset();
            } catch (e) {
                if (!Jn(e)) throw e;
                y("AsyncQueue", "Operation failed with retryable error: " + e);
            }
            this.su.length > 0 && this.Jo.Ko(() => this.Tu());
        }
    }
    Iu(e) {
        const t = this.iu.then(
            () => (
                (this.uu = !0),
                e()
                    .catch((r) => {
                        (this.au = r), (this.uu = !1);
                        const i = (function (o) {
                            let a = o.message || "";
                            return (
                                o.stack &&
                                    (a = o.stack.includes(o.message)
                                        ? o.stack
                                        : o.message +
                                          `
` +
                                          o.stack),
                                a
                            );
                        })(r);
                        throw (xe("INTERNAL UNHANDLED ERROR: ", i), r);
                    })
                    .then((r) => ((this.uu = !1), r))
            ),
        );
        return (this.iu = t), t;
    }
    enqueueAfterDelay(e, t, r) {
        this.Pu(), this.lu.indexOf(e) > -1 && (t = 0);
        const i = ko.createAndSchedule(this, e, t, r, (s) => this.Eu(s));
        return this._u.push(i), i;
    }
    Pu() {
        this.au && A();
    }
    verifyOperationInProgress() {}
    async du() {
        let e;
        do (e = this.iu), await e;
        while (e !== this.iu);
    }
    Au(e) {
        for (const t of this._u) if (t.timerId === e) return !0;
        return !1;
    }
    Ru(e) {
        return this.du().then(() => {
            this._u.sort((t, r) => t.targetTimeMs - r.targetTimeMs);
            for (const t of this._u) if ((t.skipDelay(), e !== "all" && t.timerId === e)) break;
            return this.du();
        });
    }
    Vu(e) {
        this.lu.push(e);
    }
    Eu(e) {
        const t = this._u.indexOf(e);
        this._u.splice(t, 1);
    }
}
function Ec(n) {
    return (function (t, r) {
        if (typeof t != "object" || t === null) return !1;
        const i = t;
        for (const s of r) if (s in i && typeof i[s] == "function") return !0;
        return !1;
    })(n, ["next", "error", "complete"]);
}
class Ue extends wi {
    constructor(e, t, r, i) {
        super(e, t, r, i),
            (this.type = "firestore"),
            (this._queue = (function () {
                return new fv();
            })()),
            (this._persistenceKey = (i == null ? void 0 : i.name) || "[DEFAULT]");
    }
    _terminate() {
        return this._firestoreClient || gh(this), this._firestoreClient.terminate();
    }
}
function pv(n, e) {
    const t = Vc(),
        r = "(default)",
        i = Vs(t, "firestore").getImmediate({ identifier: r });
    if (!i._initialized) {
        const s = xh("firestore");
        s && hv(i, ...s);
    }
    return i;
}
function Ai(n) {
    return n._firestoreClient || gh(n), n._firestoreClient.verifyNotTerminated(), n._firestoreClient;
}
function gh(n) {
    var e, t, r;
    const i = n._freezeSettings(),
        s = (function (a, c, u, l) {
            return new Hg(
                a,
                c,
                u,
                l.host,
                l.ssl,
                l.experimentalForceLongPolling,
                l.experimentalAutoDetectLongPolling,
                ph(l.experimentalLongPollingOptions),
                l.useFetchStreams,
            );
        })(
            n._databaseId,
            ((e = n._app) === null || e === void 0 ? void 0 : e.options.appId) || "",
            n._persistenceKey,
            i,
        );
    (n._firestoreClient = new iv(n._authCredentials, n._appCheckCredentials, n._queue, s)),
        !((t = i.localCache) === null || t === void 0) &&
            t._offlineComponentProvider &&
            !((r = i.localCache) === null || r === void 0) &&
            r._onlineComponentProvider &&
            (n._firestoreClient._uninitializedComponentsProvider = {
                _offlineKind: i.localCache.kind,
                _offline: i.localCache._offlineComponentProvider,
                _online: i.localCache._onlineComponentProvider,
            });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Wt {
    constructor(e) {
        this._byteString = e;
    }
    static fromBase64String(e) {
        try {
            return new Wt(ae.fromBase64String(e));
        } catch (t) {
            throw new _(f.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t);
        }
    }
    static fromUint8Array(e) {
        return new Wt(ae.fromUint8Array(e));
    }
    toBase64() {
        return this._byteString.toBase64();
    }
    toUint8Array() {
        return this._byteString.toUint8Array();
    }
    toString() {
        return "Bytes(base64: " + this.toBase64() + ")";
    }
    isEqual(e) {
        return this._byteString.isEqual(e._byteString);
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ri {
    constructor(...e) {
        for (let t = 0; t < e.length; ++t)
            if (e[t].length === 0)
                throw new _(
                    f.INVALID_ARGUMENT,
                    "Invalid field name at argument $(i + 1). Field names must not be empty.",
                );
        this._internalPath = new Y(e);
    }
    isEqual(e) {
        return this._internalPath.isEqual(e._internalPath);
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fo {
    constructor(e) {
        this._methodName = e;
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Uo {
    constructor(e, t) {
        if (!isFinite(e) || e < -90 || e > 90)
            throw new _(f.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + e);
        if (!isFinite(t) || t < -180 || t > 180)
            throw new _(f.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + t);
        (this._lat = e), (this._long = t);
    }
    get latitude() {
        return this._lat;
    }
    get longitude() {
        return this._long;
    }
    isEqual(e) {
        return this._lat === e._lat && this._long === e._long;
    }
    toJSON() {
        return { latitude: this._lat, longitude: this._long };
    }
    _compareTo(e) {
        return D(this._lat, e._lat) || D(this._long, e._long);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const mv = /^__.*__$/;
class gv {
    constructor(e, t, r) {
        (this.data = e), (this.fieldMask = t), (this.fieldTransforms = r);
    }
    toMutation(e, t) {
        return this.fieldMask !== null
            ? new ot(e, this.data, this.fieldMask, t, this.fieldTransforms)
            : new Yn(e, this.data, t, this.fieldTransforms);
    }
}
class _h {
    constructor(e, t, r) {
        (this.data = e), (this.fieldMask = t), (this.fieldTransforms = r);
    }
    toMutation(e, t) {
        return new ot(e, this.data, this.fieldMask, t, this.fieldTransforms);
    }
}
function yh(n) {
    switch (n) {
        case 0:
        case 2:
        case 1:
            return !0;
        case 3:
        case 4:
            return !1;
        default:
            throw A();
    }
}
class Bo {
    constructor(e, t, r, i, s, o) {
        (this.settings = e),
            (this.databaseId = t),
            (this.serializer = r),
            (this.ignoreUndefinedProperties = i),
            s === void 0 && this.mu(),
            (this.fieldTransforms = s || []),
            (this.fieldMask = o || []);
    }
    get path() {
        return this.settings.path;
    }
    get fu() {
        return this.settings.fu;
    }
    gu(e) {
        return new Bo(
            Object.assign(Object.assign({}, this.settings), e),
            this.databaseId,
            this.serializer,
            this.ignoreUndefinedProperties,
            this.fieldTransforms,
            this.fieldMask,
        );
    }
    pu(e) {
        var t;
        const r = (t = this.path) === null || t === void 0 ? void 0 : t.child(e),
            i = this.gu({ path: r, yu: !1 });
        return i.wu(e), i;
    }
    Su(e) {
        var t;
        const r = (t = this.path) === null || t === void 0 ? void 0 : t.child(e),
            i = this.gu({ path: r, yu: !1 });
        return i.mu(), i;
    }
    bu(e) {
        return this.gu({ path: void 0, yu: !0 });
    }
    Du(e) {
        return jr(e, this.settings.methodName, this.settings.Cu || !1, this.path, this.settings.vu);
    }
    contains(e) {
        return (
            this.fieldMask.find((t) => e.isPrefixOf(t)) !== void 0 ||
            this.fieldTransforms.find((t) => e.isPrefixOf(t.field)) !== void 0
        );
    }
    mu() {
        if (this.path) for (let e = 0; e < this.path.length; e++) this.wu(this.path.get(e));
    }
    wu(e) {
        if (e.length === 0) throw this.Du("Document fields must not be empty");
        if (yh(this.fu) && mv.test(e)) throw this.Du('Document fields cannot begin and end with "__"');
    }
}
class _v {
    constructor(e, t, r) {
        (this.databaseId = e), (this.ignoreUndefinedProperties = t), (this.serializer = r || vi(e));
    }
    Fu(e, t, r, i = !1) {
        return new Bo(
            { fu: e, methodName: t, vu: r, path: Y.emptyPath(), yu: !1, Cu: i },
            this.databaseId,
            this.serializer,
            this.ignoreUndefinedProperties,
        );
    }
}
function tr(n) {
    const e = n._freezeSettings(),
        t = vi(n._databaseId);
    return new _v(n._databaseId, !!e.ignoreUndefinedProperties, t);
}
function vh(n, e, t, r, i, s = {}) {
    const o = n.Fu(s.merge || s.mergeFields ? 2 : 0, e, t, i);
    qo("Data must be an object, but it was:", o, r);
    const a = Ih(r, o);
    let c, u;
    if (s.merge) (c = new he(o.fieldMask)), (u = o.fieldTransforms);
    else if (s.mergeFields) {
        const l = [];
        for (const h of s.mergeFields) {
            const d = bs(e, h, t);
            if (!o.contains(d))
                throw new _(
                    f.INVALID_ARGUMENT,
                    `Field '${d}' is specified in your field mask but missing from your input data.`,
                );
            wh(l, d) || l.push(d);
        }
        (c = new he(l)), (u = o.fieldTransforms.filter((h) => c.covers(h.field)));
    } else (c = null), (u = o.fieldTransforms);
    return new gv(new ue(a), c, u);
}
class Pi extends Fo {
    _toFieldTransform(e) {
        if (e.fu !== 2)
            throw e.fu === 1
                ? e.Du(`${this._methodName}() can only appear at the top level of your update data`)
                : e.Du(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
        return e.fieldMask.push(e.path), null;
    }
    isEqual(e) {
        return e instanceof Pi;
    }
}
function yv(n, e, t, r) {
    const i = n.Fu(1, e, t);
    qo("Data must be an object, but it was:", i, r);
    const s = [],
        o = ue.empty();
    wt(r, (c, u) => {
        const l = jo(e, c, t);
        u = $(u);
        const h = i.Su(l);
        if (u instanceof Pi) s.push(l);
        else {
            const d = nr(u, h);
            d != null && (s.push(l), o.set(l, d));
        }
    });
    const a = new he(s);
    return new _h(o, a, i.fieldTransforms);
}
function vv(n, e, t, r, i, s) {
    const o = n.Fu(1, e, t),
        a = [bs(e, r, t)],
        c = [i];
    if (s.length % 2 != 0)
        throw new _(
            f.INVALID_ARGUMENT,
            `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`,
        );
    for (let d = 0; d < s.length; d += 2) a.push(bs(e, s[d])), c.push(s[d + 1]);
    const u = [],
        l = ue.empty();
    for (let d = a.length - 1; d >= 0; --d)
        if (!wh(u, a[d])) {
            const p = a[d];
            let I = c[d];
            I = $(I);
            const T = o.Su(p);
            if (I instanceof Pi) u.push(p);
            else {
                const v = nr(I, T);
                v != null && (u.push(p), l.set(p, v));
            }
        }
    const h = new he(u);
    return new _h(l, h, o.fieldTransforms);
}
function Eh(n, e, t, r = !1) {
    return nr(t, n.Fu(r ? 4 : 3, e));
}
function nr(n, e) {
    if (Th((n = $(n)))) return qo("Unsupported field value:", e, n), Ih(n, e);
    if (n instanceof Fo)
        return (
            (function (r, i) {
                if (!yh(i.fu)) throw i.Du(`${r._methodName}() can only be used with update() and set()`);
                if (!i.path) throw i.Du(`${r._methodName}() is not currently supported inside arrays`);
                const s = r._toFieldTransform(i);
                s && i.fieldTransforms.push(s);
            })(n, e),
            null
        );
    if (n === void 0 && e.ignoreUndefinedProperties) return null;
    if ((e.path && e.fieldMask.push(e.path), n instanceof Array)) {
        if (e.settings.yu && e.fu !== 4) throw e.Du("Nested arrays are not supported");
        return (function (r, i) {
            const s = [];
            let o = 0;
            for (const a of r) {
                let c = nr(a, i.bu(o));
                c == null && (c = { nullValue: "NULL_VALUE" }), s.push(c), o++;
            }
            return { arrayValue: { values: s } };
        })(n, e);
    }
    return (function (r, i) {
        if ((r = $(r)) === null) return { nullValue: "NULL_VALUE" };
        if (typeof r == "number") return d_(i.serializer, r);
        if (typeof r == "boolean") return { booleanValue: r };
        if (typeof r == "string") return { stringValue: r };
        if (r instanceof Date) {
            const s = z.fromDate(r);
            return { timestampValue: Ur(i.serializer, s) };
        }
        if (r instanceof z) {
            const s = new z(r.seconds, 1e3 * Math.floor(r.nanoseconds / 1e3));
            return { timestampValue: Ur(i.serializer, s) };
        }
        if (r instanceof Uo) return { geoPointValue: { latitude: r.latitude, longitude: r.longitude } };
        if (r instanceof Wt) return { bytesValue: jl(i.serializer, r._byteString) };
        if (r instanceof oe) {
            const s = i.databaseId,
                o = r.firestore._databaseId;
            if (!o.isEqual(s))
                throw i.Du(
                    `Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`,
                );
            return { referenceValue: To(r.firestore._databaseId || i.databaseId, r._key.path) };
        }
        throw i.Du(`Unsupported field value: ${Ti(r)}`);
    })(n, e);
}
function Ih(n, e) {
    const t = {};
    return (
        _l(n)
            ? e.path && e.path.length > 0 && e.fieldMask.push(e.path)
            : wt(n, (r, i) => {
                  const s = nr(i, e.pu(r));
                  s != null && (t[r] = s);
              }),
        { mapValue: { fields: t } }
    );
}
function Th(n) {
    return !(
        typeof n != "object" ||
        n === null ||
        n instanceof Array ||
        n instanceof Date ||
        n instanceof z ||
        n instanceof Uo ||
        n instanceof Wt ||
        n instanceof oe ||
        n instanceof Fo
    );
}
function qo(n, e, t) {
    if (
        !Th(t) ||
        !(function (i) {
            return (
                typeof i == "object" &&
                i !== null &&
                (Object.getPrototypeOf(i) === Object.prototype || Object.getPrototypeOf(i) === null)
            );
        })(t)
    ) {
        const r = Ti(t);
        throw r === "an object" ? e.Du(n + " a custom object") : e.Du(n + " " + r);
    }
}
function bs(n, e, t) {
    if ((e = $(e)) instanceof Ri) return e._internalPath;
    if (typeof e == "string") return jo(n, e);
    throw jr("Field path arguments must be of type string or ", n, !1, void 0, t);
}
const Ev = new RegExp("[~\\*/\\[\\]]");
function jo(n, e, t) {
    if (e.search(Ev) >= 0)
        throw jr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`, n, !1, void 0, t);
    try {
        return new Ri(...e.split("."))._internalPath;
    } catch {
        throw jr(
            `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
            n,
            !1,
            void 0,
            t,
        );
    }
}
function jr(n, e, t, r, i) {
    const s = r && !r.isEmpty(),
        o = i !== void 0;
    let a = `Function ${e}() called with invalid data`;
    t && (a += " (via `toFirestore()`)"), (a += ". ");
    let c = "";
    return (
        (s || o) && ((c += " (found"), s && (c += ` in field ${r}`), o && (c += ` in document ${i}`), (c += ")")),
        new _(f.INVALID_ARGUMENT, a + n + c)
    );
}
function wh(n, e) {
    return n.some((t) => t.isEqual(e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $o {
    constructor(e, t, r, i, s) {
        (this._firestore = e), (this._userDataWriter = t), (this._key = r), (this._document = i), (this._converter = s);
    }
    get id() {
        return this._key.path.lastSegment();
    }
    get ref() {
        return new oe(this._firestore, this._converter, this._key);
    }
    exists() {
        return this._document !== null;
    }
    data() {
        if (this._document) {
            if (this._converter) {
                const e = new Iv(this._firestore, this._userDataWriter, this._key, this._document, null);
                return this._converter.fromFirestore(e);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
        }
    }
    get(e) {
        if (this._document) {
            const t = this._document.data.field(Si("DocumentSnapshot.get", e));
            if (t !== null) return this._userDataWriter.convertValue(t);
        }
    }
}
class Iv extends $o {
    data() {
        return super.data();
    }
}
function Si(n, e) {
    return typeof e == "string" ? jo(n, e) : e instanceof Ri ? e._internalPath : e._delegate._internalPath;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ah(n) {
    if (n.limitType === "L" && n.explicitOrderBy.length === 0)
        throw new _(f.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}
class zo {}
class Ho extends zo {}
function Mv(n, e, ...t) {
    let r = [];
    e instanceof zo && r.push(e),
        (r = r.concat(t)),
        (function (s) {
            const o = s.filter((c) => c instanceof Go).length,
                a = s.filter((c) => c instanceof Ci).length;
            if (o > 1 || (o > 0 && a > 0))
                throw new _(
                    f.INVALID_ARGUMENT,
                    "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.",
                );
        })(r);
    for (const i of r) n = i._apply(n);
    return n;
}
class Ci extends Ho {
    constructor(e, t, r) {
        super(), (this._field = e), (this._op = t), (this._value = r), (this.type = "where");
    }
    static _create(e, t, r) {
        return new Ci(e, t, r);
    }
    _apply(e) {
        const t = this._parse(e);
        return Rh(e._query, t), new qe(e.firestore, e.converter, Es(e._query, t));
    }
    _parse(e) {
        const t = tr(e.firestore);
        return (function (s, o, a, c, u, l, h) {
            let d;
            if (u.isKeyField()) {
                if (l === "array-contains" || l === "array-contains-any")
                    throw new _(f.INVALID_ARGUMENT, `Invalid Query. You can't perform '${l}' queries on documentId().`);
                if (l === "in" || l === "not-in") {
                    Tc(h, l);
                    const p = [];
                    for (const I of h) p.push(Ic(c, s, I));
                    d = { arrayValue: { values: p } };
                } else d = Ic(c, s, h);
            } else
                (l !== "in" && l !== "not-in" && l !== "array-contains-any") || Tc(h, l),
                    (d = Eh(a, o, h, l === "in" || l === "not-in"));
            return j.create(u, l, d);
        })(e._query, "where", t, e.firestore._databaseId, this._field, this._op, this._value);
    }
}
function Lv(n, e, t) {
    const r = e,
        i = Si("where", n);
    return Ci._create(i, r, t);
}
class Go extends zo {
    constructor(e, t) {
        super(), (this.type = e), (this._queryConstraints = t);
    }
    static _create(e, t) {
        return new Go(e, t);
    }
    _parse(e) {
        const t = this._queryConstraints.map((r) => r._parse(e)).filter((r) => r.getFilters().length > 0);
        return t.length === 1 ? t[0] : Ee.create(t, this._getOperator());
    }
    _apply(e) {
        const t = this._parse(e);
        return t.getFilters().length === 0
            ? e
            : ((function (i, s) {
                  let o = i;
                  const a = s.getFlattenedFilters();
                  for (const c of a) Rh(o, c), (o = Es(o, c));
              })(e._query, t),
              new qe(e.firestore, e.converter, Es(e._query, t)));
    }
    _getQueryConstraints() {
        return this._queryConstraints;
    }
    _getOperator() {
        return this.type === "and" ? "and" : "or";
    }
}
class Wo extends Ho {
    constructor(e, t) {
        super(), (this._field = e), (this._direction = t), (this.type = "orderBy");
    }
    static _create(e, t) {
        return new Wo(e, t);
    }
    _apply(e) {
        const t = (function (i, s, o) {
            if (i.startAt !== null)
                throw new _(
                    f.INVALID_ARGUMENT,
                    "Invalid query. You must not call startAt() or startAfter() before calling orderBy().",
                );
            if (i.endAt !== null)
                throw new _(
                    f.INVALID_ARGUMENT,
                    "Invalid query. You must not call endAt() or endBefore() before calling orderBy().",
                );
            return new Nn(s, o);
        })(e._query, this._field, this._direction);
        return new qe(
            e.firestore,
            e.converter,
            (function (i, s) {
                const o = i.explicitOrderBy.concat([s]);
                return new At(
                    i.path,
                    i.collectionGroup,
                    o,
                    i.filters.slice(),
                    i.limit,
                    i.limitType,
                    i.startAt,
                    i.endAt,
                );
            })(e._query, t),
        );
    }
}
function xv(n, e = "asc") {
    const t = e,
        r = Si("orderBy", n);
    return Wo._create(r, t);
}
class Ko extends Ho {
    constructor(e, t, r) {
        super(), (this.type = e), (this._docOrFields = t), (this._inclusive = r);
    }
    static _create(e, t, r) {
        return new Ko(e, t, r);
    }
    _apply(e) {
        const t = Tv(e, this.type, this._docOrFields, this._inclusive);
        return new qe(
            e.firestore,
            e.converter,
            (function (i, s) {
                return new At(
                    i.path,
                    i.collectionGroup,
                    i.explicitOrderBy.slice(),
                    i.filters.slice(),
                    i.limit,
                    i.limitType,
                    s,
                    i.endAt,
                );
            })(e._query, t),
        );
    }
}
function Fv(...n) {
    return Ko._create("startAfter", n, !1);
}
function Tv(n, e, t, r) {
    if (((t[0] = $(t[0])), t[0] instanceof $o))
        return (function (s, o, a, c, u) {
            if (!c) throw new _(f.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ${a}().`);
            const l = [];
            for (const h of Lt(s))
                if (h.field.isKeyField()) l.push(Lr(o, c.key));
                else {
                    const d = c.data.field(h.field);
                    if (di(d))
                        throw new _(
                            f.INVALID_ARGUMENT,
                            'Invalid query. You are trying to start or end a query using a document for which the field "' +
                                h.field +
                                '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)',
                        );
                    if (d === null) {
                        const p = h.field.canonicalString();
                        throw new _(
                            f.INVALID_ARGUMENT,
                            `Invalid query. You are trying to start or end a query using a document for which the field '${p}' (used as the orderBy) does not exist.`,
                        );
                    }
                    l.push(d);
                }
            return new zt(l, u);
        })(n._query, n.firestore._databaseId, e, t[0]._document, r);
    {
        const i = tr(n.firestore);
        return (function (o, a, c, u, l, h) {
            const d = o.explicitOrderBy;
            if (l.length > d.length)
                throw new _(
                    f.INVALID_ARGUMENT,
                    `Too many arguments provided to ${u}(). The number of arguments must be less than or equal to the number of orderBy() clauses`,
                );
            const p = [];
            for (let I = 0; I < l.length; I++) {
                const T = l[I];
                if (d[I].field.isKeyField()) {
                    if (typeof T != "string")
                        throw new _(
                            f.INVALID_ARGUMENT,
                            `Invalid query. Expected a string for document ID in ${u}(), but got a ${typeof T}`,
                        );
                    if (!yo(o) && T.indexOf("/") !== -1)
                        throw new _(
                            f.INVALID_ARGUMENT,
                            `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${u}() must be a plain document ID, but '${T}' contains a slash.`,
                        );
                    const v = o.path.child(O.fromString(T));
                    if (!E.isDocumentKey(v))
                        throw new _(
                            f.INVALID_ARGUMENT,
                            `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${u}() must result in a valid document path, but '${v}' is not because it contains an odd number of segments.`,
                        );
                    const V = new E(v);
                    p.push(Lr(a, V));
                } else {
                    const v = Eh(c, u, T);
                    p.push(v);
                }
            }
            return new zt(p, h);
        })(n._query, n.firestore._databaseId, i, e, t, r);
    }
}
function Ic(n, e, t) {
    if (typeof (t = $(t)) == "string") {
        if (t === "")
            throw new _(
                f.INVALID_ARGUMENT,
                "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.",
            );
        if (!yo(e) && t.indexOf("/") !== -1)
            throw new _(
                f.INVALID_ARGUMENT,
                `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`,
            );
        const r = e.path.child(O.fromString(t));
        if (!E.isDocumentKey(r))
            throw new _(
                f.INVALID_ARGUMENT,
                `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`,
            );
        return Lr(n, new E(r));
    }
    if (t instanceof oe) return Lr(n, t._key);
    throw new _(
        f.INVALID_ARGUMENT,
        `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ti(t)}.`,
    );
}
function Tc(n, e) {
    if (!Array.isArray(n) || n.length === 0)
        throw new _(f.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
}
function Rh(n, e) {
    const t = (function (i, s) {
        for (const o of i) for (const a of o.getFlattenedFilters()) if (s.indexOf(a.op) >= 0) return a.op;
        return null;
    })(
        n.filters,
        (function (i) {
            switch (i) {
                case "!=":
                    return ["!=", "not-in"];
                case "array-contains-any":
                case "in":
                    return ["not-in"];
                case "not-in":
                    return ["array-contains-any", "in", "not-in", "!="];
                default:
                    return [];
            }
        })(e.op),
    );
    if (t !== null)
        throw t === e.op
            ? new _(f.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`)
            : new _(
                  f.INVALID_ARGUMENT,
                  `Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`,
              );
}
class wv {
    convertValue(e, t = "none") {
        switch (It(e)) {
            case 0:
                return null;
            case 1:
                return e.booleanValue;
            case 2:
                return q(e.integerValue || e.doubleValue);
            case 3:
                return this.convertTimestamp(e.timestampValue);
            case 4:
                return this.convertServerTimestamp(e, t);
            case 5:
                return e.stringValue;
            case 6:
                return this.convertBytes(Et(e.bytesValue));
            case 7:
                return this.convertReference(e.referenceValue);
            case 8:
                return this.convertGeoPoint(e.geoPointValue);
            case 9:
                return this.convertArray(e.arrayValue, t);
            case 10:
                return this.convertObject(e.mapValue, t);
            default:
                throw A();
        }
    }
    convertObject(e, t) {
        return this.convertObjectMap(e.fields, t);
    }
    convertObjectMap(e, t = "none") {
        const r = {};
        return (
            wt(e, (i, s) => {
                r[i] = this.convertValue(s, t);
            }),
            r
        );
    }
    convertGeoPoint(e) {
        return new Uo(q(e.latitude), q(e.longitude));
    }
    convertArray(e, t) {
        return (e.values || []).map((r) => this.convertValue(r, t));
    }
    convertServerTimestamp(e, t) {
        switch (t) {
            case "previous":
                const r = po(e);
                return r == null ? null : this.convertValue(r, t);
            case "estimate":
                return this.convertTimestamp(kn(e));
            default:
                return null;
        }
    }
    convertTimestamp(e) {
        const t = Ze(e);
        return new z(t.seconds, t.nanos);
    }
    convertDocumentKey(e, t) {
        const r = O.fromString(e);
        M(Kl(r));
        const i = new Dn(r.get(1), r.get(3)),
            s = new E(r.popFirst(5));
        return (
            i.isEqual(t) ||
                xe(
                    `Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`,
                ),
            s
        );
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ph(n, e, t) {
    let r;
    return (r = n ? (t && (t.merge || t.mergeFields) ? n.toFirestore(e, t) : n.toFirestore(e)) : e), r;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class dn {
    constructor(e, t) {
        (this.hasPendingWrites = e), (this.fromCache = t);
    }
    isEqual(e) {
        return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache;
    }
}
class Sh extends $o {
    constructor(e, t, r, i, s, o) {
        super(e, t, r, i, o), (this._firestore = e), (this._firestoreImpl = e), (this.metadata = s);
    }
    exists() {
        return super.exists();
    }
    data(e = {}) {
        if (this._document) {
            if (this._converter) {
                const t = new Er(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, null);
                return this._converter.fromFirestore(t, e);
            }
            return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps);
        }
    }
    get(e, t = {}) {
        if (this._document) {
            const r = this._document.data.field(Si("DocumentSnapshot.get", e));
            if (r !== null) return this._userDataWriter.convertValue(r, t.serverTimestamps);
        }
    }
}
class Er extends Sh {
    data(e = {}) {
        return super.data(e);
    }
}
class Ch {
    constructor(e, t, r, i) {
        (this._firestore = e),
            (this._userDataWriter = t),
            (this._snapshot = i),
            (this.metadata = new dn(i.hasPendingWrites, i.fromCache)),
            (this.query = r);
    }
    get docs() {
        const e = [];
        return this.forEach((t) => e.push(t)), e;
    }
    get size() {
        return this._snapshot.docs.size;
    }
    get empty() {
        return this.size === 0;
    }
    forEach(e, t) {
        this._snapshot.docs.forEach((r) => {
            e.call(
                t,
                new Er(
                    this._firestore,
                    this._userDataWriter,
                    r.key,
                    r,
                    new dn(this._snapshot.mutatedKeys.has(r.key), this._snapshot.fromCache),
                    this.query.converter,
                ),
            );
        });
    }
    docChanges(e = {}) {
        const t = !!e.includeMetadataChanges;
        if (t && this._snapshot.excludesMetadataChanges)
            throw new _(
                f.INVALID_ARGUMENT,
                "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().",
            );
        return (
            (this._cachedChanges && this._cachedChangesIncludeMetadataChanges === t) ||
                ((this._cachedChanges = (function (i, s) {
                    if (i._snapshot.oldDocs.isEmpty()) {
                        let o = 0;
                        return i._snapshot.docChanges.map((a) => {
                            const c = new Er(
                                i._firestore,
                                i._userDataWriter,
                                a.doc.key,
                                a.doc,
                                new dn(i._snapshot.mutatedKeys.has(a.doc.key), i._snapshot.fromCache),
                                i.query.converter,
                            );
                            return a.doc, { type: "added", doc: c, oldIndex: -1, newIndex: o++ };
                        });
                    }
                    {
                        let o = i._snapshot.oldDocs;
                        return i._snapshot.docChanges
                            .filter((a) => s || a.type !== 3)
                            .map((a) => {
                                const c = new Er(
                                    i._firestore,
                                    i._userDataWriter,
                                    a.doc.key,
                                    a.doc,
                                    new dn(i._snapshot.mutatedKeys.has(a.doc.key), i._snapshot.fromCache),
                                    i.query.converter,
                                );
                                let u = -1,
                                    l = -1;
                                return (
                                    a.type !== 0 && ((u = o.indexOf(a.doc.key)), (o = o.delete(a.doc.key))),
                                    a.type !== 1 && ((o = o.add(a.doc)), (l = o.indexOf(a.doc.key))),
                                    { type: Av(a.type), doc: c, oldIndex: u, newIndex: l }
                                );
                            });
                    }
                })(this, t)),
                (this._cachedChangesIncludeMetadataChanges = t)),
            this._cachedChanges
        );
    }
}
function Av(n) {
    switch (n) {
        case 0:
            return "added";
        case 2:
        case 3:
            return "modified";
        case 1:
            return "removed";
        default:
            return A();
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Uv(n) {
    n = le(n, oe);
    const e = le(n.firestore, Ue);
    return cv(Ai(e), n._key).then((t) => bh(e, n, t));
}
class Qo extends wv {
    constructor(e) {
        super(), (this.firestore = e);
    }
    convertBytes(e) {
        return new Wt(e);
    }
    convertReference(e) {
        const t = this.convertDocumentKey(e, this.firestore._databaseId);
        return new oe(this.firestore, null, t);
    }
}
function Bv(n) {
    n = le(n, qe);
    const e = le(n.firestore, Ue),
        t = Ai(e),
        r = new Qo(e);
    return Ah(n._query), uv(t, n._query).then((i) => new Ch(e, r, n, i));
}
function qv(n, e, t) {
    n = le(n, oe);
    const r = le(n.firestore, Ue),
        i = Ph(n.converter, e, t);
    return bi(r, [vh(tr(r), "setDoc", n._key, i, n.converter !== null, t).toMutation(n._key, me.none())]);
}
function jv(n, e, t, ...r) {
    n = le(n, oe);
    const i = le(n.firestore, Ue),
        s = tr(i);
    let o;
    return (
        (o =
            typeof (e = $(e)) == "string" || e instanceof Ri
                ? vv(s, "updateDoc", n._key, e, t, r)
                : yv(s, "updateDoc", n._key, e)),
        bi(i, [o.toMutation(n._key, me.exists(!0))])
    );
}
function $v(n) {
    return bi(le(n.firestore, Ue), [new vo(n._key, me.none())]);
}
function zv(n, e) {
    const t = le(n.firestore, Ue),
        r = dv(n),
        i = Ph(n.converter, e);
    return bi(t, [
        vh(tr(n.firestore), "addDoc", r._key, i, n.converter !== null, {}).toMutation(r._key, me.exists(!1)),
    ]).then(() => r);
}
function Hv(n, ...e) {
    var t, r, i;
    n = $(n);
    let s = { includeMetadataChanges: !1, source: "default" },
        o = 0;
    typeof e[o] != "object" || Ec(e[o]) || ((s = e[o]), o++);
    const a = { includeMetadataChanges: s.includeMetadataChanges, source: s.source };
    if (Ec(e[o])) {
        const h = e[o];
        (e[o] = (t = h.next) === null || t === void 0 ? void 0 : t.bind(h)),
            (e[o + 1] = (r = h.error) === null || r === void 0 ? void 0 : r.bind(h)),
            (e[o + 2] = (i = h.complete) === null || i === void 0 ? void 0 : i.bind(h));
    }
    let c, u, l;
    if (n instanceof oe)
        (u = le(n.firestore, Ue)),
            (l = fi(n._key.path)),
            (c = {
                next: (h) => {
                    e[o] && e[o](bh(u, n, h));
                },
                error: e[o + 1],
                complete: e[o + 2],
            });
    else {
        const h = le(n, qe);
        (u = le(h.firestore, Ue)), (l = h._query);
        const d = new Qo(u);
        (c = {
            next: (p) => {
                e[o] && e[o](new Ch(u, d, h, p));
            },
            error: e[o + 1],
            complete: e[o + 2],
        }),
            Ah(n._query);
    }
    return (function (d, p, I, T) {
        const v = new xo(T),
            V = new Mo(p, v, I);
        return (
            d.asyncQueue.enqueueAndForget(async () => Vo(await qr(d), V)),
            () => {
                v.$a(), d.asyncQueue.enqueueAndForget(async () => No(await qr(d), V));
            }
        );
    })(Ai(u), l, a, c);
}
function bi(n, e) {
    return (function (r, i) {
        const s = new Oe();
        return r.asyncQueue.enqueueAndForget(async () => Qy(await av(r), i, s)), s.promise;
    })(Ai(n), e);
}
function bh(n, e, t) {
    const r = t.docs.get(e._key),
        i = new Qo(n);
    return new Sh(n, i, e._key, r, new dn(t.hasPendingWrites, t.fromCache), e.converter);
}
(function (e, t = !0) {
    (function (i) {
        Xt = i;
    })(Kt),
        Ft(
            new mt(
                "firestore",
                (r, { instanceIdentifier: i, options: s }) => {
                    const o = r.getProvider("app").getImmediate(),
                        a = new Ue(
                            new kg(r.getProvider("auth-internal")),
                            new Og(r.getProvider("app-check-internal")),
                            (function (u, l) {
                                if (!Object.prototype.hasOwnProperty.apply(u.options, ["projectId"]))
                                    throw new _(
                                        f.INVALID_ARGUMENT,
                                        '"projectId" not provided in firebase.initializeApp.',
                                    );
                                return new Dn(u.options.projectId, l);
                            })(o, i),
                            o,
                        );
                    return (s = Object.assign({ useFetchStreams: t }, s)), a._setSettings(s), a;
                },
                "PUBLIC",
            ).setMultipleInstances(!0),
        ),
        Je(Ba, "4.6.1", e),
        Je(Ba, "4.6.1", "esm2017");
})();
const Rv = {
    apiKey: "AIzaSyBOicMl0t0Z3dDKnRM8gAfr2phKqwaAiDs",
    authDomain: "linkedout-fe8e8.firebaseapp.com",
    projectId: "linkedout-fe8e8",
    storageBucket: "linkedout-fe8e8.appspot.com",
    messagingSenderId: "407055288715",
    appId: "1:407055288715:web:661f156f5dbcfefd7c478e",
    measurementId: "G-1XEYK2GNKZ",
};
Dc(Rv);
const Gv = gm(),
    Wv = pv();
export {
    xv as A,
    Fv as B,
    mt as C,
    $v as D,
    Be as F,
    ze as G,
    Kt as S,
    Ft as _,
    Gv as a,
    su as b,
    Sv as c,
    dv as d,
    Uv as e,
    qv as f,
    pv as g,
    Pv as h,
    Ov as i,
    Bv as j,
    Wv as k,
    kv as l,
    gm as m,
    Hv as n,
    bv as o,
    $ as p,
    Mv as q,
    Je as r,
    Cv as s,
    Vs as t,
    xh as u,
    Vc as v,
    Lv as w,
    Uh as x,
    zv as y,
    jv as z,
};
