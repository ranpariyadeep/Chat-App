// lenth check    and username exist or not
function pruefe(input) {
  const username = input.value;

  if (input.value.length >= 3) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    console.log("Username valid lenth");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    console.log("Username must be at least 3 characters long.");
    return; // Stoppt Funktion wenn Username zu kurz
  }

  userExists(username, function (exists) {
    if (exists) {
      console.log("Username already exists.");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    } else {
      console.log("Username is available");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });
}



function pruefePassword(input) {
  const password = input.value.trim();

  if (password.length < 8) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    console.log("Password must be at least 8 characters long.");
    return; // Stoppt Funktion wenn Passwort zu kurz
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }

}

function pruefeConfirmPassword(input) {
  const confirmPassword = input.value.trim();
  const password = document.getElementById("regPassword").value.trim();
  if (confirmPassword !== password) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    console.log("Passwords do not match.");
    return; // Stoppt Funktion wenn Passwörter nicht übereinstimmen
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}



const serverURL = "https://online-lectures-cs.thi.de/chat/";
const collectionID = "48e272e3-a740-4b6c-b9f0-971d0bf610f0";
const tokenTom =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNzMyMDAyMTYyfQ.QBsV4U2bLsTsq3jJQAMR4z6UJKQ8NdwP3QABY3V0-ko";

function userExists(username, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 204) {
        console.log("Exists");
        callback(true);
      } else if (xmlhttp.status == 404) {
        console.log("Does not exist");
        callback(false);
      }
    }
  };
  xmlhttp.open(
    "GET",
    `https://online-lectures-cs.thi.de/chat/d9b941eb-3d65-418d-bc00-e3f73ea0b291/user/${username}`,
    true
  );
  xmlhttp.send();
}

function validateForm(event) {
  const usernameInput = document.getElementById("regUsername");
  const passwordInput = document.getElementById("regPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const isUsernameValid = usernameInput.classList.contains("is-valid");
  const isPasswordValid = passwordInput.classList.contains("is-valid");
  const isConfirmPasswordValid =
    confirmPasswordInput.classList.contains("is-valid");

    

  if (!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid) {
    event.preventDefault();
    console.log("Formular abschicken verhindert!");
    return false;
  }
  console.log("Form erfolgreich abgeschickt!");
  return true;
}

function check(input){

}

// function updatValidation(elementId, isValid){
//   const element = document.getElementById(elementId);
//   const icon = element.querySelector("i");

//   if(isValid){
//    element.classList.remove("invalid");
//    element.classList.add("valid");
//    icon.classList.remove("bi-shield-X");
//    icon.classList.add("bi-shield-check");
//   }else{
//    element.classList.remove("valid");
//    element.classList.add("invalid");
//    icon.classList.remove("bi-shield-check");
//    icon.classList.add("bi-shield-x");
//   }

//  }
