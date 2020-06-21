import React from "react";
import { storeClient } from "../api/StoreClient";
import { prnt } from "../Helpers";
import { Review } from "../models/Review";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";

const debug=true

interface IPropsViewAllReviews{itemId:number}

/*
	<ViewAllReviews itemId={99}/>

	fetches and displays all the reviews for an item with itemId
*/
export class ViewAllReviews extends React.Component<IPropsViewAllReviews,any>
{
	constructor(props:any)
	{
		super(props)
		this.state={
			allTheReviewsForAnItem:[]
		}
	}

	async componentDidMount()
	{
		prnt(debug,`ViewAllReviews componentDidMount() has been reached`)

		if(this.props.itemId===null)
		{
			prnt(debug,`itemId is null`)
			return
		}
		prnt(debug,`this.props.itemId=`,this.props.itemId)

		let response=await storeClient.get(`/reviews/${this.props.itemId}`)
		prnt(debug,`response.data=`,response.data)

		if(response.data)
		{
			this.setState({
				allTheReviewsForAnItem:response.data
			})
		}
	}

	render()
	{
		return(<>
			<ListGroup>
				<ListGroupItem>
					<h6>You are viewing all the reviews for this item.</h6>
					<p>Total reviews {this.state.allTheReviewsForAnItem.length}</p>
				</ListGroupItem>

				<ListGroupItem>
				<Row>
					<Col sm={1}>Rating</Col>
					<Col >Experience</Col>
				</Row>
				{
					this.state.allTheReviewsForAnItem.map((review:Review)=>
					{
						prnt(debug,`review=`,review)
						return(
							<Row>
								<Col sm={1}>{review.rating}</Col>
								<Col >{review.content}</Col>
							</Row>
						)
					})
				}

				</ListGroupItem>
			</ListGroup>
		</>)
	}
}