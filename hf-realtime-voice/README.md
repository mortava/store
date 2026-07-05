# HF Realtime Voice — standalone app

A standalone, self-hostable version of the Hugging Face Space
[`smolagents/hf-realtime-voice`](https://huggingface.co/spaces/smolagents/hf-realtime-voice):
a real-time voice conversation app (tap the orb, talk, hear the reply) that speaks
to a Hugging Face [`speech-to-speech`](https://github.com/huggingface/speech-to-speech)
backend over **WebSocket** using the OpenAI Realtime GA protocol.

## The pipeline

Your voice travels: `you speak → VAD → STT → VLM → TTS → the orb replies`

| Stage | Job | Model |
|-------|-----|-------|
| VAD | detects when you speak | silero-vad |
| STT | transcribes it | nvidia/parakeet-tdt-1.1b |
| VLM | composes the reply | google/gemma-4-31B-it (via Cerebras) |
| TTS | speaks it back | Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice |

The pipeline itself runs in the separate `speech-to-speech` server; this app is the
browser front-end plus a small FastAPI server that serves it and proxies secrets
(search key, load-balancer address) that must never reach the browser.

## Quick start

```bash
cd hf-realtime-voice
pip install -r requirements.txt
uvicorn server:app --reload --port 7860
```

Open <http://localhost:7860/>, then in **Settings** paste the URL of a running
speech-to-speech server (e.g. `http://localhost:8080` — the app appends
`/v1/realtime`), click the orb, allow the mic, and talk.

Or with Docker:

```bash
docker build -t hf-realtime-voice .
docker run -p 7860:7860 hf-realtime-voice
```

> Browsers require **HTTPS or `localhost`** for `getUserMedia()` (mic + camera).
> `127.0.0.1` and `localhost` both work; plain `http://192.168.x.y` does NOT.

## Backend

You need a speech-to-speech server exposing the realtime WebSocket route
`@app.websocket("/v1/realtime")` from
[huggingface/speech-to-speech](https://github.com/huggingface/speech-to-speech)
(`feat/webrtc-transport` branch — the same compute serves both the WebRTC POST and
the WebSocket upgrade on the same path).

Two ways to point the app at it:

- **Settings → Speech-to-speech server URL** (direct mode, default): paste a full
  `connect_url` (`wss://host/v1/realtime?...`) or a bare host like
  `localhost:8080` (the app adds `/v1/realtime`).
- **`LOAD_BALANCER_URL` env** (load-balancer mode): the server proxies the
  `/session` handshake to the LB server-side (the LB address never reaches the
  browser), including queueing when every compute slot is busy.

## How the wire works

1. (LB mode) app POSTs `/api/session`, which proxies `<lb>/session`; the LB
   returns `{ connect_url: "wss://<compute>/v1/realtime?session_token=<JWT>", ... }`.
2. Browser opens a WebSocket directly on `connect_url` (direct mode skips step 1).
3. Server pushes `session.created`; client replies with `session.update`
   (voice, instructions, tools — OpenAI Realtime GA schema).
4. Mic audio streams up as PCM16 16 kHz mono base64 chunks
   (`input_audio_buffer.append`, one frame every ~40 ms, resampled in an
   AudioWorklet).
5. Server pushes `response.output_audio.delta` (PCM16 base64) plus user/assistant
   transcript deltas; a playback AudioWorklet resamples and plays with fade-in/out
   and instant clearing on barge-in.

## Tools

The assistant can call two tools mid-conversation (Tools button, top-right):

- **Web search** — Google results via Serper.dev, proxied server-side through
  `/api/search` so the key never reaches the browser. Set `SERPER_API_KEY` in the
  environment; without it the tool is disabled unless the user pastes their own
  key in the Tools panel.
- **Camera** — while enabled, a live self-view shows bottom-left; when the model
  calls the tool, the current webcam frame is sent to the vision-language model.

## Usage limits (deployed-Space feature, off by default)

Conversation time can be metered per UTC day by sign-in tier (`limiter.py` /
`auth.py`), but metering only activates when BOTH `LOAD_BALANCER_URL` and
`SPACE_ID` are set — i.e. on a deployed HF Space. Running standalone (even with
`LOAD_BALANCER_URL` exported) leaves the app unmetered, with no sign-in gating.

| Env | Default | What |
|-----|---------|------|
| `SERPER_API_KEY` | _(unset)_ | Enables the web-search tool |
| `LOAD_BALANCER_URL` | _(unset)_ | s2s load balancer; unset = direct mode |
| `LIMIT_ANON_SEC` | `300` | Daily seconds for anonymous visitors (metered mode) |
| `LIMIT_FREE_SEC` | `600` | Daily seconds for signed-in non-PRO users (metered mode) |
| `UNLIMITED_ORGS` | _(adds to defaults)_ | Extra HF orgs whose members are unlimited |
| `USAGE_HASH_SECRET` | _(random)_ | HMAC secret for hashing identity keys |

## Files

| File | Role |
|------|------|
| `server.py` | FastAPI: static hosting, `/api/search` proxy, `/api/session` LB proxy, metering |
| `auth.py` | HF OAuth + per-request identity (tier, hashed keys) — Space-only |
| `limiter.py` | SQLite per-day talk-time budget (chunked server-clock reservation) |
| `index.html` | Single page: orb, settings/tools/about modals |
| `main.js` | State machine, settings, tools, camera, noise-gate UI wiring |
| `style.css` | Orb animations, layout, dark theme |
| `ui/chat.js` | `ChatView`: history panel, ephemeral bubbles, transcript/tool streaming |
| `ui/account.js` | HF login chip + daily-limit modal (inert when unmetered) |
| `ui/dom.js` | Shared DOM helpers |
| `ws/s2s-ws-client.js` | WebSocket handshake + OpenAI Realtime GA protocol client |
| `ws/codec.js` | base64 ↔ PCM helpers + transcript extraction |
| `ws/orb-visualizer.js` | FFT bands → orb CSS custom properties |
| `worklets/mic-capture.js` | AudioWorklet: mic → 16 kHz Int16 PCM chunks + noise gate |
| `worklets/audio-playback.js` | AudioWorklet: server PCM → speakers, ring buffer + fades |

## Settings (stored in `localStorage`, namespaced `s2s.ws.*`)

| Key | What |
|-----|------|
| Server URL | Direct s2s server URL (direct mode) |
| Voice | Qwen3-TTS speaker (Aiden, Ryan, Dylan, Eric, Ono_Anna, Serena, Sohee, Uncle_Fu, Vivian) |
| Instructions | System prompt sent in `session.update` |
| Noise gate | Client-side mic gate threshold (dBFS) |

## Credits

- Backend: [huggingface/speech-to-speech](https://github.com/huggingface/speech-to-speech) (`feat/webrtc-transport`)
- Original Space: [smolagents/hf-realtime-voice](https://huggingface.co/spaces/smolagents/hf-realtime-voice), built by tfrere, A-Mahla and andito (Pollen Robotics × Hugging Face)
