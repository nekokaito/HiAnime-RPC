let lastKey = "";

const getAnimeInfo = () => {
  let title =
    document.title
      .replace(/^Watch\s/, "")
      .replace(/\sEnglish Sub\/Dub online Free on HiAnime\.to$/i, "")
      .trim() || "";

  let image = document.querySelector('.film-poster img')?.src || "";

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
  };
};

setInterval(() => {
  const info = getAnimeInfo();

  const key = info.anime + info.episode + info.episodeTitle + info.link;

  if (key !== lastKey) {
    lastKey = key;

    chrome.runtime.sendMessage({
      anime: info.anime || "HiAnime",
      episode: info.episode || "",
      episodeTitle: info.episodeTitle || "",
      image: info.image || "",
      link: info.link || "",
    });
  }
}, 1000);
