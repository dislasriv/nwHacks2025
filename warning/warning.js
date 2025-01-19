
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