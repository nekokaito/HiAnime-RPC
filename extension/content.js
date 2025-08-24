const getAnimeInfo = () => {
  let title = document.title;
  return title;
};


setInterval(() => {
  chrome.runtime.sendMessage({ anime: getAnimeInfo() });
}, 2000); 
