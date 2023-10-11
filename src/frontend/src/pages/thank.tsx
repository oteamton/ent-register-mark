import React from 'react';
import DotCircle from '../components/dotCircle';
const ThankYou: React.FC = () => {

    return (

        <div className="thank-you-container">
            <div id="dotContainer">
                <h1>ขอบคุณสำหรับการเข้าเป็นสมัครชิก Engagement thailand</h1>
                <DotCircle radius={500} numberOfDots={222} />
            </div>
        </div>
    );
}

export default ThankYou;
