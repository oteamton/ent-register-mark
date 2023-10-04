import React, { useState, useRef } from "react";
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
  placeholder?: string;
  readOnly?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  placeholder,
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
        placeholder={placeholder}
        readOnly={inputReadOnly}
        onChange={onChange}
      />
    </div>
  );
};

function FormPers() {
  const [recaptchaStatus, setRecaptchaStatus] = useState(false);
  const firstFormRef = useRef<HTMLDivElement>(null);
  const secondFormRef = useRef<HTMLDivElement>(null);
  const [canProceed, setCanProceed] = useState<boolean>(false);
  // Define state variables for registration
  const [registrationResult, setRegistrationResult] = useState<string | null>(
    null
  );
  const [activeForm, setActiveForm] = useState<string | null>("first-form");
  const [activeBtn, setActiveBtn] = useState<string | null>("first-form");
  // Define state variables for all form fields
  const [Nameth, setNameth] = useState("");
  const [NameEn, setNameEn] = useState("");
  const [positionSci, setPositionSci] = useState("");
  const [positionBus, setPositionBus] = useState("");
  // Institution data
  const [instName, setInstName] = useState("");
  const [instNameEn, setInstNameEn] = useState("");
  const [instAddress, setInstAddress] = useState("");
  const [instPhone, setInstPhone] = useState("");
  const [instFax, setInstFax] = useState("");
  // Contract data
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lineID, setLineID] = useState("");
  const [address, setAddress] = useState("");
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

    // setActiveBtn(formName);
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

  const handleFirstFormSubmit = () => {
    // Check if all required fields are filled
    if (
      Nameth.trim() !== "" &&
      NameEn.trim() !== "" &&
      positionSci.trim() !== "" &&
      instName.trim() !== "" &&
      instNameEn.trim() !== "" &&
      instAddress.trim() !== "" &&
      instPhone.trim() !== "" &&
      instFax.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      lineID.trim() !== "" &&
      address.trim() !== ""
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
    setNameth("");
    setNameEn("");
    setPositionSci("");
    setPositionBus("");
    setEmail("");
    setAddress("");
    setPhone("");
    setInstFax("");
    setSelectedType("");
    setRecName("");
    setTaxIdNum("");
    setRecAddress("");
  };

  const handleCopyClick = (text: string) => {
    // Using the Clipboard API where supported
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log("Text copied to clipboard");
      }).catch(err => {
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
        document.execCommand('copy');
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
    const formData = new FormData();

    // Append all form fields to the formData object
    formData.append("Nameth", Nameth);
    formData.append("NameEn", NameEn);
    formData.append("positionSci", positionSci);
    formData.append("positionBus", positionBus);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("fax", instFax);
    formData.append("email", email);
    formData.append("lineID", lineID);
    formData.append("instName", instName);
    formData.append("instNameEn", instNameEn);
    formData.append("instAddress", instAddress);
    formData.append("instPhone", instPhone);
    formData.append("instFax", instFax);
    // Types of Registration
    if (typeA) {
      formData.append("typeA", "setTypeA");
    }
    if (typeB) {
      formData.append("typeB", "setTypeB");
    }
    // Payment
    formData.append("recName", recName);
    formData.append("taxIdNum", taxIdNum);
    formData.append("recAddress", recAddress);

    try {
      const response = await axios.post(
        "http://localhost:8000/form.php",
        formData
      );
      if (response.status === 200) {
        setRegistrationResult("Registration successful!");
        // Registration successful, redirect to a success page
        window.location.href = "/success";
      } else if (response.status === 400) {
        setRegistrationResult("Registration failed.");
        // Display an error message to the user
        window.location.href = "/failed";
        console.error("Registration failed.");
      }
    } catch (error) {
      window.location.href = "/failed";
      console.error("Error:", error);
    }
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LevxG8oAAAAAOz7sUG8_oDXcb3GKAH5YnenF1mb">
      <div className="reg-body">
        <div className="tabs">
          <button
            className={`tabs-nav-first ${activeBtn === "first-form" ? "active-btn" : ""
              }`}
            onClick={() => handleButtonClick("first-form", firstFormRef)}
          >
            ข้อมูลบุคคล
          </button>
          <button
            className={`tabs-nav-end ${activeBtn === "second-form" ? "active-btn" : ""
              }`}
            onClick={() => {
              if (
                Nameth.trim() !== "" &&
                NameEn.trim() !== "" &&
                positionSci.trim() !== "" &&
                instName.trim() !== "" &&
                instNameEn.trim() !== "" &&
                instAddress.trim() !== "" &&
                instPhone.trim() !== "" &&
                instFax.trim() !== "" &&
                email.trim() !== "" &&
                phone.trim() !== "" &&
                lineID.trim() !== "" &&
                address.trim() !== ""
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
            className={`pers-form ${activeForm === "first-form" ? "active-form" : ""
              }`}
          >
            <p>บุคคล</p>
            {/* Personal */}
            <FormField
              label="ชื่อ นามสกุล"
              type="text"
              value={Nameth}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setNameth(inputValue);

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
              label="Name Surname"
              type="text"
              value={NameEn}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidEng = isEngOnly(inputValue);

                setNameEn(inputValue);
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
              label="ตำแหน่งทางวิชาการ"
              type="text"
              value={positionSci}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setPositionSci(inputValue);

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
              label="ตำแหน่งบริหาร"
              type="text"
              value={positionBus}
              placeholder="ถ้ามี"
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setPositionBus(inputValue);

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
          </div>

          <div
            className={`inst-form ${activeForm === "first-form" ? "active-form" : ""
              }`}
          >
            <p>ข้อมูลหน่วยงาน</p>
            <FormField
              label="ชื่อหน่วยงาน"
              type="text"
              value={instName}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidThai = isThaiOnly(inputValue);
                setInstName(inputValue);

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
              label="ชื่อหน่วยงานภาษาอังกฤษ"
              type="text"
              value={instNameEn}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidEng = isEngOnly(inputValue);
                setInstNameEn(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidEng) {
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
              label="ที่อยู่หน่วยงาน"
              type="text"
              value={instAddress}
              onChange={(e) => {
                const inputValue = e.target.value;
                setInstAddress(inputValue);

                e.target.classList.remove("input-error");
              }}
              onKeyPress={(e) => {
                if (isThaiOnly(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <FormField
              label="โทรศัพท์"
              type="text"
              value={instPhone}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidNum = isNumOnly(inputValue);
                setInstPhone(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidNum) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log("Please enter a valid phone number.");
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="โทรสาร"
              type="text"
              value={instFax}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidNum = isNumOnly(inputValue);
                setInstFax(inputValue);

                e.target.classList.remove("input-error");
                if (!isValidNum) {
                  // Invalid input, mark as invalid
                  e.target.classList.add("input-error");
                  console.log("Please enter a valid fax number.");
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
          </div>

          <div
            className={`cont-p-form ${activeForm === "first-form" ? "active-form" : ""
              }`}
          >
            <p>ข้อมูลการติดต่อ</p>
            <FormField
              label="อีเมล"
              type="email"
              value={email}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidMail = isEmail(inputValue);
                setEmail(inputValue);

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
              label="โทรศัพท์มือถือ"
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
                  console.log("Invalid input. Please enter number only.");
                } else {
                  // Clear error styles if input is valid
                  e.target.classList.remove("input-error");
                }
              }}
            />
            <FormField
              label="LINE ID"
              type="text"
              value={lineID}
              onChange={(e) => {
                const inputValue = e.target.value;
                setLineID(inputValue);

                e.target.classList.remove("input-error");
              }}
            />
            <FormField
              label="ที่อยู่ที่ติดต่อได้"
              type="text"
              value={address}
              onChange={(e) => {
                const inputValue = e.target.value;
                setAddress(inputValue);

                e.target.classList.remove("input-error");
              }}
            />
          </div>

          <div className={`pay-detail-p ${activeForm === "second-form" ? "active-form" : ""
            }`}>
            <h1>กรุณาชำระค่าสมัครสมาชิก เข้าบัญชีออมทรัพย์</h1>
            <p>สมาคมพันธกิจสัมพันธ์มหาวิทยาลัยกับสังคม เลขที่ <span onClick={() => handleCopyClick("3282503717")}>328-250371-7</span> ธนาคารไทยพาณิชย์ สาขาเมืองทองธานี</p>
          </div>

          <div
            className={`type-p-form ${activeForm === "second-form" ? "active-form" : ""
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
                  สมาชิกตลอกชีพ 3,000 บาท
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
                  สมาชิกราย 2 ปี 500 บาท
                </label>
              </div>
            </div>
          </div>
          <div
            className={`paym-p-form ${activeForm === "second-form" ? "active-form" : ""
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
                const isValidThai = isThaiOnly(inputValue);
                setRecAddress(inputValue);

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
          </div>

          {activeForm === "first-form" && (
            <div className="btn-container-p">
              <button id="next" type="button" onClick={handleFirstFormSubmit}>
                หน้าถัดไป
              </button>
              <button id="cancel" type="reset" onClick={handleCancel}>
                ยกเลิก
              </button>
            </div>
          )}

          {activeForm === "second-form" && (
            <div className="btn-container-p">
              <button type="submit">สมัครสมาชิก</button>
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

export default FormPers;
