import React, { useState } from 'react';
import {Container, Row, Col, Navbar, NavbarToggler, Nav, NavItem, Dropdown, DropdownToggle, DropdownItem, DropdownMenu}from'reactstrap';
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
import { ReduxCartComponent } from './components/CartComponent';
import NavbarComponent from './components/NavbarComponent';
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
      loggedInUser:null
    }
  }

  async componentDidMount()
  {
    //prnt(true,`App componentDidMount() was reached`)
    //automatically log in so I don't have to type it in a million times
    //comment out to disable
    // const loggedInUser  = await login("user","user");
    // this.updateUser(loggedInUser)
    //prnt(true,`App this.props.items=`,this.props.items)

    //trying to add items to the cart for testing
    //this.props.addClickActionMappper(clickedItem, undefined);
  }

  toggleNavbar=()=>
  {
      const[isOpen,setIsOpen]=useState(false)
      setIsOpen(!isOpen)
  }

  
 

  render(){

  
  {
   

    if(this.state.loggedInUser == null)
    {
      return(
        <BrowserRouter>
        <Switch>
          <Route path='/'>
            <LoginComponent updateUser={this.updateUser}/>
          </Route>
        </Switch>
        </BrowserRouter>
      )
    } 
    else
    {
      return(
        <BrowserRouter>
          {/* <Navbar color='light' light expand='md'>
            <NavbarToggler onClick={this.toggleNavbar}/>
            <Nav className='mr-auto' tabs>

                        <NavItem>
                                <NavLink to="/home">Home</NavLink>
                            </NavItem>
              <NavEasy href='/view'     display='View Items'/>
              <NavEasy href='/checkout' display='Checkout'/>
              <NavEasy href='/viewitem' display='View single item'/>
              <NavEasy href='/newuser'  display='New User'/>
            </Nav>
          </Navbar> */}
          <NavbarComponent/>

          <Switch>
            <Provider store={store}>
              <Route path="/view">
                <ReduxItemListComponent />
              </Route>
              </Provider>

              <Provider store={store}>
              <Route path="/checkout">
                <ReduxCheckoutPage/>
              </Route>
              </Provider>

              <Provider store={store}>
              <Route path="/viewitem">
                <ReduxSingleItemComponent /> 
              </Route>
              </Provider>

              <Route path='/newuser'>
                <CreateUserComponent/>
              </Route>

            </Switch>
            </BrowserRouter>
          )
          
    } 
    }
    
   
  }
}

{/* // function NavEasy(props:any)
// {
//     return(
//         <NavItem>
//             <NavLink to={props.href} className='nav-link' activeClassName='active'>{props.display}</NavLink>
//         </NavItem>
//     )
// } */}


