
const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        release: {
            type: String
        },
        mix:{
            type: String,
            unique: true
        },
        amountoftokens:{
            type: String
        },
        percentageoftokens:{
            type: String
        },
        description:{
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('TokenRelease', blogSchema);
