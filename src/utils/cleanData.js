const cleanData = (data) => {
    return data.map((item) => {
        let cleanedItem = {};
        for (let key in item) {
            if (Array.isArray(item[key])) {
                cleanedItem[key] = item[key].filter(
                    (value) => value !== null && value !== ""
                );
            } else {
                cleanedItem[key] = item[key];
            }
        }
        return cleanedItem;
    });
};
module.exports = cleanData;
