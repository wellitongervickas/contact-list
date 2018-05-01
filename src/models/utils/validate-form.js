const validateForm = (() => {

  function isValidEmail(email) {

    email = email.trim();

    let regExpCode = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'g')
		return regExpCode.test(email)
  }

  function isEmpty(value) {
    return (value && value.length > 0) ? true : false;
  }

  return {
    isValidEmail,
    isEmpty
  };

})();

export default validateForm;
