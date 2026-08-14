let inputBtn = document.getElementById("input-btn");
let inputDisplay = document.getElementById("save-el");
let inputValue = document.getElementById("input-el");
let myLeads = [];

inputBtn.addEventListener("click", () => {
  myLeads.push(inputValue.value);
  inputDisplay.innerHTML += `<a href="${inputValue.value}" target="_blank">${inputValue.value}</a> `;
  inputValue.value = "";

  //   myLeads.push(inputValue.value);

  //   for (let i = 0; i < myLeads.length; i++) {
  //     console.log(myLeads[i]);
  //     inputValue.value = "";
  //     inputDisplay.textContent += myLeads[i] + " ";
  //   }
});
