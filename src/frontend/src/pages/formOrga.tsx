import React, { useState, useRef, useCallback } from "react";
import "../styles/form.css";
import "../styles/fonts.css";
import axios from "axios";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

// Define a function component for the form field
interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  readOnly?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  readOnly,
  onChange,
}) => {
  const [inputReadOnly, setInputReadOnly] = useState(readOnly || false);
  return (
    <div className="input-container">
      <label>{label} :</label>
      <input
        type={type}
        value={value}
        readOnly={inputReadOnly}
        onChange={onChange}
      />
    </div>
  );
};

function FormOrga() {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [recaptchaStatus, setRecaptchaStatus] = useState(false);
  const firstFormRef = useRef<HTMLDivElement>(null);
  const secondFormRef = useRef<HTMLDivElement>(null);
  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [formtype] = useState<string>("Organisation");
  // Define state variables for registration
  const [registrationResult, setRegistrationResult] = useState<string | null>(
    null
  );
  const [activeForm, setActiveForm] = useState<string | null>("first-form");
  const [activeBtn, setActiveBtn] = useState<string | null>("first-form");
  // Define state variables for all form fields
  const [orgNameth, setOrgNameth] = useState("");
  const [orgNameEn, setOrgNameEn] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  // Contractor
  const [contName, setContName] = useState("");
  const [contEmail, setContEmail] = useState("");
  const [contLine, setContLine] = useState("");
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
  const [selectedType, setSelectedType] = useState("");
  // Payment
  const [recName, setRecName] = useState("");
  const [taxIdNum, setTaxIdNum] = useState("");
  const [recAddress, setRecAddress] = useState("");

  const isThaiOnly = (inputValue: string) => {
    const thaiRegex = /^[ก-๏\s]*$/;
    return thaiRegex.test(inputValue);
  };
  const isEmail = (inputValue: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(inputValue);
  };
  const isEngOnly = (inputValue: string) => {
    const englishRegex = /^[a-zA-Z\s]*$/;
    return englishRegex.test(inputValue);
  };
  const isNumOnly = (inputValue: string) => {
    const numRegex = /^[0-9\s]*$/;
    return numRegex.test(inputValue);
  };

  const handleButtonClick = (
    formName: string,
    formRef: React.RefObject<HTMLDivElement>
  ) => {
    if (activeForm === formName) {
      return;
    }
    setActiveBtn(formName);
    setActiveForm(formName);
    const form = formRef.current;
    form?.classList.add("active-form");
    const otherForms = document.querySelectorAll(".active-form");
    otherForms.forEach((form) => {
      form.classList.remove("active-form");
    });
  };

  const handleBoxACheck = () => {
    setTypeA(!typeA);
    setTypeB(false);
    if (!typeA) {
      setSelectedType("สมาชิกแบบที่ 1");
    } else {
      setSelectedType("");
    }
  };
  const handleBoxBCheck = () => {
    setTypeB(!typeB);
    setTypeA(false);
    if (!typeB) {
      setSelectedType("สมาชิกแบบที่ 2");
    } else {
      setSelectedType("");
    }
  };

  const handleFirstPagePass = () => {
    // Check if all required fields are filled
    if (
      orgNameth.trim() !== "" &&
      orgNameEn.trim() !== "" &&
      address.trim() !== "" &&
      phone.trim() !== "" &&
      fax.trim() !== "" &&
      contName.trim() !== "" &&
      contEmail.trim() !== "" &&
      repName.trim() !== "" &&
      repEmail.trim() !== "" &&
      repAgency.trim() !== "" &&
      repPosition.trim() !== "" &&
      repPhone.trim() !== "" &&
      repFax.trim() !== "" &&
      altRepName.trim() !== "" &&
      altRepEmail.trim() !== "" &&
      altRepPhone.trim() !== "" &&
      altRepPosition.trim() !== "" &&
      altRepAgency.trim() !== ""
    ) {
      setCanProceed(true);
      handleButtonClick("second-form", secondFormRef);
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  const handleBack = () => {
    handleButtonClick("first-form", firstFormRef);
  };

  const handleCancel = () => {
    setOrgNameth("");
    setOrgNameEn("");
    setAddress("");
    setPhone("");
    setFax("");
    setContName("");
    setContEmail("");
    setContLine("");
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
    setSelectedType("");
    setRecName("");
    setTaxIdNum("");
    setRecAddress("");
  };

  const handleVerify = useCallback((token: string
  ) => {
    // Send token to your PHP backend for verification
    fetch('http://localhost:8000/form.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `recaptchaToken=${token}`
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setRecaptchaStatus(true);
        } else {
          console.error('Failed reCAPTCHA verification.');
        }
      })
      .catch(error => {
        console.error('Error verifying reCAPTCHA token:', error);
      });
  }, []);

  const handleCopyClick = (text: string) => {
    // Using the Clipboard API where supported
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopyStatus("Copied to clipboard!");
          console.log("Text copied to clipboard");
          setTimeout(() => {
            setCopyStatus(null); // Clear the copy status after 3 seconds
          }, 3000);
        })
        .catch((err) => {
          console.error("Unable to copy text", err);
        });
    } else {
      // Fallback to older method for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        console.log("Text copied to clipboard");
      } catch (err) {
        console.error("Unable to copy text", err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a new FormData object
    
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LevxG8oAAAAAOz7sUG8_oDXcb3GKAH5YnenF1mb">
      <div className="reg-body">
        <div className="tabs">
          <button
            className={`tabs-nav-first ${activeBtn === "first-form" ? "active-button" : ""
              }`}
            onClick={() => handleButtonClick("first-form", firstFormRef)}
          >
            ข้อมูลองค์กร
          </button>
          <button
            className={`tabs-nav-end ${activeBtn === "second-form" ? "active-button" : ""
              }`}
            onClick={() => {
              if (
                orgNameth.trim() !== "" &&
                orgNameEn.trim() !== "" &&
                address.trim() !== "" &&
                phone.trim() !== "" &&
                fax.trim() !== "" &&
                contName.trim() !== "" &&
                contEmail.trim() !== "" &&
                repName.trim() !== "" &&
                repEmail.trim() !== "" &&
                repAgency.trim() !== "" &&
                repPosition.trim() !== "" &&
                repPhone.trim() !== "" &&
                repFax.trim() !== "" &&
                altRepName.trim() !== "" &&
                altRepEmail.trim() !== "" &&
                altRepPhone.trim() !== "" &&
                altRepPosition.trim() !== "" &&
                altRepAgency.trim() !== ""
              ) {
                handleButtonClick("second-form", secondFormRef);
              } else {
                alert("กรุณากรอกข้อมูลให้ครบ");
              }
            }}
          >
            การชำระเงิน
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div
            className={`org-form ${activeForm === "first-form" ? "active-form" : ""
              }`}
          >
            <p>องค์กร</p>
            {/* Organization */}
            <FormField
              label="ชื่อองค์กรภาษาไทย"
              type="text"
              value={orgNameth}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setOrgNameth(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidThai) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="ชื่อองค์กรภาษาอังกฤษ"
              type="text"
              value={orgNameEn}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidEng = isEngOnly(inputValue);

                setOrgNameEn(inputValue);
                e.target.classList.remove("input-error");
                if (!isValidEng) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="ที่อยู่หน่วยงาน"
              type="text"
              value={address}
              onChange={(e) => {
                const inputValue = e.target.value;
                setAddress(inputValue);
              }}
            />

            <FormField
              label="โทรศัพท์"
              type="text"
              value={phone}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidNum = isNumOnly(inputValue);
                setPhone(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidNum) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="แฟกซ์"
              type="text"
              value={fax}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidNum = isNumOnly(inputValue);
                setFax(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidNum) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
          </div>

          <div
            className={`cont-form ${activeForm === "first-form" ? "active-form" : ""
              }`}
          >
            <p>ข้อมูลการติดต่อ</p>
            {/* Contractor */}
            <FormField
              label="ชื่อผู้ประสานงาน"
              type="text"
              value={contName}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setContName(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidThai) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="อีเมล"
              type="email"
              value={contEmail}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidMail = isEmail(inputValue);
                setContEmail(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidMail) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log("Please enter a valid email address.");
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />

            <FormField
              label="Line"
              type="text"
              value={contLine}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidLine = inputValue;
                setContLine(inputValue);

                e.target.classList.remove("input-error");
              }}
              onKeyPress={(e) => {
                if (isThaiOnly(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div
            className={`rep-form ${activeForm === "first-form" ? "active-form" : ""
              }`}
          >
            <p>ผู้สำรององค์กร</p>
            {/* Organization representative */}
            <FormField
              label="ชื่อและนามสกุล"
              type="text"
              value={repName}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setRepName(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidThai) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="หน่วยงาน"
              type="text"
              value={repAgency}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setRepAgency(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidThai) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="ตำแหน่ง"
              type="text"
              value={repPosition}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setRepPosition(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidThai) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="โทรศัพท์"
              type="text"
              value={repPhone}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidNum = isNumOnly(inputValue);
                setRepPhone(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidNum) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log("Plese enter a valid phone number.");
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="แฟกซ์"
              type="text"
              value={repFax}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidNum = isNumOnly(inputValue);
                setRepFax(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidNum) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="อีเมล"
              type="email"
              value={repEmail}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidMail = isEmail(inputValue);
                setRepEmail(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidMail) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log("Please enter a valid email address.");
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="Line"
              type="text"
              value={repLine}
              onChange={(e) => {
                const inputValue = e.target.value;
                setRepLine(inputValue);

                e.target.classList.remove("input-error");
                // Perform validation
                if (isThaiOnly(inputValue)) {
                  e.target.classList.add("input-error");
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
          </div>

          <div
            className={`alt-rep-form ${activeForm === "first-form" ? "active-form" : ""
              }`}
          >
            <p>ผู้สำรองผู้แทนองค์กร</p>
            {/* Alternate representative */}
            <FormField
              label="ชื่อและนามสกุล"
              type="text"
              value={altRepName}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setAltRepName(inputValue);
                e.target.classList.remove("input-error");
                // Perform validation
                if (!isValidThai) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="หน่วยงาน"
              type="text"
              value={altRepAgency}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setAltRepAgency(inputValue);

                e.target.classList.remove("input-error");
                // Perform validation
                if (!isValidThai) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />

            <FormField
              label="ตำแหน่ง"
              type="text"
              value={altRepPosition}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setAltRepPosition(inputValue);

                e.target.classList.remove("input-error");
                // Perform validation
                if (!isValidThai) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />

            <FormField
              label="โทรศัพท์"
              type="text"
              value={altRepPhone}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidNum = isNumOnly(inputValue);
                setAltRepPhone(inputValue);

                e.target.classList.remove("input-error");
                // Perform validation
                if (!isValidNum) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="แฟกซ์"
              type="text"
              value={altRepFax}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidNum = isNumOnly(inputValue);
                setAltRepFax(inputValue);

                e.target.classList.remove("input-error");
                // Perform validation
                if (!isValidNum) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="อีเมล"
              type="email"
              value={altRepEmail}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidMail = isEmail(inputValue);
                setAltRepEmail(inputValue);

                e.target.classList.remove("input-error");
                // Perform validation
                if (!isValidMail) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="Line"
              type="text"
              value={altRepLine}
              onChange={(e) => {
                const inputValue = e.target.value;
                setAltRepLine(inputValue);

                e.target.classList.remove("input-error");
                if (isThaiOnly(inputValue)) {
                  e.target.classList.add("input-error");
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
          </div>

          <div
            className={`pay-detail-o ${activeForm === "second-form" ? "active-form" : ""
              }`}
          >
            <h1>กรุณาชำระค่าสมัครสมาชิก เข้าบัญชีออมทรัพย์</h1>
            <p>
              สมาคมพันธกิจสัมพันธ์มหาวิทยาลัยกับสังคม เลขที่{" "}
              <span id="bank-num" onClick={() => handleCopyClick("3282503717")}>
                328-250371-7
              </span>{" "}
              ธนาคารไทยพาณิชย์ สาขาเมืองทองธานี
            </p>
            {copyStatus && <div className="copy-status">{copyStatus}</div>}
          </div>

          <div
            className={`type-form ${activeForm === "second-form" ? "active-form" : ""
              }`}
          >
            <p>ประเภทการเป็นสมาชิก</p>
            {/* Types of Registration*/}
            <div className="checkbox-container">
              <div id="box">
                <label className="checkbox-label" htmlFor="checkboxA">
                  <input
                    type="checkbox"
                    checked={typeA}
                    onChange={handleBoxACheck}
                    // className="checkbox-input"
                    id="checkboxA"
                  />
                  สมาชิกตลอกชีพ 100,000 บาท
                </label>
              </div>
              <div id="box">
                <label className="checkbox-label" htmlFor="checkboxB">
                  <input
                    type="checkbox"
                    checked={typeB}
                    onChange={handleBoxBCheck}
                    // className="checkbox-input"
                    id="checkboxB"
                  />
                  สมาชิกราย 3 ปี 30,000 บาท
                </label>
              </div>
            </div>
          </div>

          <div
            className={`paym-form ${activeForm === "second-form" ? "active-form" : ""
              }`}
          >
            <p>การชำระเงิน</p>
            {/* Payment */}
            <FormField
              label="ออกใบเสร็จในนาม"
              type="text"
              value={recName}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setRecName(inputValue);

                e.target.classList.remove("input-error");
                // Perform validation
                if (!isValidThai) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="เลขประจําตัวผู้เสียภาษี"
              type="text"
              value={taxIdNum}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidNum = isNumOnly(inputValue);
                setTaxIdNum(inputValue);

                e.target.classList.remove("input-error");
                // Perform validation
                if (!isValidNum) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log(
                    "Invalid input. Please enter Thai characters only."
                  );
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="ที่อยู่ในการออกใบเสร็จ"
              type="text"
              value={recAddress}
              onChange={(e) => {
                const inputValue = e.target.value;
                setRecAddress(inputValue);
              }}
            />
          </div>

          {activeForm === "first-form" && (
            <div className="btn-container">
              <button id="next" type="button" onClick={handleFirstPagePass}>
                หน้าถัดไป
              </button>
              <button id="cancel" type="reset" onClick={handleCancel}>
                ยกเลิก
              </button>
            </div>
          )}

          {activeForm === "second-form" && (
            <div className="btn-container">
              <GoogleReCaptcha onVerify={handleVerify} />
              <button type="submit" >สมัครสมาชิก</button>
              <button type="button" onClick={handleBack}>
                ย้อนกลับ
              </button>
            </div>
          )}

          <div>
            {registrationResult && (
              <p className="registration-result">{registrationResult}</p>
            )}
          </div>
        </form>
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default FormOrga;
