const mongoose = require('mongoose');

const eyeColorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    }

});

sampleEyeColors = [
    {'name': "Blue"},
    {'name': "Brown"},
    {'name': "Gray"},
    {'name': "Green"},
    {'name': "Other"}

];

let EyeColor = mongoose.model('EyeColor', eyeColorSchema);


EyeColor.find({}, function (err, data) {
    if (data.length == 0 || data == null) {
        EyeColor.collection.insertMany(sampleEyeColors, function (err, r) {

        })
    }
});

module.exports = mongoose.model('EyeColor', eyeColorSchema);
