import mongoose from "mongoose";
const peripheralSchema = new mongoose.Schema({
  uid: {
    type: String
  },
  vendor: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["offline", "online"]
  },
  gateway: { type: mongoose.Schema.Types.ObjectId, ref: "Gateway" }
});

const Peripheral = mongoose.model("Peripheral", peripheralSchema);
export default Peripheral;
