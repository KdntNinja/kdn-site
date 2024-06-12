import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.kdntninja.linkloop",
    appName: "linkloop",
    webDir: "dist",
    plugins: {
        FirebaseAuthentication: {
            skipNativeAuth: false,
            providers: ["google.com"]
        }
    }
};

export default config;