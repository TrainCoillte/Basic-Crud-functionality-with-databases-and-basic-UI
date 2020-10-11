const mongoose = require('mongoose');

// create a mongoose schema for a quotation
const ClientSchema = mongoose.Schema({
    title:String,
    fname: String,
    sname: String,
    dob:String,
    pgname:String,
    permission:Boolean,
    status:String,
    recordcreated:Date,
    reffered:String,
    mobile:Number,
    home:Number,
    email:String,
  //  HomeandShippingAddress:{
        addressl1:String,
        addressl2:String,
        town:String,
        county:String,
        eircode:String
    //}
},
{
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Client', ClientSchema);
