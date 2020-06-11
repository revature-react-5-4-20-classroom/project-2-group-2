
import React from "react";
import { connect } from "react-redux";
import { SingleItemComponent } from "./SingleItemComponent";
import { store } from "../redux/store";
import {prnt}from'../Helpers';
import { Container, Row } from "reactstrap";

//initalize the store with some items in the cart. just to look at for now
// store.dispatch({
// 	type:'CART_ITEM_ADD',
// 	item:<SingleItemComponent
// 			item_id=    "1"
// 			item_name=  "redux test A"
// 			price=      "100"
// 			description="redux test description A"
// 			category_id="redux test category A"
// 			avg_rating= "redux test rating A"
// 			img_path=   "redux test image url"/>
// })

const debug=true;//prnt function will print things

export class CheckoutPage extends React.Component<any,any>
{
	constructor(props:any)
	{
		super(props);
		this.state={
			//items:['itemA','itemB','itemC']
			items:[	//data from the database. column names
				{
					item_id:    "1",
					item_name:  "test A",
					price:      "100",
					description:"test description A",
					category_id:"test category A",
					avg_rating: "test rating A",
					img_path:   "test image url",
				},

				{
					item_id:    "1",
					item_name:  "test B",
					price:      "200",
					description:"test description B",
					category_id:"test category B",
					avg_rating: "test rating B",
					img_path:   "test image url",
				}
			]
		}
	}

	displayItems=()=>
	{
		//let stateRedux=store.getState()
		//prnt(debug,`Cart displayItems() stateRedux=`,stateRedux)

		return this.state.items.map((item:any)=>
		{
			return(
				<Container>
					<Row>
					
					</Row>
				</Container>
			)
		})
	}

	render()
	{
		return(<>
			<i>You are viewing the items in the cart</i>
			{this.displayItems()}
		</>)
	}
}

// const mapStateToProps = (state:any) =>{
//     return{
//       ...state.user,
//     }
// }

// const mapDispatchToProps = {   
// }

// export const ReduxCart = connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);