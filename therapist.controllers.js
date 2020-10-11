const Therapist = require('../models/therapist.model.js');

// Default message for /
exports.root= (req, res) => {
    console.log("My Therapy App. ")
    return res.status(200).send({
        message: "My Therapy App. "
    });
};
//Create and Save a new Therapist
exports.create = (req, res) => {
// Validate the request
if(!req.body.fname || !req.body.sname||req.body.email||req.body.mobile||req.body.addressl1
    ||req.body.town||req.body.county) {
    return res.status(400).send({
        message: "Therapist content cannot be empty!"
    });
}
    // Create a new Therapist (using schema)
    console.log("creating Therapist");
    const therapist = new Therapist({
        title:req.body.title,
        fname: req.body.fname,
       sname:req.body.sname,
       mobile:req.body.mobile,
       home:req.body.home,
       email:req.body.email,
    //HomeandShippingAddress:{
        addressl1: req.body.addressl1,
        addressl2: req.body.addressl2,
        town:req.body.town,
        county:req.body.county,
        eircode:req.body.eircode
  //  }
    });

    // Save Therapist in the database
    therapist.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Therapist."
        });
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Therapist.find()
    .then(therapist => {
        res.send(therapist);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Therapists."
        });
    });
};

//find by id
exports.findOne = (req, res) => {
    Therapist.findById(req.params.therapistId)
    .then(therapist => {
        if(!therapist) {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.therapistId
            });            
        }
        res.send(therapist);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.therapistId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Therapist with id " + req.params.therapistId
        });
    });
};
// Update a Therapist identified by the noteId in the request
exports.update = (req, res) => {
  

    // Find the Therapist and update it with the request body
    Therapist.findByIdAndUpdate(req.params.therapistId, {
        title:req.body.title,
       fname: req.body.fname,
       sname:req.body.sname,
       mobile:req.body.mobile,
       home:req.body.home,
       email:req.body.email,
   // HomeandShippingAddress:{
        addressl1: req.body.addressl1,
        addressl2: req.body.addressl2,
        town:req.body.town,
        county:req.body.county,
        eircode:req.body.eircode
//    }
},   // $set - modify only the supplied fields
       { new: true })        // "new: true" return updated object
    .then(therapist => {
        if(!therapist) {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.therapistId
            });
        }
        res.send(therapist);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.therapistId
            });                
        }
        return res.status(500).send({
            message: "Error updating Therapist with id " + req.params.therapistId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Therapist.findByIdAndRemove(req.params.therapistId)
    .then(therapist => {
        if(!therapist) {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.therapistId
            });
        }
        res.send({message: "CTherapist deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.therapistId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Therapist with id " + req.params.therapistId
        });
    });
};
/* == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.root = (req, res) => {
        Therapist.find()
        .then(therapist => {
        res.render('therapist_views',{
        results: therapist
        });
            }).catch(err => {
            res.status(500).send({
            message: err.message || "An error occurred while retrieving all Therapists."
            });
        });
    };
    // search for therapist, matching string on fname field
        exports.searchfname = (req, res) => {
        var search = req.params.s;
        console.log("Searching fname: "+search)
        Therapist.find({ fname: new RegExp(search,"ig")})
        .then(therapist => {
        res.render('therapist_views',{
        results: therapist
            });
        }).catch(err => {
    res.status(500).send({
            message: err.message || "An error occurred while retrieving all Therapists."
            });
        });
    };
    // search for Therapists, matching string on sname field
    exports.searchsname = (req, res) => {
        var search = req.params.s;
        console.log("Searching sname: "+search)
        Therapist.find({ sname: new RegExp(search,"ig")})
        .then(therapist => {
            res.render('therapist_views',{
            results: therapist
             });
                }).catch(err => {
                res.status(500).send({
                message: err.message || "An error occurred while retrieving all Therapists."
                });
        });
    };
     // search for Therapists, matching string on email field
     exports.searchEmail = (req, res) => {
        var search = req.params.s;
        console.log("Searching email: "+search)
        Therapist.find({ email: new RegExp(search,"ig")})
        .then(therapist => {
            res.render('therapist_views',{
            results: therapist
             });
                }).catch(err => {
                res.status(500).send({
                message: err.message || "An error occurred while retrieving all Therapists."
                });
        });
    };
    /* == USER INTERFACE ADDITIONS == */