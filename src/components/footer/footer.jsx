import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "./footer.scss";

export class FooterView extends React.Component {

    render() {

        let year = new Date().getFullYear();

        return (
            <footer className="footer fixed-bottom">
                <p>MYFLIX © {year}</p>
            </footer>
        )
    }
}