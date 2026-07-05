"""Vercel serverless entrypoint for the hf-realtime-voice FastAPI app.

Vercel serves the front-end statically from `hf-realtime-voice/` (the
`outputDirectory` in vercel.json) and rewrites `/api/*` here, where the
FastAPI app handles the config/search/session routes.
"""

import os
import sys

_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(_ROOT, "hf-realtime-voice"))

from server import app  # noqa: E402,F401
