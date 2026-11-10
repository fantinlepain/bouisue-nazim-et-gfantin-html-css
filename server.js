const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'humain_fc'
});

db.connect((err) => {
    if (err) {
        console.log("Erreur de connexion à la base de données :", err);
    } else {
        console.log("Connexion à la base de données réussie.");
    }
});

app.post('/acheter-carte', (req, res) => {

    const id_joueur = req.body.id_joueur;
    const id_carte = req.body.id_carte;
    const prix = req.body.prix;

    const requete = 'SELECT points FROM joueur WHERE id_joueur = ?';

    db.query(requete, [id_joueur], (err, resultats) => {

        if (err) {
            return res.status(500).json({
                succes: false,
                message: "Erreur de base de données."
            });
        }

        if (resultats.length === 0) {
            return res.json({
                succes: false,
                message: "Joueur introuvable."
            });
        }

        const points = resultats[0].points;

        if (points >= prix) {
            res.json({
                succes: false,
                message: "Achat simulé ! Aucun point retiré et aucune carte enregistrée."
            });
        } else {
            res.json({
                succes: false,
                message: "Pas assez de points."
            });
        }
    });
});

app.listen(3000, () => {
    console.log("Serveur lancé sur le port 3000.");
});