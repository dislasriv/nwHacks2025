
//Fires when HTML has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    //HTML component website-list on popup.html
    const websiteList = document.getElementById('website-list');
    const exitButton = document.getElementById('exit-button');

    // get websiteTimes OBJECT
    // get prompt for chosen character
    chrome.storage.local.get(['websiteTimes', 'systemPrompt', 'ollamaPort', 'llmContext']).then(async result => {
        // assign result.webtimes OR an empty object if that is not defined
        // result is the object returned when 'websiteTimes' is queried
        const websiteTimes = result.websiteTimes || {};
        let systemPrompt = result.systemPrompt || "You are Lord Voldemort. You have been cursed with the task of making sure the user of this computer system remains productive. You will receive alerts when the user spends too much time on specific websites, and you must remind the user to be productive. If the user does not listen, you may need to progressively make your warnings more agressive."
        let ollamaPort = result.ollamaPort || 11434
        let context = result.llmContext || []

        // get current url
        const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = (new URL(activeTab[0].url)).hostname;

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
                messages: [
                    { role: "system", content: systemPrompt },
                    ...context
                ]
            })
        })
        if (!response.ok) {
            alert(`HTTP error! status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Read the response as it is streamed in
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let warningMessageDiv = document.getElementById("warning-message")
        warningMessageDiv.innerText = ""
        while (true) {
            let chunk = await reader.read()
            if (chunk.done) break
            let chunkText = decoder.decode(chunk.value, { stream: true });
            warningMessageDiv.innerText += JSON.parse(chunkText).message.content
        }
        context.push({
            role: "assistant",
            content: warningMessageDiv.innerText
        })

        // Save the new context
        chrome.storage.local.set({ llmContext: context });
    })

    
    exitButton.addEventListener("click", async () => {
        const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log("tab");
        chrome.tabs.remove(activeTab[0].id);
    })

});




// add event listeners to buttons