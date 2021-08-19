const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Vanillachoco7:V7QAwQe9UAKsh2F@cluster0.q38bu.mongodb.net/sipDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const valueSchema = {
  value: Number,
};

const Value = mongoose.model("Value", valueSchema);
// to find exact c value from database w.r.t given value

exports.relativeValue = async (c_value) => {
  var result = await Value.find({ value: { $gte: c_value, $lt: c_value + 100 } }).exec();
  console.log(result);
  if (result) {
    const indexArr = result.map((value) => value.value - c_value);
    const min = Math.min.apply(Math, indexArr);
    return result[indexArr.indexOf(min)].value;
  }
};

// (err, doc) => {
//   if (err) {
//     callback(err, null);
//   }
