import React from 'react';
import { Route } from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
export const Header = () => {
    return (
        <header>
            <Container fluid>
                <Row className="header-row justify-content-center">
                    <Col lg={4} md={5} sm={7} xs={12} xl={3} className="header-logo flex-wrap">
                        <a href="/">
                        <div className="logo-container flex-grow-1">
                                <img src="public/logo_rounded.png"/>
                        </div>
                        </a>
                    </Col>
                    <Col lg={8} md={7} sm={5} xs={12} xl={9} className="header-right mt-2 mt-sm-0 ">
                        <Row className="align-items-center">
                            <Col lg={8} xs={11} sm={12} md={11} xl={9} className="order-sm-1 order-md-0  mt-sm-2 mt-md-0">
                                <form>
                                    <div className="inner-form">
                                        <div className="basic-search">
                                            <div className="input-field">
                                                <input id="search" type="text" placeholder="Я ищу..."/>
                                                <div className="icon-wrap">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24">
                                                        <path
    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                            <Col xs={1} sm={12} md={1} lg={4} xl={3} className="header-favorite d-flex justify-content-center align-items-center">
                                <button className="favorite-button">
                                    <span className="favorite-text mr-1 align-text-bottom">
                                        Мой wish-лист
                                    </span>
                                    <FontAwesomeIcon icon={faHeart} size="2x" color="black" />
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </header>
    );

}

