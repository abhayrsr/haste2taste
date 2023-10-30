const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://abhayraj:mymongodb@cluster0.x6yw856.mongodb.net/haste2tastedb?retryWrites=true&w=majority";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log("connected");
    const fetchData = await mongoose.connection.db.collection("food_items");
    fetchData
      .find({})
      .toArray()
      .then((data) => {
        const foodCategory = mongoose.connection.db.collection("food_category");
        foodCategory.find({}).toArray().then((catData) => {
          global.food_items = data;
          global.food_category = catData;
        }).catch((error) => {
          console.log("Error while fetching data:", error);
        })
      })
      .catch((error) => {
        console.log("Error while fetching data:", error);
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
