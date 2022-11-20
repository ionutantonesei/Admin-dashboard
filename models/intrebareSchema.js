const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    intrebare: {type: String,required:true},
    raspunsuri: {type: Array,required:true}
});

const Post = mongoose.model('intrebare', postSchema);
module.exports = Post;