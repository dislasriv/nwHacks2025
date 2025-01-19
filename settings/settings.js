const restrictedList = ["youtube.com", "instagram.com"];

// Connect to HTML components
const domainInput = document.getElementById('domain-input');
const addDomainBtn = document.getElementById('add-domain-btn');
const domainList = document.getElementById('domain-list');

// Add domain entry to the HTML
function AddDomainEntry(domain) {
    domainList.appendChild(document.createElement('li')).textContent = domain;
}

// Display restricted domains on startup
restrictedList.forEach(domain => {
    AddDomainEntry(domain);
});

// Add domain to restricted list on button click
addDomainBtn.addEventListener('click', () => {
    const domain = domainInput.value;
    if (domain) {
        restrictedList.push(domain);
        AddDomainEntry(domain);
        domainInput.value = '';
    }
});

