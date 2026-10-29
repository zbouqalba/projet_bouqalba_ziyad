import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import db from "./models";
import initRoutes from "./routes";

const app: Application = express();

const corsOptions: CorsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    exposedHeaders: "Authorization"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Welcome to Pollution API." });
});

app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "OK" });
});

db.sequelize
    .sync()
    .then(async () => {
        console.log("Synced db.");
        try {
            const count = await db.pollutions.count();
            if (count === 0) {
                await db.pollutions.bulkCreate([
                    {
                        title: "Bouteilles plastiques au parc",
                        typePollution: "Plastique",
                        description: "Nombreuses bouteilles plastiques abandonnées près de l'étang.",
                        date: "2026-10-15",
                        lieu: "Parc de l'Orangerie, Strasbourg",
                        latitude: 48.5839,
                        longitude: 7.7455,
                        photo: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500"
                    },
                    {
                        title: "Dépôt sauvage de gravats",
                        typePollution: "Dépôt sauvage",
                        description: "Sacs de ciment et gravats laissés au bord du chemin.",
                        date: "2026-10-17",
                        lieu: "Forêt de la Robertsau",
                        latitude: 48.618,
                        longitude: 7.785,
                        photo: null
                    }
                ]);
                console.log("Jeu de données initial pour la table pollutions inséré avec succès.");
            }
        } catch (seedErr: unknown) {
            console.warn("Remarque : impossible d'insérer les données d'initialisation :", seedErr);
        }
    })
    .catch((err: Error) => {
        console.log("Failed to sync db: " + err.message);
    });

initRoutes(app);

// set port, listen on 0.0.0.0 for Render and container environments
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}.`);
});

export default app;
