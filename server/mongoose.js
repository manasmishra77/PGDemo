var mongoose = require ('mongoose');


mongoose.Promise = global.Promise;

//change the database with yours
const uri = "mongodb+srv://manas:manasdb@pgdemo-0r2jn.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});





module.exports = {mongoose};
