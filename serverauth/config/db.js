/*module.exports = {
    database: "mongodb://localhost:27017/authapp",
    secret: "password"
  };
*/
const mongoose = require("mongoose");
const MONGOURI = "mongodb+srv://cmp0592:5KW0wtwy@cluster0-uvayi.mongodb.net/garabato?retryWrites=true&w=majority";
mongoose.set('useUnifiedTopology', true);
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;