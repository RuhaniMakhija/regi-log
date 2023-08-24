const mongoose=require("mongoose");

const optionSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    selectedOption: {
      type: String,
      enum: ["Developer", "Organisation", "Company"],
    },
})

const Option=mongoose.model("Option",optionSchema);

module.exports=Option;