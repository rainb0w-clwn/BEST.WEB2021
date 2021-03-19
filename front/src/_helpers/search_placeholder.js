import {Col, Container, Row} from "react-bootstrap";
import {TextBlock, TextRow, RectShape,} from 'react-placeholder/lib/placeholders';
import "react-placeholder/lib/reactPlaceholder.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

export const fullPlaceholder = () => {
    return (
        <React.Fragment>
            <header>
                <div id="header-bottom-section">
                    <div id="product-filters">
                        <Container fluid className="">
                            <Row className="justify-content-around align-items-center flex-row">
                                <Col xs={4}>
                                    <Row className="justify-content-around align-items-center">
                                        <Col xs={6}>
                                            <TextBlock rows={1} color='lightgrey'/>
                                        </Col>
                                        <Col xs={6}>
                                            <TextBlock rows={1} color='lightgrey'/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <TextBlock rows={1} color="lightgrey" />
                                </Col>
                                <Col xs={4}>
                                    <Row className="justify-content-around align-items-center">
                                        <Col xs={6}>
                                            <TextBlock rows={1} color='lightgrey'/>
                                        </Col>
                                        <Col xs={6}>
                                            <Row
                                                className="flex-row align-items-center">
                                                    <Col xs={6}>
                                                        <TextBlock rows={1} color='lightgrey'/>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <TextBlock rows={1} color='lightgrey'/>
                                                    </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </header>
            <main>
                <div id="product-sort">
                    <div className="product-sort-container">
                        <Col>
                    <span>
                        <TextBlock rows={1} color='lightgrey'/>
                    </span>
                        </Col>
                        <Col>
                    <span>
                        <TextBlock rows={1} color='lightgrey'/>
                    </span>
                        </Col>
                    </div>
                </div>
                <div className="product-deck">
                    <div className="product-card h-100">
                        <div className="product-header">
                            <RectShape color="lightgrey"/>
                        </div>
                        <div className="card-body product-info">
                            <TextBlock rows={5} color='lightgrey'/>
                        </div>
                    </div>
                    <div className="product-card h-100">
                        <div className="product-header">
                            <RectShape color="lightgrey"/>
                        </div>
                        <div className="card-body product-info">
                            <TextBlock rows={5} color='lightgrey'/>
                        </div>
                    </div>
                    <div className="product-card h-100">
                        <div className="product-header">
                            <RectShape color="lightgrey"/>
                        </div>
                        <div className="card-body product-info">
                            <TextBlock rows={5} color='lightgrey'/>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}
export const productPlaceholder = () => {
    return (
            <main>
                <div className="product-deck">
                    <div className="product-card h-100">
                        <div className="product-header">
                            <RectShape color="lightgrey"/>
                        </div>
                        <div className="card-body product-info">
                            <TextBlock rows={5} color='lightgrey'/>
                        </div>
                    </div>
                    <div className="product-card h-100">
                        <div className="product-header">
                            <RectShape color="lightgrey"/>
                        </div>
                        <div className="card-body product-info">
                            <TextBlock rows={5} color='lightgrey'/>
                        </div>
                    </div>
                    <div className="product-card h-100">
                        <div className="product-header">
                            <RectShape color="lightgrey"/>
                        </div>
                        <div className="card-body product-info">
                            <TextBlock rows={5} color='lightgrey'/>
                        </div>
                    </div>
                </div>
            </main>
    )
}

