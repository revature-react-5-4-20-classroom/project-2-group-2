/*
	Helpful functions
*/

import { Item } from "./models/Item"

/*
	shorthand print function that logs things to the console

	debug:boolean	T to print stuff. F to not print
	text:string		the text to print
	dataJson?:any	a possible JSON to print aswell
*/
export function prnt(debug:boolean,text:string,dataJson?:any)
{
    if(debug) 
    {
        if(dataJson)    console.log(`${text} ${JSON.stringify(dataJson)}`)
        else            console.log(text)
    }
}

/*
    removes the valueToRemove from the array
*/
export function arrayRemoveValue(array:any[],valueToRemove:any)
{
    let i=array.findIndex((value:any)=>valueToRemove===value)

    array.splice(i,1)
}

/*
	returns a new array with a value removed from array
*/
export function arrayWithValueRemoved(array:any[],valueToRemove:any)
{
	let newArray=[...array]

	arrayRemoveValue(newArray,valueToRemove)
	localStorage.setItem('cart', JSON.stringify(newArray));
	return newArray
}

export function calculatePriceOfItems(arrayOfItems:Item[])
{
	let total=0

	for(let item of arrayOfItems)
	{
		total+=parseInt(item.price)
	}

	return total

	// return this.props.items.reduce((total:number,item:Item,0,0)=>
	// {
	// 	prnt(debug,`total+parseInt(item.price)`,total+parseInt(item.price))

	// 	return total+parseInt(item.price)
	// })
}