import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/authAction'

class Navigation extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to='/'>
                    <a class="navbar-brand" href="#">MoneyApp</a>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">

                        <NavLink to='/' activeClassName="active" exact>
                            <a class="nav-link" href="#">Home</a>
                        </NavLink>
                        {
                            this.props.auth.isAuthenticated ?
                                <React.Fragment>
                                    <NavLink to='/dashboard' activeClassName="active" exact>
                                        <a class="nav-link" href="#">Dashboard</a>
                                    </NavLink>
                                    <button onClick={() => this.props.logout(this.props.history)} className="btn btn-danger">Logout</button>
                                </React.Fragment> :
                                <React.Fragment>
                                    <NavLink to='/login' activeClassName="active" exact>
                                        <a class="nav-link" href="#">Login</a>
                                    </NavLink>
                                    <NavLink to='/registration' activeClassName="active" exact>
                                        <a class="nav-link" href="#">Register</a>
                                    </NavLink>
                                </React.Fragment>
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(withRouter(Navigation))