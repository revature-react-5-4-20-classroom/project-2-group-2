/*
	Helpful functions
*/

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