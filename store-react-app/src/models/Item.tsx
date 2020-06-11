// Adding an item model for now, just to make some things simpler

export class Item{
    item_id: string;
    item_name: string;
    price: string;
    description:string;
    category_id:string;
    avg_rating:string;
    img_path:string;

    constructor(item_id: string, item_name: string, price: string, description: string, category_id: string, avg_rating: string, img_path: string) {
        this.item_id = item_id;
        this.item_name = item_name;
        this.price = price;
        this.description = description;
        this.category_id = category_id;
        this.avg_rating = avg_rating;
        this.img_path = img_path;
    }
}