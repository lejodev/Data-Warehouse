let loginButton = document.querySelector(".button-send");
let userName = document.querySelector(".userName");
let password = document.querySelector(".password");
let url = "http://localhost:3000/user";
let userUrlLogin = url + "/login";

async function chekInput(userName, password) {
  if (userName == "" || password == "") {
    alert("empty input");
    return false;
  } else {
    let requestBody = {
      userName: userName,
      password: password,
    };

    fetch(userUrlLogin, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(requestBody),
    })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.text();
        } else {
          alert("User not registered");
          return Promise.reject(new Error('User not found'));
        }
      })
      .then((token) => {
        localStorage.setItem("accessToken", token);
        alert('User exists!')
        console.log(token);
      })
      .catch((err) => {
        console.log("ERR:" + err);
      });
    alert("After fetch");
  }
}

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  chekInput(userName.value, password.value);
});
