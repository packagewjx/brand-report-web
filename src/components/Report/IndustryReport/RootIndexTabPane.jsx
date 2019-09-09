import React from "react";
import PropTypes from "prop-types";
import Index from "../../Model/Index";
import {ChartSetting} from "./ChartSetting";
import IndustryReport from "../../Model/IndustryReport";
import {TabPane} from 'reactstrap';
import {AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller} from "react-virtualized";
import {ChartDrawer} from "./ChartDrawer";


export default class RootIndexTabPane extends React.Component {
    static propTypes = {
        rootIndex: PropTypes.instanceOf(Index),
        chartSettings: PropTypes.arrayOf(PropTypes.instanceOf(ChartSetting)),
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)),
        industryReport: PropTypes.instanceOf(IndustryReport),
        brandMap: PropTypes.instanceOf(Map),
        tabId: PropTypes.any.isRequired,
        activeTab: PropTypes.any
    };

    constructor(props) {
        super(props);


        this.cellMeasureCache = new CellMeasurerCache({
            fixedWidth: true
        })
    }

    rowRenderer({
                    key,         // Unique key within array of cells
                    parent,      // Reference to the parent Grid (instance)
                    index,    // Vertical (row) index of cell
                    style        // Style object to be applied to cell (to position it);
                                 // This must be passed through to the rendered cell element.
                }) {
        let list = this.list;
        let cellMeasureCache = this.cellMeasureCache;
        return (
            <CellMeasurer key={key} cache={this.cellMeasureCache} columnIndex={0} parent={parent} rowIndex={index}
                          style={style}>
                <ChartDrawer brandMap={this.props.brandMap} industryReport={this.props.industryReport}
                             chartSetting={this.props.chartSettings[index]} style={style} width={parent.props.width}
                             onHeightChanged={() => {
                                 cellMeasureCache.clear(index);
                                 list.recomputeRowHeights(index);
                             }}/>
            </CellMeasurer>
        )
    }

    render() {
        let self = this;
        if (this.props.activeTab !== this.props.tabId) {
            return null;
        }
        let overScanCount = 10 > this.props.chartSettings.length - 3 ? this.props.chartSettings.length - 3 : 10;
        // noinspection RequiredAttributes
        return (
            <TabPane tabId={this.props.tabId}>
                <WindowScroller>
                    {({height, isScrolling, onChildScroll, scrollTop}) =>
                        <AutoSizer disableHeight={true}>
                            {({width}) =>
                                <List ref={instance => self.list = instance} height={height} width={width}
                                      autoHeight={true} onScroll={onChildScroll} isScrolling={isScrolling}
                                      scrollTop={scrollTop} overscanRowCount={overScanCount}
                                      rowCount={this.props.chartSettings.length}
                                      deferredMeasurementCache={this.cellMeasureCache}
                                      rowHeight={this.cellMeasureCache.rowHeight}
                                      rowRenderer={this.rowRenderer.bind(this)}/>
                            }
                        </AutoSizer>
                    }
                </WindowScroller>
            </TabPane>
        );
    }

}

