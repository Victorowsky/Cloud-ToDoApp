const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  userID: String,
  userData: {
    text: String, // String is shorthand for {type: String} 
    important: Boolean,
  },
});
module.exports = mongoose.model("Tasks", taskSchema);
