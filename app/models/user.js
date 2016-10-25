var mongoose = require('mongoose');
var mongooseAutoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    standarizedUsername: String,
    username: String,
    password: String,
    email: String,
    isRoot: {
        type: Boolean,
        default: false
    },
    isAdministrator: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
});

mongooseAutoIncrement.initialize(mongoose.connection);

userSchema.plugin(mongooseAutoIncrement.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 1
});

module.exports = mongoose.model('User', userSchema);
