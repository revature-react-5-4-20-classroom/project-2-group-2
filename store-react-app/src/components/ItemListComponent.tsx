import React from 'react';
import { IState } from '../redux/reducers';
import { Jumbotron, Container, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Item } from '../models/Item';
import { getItemsByCategory, getAllItems } from '../api/StoreClient';
import { itemClickActionMapper,addClickActionMappper } from '../redux/action-mapper';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReduxCartComponent } from './CartComponent';

// Component for displaying a list of items corresponding to a specific category

interface IItemListComponentProps {
    item_id:    string;
    item_name:  string;
    price:      string;
    description:string;
    category_id:string;
    avg_rating: string;
    img_path:   string;
    items : Item[];
    itemClickActionMapper: (item:Item) => void;
    addClickActionMappper:(item:Item, index:number|undefined) => void;
}

interface IItemListComponentState {
    itemList: any[],
    categoryFilter: number,
    categoryName: string,
    isError: boolean,
    errorMessage: string,
    redirect: number | null,
}

export class ItemListComponent extends React.Component<IItemListComponentProps,IItemListComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            itemList: [],
            categoryFilter: 0,
            categoryName: "(none)",
            isError: false,
            errorMessage: "",
            redirect: null,
        }
    }

    // temporarily setting the item list as a bunch of strings
    componentDidMount() {
        this.getItems();
    }

    // change the selected category, get items based on that category
    changeCategory = (e: any) => {
        const categoryId = parseInt(e.currentTarget.value);
        let newCatName: string;
        switch(categoryId) {
            case 1: newCatName='books'; break;
            case 2: newCatName='clothing'; break;
            case 3: newCatName='electronics'; break;
            default: newCatName='(none)';
        }
        this.setState({
            categoryFilter: categoryId,
            categoryName: newCatName,
        }, this.getItems);
    }

    getItems = async () => {
        try {
            let newItems: Item[];
            if(this.state.categoryFilter !== 0) {
                newItems = await getItemsByCategory(this.state.categoryFilter);
            } else {
                newItems = await getAllItems();
            }
            this.setState({ itemList: newItems });
        } catch(e) {
            // For now this doesn't do much, since you can't really have an invalid category id parameter
            this.setState({
                isError: true,
                errorMessage: e.message,
            }); 
        }
    }
    addToCart = (e : any) => {
        e.preventDefault();
        let value: number = parseInt(e.currentTarget.id);
        const clickedItem: Item = this.state.itemList[value];
        this.props.addClickActionMappper(clickedItem, undefined);
    }

    toggleRedirect = (e: any) => {
        e.preventDefault();
        let value: number = parseInt(e.currentTarget.id);
        const clickedItem: Item = this.state.itemList[value];
        this.props.itemClickActionMapper(clickedItem);
        if(this.state.redirect === null) {
            this.setState({
                redirect: value,
            });
        } else {
            this.setState({
                redirect: null,
            });
        }
    }

    clearError = () => {
        this.setState({
            isError: false,
            errorMessage: "",
        });
    }

    // temporary render, just to get a feel for the page.
    render() {
        return(
            <>
            {this.state.redirect === null ?
            <Jumbotron>
                <Container>
                    <Row>
                        <Col xs='auto'><h2>Browse Items</h2></Col>
                        <Col xs='auto'>
                            <UncontrolledDropdown>
                                <DropdownToggle caret>Category: {this.state.categoryName}</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem id="(none)" value={0} onClick={this.changeCategory} defaultChecked>(none)</DropdownItem>
                                    <DropdownItem id="books" value={1} onClick={this.changeCategory}>Books</DropdownItem>
                                    <DropdownItem id="clothing" value={2} onClick={this.changeCategory}>Clothing</DropdownItem>
                                    <DropdownItem id="electronics" value={3} onClick={this.changeCategory}>Electronics</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                    <ListGroup>
                        {/* I'm still not 100% sure what component is being displayed for each list item, so this is likely temporary */}
                        {this.state.itemList.map((item: Item, i) => {
                            return( <ListGroupItem key={i}>
                                <Row>
                                    <Col xs='auto'>Image</Col>
                                    <Col xs='auto'><a href='#' onClick={this.toggleRedirect} id={i.toString()}>{item.item_name}</a></Col>
                                    <Col xs='auto'>{item.description}</Col>
                                    <Col xs='auto'><Button color="primary" id={i.toString()} onClick={this.addToCart}>Add to cart</Button></Col>
                                </Row>
                            </ListGroupItem>)
                        })}
                    </ListGroup>
                </Container>
            </Jumbotron> :
            
            <>
            <Button onClick={this.toggleRedirect} id="0">Back To Items</Button>
            <Redirect to="/viewitem"/>
            </>}
            <>
                <ReduxCartComponent />
            </>
            </>

        );
    }
}

// Redux component
const mapStateToProps = (state:IState) =>{
    return{
      ...state.item,
      ...state.items
    }
  }

  const mapDispatchToProps = {   
    itemClickActionMapper,
    addClickActionMappper
}

export const ReduxItemListComponent = connect(mapStateToProps, mapDispatchToProps)(ItemListComponent)