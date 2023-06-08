var express = require("express");
var router = express.Router();
//import the scp model (schema) from the models folder
var scps = require("../../models/scp");
//@route GET /api/scps
//@desc Get all scps from the DB
//@access Public
router.get("/", function (req, res) {
  scps
    .find()
    .sort({ scp: 1 })
    .then(function (scp) {
      res.json(scp);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// GET /api/scp/SCPName
// Get scp by name
// Public access
router.get("/:scpName", function (req, res) {
  const scpName = req.params.scpName;

  scps
    .findOne({ SCPName: scpName })
    .then(function (scp) {
      if (!scp) {
        // Handle case when SCP with the given name is not found
        res.status(404).json({ message: "SCP not found" });
      } else {
        res.json(scp);
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//@route DELETE /api/scpName
//@desc SCP by SCPName (i.e. SCP-914)
//@access Public (should be secured)
router.delete("/:scpName", function (req, res) {
  const scpName = req.params.scpName;

  scps
    .findOneAndDelete({ SCPName: scpName })
    .then(function (deletedSCP) {
      if (!deletedSCP) {
        // Handle case when SCP with the given name is not found
        res.status(404).json({ message: "SCP not found" });
      } else {
        res.json({ message: "SCP deleted successfully" });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// route /api/scps/:scp
// desc add a new scp to the db
//@access public (forever)
router.post("/", function (req, res) {
  var newSCP = new scps({
    SCPName: req.body.SCPName,
    SCPClass: req.body.SCPClass,
    Image: req.body.Image,
    SCPp1: req.body.SCPp1,
    SCPp2: req.body.SCPp2,
  });
  newSCP
    .save()
    .then(function (scp) {
      res.json(scp);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// update indiv SCP

router.put("/:scpName", function (req, res) {
  const scpName = req.params.scpName;
  const updatedFields = req.body;

  // Update the SCP document
  scps
    .updateOne({ SCPName: scpName }, { $set: updatedFields })
    .then(function (result) {
      if (result.nModified === 0) {
        // Handle case when SCP with the given name is not found
        res.status(404).json({ message: "SCP not found" });
      } else {
        res.json({ message: "SCP updated successfully" });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
