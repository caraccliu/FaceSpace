import React from 'react';
var AccountComponent = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            name : "",
            Message : "",
        }
    },

    handleNameChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ name : e.target.value , Message : "..."});
    },

    handleSubmit(e) {
        // Prevents reinitialization
        e.preventDefault();
        let name = this.state.name;
        fetch('http://localhost:8080/AccountCreation/createAccount?'
            + 'userName=' + name , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
            this.setState({Message: 'Account:'+name+' created!'});
        }
    else{
            this.setState({Message: 'Account:'+name+' was already taken!'});
        }
    })
    },

    render () {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
    <label>
        <input type="text" defaultValue={this.state.name} onChange={this.handleNameChange}/>
    </label>
        <input type="submit" value="Create Account!" />
            </form>
            Name: {this.state.name}
    <br/>
        Message: {this.state.Message}
    </div>
    );
    }
});

export class AccountCreation extends React.Component {

    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <AccountComponent/>
            </div>
        );
    }
}
