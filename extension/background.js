chrome.runtime.onMessage.addListener((msg, tabInfo, reply) => {
  if (msg.anime) {
    console.log("Watching:", msg.anime);

    fetch("http://localhost:3000/anime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ anime: msg.anime }),
    }).catch((err) => console.error(err));
  }
});
