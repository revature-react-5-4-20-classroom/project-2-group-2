import React from 'react'
import {IState} from '../redux/reducers';
import { connect, Provider } from 'react-redux';
import { SubmitReviewComponent } from './SubmitReviewComponent';
import {itemClickActionMapper} from '../redux/action-mapper';
import {Item} from '../models/Item';

interface IItemProps{
    item_id:    string;
    item_name:  string;
    price:      string;
    description:string;
    category_id:string;
    avg_rating: string;
    img_path:   string;
    itemClickActionMapper: (item:Item) => void;
}

interface IItemState{
    item_id:    string,
    item_name:  string,
    price:      string,
    description:string,
    category_id:string,
    avg_rating: string,
    img_path:   string
}



export class SingleItemComponent extends React.Component<IItemProps,IItemState>{

    constructor(props:IItemProps){
        super(props);
        this.state ={
          item_id: '',
          item_name: '',
          price: '',
          description:'',
          category_id:'',
          avg_rating:'',
          img_path:''
        }
    }


    render(){

       return(
           <>
            <h4>{this.props.item_name}</h4>
            <span>{this.props.price}</span>
            <p>{this.props.description}</p>
            <span>{this.props.avg_rating}</span>
            <SubmitReviewComponent itemId={this.props.item_id} userId = "1" />
            </>
       );
    }
}


const mapStateToProps = (state:IState) =>{
    return{
      ...state.item,
    }
  }

  const mapDispatchToProps = {   
    itemClickActionMapper,
    
}
  
  // finally, we set up the componenet in its container with its connections
  // connect produces a "higher order component" that takes a component as an argument and returns a component
  // higher order components are just like higher order functions(takes functions returns another function);
  // connect sets up a container component of ReduxGame
  // this is what causes the props to be passed to this component
  export const ReduxSingleItemComponent = connect(mapStateToProps, mapDispatchToProps)(SingleItemComponent);