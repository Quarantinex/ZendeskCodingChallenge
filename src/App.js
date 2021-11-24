import React, {Component} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "./styles.css";
import {Alert, Button, Card, Col, Container, Navbar, Row, Spinner, Table} from "react-bootstrap";
import zen from "./Zen.png";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            offset: 0,
            data: [],
            completeData: [],
            perPage: 25,
            currentPage: 0,
            DataisLoaded: false,
            ticket: [],
            ticketView: false
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleTicket = this.handleTicket.bind(this);
    }
    receivedData() {
        const tmp = this.state.completeData;
        const slice = tmp.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(pd => <React.Fragment>
            <Card>
                <Row>
                    <Col>
                        <Card.Body>
                            id: {pd.id} <br />
                            url: {pd.url} <br />
                            status: {pd.status} <br />
                            subject: {pd.subject} <br />
                        </Card.Body>
                    </Col>
                    <Col style={{textAlign:"right", marginTop:"auto", marginBottom:"auto", paddingRight:"30px"}}>
                        <Button variant="secondary" size="lg" value={pd.url} onClick={this.handleTicket} active>
                            View Ticket
                        </Button>
                    </Col>
                </Row>
            </Card>
        <br />

        </React.Fragment>)
        this.setState({
            pageCount: Math.ceil(tmp.length / this.state.perPage),
            postData
        })

    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };
    handleTicket = (e) => {
        const ticketUrl = e.target.value;
        const temp2 = ticketUrl.split("/");
        const temp3 = temp2.splice(3);
        const temp4 = temp3.join("/");
        axios
            .get( '/'+temp4, {headers: {'Authorization': `Basic YXhuMjAwMDYyQHV0ZGFsbGFzLmVkdS90b2tlbjpsVjNkcURBaG1NUXRadG4yaHR3a1JWY1g0cXhRdDRCUGlUUEY3aXVR`}})
            .then(res => {
                const dat = res.data;
                this.setState({ticket: dat.request, ticketView: true});
            });
    }

    componentDidMount() {
        axios
            .get(`/api/v2/requests.json`, {headers: {'Authorization': `Basic YXhuMjAwMDYyQHV0ZGFsbGFzLmVkdS90b2tlbjpsVjNkcURBaG1NUXRadG4yaHR3a1JWY1g0cXhRdDRCUGlUUEY3aXVR`}})
            .then((res) => {

                const data = res.data;
                this.setState({completeData: data.requests})
                const tmp = this.state.completeData;
                const slice = tmp.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>

                            <Card>
                                <Row>
                                <Col>
                                    <Card.Body>
                                        id: {pd.id} <br />
                                        url: {pd.url} <br />
                                        status: {pd.status} <br />
                                        subject: {pd.subject} <br />
                                    </Card.Body>
                                </Col>
                                <Col style={{textAlign:"right", marginTop:"auto", marginBottom:"auto", paddingRight:"30px"}}>
                                    <Button variant="secondary" size="lg" value={pd.url} onClick={this.handleTicket} active>
                                        View Ticket
                                    </Button>
                                </Col>
                                </Row>
                            </Card>

                    <br />
                </React.Fragment>)

                this.setState({
                    DataisLoaded: true,
                    pageCount: Math.ceil(tmp.length / this.state.perPage),
                    postData
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }
    render() {
        if (this.state.error) {
            return (<>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <img
                                alt=""
                                src={zen}
                                width="40"
                                height="40"
                                className="d-inline-block align-content-between"
                            />{'  '}
                            Zendesk Coding Challenge
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <br/><div style={{textAlign:"center"}}><Alert variant="danger">
                Error: {this.state.error.message}
            </Alert></div></>);
        } else if (!this.state.DataisLoaded) return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <img
                                alt=""
                                src={zen}
                                width="40"
                                height="40"
                                className="d-inline-block align-content-between"
                            />{'  '}
                            Zendesk Coding Challenge
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <br/>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center'}}>

                    <Spinner animation="border">
                        <span className="visually-hidden">Tickets are being fetched</span>
                    </Spinner>
                </div>
            </>
        )
        else {

            return (
                <>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>
                                <img
                                    alt=""
                                    src={zen}
                                    width="40"
                                    height="40"
                                    className="d-inline-block align-content-between"
                                />{'  '}
                                Zendesk Coding Challenge
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Container style={{padding: "30px"}}>
                        {!this.state.ticketView &&
                        <div>
                            {this.state.postData}
                            <ReactPaginate
                                previousLabel={"Prev"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}/>
                        </div>}
                        {this.state.ticketView &&
                        <>
                            <div>
                                <Button variant="secondary" onClick={(e) => {
                                    const selectedPage = 0;
                                    const offset = selectedPage * this.state.perPage;

                                    this.setState({
                                        currentPage: selectedPage,
                                        offset: offset,
                                        ticketView: false
                                    }, () => {
                                        this.receivedData()
                                    });

                                }}>Back</Button>
                            </div>
                            <br/>
                            <div style={{textAlign: "center"}}>
                                <Table striped bordered hover variant="dark" style={{textAlign: "left"}}>
                                    <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td>{this.state.ticket.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>{this.state.ticket.status}</td>
                                    </tr>
                                    <tr>
                                        <td>Subject</td>
                                        <td>{this.state.ticket.subject}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>{this.state.ticket.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Created At</td>
                                        <td>{this.state.ticket.created_at}</td>
                                    </tr>
                                    <tr>
                                        <td>Updated At</td>
                                        <td>{this.state.ticket.updated_at}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </>
                        }
                    </Container>
                </>
            )
        }
    }
}
