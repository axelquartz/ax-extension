import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://leads-tracker-1b685-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputBtn = document.getElementById("input-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const inputDisplay = document.getElementById("save-el");
const inputValue = document.getElementById("input-el");

let myLeads = [];

function renderLeads() {
  inputDisplay.innerHTML = "";

  const previousEntries = document.createElement("p");
  previousEntries.textContent = "Previous entries:";
  inputDisplay.appendChild(previousEntries);

  myLeads.forEach((lead) => {
    if (lead !== inputValue.value.trim()) {
      const link = document.createElement("a");
      link.href = lead;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = lead;
      inputDisplay.appendChild(link);
      inputDisplay.appendChild(document.createElement("br"));
    }
  });
}

onValue(referenceInDB, (snapshot) => {
  if (!snapshot.exists()) {
    myLeads = [];
    renderLeads();
    return;
  }
  const snapshotValue = snapshot.val();
  console.log(Object.entries(snapshotValue));
  myLeads = Object.values(snapshotValue);
  renderLeads();
});

inputBtn.addEventListener("click", async () => {
  const lead = inputValue.value.trim();
  if (!lead) return;

  try {
    await push(referenceInDB, lead);
    myLeads.push(lead);
    renderLeads();
    inputValue.value = "";
  } catch (error) {
    console.error("Could not save lead to Firebase:", error);
    inputDisplay.innerHTML = "";
    inputDisplay.appendChild(document.createElement("br"));
    inputDisplay.appendChild(
      document.createTextNode(
        "Could not save lead. Check Firebase Database rules.",
      ),
    );
  }
});

deleteAllBtn.addEventListener("click", () => {
  remove(referenceInDB); // Remove all leads from the Firebase Realtime Database
  myLeads = []; // Clear the myLeads array
  renderLeads(); // Render the updated leads
});

inputValue.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    inputBtn.click();
  }
});
