let ws = null;
let pending = [];

function connectWS() { // this function has a lot of debug info, you can remove it if you want
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;
  ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => {
    console.log("Background WS connected, flushing", pending.length, "msgs");
    pending.forEach(msg => ws.send(JSON.stringify(msg)));
    pending = [];
  };

  ws.onmessage = (ev) => {
    console.log("BG got msg from server:", ev.data);
  };

  ws.onclose = () => {
    console.log("Background WS closed, will reconnect in 2s");
    setTimeout(connectWS, 2000);
  };

  ws.onerror = (e) => {
    console.log("Background WS error", e);
    try { ws.close(); } catch (_) {}
  };
}
connectWS();

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type === "hianime.info") {
    const payload = {
      ...message.payload,
      _from: sender.url || sender.origin || "unknown",
      _frameId: sender.frameId
    };

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      pending.push(payload);
      connectWS();
    } else {
      ws.send(JSON.stringify(payload));
    }
  }
});