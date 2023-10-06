const answerRoutes = (app, fs) => {
  const dataPath = "./data/MinTheinKha.LatHtaukBaydin.json";

  app.get("/answer/:questionNo/:number", (req, res) => {
    console.log(req.params.number);
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = answerRoutes;
