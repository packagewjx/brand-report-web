import React from 'react';
import PropTypes from 'prop-types';
import Index from "../../Model/Index";
import IndustryReport from "../../Model/IndustryReport";
import {List} from "react-virtualized";

export default class ChildIndexDataViewer extends React.Component {
    static propTypes = {
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)).isRequired,
        rootIndex: PropTypes.instanceOf(Index).isRequired,
        industryReport: PropTypes.instanceOf(IndustryReport).isRequired,
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

    render() {
        let childLeafIndices = ChildIndexDataViewer.getChildLeafIndices(this.props.indices, this.props.rootIndex);


        return (
            <div>
                <List></List>
            </div>
        );
    }

}
