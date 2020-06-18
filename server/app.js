const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("../schema/schema");
const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Bartle:1Qaz2Wer@cluster0-cebci.gcp.mongodb.net/learnGraphQL?retryWrites=true&w=majority";


// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



const app = express();
const PORT = 3005;

mongoose.connect(
  "mongodb+srv://Bartle:1Qaz2Wer@cluster0-cebci.gcp.mongodb.net/learnGraphQL?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server listening on ${PORT}`);
});
