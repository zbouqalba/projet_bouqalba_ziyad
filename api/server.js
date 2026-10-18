const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.post('/api/signup', (req, res) => {
    const userData = req.body;

    console.log('Nouvelle requête de création reçue !');
    console.log('Données :', userData);

    setTimeout(() => {
        res.status(201).json({
            success: true,
            message: 'Inscription réussie avec succès !',
            userId: Math.floor(Math.random() * 1000),
            login: userData.login,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
        });
    }, 300);
});

app.post('/api/pollution/add', (req, res) => {
    const pollutionData = req.body;

    console.log('Nouvelle requête de création reçue !');
    console.log('Données :', pollutionData);

    setTimeout(() => {
        res.status(201).json({
            success: true,
            message: 'Inscription réussie avec succès !',
            id: pollutionData.id,
            title: pollutionData.title,
            description: pollutionData.description,
            date: pollutionData.date,
            typePollution: pollutionData.typePollution,
            lieu: pollutionData.lieu,
            latitude: pollutionData.latitude,
            longitude: pollutionData.longitude,
            photo: pollutionData.photo
        });
    }, 300);
});

app.listen(port, () => {
    console.log(`Serveur Mock API démarré et écoute sur http://localhost:${port}`);
    console.log(`En attente des requêtes Angular...`);
});