module.exports.formatMongoData = (data) => {
    if (Array.isArray(data)) {
        const newDataList = [];
        for (value of data) {
            newDataList.push(value.toObject());
        }
        return newDataList;
    }
    return data.toObject();
};
