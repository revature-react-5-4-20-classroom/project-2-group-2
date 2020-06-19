import React from "react";
import { Jumbotron, Container, ListGroupItem } from "reactstrap";
import { Item } from "../models/Item";
import { storeClient } from "../api/StoreClient";
import { prnt } from "../Helpers";
import { displayOneItem } from "./SingleItemComponent";

const debug=true//prnt will log to the console

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
		let response=await storeClient.get(`/orderItems/${this.props.orderId}`)
		//prnt(debug,`response=`,response)

		let itemsInOrder=response.data
		prnt(debug,`itemsInOrder=`,itemsInOrder)

		//convert all item properties to string
		itemsInOrder=itemsInOrder.map((item:any)=>
		{
			prnt(debug,`item=`,item)

			let leItem=new Item(
					item.itemId.toString(),		//item_id:    string,
					item.itemName,				// item_name:  string,
					item.price.toString(),		// price:      string,
					item.description,			// description:string,
					item.categoryId.toString(),	// category_id:string,
					item.avgRating.toString(),	// avg_rating: string,
					item.imgPath,				// img_path:   string,
			)

			prnt(debug,`leItem=`,leItem)

			return leItem
		})

		this.setState({
			itemsToDisplay:itemsInOrder
		})
	}

	render()
	{
		return(<>
		{/* <i>You are viewing a single order. orderId is{this.props.orderId}</i> */}
		<Jumbotron>
			<ListGroupItem>
				<Container>
					{
						this.state.itemsToDisplay.map((item:Item)=>
						{
							return displayOneItem(item,null)
						})
					}
				</Container>
			</ListGroupItem>
		</Jumbotron>)
		</>)
	}
}