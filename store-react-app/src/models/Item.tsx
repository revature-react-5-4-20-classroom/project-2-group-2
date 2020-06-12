// Adding an item model for now, just to make some things simpler

export class Item{
<<<<<<< HEAD
    item_id:    number;
    item_name:  string;
    price:      number;
    description:string;
    category_id:number;
    avg_rating: number;
    img_path:   string;

    constructor(
        item_id:    number,
        item_name:  string,
        price:      number,
        description:string,
        category_id:number,
        avg_rating: number,
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
=======
    itemId: string;
    itemName: string;
    price: string;
    description:string;
    categoryId:string;
    avgRating:string;
    imgPath:string;

    constructor(item_id: string, item_name: string, price: string, description: string, category_id: string, avg_rating: string, img_path: string) {
        this.itemId = item_id;
        this.itemName = item_name;
        this.price = price;
        this.description = description;
        this.categoryId = category_id;
        this.avgRating = avg_rating;
        this.imgPath = img_path;
>>>>>>> ab5460406f46f296a1f0fbeaead90612863cd75e
    }
}