import React from 'react';
import { User } from "../models/User";
import { UpdateUserInfo } from "./UpdateUserInfo"
import { Jumbotron, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

interface IProfileComponentProps {
    loggedInUser: User | null,
    updateUser: (u: User) => void,
}

interface IProfileComponentState {
    isModal: boolean
}

export class ProfileComponent extends React.Component<IProfileComponentProps,IProfileComponentState> {

    constructor(props: IProfileComponentProps) {
        super(props);
        this.state = {
            isModal: false,
        }
    }

    toggleModal = () => {
        this.setState({
            isModal: !this.state.isModal,
        })
    }
    
    render() {
        return(
            <>
            <Jumbotron>
                <h1 className="display-3">User Profile for {this.props.loggedInUser?.firstName + ' ' + this.props.loggedInUser?.lastName}</h1>
                <hr className="my-2"/>
                <p className="lead">First Name: {this.props.loggedInUser?.firstName}</p>
                <p className="lead">Last Name: {this.props.loggedInUser?.lastName}</p>
                <p className="lead">Display Name: {this.props.loggedInUser?.username}</p>
                <p className="lead">Email: {this.props.loggedInUser?.email}</p>
                <p className="lead">Address: {this.props.loggedInUser?.address}
                    , {this.props.loggedInUser?.addressCity}
                    , {this.props.loggedInUser?.addressState} {this.props.loggedInUser?.addressZipcode}</p>
                <Button color="primary" onClick={this.toggleModal}>Update Profile</Button>
            </Jumbotron>
            <Modal isOpen={this.state.isModal}>
                <ModalHeader toggle={this.toggleModal}>Update User Profile</ModalHeader>
                <ModalBody>
                    {this.props.loggedInUser !== null ? <UpdateUserInfo loggedInUser={this.props.loggedInUser} updateUser={this.props.updateUser}/> : ''}
                </ModalBody>
            </Modal>
            </>
        );
    }
}