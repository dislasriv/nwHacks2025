# Set Your Sites

![timer](https://github.com/user-attachments/assets/e33fae9c-fead-4df0-92bd-f7fc3d51dabc)

### Try binging YouTube videos with Voldemort over your shoulder.

We’ve all been there—you have a mountain of tasks to tackle, but somehow, hours slip away as you fall down the rabbit hole of random YouTube videos.

That’s why we set out to transform generic screen timer tools into something smarter and more effective. With the power of AI, our extension allows you to create your very own accountability buddy to help you stay on track.

Want Michael Scott cheering (or chastising) you? Or maybe you’d prefer the unrelenting presence of Voldemort? The choice is yours—the sky’s the limit!

Try to cast them aside, and they’ll leave you alone… for now. Keep in mind, each time you do so your buddy will get a little more… insistent.

During the brainstorming phase, we set out to create something both fun and functional. Our goal was to make screen timers more engaging and effective. To fit the time constraints of nwHacks, we focused this prototype on the browser.

Our tool is available as a Google Chrome extension. It allows you to set screen time limits for all those addictive websites and customize your experience by describing your ideal accountability buddy. When your time is up, your buddy will (not so kindly) nudge you to move on to more productive activities.

We wanted to make it harder to ignore screen time limits while giving users a fun and lighthearted experience. Say goodbye to disappointment when your screen time ends—because now you’ll have a quirky companion to lighten the mood!

Through this process, our team had the opportunity to create a Chrome extension for the first time, working with JavaScript, HTML, CSS, and Ollama. We also learned how to debug directly in the browser using developer tools and how to integrate a local AI agent into the application.

**Ready to take control of your time? Try it out and "set your sites" on a better, more productive you!🤩**

Note: Before running the Chrome Extension, you must have Ollama set up

## Setting up ollama

First, [install ollama](https://ollama.com/download). Then, configure ollama to allow requests from chrome extensions by adding the environment variable `OLLAMA_ORIGINS=chrome-extension://*`.

On Linux, you can edit the systemd service file (probably at `/usr/lib/systemd/system/ollama.service`) and add the line `Environment="OLLAMA_ORIGINS=chrome-extension://*"` underneath `[Service]`, then restart the ollama server with `sudo systemctl daemon-reload; sudo systemctl restart ollama.service`.
