
import React from "react";
import { connect } from "react-redux";
import { SingleItemComponent } from "./SingleItemComponent";
import { store } from "../redux/store";
import {prnt}from'../Helpers';
import { Container, Row, Col, Button, Table, Media } from "reactstrap";
import book17 from "./books-item-17.jpg"
import book18 from "./books-item-18.jpg"

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
			items:[	//data from the database. column names
				{
					item_id:    "1",
					item_name:  "Advanced Physical Chemistry",
					price:      45,
					description:"Description Description Description Description Description Description Description ",
					category_id:"test category A",
					avg_rating: 8,
					img_path:   book17,
				},

				{
					item_id:    "1",
					item_name:  "Revenant Gun",
					price:      55,
					description:"Description Description Description Description Description Description Description ",
					category_id:"test category B",
					avg_rating: 9,
					img_path:   book18,
				}
			]
		}
	}

	render()
	{
		return(<>
			<Container>
				<Row>
					<Col sm="10">
						{this.displayItems()}
					</Col>
					<Col sm="2">
						{this.displayCheckoutPanel()}
					</Col>
				</Row>
			</Container>
		</>)
	}

	displayItems=()=>
	{
		//let stateRedux=store.getState()
		//prnt(debug,`Cart displayItems() stateRedux=`,stateRedux)

		return this.state.items.map((item:any)=>
		{
			return(
				<Container>
					<Row> {/*each item*/}
						<Col sm="4">
							{/* <Media object data-src={logo} /> */}
							<img src={item.img_path}/>
						</Col>
						<Col sm="8">
							<Row> {/*item name, price, rating, remove from cart*/}
								<Col>
									<Row><Col>{item.item_name}</Col></Row>
									<Row><Col>{item.avg_rating} / 10</Col></Row>
									<Row><Col><b>${item.price}</b></Col></Row>
								</Col>
								<Col>
									<Button>Remove from cart</Button> 
								</Col>
							</Row> 
							<Row> {/*description*/}
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
						Total $400
					</Col>
				</Row>
				<Row>
					<Col>
						<Button>Purchase</Button>
					</Col>
				</Row>
			</Container>
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