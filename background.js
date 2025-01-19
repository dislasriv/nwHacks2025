
console.log("hello i am functioning and normal c:");

//addListener in any any context takes a function as a parameter: the event handler
chrome.runtime.onStartup.addListener(function () {
  console.log("browser was opened");

  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/test.png",
    title: "Welcome Back!",
    message: "Your browser just started.",
    priority: 2,
  })
})

chrome.alarms.create('timer', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'timer') {
    const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });
    const domainRegex = /\/[^\/]+\//g;

    //will error if user is doing split screen, or does not have chrome open at the moment (ie: active tab isnt defined)
    const url = domainRegex.exec(activeTab[0].url);
    // a time limit in minutes for when the popup should occur
    const limit = 2;

    // chrome.storage.local.get(["date"]).then((result) => {
    //   let currDate = new Date(new Date().toDateString());
    //   if(result != currDate) {
    //     // clear websiteTimes
    //     // update
    //   } else {
    //     // nothing
    //   }
    //   console.log("Value is " + result.key);
    // });

    // // TODO: only time for restricted sites
    // chrome.storage.local.get(['RESTRICTIONS_REPLACE'], async (result) => {
    //   if (url in result.RESTRICTIONS) {

        //get 'websiteTimes' object and run the arrow function on it
        chrome.storage.local.get(['websiteTimes'], async (result) => {
          // assign result.webtimes OR an empty dict if that is not defined
          let websiteTimes = result.websiteTimes || {};

          //instantiate/increment websiteTimes[url] keyval pair
          if (websiteTimes[url]) {
            websiteTimes[url] += 1;
          } else {
            websiteTimes[url] = 1;
          }
          // log time in minutes spent
          console.log(websiteTimes[url]);

          //at limit make popup
          // if (websiteTimes[url] > limit) { // TODO: change back to =
            chrome.action.setPopup({ popup: "warning/warning.html" });
            chrome.action.openPopup();
          // }

          //asynchonous call to store "websiteTimes":websiteTimes on local storage (ie:update the WebsiteTimes structure)
          await chrome.storage.local.set({ websiteTimes });
        });

      // }

    // });

  }
});