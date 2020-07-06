const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const MutationSchema = Schema({
    adn: { type: String, unique: true },
    isMutation: { type: Boolean, default: false },
});


MutationSchema.plugin(uniqueValidator, { message: '{PATH} DNA must be unique' });

module.exports = mongoose.model('Mutation', MutationSchema);