import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongo = await mongoose.connect("mongodb+srv://radhakishanjangid404:Rk12345678@wood-panel.ikfo6hv.mongodb.net/upload-csv", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("== Connected To MongoDB ===", mongo.connection.host);
    return mongo;
  } catch (error) {
    console.log("🚀 ~ file: db.js ~ line 12 ~ connectDB ~ error", error);
  }
};

export default connectDB;