import React, { useState } from 'react';
import {Container, Row, Col, Navbar, NavbarToggler, Nav, NavItem, Dropdown, DropdownToggle, DropdownItem, DropdownMenu}from'reactstrap';
import {ReduxSingleItemComponent} from './components/SingleItemComponent'
import { CheckoutPage, ReduxCheckoutPage } from './components/CheckoutPage';
import {  BrowserRouter, Route, Switch,NavLink, Redirect } from 'react-router-dom';
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
import { ViewOneOrderAndItems } from './components/ViewOneOrderAndItems';
import { ProfileComponent } from './components/ProfileComponent';
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

    //test area. comment out to not use
    // return(<>
    //   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
    //   <h4>Test Area</h4>
    //   <ViewOneOrderAndItems orderId={18}/>
    // </>)
  
    if(this.state.loggedInUser == null)
    {
      return(<>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
        <BrowserRouter>
          <Switch>
          <Route path='/newuser'>
                <CreateUserComponent/>
              </Route>
              
            <Route path='/'>
              <LoginComponent updateUser={this.updateUser}/>
            </Route>
            <Route path='/login'>
              <LoginComponent updateUser={this.updateUser}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </>)
    } 
    else
    {
      return(<>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
        <BrowserRouter>
          <NavbarComponent updateUser={this.updateUser}/>

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

              <Route path="/myprofile">
                <ProfileComponent loggedInUser={this.state.loggedInUser} updateUser={this.updateUser}/>
              </Route>
            </Provider>
          </Switch>
        </BrowserRouter>
      </>)
    }
  }
}
