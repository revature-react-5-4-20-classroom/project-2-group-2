
import React from "react";
import { connect } from "react-redux";
import { displayOneItem } from "./SingleItemComponent";
import { store } from "../redux/store";
import {prnt, calculatePriceOfItems}from'../Helpers';
import { Container, Row, Col, Button, Table, Media, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import{storeClient}from'../api/StoreClient'
import { Item } from "../models/Item";
import { itemClickActionMapper,addClickActionMappper, cartRemoveItemActionMapper,clearCartActionMapper } from '../redux/action-mapper';
import { IState } from "../redux/reducers";
import { getImageUrl } from "../api/getImageUrl";
import { ViewOneOrderAndItems } from "./ViewOneOrderAndItems";
//import book17 from "./books-item-17.jpg"
//import book18 from "./books-item-18.jpg"

const debug=true;//prnt function will print things

export class CheckoutPage extends React.Component<any,any>
{
	constructor(props:any)
	{
		super(props)
		this.state={
			jsxMessage:(<>
						<i>Your cart is empty</i><br/>
						<i>Please go buy our stuff</i>
						</>),
			showOrder:false, 	//will we display the order and its items?
			placedOrder:null,	//the id order that was just placed when purchasing the items
		}
	}

	componentDidMount=()=>
	{
		prnt(debug,`CheckoutPage componentDidMount() was reached`)
		prnt(debug,`this.props.items=`,this.props.items)
	}

	render()
	{
		let jsxContent=(<></>)

		if(this.props.items.length<=0)//if the cart is empty
		{
			jsxContent=(<>
				<Row>
					<Col>
						{this.state.jsxMessage}<br/>
						{this.state.showOrder?<ViewOneOrderAndItems order={this.state.placedOrder}/>:null}
					</Col>
				</Row>
			</>)
		}
		else
		{
			//otherwise display all the items in it
			jsxContent=(<>
				<Row>
					<Col>
						{this.displayItemsInCart()}
					</Col>
					<Col sm="2">
						{this.displayCheckoutPanel()}
					</Col>
				</Row>
			</>)
		}

		return(	<Jumbotron>
					<Container>
						<ListGroup>
							{jsxContent}
						</ListGroup>
					</Container>
				</Jumbotron>)
	}

	displayItemsInCart=()=>
	{
		return this.props.items.map((item:any)=>
		{
			let jsxButton=(
				<Button onClick={()=>{this.props.cartRemoveItemActionMapper(item)}}>
					Remove from cart
				</Button> 
			)

			return(<ListGroupItem>{displayOneItem(item,jsxButton)}</ListGroupItem>)
		})
	}

	displayCheckoutPanel=()=>
	{
		return(<>
			<Container>
				<Row>
					<Col>
						Total ${calculatePriceOfItems(this.props.items)}
					</Col>
				</Row>
				<Row>
					<Col>
						<Button onClick={this.performPurchase}>Purchase</Button>
					</Col>
				</Row>
			</Container>
		</>)
	}

	/*
		this function is called when the pruchase button is clicked.
		it sends a json order to the server.
	*/
	performPurchase=async()=>
	{
		prnt(debug,`CheckoutPage performPurchase() was reached`)

		let itemIds=this.props.items.map((item:any)=>
		{
			return item.item_id
		})

		prnt(debug,`itemIds=`,itemIds)

		let orderToPlace={
			"notes":	"test notes from client",
			"userId":	this.props.parentState.loggedInUser.userId,
			"itemIds":	itemIds
		}
		prnt(debug,`orderToPlace=`,orderToPlace)

		let response=await storeClient.post('/orderItems',orderToPlace)
		//prnt(debug,`response=`,response)

		let placedOrder=response.data
		prnt(debug,`placedOrder=`,placedOrder)

		if(placedOrder===null)
		{
			this.setState({
				jsxMessage:(<i>The order could not be placed. There was an issue on the server</i>),
			})
		}
		else
		{
			//clear the cart the fancy redux way
			this.props.clearCartActionMapper()

			//and display the response from the server
			this.setState({
				jsxMessage:(<>
							<i>Your order was placed successfully.</i><br/>
							<i>The following items were purchased</i>
							</>),
				showOrder:true,
				placedOrder:placedOrder
			})
		}
	}
}

// Black magic rube goldberg Redux stuff
const mapStateToProps = (state:IState) =>{
    return{
      ...state.item,
      ...state.items
    }
}

const mapDispatchToProps = {   
    itemClickActionMapper,
    addClickActionMappper,
	clearCartActionMapper,
	cartRemoveItemActionMapper,
}

export const ReduxCheckoutPage = connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)