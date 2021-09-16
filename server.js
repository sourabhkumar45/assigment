const express = require("express");
const app = express();
const MONGO_DB = require("mongodb");
const MongoClient = MONGO_DB.MongoClient;

const PORT = process.env.PORT || 5000;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

app.get("/getData", async (req, res) => {
  let result;
  console.log(req.query);
  let n = Number(req.query.value);
  console.log(typeof n);
  try {
    const M_CONNECT = MongoClient.connect(
      `mongodb+srv://admin:sourabh@cluster0.clz1g.mongodb.net/data?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
      }
    );
    const db = (await M_CONNECT).db("data");
    let collection = await db.collection("data");
    if (req.query.symbol === ">") {
      result = await collection
        .find({
          letter: `${req.query.letter}`,
          value: { $gt: n },
        })
        .toArray();
    } else {
      result = await collection
        .find({
          letter: `${req.query.letter}`,
          value: { $lt: n },
        })
        .toArray();
    }
  } catch (ex) {
    return res.json({ status: "error", message: "Connection to db failed" });
  }

  res.status(200).send(result);
});
if (process.env.NODE_ENV == "production") {
  app.use(express.static("build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
