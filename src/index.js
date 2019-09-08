import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

import models, { connectDb } from "./models";
import routes from "./routes";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models
  };
  next();
});

app.use("/api/gateways", routes.gateways);
app.use("/api/peripherals", routes.peripherals);

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.Gateway.deleteMany({}),
      models.Peripheral.deleteMany({})
    ]);
  }

  app.listen(process.env.PORT, () =>
    console.log(`Gateways App listening on port ${process.env.PORT}!`)
  );
});
