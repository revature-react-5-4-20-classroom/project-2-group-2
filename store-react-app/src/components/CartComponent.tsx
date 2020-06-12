import React, { Component } from 'react'
import { Item } from '../models/Item'
import { IState } from '../redux/reducers'
import {addClickActionMappper} from '../redux/action-mapper';
import { connect, Provider } from 'react-redux';

interface ICartProps{
    items:Item[];
    index:number|undefined;
    addClickActionMappper : (item:Item, index:number|undefined) =>void;
}

interface ICartState{
    items:Item[];
    index:number|undefined;
}


export class CartComponent extends React.Component<ICartProps,ICartState>{

    constructor(props:ICartProps){
        super(props)
        this.state ={
            items:[],
            index:undefined
        }
    }
    render(){
        return(
            <h4>hello</h4>
        )
    }
    
}

const mapStateToProps = (state:IState) =>{
    return{
      ...state.items,
    }
  }

  const mapDispatchToProps = {   
    addClickActionMappper
}

  export const ReduxCartComponent = connect(mapStateToProps, mapDispatchToProps)(CartComponent);