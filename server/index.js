const rpc = require("discord-rpc");
const ws = require("ws"); 

const clientId = "1411062251003056269";
if (!clientId) throw new Error("CLIENT_ID variable is undefined.");

const client = new rpc.Client({ transport: "ipc" });
client.login({ clientId }).catch(console.error);

const wsServer = new ws.Server({ port: 3000 });

let lastAnimeTitle = null;

let hianimeData = {},
  videoplayerData = {};

wsServer.on("connection", (ws) => {
  console.log("Client connected!");

  ws.on("message", (msg) => {
    let data;
    try {
      data = JSON.parse(msg.toString());
    } catch {
      console.error("Invalid JSON: JSON.parse() failed.");
      return;
    }

    switch (data.source) {
      case "hianime":
        hianimeData = data;
        break;
      case "videoplayer":
        videoplayerData = data;
        break;
    }

    const mergedData = { ...hianimeData, ...videoplayerData, source: "merged" };

    if (mergedData.anime) {
      updateRPC(client, mergedData);
    } else {
      client.clearActivity();
    }
  });

  ws.on("close", () => {
    client.clearActivity();
    console.log("Client disconnected");
  });
});

function updateRPC(client, mergedData) {
  try {
    if (!mergedData) return;

    let {
      anime,
      image,
      episode,
      episodeTitle,
      episodesAmount,
      isPlaying,
      episodeCurrentPosition,
      episodeDuration,
    } = mergedData;

    if (
      anime !== lastAnimeTitle &&
      episodeCurrentPosition &&
      episodeCurrentPosition !== "00:00"
    ) {
      episodeCurrentPosition = "00:00";
    }
    lastAnimeTitle = anime;


    client.setActivity({
      details: anime || "Nothing",
      state:
        episode && episodesAmount && episodeTitle && episodeCurrentPosition && episodeDuration
          ? `Episode ${episode}/${episodesAmount} (${episodeTitle}) ———
          (${episodeCurrentPosition}/${episodeDuration})`
          : "  ",
      largeImageKey: image || "hianime",
      largeImageText: "Watching anime",
      smallImageKey: isPlaying ? "play" : "pause", // add both play and pause icons to assets!!!
      smallImageText: isPlaying ? "Watching" : "Paused",
    });
  } catch (e) {
    console.log(e);
  }
}