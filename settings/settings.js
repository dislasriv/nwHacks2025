
// Set of restricted domains and their time limits
let restrictedList = [];

// Retrieve restricted list from chrome.storage.local
chrome.storage.local.get(['restrictedList'], async (result) => {
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

// Unban a website
function RemoveRestriction(event) {
    let row = event.target.parentNode;
    let url = row.children[1].innerText;
    restrictedList = restrictedList.filter(({ domain, time }) => domain != url)
    chrome.storage.local.set({ restrictedList })
    row.parentNode.removeChild(row);
}

// Add a row entry to the table
function AddRowToTable(domain, time) {
    const tbody = document.querySelector("#domain-list tbody");
    const row = document.createElement("tr");

    // Delete button
    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    // Handle delete button click event
    deleteBtn.addEventListener('click', (event) => {
        const row = event.target.parentNode.parentNode;
        const url = row.children[0].innerText;
        restrictedList = restrictedList.filter(({ domain, time }) => domain != url)
        chrome.storage.local.set({ restrictedList })
        row.parentNode.removeChild(row);
    });
    deleteBtn.setAttribute("class", "delete-button");

    deleteCell.appendChild(deleteBtn);


    // Create the domain name column
    const domainCell = document.createElement("td");
    domainCell.textContent = domain;

    // Create the timer limit column
    const timeCell = document.createElement("td");
    timeCell.textContent = `${time} mins`;

    // Append cells to the row
    row.appendChild(domainCell);
    row.appendChild(timeCell);
    row.appendChild(deleteCell)

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
    let snooze = time;

    if (validate(domain, time)) {
        restrictedList.push({ domain, time, snooze });
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
    let systemPrompt = result.systemPrompt || "You are Lord Voldemort."
    systemPromptBox.value = systemPrompt
});
const systemPromptButton = document.getElementById('submit-system-prompt')
systemPromptButton.addEventListener('click', () => {
    let systemPrompt = systemPromptBox.value
    chrome.storage.local.set({ systemPrompt })
    chrome.storage.local.set({ llmContext: [] })
})

// Ollama port
// const ollamaPortBox = document.getElementById('ollama-port')
// chrome.storage.local.get(['ollamaPort']).then(result => {
//     let ollamaPort = result.ollamaPort || 11434
//     ollamaPortBox.value = ollamaPort
// });
// ollamaPortBox.addEventListener("input", event => {
//     let ollamaPort = event.target.value
//     chrome.storage.local.set({ ollamaPort })
// })
