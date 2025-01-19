

//Fires when HTML has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    //get websiteTimes OBJECT
    let websiteTimes = {};
    chrome.storage.local.get(['websiteTimes'], (result) => {
        // assign result.webtimes OR an empty object if that is not defined
        // result is the object returned when 'websiteTimes' is queried
        websiteTimes = result.websiteTimes || {};

        //object.entries returns a list of the key-value pairs that website times is composed of...
        //const [url, time] deconstructs these pairs into two vars
        for (const [url, time] of Object.entries(websiteTimes)) {
            console.log(url, time);
            url.replace('/', '');
            AddRowToTable(url, time);
        }
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