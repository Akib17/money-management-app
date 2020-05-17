const router = require('express').Router()
const { create, getSingle, getAll, update, remove } = require('../controller/transactionController')
const authenticate = require('../authenticate')

// Get all transactions
// Route: /api/transaction
router.get('/', authenticate, getAll)

// Create new Transaction
// Route: /api/transaction --> POST request
router.post('/', authenticate, create)

// Get single Transaction
// Route: /api/transaction/:transactionId
router.get('/:transactionId', authenticate, getSingle)

// Update single Transaction
// Route: /api/transaction/:transactionId
router.put('/:transactionId', authenticate, update)

// Remove single Transaction
// Route: /api/transaction/:transactionId
router.delete('/:transactionId', authenticate, remove)

module.exports = router