const questionRoutes = require("./question");
const answerRoutes = require("./answer");

const appRouter = (app, fs) => {
  app.get("/", (req, res) => {
    res.send("Welcome to baydin server");
  });

  questionRoutes(app, fs);
  answerRoutes(app, fs);
};

module.exports = appRouter;
