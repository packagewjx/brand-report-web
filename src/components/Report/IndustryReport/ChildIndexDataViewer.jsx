import React from 'react';
import PropTypes from 'prop-types';
import Index from "../../Model/Index";
import IndustryReport from "../../Model/IndustryReport";
import {List} from 'react-virtualized';
import {ChartSetting} from "./ChartSetting";

export default class ChildIndexDataViewer extends React.Component {
    static propTypes = {
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)).isRequired,
        rootIndex: PropTypes.instanceOf(Index).isRequired,
        industryReport: PropTypes.instanceOf(IndustryReport).isRequired,
        height: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
    }

    static getChildLeafIndices(indices, rootIndex) {
        let parentMap = new Map();
        for (let i = 0; i < indices.length; i++) {
            let index = indices[i];
            let parArr = parentMap.get(index.parentIndexId);
            if (typeof parArr === "undefined") {
                parArr = [];
            }
            parArr.push(index);
            parentMap.set(index.parentIndexId, parArr);
        }

        let queue = [rootIndex];
        let childLeafIndices = [];
        while (queue.length > 0) {
            let cur = queue.shift();
            let childIndices = parentMap.get(cur.indexId);
            for (let i = 0; i < childIndices.length; i++) {
                if (childIndices[i].type === "indices") {
                    queue.push(childIndices[i])
                } else {
                    childLeafIndices.push(childIndices[i]);
                }
            }
        }
        return childLeafIndices;
    }

    static getSettings(indices, rootIndex) {
        let settings = [];
        let childLeafIndices = this.getChildLeafIndices(indices, rootIndex);
        for (let i = 0; i < childLeafIndices; i++) {
            settings.push(new ChartSetting([childLeafIndices[i]]));
        }
        return settings;
    }

    getRowRenderer(settings, industryReport) {
        return function (
            index,       // Index of row
            isScrolling, // The List is currently being scrolled
            isVisible,   // This row is visible within the List (eg it is not an overscanned row)
            key,         // Unique key within array of rendered rows
            parent,      // Reference to the parent List (instance)
            style        // Style object to be applied to row (to position it);
                         // This must be passed through to the rendered row element.
        ) {
            if (!isVisible) {
                return (
                    <div key={key} style={style}/>
                );
            }


        }
    }

    render() {
        let settings = ChildIndexDataViewer.getSettings(this.props.indices, this.props.rootIndex);
        let rowRenderer = this.getRowRenderer(settings, this.props.industryReport);

        return (
            <div style={{height: this.props.height}}>
                <List height={this.props.height} rowCount={settings.length} rowHeight={200}
                      rowRenderer={rowRenderer}/>
            </div>
        );
    }
}

class IndexChart extends React.Component {
    static propTypes = {
        setting: PropTypes.instanceOf(ChartSetting).isRequired,
        industryReport: PropTypes.instanceOf(IndustryReport).isRequired,
        style: PropTypes.object,
        key: PropTypes.any,
    };

    render() {
        let indices = this.props.indices;
        let report = this.props.industryReport;
        let canvasId = "canvas-" + this.props.key;
        let setting = this.props.setting;


        return (
            <div style={this.props.style} key={this.props.key}>
                <canvas id={canvasId}/>
            </div>
        )
    }
}


