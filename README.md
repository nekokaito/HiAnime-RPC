# HiAnime Discord Rich Presence

---

<center>
![HiAnime Logo](https://hianime.to/images/logo.png)  
![HiAnime GIF](https://i.pinimg.com/originals/cc/0b/d8/cc0bd8d6479721dcb6b5312ca4537da1.gif)
</center>

This is a small project — a **Discord Rich Presence** integration for [HiAnime.to](https://hianime.to).  
Since the site doesn’t allow opening the developer console, the project uses **reverse-engineering** to extract the required info.

### Features

- Shows what you are watching on HiAnime in your **Discord Rich Presence**
- Auto-updates while watching
- Lightweight and simple

### Tech

- Built with Node.js
- Uses Discord RPC
- Extracts data via reverse-engineering

---

## Usage (Beginner Friendly)

### Step 0 — Install Dependencies

Before running the project, install the Node.js packages:

```bash
# inside the project folder
npm install
# or if you use Bun
bun install
```

> This ensures all required packages like `discord-rpc` are installed.

### Step 1 — Run the Node.js Server

- **Windows:** double-click `run-win.bat` **or** run it via command prompt.
- **Linux / macOS:** open a terminal in the project folder and run:

```bash
bash run-bash.sh
```

> Make sure the script has execute permissions:
>
> ```bash
> chmod +x run-bash.sh
> ```

### Step 2 — Load the Chrome Extension

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer Mode** (top right corner).
3. Click **Load unpacked** and select the project folder.
4. Open HiAnime and start watching.

> The Discord Rich Presence should automatically update with your current anime.

---

## Notes / Tips

- Make sure Discord is running while using this tool.
- If nothing appears in Discord, restart both Discord and the Node.js server.
- Keep the server running while watching HiAnime to see real-time updates.

---

## License

MIT License
