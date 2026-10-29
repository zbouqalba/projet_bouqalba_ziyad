import { Request, Response } from "express";
import db from "../models";

const Users = db.users;

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

export default { signUp };

