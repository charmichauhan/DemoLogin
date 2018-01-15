import React from 'react';
import { connect } from 'react-redux';
import { getById, logout} from "../actions/userActions";
import {bindActionCreators} from 'redux'

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            open: false,
        }
    }

    handleUser(_id){
        debugger
        const {user} = this.props;
        console.log('user', {user})
        debugger
        return (e) => getById(_id);
    }
    render() {
        const {user, users} = this.props

        return (
            <div className="col-md-6 col-md-offset-3">
                <button className="btn btn-primary" style={{position: 'absolute', top: '0px', right: '-300px'}}
                        onClick={ ()=> {this.props.logout()}}>LogOut</button>
                <br/><br/>
                <p>Welcome!! {user.user.username}</p>
                <br/>
                <p>Your Email Id is {user.user.email}</p>
                <br/>
                {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <div key={user._id}>
                            {this.handleUser(user._id)}
                        </div>
                    )}
                </ul>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    const {  users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getById, logout}, dispatch);
}
export default connect(mapStateToProps, {getById, logout} )(Dashboard)