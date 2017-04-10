import React from "react";
import {Link} from "react-router-dom";
//import { postSignup } from '../data/account';
import Formsy from "formsy-react";
//import MyInput from './../components/Input';
import "./SignUp.css";
import FormsyText from "formsy-material-ui/lib/FormsyText";
import FlatButton from "material-ui/FlatButton";
import {getAuthUser, postLogin} from "../data/account";
import SnackBar from "../components/SnackBar";

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    textfield: {
        width: '100%'
    },
    floatingLabelFocusStyle: {},
    underlineStyle: {},
    errorStyle: {
        lineHeight: '20px',
        bottom: -2
    }
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            message: '',
            snackBar: {open: false, message: ''}
        };
        this.submit = this.submit.bind(this);
        this.showSnackBar = this.showSnackBar.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }

    enableButton = () => {
        this.setState({
            canSubmit: true
        });
    };
    disableButton = () => {
        this.setState({
            canSubmit: false
        });
    };

    showSnackBar(message) {
        this.setState({snackBar: {open: true, message: message}});
    }

    closeSnackBar() {
        this.setState({snackBar: {open: false, message: ''}});
    }

    submit(param) {
        let updateToken = this.props.updateToken;
        let showSnackBar = this.props.showSnackBar;
        postLogin(param).then((response) => {
            if (response.data.success === false) {
                // TODO:display errors to user
                this.showSnackBar(response.data.message);
            } else if (response.data.token) {
                updateToken(response.data.token);
                showSnackBar('You\'ve logged in successfully.');
            } else {
                // unknown error
            }
        }, (error) => {
            // TODO:error handling
        });
    }

    render() {
        return (
            <div className="accountForm stayCenter mgTop40">
                <h1>Login</h1>
                <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}
                             className="login">
                    <ul>
                        <li>
                            <FormsyText value="" name="email" hintText="" floatingLabelText="Email"
                                        validations="isEmail" validationError="This is not a valid email"
                                        style={styles.textfield} errorStyle={styles.errorStyle}
                                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required/>
                        </li>
                        <li>
                            <FormsyText value="" name="password" type="password" hintText=""
                                        floatingLabelText="Password" validationError="At least 6 character"
                                        style={styles.textfield} errorStyle={styles.errorStyle}
                                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required/>
                        </li>
                    </ul>
                    <div className="floatWrap">
                        <div className="pullRight">
                            <FlatButton type="submit" label="Login" disabled={!this.state.canSubmit} className="bgPri"/>
                            {/*<FlatButton onTouchTap={this.handleTouchTap} label="Snackbar" />*/}
                        </div>
                    </div>
                </Formsy.Form>
                <SnackBar open={this.state.snackBar.open} message={this.state.snackBar.message}
                          close={this.closeSnackBar}/>
                <div className="mgTop60 taCenter">Not member yet? <Link to="/signup">Sign Up</Link></div>
            </div>
        );
    }
}

export class LoginNavbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.token === '')
            return (
                <span>
                    <FlatButton label="Sign Up" containerElement={<Link to="/signup"/>}/>
                    <FlatButton label="Login" containerElement={<Link to="/login"/>}/>
                </span>
            );
        else return false;
    };
}


class DropDown extends React.Component {
    static propTypes = {
        id: React.PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        // Dropdown block is inactive & hidden by default
        this.state = {
            dropdownIsActive: false,
            dropdownIsVisible: false,
        };

        // We should bind `this` to click event handler right here
        this.hideDropdown = this.hideDropdown.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.hello = this.hello.bind(this);
        this.stopPropagation = this.stopPropagation.bind(this)
    }

    componentDidMount() {
        // Hide dropdown block on click outside the block
        window.addEventListener('click', this.hideDropdown, false);
    }

    componentWillUnmount() {
        // Remove click event listener on component unmount
        window.removeEventListener('click', this.hideDropdown, false);
    }

    stopPropagation(e) {
        // Stop bubbling of click event on click inside the dropdown content
        e.stopPropagation();
    }

    toggleDropdown() {
        const {dropdownIsVisible} = this.state;
        // Toggle dropdown block visibility
        this.setState({dropdownIsVisible: !dropdownIsVisible});
    }

    hideDropdown() {
        const {dropdownIsActive} = this.state;
        // Hide dropdown block if it's not active
        if (!dropdownIsActive) {
            this.setState({dropdownIsVisible: false});
        }
    }

    handleFocus() {
        // Make active on focus
        this.setState({dropdownIsActive: true});
    }


    handleBlur() {
        // Clean up everything on blur
        this.setState({
            dropdownIsVisible: false,
            dropdownIsActive: false,
        });
    }

    hello() {
        alert('alert')
    }

    renderDropdown() {
        const dropdownId = this.props.id;
        const {dropdownIsVisible} = this.state;

        console.log(this.props.id)
        if (dropdownId == 1) {
            return (
                <div tabIndex={dropdownId}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     onClick={this.toggleDropdown}
                >
        <span className="toggler">
             <div className="userIcon"><i className="iconfont icon-my"></i></div>
        </span>
                    { dropdownIsVisible &&
                    <div className="userDropDown">
                        <div className="item" onClick={this.hello}>
                            Do something!
                        </div>
                        <div className="item" onClick={this.hello}>
                            Do something!
                        </div>
                        <div>
                            <div  onClick={this.stopPropagation}>
                        <FlatButton label="Requests" containerElement={<Link to="/request"/>} />
                            </div>

                        </div>
                        <div className="item" onClick={this.hello}>
                        Do something!
                    </div>
                        <div className="item" onClick={this.hello}>
                            Do something!
                        </div>

                    </div>
                    }
                </div>
            );
        }

        if (dropdownId == 2) {
            return (
                <div tabIndex={dropdownId}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     onClick={this.toggleDropdown}
                >
        <span className="toggler">
             <div className="userIcon" onClick={this.handleTouchTap}><i className="iconfont icon-my"></i></div>
        </span>
                    { dropdownIsVisible &&
                    <div className="content">
                        <div className="item">
                           asd jkaldj asldj l
                        </div>
                    </div>
                    }
                </div>
            );
        }


    }


    render() {
        return (
            <div className="dropdown">
                {this.renderDropdown()}
            </div>
        );
    }

}

export class GetUserInfo extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            token: this.props.token,
            userName: '',
            userEmail: '',
            userId: '',
            dropdownOpen: false
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.logout = this.logout.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    getUserInfo() {
        if (this.state.token)
            getAuthUser(this.state.token).then((data) => {
                this.setState({userEmail: data.email, userName: data.email, userId: data.id});
            })
    }

    logout() {
        this.setState({token: '', userEmail: '', userName: '', userId: ''});
        this.props.updateToken('');
        this.props.showSnackBar('You\'ve logged out successfully.');
        localStorage.removeItem("token");
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            dropdownOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            dropdownOpen: false,
        });
    };


    componentDidMount() {
        this.getUserInfo()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.setState({
                token: nextProps.token,
                updated: false
            });
        }
    }

    componentDidUpdate() {
        if (!this.state.updated) {
            this.getUserInfo();
            this.setState({updated: true});
        }
    }


    render() {
        console.log(this.state.dropdownOpen)


        if (this.state.token !== '') {
            return (
                <div className={"userNav " + (this.state.dropdownOpen ? 'dropOpen' : 'dropHide')}>


                    <DropDown id="1"/>
                    <DropDown id="2"/>


                    <div className="userIcon" onClick={this.handleTouchTap}><i className="iconfont icon-my"></i></div>
                    <div className="dropDown">
                        <Popover
                            open={this.state.dropdownOpen}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu>
                                <MenuItem primaryText={this.state.userName}/>
                                <MenuItem primaryText="Refresh"/>
                                <MenuItem primaryText="Help &amp; feedback"/>
                                <MenuItem primaryText="Settings"/>
                                <MenuItem primaryText="Sign out" onClick={this.logout}/>
                            </Menu>
                        </Popover>

                    </div>
                </div>
            )
        }
        else
            return false;

    }
}


export default Login;