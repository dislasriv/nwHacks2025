// Set of restricted domains and their time limits
let restrictedList = [];

// Retrieve restricted list from chrome.storage.local
chrome.storage.local.get(['restrictedList'], (result) => {
    restrictedList = result.restrictedList || [];
    renderTable();  // Render the table after data is retrieved
});

// Connect to HTML components
const domainInputField = document.getElementById('domain-input');
const timeInputField = document.getElementById('time-input');
const addDomainBtn = document.getElementById('add-domain-btn');
const sessionInfoButton = document.getElementById('session-info-button');

const domainListElement = document.getElementById('domain-list');
const errorMessageElement = document.getElementById('error-message-text');
const tableHeader = document.getElementById('table-header');

// Render the table on startup
renderTable();

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

// BUTTON CLICK EVENTS
// Add domain to restricted list on button click
addDomainBtn.addEventListener('click', () => {
    const domain = domainInputField.value;
    const time = parseInt(timeInputField.value, 10);

    if (validate(domain, time)) {
        restrictedList.push({ domain, time });
        AddRowToTable(domain, time);
        chrome.storage.local.set({ restrictedList });
        domainInputField.value = "";
        timeInputField.value = "";
    }

    domainInputField.value = "";
    timeInputField.value = "";
});

sessionInfoButton.addEventListener('click', () => {
    location.href = "/session_info/session_info.html"
});

// System prompt
const systemPromptBox = document.getElementById('system-prompt')
chrome.storage.local.get(['systemPrompt']).then(result => {
    let systemPrompt = result.systemPrompt || "You are Lord Voldemort. You have been cursed with the task of making sure the user of this computer system remains productive. You will receive alerts when the user spends too much time on specific websites, and you must remind the user to be productive. If the user does not listen, you may need to progressively make your warnings more agressive."
    systemPromptBox.value = systemPrompt
});
const systemPromptButton = document.getElementById('submit-system-prompt')
systemPromptButton.addEventListener('click', () => {
    let systemPrompt = systemPromptBox.value
    chrome.storage.local.set({ systemPrompt })
})

// Ollama port
const ollamaPortBox = document.getElementById('ollama-port')
chrome.storage.local.get(['ollamaPort']).then(result => {
    let ollamaPort = result.ollamaPort || 11434
    ollamaPortBox.value = ollamaPort
});
ollamaPortBox.addEventListener("input", event => {
    let ollamaPort = event.target.value
    chrome.storage.local.set({ ollamaPort })
})
