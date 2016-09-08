var express = require('express');
var app = express();
const pick = require('random-pick');

function requireStringEnvironmentVariable(name) {
    if (process.env[name] == null) {
        throw Error("Environment variable " + name + " not set")
    }

    return process.env[name]
}

function requireIntegerEnvironmentVariable(name) {
    if (process.env[name] == null) {
        throw Error("Environment variable " + name + " not set")
    }

    return parseInt(process.env[name]);
}

var redisClient = require("redis").createClient({
    host: requireStringEnvironmentVariable("REDIS_HOST"),
    port: requireIntegerEnvironmentVariable("REDIS_PORT")
});

var serviceName = pick(["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran (female)", "Nidorina", "Nidoqueen", "Nidoran (male)", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "VoltorbElectrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo"]);

app.get('/', function (req, res) {
    redisClient.get("visited", function(err, visited) {
        if(visited == null) {
            visited = "";
        }

        visited += serviceName + ",";

        redisClient.set("visited", visited);

        res.send({
            serviceName: serviceName,
            visited: visited
        });
    });
});

app.listen(parseInt(requireIntegerEnvironmentVariable("APPLICATION_PORT")), function () {
    console.log('Example app listening on port ' + process.env.APPLICATION_PORT);
});