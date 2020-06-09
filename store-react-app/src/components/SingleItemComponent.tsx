import React from 'react'
import {IState} from '../redux/reducers';
import { connect, Provider } from 'react-redux';

interface IItemProps{
    item_id: string;
    item_name: string;
    price: string;
    description:string,
    category_id:string,
    avg_rating:string,
    img_path:string
}

interface IItemState{
    item_id: string;
    item_name: string;
    price: string;
    description:string,
    category_id:string,
    avg_rating:string,
    img_path:string
}


export class SingleItemComponent extends React.Component<IItemProps,any>{

    constructor(props:IItemProps){
        super(props);
    }


    render(){

       return(
           <>
            <h4>{this.props.item_name}</h4>
            <span>{this.props.price}</span>
            <p>{this.props.description}</p>
            <span>{this.props.avg_rating}</span>
            </>
       );
    }
}


const mapStateToProps = (state:IState) =>{
    return{
      ...state.user,
    }
  }
  const mapDispatchToProps = {   
  }
  
  // finally, we set up the componenet in its container with its connections
  // connect produces a "higher order component" that takes a component as an argument and returns a component
  // higher order components are just like higher order functions(takes functions returns another function);
  // connect sets up a container component of ReduxGame
  // this is what causes the props to be passed to this component
  export const ReduxSingleItemComponent = connect(mapStateToProps, mapDispatchToProps)(SingleItemComponent);