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
      });

    
});

//alarm handler
// Listen for the alarm event
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("BEAYACH");
  });