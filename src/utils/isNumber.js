const isNumber = (value) => {
    return typeof value === "number" && !isNaN(value) && Number.isFinite(value);
};
module.exports = isNumber;
