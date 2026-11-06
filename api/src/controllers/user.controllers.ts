import { Request, Response } from "express";
import db from "../models";

const Users = db.users;

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await Users.findAll({
      attributes: { exclude: ["password"] },
      order: [["id", "ASC"]]
    });
    res.status(200).json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des utilisateurs: " + message
    });
  }
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login, password, firstName, lastName, email } = req.body;

    const newUser = await Users.create({
      login,
      password,
      firstName,
      lastName,
      email
    });

    res.status(201).json({
      success: true,
      message: "Inscription réussie avec succès !",
      userId: newUser.id,
      login: newUser.login,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'inscription de l'utilisateur: " + message
    });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const paramId = req.params.id;
  const id = Array.isArray(paramId) ? Number(paramId[0]) : Number(paramId);
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: `Aucun utilisateur trouvé avec l'id=${id}.`
      });
      return;
    }

    await user.destroy();
    res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès", id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      success: false,
      message: `Erreur lors de la suppression de l'utilisateur id=${id}: ` + message
    });
  }
};

export default { signUp, getAll, remove };

