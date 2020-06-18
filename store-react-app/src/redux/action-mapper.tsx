import {Item} from '../models/Item'
import { prnt } from '../Helpers'
interface IItemState{
    item_id: string;
    item_name: string;
    price: string;
    description:string,
    category_id:string,
    avg_rating:string,
    img_path:string
}

export const itemClickTypes = {
    ITEM_CLICK: 'ITEM_CLICK',
}

export const cartClickTypes = {
    ADD_CLICK: 'ADD_CLICK',
    REMOVE_CLICK:'REMOVE_CLICK'
}

export const removeClickActionMapper = (itemClicked:Item, index:number|undefined) =>{
    return{
        type: cartClickTypes.REMOVE_CLICK,
        payload:{
            itemClicked,
            index
        }
    }
}

export const addClickActionMappper = (itemClicked:Item, index:number|undefined) =>{
    return {
        type: cartClickTypes.ADD_CLICK,
        payload:{
            itemClicked,
            index
        }
    }
}

export const itemClickActionMapper = (itemClicked:IItemState) =>{
    return {
        type: itemClickTypes.ITEM_CLICK,
        payload: {
            itemClicked
        }
    }
}

//clears the cart of all items in it
export const clearCartActionMapper = (itemClicked:Item) =>{
    return{
        type: 'CART_CLEAR',
        payload:{itemClicked}
    }
}

//removes the itemClicked from the cart without using an index
export const cartRemoveItemActionMapper = (itemClicked:Item) =>{
    prnt(true,`cartRemoveItemActionMapper() has been reached`)

    return{
        type: 'CART_REMOVE_ITEM',
        payload:{itemClicked}
    }
}