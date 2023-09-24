import React, { useState } from "react";
import "../styles/register.css"
import axios from "axios";

// Define a function component for the form field
interface FormFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange }) => {
    return (
        <div>
        <label>{label}:</label>
        <input type={type} value={value} onChange={onChange} />
        </div>
    );
};

function Register() {
    // Define state variables for all form fields
    const [orgNameth, setOrgNameth] = useState("");
    const [orgNameEn, setOrgNameEn] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [fax, setFax] = useState("");
    // Coordinator
    const [coName, setCoName] = useState("");
    const [coEmail, setCoEmail] = useState("");
    const [coLine, setCoLine] = useState("");
    // Organization representative
    const [repName, setRepName] = useState("");
    const [repPosition, setRepPosition] = useState("");
    const [repAgency, setRepAgency] = useState("");
    const [repPhone, setRepPhone] = useState("");
    const [repFax, setRepFax] = useState("");
    const [repEmail, setRepEmail] = useState("");
    const [repLine, setRepLine] = useState("");
    // Alternate representative
    const [altRepName, setAltRepName] = useState("");
    const [altRepPosition, setAltRepPosition] = useState("");
    const [altRepAgency, setAltRepAgency] = useState("");
    const [altRepPhone, setAltRepPhone] = useState("");
    const [altRepFax, setAltRepFax] = useState("");
    const [altRepEmail, setAltRepEmail] = useState("");
    const [altRepLine, setAltRepLine] = useState("");
    // Types of Registration
    const [typeA, setTypeA] = useState(false);
    const [typeB, setTypeB] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    // Payment
    const [recName, setRecName] = useState("");
    const [taxIdNum, setTaxIdNum] = useState("");
    const [recAddress, setRecAddress] = useState("");

    const handleBoxACheck = () => {
        setTypeA(!typeA);
        setTypeB(false);
        if (!typeA) {
            setSelectedType('สมาชิคแบบที่ 1');
          } else {
            setSelectedType('');
          }
    };
    const handleBoxBCheck = () => {
        setTypeB(!typeB);
        setTypeA(false);
        if (!typeB) {
            setSelectedType('สมาชิกแบบที่ 2');
          } else {
            setSelectedType('');
          }
    };

    const handleCancel = () => {
        setOrgNameth("");
        setOrgNameEn("");
        setAddress("");
        setPhone("");
        setFax("");
        setCoName("");
        setCoEmail("");
        setCoLine("");
        setRepName("");
        setRepPosition("");
        setRepAgency("");
        setRepPhone("");
        setRepFax("");
        setRepEmail("");
        setRepLine("");
        setAltRepName("");
        setAltRepPosition("");
        setAltRepAgency("");
        setAltRepPhone("");
        setAltRepFax("");
        setAltRepEmail("");
        setAltRepLine("");
        setRecName("");
        setTaxIdNum("");
        setRecAddress("");
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Create a new FormData object
        const formData = new FormData();
        
        // Append all form fields to the formData object
        formData.append('orgNameth', orgNameth);
        formData.append('orgNameEn', orgNameEn);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('fax', fax);
        // Coordinator
        formData.append('coName', coName);
        formData.append('coEmail', coEmail);
        formData.append('coLine', coLine);
        // Organization representative
        formData.append('repName', repName);
        formData.append('repPosition', repPosition);
        formData.append('repAgency', repAgency);
        formData.append('repPhone', repPhone);
        formData.append('repFax', repFax);
        formData.append('repEmail', repEmail);
        formData.append('repLine', repLine);
        // Alternate representative
        formData.append('altRepName', altRepName);
        formData.append('altRepPosition', altRepPosition);
        formData.append('altRepAgency', altRepAgency);
        formData.append('altRepPhone', altRepPhone);
        formData.append('altRepFax', altRepFax);
        formData.append('altRepEmail', altRepEmail);
        formData.append('altRepLine', altRepLine);
        // Types of Registration
        if (typeA){
            formData.append('typeA', 'setTypeA');
        }
        if (typeB){
            formData.append('typeB', 'setTypeB');
        }
        // Payment
        formData.append('recName', recName);
        formData.append('taxIdNum', taxIdNum);
        formData.append('recAddress', recAddress);

        try {
            const response = await fetch("http://localhost:8000/register.php", {
                method: 'POST',
                body: formData,
            });
            if (response.status === 200) {
                // Registration successful, redirect to a success page
                window.location.href = "/success";
            } else {
                // Display an error message to the user
                console.error("Registration failed.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div>
            {/* Background with random shapes */}
            <div className="random-shapes"></div>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="org-form">
                        {/* Organization */}
                        <FormField label="ชื่อองค์กรภาษาไทย" type="text" value={orgNameth} onChange={(e) => setOrgNameth(e.target.value)} />
                        <FormField label="ชื่อองค์กรภาษาอังกฤษ" type="text" value={orgNameEn} onChange={(e) => setOrgNameEn(e.target.value)} />
                        <FormField label="ที่อยู่หน่วยงาน" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <FormField label="โทรศัพท์" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <FormField label="แฟกซ์" type="text" value={fax} onChange={(e) => setFax(e.target.value)} />
                    </div>
                    <div className="co-form">
                        {/* Coordinator */}
                        <FormField label="ชื่อผู้ประสานงาน" type="text" value={coName} onChange={(e) => setCoName(e.target.value)} />
                        <FormField label="อีเมล" type="text" value={coEmail} onChange={(e) => setCoEmail(e.target.value)} />
                        <FormField label="Line" type="text" value={coLine} onChange={(e) => setCoLine(e.target.value)} />
                    </div>
                    <div className="rep-form">
                        {/* Organization representative */}
                        <FormField label="ชื่อและนามสกุล" type="text" value={repName} onChange={(e) => setRepName(e.target.value)} />
                        <FormField label="ตำแหน่ง" type="text" value={repPosition} onChange={(e) => setRepPosition(e.target.value)} />
                        <FormField label="หน่วยงาน" type="text" value={repAgency} onChange={(e) => setRepAgency(e.target.value)} />
                        <FormField label="โทรศัพท์" type="text" value={repAgency} onChange={(e) => setRepPhone(e.target.value)} />
                        <FormField label="แฟกซ์" type="text" value={repFax} onChange={(e) => setRepFax(e.target.value)} />
                        <FormField label="อีเมล" type="text" value={repEmail} onChange={(e) => setRepEmail(e.target.value)} />
                        <FormField label="Line" type="text" value={repLine} onChange={(e) => setRepLine(e.target.value)} />
                    </div>
                    <div className="alt-rep-form">
                        {/* Alternate representative */}
                        <FormField label="ชื่อและนามสกุล" type="text" value={altRepName} onChange={(e) => setAltRepName(e.target.value)} />
                        <FormField label="ตำแหน่ง" type="text" value={altRepPosition} onChange={(e) => setAltRepPosition(e.target.value)} />
                        <FormField label="หน่วยงาน" type="text" value={altRepAgency} onChange={(e) => setAltRepAgency(e.target.value)} />
                        <FormField label="โทรศัพท์" type="text" value={altRepPhone} onChange={(e) => setAltRepPhone(e.target.value)} />
                        <FormField label="แฟกซ์" type="text" value={altRepFax} onChange={(e) => setAltRepFax(e.target.value)} />
                        <FormField label="อีเมล" type="text" value={altRepEmail} onChange={(e) => setAltRepEmail(e.target.value)} />
                        <FormField label="Line" type="text" value={altRepLine} onChange={(e) => setAltRepLine(e.target.value)} />
                    </div>
                    <div className="type-form">
                        {/* Types of Registration */}
                        <FormField
                            label="ประเภทการลงทะเบียน"
                            type="text"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        />
                        <div className="checkbox-container">
                            <label className="checkbox-label" htmlFor="checkboxA">แบบที่ 1
                            <input
                                type="checkbox"
                                checked={typeA}
                                onChange={handleBoxACheck}
                                // className="checkbox-input"
                                id="checkboxA"
                            />
                            </label>
                            <label className="checkbox-label" htmlFor="checkboxB" >แบบที่ 2
                            <input
                                type="checkbox"
                                checked={typeB}
                                onChange={handleBoxBCheck}
                                // className="checkbox-input"
                                id="checkboxB"
                            />
                            </label>
                        </div>
                    </div>
                    <div className="paym-form">
                        {/* Payment */}
                        <FormField label="ออกใบเสร็จในนาม" type="text" value={recName} onChange={(e) => setRecName(e.target.value)} />
                        <FormField label="เลขประจําตัวผู้เสียภาษี" type="text" value={taxIdNum} onChange={(e) => setTaxIdNum(e.target.value)} />
                        <FormField label="ที่อยู่ในการออกใบเสร็จ" type="text" value={recAddress} onChange={(e) => setRecAddress(e.target.value)} />
                    </div>
                </div>     
                <div className="btn-container">
                    <button type="submit">สมัครสมาชิค</button>
                    <button type="reset">ยกเลิก</button>
                </div>
        
            </form>
        </div>
    );
}

export default Register;
