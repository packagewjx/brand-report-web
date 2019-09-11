import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import ReactTable from 'react-table'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons'
import ApiClient from "../../Utils/ApiClient";
import Collection from "../../Model/Collection";
import Brand from "../../Model/Brand";
import ContentWrapper from "../../Layout/ContentWrapper";
import {Button, Card} from 'reactstrap';
import {PERIOD} from "../../Model/Constants";
import 'spinkit/css/spinkit.css';


/**
 *
 * @param {String} period
 * @param {number} periodTimeNumber
 */
function getInYearTime(period, periodTimeNumber) {
    switch (period) {
        case PERIOD.annual:
            return "-";
        case PERIOD.monthly:
            return `${periodTimeNumber}月`;
        case PERIOD.quarterly:
            return `第${periodTimeNumber}季度`;
        default:
            console.warn("未知period:" + period);
            return periodTimeNumber;
    }
}

class CollectionManagementPage extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            collections: null,
            brandMap: new Map,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.state.collections === null) {
            this.fetchData();
        }
    }

    fetchData() {
        let p1 = ApiClient.getAll("collection")
            .then(response => {
                let collections = [];
                for (let i = 0; i < response.length; i++) {
                    collections.push(Collection.fromJson(response[i]));
                }
                return collections;
            });

        let p2 = ApiClient.getAll("brand")
            .then(response => {
                let brandMap = this.state.brandMap;
                response.forEach(value => {
                    let brand = Brand.fromJson(value);
                    brandMap.set(brand.brandId, brand);
                });
                return brandMap;
            });

        Promise.all([p1, p2])
            .then(value => {
                this.setState({
                    collections: value[0],
                    brandMap: value[1],
                })
            })
    }

    render() {
        let collections = this.state.collections === null ? [] : this.state.collections;
        let brandMap = this.state.brandMap;

        let columns = [
            {
                Header: "ID",
                accessor: "collectionId"
            },
            {
                Header: "品牌",
                id: "brand",
                accessor: data => brandMap.has(data.brandId) ? brandMap.get(data.brandId).brandName : data.brandId
            },
            {
                Header: "年份",
                accessor: "year"
            },
            {
                Header: "年内时间",
                id: "periodTime",
                accessor: data => getInYearTime(data.period, data.periodTimeNumber),
            },
            {
                Header: "操作",
                id: "operation",
                Cell: row => (
                    <span>
                        <Link to={{
                            pathname: "/collection/" + row.original.collectionId,
                            state: {
                                brandName: brandMap.get(row.original.brandId).brandName,
                                collection: row.original
                            }
                        }}>
                            <Button title="查看与编辑" size="sm">
                                <FontAwesomeIcon icon={faEye}/>
                            </Button>
                        </Link>
                        <Button title="删除" size="sm">
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </span>
                )
            }
        ];

        return (
            <ContentWrapper>
                <h3>数据管理</h3>
                <Card>
                    <ReactTable loading={this.state.collections === null} data={collections}
                                columns={columns}
                                defaultPageSize={10}/>
                </Card>
            </ContentWrapper>
        );


    }


}

export default withRouter(CollectionManagementPage)
