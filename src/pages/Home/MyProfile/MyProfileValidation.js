function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.name || values.name.trim() === "") {
        error.name = "Name should not be empty";
    }

    if (!values.email || values.email.trim() === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email didn't match";
    }

    if (!values.address || values.address.trim() === "") {
        error.address = "Address should not be empty";
    }

    if (!values.phone || values.phone.trim() === "") {
        error.phone = "Phone should not be empty";
    }

    return error;
}

export default Validation;
