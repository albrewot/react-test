const checkValidity = (value, rules) => {
  let validity = {
    isValid: true,
    error: null,
  };

  if (rules.required) {
    validity.isValid = value.trim() !== "" && value.length && validity.isValid;
    validity.isValid ? (validity.error = null) : (validity.error = "This field is required");
  }

  if (rules.minLength) {
    validity.isValid = value.length >= rules.minLength && validity.isValid;
    validity.isValid
      ? (validity.error = null)
      : (validity.error = `A minimum of ${rules.minLength} characters are required`);
  }

  if (rules.maxLength) {
    validity.isValid = value.length <= rules.maxLength && validity.value;
    validity.isValid
      ? (validity.error = null)
      : (validity.error = `This field cannot exceed ${rules.maxLength} characters`);
  }

  if (rules.minValue) {
    validity.isValid = value >= rules.minValue;
    validity.isValid
      ? (validity.error = null)
      : (validity.error = `A minimum of ${rules.minValue} characters are required`);
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    validity.isValid = pattern.test(value) && validity.isValid;
    validity.isValid ? (validity.error = null) : (validity.error = "This field only allow numeric characters");
  }

  return validity;
};

export default checkValidity;
