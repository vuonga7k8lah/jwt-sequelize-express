const commentModel = require("../models/commentModel");

exports.create = async (post_id, content, user_id, parent_comment_id) => {
    let data = await commentModel.create({
        id: null,
        post_id,
        content,
        user_id,
        parent_comment_id,
    });
    return data;
};

exports.delete = async (id) => {
    return await commentModel.destroy({
        where: {
            id,
        },
    });
};
