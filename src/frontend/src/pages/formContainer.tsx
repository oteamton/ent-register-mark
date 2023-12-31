import { Link } from "react-router-dom";
import "../styles/formContainer.css";
import "../styles/fonts.css";

function FormContainer() {
    return (
        <div className="dp">
            <div className="b-title">
                <h1>สิทธิประโยชน์</h1>
                <p>มีสิทธิเข้าร่วมประชุมใหญ่เพื่อออกเสียงเลือกตั้งคณะกรรมการบริหารสมาคม (กรณีสมาชิกประเภทองค์กรได้รับ 2 สิทธิ สมาชิกประเภทบุคคลได้รับ 1 สิทธิ) มีสิทธิได้รับเลือกเป็นกรรมการบริหารสมาคมฯ และอนุกรรมการอื่นๆ ของสมาคมมีสิทธิประดับเครื่องหมายและสัญลักษณ์ของ EnT รับข่าวสารความเคลื่อนไหวเกี่ยวกับการทางานเพื่อสังคมของมหาวิทยาลัย</p>
            </div>
            <hr />
            <div className="bc">
                <div id="orga">
                    <Link id="org-btn" className="linkBtn" to="/OrganizationForm">แบบฟอร์มสำหรับองค์กร / สถาบัน</Link>
                    <ul>
                        <li>การพัฒนางานวิชาการเพื่อสังคมในองค์กรสมาชิก เช่น การให้คาปรึกษา ฝึกอบรม และประสานวิทยากรจากทั้งในและต่างประเทศมาแลกเปลี่ยนความรู้และประสบการณ์กับบุคลากร</li>
                        <li>การให้คาปรึกษาการเขียนผลงาน และการเสนอผลงานเพื่อความก้าวหน้าทางวิชาชีพของบุคลากรด้วยผลงานเพื่อสังคม</li>
                        <li>ร่วมเสนอแนะนโยบายและมาตรการต่างๆ เพื่อเสริมสร้าง Engagement ในประเทศไทยและ ASEAN</li>
                        <li>การส่งบุคลากรเข้าร่วมการประชุมสัมมนาของ EnT ในราคาสมาชิก (ไม่เกิน 2 คน)</li>
                        <li>การเตรียมความพร้อมของสมาชิกในการสมัครรับการประเมินด้าน Engagement ใน
                            ระดับนานาชาติและระดับนานาชาติ</li>
                        <li>การยกย่องและประกาศเกียรติคุณผลงานเพื่อสังคมของสมาชิกและองค์กรอื่นๆ ที่ดาเนินกิจกรรมเพื่อสังคม</li>
                    </ul>
                </div>

                <div id="pers">
                    <Link id="per-btn" className="linkBtn" to="/IndividualForm">แบบฟอร์มสำหรับบุคคล</Link>
                    <ul>
                        <li>การรับรองการใช้ประโยชน์ของผลงานวิชาการเพื่อสังคม (ในกรณีที่ผลงานนั้นๆ ได้รับการพิจารณาคัดเลือกเป็นกรณีศึกษาของ EnT)</li>
                        <li>การรับรองการใช้ประโยชน์ของผลงานวิชาการเพื่อสังคม (ในกรณีที่ผลงานนั้นๆ ได้รับการพิจารณาคัดเลือกเป็นกรณีศึกษาของ EnT)</li>
                        <li>การรับรองการใช้ประโยชน์ของผลงานวิชาการเพื่อสังคม (ในกรณีที่ผลงานนั้นๆ ได้รับการพิจารณาคัดเลือกเป็นกรณีศึกษาของ EnT)</li>
                        <li>ข้าร่วมการประชุมสัมมนาของ EnT ในอัตราสมาชิก ได้รับการสนับสนุนจาก EnT ในการไปเสนอผลงานวิชาการเพื่อสังคมในต่างประเทศ</li>
                        <li>ร่วมเป็นคณะผู้เชี่ยวชาญ ในประเด็นที่เกี่ยวข้อง</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FormContainer;
