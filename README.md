# nwHacks2025
Our nwHacks 2025 project

## Setting up ollama

First, [install ollama](https://ollama.com/download). Then, configure ollama to allow requests from chrome extensions by adding the environment variable `OLLAMA_ORIGINS=chrome-extension://*`.

On Linux, you can edit the systemd service file (probably at `/usr/lib/systemd/system/ollama.service`) and add the line `Environment="OLLAMA_ORIGINS=chrome-extension://*"` underneath `[Service]`, then restart the ollama server with `sudo systemctl daemon-reload; sudo systemctl restart ollama.service`.
