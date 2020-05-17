const registorValidate = require('../validator/registrationValidate')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const loginValidate = require('../validator/loginValidator')
const jwt = require('jsonwebtoken')

module.exports = {
    login: (req, res) => {
        const { email, password } = req.body
        let logValidate = loginValidate({ email, password })

        if (!logValidate.isValid) {
            res.status(400).json(logValidate.error)
            return
        }

        User.findOne({ email })
            // TODO: Populate
            .then(user => {
                if (!user) {
                    console.log(`${email} not found`)
                    res.json({
                        msg: `${email} not found`
                    })
                    return
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.status(400).json({
                            msg: 'Error occured'
                        })
                        return
                    }
                    if (!result) {
                        res.status(404).json({
                            msg: `Password doesn't match`
                        })
                        return
                    }
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        balance: user.balance,
                        income: user.income,
                        expense: user.expense,
                        transactions: user.transactions
                    }, 'SECRET', { expiresIn: '2h' })

                    res.status(200).json({
                        msg: 'Login successful',
                        token: `Bearer ${token}`
                    })

                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'Error occured'
                })
            })
    },
    registration: (req, res) => {
        let { name, email, password, confirmPassword } = req.body
        let validate = registorValidate({ name, email, password, confirmPassword })

        if (!validate.isValid) {
            res.status(400).json(validate.error)
        } else {
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        res.json({
                            msg: `${email} is already exist`
                        })
                    } else {
                        bcrypt.hash(password, 11, (err, hash) => {
                            if (err) {
                                res.status(500).json({
                                    msg: 'Server error occured'
                                })
                            }
                            let user = new User({
                                name,
                                email,
                                password: hash,
                                balance: 0,
                                income: 0,
                                expense: 0,
                                transactions: []
                            })
                            user.save()
                                .then(user => {
                                    res.status(201).json({
                                        msg: `Thanks ${name} for your registration`,
                                        user
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        msg: 'Error occured'
                                    })
                                })
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: 'Error occured'
                    })
                })
        }
    },
    allUsers: (req, res) => {
        User.find()
            .then(user => {
                res.status(200).json({
                    message: 'Got the all users',
                    user
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error occured'
                })
            })
    }
}