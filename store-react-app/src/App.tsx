import React, { useState } from 'react';
import {Container, Row, Col, Navbar, NavbarToggler, Nav, NavItem}from'reactstrap';
import {ReduxSingleItemComponent} from './components/SingleItemComponent'
import { CheckoutPage } from './components/CheckoutPage';
import {  BrowserRouter, Route, Switch,NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ItemListComponent } from './components/ItemListComponent';
//import 'bootstrap/dist/css/bootstrap.min.css';//was not working for me. rene

/*
    These may need to be installed in gitbash if the page looks bad or breaks
    npm i @types/reactstrap
    npm i react-router
    npm i react-router-dom
    npm i bootstrap
*/

// import {Route, Switch, useHistory, Redirect} from 'react-router';
// import { connect, Provider } from 'react-redux';

// interface IAppState {
//   loggedInUser : User | null;
// }

import book17 from "./books-item-17.jpg"
import book18 from "./books-item-18.jpg"
import { Item } from './models/Item';

export let theCart:number[]=[1,7,13] //the item Ids

export class App extends React.Component<any, any>
{

  // updateUser = (user:User | null) => {
  //   this.setState({
  //     loggedInUser : user,
  //   })
  // }

  constructor(props:any){
    super(props);
    // this.state = {
    //   loggedInUser:null
      
    // }
  }

  toggleNavbar=()=>
  {
      const[isOpen,setIsOpen]=useState(false)
      setIsOpen(!isOpen)
  }

  render(){
    return(<>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
        <Container>
          <Row>
            <Col sm="1"></Col>

            <Col sm="10">
              <h4>Project 2</h4>
              <p>We have some work to do!</p>

              
                <BrowserRouter>
                  <Navbar color='light' light expand='md'>
                    <NavbarToggler onClick={this.toggleNavbar}/>
                    <Nav className='mr-auto' tabs>
                      <NavEasy href='/view' display='View Items'/>
                      <NavEasy href='/checkout' display='Checkout'/>
                      <NavEasy href='/viewitem' display='View single item'/>
                    </Nav>
                  </Navbar>

                  <Switch>
                    <Route path="/view">
                      <ItemListComponent loggedInUser={null}/>
                    </Route>

                    <Route path="/checkout">
                      <CheckoutPage/>
                    </Route>
                    <Provider store={store}>
                    
                      <Route path="/viewitem">
                        <ReduxSingleItemComponent /> 
                      </Route>
                    </Provider>
                    
                  </Switch>

                </BrowserRouter>
            </Col>

            <Col sm="1"></Col>
          </Row>
        </Container>
    </>)
  }
}

function NavEasy(props:any)
{
    return(
        <NavItem>
            <NavLink to={props.href} className='nav-link' activeClassName='active'>{props.display}</NavLink>
        </NavItem>
    )
}

export default App;
