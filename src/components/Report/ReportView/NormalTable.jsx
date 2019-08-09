import React from 'react';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';

/* 用Table展示数据 */
export default class NormalTable extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            powers : this.props.powers,
            typeName : this.props.typeName,
            type_one : this.props.type_one,
            type_two : this.props.type_two,
            headers : [this.props.typeName,'品牌名'],
            maxRange : this.props.maxRange
        };
    };

    render(){
        let range=[];
        let names = [];
        if(this.state.maxRange===-1){
            range.push(["是"]);
            range.push(["否"]);
            names.push(['']);
            names.push(['']);

            for(let i=0;i<this.state.powers.length;i++){
                let p = this.state.powers[i];
                names[p[this.state.type_one][this.state.type_two]===true?0:1]+=p.brandName+', ';

            }

            for(var i=0;i<2;i++){
                if(names[i]!=""){
                    names[i] = names[i].substr(0,names[i].length-2);
                    range[i].push(names[i]);
                }else{
                    names[i]+='-';
                    range[i].push(names[i]);
                }

            }

        }else{
            for(let i=1;i<=this.state.maxRange;i++){

                range.push([this.props.content[i]]);
                names.push('');
            }

            for(let i=0;i<this.state.powers.length;i++){
                let p = this.state.powers[i];
                names[p[this.state.type_one][this.state.type_two]-1]+=p.brandName+',';

            }
            for(let i=0;i<this.state.maxRange;i++){
                if(names[i]==='') names[i]+='-';
                else
                    names[i] = names[i].substr(0,names[i].length-1);
                range[i].push(names[i]);
            }
        }

        return (
            <Row>
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        {
                            this.state.headers.map((head,index)=>
                                <th key={index}>{head}</th>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        range.map((row,index)=>{
                            return (<tr key={index}>
                                {
                                    row.map((cell,index)=>{
                                        return <td>{cell}</td>
                                    })
                                }
                            </tr>)
                        })
                    }
                    </tbody>
                </Table>
            </Row>
        );
    }



}

