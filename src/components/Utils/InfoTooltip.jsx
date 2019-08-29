import React from "react";
import {generateRandomId} from "./UtilFunctions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {Tooltip} from 'reactstrap';

export class InfoTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.id = generateRandomId();
        this.state = {
            isOpen: false,
        }
    }


    toggle() {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <>
                <span id={this.id}>
                    <FontAwesomeIcon color="lightgrey" fixedWidth={true} icon={faInfoCircle}/>
                </span>
                <Tooltip isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} target={this.id}>
                    {this.props.children}
                </Tooltip>
            </>

        );
    }
}
