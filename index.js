import express from "express";

import "dotenv/config";
import { getUserData, getPuuID, getRankData } from "./src/APIs/Riot_API.js";
const riotAPIKey = process.env.riot_api;
const PORT = 3000;
import { engine } from "express-handlebars";
const app = express();

// Wszytko od LoLa \\
let ProfPic;
let lvl;
let Username;
let Tag;
let ranktier;
let rank;
let LP;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.post("/api", async (req, res) => {
  const { user: nazwa, tag } = req.body;
  const puuid = await getPuuID(nazwa, tag, riotAPIKey);
  if (puuid) {
    const userData = await getUserData(puuid.puid, riotAPIKey);
    const getRank = await getRankData(riotAPIKey);

    ProfPic = userData.getProfilePic;
    lvl = userData.lvl;
    Username = puuid.name;
    Tag = puuid.Usertag;
    rank = getRank.ranga;
    ranktier = getRank.rangaTier;
    LP = getRank.lp;

    console.log(rank, ranktier);
    if (rank == null) {
      rank = "Ten gracz nie posiada rangi";
      ranktier = "";
      LP = "";
    } else {
      rank = getRank.ranga;
      ranktier = getRank.rangaTier;
      LP = getRank.lp;
    }
  } else {
    console.log("nie znaleziono uzytkownika");
  }

  res.redirect(req.get("referer"));
});

app.get("/", (req, res) => {
  res.render("home", { ProfPic, lvl, Username, Tag, rank, ranktier, LP });
});

app.listen(3000, console.log("Serwer dziala"));
