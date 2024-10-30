const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process'); // Importer exec depuis child_process
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

const allowedCommands = ['dir', 'cat', "type", "ls"];

app.post('/execute', (req, res) => {
    const command = req.body.command;

    // Vérification de la commande
    const commandParts = command.split(' ');
    const cmd = commandParts[0];
    const filePath = commandParts[1];

    if (!allowedCommands.includes(cmd)) {
        return res.status(400).json({ error: 'Commande non autorisée.' });
    }



    exec(`${command}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur : ${error.message}`);
            return res.status(500).json({ error: 'Erreur lors de l\'exécution de la commande.' });
        }
        if (stderr) {
            console.error(`Erreur : ${stderr}`);
            return res.status(500).json({ error: 'Erreur lors de l\'exécution de la commande.' });
        }
        console.log(`Résultat de la commande ls :\n${stdout}`);
        res.json({ result: stdout });
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Route pour servir le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

