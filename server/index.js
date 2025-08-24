const rpc = require("discord-rpc");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const clientId = "1409166870069772328";
const client = new rpc.Client({ transport: "ipc" });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post("/anime", (req, res) => {
  const { anime } = req.body;
  console.log("Now watching:", anime);

  client.setActivity({
    details: anime,
    state: "HiAnime",
    largeImageKey: "hianime",
    buttons: [{ label: "Watch with me", url: "https://hianime.to" }],
  });

  res.sendStatus(200);
});

client.login({ clientId }).catch(console.error);
app.listen(6969, () => console.log("Listening on http://localhost:6969"));
