const mongose = require('mongoose');
const Schema = mongose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose);

const Users = mongose.model('User', userSchema);
module.exports = Users;