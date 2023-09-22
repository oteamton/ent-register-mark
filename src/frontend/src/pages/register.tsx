import React, { useState } from "react";

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
    const [type, setType] = useState("");
    // Payment
    const [recName, setRecName] = useState("");
    const [taxIdNum, setTaxIdNum] = useState("");
    const [recAddress, setRecAddress] = useState("");

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
        formData.append('type', type);
        // Payment
        formData.append('recName', recName);
        formData.append('taxIdNum', taxIdNum);
        formData.append('recAddress', recAddress);

        try {
            const response = await fetch("/register.php", {
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
            <form onSubmit={handleSubmit}>
            {/* Organization */}
            <FormField label="ชื่อองค์กรภาษาไทย" type="text" value={orgNameth} onChange={(e) => setOrgNameth(e.target.value)} />
            <FormField label="ชื่อองค์กรภาษาอังกฤษ" type="text" value={orgNameEn} onChange={(e) => setOrgNameEn(e.target.value)} />
            <FormField label="ที่อยู่หน่วยงาน" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <FormField label="โทรศัพท์" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <FormField label="แฟกซ์" type="text" value={fax} onChange={(e) => setFax(e.target.value)} />
            {/* Coordinator */}
            <FormField label="ชื่อผู้ประสานงาน" type="text" value={coName} onChange={(e) => setCoName(e.target.value)} />
            <FormField label="อีเมล" type="text" value={coEmail} onChange={(e) => setCoEmail(e.target.value)} />
            <FormField label="Line" type="text" value={coLine} onChange={(e) => setCoLine(e.target.value)} />
            {/* Organization representative */}
            <FormField label="ชื่อและนามสกุล" type="text" value={repName} onChange={(e) => setRepName(e.target.value)} />
            <FormField label="ตำแหน่ง" type="text" value={repPosition} onChange={(e) => setRepPosition(e.target.value)} />
            <FormField label="หน่วยงาน" type="text" value={repAgency} onChange={(e) => setRepAgency(e.target.value)} />
            <FormField label="โทรศัพท์" type="text" value={repAgency} onChange={(e) => setRepPhone(e.target.value)} />
            <FormField label="แฟกซ์" type="text" value={repFax} onChange={(e) => setRepFax(e.target.value)} />
            <FormField label="อีเมล" type="text" value={repEmail} onChange={(e) => setRepEmail(e.target.value)} />
            <FormField label="Line" type="text" value={repLine} onChange={(e) => setRepLine(e.target.value)} />
            {/* Alternate representative */}
            <FormField label="ชื่อและนามสกุล" type="text" value={altRepName} onChange={(e) => setAltRepName(e.target.value)} />
            <FormField label="ตำแหน่ง" type="text" value={altRepPosition} onChange={(e) => setAltRepPosition(e.target.value)} />
            <FormField label="หน่วยงาน" type="text" value={altRepAgency} onChange={(e) => setAltRepAgency(e.target.value)} />
            <FormField label="โทรศัพท์" type="text" value={altRepPhone} onChange={(e) => setAltRepPhone(e.target.value)} />
            <FormField label="แฟกซ์" type="text" value={altRepFax} onChange={(e) => setAltRepFax(e.target.value)} />
            <FormField label="อีเมล" type="text" value={altRepEmail} onChange={(e) => setAltRepEmail(e.target.value)} />
            <FormField label="Line" type="text" value={altRepLine} onChange={(e) => setAltRepLine(e.target.value)} />
            {/* Types of Registration */}
            <FormField label="ประเภทการลงทะเบียน" type="text" value={type} onChange={(e) => setType(e.target.value)} />
            {/* Payment */}
            <FormField label="ออกใบเสร็จในนาม" type="text" value={recName} onChange={(e) => setRecName(e.target.value)} />
            <FormField label="เลขประจําตัวผู้เสียภาษี" type="text" value={taxIdNum} onChange={(e) => setTaxIdNum(e.target.value)} />
            <FormField label="ที่อยู่ในการออกใบเสร็จ" type="text" value={recAddress} onChange={(e) => setRecAddress(e.target.value)} />
        <button type="submit">สมัครสมาชิค</button>
            </form>
        </div>
    );
}

export default Register;
