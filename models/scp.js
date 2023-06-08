// Schema definition file for our colour collection data
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create a schema description of our color document structure
var scpSchema = new Schema({
"SCPName": String,
"SCPClass": String,
"Image": String,
"SCPp1": String,
"SCPp2": String

},{collection: "SCPCollection"}, {versionKey: false});
module.exports = SCP = mongoose.model('SCP', scpSchema);
