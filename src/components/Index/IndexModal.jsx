import React from "react";
import PropTypes from "prop-types";
import Index from "../Model/Index";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import IndexForm from "./IndexForm";
import {ToastContainer} from 'react-toastify';


export class IndexModal extends React.Component {
    static propTypes = {
        index: PropTypes.instanceOf(Index),
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)).isRequired,
        toggle: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        newIndex: PropTypes.bool
    };

    static defaultProps = {
        newIndex: false
    };

    constructor(props) {
        super(props);

        this.state = {
            indexDraft: undefined,
            prevOpen: false,
            enableEdit: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.prevOpen && props.isOpen) {
            // 打开时候
            return {
                enableEdit: false,
                prevOpen: true,
                indexDraft: Index.fromJson(JSON.parse(JSON.stringify(props.index)))
            }
        } else if (state.prevOpen && !props.isOpen) {
            // 关闭时候
            return {
                enableEdit: false,
                prevOpen: false,
                indexDraft: undefined
            }
        }
        return null;
    }

    render() {
        let index = this.props.index;
        if (index === null || !this.props.isOpen) {
            return null;
        }

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}
                   backdrop={this.state.enableEdit || this.props.newIndex ? 'static' : undefined}
                   keyboard={!(this.state.enableEdit || this.props.newIndex)}>
                <ModalHeader toggle={this.props.toggle}>
                    {this.props.newIndex ?
                        "新建指标" :
                        index.displayName + "指标详情"
                    }
                </ModalHeader>
                <ModalBody>
                    <IndexForm index={this.state.indexDraft} onChange={(index) => this.setState({indexDraft: index})}
                               indices={this.props.indices} enableEdit={this.state.enableEdit || this.props.newIndex}
                               newIndex={this.props.newIndex}/>
                </ModalBody>
                <ModalFooter>
                    {this.state.enableEdit || this.props.newIndex ?
                        <>
                            <Button color="primary"
                                    onClick={() => {
                                        this.props.onChange(this.state.indexDraft);
                                        this.setState({enableEdit: false});
                                    }}>保存</Button>
                            {' '}
                            <Button color="warning" onClick={() => {
                                if (this.props.newIndex) {
                                    this.props.toggle();
                                } else {
                                    this.setState({
                                        enableEdit: false,
                                        indexDraft: Index.fromJson(JSON.parse(JSON.stringify(this.props.index)))
                                    });
                                }
                            }}>取消</Button>
                        </>
                        :
                        <>
                            <Button color="warning"
                                    onClick={() => this.setState({enableEdit: true})}>编辑</Button>
                            {' '}
                            <Button color="secondary" onClick={this.props.toggle}>关闭</Button>
                        </>
                    }
                </ModalFooter>
                <ToastContainer id="index-modal-toast"/>
            </Modal>
        );
    }
}






