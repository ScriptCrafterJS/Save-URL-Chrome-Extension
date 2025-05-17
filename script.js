let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveButton = document.getElementById("saveButton");
const linksList = document.getElementById("links-list");
const deleteButton = document.getElementById("deleteAllBtn");
const tabButton = document.getElementById("saveTab");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLinks(myLeads);
}

saveButton.addEventListener("click", () => {
  const url = inputEl.value;
  if (url) {
    myLeads.push(url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLinks(myLeads);
    inputEl.value = "";
  }
});

deleteButton.addEventListener("click", () => {
  localStorage.clear();
  myLeads = [];
  renderLinks(myLeads);
});

tabButton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    myLeads.push(currentTab.url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLinks(myLeads);
  });
});

// render links
function renderLinks(leads) {
  let listItems = "";
  leads.forEach((lead) => {
    listItems += `
    <li>
        <a href="${lead}" target="_blank">${lead}</a>
    </li>
    `;
  });
  linksList.innerHTML = listItems;
}
renderLinks(myLeads);
