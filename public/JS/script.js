// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// for icons function
// let icons = document.getElementsByClassName("icon-div");

// for (let icon of icons) {
//   icon.addEventListener("click", () => {
//     console.log(icon.textContent);
//   });
// }

// for icons collapse
const collapseElementList = document.querySelectorAll(".collapse");
const collapseList = [...collapseElementList].map(
  (collapseEl) => new bootstrap.Collapse(collapseEl)
);

// for Tax switch
let taxSwitch = document.getElementById("flexSwitchCheckChecked");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (let tax of taxInfo) {
    if (tax.style.display != "inline") {
      tax.style.display = "inline";
    } else {
      tax.style.display = "none";
    }
  }
});
