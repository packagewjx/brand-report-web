import React from 'react';
import {Table} from 'reactstrap';

export default class RankListPanel extends React.Component {

    render() {
        let rankName = this.props.rankName; //表名
        let proportions = this.props.proportions; //填充的数据
        let colNames = this.props.colNames; //列名
        let brandsInfo = this.props.brandsInfo; // 品牌对应的字典
        let statistic_data = this.props.statistic_data;
        let rowArray = [];
        let flag = this.props.hasOwnProperty("dict_good_proportions");
        for (let i = 0; i < proportions.length; i++) {
            rowArray.push(
                <tr>
                    <td>{i+1}</td>
                    <td><a href="javascript:void(0)" target="_blank">{brandsInfo[proportions[i][0]]} </a></td>
                    <td>{statistic_data[proportions[i][0]][0] + statistic_data[proportions[i][0]][1] + statistic_data[proportions[i][0]][2]}</td>
                    <td>{flag? this.props.dict_good_proportions[proportions[i][0]] :proportions[i][1]}</td>
                </tr>
            )
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">{rankName}</div>
                <div className="panel-body">
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>{colNames[0]}</th>
                                <th>{colNames[1]}</th>
                                <th>{colNames[2]}</th>
                                <th>{colNames[3]}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {rowArray}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}