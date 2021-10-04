const { db } = require('../db');
const compliments = db.ref('compliments');
const { randomItemArr } = require('../helpers');

const addCompliment = (compliment) => {
    return compliments.push(compliment);
};

const getCompliment = () => {
    return compliments.once('value').then((data) => randomItemArr(Object.values(data.val())));
};

module.exports = {
    addCompliment,
    getCompliment,
};
