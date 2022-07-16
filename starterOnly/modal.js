function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
formData[0].setAttribute(
  "data-error",
  "Saisissez un prénom d'au moins 2 lettres."
);
formData[1].setAttribute(
  "data-error",
  "Saisissez un nom d'au moins 2 lettres."
);
formData[2].setAttribute("data-error", "Saisissez une adresse e-mail valide.");
formData[3].setAttribute(
  "data-error",
  "Saisissez une date de naissance non postérieure à aujourd'hui."
);
formData[4].setAttribute(
  "data-error",
  "Saisissez un nombre de tournois valide."
);
formData[5].setAttribute(
  "data-error",
  "Vous devez choisir un lieu de tournoi."
);
formData[6].setAttribute(
  "data-error",
  "Prenez connaissance des conditions d'utilisation."
);

const closeModalBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const termsOfUseInput = document.getElementById("checkbox1");
termsOfUseInput.removeAttribute("checked");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeModalBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// verify inputs

submitBtn.addEventListener("click", verifyInputs);

function testFirstName() {
  if (
    /^[\w'\-,.][^0-9._!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(
      firstNameInput.value
    )
  ) {
    formData[0].setAttribute("data-error-visible", "false");
    return true;
  }
  formData[0].setAttribute("data-error-visible", "true");
  return false;
}

function testLastName() {
  if (
    /^[\w'\-,.][^0-9._!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(
      lastNameInput.value
    )
  ) {
    formData[1].setAttribute("data-error-visible", "false");
    return true;
  }
  formData[1].setAttribute("data-error-visible", "true");
  return false;
}

function testEmail() {
  if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailInput.value
    )
  ) {
    formData[2].setAttribute("data-error-visible", "false");
    return true;
  }
  formData[2].setAttribute("data-error-visible", "true");
  return false;
}

function testBirthdate() {
  const birthDate = new Date(birthdateInput.value)

  if (birthdateInput.value && birthDate < Date.now()) {
    formData[3].setAttribute("data-error-visible", "false");
    return true;
  }
  formData[3].setAttribute("data-error-visible", "true");
  return false;
}

function testQuantity() {
  if (/^[0-9]\d*$/.test(quantityInput.value)) {
    formData[4].setAttribute("data-error-visible", "false");
    return true;
  }
  formData[4].setAttribute("data-error-visible", "true");
  return false;
}

function testLocation() {
  const locationValue = document.forms["reserve"]["location"].value;

  if (locationValue) {
    formData[5].setAttribute("data-error-visible", "false");
    return true;
  }

  formData[5].setAttribute("data-error-visible", "true");

  return false;
}

termsOfUseInput.addEventListener("click", setTermsOfUse);

function setTermsOfUse() {
  if (termsOfUseInput.attributes[3]) {
    termsOfUseInput.removeAttribute("checked");
  } else {
    termsOfUseInput.setAttribute("checked", "");
  }
}

function testTermsOfUse() {
  if (termsOfUseInput.attributes[3]) {
    formData[6].setAttribute("data-error-visible", "false");
    return true;
  }
  formData[6].setAttribute("data-error-visible", "true");
  return false;
}

function verifyInputs(e) {
  e.preventDefault();
  testFirstName();
  testLastName();
  testEmail();
  testBirthdate();
  testQuantity();
  testLocation();
  testTermsOfUse();

  // confirmation message

  if (
    testFirstName() &&
    testLastName() &&
    testEmail() &&
    testBirthdate() &&
    testQuantity() &&
    testLocation() &&
    testTermsOfUse()
  ) {
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = `
                          <p style="text-align: center; margin-bottom: 100px; margin-top:100px">
                            Merci pour <br/> votre inscription
                          </p>
                          <button class="modal-btn" id="closeConfirmationModal">
                          Fermer
                          </button>`;
  }

  const closeConfirmationModal = document.getElementById(
    "closeConfirmationModal"
  );

  closeConfirmationModal.addEventListener("click", closeModal);
}
