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

    res.status(201).json({
        success: true,
        message: 'Inscription réussie avec succès !',
        userId: Math.floor(Math.random() * 1000),
        login: userData.login,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
    });
});

let pollutions = [
    {
        id: 1,
        title: 'Bouteilles plastiques au parc',
        typePollution: 'Plastique',
        description: 'Nombreuses bouteilles plastiques abandonnées près de l\'étang.',
        date: '2026-10-15',
        lieu: 'Parc de l\'Orangerie, Strasbourg',
        latitude: 48.5839,
        longitude: 7.7455,
        photo: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500'
    },
    {
        id: 2,
        title: 'Dépôt sauvage de gravats',
        typePollution: 'Dépôt sauvage',
        description: 'Sacs de ciment et gravats laissés au bord du chemin.',
        date: '2026-10-17',
        lieu: 'Forêt de la Robertsau',
        latitude: 48.6180,
        longitude: 7.7850,
        photo: null
    }
];

app.post('/api/pollution/add', (req, res) => {
    const pollutionData = req.body;

    console.log('Nouvelle requête de création reçue !');
    console.log('Données :', pollutionData);

    const newPollution = {
        id: pollutionData.id,
        title: pollutionData.title,
        description: pollutionData.description,
        date: pollutionData.date,
        typePollution: pollutionData.typePollution,
        lieu: pollutionData.lieu,
        latitude: pollutionData.latitude,
        longitude: pollutionData.longitude,
        photo: pollutionData.photo || null
    };

    pollutions.push(newPollution);

    res.status(201).json(newPollution);
});

app.get('/api/pollution/all', (req, res) => {
    console.log('Requête pour lister toutes les pollutions reçue !');
    res.status(200).json(pollutions);
});

app.get('/api/pollution/:id', (req, res) => {
    const id = Number(req.params.id);
    const pollution = pollutions.find(p => p.id === id);

    if (!pollution) {
        return res.status(404).json({ success: false, message: 'Pollution non trouvée' });
    }

    res.status(200).json(pollution);
});

app.patch('/api/pollution/update/:id', (req, res) => {
    const id = Number(req.params.id);
    const updatedPollution = req.body;

    console.log('Nouvelle requête de modification reçue !');
    console.log('Données :', updatedPollution);

    const index = pollutions.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Pollution non trouvée' });
    }

    pollutions[index] = updatedPollution;

    res.status(200).json(updatedPollution);
});

app.delete('/api/pollution/delete/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log(`Requête de suppression reçue pour l'id : ${id}`);

    const index = pollutions.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Pollution non trouvée' });
    }

    const [deletedPollution] = pollutions.splice(index, 1);

    res.status(200).json(deletedPollution);
});

app.listen(port, () => {
    console.log(`Serveur Mock API démarré et écoute sur http://localhost:${port}`);
    console.log(`En attente des requêtes Angular...`);
});