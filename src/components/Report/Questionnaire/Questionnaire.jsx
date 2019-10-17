import React from 'react';
import {generateRandomId} from "../../Utils/UtilFunctions";

export default class Questionnaire extends React.Component {
    constructor(props) {
        super(props);

        this.resizeHeight = this.resizeHeight.bind(this);
        this.id = generateRandomId();
        this.state = {
            height: 0
        }
    }

    resizeHeight() {
        let clientRect = this.iframe.getClientRects()[0];
        // 60为底部栏的高度
        let height = window.innerHeight - clientRect.top - 60;
        if (this.state.height !== height) {
            this.setState({height})
        }
    }

    componentDidMount() {
        this.resizeHeight();
        window.addEventListener("resize", this.resizeHeight)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHeight)
    }

    render() {
        return (
            <iframe ref={instance => this.iframe = instance} src={process.env.REACT_APP_QUESTIONNAIRE_URL}
                    style={{width: "100%", height: this.state.height, borderWidth: 0}}>
            </iframe>
        )
    }
}
