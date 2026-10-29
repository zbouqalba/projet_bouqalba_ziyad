import { Application, Router } from "express";
import pollutionController from "../controllers/pollution.controllers";

export default (app: Application): void => {
  const router = Router();

  router.get("/", pollutionController.getAll);
  router.get("/all", pollutionController.getAll);

  router.get("/:id", pollutionController.getById);

  router.post("/add", pollutionController.create);

  router.patch("/update/:id", pollutionController.update);

  router.delete("/delete/:id", pollutionController.remove);

  app.use("/api/pollutions", router);
  app.use("/api/pollution", router);
};
