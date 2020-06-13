import React, { Component } from 'react'
import { Item } from '../models/Item'
import { IState } from '../redux/reducers'
import {addClickActionMappper} from '../redux/action-mapper';
import { connect, Provider } from 'react-redux';
import { Jumbotron, Container, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Button } from 'reactstrap';

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
            <ListGroup>
                        {/* I'm still not 100% sure what component is being displayed for each list item, so this is likely temporary */}
                        {this.props.items.map((item: Item, i) => {
                            return( <ListGroupItem key={i}>
                                <Row>
                                    <Col xs='auto'><img src={`http://project2-group2-store.s3.amazonaws.com/project2-group2-store/books/` + item.img_path}></img></Col>
                                    <Col xs='auto'><p>{item.item_name}</p></Col>
                                    <Col xs='auto'><p>{item.price}</p></Col>
                                </Row>
                            </ListGroupItem>)
                        })}
                    </ListGroup>
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