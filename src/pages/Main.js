import React, {Component} from 'react';
import {Button, Card, Col, Input, Row, Select} from "antd";
import LeftSider from "../components/LeftSider";
import SearchBar from "../components/SearchBar";
import Display from "../components/Display";
import { COMPANY, JOB, JOBDESCRIPTION } from '../globalConsts';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            dataToShow: [],
            filterArray: [],
            selectArray: [{id: 1, value: COMPANY}, {id: 2, value: JOB}, {id: 3, value: JOBDESCRIPTION} ],
            searchClicked: false,
        }
    }
    getData = async () => {
        const response = await fetch('https://5f7335deb63868001615f557.mockapi.io/list')
            .then(res => res.json())
            .then(result => {
                const array = [];
                let filterArray = [];
                if(result) {
                    result.map(item => array.push(item.area))
                    filterArray = array.filter((item, index) => array.indexOf(item) === index)
                }
                this.setState({ data: result, loading: false, filterArray})
            })

        this.setState({ dataToShow: response })
    }

    componentDidMount() {
        this.getData();
    }

    filter = (title, group) => {
        const { data } = this.state;
        let arr = data.filter((item, index) => item.area === group)
        let result = arr.filter((item, index) => {
            let str = item.job.toLowerCase()
            return str.includes(title.toLowerCase())
        })
        this.setState({ dataToShow: result })
    }

    search = (text, range) => {
        const { data } = this.state;
        let arr = [];
        if(range === COMPANY)
            arr = data.filter(item => {
                let str = item.company.toLowerCase()
                return str.includes(text.toLowerCase())
            })
        else if (range === JOB)
            arr = data.filter(item => {
                let str = item.job.toLowerCase()
                return str.includes(text.toLowerCase())
            })
        else if (range === JOBDESCRIPTION)
            arr = data.filter(item => {
                let str = item.jobdescription.toLowerCase()
                return str.includes(text.toLowerCase())
            })
        else arr = data;
        this.setState({ searchClicked: true, dataToShow: arr })
    }

    render() {
        const { dataToShow, searchClicked, loading, data, filterArray, selectArray } = this.state;
        return (
            <Card style={{ marginTop: "50px", height: "600px", width: "80%", marginLeft: "auto", marginRight: "auto", backgroundColor: "#e5e5e5"}}>
                <Row gutter={32} style={{ height: "100%" }}>
                    <Col span={6}>
                        {searchClicked && <LeftSider selectData={filterArray} callback={this.filter} />}
                    </Col>
                    <Col span={18}>
                        {!loading && <SearchBar selectData={selectArray} data={data ? data : dataToShow} callback={this.search} />}
                        {searchClicked && <Display dataToShow={dataToShow}/>}
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Main;
