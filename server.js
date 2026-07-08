const express = require('express');// import de express
const mdns = require('multicast-dns')();// import de mdn/bonjour et creation d'une instance
const os = require('os');// import de la biblihoteques os 

const app = express(); // creation de l'app express au nom de 'app'
const port = 3000; // choix du port dans une variable 'port'

function getLocalIP() {
    const interfaces = os.networkInterfaces();

    for (const name in interfaces) {
        for (const net of interfaces[name]) {

            if (net.family === "IPv4" && !net.internal) {
                return net.address;
            }

        }
    }

    return "0.0.0.0";
}

app.get("/", (req, res) => { // ecoute sur la route de base 'localhost:3000/' et renvoyant hello
    res.send('hello')
});

app.get("/html", (req, res) => {// ecoute sur la route de base 'localhost:3000/html' et 
 
    res.sendFile(__dirname + "/index.html")// renvoyant le fichier html index.html qui s'executera dans le navigateur
});

const ip = getLocalIP(); // placement de l'ip dans une variable

mdns.on("query", (query) => {// mise en place du protocole mdns/bonjour pour pouvoir remplacer 'localhost:3000' par 'server.local'
    query.questions.forEach((question) => {
        if (question.name === "server.local" && question.type === "A") {
            mdns.respond({
                answers: [{
                    name: "server.local",
                    type: "A",
                    ttl: 300,
                    data: ip
                }]
            });
        }
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});// mise en ecoute du serveur par le port 3000 de la variable 'port' et 
// mise de fonction fleché sur une commande permettant de dire l'URL du serveur
