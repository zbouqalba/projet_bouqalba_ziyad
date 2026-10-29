import { Application, Router } from "express";
import userController from "../controllers/user.controllers";

export default (app: Application): void => {
  const router = Router();

  router.post("/signup", userController.signUp);

  app.use("/api", router);
};
