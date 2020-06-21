import React from "react"
import { Row } from "reactstrap"

export class Review
{
	reviewId:	number
	userId:		number
	rating:		number
	content:	string
	itemId:		number

	constructor(
		reviewId:	number,
		userId:		number,
		rating:		number,
		content:	string,
		itemId:		number,
	)
	{
		this.reviewId=reviewId
		this.userId=userId
		this.rating=rating
		this.content=content
		this.itemId=itemId
	}
}