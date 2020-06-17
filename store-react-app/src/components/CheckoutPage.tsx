
import React from "react";
import { connect } from "react-redux";
import { SingleItemComponent } from "./SingleItemComponent";
import { store } from "../redux/store";
import {prnt}from'../Helpers';
import { Container, Row, Col, Button, Table, Media, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import{storeClient}from'../api/StoreClient'
import { Item } from "../models/Item";
import { itemClickActionMapper,addClickActionMappper } from '../redux/action-mapper';
import { IState } from "../redux/reducers";
import { getImageUrl } from "../api/getImageUrl";
//import book17 from "./books-item-17.jpg"
//import book18 from "./books-item-18.jpg"

const debug=true;//prnt function will print things

export class CheckoutPage extends React.Component<any,any>
{
	constructor(props:any)
	{
		super(props);
		this.state={
			jsxMessage:(<>
						<i>Your cart is empty</i><br/>
						<i>Please go buy our stuff</i>
						</>)
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
						{this.state.jsxMessage}
					</Col>
				</Row>
			</>)
		}
		else
		{
			//otherwise display all the items in it
			jsxContent=(<>
				<Row>
					<ListGroup >
						<Col>
							{this.displayItemsInCart()}
						</Col>
					</ListGroup>
					<Col >
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
		//let stateRedux=store.getState()
		//prnt(debug,`Cart displayItems() stateRedux=`,stateRedux)

		return this.props.items.map((item:any)=>
		{
			/*
				___________________________________________
						|item name		|(Remove from cart)
				image	|rating			|
						|price			|
						|__________________________________
						|Description
				___________________________________________
			*/	

			return(
				<ListGroupItem>
					<Container>
						<Row> 
							<Col >
								{/* <Media object data-src={logo} /> */}
								<img src={getImageUrl(item)} style={{height:"200px", width:"auto"}}/>
							</Col>
							<Col>
								<Row>
									<Col>
										<Row><Col>{item.item_name}</Col></Row>
										<Row><Col>{item.avg_rating} / 10</Col></Row>
										<Row><Col><b>${item.price}</b></Col></Row>
									</Col>
									<Col>
										<Button>Remove from cart</Button> 
									</Col>
								</Row> 
								<Row>
									<Col>
										{item.description} 
									</Col>
								</Row>
							</Col>
						</Row>
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
						Total $0
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

		let orderFromClient={
			"notes":	"test notes from client",
			"userId":	this.props.parentState.loggedInUser.userId,
			"itemIds":	itemIds
		}
		prnt(debug,`orderFromClient=`,orderFromClient)

		let response=await storeClient.post('/orderItems',orderFromClient)
		//prnt(debug,`response=`,response)
		prnt(debug,`response.data=`,response.data)

		//clear the cart the fancy redux way
		this.props.clearCartActionMapper()

		//and display the response from the server
		this.setState({
			jsxMessage:(<i>{response.data}</i>)
		})
	}
}

// Black magic rube goldberg Redux stuff
const mapStateToProps = (state:IState) =>{
    return{
      ...state.item,
      ...state.items
    }
}

export const clearCartActionMapper = (itemClicked:Item, index:number|undefined) =>{
    return{
        type: 'CART_CLEAR',
        payload:{
            itemClicked,
            index
        }
    }
}

const mapDispatchToProps = {   
    itemClickActionMapper,
    addClickActionMappper,
	clearCartActionMapper
}

export const ReduxCheckoutPage = connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)