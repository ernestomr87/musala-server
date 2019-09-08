import mongoose from "mongoose";

import Gateway from "./gateway";
import Peripheral from "./peripheral";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { Gateway, Peripheral };

export { connectDb };
export default models;
