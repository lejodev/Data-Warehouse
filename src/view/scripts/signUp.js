let _name = document.querySelector(".name"),
  lastName = document.querySelector(".lastName"),
  email = document.querySelector(".email"),
  profile = document.querySelector(".profile"),
  password = document.querySelector(".password"),
  repeatPassword = document.querySelector(".repeatPassword"),
  btn_create = document.querySelector(".lastName");

const url = "http://localhost:3000/user";

function checkInput(_name, lastName, email, profile, password, repeatPassword) { // Make single JSON param instead a bunch of data
  if (
    _name == "" ||
    lastName == "" ||
    email == "" ||
    profile == "" ||
    password == "" ||
    repeatPassword == ""
  ) {
    alert("Incomplete input");
    return false;
  } else {
    if (password == repeatPassword) {
      alert("Same password");
      makeRequest({
        _name: _name,
        lastName: lastName,
        email: email,
        profile: profile,
        password: password,
      });
    } else {
      alert("Passwords doesn´t match");
    }
  }
}

function makeRequest(obj) {
  const requestBody = JSON.stringify(obj);

  fetch(url, {
    method: "POST",
    mode: "cors",
    body: requestBody,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => {
      console.log(resp.status);
      if (resp.status === 200) {
        return resp.text();
      } else {
        return Promise.reject(new Error("Bad request"));
      }
    })
    .then((message) => {
      alert(message);
    })
    .catch((err) => {
      alert("ERROR" + err);
    });
}

(btn_create = document.querySelector(".button-send")),
  btn_create.addEventListener("click", (e) => {
    e.preventDefault();
    checkInput(
      _name.value,
      lastName.value,
      email.value,
      profile.value,
      password.value,
      repeatPassword.value
    );
  });
