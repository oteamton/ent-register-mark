import React, { useState, useRef, useCallback } from "react";
import "../styles/form.css";
import "../styles/fonts.css";
import {
  GoogleReCaptcha
} from "react-google-recaptcha-v3";
import {
  validPhone,
  isEmpty,
  isThaiOnly,
  isEngOnly,
  ValidEmail,
  numOnly,
} from "../utils/validUtils";

// Define a function component for the form field
interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="input-container">
      <label>{label} :</label>
      {
        type === "textarea"
          ? <textarea
            value={value}
            onChange={onChange}
          />
          :
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
      }
    </div>
  );
};

function FormPers() {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const firstFormRef = useRef<HTMLDivElement>(null);
  const secondFormRef = useRef<HTMLDivElement>(null);
  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [formtype] = useState<string>("Individual/เฉพาะบุคคล");
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

  const handleCaptcha = useCallback(async (value: string) => {
    setToken(value);
    try {
      // Send result to your backend for verification
      const response = await fetch("http://localhost:8000/auth/reCap.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: value }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log(responseData.message); // Or inform the user about the successful verification.
      } else {
        console.error(responseData.message); // Or inform the user about the failed verification.
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Captcha verification failed:", error.message);
      } else {
        console.error("Captcha verification failed:", error);
      }
    }
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
    try {
      if (token) {
        const formData = new FormData();
        formData.append("form", formtype);
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
        formData.append("selectedType", selectedType);
        // Payment
        formData.append("recName", recName);
        formData.append("taxIdNum", taxIdNum);
        formData.append("recAddress", recAddress);

        const response = await fetch("http://localhost:8000/form.php", {
          method: "POST",
          body: formData,
        });

        const responseData = await response.json();
        if (responseData.success) {
          console.log("Form submitted successfully");
        } else {
          console.error("Form submission failed");
        }
      } else {
        console.error("No Captcha token");
      }
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
    }
  };

  return (

    <div className="reg-body per">
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
              } else {
                e.target.classList.remove("input-error");
              }
            }}
          />
          <FormField
            label="ชื่อ นามสกุล (ภาษาอังกฤษ)"
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
              } else {
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
              } else {
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
              } else {
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
              } else {
                e.target.classList.remove("input-error");
              }
            }}
          />
          <FormField
            label="ชื่อหน่วยงาน (ภาษาอังกฤษ)"
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
              } else {
                e.target.classList.remove("input-error");
              }
            }}
          />
          <FormField
            label="ที่อยู่หน่วยงาน"
            type="textarea"
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
              const [isPhone, cleanValue] = validPhone(e.target.value);
              setInstPhone(cleanValue);

              if (!isPhone) {
                // Invalid input, mark as invalid
                e.target.classList.add("input-error");
              } else {
                e.target.classList.remove("input-error");
              }
            }}
          />
          <FormField
            label="โทรสาร"
            type="text"
            value={instFax}
            onChange={(e) => {
              const [isPhone, cleanValue] = validPhone(e.target.value);
              setInstFax(cleanValue);

              if (!isPhone) {
                // Invalid input, mark as invalid
                e.target.classList.add("input-error");
              } else {
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
              const isValidMail = ValidEmail(inputValue);
              setEmail(inputValue);

              e.target.classList.remove("input-error");
              if (!isValidMail) {
                // Invalid input, mark as invalid
                e.target.classList.add("input-error");
              } else {
                e.target.classList.remove("input-error");
              }
            }}
          />
          <FormField
            label="โทรศัพท์มือถือ"
            type="text"
            value={phone}
            onChange={(e) => {
              const [isPhone, cleanValue] = validPhone(e.target.value);
              setPhone(cleanValue);

              if (!isPhone) {
                // Invalid input, mark as invalid
                e.target.classList.add("input-error");
              } else {
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
            type="textarea"
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
              } else {
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
              const isValidNum = numOnly(inputValue);
              setTaxIdNum(inputValue);

              e.target.classList.remove("input-error");
              if (!isValidNum) {
                // Invalid input, mark as invalid
                e.target.classList.add("input-error");
              } else {
                e.target.classList.remove("input-error");
              }
            }}
          />
          <FormField
            label="ที่อยู่ในการออกใบเสร็จ"
            type="textarea"
            value={recAddress}
            onChange={(e) => {
              const inputValue = e.target.value;
              const isValidThai = isThaiOnly(inputValue);
              setRecAddress(inputValue);

              e.target.classList.remove("input-error");
              if (!isValidThai) {
                // Invalid input, mark as invalid
                e.target.classList.add("input-error");
              } else {
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
        <GoogleReCaptcha onVerify={handleCaptcha} />
        <div>
          {registrationResult && (
            <p className="registration-result">{registrationResult}</p>
          )}
        </div>
      </form>
    </div>
  );

}

export default FormPers;
