import {AnyAction, combineReducers, bindActionCreators} from 'redux';
import { itemClickTypes, cartClickTypes } from './action-mapper';
import { Item } from '../models/Item';
import { ItemListComponent } from '../components/ItemListComponent';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';





interface IItemState{
    item_id:    string,
    item_name:  string,
    price:      string,
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
interface ICartState{
    items : Item[];
    index :number | undefined;
}

const initialCartState:ICartState ={
    items : [],
    index : 0
}

export const cartReducer = (state:ICartState = initialCartState, action:AnyAction) : ICartState =>{
    switch(action.type){
        case cartClickTypes.ADD_CLICK:{
                
               console.log(state.items)
               console.log(action.payload.itemClicked.item_id)
               let newState = [...state.items]
               newState.push(action.payload.itemClicked);

               return{
                items: newState,
                index:undefined
               }
            }

        case cartClickTypes.REMOVE_CLICK:{
            let newState = [...state.items];
            let index = action.payload.index;
            let updatedCart : Item[] = [];

            for(let i =0; i< newState.length; i++){
                console.log(index);
                if(i!==index){
                    updatedCart.push(newState[i]);
                }
            }
            // const updatedCart = newState.filter( (item)=> {
            //     console.log(action.payload.itemClicked.item_id)
            //     if(item.item_id !== action.payload.itemClicked.item_id){
            //         return item;
            //     }
            // })

            return{
                items: updatedCart,
                index:undefined
            }
        }

        case 'CART_CLEAR':{
            return{items:[],index:undefined}
        }

        default :{
            return state;
        }
    } 
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
                        img_path:img_pathNew
                }
            }
            default : {
                return state;
            }
    }

}




export interface IState {
    item: IItemState,
    items:ICartState
    
}
// Now all of our reducers are in state, exported here
//all actions can take place on state and they go to the appropriate
// reducer
export const state = combineReducers<IState>({
    item : itemReducer,
    items:cartReducer
})