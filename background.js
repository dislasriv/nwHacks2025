console.log("hello i am functioning and normal c:");

//addListener in any any context takes a function as a parameter: the event handler
chrome.runtime.onStartup.addListener(function(){
    console.log("browser was opened");

    //
    chrome.notifications.create({
        type: "basic",
        iconUrl: "images/test.png",
        title: "Welcome Back!",
        message: "Your browser just started. Ready to take on the day?",
        priority: 2,
      })
})