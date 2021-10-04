var serviceAccount = require('./key.json');
var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://telegrambotfemale-default-rtdb.firebaseio.com',
});
const db = admin.database();

module.exports = {
    db,
};
