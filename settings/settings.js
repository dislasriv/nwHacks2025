// Set of restricted domains and their time limits
const restrictedList = [
    { domain: "instagram.com", time: 30 },
    { domain: "youtube.com", time: 60 },
    { domain: "facebook.com", time: 45 },
];

// Connect to HTML components
const domainInputField = document.getElementById('domain-input');
const timeInputField = document.getElementById('time-input');
const addDomainBtn = document.getElementById('add-domain-btn');
const sessionInfoButton = document.getElementById('session-info-button');

const domainListElement = document.getElementById('domain-list');
const errorMessageElement = document.getElementById('error-message-text');

// Function to render the table rows
function renderTable() {
    const tbody = document.querySelector("#domain-list tbody");
    tbody.innerHTML = ""; // Clear existing rows

    restrictedList.forEach(({ domain, time }) => {
        AddRowToTable(domain, time);
    });
}

// Add a row entry to the table
function AddRowToTable(domain, time) {
    const tbody = document.querySelector("#domain-list tbody");

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

// Render the table on startup
renderTable();

// Add domain to restricted list
function validate(domain, time) {
    if (domain === "" || time === "") {
        errorMessageElement.textContent = "Please enter a domain and time limit";
        return false;
    }
    if (time < 1) {
        errorMessageElement.textContent = "Time limit must be greater than 0";
        return false;
    }
    if (restrictedList.some(item => item.domain === domain)) {
        errorMessageElement.textContent = "Domain is already restricted";
        return false;
    }
    errorMessageElement.textContent = "";
    return true;
}

// BUTTON CLICK EVENTS
// Add domain to restricted list on button click
addDomainBtn.addEventListener('click', () => {
    const domain = domainInputField.value;
    const time = timeInputField.value;

    if (validate(domain, time)) {
        restrictedList.push({ domain, time });
        AddRowToTable(domain, time);
    }

    domainInputField.value = "";
    timeInputField.value = "";
});

sessionInfoButton.addEventListener('click', () => {
    window.close();
    chrome.alarms.create('screenTransition', {delayInMinutes: 0.01});
    chrome.action.setPopup({popup: "session_info/session_info.html"});
});