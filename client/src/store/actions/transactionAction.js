import Axios from "axios";
import * as Types from './types'

export const loadTransactions = () => dispatch => {
    Axios.get('/api/transaction')
        .then(res => {
            dispatch({
                type: Types.LOAD_TRANSACTIONS,
                payload: {
                    transactions: res.data
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
}

export const createTransaction = transaction => dispatch => {
    Axios.post('/api/transaction', transaction)
        .then(res => {
            dispatch({
                type: Types.CREATE_TRANSACTION,
                payload: {
                    transaction: res.data
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const removeTransaction = id => dispatch => {
    Axios.delete(`/api/transaction/${id}`)
        .then(res => {
            dispatch({
                type: Types.REMOVE_TRANSACTION,
                payload: {
                    id: res.data._id
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const updateTransaction = (id, transaction) => dispatch => {
    Axios.put(`/api/transaction/${id}`, transaction)
        .then(res => {
            dispatch({
                type: Types.UPDATE_TRANSACTION,
                payload: {
                    transaction: res.data.transaction
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
}