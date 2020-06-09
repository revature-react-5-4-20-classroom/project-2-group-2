import React from 'react';
import { Jumbotron, Container, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Button } from 'reactstrap';

// Component for displaying a list of items corresponding to a specific category

interface IItemBrowseComponentProps {
    loggedInUser: any
}

interface IItemBrowseComponentState {
    itemList: any[],
    categoryFilter: number,
    categoryName: string,
}

export class ItemBrowseComponent extends React.Component<IItemBrowseComponentProps,IItemBrowseComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            itemList: [],
            categoryFilter: 0,
            categoryName: "(none)"
        }
    }

    // temporarily setting the item list as a bunch of strings
    componentDidMount() {
        this.setState({
            itemList: ["Shirt", "Harry Potter", "Nintendo Switch", "The Stand", "Laptop"]
        })
    }

    // change the selected category, get items based on that category
    changeCategory = (e: any) => {
        const categoryId = e.currentTarget.value;
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
        // newItems : Item[] = getItemsByCategory(this.state.categoryFilter)
        // this.setState({ categoryFilter: newItems })
        console.log("Hello from inside getItems!")
    }

    // temporary render, just to get a feel for the page.
    render() {
        return(
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
                                    <DropdownItem id="electronics" calue={3} onClick={this.changeCategory}>Electronics</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                    <ListGroup>
                        {/* Note: these will be real item properties, not strings */}
                        {this.state.itemList.map((item: string, i) => {
                            return( <ListGroupItem key={i}>
                                <Row>
                                    <Col xs='auto'>Image</Col>
                                    <Col xs='auto'>{item}</Col>
                                    <Col xs='auto'>Item description</Col>
                                    <Col xs='auto'><Button color="primary">Add to cart</Button></Col>
                                </Row>
                            </ListGroupItem>)
                        })}
                    </ListGroup>
                </Container>
            </Jumbotron>
        );
    }
}