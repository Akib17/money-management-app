import React, { Component } from 'react';
import Modal from 'react-modal'
import { updateTransaction } from '../../store/actions/transactionAction';
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

class UpdateTransaction extends Component {
    constructor() {
        super()
        this.state = {
            amount: '',
            note: ''
        }
    }

    componentDidMount() {
        this.setState({
            amount: this.props.transaction.amount,
            note: this.props.transaction.note
        })
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.updateTransaction(this.props.transaction._id, this.state)
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
                        <label htmlFor="note">Note</label>
                        <textarea className="form-control" onChange={this.onChangeHandler} name="note" id="note" rows="4" placeholder="Your note" value={note} ></textarea>
                    </div>
                    <input type="submit" className="btn btn-info" />
                </form>
            </Modal>
        );
    }
}

export default connect(null, { updateTransaction })(UpdateTransaction);