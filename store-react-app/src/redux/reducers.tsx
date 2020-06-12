import {AnyAction, combineReducers, bindActionCreators} from 'redux';
import { itemClickTypes } from './action-mapper';

interface IItemState{
    item_id: string;
    item_name: string;
    price: string;
    description:string,
    category_id:string,
    avg_rating:string,
    img_path:string,
}

const initialItemState : IItemState = {
    item_id: '',
    item_name: '',
    price: '',
    description:'',
    category_id:'',
    avg_rating:'',
    img_path:'',
}

export const itemReducer = (state:IItemState = initialItemState, action: AnyAction) : IItemState =>{

    switch(action.type){
        case itemClickTypes.ITEM_CLICK :{

                let item_idNew= action.payload.itemClicked.item_id
                let item_nameNew= action.payload.itemClicked.item_name
                let priceNew= action.payload.itemClicked.price
                let descriptionNew= action.payload.itemClicked.description
                let category_idNew= action.payload.itemClicked.category_id
                let avg_ratingNew= action.payload.itemClicked.avg_rating
                let img_pathNew = action.payload.itemClicked.img_path

            return{
                    item_id: item_idNew,
                    item_name: item_nameNew,
                    price:priceNew,
                    description: descriptionNew,
                    category_id: category_idNew,
                    avg_rating: avg_ratingNew,
                    img_path:img_pathNew,
            }
        }
        default : {
            return state;
        }
    }
}

interface Icart{
    items:[],
    action:AnyAction
}

const initialCartState:Icart={
    items:[],
    action:{type:''}
}

export const cartReducer= (state:Icart = initialCartState, action: AnyAction) : Icart =>
{
    switch(action.type)
    {
        case 'CART_ITEM_ADD':
            //return state.items.concat(action.item)

        default:return state
    }
}

export interface IState {
    user: IItemState,
    
}

// Now all of our reducers are in state, exported here
//all actions can take place on state and they go to the appropriate
// reducer
export const state = combineReducers<IState>({
    //cart:cartReducer,
    user:itemReducer,
})