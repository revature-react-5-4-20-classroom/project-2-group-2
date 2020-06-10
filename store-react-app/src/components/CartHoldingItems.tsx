
import React from "react";
import { connect } from "react-redux";
import { SingleItemComponent } from "./SingleItemComponent";

/*
    Rene: Create a component that has a single item in it and an add to cart button. 
    When you press the add to cart button, it should add that item to the cart. 
    The cart will simply be a <div> holding an "array" of other <div>s. In the div, 
    you should have a remove from cart button that deletes the item from the cart array of items. 
    You must use Redux to implement this functionality
*/

export class Cart extends React.Component<any,any>
{
	constructor(props:any)
	{
		super(props);
		this.state={
			//items:['itemA','itemB','itemC']
			items:[
						(<SingleItemComponent
							item_id=    "1"
							item_name=  "test A"
							price=      "100"
							description="test description A"
							category_id="test category A"
							avg_rating= "test rating A"
							img_path=   "test image url"/>
						),

						(<SingleItemComponent
							item_id=    "1"
							item_name=  "test B"
							price=      "200"
							description="test description B"
							category_id="test category B"
							avg_rating= "test rating B"
							img_path=   "test image url"/>
						)
			]
		}
	}

	render()
	{
		return(<>
			<i>You are viewing the items in the cart</i>
			{
				(
					this.state.items.map((item:any)=>
					{
						return(<p>{item}</p>)

						// return(<SingleItemComponent
						// 	item_id=    "1"
						// 	item_name=  "test"
						// 	price=      "100"
						// 	description="test description"
						// 	category_id="test category"
						// 	avg_rating= "test rating"
						// 	img_path=   "test image url"
						// />)
					})
				)
			}
		</>)
	}
}

const mapStateToProps = (state:any) =>{
    return{
      ...state.user,
    }
}

const mapDispatchToProps = {   
}
  
export const ReduxSingleItemComponent = connect(mapStateToProps, mapDispatchToProps)(Cart);