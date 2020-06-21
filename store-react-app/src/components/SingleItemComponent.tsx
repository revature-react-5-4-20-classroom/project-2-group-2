import React from 'react'
import {IState} from '../redux/reducers';
import { connect, Provider } from 'react-redux';
import { SubmitReviewComponent } from './SubmitReviewComponent';
import {itemClickActionMapper} from '../redux/action-mapper';
import {Item} from '../models/Item';
import { Row, Col, Button, Container, Jumbotron, ListGroupItem, ListGroup } from 'reactstrap';
import { getImageUrl } from '../api/getImageUrl';
import { prnt } from '../Helpers';
import { Link } from 'react-router-dom';
import { ViewAllReviews } from './ViewAllReviews';

const debug=false//prnt will display

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
        super(props)
    }


    render(){

       return(
          <Container>
            <Jumbotron>
              <ListGroup>
                <ListGroupItem>{this.dispayTheItem()}</ListGroupItem>

                {/* <h4>{this.props.item_name}</h4>
                <span>{this.props.price}</span>
                <p>{this.props.description}</p>
                <span>{this.props.avg_rating}</span> */}

                <ListGroupItem>
                  <SubmitReviewComponent itemId={this.props.item_id} userId = "1" parent={this}/>
                </ListGroupItem>
              </ListGroup>

              <ViewAllReviews itemId={parseInt(this.props.item_id)}/>

            </Jumbotron>
          </Container>
       );
    }

    dispayTheItem()
    {
      //convert the redux stuff into an item object
      let itemAsAnObject=new Item(
        this.props.item_id.toString(),
        this.props.item_name,
        this.props.price.toString(),
        this.props.description,
        this.props.category_id.toString(),
        this.props.avg_rating.toString(),
        this.props.img_path,
      )

      prnt(debug,`dispayTheItem() itemAsAnObject=`,itemAsAnObject)

      return displayOneItem(itemAsAnObject)
    }
}

/*
  displayOneItem(item,this.props.itemClickActionMapper?,jsxButtonContent?)

  displayOneItem(item,this.props.itemClickActionMappe,<Button>Click me</Button>r)

  displays the item in a nice way with its image, name, rating, description...
  jsxButtonContent. you can pass-in jsx content, such as a button, in the top right corner
  this.props.itemClickActionMapper. can be passeed in so the item can be clicked on and viewed on its own page.

    __________________________________________
            |(item name)		|<jsxButtonContent>
      image	|rating			    |
            |price			    |
            |__________________________________
            |Description
    ___________________________________________
*/
export function displayOneItem(item:Item,funcViewItemActionMapper?:any,jsxButtonContent?:any)
{
  prnt(debug,`displayOneItem() item=`,item)

  let jsxItemName=(<>{item.item_name}</>)

  //if we have an action mapper we can setup the item name to be clicked on
  //this will then view the item on its own page
  if(funcViewItemActionMapper)
  {
    jsxItemName=(
      <Link to="/viewitem" onClick={
            ()=>{
              prnt(debug,`Linked!`)
              funcViewItemActionMapper(item)
            }
          }>
        {item.item_name}  
      </Link>
    )
  }

   return(
      <Row> 
        <Col sm="3">
          {/* <Media object data-src={logo} /> */}
          <img src={getImageUrl(item)} style={{height:"100px",width:"auto"}}/>
        </Col>
        <Col>
          <Row>
            <Col>
              <h5>
                {/* <a href="/viewitem#"
                id={item.toString()}
                onClick={
                  (event:any)=>{
                    event.preventDefault()
                  }
                }> */}
                
                {/* <Link to={
                  {
                    pathname:"/viewitem",
                    hash:`#${item.toString()}`,
                    
                  }
                }> */}
                {jsxItemName}
                
                {/* </a> */}
              </h5>
              {item.avg_rating} / 5<br/>
              <b>${item.price}</b>
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
  )
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