import React from 'react';
import PropTypes from 'prop-types';
import IndustryReport from "../../Model/IndustryReport";
import Index from "../../Model/Index";
import Brand from "../../Model/Brand";

export default class IndustryReportViewer extends React.Component {
    static propTypes = {
        industryReport: PropTypes.instanceOf(IndustryReport),
        brands: PropTypes.arrayOf(PropTypes.instanceOf(Brand)),
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)),
    };

    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props);
        return (
            <div>

            </div>
        );
    }
}



