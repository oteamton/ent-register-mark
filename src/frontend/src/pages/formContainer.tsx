import React, { useState } from "react";
import FormOrga from "./formOrga";
import FormPers from "./formPers";
import "../styles/formContainer.css";

function FormContainer() {
    const [activeForm, setActiveForm] = useState(""); // Initial active form

    const handleOrgaClick = () => {
        setActiveForm("orga");
    };

    const handlePersClick = () => {
        setActiveForm("pers");
    };

    return (
        <div>
            <div className="bc">
                <div id="orga">
                    <button type="button" onClick={handleOrgaClick}>
                        แบบฟอร์มสำหรับองค์กร
                    </button>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur quaerat magni aspernatur, consequuntur, eum quisquam nesciunt enim voluptate culpa unde, dolorum itaque delectus nulla cum. Nam magni blanditiis quibusdam pariatur.
                    </p>
                </div>
                <div id="pers">
                    <button type="button" onClick={handlePersClick}>
                        แบบฟอร์มรายบุคคล
                    </button>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ipsam quidem nobis dicta cum culpa mollitia exercitationem non dolorum adipisci harum, error eveniet aut, sint labore est ad praesentium consequatur.
                    </p>
                </div>
            </div>
            {activeForm === "orga" && <FormOrga />}
            {activeForm === "pers" && <FormPers />}
        </div>
    );
}

export default FormContainer;
