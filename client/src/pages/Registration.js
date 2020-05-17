import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { register } from '../store/actions/authAction'

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
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
        let { name, email, password, confirmPassword } = this.state
        this.props.register({ name, email, password, confirmPassword }, this.props.history)
    }

    render() {
        let { name, email, password, confirmPassword, error } = this.state
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h2 className="display-4 my-3 text-center">Register here</h2>
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className={error.name ? "form-control is-invalid" : "form-control"} placeholder='Enter your name' id='name' name='name' value={name} onChange={this.changeHandler} />
                            <div className="invalid-feedback">
                                {error.name}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className={error.email ? "form-control is-invalid" : "form-control"} placeholder='Enter your email' id='email' name='email' value={email} onChange={this.changeHandler} />
                            <div className="invalid-feedback">
                                {error.name}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className={error.password ? "form-control is-invalid" : "form-control"} placeholder='Enter your password' id='password' name='password' value={password} onChange={this.changeHandler} />
                            <div className="invalid-feedback">
                                {error.password}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" className={error.confirmPassword ? "form-control is-invalid" : "form-control"} placeholder='Confirm your password' id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={this.changeHandler} />
                            <div className="invalid-feedback">
                                {error.confirmPassword}
                            </div>
                        </div>
                        <Link to='/login'>Already have an account? Login here</Link>
                        <button className="btn btn-info mt-3 d-block">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { register })(Registration);