import { Request, Response } from "express";
import db from "../models";

const Pollutions = db.pollutions;

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await Pollutions.findAll({
      order: [["id", "ASC"]]
    });
    res.status(200).json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      message: "Erreur lors de la récupération des données de pollution: " + message
    });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const paramId = req.params.id;
  const id = Array.isArray(paramId) ? Number(paramId[0]) : Number(paramId);
  try {
    const data = await Pollutions.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: `Aucune pollution trouvée avec l'id=${id}.`
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      message: `Erreur lors de la récupération de la pollution id=${id}: ` + message
    });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, date, typePollution, lieu, latitude, longitude, photo } = req.body;
    const newPollution = await Pollutions.create({
      title,
      description,
      date,
      typePollution,
      lieu,
      latitude: Number(latitude),
      longitude: Number(longitude),
      photo: photo || null
    });
    res.status(201).json(newPollution);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      message: "Erreur lors de la création de la pollution: " + message
    });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const paramId = req.params.id;
  const id = Array.isArray(paramId) ? Number(paramId[0]) : Number(paramId);
  try {
    const pollution = await Pollutions.findByPk(id);
    if (!pollution) {
      res.status(404).json({
        message: `Aucune pollution trouvée avec l'id=${id}.`
      });
      return;
    }

    const { title, description, date, typePollution, lieu, latitude, longitude, photo } = req.body;
    await pollution.update({
      title,
      description,
      date,
      typePollution,
      lieu,
      latitude: Number(latitude),
      longitude: Number(longitude),
      photo: photo || null
    });

    res.status(200).json(pollution);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      message: `Erreur lors de la modification de la pollution id=${id}: ` + message
    });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const paramId = req.params.id;
  const id = Array.isArray(paramId) ? Number(paramId[0]) : Number(paramId);
  try {
    const pollution = await Pollutions.findByPk(id);
    if (!pollution) {
      res.status(404).json({
        message: `Aucune pollution trouvée avec l'id=${id}.`
      });
      return;
    }

    await pollution.destroy();
    res.status(200).json(pollution);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      message: `Erreur lors de la suppression de la pollution id=${id}: ` + message
    });
  }
};

export default { getAll, getById, create, update, remove };

