// Adding an item model for now, just to make some things simpler

export class Item{
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
    }
}