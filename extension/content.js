const getAnimeInfo = () => {
  let title =
    document.title
      .replace(/^Watch\s/, "")
      .replace(/\sEnglish Sub\/Dub online Free on HiAnime\.to$/i, "")
      .trim() || "";

  let image = document.querySelector(".film-poster img")?.src || "";

  const activeEp = document.querySelector("a.ssl-item.ep-item.active");
  const epItems = [
    ...document.querySelectorAll("a.ssl-item.ep-item[data-number]"),
  ];
  const episodesAmount =
    epItems.length > 0
      ? epItems.at(-1)?.getAttribute("data-number") || "1"
      : "1";
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
    episodesAmount,
    link: location.href,
    source: "hianime",
  };
};

const getPlayerInfo = () => {
  return {
    episodeCurrentPosition:
      document.querySelector(".jw-text.jw-text-elapsed")?.textContent ||
      "00:00",
    episodeDuration:
      document.querySelector(".jw-text.jw-text-duration")?.textContent ||
      "00:00",
    isPlaying: document.querySelector(".jwplayer .jw-state-playing") || false,
    source: "videoplayer",
  };
};

setInterval(() => {
  let info = null;

  const host = location.hostname || "";
  if (host.includes("hianime.to")) info = getAnimeInfo();
  if (host.includes("megacloud.blog")) info = getPlayerInfo();

  try {
    chrome.runtime.sendMessage({ type: "hianime.info", payload: info });
  } catch (e) {
    console.error("sendMessage failed", e);
  }
}, 3500);
