// Simple function for getting an image url from an S3 bucket

import { Item } from "../models/Item";

export function getImageUrl(i: Item) : string {
    const itemId = i.item_id;
    let category: string;
    let imageUrl: string;
    switch(parseInt(i.category_id)) {
        case 1: category = "Books"; break;
        case 2: category = "Clothing"; break;
        case 3: category = "Electronics"; break;
        default: throw new Error("Invalid category");
    }
    imageUrl = `https://project2-group2-store2.s3-us-west-1.amazonaws.com/images/${category}/${category.toLowerCase()}-item-${itemId}.jpg`;
    return imageUrl;
}