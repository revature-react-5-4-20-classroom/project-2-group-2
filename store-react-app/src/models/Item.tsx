// Adding an item model for now, just to make some things simpler

import { prnt } from "../Helpers";

const debug=false//can prnt actually print?

export class Item{
    item_id:    string;
    item_name:  string;
    price:      string;
    description:string;
    category_id:string;
    avg_rating: string;
    img_path:   string;

    constructor(
        item_id:    string,
        item_name:  string,
        price:      string,
        description:string,
        category_id:string,
        avg_rating: string,
        img_path:   string,
    ) 
    {
        this.item_id =      item_id;
        this.item_name =    item_name;
        this.price =        price;
        this.description =  description;
        this.category_id =  category_id;
        this.avg_rating =   avg_rating;
        this.img_path =     img_path;
    }
}

/*
    Converts an item from the server into an item on the front end.
    the java server enforces camelCase and we enforce under_scores and also all strings.
    refactoring the front end may break a lot of things.
*/
export function convertFromUnderscoreToCamelCase(itemThatIsAlmostAnItem:any)
{
    prnt(debug,`convertFromUnderscoreToCamelCase() itemThatIsAlmostAnItem=`,itemThatIsAlmostAnItem)

    let leItem=new Item(
            itemThatIsAlmostAnItem.itemId.toString(),		//item_id:    string,
            itemThatIsAlmostAnItem.itemName,				// item_name:  string,
            itemThatIsAlmostAnItem.price.toString(),		// price:      string,
            itemThatIsAlmostAnItem.description,			    // description:string,
            itemThatIsAlmostAnItem.categoryId.toString(),	// category_id:string,
            itemThatIsAlmostAnItem.avgRating.toString(),	// avg_rating: string,
            itemThatIsAlmostAnItem.imgPath,				    // img_path:   string,
    )

    prnt(debug,`leItem=`,leItem)

    return leItem
}