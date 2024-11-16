import "dotenv/config";
let id;

export async function getPuuID(nazwa, tag, riotAPIKey) {
  let getByRiotName = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nazwa}/${tag}?api_key=${riotAPIKey}`;
  try {
    const res = await fetch(getByRiotName);
    const user = await res.json();
    const name = user.gameName;
    const Usertag = user.tagLine;
    const puid = user.puuid;
    return { name, Usertag, puid };
  } catch (err) {
    console.log(err.message);
  }
}

export async function getUserData(puuid, riotAPIKey) {
  let getByRiotPuuID = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${riotAPIKey}`;
  try {
    const res = await fetch(getByRiotPuuID);

    const user = await res.json();
    const icon = user.profileIconId;
    id = user.id;
    // lvl do wyświetlenia poziomu duh
    const lvl = user.summonerLevel;

    // getProfilePic do wyświetlania zdjęcia profilowego z ligi legend uuh
    const getProfilePic = `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/profileicon/${icon}.png`;
    return { getProfilePic, lvl };
  } catch (err) {
    console.log(err.message);
  }
}

export async function getRankData(riotAPIKey) {
  let getByRiotID = `https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${riotAPIKey}`;

  try {
    const res = await fetch(getByRiotID);
    const user = await res.json();
    const soloRankData = user.find(
      (item) => item.queueType === "RANKED_SOLO_5x5"
    );

    const rangaTier = soloRankData.tier;
    const ranga = soloRankData.rank;
    const lp = soloRankData.leaguePoints;
    if (Object.keys(user).length === 0) {
      console.log("pusty ");
    } else {
      console.log("nie pusty");
    }
    return { rangaTier, ranga, lp };
  } catch (err) {
    console.log(err.message);
  }
}
