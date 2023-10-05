import React, { useState, useCallback, useRef } from 'react';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from "react-google-recaptcha-v3";

function Tester() {
    const [token, setToken] = useState<string>("");
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false); // State to disable the button

    const handleCaptcha = useCallback(async (value: string) => {
        setToken(value);
        setShowCaptcha(false);  // Hide the captcha after execution
        console.log("Captcha Token:", value);  // Logging the token
        // Send result to your backend for verification
        const response = await fetch("http://localhost:8000/register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: value })
        });

        const responseData = await response.json();

        if (responseData.success) {
            // Do something on success, maybe navigate to another page or show a message
        } else {
            setButtonDisabled(false); // Enable the button again on failure
        }
    }, []);

    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LevxG8oAAAAAOz7sUG8_oDXcb3GKAH5YnenF1mb">
            <div>
                <button 
                    onClick={() => { 
                        setShowCaptcha(true);
                        setButtonDisabled(true); // Disable the button once clicked
                    }} 
                    disabled={isButtonDisabled}
                >
                    Register
                </button>

                {showCaptcha && 
                    <GoogleReCaptcha
                        action="register"
                        onVerify={handleCaptcha}
                    />
                }
            </div>
        </GoogleReCaptchaProvider>
    );
}


export default Tester;
