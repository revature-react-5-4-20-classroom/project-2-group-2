import React, { useState } from 'react';
import { User } from "../models/User";
import { UpdateUserInfo } from "./UpdateUserInfo"
import { Jumbotron, Button, Modal, ModalHeader, ModalBody, Navbar, NavbarToggler, Nav, NavItem, Container } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, NavLink } from 'react-router-dom';
import { ViewOneOrderAndItems, ReduxViewOneOrderAndItems } from './ViewOneOrderAndItems';
import { storeClient } from '../api/StoreClient';
import { prnt } from '../Helpers';
import { Order } from '../models/Order';
import { itemClickActionMapper,addClickActionMappper,removeClickActionMapper  } from '../redux/action-mapper';
import { connect, Provider } from 'react-redux';
import { store } from '../redux/store';

interface IProfileComponentProps {
    loggedInUser: User | null,
    updateUser: (u: User) => void,
}

interface IProfileComponentState {
    isModal: boolean,
    allOrdersUserHasPlaced:[],
}

const debug=true //prnt will debug

export class ProfileComponent extends React.Component<IProfileComponentProps,IProfileComponentState> {

    constructor(props: IProfileComponentProps) {
        super(props);
        this.state = {
            isModal: false,
            allOrdersUserHasPlaced:[],//all the orders the user has placed.
        }
    }

    /*
        fetches all the orders the user has placed.
        could not do that inside of displayAllOrders() because of async
    */
    componentDidMount=async()=>
    {
        prnt(debug,`ProfileComponent componentDidMount() has been reached`)
        prnt(debug,`this.props.loggedInUser=`,this.props.loggedInUser)

        if(this.props.loggedInUser==null) return (<h6>No orders to display. user is not logged in</h6>)
        prnt(debug,`this.props.loggedInUser is not null`)

        let response=await storeClient.get(`/orderAll/${this.props.loggedInUser.userId}`)
		//prnt(debug,`response=`,response)

		let ordersMadeByUser=response.data
		prnt(debug,`ordersMadeByUser=`,ordersMadeByUser)

        this.setState({
			allOrdersUserHasPlaced:ordersMadeByUser
		})
    }

    toggleModal = () => {
        this.setState({
            isModal: !this.state.isModal,
        })
    }
    
    toggleNavbar=()=>
    {
        const[isOpen,setIsOpen]=useState(false)
        setIsOpen(!isOpen)
    }

    render() {
        return(
            <>
            <BrowserRouter>
                <Container>
                    <Navbar>
                        <NavbarToggler onClick={this.toggleNavbar}/>
                        <Nav className='mr-auto' pills>
                            <NavItem>
                                <NavLink to="/myprofile" className='nav-link' activeClassName='active'>Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/myorders" className='nav-link' activeClassName='active'>Orders</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    <br/>
                    <br/>
                    <Switch>
                        <Route path="/myprofile">
                                <h3 className="display-3">User Profile for {this.props.loggedInUser?.firstName + ' ' + this.props.loggedInUser?.lastName}</h3>
                                <hr className="my-2"/>
                                <p className="lead">First Name: {this.props.loggedInUser?.firstName}</p>
                                <p className="lead">Last Name: {this.props.loggedInUser?.lastName}</p>
                                <p className="lead">Display Name: {this.props.loggedInUser?.username}</p>
                                <p className="lead">Email: {this.props.loggedInUser?.email}</p>
                                <p className="lead">Address: {this.props.loggedInUser?.address}
                                    , {this.props.loggedInUser?.addressCity}
                                    , {this.props.loggedInUser?.addressState} {this.props.loggedInUser?.addressZipcode}</p>
                                <Button color="primary" onClick={this.toggleModal}>Update Profile</Button>
                            <Modal isOpen={this.state.isModal}>
                                <ModalHeader toggle={this.toggleModal}>Update User Profile</ModalHeader>
                                <ModalBody>
                                    {this.props.loggedInUser !== null ? <UpdateUserInfo loggedInUser={this.props.loggedInUser} updateUser={this.props.updateUser}/> : ''}
                                </ModalBody>
                            </Modal>
                        </Route>
                        <Route path="/myorders">
                            <br/>
                            <h6>You are viewing all the orders and items you have ever bought</h6>
                            <h6>Total orders: {this.state.allOrdersUserHasPlaced.length}</h6>
                            <hr className="my-2"/>
                            {this.displayAllOrders()}
                        </Route>
                    </Switch>
                </Container>
            </BrowserRouter>
            </>
        );
    }

    displayAllOrders()
    {
        return this.state.allOrdersUserHasPlaced.map((order:Order)=>
        {
            return(<ViewOneOrderAndItems order={order} actionMapper={itemClickActionMapper}/>)
        })
    }
}

// make a redux version so it can access the store
const mapStateToProps = (state:any) =>{
    return{
      ...state.item,
      ...state.items
    }
}

const mapDispatchToProps = {   
    itemClickActionMapper,
    addClickActionMappper
    //removeClickActionMapper
}


export const ReduxProfileComponent = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)