import React, { useState } from 'react';
import {Container, Row, Col, Navbar, NavbarToggler, Nav, NavItem}from'reactstrap';
import {ReduxSingleItemComponent} from './components/SingleItemComponent'
import { CheckoutPage, ReduxCheckoutPage } from './components/CheckoutPage';
import {  BrowserRouter, Route, Switch,NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ReduxItemListComponent } from './components/ItemListComponent';
import {User} from './models/User';
import { LoginComponent } from './components/LoginComponent';
import { login } from './api/StoreClient';
import { prnt } from './Helpers';
import { CreateUserComponent } from './components/CreateUserComponent';
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

interface IAppState {
  loggedInUser : User | null;
}

export class App extends React.Component<any, any>
{
  updateUser = (user:User | null) => {
    this.setState({
      loggedInUser : user,
    })
  }

  constructor(props:any){
    super(props);
    this.state = {
      loggedInUser:null //Maybe this should be in redux so it's global?
    }
  }

  async componentDidMount()
  {
    //prnt(true,`App componentDidMount() was reached`)
    //automatically log in so I don't have to type it in a million times
    //comment out to disable
    const loggedInUser  = await login("user","user");
    this.updateUser(loggedInUser)
    //prnt(true,`App this.props.items=`,this.props.items)

    //trying to add items to the cart for testing
    //this.props.addClickActionMappper(clickedItem, undefined);
  }

  toggleNavbar=()=>
  {
      const[isOpen,setIsOpen]=useState(false)
      setIsOpen(!isOpen)
  }

  render()
  {
    let jsxPage=(<></>)//the content of the page will go in this variable

    if(this.state.loggedInUser == null)
    {
      jsxPage=(<>
        <BrowserRouter>
        <Switch>
          <Route path='/'>
            <LoginComponent updateUser={this.updateUser}/>
          </Route>
        </Switch>
        </BrowserRouter>
      </>)
    } 
    else
    {
      jsxPage=(<>
        <BrowserRouter>
          <Navbar color='light' light expand='md'>
            <NavbarToggler onClick={this.toggleNavbar}/>
            <Nav className='mr-auto' tabs>
              <NavEasy href='/view'     display='View Items'/>
              <NavEasy href='/checkout' display='Checkout'/>
              <NavEasy href='/viewitem' display='View single item'/>
              <NavEasy href='/newuser'  display='New User'/>
            </Nav>
          </Navbar>

          <Switch>
            <Provider store={store}>
              <Route path="/view">
                <ReduxItemListComponent />
              </Route>

              <Route path="/checkout">
                <ReduxCheckoutPage parentState={this.state}/>
              </Route>

              <Route path="/viewitem">
                <ReduxSingleItemComponent /> 
              </Route>

              <Route path='/newuser'>
                <CreateUserComponent/>
              </Route>
            </Provider>
          </Switch>
        </BrowserRouter>
    </>)
    }
    
    return(<>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
      <Container>
        <Row>
          {/* <Col sm="10"> */}
          <Col sm={{size:10}}>
            <h4>Project 2</h4>
            <p>We are getting stuff done!</p>
            {jsxPage}
          </Col>
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
