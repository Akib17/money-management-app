import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTransactions, removeTransaction } from '../store/actions/transactionAction';
import { logout } from '../store/actions/authAction';
import CreateTransaction from '../components/transaction/CreateTransaction';
import UpdateTransaction from '../components/transaction/UpdateTransaction';

class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            modalIsOpen: false,
            updateModalOpen: false,
            id: ''
        }
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        })
    }

    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            id: ''
        })
    }

    componentDidMount() {
        this.props.loadTransactions()
    }

    render() {
        const { auth, transactions } = this.props
        return (
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div>
                        <h1 className="font-weight-normal">Welcome to {auth.user.name} </h1>
                        <h5 className="lead">Your email is {auth.user.email}</h5>
                        <br /><br />
                        <button onClick={this.openModal} className="btn btn-info">Create transaction</button>
                        <CreateTransaction
                            isOpen={this.state.modalIsOpen}
                            close={this.closeModal}
                        ></CreateTransaction>
                        <br /><br />
                        {/* <div className="card border-0">
                            <button className="btn btn-outline-info w-50">Total Balance: {auth.user.balance}</button>
                            <br />
                            <button className="btn btn-outline-success w-50">Total Income: {auth.user.income}</button>
                            <br />
                            <button className="btn btn-outline-danger w-50">Total Expense : {auth.user.expense}</button>
                        </div> */}
                    </div>

                    <br /><br />
                    <h2>Transactions</h2>
                    <ul className="list-group">
                        {
                            transactions.map(transaction => (
                                <li key={transaction._id} className="list-group-item" >
                                    <h5 className="font-weight-normal">Amount: {transaction.amount}</h5>
                                    <div className={transaction.type === 'income' ? "badge badge-success" : "badge badge-danger"}> {transaction.type} </div>
                                    {
                                        this.state.id === transaction._id ?
                                            <UpdateTransaction
                                                isOpen={this.state.updateModalOpen}
                                                close={this.closeUpdateModal}
                                                transaction = {transaction}
                                            ></UpdateTransaction> :
                                            null
                                    }
                                    <p className="lead"> Note: {transaction.note} </p>
                                    <button onClick={() => this.props.removeTransaction(transaction._id)} className="btn btn-sm btn-danger">Remove</button>
                                    <button onClick={() => this.openUpdateModal(transaction._id)} className="btn btn-success btn-sm mx-3">Update</button>
                                </li>
                            ))
                        }
                    </ul>
                    <br /><br />
                    <button onClick={() => this.props.logout(this.props.history)} className="btn btn-danger">Logout</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { loadTransactions, logout, removeTransaction })(Dashboard);