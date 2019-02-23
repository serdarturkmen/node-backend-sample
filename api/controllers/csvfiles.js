const mongoose = require("mongoose");
const csv = require('csv-parser')
const fs = require('fs')

exports.createCSVFileReadAndDelete = (req, res, next) => {
    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // [
            //   { NAME: 'Daffy Duck', AGE: '24' },
            //   { NAME: 'Bugs Bunny', AGE: '22' }
            // ]

            res.status(200).json(results);

            results.forEach(value => {
                console.log("Name ==> " + value.id);
            })
        });
}
