const mongoose = require('mongoose');

// create a mongoose schema for a quotation
const SessionSchema = mongoose.Schema({
   date:String,
   time:String,
   client:String,
   therapist:String,
   fee:Number,
   fnumber:Number,
   fduration:String,
   stype:String,
   issue:String,
   notes:String
},
{
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Sessions', SessionSchema);
