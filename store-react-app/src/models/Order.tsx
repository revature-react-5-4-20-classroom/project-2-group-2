

export class Order
{
	orderId: 		number
    userId: 		number
	storeId:		number
    dateCreated: 	string
    notes: 			string

	constructor(
		orderId: 		number,
		userId: 		number,
		storeId:		number,
		dateCreated: 	string,
		notes: 			string,
	)
	{
		this.orderId=orderId
		this.userId=userId
		this.storeId=storeId
		this.dateCreated=dateCreated
		this.notes=notes
	}
}