import React from 'react'
import ContentWrapper from "../Layout/ContentWrapper";
import {Link} from 'react-router-dom';
import {Button, Card, CardBody} from 'reactstrap';
import ReactTable from 'react-table';
import {faEye} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import $ from 'jquery';

export default class WordMouthGenerate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        let self = this;

        // $.ajax({
        //     url: "http://word-mouth-front:5000/product/list",
        //     type: "GET",
        //     crossDomain: true,
        //     dataType: "json",
        //     contentType: 'application/json',
        //     success: function(data, status) {
        //         console.log(data,status);
        //     }
        // });

        $.get(process.env.REACT_APP_WORD_MOUTH_FRONT_BASE_URL + '/product/list'
        //     ,function(data,status){
        //     alert("数据: " + data + "\n状态: " + status);
        // }
        )
            .then((response) => {
                self.setState({data: response.data})
            });
    }

    render() {
        let columns = [
            {Header: 'ID', accessor: 'id'},
            {Header: '产品类型', accessor: 'product_type'},
            {Header: '产品简称', accessor: 'product_pinyin'},
            {Header: '所属领域', accessor: 'domain'},
            {
                Header: '操作',
                Cell: (props) => {
                    return (<Link to={{
                        pathname: "/wordMouth-productlist/" + props.original.todo,
                        state: {
                            product_name: props.original.product_type,
                            product: props.original.product_pinyin
                        }
                    }}>
                        <Button title="查看报告">
                            <FontAwesomeIcon icon={faEye}/>
                        </Button>
                    </Link>)
                }
            },
        ];


        return (
            <ContentWrapper>
                <h3>产品类型列表</h3>
                <Card className="panel panel-default">
                    <CardBody>
                <ReactTable data={this.state.data} columns={columns} defaultPageSize={10}/>
                    </CardBody>
                </Card>

            </ContentWrapper>
        )
    }


};


