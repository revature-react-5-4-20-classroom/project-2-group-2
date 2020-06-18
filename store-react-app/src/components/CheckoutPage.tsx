
import React from "react";
import { connect } from "react-redux";
import { SingleItemComponent,displayOneItem } from "./SingleItemComponent";
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
			placedOrderId:-1,	//the id of the order that was just placed when purchasing the items
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
						{this.state.showOrder?<ViewOneOrderAndItems orderId={this.state.placedOrderId}/>:null}
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
						{jsxContent}
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

			return(
				<ListGroupItem>
					<Container>
						{displayOneItem(item,jsxButton)}
					</Container>
				</ListGroupItem>
			)
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
		prnt(debug,`CheckoutPage performPurchase() was hit`)

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

		let placedOrderId=response.data
		prnt(debug,`placedOrderId=`,placedOrderId)


		if(placedOrderId<0)
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
				jsxMessage:(<i>Your order was placed successfully. Order id is {placedOrderId}</i>),
				showOrder:true,
				placedOrderId:placedOrderId
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