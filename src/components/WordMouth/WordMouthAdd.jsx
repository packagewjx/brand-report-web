import React from 'react'
import ContentWrapper from "../Layout/ContentWrapper";
import { Card, CardBody, Button, Input, FormGroup} from 'reactstrap';
import {WordMouth} from "./WordMouth.js";



export default class WordMouthAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ContentWrapper>
                <h3>添加产品类型</h3>
                <Card >
                    <CardBody>
                    <form role="form">
                        <FormGroup>
                            <label>产品类型名称</label>
                            <Input type="text" placeholder="产品名称" className="form-control" id="product_name" name="product_name"/>
                        </FormGroup>
                        <FormGroup>
                            <label>产品类型简称</label>
                            <Input type="text" placeholder="产品简称，一般为拼音" className="form-control" id="product_name_pinyin" name="product_name_pinyin"/>
                        </FormGroup>
                        <FormGroup>
                            <label>产品类型所属领域</label>
                            <Input type="text" placeholder="产品领域" className="form-control" id="product_domain" name="product_domain"/>
                        </FormGroup>
                        {/*<Button id="add-product" bsStyle="default" bsSize="small" onClick={()=>(WordMouth.click_add_product())}>提交</Button>*/}
                        <Button href="javascript:void(0)" onClick={()=>(WordMouth.click_add_product())} className="btn btn-primary">提交</Button>
                    </form>
                    </CardBody>
                </Card>
            </ContentWrapper>
        )
    }


};
