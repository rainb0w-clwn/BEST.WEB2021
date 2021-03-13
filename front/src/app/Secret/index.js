import React, { Component } from 'react';
import {Route, Redirect,} from 'react-router-dom';

export default class Secret extends Component {
    constructor() {
        super();
        //Set default message
        this.state = {
            message: 'Loading...'
        }
    }

    componentDidMount() {
        //GET message from server using fetch api
        fetch('/api/secret')
            .then(res => res.text())
            .then(res => this.setState({message: res}));
    }

    function SecretRoute({children, ...rest}) {
        return (
            <Route {...rest} render={({location}) => {
                return fakeAuth.isAuthenticated === true
                    ? children
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }} />
            }}/>
        )
    }
};
// render() {
    //    return (
     //       <div>
     //           <h1>Secret</h1>
      //          <p>{this.state.message}</p>
       //     </div>
       // );
  //  }
//}
