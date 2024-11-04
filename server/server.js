const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/execute', (req, res) => {
    const { command } = req.body;

    const exec = require('child_process').exec;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr });
        }

        // Normaliser les retours à la ligne et gérer les caractères spéciaux
        const result = stdout
            .replace(/\r\n/g, '\n') // Normaliser les retours à la ligne
            .replace(/�/g, 'é'); // Exemple de remplacement

        res.set('Content-Type', 'application/json; charset=utf-8');
        res.json({ result });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
