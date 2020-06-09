import React from 'react';
import './App.css';
import {SingleItemComponent,ReduxSingleItemComponent} from './components/SingleItemComponent'


// import {BrowserRouter as Router} from 'react-router-dom'
// import {Route, Switch, useHistory, Redirect} from 'react-router';
// import { connect, Provider } from 'react-redux';

// interface IAppState {
//   loggedInUser : User | null;
// }


export class App extends React.Component<any, any>{


  // updateUser = (user:User | null) => {
  //   this.setState({
  //     loggedInUser : user,
  //   })
  // }

  // constructor(props:any){
  //   super(props);
  //   this.state = {
  //     loggedInUser:null
      
  //   }
  // }
  
  

  render(){
    return(
      <ReduxSingleItemComponent />
    )
  }
}

export default App;
