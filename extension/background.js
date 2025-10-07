let ws = null;
let pending = [];

const WS_URL = "ws://localhost:3000";
const RECONNECT_DELAY = 2000;

const connectWS = () => {
  if (ws && [WebSocket.OPEN, WebSocket.CONNECTING].includes(ws.readyState))
    return;

  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log(`WS connected — flushing ${pending.length} message(s)`);
    pending.forEach((msg) => ws.send(JSON.stringify(msg)));
    pending = [];
  };

  ws.onmessage = ({ data }) => {
    console.log("WS message:", data);
  };

  ws.onclose = () => {
    console.warn("WS closed — retrying in 2s...");
    setTimeout(connectWS, RECONNECT_DELAY);
  };

  ws.onerror = (err) => {
    console.error("WS error:", err);
    try {
      ws.close();
    } catch {}
  };
};

const sendMessage = (payload) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    pending.push(payload);
    connectWS();
  } else {
    ws.send(JSON.stringify(payload));
  }
};

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type !== "hianime.info") return;

  const payload = {
    ...message.payload,
    _from: sender.url || sender.origin || "unknown",
    _frameId: sender.frameId,
  };

  sendMessage(payload);
});

connectWS();
