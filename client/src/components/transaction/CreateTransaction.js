import React, { Component } from 'react';
import Modal from 'react-modal'
import { createTransaction } from '../../store/actions/transactionAction';
import { connect } from 'react-redux';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    }
};

class CreateTransaction extends Component {
    constructor() {
        super()
        this.state = {
            amount: '',
            type: '',
            note: ''
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.createTransaction(this.state)
        this.setState({
            amount: 0,
            type: '',
            note: ''
        })
        this.props.close()
    }

    render() {
        let amount = this.state.amount
        let note = this.state.note
        return (
            <Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.open}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input onChange={this.onChangeHandler} type="number" className="form-control" id="amount" placeholder="Enter amount" value={amount} name="amount" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select onChange={this.onChangeHandler} name="type" id="type" className="form-control" >
                            <option>Select a type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Note</label>
                        <textarea className="form-control" onChange={this.onChangeHandler} name="note" id="note" rows="4" placeholder="Your note" value={note} ></textarea>
                    </div>
                    <input type="submit" className="btn btn-info" />
                </form>
            </Modal>
        );
    }
}

export default connect(null, { createTransaction })(CreateTransaction);