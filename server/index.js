const rpc = require("discord-rpc");

const clientId = "1409166870069772328";

const client = new rpc.Client({ transport: "ipc" });

client.on("ready", () => {
  console.log("Rich Presence is active!");

  client.setActivity({
    details: "Watching Anime",
    state: "Episode 1",
    largeImageKey: "hianime",
    smallImageKey: "play",
    buttons: [{ label: "Watch on HiAnime", url: "https://hianime.to" }],
  });
});

client.login({ clientId }).catch(console.error);
