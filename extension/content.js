let lastKey = "";

const getAnimeInfo = () => {
  let title =
    document.title
      .replace(/^Watch\s/, "")
      .replace(/\sEnglish Sub\/Dub online Free on HiAnime\.to$/i, "")
      .trim() || "";

  let image = document.querySelector(".film-poster img")?.src || "";

  const activeEp = document.querySelector("a.ssl-item.ep-item.active");
  let episodeNumber = "";
  let episodeTitle = "";

  if (activeEp) {
    episodeNumber = activeEp.getAttribute("data-number") || "";
    const epNameEl = activeEp.querySelector(".ep-name");
    if (epNameEl)
      episodeTitle = epNameEl.title || epNameEl.textContent.trim() || "";
  }

  return {
    anime: title,
    image: image,
    episode: episodeNumber,
    episodeTitle,
    link: location.href,
    source: "hianime",
  };
};

const getPlayerInfo = () => {
  return {
    episodeCurrentPosition: document.querySelector(".jw-text .jw-text-elapsed")?.textContent || "00:00",
    episodeDuration: document.querySelector(".jw-text .jw-text-duration")?.textContent || "00:00",
    isPlaying: document.querySelector(".jwplayer .jw-state-playing") || false,
    source: "videoplayer",
  }
}

setInterval(() => {
  let info = null;
  switch (location.hostname) {
    case "megacloud.blog":
      info = getPlayerInfo();
      break;
    case "hianime.to":
      info = getAnimeInfo();
      break;
  } 

  const key = info.anime + info.episode + info.episodeTitle + info.link;

  if (key !== lastKey) {
    lastKey = key;
    chrome.runtime.sendMessage(info);
  }
}, 1000);
