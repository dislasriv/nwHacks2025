document.addEventListener('DOMContentLoaded', () => {
    const websiteList = document.getElementById('website-list');
  
    chrome.storage.local.get(['websiteTimes'], (result) => {
      const websiteTimes = result.websiteTimes || {};
  
      for (const [url, time] of Object.entries(websiteTimes)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${url}: ${time} minutes`;
        websiteList.appendChild(listItem);
      }
    });
  });