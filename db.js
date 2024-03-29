const mongoose = require('mongoose');
const url = "mongodb+srv://newsunflowers98:K9exZQAFAZUK327D@initialclutstermsc.m74hss5.mongodb.net/?retryWrites=true&w=majority";

exports.connect = () => {
    mongoose.connect(url).then(() => {
        console.log('Connected to DB');
    }).catch(() => {
        console.log('Connection failed');
    })
}