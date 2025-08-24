chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const { anime, episode, episodeTitle, cover } = msg;

  console.log("Anime:", anime);
  console.log("Episode:", episode);
  console.log("Episode Title:", episodeTitle);
  console.log("Cover:", cover);

  fetch("http://localhost:6969/anime", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(msg),
  }).catch(console.error);

  sendResponse({ status: "ok" });
});
