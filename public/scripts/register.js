const validatePass = (pass,confirmPassword) => {
  return pass === confirmPassword;
}

const getValidatedFormFields = () => {
  const email = $("#email").val();
  const username = $("#name").val();
  const password = $("#pw").val();
  const confirmPassword = $("#pw2").val();
  if(email !== "" && username !== "" && password !== "" && validatePass(password,confirmPassword)){
    return {email,username,password};
  }
  return {};
}

const flashError = (error) => {
  const errorPopup = $("#errorMsg");
  errorPopup.find("p").text(error);
  errorPopup.toggle();
  setTimeout(() => errorPopup.toggle(), 1500);
}


const flashSuccessAndRedirect = () => {
  const successPopup = $("#successMsg");
  successPopup.toggle();
  setTimeout( () => {
    successPopup.toggle();
    window.location.href = "/";
  }, 1500);
}

$("#registration").submit( event => {
  event.preventDefault();
  event.stopPropagation();
  if( !jQuery.isEmptyObject(getValidatedFormFields()) ){
    fetch("/register", {
      method:"post",
      body: JSON.stringify(getValidatedFormFields()),
      headers: new Headers({ "Content-Type": "application/json" })
    })
    .then( response => {
      if(response.status === 200){
        flashSuccessAndRedirect();
      }else{
        flashError("Username or email already exists!");
      }
    })
  }

})
