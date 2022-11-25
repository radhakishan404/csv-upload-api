import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    customerfirstname: { type: String, trim: true, required: true },
    customerlastname: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", customerSchema);

export default Customer;