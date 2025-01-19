

//Fires when HTML has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', async () => {
  
  //get websiteTimes OBJECT
  let result = await chrome.storage.local.get(['websiteTimes']);
  // assign result.webtimes OR an empty object if that is not defined
  // result is the object returned when 'websiteTimes' is queried
  let websiteTimes = result.websiteTimes || {};

  //object.entries returns a list of the key-value pairs that website times is composed of...
  //const [url, time] deconstructs these pairs into two vars
  for (const [url, time] of Object.entries(websiteTimes)) {
    AddRowToTable(url, time)
  }

  //EVENT LISTENERS:
  const settingsButton = document.getElementById('settings-button');
  settingsButton.addEventListener("click", () => {
    location.href = "/settings/settings.html";
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
  timeCell.textContent = `${time} mins`;

  // Append cells to the row
  row.appendChild(domainCell);
  row.appendChild(timeCell);

  // Append the row to the table body
  tbody.appendChild(row);
}