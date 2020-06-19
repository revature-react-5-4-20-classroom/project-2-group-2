import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import {User} from '../models/User'


interface ILogoutComponentProps {
    
    updateUser : (user:User | null) => void;
}

interface ILogoutComponentState {
    
    toLogin: boolean;
}

export class  NavbarComponent extends React.Component<ILogoutComponentProps, ILogoutComponentState> {

    constructor(props:ILogoutComponentProps){
        super(props);
        this.state = {
            toLogin : false
        }
    }
    logout = async (event:any)=>{
        event.preventDefault();
        this.props.updateUser(null);
        this.setState({toLogin:true});
    }

render(){

    if(this.state.toLogin){
        return(<Redirect to="/"></Redirect>)
        
    } else{
        return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Shopping</Link>
                    
                    <ul className="right">
                        <li><Link to="/view">Shop</Link></li>
                        <li><Link to="/myprofile">My Profile</Link></li>
                        <li><Link to="/checkout"><i className="material-icons">shopping_cart</i></Link></li>
                        <li><a href="#" onClick={this.logout}>Logout</a></li>
                    </ul>
                </div>
            </nav>  
        )
    }
    
}
    
}

export default NavbarComponent;