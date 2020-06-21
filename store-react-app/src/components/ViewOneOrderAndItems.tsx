import React from "react";
import { Jumbotron, Container, ListGroupItem, ListGroup } from "reactstrap";
import { Item, convertFromUnderscoreToCamelCase } from "../models/Item";
import { storeClient } from "../api/StoreClient";
import { prnt, calculatePriceOfItems } from "../Helpers";
import { displayOneItem } from "./SingleItemComponent";
import { connect } from "react-redux";
import { itemClickActionMapper,addClickActionMappper,removeClickActionMapper  } from '../redux/action-mapper';

const debug=true//prnt will log to the console

/*
	fetches and displays the items of the given order.
	may display specific order info in the future, but just displays the orders items for now.

	<ViewOneOrderAndItems order={jsObject} />
*/
export class ViewOneOrderAndItems extends React.Component<any,any>
{
	constructor(props:any)
	{
		super(props)
		this.state={
			itemsToDisplay:[],	//the items of the order to display
		}
	}

	componentDidMount=async()=>
	{
		prnt(debug,`ViewOneOrderAndItems componentDidMount() has been reached`)

		if(this.props.order===null)
		{
			prnt(debug,`Nothing to display. this.props.order=`,this.props.order)
			return
		}


		prnt(debug,`this.props.order`,this.props.order)

		let response=await storeClient.get(`/orderItems/${this.props.order.orderId}`)
		//prnt(debug,`response=`,response)

		let itemsInOrder=response.data
		prnt(debug,`itemsInOrder=`,itemsInOrder)

		//convert all item properties to camelCase and string
		itemsInOrder=itemsInOrder.map((item:any)=>
		{
			return convertFromUnderscoreToCamelCase(item)
		})

		this.setState({
			itemsToDisplay:itemsInOrder
		})
	}


	render()
	{
		if(this.props.order==null)return(<h6>Nothing to display. Order is null</h6>)

		return(<>
		<Jumbotron>
			<h6>You are viewing the items of order number {this.props.order.orderId}</h6><br/>
			<h6>Total cost ${calculatePriceOfItems(this.state.itemsToDisplay)}</h6>
			
			<ListGroup>
				{
					this.state.itemsToDisplay.map((item:Item)=>
					{
						return (<ListGroupItem>{displayOneItem(item)}</ListGroupItem>)
					})
				}
			</ListGroup>
		</Jumbotron>
		</>)
	}
}

//make a redux version so it can access the store
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

export const ReduxViewOneOrderAndItems = connect(mapStateToProps, mapDispatchToProps)(ViewOneOrderAndItems)