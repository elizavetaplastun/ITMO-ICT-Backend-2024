import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { userRoutes } from "./src/routes/userRoutes";

const app = express();
dotenv.config();
console.log(process.env.JWT_SECRET_KEY || "my$3crEtK3y12345!" as string);
app.use(bodyParser.json());
app.use(userRoutes);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
