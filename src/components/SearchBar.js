import React, {Component} from 'react';
import {Button, Col, AutoComplete, Row, Select} from "antd";
import {COMPANY, JOB, JOBDESCRIPTION} from "../globalConsts";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            selected: "",
            searchAutoCompleteData: this.props.data.map(item => ({ value: item.company })),
            suggestions: [],
        }
    }
    componentDidMount() {
        const { selectData, data } = this.props;
        debugger
        let arr = data.map(item => ({ value: item.company }))
        debugger
        this.setState({ selected: selectData[0].value, searchAutoCompleteData: arr, suggestions: arr })
    }

    autoComplete = (selection) => {
        const { data } = this.props;
        let arr = [];
        if(selection === COMPANY)
            arr = data.map((item) => ({ value: item.company }))
        else if (selection === JOB)
            arr = data.map(item => ({ value: item.job }))
        else if (selection === JOBDESCRIPTION) {
            arr = data.map(item => item.jobdescription)
            let temp = arr.filter((item, index) => arr.indexOf(item) === index)
            debugger
            arr = temp.map(item => ({ value: item }));
        }
        this.setState({ searchAutoCompleteData: arr, suggestions: arr, selected: selection })
    }

    onSearch = (text) => {
        const { searchAutoCompleteData, suggestions } = this.state;
        let arr = searchAutoCompleteData.filter(item => item.value.toLowerCase().includes(text.toLowerCase()))
        this.setState({ suggestions: arr, input: text })
    }

    render() {
        const { selectData } = this.props;
        const { input, selected, suggestions } = this.state;
        return (
            <Row justify="start" style={{ padding: "10px", backgroundColor: "#e0e0e0"}}>
                <Col md={6}>
                    <AutoComplete options={suggestions} onSelect={(value) => { debugger; this.setState({ input: value})}} onSearch={(text) => {this.onSearch(text)}} placeholder="Name" style={{ width: "200px" }} />
                </Col>
                <Col md={8}>
                    <Select onChange={selection => this.autoComplete(selection)} defaultValue={selectData[0].value} style={{ width: "240px" }}>
                        { selectData &&
                            selectData.map(item => <Select.Option key={item.id} value={item.value}>{item.value}</Select.Option>)
                        }
                    </Select>
                </Col>
                <Col md={4}>
                    <Button style={{ float: "left" }} onClick={() => {this.props.callback(input, selected)}}>Search</Button>
                </Col>
            </Row>
        );
    }
}

export default SearchBar;
