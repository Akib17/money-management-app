const validator = require('validator')

const loginValidate = user => {
    let error = {}

    // Name validate
    if (!user.name) {
        error.name = 'Please provide your name'
    }

    // Email validator
    if (!user.email) {
        error.email = 'Please provide an Email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please provide a valid Email'
    }

    // Password validate
    if (!user.password) {
        error.password = 'Please provide a password'
    } else if (user.password.length < 6) {
        error.password = 'Password Must be greater or Equal to 6 characters'
    }

    // Confirm password
    if (!user.confirmPassword) {
        error.confirmPassword = 'Please provide a confirm password'
    } else if (user.password !== user.confirmPassword) {
        error.confirmPassword = 'Password & confirmation password doesn\'t match'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = loginValidate