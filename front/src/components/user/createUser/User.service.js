const url = "http://localhost:3080/user";

function createUser(user) {
  const requestBody = JSON.stringify(user);

  fetch(url, {
    method: "POST",
    // mode: "cors",
    body: requestBody,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        console.log("=======RESP=======");
        console.log(resp);
        // throw Error(resp.json()); TO-DO Handling with eeror response
      }
      return resp.json();
    })
    .then((resp) => resp.message)
    .then((message) => {
      alert(message);
    })
    .catch((err) => {
      console.log(err);
      const errorMessage = err.errors[0].message;
      alert(errorMessage);
    });
}

function validateForm(user, validatePass) {
  // TODO: validate form data
  // 1. Validate mandatory fields
  const formIsValid = true;
  // (x) 2. Validate password
  const passMatch = user.password === validatePass;

  return formIsValid && passMatch;
}

export { createUser, validateForm };
