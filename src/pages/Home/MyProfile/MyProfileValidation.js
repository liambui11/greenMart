function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone_pattern = /^\d{10}$/; // 10 chữ số

  if (!values.name || values.name.trim() === "") {
    error.name = "Name should not be empty";
  }

  if (!values.email || values.email.trim() === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email didn't match";
  }

  // if (!values.address || values.address.trim() === "") {
  //   error.address = "Address should not be empty";
  // }

  // if (!values.phone || values.phone.trim() === "") {
  //   error.phone = "Phone should not be empty";
  // } else if (!phone_pattern.test(values.phone)) {
  //   error.phone = "Phone must be exactly 10 digits";
  // }
  if (values.phone && values.phone.trim() !== "") {
    if (!phone_pattern.test(values.phone)) {
      error.phone = "Phone must be exactly 10 digits";
    }
  }

  return error;
}

export default Validation;
