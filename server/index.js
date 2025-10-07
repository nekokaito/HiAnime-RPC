const rpc = require("discord-rpc");
const ws = require("ws");

const clientId = "1409166870069772328";
if (!clientId) throw new Error("CLIENT_ID variable is undefined.");

const client = new rpc.Client({ transport: "ipc" });
client.login({ clientId }).catch(console.error);

const wsServer = new ws.Server({ port: 6969 });

let lastAnimeTitle = null;

let hiAnimeData = {},
  videoPlayerData = {};

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
        hiAnimeData = data;
        break;
      case "videoplayer":
        videoPlayerData = data;
        break;
    }

    const mergedData = { ...hiAnimeData, ...videoPlayerData, source: "merged" };

    mergedData.anime ? updateRPC(client, mergedData) : client.clearActivity();
  });

  ws.on("close", () => {
    client.clearActivity();
    console.log("Client disconnected");
  });
});

const updateRPC = (client, mergedData) => {
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
        episode &&
        episodesAmount &&
        episodeTitle &&
        episodeCurrentPosition &&
        episodeDuration
          ? `Episode ${episode}: ${episodeTitle} \n
          (${episodeCurrentPosition}/${episodeDuration})`
          : "  ",
      largeImageKey: image || "hianime",
      largeImageText: "Watching anime",
      smallImageKey: isPlaying ? "play" : "pause",
      smallImageText: isPlaying ? "Watching" : "Paused",
    });
  } catch (e) {
    console.log(e);
  }
};
