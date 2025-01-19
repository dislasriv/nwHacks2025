

//addListener in any any context takes a function as a parameter: the event handler
chrome.runtime.onStartup.addListener(function () {
    console.log("browser was opened");

    chrome.notifications.create({
        type: "basic",
        iconUrl: "settings/timer.png",
        title: "Welcome Back!",
        message: "Your browser just started.",
        priority: 2,
    })
    chrome.notifications.create({
        type: "basic",
        iconUrl: "images/test.png",
        title: "Welcome Back!",
        message: "Your browser just started.",
        priority: 2,
    })
})

//APP WIDE ALARMS
chrome.alarms.create('timer', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    //Timer alarm that fires every minute to increment amount of time spent on sites
    if (alarm.name === 'timer') {
        const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });

        //will error if user is doing split screen, or does not have chrome open at the moment (ie: active tab isnt defined)
        const url = (new URL(activeTab[0].url)).hostname;
        // a time limit in minutes for when the popup should occur

        // chrome.storage.local.get(["date"]).then(async (result) => {
        //     let currDate = new Date(new Date().toDateString());
        //     if (result != currDate) {
        //         // clear website timings from previous days
        //         chrome.storage.local.set({ "websiteTimes": {} });
        //         chrome.storage.local.set({ llmContex: [] });
        //          TODO unsnooze
        //         // update stored date
        //         await chrome.storage.local.set({ "date": currDate });
        //     }
        // });

        // Retrieve restricted list from chrome.storage.local
        let restrictedList = await chrome.storage.local.get(['restrictedList']);
        restrictedList = restrictedList["restrictedList"]

        //get 'websiteTimes' object and run the arrow function on it
        let result = await chrome.storage.local.get(['websiteTimes']);
        // assign result.webtimes OR an empty dict if that is not defined
        let websiteTimes = result.websiteTimes || {};

        let restriction = restrictedList.find((site) => site.domain == url);
        console.log(restriction);
        if (restriction) {

            //instantiate/increment websiteTimes[url] keyval pair
            if (websiteTimes[url]) {
                websiteTimes[url] += 1;
            } else {
                websiteTimes[url] = 1;
            }
            // log time in minutes spent
            console.log(websiteTimes[url]);
            chrome.storage.local.set({ websiteTimes });

            // Retrieve restricted list from chrome.storage.local
            let domainsList = restrictedList.map(item => item.domain);
            console.log(url);

            // for yell to trigger, time must be above base and snooze (snooze is base plus some constant times 15)
            if (domainsList.includes(url) && websiteTimes[url] >= restriction["time"] && websiteTimes[url] >= restriction["snooze"]) {
                await yell(url);
            }
        }
    }
});


chrome.testyell = async function () {
    console.log("Switch focus to chromium window now")
    setTimeout(async () => {
        const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });

        //will error if user is doing split screen, or does not have chrome open at the moment (ie: active tab isnt defined)
        console.log(activeTab)
        const url = (new URL(activeTab[0].url)).hostname;
        await yell(url);
    }, 3000)
}

let mutex = false
async function yell(url) {
    if (mutex) {
        console.log("mutex")
        return
    }
    mutex = true;

    try {
        //at limit, prompt ollama
        // get websiteTimes OBJECT
        // get prompt for chosen character
        let result = await chrome.storage.local.get(['websiteTimes', 'systemPrompt', 'ollamaPort', 'llmContext'])
        // assign result.webtimes OR an empty object if that is not defined
        // result is the object returned when 'websiteTimes' is queried
        const websiteTimes = result.websiteTimes || {}; // TODO: vvv
        let systemPrompt = result.systemPrompt || "You are Lord Voldemort."
        let ollamaPort = result.ollamaPort || 11434
        let context = result.llmContext || []

        // Add a message to the context
        context.push({
            role: "user",
            content: `The user has been on ${url} for ${websiteTimes[url]} minutes`
        });

        // Get a response from ollama
        let response = await fetch(`http://localhost:${ollamaPort}/api/chat`, {
            method: "POST",
            body: JSON.stringify({
                model: "llama3.1",
                stream: false,
                messages: [
                    { role: "system", content: `${systemPrompt} You have the task of making sure the user of this computer system remains productive. You will receive alerts when the user spends too much time on specific websites, and you must remind the user to be productive. If the user does not listen, you may need to progressively make your warnings more agressive.` },
                    ...context
                ]
            })
        })
        let json = await response.json();
        context.push({
            role: "assistant",
            content: json.message.content
        })

        // Save the new context
        chrome.storage.local.set({ llmContext: context });

        chrome.action.setPopup({ popup: "warning/warning.html" });
        chrome.action.openPopup();
        chrome.action.setPopup({ popup: "session_info/session_info.html" });
    } finally {
        mutex = false
    }
}

chrome.openwarning = function () {
    setTimeout(() => {
        chrome.action.setPopup({ popup: "warning/warning.html" });
        chrome.action.openPopup();
        chrome.action.setPopup({ popup: "session_info/session_info.html" });
    }, 3000)
    console.log("Focus chromium now")
}