import React from 'react'
import {IState} from '../redux/reducers';
import { connect, Provider } from 'react-redux';
import { SubmitReviewComponent } from './SubmitReviewComponent';
import {itemClickActionMapper} from '../redux/action-mapper';
import {Item} from '../models/Item';
import { Row, Col, Button } from 'reactstrap';
import { getImageUrl } from '../api/getImageUrl';

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

/*
  displayOneItem(item,<Button>Click me</Button>)

  displays the item so it looks pretty. 
  you can pass-in jsx content, such as a button, in the top right corner

    __________________________________________
            |item name		|(jsxButtonContent)
      image	|rating			  |
            |price			  |
            |__________________________________
            |Description
    ___________________________________________
*/
export function displayOneItem(item:Item,jsxButtonContent:any)
{
  return(
      <Row> 
        <Col sm="3">
          {/* <Media object data-src={logo} /> */}
          <img src={getImageUrl(item)} style={{height:"100px",width:"auto"}}/>
        </Col>
        <Col>
          <Row>
            <Col>
              <Row><Col>{item.item_name}</Col></Row>
              <Row><Col>{item.avg_rating} / 10</Col></Row>
              <Row><Col><b>${item.price}</b></Col></Row>
            </Col>
            <Col>
              {jsxButtonContent}
            </Col>
          </Row> 
          <Row>
            <Col>
              {item.description} 
            </Col>
          </Row>
        </Col>
      </Row>
  );
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