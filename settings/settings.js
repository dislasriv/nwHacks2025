// Set of restricted domains and their time limits


// Retrieve restricted list from chrome.storage.local
// chrome.storage.local.get(['restrictedList'], (result) => {
//     restrictedList = result.restrictedList || [{ domain: "example.com", time: 1 }];
//     renderTable();  // Render the table after data is retrieved
// });

renderTable();

// Connect to HTML components
const domainInputField = document.getElementById('domain-input');
const timeInputField = document.getElementById('time-input');
const addDomainBtn = document.getElementById('add-domain-btn');

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

// Add domain to restricted list on button click
addDomainBtn.addEventListener('click', () => {
    const domain = domainInputField.value;
    const time = parseInt(timeInputField.value, 10);

    if (validate(domain, time)) {
        restrictedList.push({ domain, time });
        AddRowToTable(domain, time);
        chrome.storage.local.set({ websiteTimes });
        domainInputField.value = "";
        timeInputField.value = "";
    }
});