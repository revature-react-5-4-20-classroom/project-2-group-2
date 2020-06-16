import {Item} from '../models/Item'
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

