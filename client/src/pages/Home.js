import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/authAction';

class Home extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h2 className="display-4 mb-4">Home</h2>
                    {
                        this.props.auth.isAuthenticated ? <button onClick={() => this.props.logout(this.props.history)} className="btn btn-danger">Logout</button> : <Link to='/login'><button className="btn btn-info">Login</button></Link>
                    },
                    {this.props.auth.isAuthenticated && <Link to='/dashboard'><button className="btn btn-info mx-3">Dashboard</button></Link>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Home);