//Declarando el Modelo
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    date: { 
        type: Date, 
        default: Date.now 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('File', FileSchema);