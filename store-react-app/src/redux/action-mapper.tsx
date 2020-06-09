

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


export const itemClickActionMapper = (itemClicked:IItemState) =>{
    return {
        type: itemClickTypes.ITEM_CLICK,
        payload: {
            itemClicked
        }
    }
}

