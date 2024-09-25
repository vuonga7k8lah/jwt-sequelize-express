const fs = require("fs");
function base64EncodeImg(imagePath) {
    const imageContent = fs.readFileSync(imagePath, { encoding: "base64" });
    return imageContent;
}

module.exports = base64EncodeImg;
