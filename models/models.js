//Models for stored data- store username and twotes, as well as twote content and video ID
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	twotes: [{ type: Schema.ObjectId, ref: 'Twote' }]
});

var TwoteSchema = new Schema({
    username : { type: Schema.ObjectId, ref: 'User' },
	contentVidID: String,
	notDeletable: Boolean
});


module.exports.user = mongoose.model("User", UserSchema);
module.exports.twote = mongoose.model("Twote", TwoteSchema);
