import React, {Component} from 'react';
import {Avatar, Card, List, Pagination, Row} from "antd";
import styles from './styles.less';

class Display extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { dataToShow } = this.props;
        return (
            <Row style={{ marginTop: "20px", height: "450px", overflow: "scroll", backgroundColor: "yellow" }}>
                <Card style={{ padding: "30px", width: "-webkit-fill-available" }} bodyStyle={{ overflow: "hidden"}}>
                    <List
                        dataSource={dataToShow}
                        itemLayout="horizontal"
                        size="large"
                        pagination={
                            <Pagination
                                pageSize={3}
                            />
                        }
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar style={{ width: "70px", height: "70px" }} src={item.image} />}
                                    title={<h3 style={{textAlign: "start"}}>{item.name}</h3>}
                                    description={
                                        <>
                                            <Row>{item.company}</Row>
                                            <Row>{item.job}</Row>
                                        </>}
                                />
                            </List.Item>
                        )}

                    />
                </Card>
            </Row>
        );
    }
}

export default Display;
