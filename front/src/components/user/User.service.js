const url = "http://localhost:3000/user";

function createUser(user) {
    const requestBody = JSON.stringify(user);
  
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

  function validateForm(user, validatePass) {
    // TODO: validate form data
    // 1. Validate mandatory fields
    const formIsValid = true;
    // (x) 2. Validate password 
    const passMatch = user.password === validatePass;
    
    return formIsValid && passMatch;
  }

  export {
      createUser,
      validateForm
    };