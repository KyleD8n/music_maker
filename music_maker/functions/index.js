const functions = require("firebase-functions");
const app = require("./app.js");

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
