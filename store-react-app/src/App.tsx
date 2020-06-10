import React from 'react';
import './App.css';
import {Container, Row, Col}from'reactstrap';
import {ReduxSingleItemComponent} from './components/SingleItemComponent'
import { Cart } from './components/CartHoldingItems';
//import 'bootstrap/dist/css/bootstrap.min.css';//was not working for me this time

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
    return(<>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
        <Container>
          <Row>
            <Col sm="1"></Col>
            <Col sm="10">
              <h4>Project 2</h4>
              <p>We have some work to do!</p>
              <ReduxSingleItemComponent />
              <Cart/>
            </Col>
            <Col sm="1"></Col>
          </Row>
        </Container>
    </>)
  }
}

export default App;
