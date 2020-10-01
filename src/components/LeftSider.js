import React, {Component} from 'react';
import {Button, Col, Input, Row, Select} from "antd";

class LeftSider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            selected: "",
        }
    }


    render() {
        const { selectData } = this.props;
        const { input, selected } = this.state;
        return (
            <div style={{ padding: "20px", height: "500px", backgroundColor: "#e0e0e0"}}>
                <div style={{ marginTop: "62%" }}>
                    <Row>
                        <Input onChange={(event) => this.setState({ input: event.target.value })} placeholder="Job Title" />
                    </Row>
                    <Row style={{ marginTop: "10px"}}>
                        <Select onChange={(selection => this.setState({ selected: selection }))} placeholder="Area" style={{ width: "100%"}}>
                            {selectData && selectData.map(item => (
                                <Select.Option value={item}>{item}</Select.Option>
                            ))}
                        </Select>
                    </Row>
                    <Row style={{ marginTop: "10px"}}>
                        <Button style={{ width: "100%"}} onClick={() => {this.props.callback(input, selected)}}>Filter</Button>
                    </Row>
                </div>
            </div>
        );
    }
}

export default LeftSider;
