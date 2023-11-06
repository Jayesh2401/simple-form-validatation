import validator from "validator";

const Validator = (details) => {
  const errors = {};

  let date = new Date().getFullYear();
  const month = details.credityear.slice(0, 2);
  const year = details.credityear.slice(3);

  if (validator.isEmpty(details.name)) errors.name = "Please enter your name.";
  if (details.name.trim() === "") {
    errors.name = "Please enter your name.";
  }

  if (validator.isEmpty(details.email)) {
    errors.email = "Please enter your email.";
  } else if (!validator.isEmail(details.email)) {
    errors.email = "Please provide valid email.";
  }

  if (validator.isEmpty(details.phone)) {
    errors.phone = "Please enter your number.";
  } else if (details.phone.length < 10) {
    errors.phone = "Please provide Valid number.";
  } else if (!validator.isNumeric(details.phone)) {
    errors.phone = "Invalid phone number";
  } else if (details.phone.length > 16) {
    errors.phone = "Please provide Valid number.";
  }

  if (validator.isEmpty(details.address))
    errors.address = "Please enter your address.";

  if (details.address.trim() === "") {
    errors.address = "Please enter your address.";
  }

  if (validator.isEmpty(details.city)) errors.city = "Please select your city.";

  if (validator.isEmpty(details.state))
    errors.state = "Please select your state.";

  if (validator.isEmpty(details.country))
    errors.country = "Please select your country.";

  if (validator.isEmpty(details.zipCode)) {
    errors.zipCode = "Please enter your zipcode";
  } else if (details.zipCode.length < 6) {
    errors.zipCode = "Please provide correct zipcode";
  } else if (!validator.isNumeric(details.zipCode)) {
    errors.zipCode = "Please enter valid zipcode.";
  }

  if (details.image === "") {
    errors.image = "Please upload your file";
  }

  if (validator.isEmpty(details.category))
    errors.category = "Please select photo contest";

  if (validator.isEmpty(details.cardName))
    errors.cardName = "Please enter Your name on card";

  if (details.cardName.trim() === "") {
    errors.cardName = "Please enter Your name on card";
  }

  if (
    validator.isEmpty(details.creditNo && details.cvc && details.credityear)
  ) {
    errors.creditNo = "Please enter your card details";
  } else if (details.creditNo.length !== 16) {
    errors.creditNo = "Please enter valid card details";
  } else if (!validator.isNumeric(month)) {
    errors.creditNo = "Please enter valid card details";
  } else if (details.cvc.trim() === "") {
    errors.creditNo = "Please enter valid card details";
  } else if (year < date) {
    errors.creditNo = "Invalid Year";
  } else if (details.cvc.length < 3) {
    errors.creditNo = "Invalid cvv";
  } else if (month > 12) {
    errors.creditNo = "Invalid month";
  } else if (year > date + 15) {
    errors.creditNo = "Invalid Year";
  } else if (!validator.isNumeric(year)) {
    errors.creditNo = "Please enter valid card details";
  } else if (details.credityear.slice(2, 3) !== "/") {
    errors.creditNo = "Please enter valid card details //";
  }

  if (details.checked === false) {
    errors.checked = "Please accept terms and conditons.";
  }

  return { errors, noErrors: Object.keys(errors).length <= 0 };
};

export default Validator;
