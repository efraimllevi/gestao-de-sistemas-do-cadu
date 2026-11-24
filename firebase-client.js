// Conexão Firebase (SDK modular) para o formulário público.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
const config = window.FSE_FIREBASE_CONFIG;
const ready = config && config.apiKey && !config.apiKey.includes("COLE_AQUI") && config.projectId && !config.projectId.includes("SEU_PROJETO") && config.appId && !config.appId.includes("COLE_AQUI");
let auth, db;
if (ready) {
  const app = initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
}
window.FSE_FIREBASE_READY = Boolean(ready);
window.FSE_ENVIAR_ORCAMENTO = async (quote) => {
  if (!ready) throw new Error("Firebase não configurado. Preencha firebase-config.js e ative o acesso anônimo.");
  const credential = await signInAnonymously(auth);
  const payload = {
    reference: quote.reference,
    client: quote.client,
    email: quote.email,
    phone: quote.phone,
    start: quote.start,
    end: quote.end,
    location: quote.location,
    audience: quote.audience,
    details: quote.details,
    invoice: quote.invoice,
    incomplete: quote.incomplete,
    services: quote.services,
    sub: quote.sub,
    tax: quote.tax,
    total: quote.total,
    ownerUid: credential.user.uid,
    source: "site_publico",
    status: "recebido",
    createdAt: serverTimestamp()
  };
  const saved = await addDoc(collection(db, "orcamentos"), payload);
  return saved.id;
};
