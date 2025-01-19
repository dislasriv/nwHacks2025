
//Fires when HTML has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    //HTML component website-list on popup.html
    const websiteList = document.getElementById('website-list');

    //get websiteTimes OBJECT
    chrome.storage.local.get(['websiteTimes'], (result) => {
        // assign result.webtimes OR an empty object if that is not defined
        // result is the object returned when 'websiteTimes' is queried
        const websiteTimes = result.websiteTimes || {};


    });
});


// get prompt for chosen character

// get current url

// add event listeners to buttons