import { Application, Router } from "express";
import pollutionController from "../controllers/pollution.controllers";

export default (app: Application): void => {
  const router = Router();

  // Routes GET /api/pollution et /api/pollution/all
  router.get("/", pollutionController.getAll);
  router.get("/all", pollutionController.getAll);

  // Route GET /api/pollution/:id
  router.get("/:id", pollutionController.getById);

  // Route POST /api/pollution/add
  router.post("/add", pollutionController.create);

  // Route PATCH /api/pollution/update/:id
  router.patch("/update/:id", pollutionController.update);

  // Route DELETE /api/pollution/delete/:id
  router.delete("/delete/:id", pollutionController.remove);

  // Exposition sous /api/pollutions et /api/pollution (singulier et pluriel)
  app.use("/api/pollutions", router);
  app.use("/api/pollution", router);
};
