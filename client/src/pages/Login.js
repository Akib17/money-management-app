import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../store/actions/authAction';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.auth.error
            }
        }
        return null
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.login({
            email: this.state.email,
            password: this.state.password
        }, this.props.history)
    }
    
    render() {
        let { email, password, error } = this.state
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h2 className="display-4 my-3 text-center">Login here</h2>
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className={error.email ? "form-control is-invalid" : "form-control"} placeholder='Enter your email' id='email' name='email' value={email} onChange={this.changeHandler} />
                            <div className="invalid-feedback">
                                {error.email}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className={error.password ? "form-control is-invalid" : "form-control"} placeholder='Enter your password' id='password' name='password' value={password} onChange={this.changeHandler} />
                            <div className="invalid-feedback">
                                {error.password}
                            </div>
                        </div>
                        <Link to='/registration'>Don't have any account? Register here</Link>
                        <button className="btn btn-info mt-3 d-block">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login})(Login);