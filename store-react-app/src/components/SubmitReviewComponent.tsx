import React from 'react'
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody, Container, Jumbotron, ListGroupItem } from 'reactstrap';
import {submitReview} from '../api/StoreClient'

interface IReviewState{
    rating:string,
    reviewText: string;
    reviewHasBeenSubmitted:boolean,
}

interface IReviewProps{
    itemId : string,
    userId: string,
}

export class SubmitReviewComponent extends React.Component<IReviewProps,IReviewState>{

    constructor(props:any){
        super(props)
        this.state ={
            rating:'',
            reviewText:'',
            reviewHasBeenSubmitted:false,
        }
    }

    setRating = (rate: any) => {
        this.setState({
          rating: rate.currentTarget.value,
        })
      }
      setReviewText = (text: any) => {
        this.setState({
          reviewText: text.currentTarget.value,
        })
      }

      submitReview = async (event: any) => {
        event.preventDefault();
       
        try {
              const review  = await submitReview(this.state.rating, this.state.reviewText, this.props.userId, this.props.itemId);
        } catch (error) {
            console.log(error)
        }

        this.setState({
            reviewHasBeenSubmitted:true,
        })
      }

    render()
    {
        if(this.state.reviewHasBeenSubmitted)
        {
            return(<h3>Thank you for submitting a review</h3>)
        }
        else
        {
            return(<>
                
                <Form onSubmit={this.submitReview} autoComplete='off'>
                    <FormGroup>
                        <Label for="Rating" >Please rate the product on a scale of 1 to 5!</Label>
                        <Col >
                        {/* onChange lets Input change state, value lets Input display state */}
                        <Input onChange={this.setRating} value={this.state.rating} type="text" name="rating" id="rating" placeholder="rating" />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="reviewText" >Tell us about your experience with this product!</Label>  
                        <textarea onChange={this.setReviewText} value={this.state.reviewText}  />
                        
                    </FormGroup>
                    <Button color="info">Submit</Button>
                </Form>
            </>)
        }
    }
}