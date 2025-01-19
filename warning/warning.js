
//Fires when HTML has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', async () => {
    //HTML component website-list on popup.html
    const websiteList = document.getElementById('website-list');
    const exitButton = document.getElementById('exit-button');

    // Pull the most recent message from local storage
    let context = (await chrome.storage.local.get(['llmContext'])).llmContext
    let warningMessageDiv = document.getElementById("warning-message")
    warningMessageDiv.innerText = context[context.length - 1].content;

    exitButton.addEventListener("click", async () => {
        const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log("tab");
        chrome.tabs.remove(activeTab[0].id);
    });
});




// add event listeners to buttons
const snoozeButton = document.getElementById('snooze-button')
snoozeButton.addEventListener('click', async() => {
    //get active tab
    const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });
    //will error if user is doing split screen, or does not have chrome open at the moment (ie: active tab isnt defined)
    const url = (new URL(activeTab[0].url)).hostname;

    //get restriction correspoinding to domain
    let restrictedList = await chrome.storage.local.get(['restrictedList']);
    restrictedList = restrictedList["restrictedList"]
    let restriction = restrictedList.find((site) => site.domain == url);
    //increment snooze timer
    restriction["snooze"] = restriction["snooze"] + 5

    //update restrictedlist
    chrome.storage.local.set({ restrictedList });

    //reset poopup
    chrome.action.setPopup({ popup: "session_info/session_info.html" });
    window.close();

    console.log("I am going to pipe bomb the mackies on 5th")
})
