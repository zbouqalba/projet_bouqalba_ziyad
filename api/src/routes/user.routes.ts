import { Application, Router } from "express";
import userController from "../controllers/user.controllers";

export default (app: Application): void => {
  const router = Router();

  router.post("/", userController.signUp);
  router.get("/", userController.getAll);
  router.delete("/:id", userController.remove);

  app.use("/api/users", router);
};
