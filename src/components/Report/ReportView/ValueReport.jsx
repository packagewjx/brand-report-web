import React from 'react';
import {Table} from 'react-bootstrap';
import {drawSingleDataHorizontalBarChart} from "./ChartUtils";
function compare(a,b) {
    if(a.valueFamous.globalBrand500Rank === b.valueFamous.globalBrand500Rank){

        if(a.valueFamous.globalFortune500Rank===b.valueFamous.globalFortune500Rank){
            if(a.valueFamous.interBrand===b.valueFamous.interBrand){
                if(a.valueFamous.china500Rank===b.valueFamous.china500Rank){

                }else{
                    return a.valueFamous.china500Rank>=b.valueFamous.china500Rank?-1:1;
                }

            }else{
                return a.valueFamous.interBrand>=b.valueFamous.interBrand?-1:1;
            }

        }else{
            return a.valueFamous.globalFortune500Rank>=b.valueFamous.globalFortune500Rank?-1:1
        }

    }else{
        return a.valueFamous.globalBrand500Rank >= b.valueFamous.globalBrand500Rank?-1:1;
    }
}
export default class ValueReport extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let valuePowers = this.props.valuePowers;

        //粉丝数量
        valuePowers.sort((a,b)=>a.valueFamous.fanNumber >= b.valueFamous.fanNumber ? -1:1);
        drawSingleDataHorizontalBarChart(valuePowers,valuePowers=>valuePowers.valueFamous.fanNumber,
            document.getElementById('chartjs-fan-number'),'粉丝数量(单位: 个数)');

        //商品好评量
        valuePowers.sort((a,b)=>a.valuePraise.productPositive >= b.valuePraise.productPositive ? -1:1);
        drawSingleDataHorizontalBarChart(valuePowers,valuePowers=>valuePowers.valuePraise.productPositive,
            document.getElementById('chartjs-product-positive'),'商品好评量(单位: 个数)');

        //店铺好评率
        valuePowers.sort((a,b)=>a.valuePraise.storePositive >= b.valuePraise.storePositive ? -1:1);
        drawSingleDataHorizontalBarChart(valuePowers,valuePowers=>valuePowers.valuePraise.storePositive*100,
            document.getElementById('chartjs-store-positive'),'店铺好评率(单位: %)');

        //品牌文章
        valuePowers.sort((a,b)=>a.valuePraise.brandArticles >= b.valuePraise.brandArticles ? -1:1);
        drawSingleDataHorizontalBarChart(valuePowers,valuePowers=>valuePowers.valuePraise.brandArticles,
            document.getElementById('chartjs-brand-articles'),'品牌营销(单位: 万元)');

        //获得荣誉
        valuePowers.sort((a,b)=>a.valuePraise.honorNumber >= b.valuePraise.honorNumber ? -1:1);
        drawSingleDataHorizontalBarChart(valuePowers,valuePowers=>valuePowers.valuePraise.honorNumber,
            document.getElementById('chartjs-honor-number'),'获得荣誉(单位: 个数)');


    }

    render() {
        let valuePowers = this.props.valuePowers;
        valuePowers.sort(compare);
        // 品牌综合排名表格
        let brandRankComponents = [];
        for (let i = 0; i < valuePowers.length; i++) {
            brandRankComponents.push(
                <tr key={i}>
                    <td>{valuePowers[i].brandName}</td>
                    <td>{valuePowers[i].valueFamous.globalBrand500Rank===0?'-':valuePowers[i].valueFamous.globalBrand500Rank}</td>
                    <td>{valuePowers[i].valueFamous.globalFortune500Rank===0?'-':valuePowers[i].valueFamous.globalFortune500Rank}</td>
                    <td>{valuePowers[i].valueFamous.interBrand===0?'-':valuePowers[i].valueFamous.interBrand}</td>
                    <td>{valuePowers[i].valueFamous.china500Rank===0?'-':valuePowers[i].valueFamous.china500Rank}</td>
                </tr>
            )
        }

        return (
            <div>
                {/*     品牌综合排名*/}
                <h4 style={{textAlign: 'center'}}>品牌综合排名(单位: 名次)</h4>
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <td>品牌名</td>
                        <td>世界品牌五百强排名</td>
                        <td>世界财富五百强排名</td>
                        <td>InterBrand排名</td>
                        <td>中国500强</td>
                    </tr>
                    </thead>
                    <tbody>
                    {brandRankComponents}
                    </tbody>
                </Table>
                {/*    粉丝数量*/}
                <div>
                    <canvas id="chartjs-fan-number"/>
                </div>
                {/*    商品好评量*/}
                <div>
                    <canvas id="chartjs-product-positive"/>
                </div>
                {/*     店铺好评率*/}
                <div>
                    <canvas id="chartjs-store-positive"/>
                </div>
                {/*     品牌营销*/}
                <div>
                    <canvas id="chartjs-brand-articles"/>
                </div>
                {/*    获得荣誉*/}
                <div>
                    <canvas id="chartjs-honor-number"/>
                </div>
            </div>
        );
    }
}
