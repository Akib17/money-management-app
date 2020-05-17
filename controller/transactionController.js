const Transaction = require('../models/TransactionModel')
const User = require('../models/userModel')

module.exports = {
    // Create a Transaction
    create: (req, res) => {
        const { amount, type, note } = req.body
        let userId = req.user._id
        let transaction = new Transaction({
            amount, type, note, author: userId
        })

        transaction.save()
            .then(trans => {
                let updateUser = { ...req.user._doc }
                if (type === 'income') {
                    updateUser.balance = updateUser.balance + parseInt(amount)
                    updateUser.income = updateUser.income + parseInt(amount)
                } else if (type === 'expense') {
                    updateUser.balance = updateUser.balance - parseInt(amount)
                    updateUser.expense = updateUser.expense + parseInt(amount)
                }
                updateUser.transactions.unshift(trans._id)
                User.findByIdAndUpdate(updateUser._id, { $set: updateUser }, { new: true })
                    .then(result => {
                        res.status(201).json({
                            message: 'Transaction successful',
                            ...trans._doc,
                            user: result
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: 'error occured '
                        })
                    })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Your transaction is unsuccessful'
                })
            })
    },
    // Get the all TRANSACTIONS
    getAll: (req, res) => {
        let { _id } = req.user
        Transaction.find({ author: _id })
            .then(transaction => {
                if (transaction.length === 0) {
                    res.status(404).json({
                        message: 'Sorry, No transaction found'
                    })
                } else {
                    res.status(200).json(transaction)
                }
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error occured'
                })
            })
    },
    // Get all TRANSACTIONs for single USER
    getSingle: (req, res) => {
        let { transactionId } = req.params
        Transaction.findById(transactionId)
            .then(transaction => {
                if (!transaction) {
                    res.status(400).json({
                        message: 'No transaction found'
                    })
                } else {
                    res.status(200).json({
                        message: 'Get your transaction',
                        transaction
                    })
                }
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error occured'
                })
            })
    },
    // Update single Transaction
    update: (req, res) => {
        let { transactionId } = req.params
        Transaction.findOneAndUpdate({ _id: transactionId }, { $set: req.body }, { new: true })
            .then(result => {
                res.status(200).json({
                    message: 'Transaction updated successfully',
                    transaction: result
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error occured. Please try again.'
                })
            })
    },
    // Delete transaction
    remove: (req, res) => {
        let { transactionId } = req.params
        Transaction.findOneAndDelete({ _id: transactionId })
            .then(result => {
                res.status(200).json({
                    message: 'Deleted successfully',
                    ...result._doc
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error occured'
                })
            })
    }
}