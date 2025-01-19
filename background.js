console.log("hello i am functioning and normal c:");



//addListener in any any context takes a function as a parameter: the event handler
chrome.runtime.onStartup.addListener(function(){
    console.log("browser was opened");


    //create alarm
        //-DelayInSeconds => time to first ping
        //-PeriodInSeconds => time to repeat beyond that
    chrome.alarms.create("periodicalPing", {delayInMinutes:1, periodInMinutes:1});

    //notifications are little boxes that appear in bottom right of screen with an icon, title and message
    chrome.notifications.create({
        type: "basic",
        iconUrl: "images/test.png",
        title: "Welcome Back!",
        message: "Your browser just started. ",
        priority: 2,
      })
})

chrome.alarms.create('timer', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'timer') {
      const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });

      const domainRegex = /\/[^\/]+\//g;

      const url = domainRegex.exec(activeTab[0].url);

      const limit = 7;
  
      chrome.storage.local.get(['websiteTimes'], async (result) => {
        let websiteTimes = result.websiteTimes || {};
  
        if (websiteTimes[url]) {
          websiteTimes[url] += 1;
        } else {
          websiteTimes[url] = 1;
        }
        console.log(websiteTimes[url]);
        if(websiteTimes[url] == limit) {
            chrome.action.setPopup("popup.html");
            chrome.action.openPopup();
        }
  
        await chrome.storage.local.set({ websiteTimes });
      });
    });