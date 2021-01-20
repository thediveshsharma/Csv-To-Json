const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

csvtojson()
  .fromFile("movies.csv")
  .then(csvData => {
    console.log(csvData);
  

  //mongodb connection 

  const url = "mongodb://localhost:27017/";
  mongodb.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) throw err;
      client
        .db("Movies_db")
        .collection("movies")
        .insertMany(csvData, (err, res) => {
          if (err) throw err;
          console.log(`Inserted: ${res.insertedCount} rows`);
          client.close();
        });
    }
  );
});