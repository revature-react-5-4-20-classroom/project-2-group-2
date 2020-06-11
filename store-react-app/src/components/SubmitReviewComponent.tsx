import React from 'react'
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import {submitReview} from '../api/StoreClient'


interface IReviewState{
    rating:string,
    reviewText: string;
}

interface IReviewProps{
    itemId : string,
    userId: string
}



export class SubmitReviewComponent extends React.Component<any,IReviewState>{

    constructor(props:any){
        super(props)
        this.state ={
            rating:'',
            reviewText:''
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
      }



    render(){
        return(
            <>
                <Form onSubmit={this.submitReview} autoComplete='off'>
                <FormGroup row>
                    <Label for="Rating" sm={2}>Please rate the product on a scale of 1 to 5!</Label>
                    <Col sm={6}>
                    {/* onChange lets Input change state, value lets Input display state */}
                    <Input onChange={this.setRating} value={this.state.rating} type="text" name="rating" id="rating" placeholder="rating" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="reviewText" sm={2}>Tell us about your experience with this product!
                    <textarea onChange={this.setReviewText} value={this.state.reviewText}  />
                    </Label>  
                </FormGroup>
                <Button color="info">Submit</Button>
            </Form>

            </>
        )
    }
}