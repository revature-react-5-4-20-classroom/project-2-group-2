import React from 'react';
import { User } from '../models/User';
import { Form, FormGroup, Label, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { updateUserInfo } from '../api/StoreClient';

//Component for updating user information

interface IUpdateUserComponentProps {
    loggedInUser: User | null,
    updateUser: (u: User) => void,
}

interface IUpdateUserComponentState {
    newUsername: string,
    newPassword: string,
    confirmPassword: string,
    newFirstName: string,
    newLastName: string,
    newEmail: string,
    newAddress: string,
    newAddressCity: string,
    newAddressState: string,
    newAdressZipcode: string,
    isUpdated: boolean,
    isError: boolean,
    errorMessage: string,
}

export class UpdateUserInfo extends React.Component<IUpdateUserComponentProps,IUpdateUserComponentState> {

    constructor(props:any) {
        super(props);
        this.state = {
            newUsername: '',
            newPassword: '',
            confirmPassword: '',
            newFirstName: '',
            newLastName: '',
            newEmail: '',
            newAddress: '',
            newAddressCity: '',
            newAddressState: '',
            newAdressZipcode: '',
            isUpdated: false,
            isError: false,
            errorMessage: '',
        }
    }

    componentDidMount() {
        const u: any = this.props.loggedInUser;
        this.setState({
            newUsername: u.username,
            newPassword: u.password,
            newFirstName: u.firstName,
            newLastName: u.lastName,
            newEmail: u.email,
            newAddress: u.address,
            newAddressCity: u.addressCity,
            newAddressState: u.addressState,
            newAdressZipcode: u.addressZipcode,
        });
    }

    handleChange = (e: any) => {
        // @ts-ignore
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        });
    }

    clearError = () => {
        this.setState({
            isError: false,
            errorMessage: '',
        })
    }

    submitForm = async(e:any) => {
        e.preventDefault();
        // applying all edits: unedited fields will not change
        const fieldsToUpdate = {
            userId: this.props.loggedInUser?.userId,
            username: this.state.newUsername,
            password: this.state.newPassword,
            firstName: this.state.newFirstName,
            lastName: this.state.newLastName,
            email: this.state.newEmail,
            address: this.state.newAddress,
            addressCity: this.state.newAddressCity,
            addressState: this.state.newAddressState,
            addressZipcode: this.state.newAdressZipcode,
        }
        try{
            let updatedUser: any;
            if(fieldsToUpdate.password !== this.state.confirmPassword){
                throw new Error('Password does not match!')
            }
            for(let key in fieldsToUpdate) {
                // @ts-ignore
                if(fieldsToUpdate[key] === '') {
                    throw new Error('Please include all fields');
                }
            }
            updatedUser = await updateUserInfo(fieldsToUpdate);
            this.setState({
                isUpdated: true,
            });
            // For changing the logged in profile
            this.props.updateUser(updatedUser);
        } catch(e) {
            console.log(e.message);
            this.setState({
                confirmPassword: '',
                isError: true,
                errorMessage: e.message,
            })
        }
    }

    render() {
        if(this.state.isUpdated) {
            return(
                <div>
                    <h1>User info successfully updated!</h1>
                </div>
            );
        } else {
            return(
                <div>
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                            <Label for="Username">Username</Label>
                            <Input onChange={this.handleChange} id="Username" name="newUsername" value={this.state.newUsername} type="text" placeholder="Enter a username"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input onChange={this.handleChange} id="Password" name="newPassword" value={this.state.newPassword} type="password" placeholder="Enter a password"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="ConfirmPassword">Re-enter Password</Label>
                            <Input onChange={this.handleChange} id="ConfirmPassword" name="confirmPassword" value={this.state.confirmPassword} type="password" placeholder="Re-enter password"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="FirstName">First Name</Label>
                            <Input onChange={this.handleChange} id="FirstName" name="newFirstName" value={this.state.newFirstName} type="text" placeholder="Enter your first name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="LastName">Last Name</Label>
                            <Input onChange={this.handleChange} id="LastName" name="newLastName" value={this.state.newLastName} type="text" placeholder="Enter your last name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input onChange={this.handleChange} id="Email" name="newEmail" value={this.state.newEmail} type="text" placeholder="Enter your email"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Address">Address</Label>
                            <Input onChange={this.handleChange} id="Address" name="newAddress" value={this.state.newAddress} type="text" placeholder="Enter your street address"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="City">City</Label>
                            <Input onChange={this.handleChange} id="City" name="newAddressCity" value={this.state.newAddressCity} type="text" placeholder="Enter your city"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="State">State</Label>
                            <Input onChange={this.handleChange} id="State" name="newAddressState" value={this.state.newAddressState} type="text" placeholder="Enter your state" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Zip">Zip Code</Label>
                            <Input onChange={this.handleChange} id="Zip" name="newAddressZipcode" value={this.state.newAdressZipcode} type="text" placeholder="Enter your zip code" />
                        </FormGroup>
                        <Button color="primary">Submit</Button>
                        <Toast isOpen={this.state.isError}>
                            <ToastHeader icon="danger" toggle={this.clearError}>Submission Error:</ToastHeader>
                            <ToastBody>{this.state.errorMessage}</ToastBody>
                        </Toast>
                    </Form>
                </div>
            );
        }
    }
}