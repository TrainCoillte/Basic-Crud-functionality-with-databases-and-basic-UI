const Session = require('../models/sessions.model.js');

// // Default message for /
// exports.root= (req, res) => {
//     console.log("My Therapy App. ")
//     return res.status(200).send({
//         message: "My Therapy App. search /c for client, /t for therapist and /s for sessions "
//     });
// };
//Create and Save a new Session
exports.create = (req, res) => {
// Validate the request
if(!req.body.date||req.body.client||req.body.time
    ||req.body.stype||req.body.sduration||req.body.snumber||req.body.fee||req.body.therapist
    ||req.body.issue||req.body.notes) {
    return res.status(400).send({
        message: "Session content cannot be empty!"
    });
}
    // Create a new Client (using schema)
    console.log("creating session");
    const session = new Session({
        date:req.body.date,
        time:req.body.time,
        client:req.body.client,
        therapist:req.body.therapist,
        fee:req.body.fee,
        snumber:req.body.snumber,
        sduration:req.body.sduration,
        stype:req.body.stype,
        issue:req.body.issue,
        notes:req.body.notes
    //}
    });

    // Save Client in the database
    session.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Session."
        });
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Session.find()
    .then(session => {
        res.send(session);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Sessions."
        });
    });
};

//find by id
exports.findOne = (req, res) => {
    Session.findById(req.params.sessionId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });            
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Session with id " + req.params.sessionId
        });
    });
};
// Update a Quotation identified by the noteId in the request
exports.update = (req, res) => {
  

    // Find the Customer and update it with the request body
    Session.findByIdAndUpdate(req.params.sessionId, {

        date:req.body.date,
        time:req.body.time,
        client:req.body.client,
        therapist:req.body.therapist,
        fee:req.body.fee,
        snumber:req.body.snumber,
        sduration:req.body.sduration,
        stype:req.body.stype,
        issue:req.body.issue,
        notes:req.body.notes
       
   // }
},   // $set - modify only the supplied fields
       { new: true })        // "new: true" return updated object
    .then(session=> {
        if(!session) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.sessionId
            });
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Error updating Session with id " + req.params.sessionId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Session.findByIdAndRemove(req.params.sessionId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        res.send({message: "Session deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Session with id " + req.params.sessionId
        });
    });
};

/* == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.root = (req, res) => {
    Session.find()
    .then(session => {
    res.render('session_views',{
    results: session
    });
        }).catch(err => {
        res.status(500).send({
        message: err.message || "An error occurred while retrieving all Sessions."
        });
    });
};
// search for Session, matching string on fname field
    exports.searchclient = (req, res) => {
    var search = req.params.s;
    console.log("Searching fname: "+search)
    Session.find({ client: new RegExp(search,"ig")})
    .then(session => {
    res.render('session_views',{
    results: session
        });
    }).catch(err => {
res.status(500).send({
        message: err.message || "An error occurred while retrieving all Sessions."
        });
    });
};
// search for Clients, matching string on sname field
exports.searchtherapist = (req, res) => {
    var search = req.params.s;
    console.log("Searching sname: "+search)
    Session.find({ therapist: new RegExp(search,"ig")})
    .then(session => {
        res.render('session_views',{
        results: client
         });
            }).catch(err => {
            res.status(500).send({
            message: err.message || "An error occurred while retrieving all Clients."
            });
    });
};
/* == USER INTERFACE ADDITIONS == */