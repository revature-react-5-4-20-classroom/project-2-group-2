
import React from "react";
import { connect } from "react-redux";
import { SingleItemComponent } from "./SingleItemComponent";
import { store } from "../redux/store";
import {prnt}from'../Helpers';
import { Container, Row, Col, Button, Table, Media } from "reactstrap";
import{storeClient}from'../api/StoreClient'
import { Item } from "../models/Item";
import { itemClickActionMapper,addClickActionMappper } from '../redux/action-mapper';
import { IState } from "../redux/reducers";
import { getImageUrl } from "../api/getImageUrl";
//import book17 from "./books-item-17.jpg"
//import book18 from "./books-item-18.jpg"

const debug=true;//prnt function will print things

export class CheckoutPage extends React.Component<IReduxProps,any>
{
	constructor(props:any)
	{
		super(props);
	}

	componentDidMount=()=>
	{
		prnt(debug,`CheckoutPage componentDidMount() was reached`)
		prnt(debug,`this.props.items=`,this.props.items)
	}

	render()
	{
		if(this.props.items.length<=0)//if the cart is empty
		{
			return(<>
				<i>Your cart is empty</i><br/>
				<i>Please go buy our stuff</i>
			</>)
		}

		//otherwise display all the items in it
		return(<>
			<Container>
				<Row>
					<Col sm="10">
						{this.displayItemsInCart()}
					</Col>
					<Col sm="2">
						{this.displayCheckoutPanel()}
					</Col>
				</Row>
			</Container>
		</>)
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
				<Container>
					<Row> 
						<Col xs='auto'>
							{/* <Media object data-src={logo} /> */}
							<img src={getImageUrl(item)} style={{height:"100px", width:"auto"}}/>
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

	performPurchase=async()=>
	{
		prnt(debug,`CheckoutPage performPurchase() was hit`)

		let itemIds=this.props.items.map((item)=>
		{
			return item.item_id
		})

		prnt(debug,`itemIds=`,itemIds)

		let orderFromClient={
			"notes":"test notes from client",
			"userId":1,//needs to access the logged in user and use their id
			"itemIds":itemIds
		}
		prnt(debug,`orderFromClient=`,orderFromClient)

		let response=await storeClient.post('/orderItems',orderFromClient)
		prnt(debug,`response.data=`,response.data)
	}
}

// Black magic Redux stuff
interface IReduxProps {
    items : Item[];
    itemClickActionMapper: (item:Item) => void;
    addClickActionMappper:(item:Item, index:number|undefined) => void;
}

const mapStateToProps = (state:IState) =>{
    return{
      ...state.item,
      ...state.items
    }
}

const mapDispatchToProps = {   
    itemClickActionMapper,
    addClickActionMappper
}

export const ReduxCheckoutPage = connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)