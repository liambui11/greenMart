function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/



    if (values.name === "") {
        error.name = "Name should not be empty"
    }
    else {
        error.name = ""
    }

    if (values.email === "") {
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
        console.log(values.email)
    }
    else {
        error.email = ""
    }


    if (values.address === "") {
        error.address = "Address should not be empty"
    }
    else {
        error.address = ""
    }

    if (values.phone === "") {
        error.phone = "Phone should not be empty"
    }
    else {
        error.phone = ""
    }

    return error;
}

export default Validation;