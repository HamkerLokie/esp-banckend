import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { CORS_ORIGIN, PORT } from "./config/index.js";
import postArticleRoute from "./routes/article.routes.js";
import companiesRoute from "./routes/companies.routes.js";
import authRoute from "./routes/auth.routes.js";
import feedbackRoute from "./routes/feedback.routes.js";
import mailRoutes from "./routes/mail.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { errHandler } from "./middlewares/errorHandler.middleware.js";
import connectDB from "./db/index.js";
const app = express();

dotenv.config({
  path: "./env",
});
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);


connectDB()
  .then(() => {
    app.listen(PORT || 8000, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Mongo DB Connection Error", err);
  });


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/articles", postArticleRoute);
app.use("/api/v1/companies", companiesRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/feedback", feedbackRoute);
app.use("/api/v1/mailer", mailRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hii From Server of ESP");
});

app.use(errHandler);

