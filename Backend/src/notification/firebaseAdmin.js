// import admin from "firebase-admin";
// import serviceAccount from "./serviceAccountKey.json" with { type: "json" };
// import { initializeApp, cert } from "firebase-admin/app";
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export  {admin}
import { getMessaging } from "firebase-admin/messaging";
import { initializeApp, cert } from "firebase-admin/app";


let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    const module = await import("./serviceAccountKey.json", {
        with: { type: "json" }
    });

    serviceAccount = module.default;
}

const app = initializeApp({
  credential: cert(serviceAccount),
});
const messaging = getMessaging(app);
export {messaging};