import React from 'react'
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import {createUser} from '../api/StoreClient';
import { Redirect } from 'react-router-dom';

interface ICreateUserState {
    username: string,
    password: string,
    firstName:string,
    lastName:string,
    email:string,
    address:string,
    city:string,
    state:string,
    zipCode:string
    errorMessage:string,
    redirect:boolean| null,
    isError:boolean
}


export class CreateUserComponent extends React.Component<any,ICreateUserState>{


    constructor(props:any){
        super(props);

        this.state ={
            username: '',
             password: '',
            firstName:'',
            lastName:'',
            email:'',
            address:'',
            city:'',
            state:'',
            zipCode:'',
            errorMessage:'',
            isError:false,
            redirect:null
        }
    }

    setUsername = (un: any) => {
        this.setState({
          username: un.currentTarget.value,
        })
      }
    
      setPassword = (pw: any) => {
        this.setState({
          password: pw.currentTarget.value,
        })
      }

      setEmail = (email: any) => {
        this.setState({
          email: email.currentTarget.value,
        })
      }

      setFirstName = (fname: any) => {
        this.setState({
          firstName: fname.currentTarget.value,
        })
      }
      setLastName = (lname: any) => {
        this.setState({
          lastName: lname.currentTarget.value,
        })
      }

      setAddress = (address: any) => {
        this.setState({
          address: address.currentTarget.value,
        })
      }
      setCity = (city: any) => {
        this.setState({
          city: city.currentTarget.value,
        })
      }

      setNewState = (state: any) => {
        this.setState({
          state: state.currentTarget.value,
        })
      }
      setZip = (zip: any) => {
        this.setState({
          zipCode: zip.currentTarget.value,
        })
      }

     
      clearError = () => {
        this.setState({
          errorMessage: '',
          isError: false,
        })
      }

      createUser = async (event: any) => {
        event.preventDefault();
       
        
        try {
              const newUser  = await createUser(this.state.username, this.state.password, this.state.email, this.state.firstName, this.state.lastName, this.state.address, this.state.city, this.state.state, this.state.zipCode);
              this.setState({
                  redirect:true
              })
        } catch (error) {
            console.log(error);
        }
      }
       


    render(){

        if(this.state.redirect){
            this.setState({
                redirect :false
            })
            return(
                <Redirect to="/login"></Redirect>
            )
        }else{
            return(
                <div>
            <Form onSubmit={this.createUser} autoComplete='off'>
              <FormGroup row>
                <Label for="username" sm={2}>Username</Label>
                <Col sm={6}>
                  {/* onChange lets Input change state, value lets Input display state */}
                  <Input onChange={this.setUsername} value={this.state.username} type="text" name="username" id="username" placeholder="your username" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={2}>Password</Label>
                <Col sm={6}>
                  <Input onChange={this.setPassword} value={this.state.password} type="password" name="password" id="password" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="email" sm={2}>Email</Label>
                <Col sm={6}>
                  <Input onChange={this.setEmail} value={this.state.email}  type="text" name="email" id="email" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="fname" sm={2}>First Name</Label>
                <Col sm={6}>
                  <Input onChange={this.setFirstName} value={this.state.firstName}  type="text" name="firstname" id="firstname" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lname" sm={2}>Last Name</Label>
                <Col sm={6}>
                  <Input onChange={this.setLastName} value={this.state.lastName}  type="text"  name="lastname" id="lastname" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="address" sm={2}>Address</Label>
                <Col sm={6}>
                  <Input onChange={this.setAddress} value={this.state.address} type="text" name="address" id="address" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="city" sm={2}>City</Label>
                <Col sm={6}>
                  <Input onChange={this.setCity} value={this.state.city} type="text" name="city" id="city" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="state" sm={2}>State</Label>
                <Col sm={6}>
                  <Input onChange={this.setNewState} value={this.state.state} type="text" name="state" id="state" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="zip" sm={2}>Zipcode</Label>
                <Col sm={6}>
                  <Input onChange={this.setZip} value={this.state.zipCode} type="text" name="zip" id="zip" required />
                </Col>
              </FormGroup>
              <Button color="info">Submit</Button>
            </Form>
            <Toast isOpen={this.state.isError}>
              <ToastHeader icon="danger" toggle={this.clearError}>
                Error!
              </ToastHeader>
              <ToastBody>
                {this.state.errorMessage}
              </ToastBody>
      
            </Toast>
            </div>
            )
        }

        
    }
}