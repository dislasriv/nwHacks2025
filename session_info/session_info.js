

//Fires when HTML has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
  //HTML component website-list on popup.html
  const websiteList = document.getElementById('website-list');

  //get websiteTimes OBJECT
  chrome.storage.local.get(['websiteTimes'], (result) => {
    // assign result.webtimes OR an empty object if that is not defined
    // result is the object returned when 'websiteTimes' is queried
    websiteTimes = result.websiteTimes || {};

    //object.entries returns a list of the key-value pairs that website times is composed of...
    //const [url, time] deconstructs these pairs into two vars
    for (const [url, time] of Object.entries(websiteTimes)) {
      //add element to body of HTML (li element)
      const listItem = document.createElement('li');

      //process the URL
      formatUrl = url.split("/");
      formatUrl = formatUrl[1];
      //compose the text
      listItem.textContent = `${formatUrl}: ${time} minutes`;
      //add new HTML element to website-list (id) HTML object
      websiteList.appendChild(listItem);
    }
  });


  //EVENT LISTENERS:
  settingsButton.addEventListener("click", () => {
    window.close();
    chrome.alarms.create('screenTransition', { delayInMinutes: 0.01 });
    chrome.action.setPopup({ popup: "settings/settings.html" });
  });
  //EVENT LISTENERS:
  const settingsButton = document.getElementById('settings-button');
  settingsButton.addEventListener("click", () => {
    window.close();
    chrome.alarms.create('screenTransition', { delayInMinutes: 0.001 });
    chrome.action.setPopup({ popup: "settings/settings.html" });
  });

});

// Add a row entry to the table
function AddRowToTable(domain, time) {
  const tbody = document.querySelector("#domain-list tbody");
  console.log(tbody);
  const row = document.createElement("tr");

  // Create the domain name column
  const domainCell = document.createElement("td");
  domainCell.textContent = domain;

  // Create the timer limit column
  const timeCell = document.createElement("td");
  timeCell.textContent = `${time} minutes`;

  // Append cells to the row
  row.appendChild(domainCell);
  row.appendChild(timeCell);

  // Append the row to the table body
  tbody.appendChild(row);
}