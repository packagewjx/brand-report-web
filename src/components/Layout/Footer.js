import React, {Component} from 'react';

class Footer extends Component {

    render() {
        const year = new Date().getFullYear()
        return (
            <footer className="footer-container">
                <span>&copy; {year} - 华南理工大学王振宇实验室</span>
            </footer>
        );
    }

}

export default Footer;
