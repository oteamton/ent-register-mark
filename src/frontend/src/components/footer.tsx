import React from 'react';
import '../styles/footer.css';
import '../styles/fonts.css';
// Define prop types for the Footer component
interface FooterProps {
    startText?: string;
    endText?: string;
}

const Footer: React.FC<FooterProps> = ({ startText = "Start Text", endText = "End Text" }) => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-start">{startText}</div>
                <div className="footer-end">{endText}</div>
            </div>
        </footer>
    );
}

export default Footer;
