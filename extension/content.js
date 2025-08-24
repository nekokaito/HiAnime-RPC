let lastKey = "";
const getAnimeInfo = () => {
  
     // anime title
  let title = document.title
    .replace(/^Watch\s/, "")
    .replace(/\sEnglish Sub\/Dub online Free on HiAnime\.to$/i, "")
    .trim();

  // active episode
  const activeEp = document.querySelector("a.ssl-item.ep-item.active");
  let episodeNumber = "";
  let episodeTitle = "";

  if (activeEp) {
    episodeNumber = activeEp.getAttribute("data-number") || "";
    const epNameEl = activeEp.querySelector(".ep-name");
    if (epNameEl) episodeTitle = epNameEl.title || epNameEl.textContent.trim();
  }

  // cover image
  let cover = "";
  const posterImgs = document.querySelectorAll(".film-poster-img");
  posterImgs.forEach((img) => {
    if (img.alt.trim() === title) {
      cover = img.src;
    }
  });

  return { anime: title, episode: episodeNumber, episodeTitle, cover };
}


setInterval(() => {
  const info = getAnimeInfo();
  const key = info.anime + info.episode;
  if (key !== lastKey) {
    lastKey = key;
    chrome.runtime.sendMessage(info);
  }
}, 1000);
