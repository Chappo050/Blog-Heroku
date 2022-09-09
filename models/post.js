const mongoose = require('mongoose');
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user_details: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    post_time: { type: Date, default: Date.now },
    isPublic: {type: Boolean, required: true},
  }
);


PostSchema
.virtual('post_date_formatted')
.get(function() {
  return  DateTime.fromJSDate(this.post_time).toLocaleString(DateTime.DATE_MED);
});




//Export model
module.exports = mongoose.model('Post', PostSchema);
