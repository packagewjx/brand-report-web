import React from "react";
import PropTypes from "prop-types";
import Index from "../../Model/Index";
import {ChartSetting} from "./ChartSetting";
import IndustryReport from "../../Model/IndustryReport";
import {Button, TabPane} from 'reactstrap';
import Brand from "../../Model/Brand";
import {AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller} from "react-virtualized";
import {ChartDrawer} from "./ChartDrawer";


export default class RootIndexTabPane extends React.Component {
    static propTypes = {
        rootIndex: PropTypes.instanceOf(Index),
        chartSettings: PropTypes.arrayOf(PropTypes.instanceOf(ChartSetting)),
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)),
        industryReport: PropTypes.instanceOf(IndustryReport),
        brands: PropTypes.arrayOf(PropTypes.instanceOf(Brand)),
        tabId: PropTypes.any.isRequired,
        activeTab: PropTypes.any
    };

    constructor(props) {
        super(props);


        this.cellMeasureCache = new CellMeasurerCache({
            minHeight: window.innerWidth / 2,
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
        return (
            <CellMeasurer key={key} cache={this.cellMeasureCache} columnIndex={0} parent={parent} rowIndex={index}>
                <ChartDrawer brands={this.props.brands} industryReport={this.props.industryReport}
                             chartSetting={this.props.chartSettings[index]} style={style} width={parent.props.width}/>
            </CellMeasurer>
        )
    }

    render() {
        let self = this;
        if (this.props.activeTab !== this.props.tabId) {
            return null;
        }
        // noinspection RequiredAttributes
        return (
            <TabPane tabId={this.props.tabId}>
                <Button onClick={() => console.log(this)}>按我</Button>
                <WindowScroller>
                    {({height, isScrolling, onChildScroll, scrollTop}) =>
                        <AutoSizer disableHeight={true}>
                            {({width}) =>
                                <List ref={instance => self.list = instance} height={height} width={width}
                                      autoHeight={true}
                                      columnWidth={this.props.width} onScroll={onChildScroll} isScrolling={isScrolling}
                                      scrollTop={scrollTop} rowCount={this.props.chartSettings.length}
                                      deferredMeasurementCache={this.cellMeasureCache}
                                      rowHeight={this.cellMeasureCache.rowHeight}
                                      rowRenderer={this.rowRenderer.bind(this)}/>}
                        </AutoSizer>
                    }
                </WindowScroller>
            </TabPane>
        );
    }

}

