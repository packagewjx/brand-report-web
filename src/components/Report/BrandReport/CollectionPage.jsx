import React from 'react';
import {withRouter} from 'react-router-dom'
import ContentWrapper from "../../Layout/ContentWrapper";
import PropTypes from 'prop-types';
import Collection from "../../Model/Collection";
import {PERIOD} from "../../Model/Constants";
import SpinnerCircle from "../../Utils/SpinnerCircle";
import ApiClient from "../../Utils/ApiClient";
import Index from "../../Model/Index";
import ReactTable from 'react-table';
import {Card} from 'reactstrap';

/**
 *
 * @param {String} period
 * @param {number} periodTimeNumber
 * @return {string|number} 年内时间表示
 */
function getInYearTime(period, periodTimeNumber) {
    switch (period) {
        case PERIOD.annual:
            return "";
        case PERIOD.monthly:
            return `${periodTimeNumber}月`;
        case PERIOD.quarterly:
            return `第${periodTimeNumber}季度`;
        default:
            console.warn("未知period:" + period);
            return periodTimeNumber;
    }
}

/**
 * 尝试获取离线数据，而不去网络获取。首先从路由处获取，其次从props获取
 * @param props Component的props
 * @param key 数据的键
 * @return {null|*} 如有数据则返回。若无数据，则返回null
 */
function getDataOffline(props, key) {
    let ret = null;
    if (props.location.state !== undefined && props.location.state[key] !== undefined) {
        ret = props.location.state[key];
    } else if (props[key] !== undefined) {
        ret = props[key]
    }
    return ret;
}

/**
 * 负责显示品牌数据的页面
 *
 * 可以传递已有数据，通过location.state或者props传递均可。数据名如下：
 * <ul>
 *     <li>brandName：品牌名</li>
 *     <li>collection：品牌数据</li>
 * </ul>
 */
class CollectionPage extends React.Component {
    static propTypes = {
        collection: PropTypes.instanceOf(Collection),
        brandName: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            collection: null,
            brandName: null,
            indexMap: null,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newCol = getDataOffline(nextProps, "collection");
        let brandName = getDataOffline(nextProps, "brandName");

        return {
            collection: newCol,
            brandName: brandName
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.state.collection === null) {
            ApiClient.get("collection", this.props.match.params.id)
                .then((response) => {
                    this.setState({
                        collection: Collection.fromJson(response)
                    });
                    if (this.state.brandName === null) {
                        ApiClient.get("brand", response.brandId)
                            .then((response) => {
                                this.setState({
                                    brandName: response.brandName,
                                })
                            })
                    }
                })
        }
        if (this.state.brandName === null) {
            ApiClient.get("brand", this.state.collection.brandId)
                .then((response) => {
                    this.setState({
                        brandName: response.brandName,
                    })
                })
        }
        if (this.state.indexMap === null) {
            ApiClient.getAll("index")
                .then(response => {
                    let indexMap = new Map;
                    for (let i = 0; i < response.length; i++) {
                        indexMap.set(response[i].indexId, Index.fromJson(response[i]));
                    }
                    this.setState({
                        indexMap
                    })
                })
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        this.fetchData();
    }

    render() {
        let collection = this.state.collection;
        let indexMap = this.state.indexMap === null ? new Map() : this.state.indexMap;
        if (collection === null) {
            return (
                <SpinnerCircle/>
            )
        }
        let collectionData = collection.data;
        let indexKey = Object.keys(collectionData);

        let columns = [
            {
                Header: "指标名",
                id: "index",
                accessor: key => indexMap.has(key) ? indexMap.get(key).displayName : key,
                filterable: true
            },
            {
                Header: "所属指标",
                id: "parent",
                accessor: key => {
                    let parId = indexMap.has(key) ? indexMap.get(key).parentIndexId : undefined;
                    return indexMap.has(parId) ? indexMap.get(parId).displayName : "未知";
                },
                filterable: true
            },
            {
                Header: "数据",
                id: "data",
                accessor: key => {
                    let data = collectionData[key];
                    if (typeof data === "boolean") {
                        return data ? "是" : "否";
                    } else if (typeof data === "undefined") {
                        return "无数据";
                    } else {
                        return data;
                    }
                }
            }
        ];

        return (
            <ContentWrapper>
                <h3>{this.state.brandName}品牌{collection.year}年{getInYearTime(collection.period, collection.periodTimeNumber)}数据</h3>
                <Card>
                    <ReactTable data={indexKey} columns={columns}/>
                </Card>
            </ContentWrapper>
        );
    }

}

export default withRouter(CollectionPage);
