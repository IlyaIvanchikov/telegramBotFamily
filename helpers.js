const randomItemArr = (data) => {
    return data[Math.floor(Math.random() * data.length)];
};

module.exports = {
    randomItemArr,
};
