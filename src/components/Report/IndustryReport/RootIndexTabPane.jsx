import React from "react";
import PropTypes from "prop-types";
import Index from "../../Model/Index";
import {ChartSetting} from "./ChartSetting";
import IndustryReport from "../../Model/IndustryReport";
import {TabPane} from 'reactstrap';
import Brand from "../../Model/Brand";
import {List} from "react-virtualized";
import {ChartDrawer} from "./ChartDrawer";


export default class RootIndexTabPane extends React.Component {
    static propTypes = {
        rootIndex: PropTypes.instanceOf(Index),
        chartSettings: PropTypes.arrayOf(PropTypes.instanceOf(ChartSetting)),
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)),
        industryReport: PropTypes.instanceOf(IndustryReport),
        brands: PropTypes.arrayOf(PropTypes.instanceOf(Brand)),
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        chartHeight: PropTypes.number,
        tabId: PropTypes.any.isRequired
    };

    static defaultProps = {
        chartHeight: 300
    };

    constructor(props) {
        super(props);
    }

    rowRenderer({
                    index,       // Index of row
                    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                    key,         // Unique key within array of rendered rows
                    style        // Style object to be applied to row (to position it);
                                 // This must be passed through to the rendered row element.
                }) {
        return (
            <ChartDrawer brands={this.props.brands} industryReport={this.props.industryReport}
                         chartSetting={this.props.chartSettings[index]} visible={isVisible} key={key} style={style}
                         height={this.props.height}/>
        )
    }

    render() {
        return (
            <TabPane tabId={this.props.tabId}>
                <List height={this.props.height} width={this.props.width} rowCount={this.props.chartSettings.length}
                      rowHeight={this.props.chartHeight} rowRenderer={this.rowRenderer.bind(this)}/>
            </TabPane>
        );
    }

}

