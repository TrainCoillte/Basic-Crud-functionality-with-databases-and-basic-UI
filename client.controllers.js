const Client = require('../models/client.model.js');

// // Default message for /
// exports.root1 = (req, res) => {
//     Client.find()
//     .then(client => {
//     res.render('home_views',{
//     results: client
//     });
//         }).catch(err => {
//         res.status(500).send({
//         message: err.message || "An error occurred while retrieving all Clients."
//         });
//     });
// };
//Create and Save a new Client
exports.create = (req, res) => {
 // Validate the request
 if(!req.body.fname || !req.body.sname||req.body.dob||req.body.pgname||req.body.permission||req.body.recordcreated
    ||req.body.reffered||req.body.email||req.body.mobile||req.body.status||req.body.addressl1
    ||req.body.town||req.body.county) {
    return res.status(400).send({
        message: "Client content cannot be empty!"
    });
}
    // Create a new Client (using schema)
    console.log("creating client");
    const client = new Client({
        title:req.body.title,
        fname: req.body.fname,
       sname:req.body.sname,
       DOB:req.body.dob,
       pgname:req.body.pgname,
       permission:req.body.permission,
       status:req.body.status,
       recordcreated:req.body.recordcreated,
       reffered:req.body.reffered,
       mobile:req.body.mobile,
       home:req.body.home,
       email:req.body.email,
   // HomeandShippingAddress:{
        addressl1: req.body.addressl1,
        addressl2: req.body.addressl2,
        town:req.body.town,
        county:req.body.county,
        eircode:req.body.eircode
    //}
    });

    // Save Client in the database
    client.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Client."
        });
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Client.find()
    .then(client => {
        res.send(client);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Clients."
        });
    });
};

//find by id
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Quotation not found with id " + req.params.clientId
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Quotation not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Client with id " + req.params.clientId
        });
    });
};
// Update a Client identified by the noteId in the request
exports.update = (req, res) => {
  

    // Find the Customer and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId, {
        title:req.body.title,
        fname: req.body.fname,
       sname:req.body.sname,
       DOB:req.body.dob,
       pgname:req.body.pgname,
       permission:req.body.permission,
       status:req.body.status,
       recordcreated:req.body.recordcreated,
       reffered:req.body.reffered,
       mobile:req.body.mobile,
       home:req.body.home,
       email:req.body.email,
   // HomeandShippingAddress:{
        addressl1: req.body.addressl1,
        addressl2: req.body.addressl2,
        town:req.body.town,
        county:req.body.county,
        eircode:req.body.eircode
   // }
},   // $set - modify only the supplied fields
       { new: true })        // "new: true" return updated object
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error updating Client with id " + req.params.clientId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.send({message: "Client deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Client with id " + req.params.clientId
        });
    });
};

/* == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.root = (req, res) => {
    Client.find()
    .then(client => {
    res.render('client_views',{
    results: client
    });
        }).catch(err => {
        res.status(500).send({
        message: err.message || "An error occurred while retrieving all Clients."
        });
    });
};
// search for Client, matching string on fname field
    exports.searchfname = (req, res) => {
    var search = req.params.s;
    console.log("Searching fname: "+search)
    Client.find({ fname: new RegExp(search,"ig")})
    .then(client => {
    res.render('client_views',{
    results: client
        });
    }).catch(err => {
res.status(500).send({
        message: err.message || "An error occurred while retrieving all Clients."
        });
    });
};
// search for Clients, matching string on sname field
exports.searchsname = (req, res) => {
    var search = req.params.s;
    console.log("Searching sname: "+search)
    Client.find({ sname: new RegExp(search,"ig")})
    .then(client => {
        res.render('client_views',{
        results: client
         });
            }).catch(err => {
            res.status(500).send({
            message: err.message || "An error occurred while retrieving all Clients."
            });
    });
};
 // search for Clients, matching string on email field
 exports.searchEmail = (req, res) => {
    var search = req.params.s;
    console.log("Searching email: "+search)
    Client.find({ email: new RegExp(search,"ig")})
    .then(client => {
        res.render('client_views',{
        results: client
         });
            }).catch(err => {
            res.status(500).send({
            message: err.message || "An error occurred while retrieving all Clients."
            });
    });
};
/* == USER INTERFACE ADDITIONS == */