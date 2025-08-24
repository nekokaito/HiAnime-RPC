const rpc = require("discord-rpc");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const clientId = "1409166870069772328";
const client = new rpc.Client({ transport: "ipc" });

const app = express();
app.use(bodyParser.json());
app.use(cors());

client.login({ clientId }).catch(console.error);

let lastKey = "";

app.post("/anime", (req, res) => {
  const { anime, episode, episodeTitle, cover } = req.body;

  const key = anime + episode + episodeTitle;
  if (key !== lastKey) {
    lastKey = key;
    console.log("Now watching:", anime, "Episode:", episode, episodeTitle);

    client.setActivity({
      details: anime,
      state: episode ? `Episode ${episode}: ${episodeTitle}` : "",
      largeImageKey: "hianime",
      smallImageKey: "play",
      buttons: [{ label: "Watch with me", url: "https://hianime.to" }],
      instance: false,
      type: 3,
    });
  }

  res.sendStatus(200);
});

app.listen(6969, () => console.log("Listening on http://localhost:6969"));
