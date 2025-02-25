const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb+srv://Karthik816:Karthik3032@cluster0.5rejm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67972407649f7b8c05ae75c4",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();
