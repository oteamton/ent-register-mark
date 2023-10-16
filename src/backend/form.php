<?php
require './vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Set the CORS headers
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['form'])) {
        $formType = $_POST['form'];

        switch ($formType) {
            case 'Organization/องค์กร':
                $requiredFields = [
                    'form',
                    'orgNameth', 'orgNameEn', 'address', 'phone', 'fax', 'contName', 'contEmail', 'contLine',
                    'repName', 'repPosition', 'repAgency', 'repFax', 'repPhone', 'repEmail', 'repLine',
                    'altRepName', 'altRepPosition', 'altRepAgency', 'altRepFax', 'altRepPhone', 'altRepEmail', 'altRepLine',
                    'recName', 'taxIdNum', 'recAddress', 'recaptchaToken'
                ];

                $fieldMappings = [
                    'form' => ['label' => 'แบบฟอร์ม', 'section' => 'header'],
                    // องค์กร
                    'orgNameth' => ['label' => 'ชื่อบริษัท (ภาษาไทย)', 'section' => 'organization'],
                    'orgNameEn' => ['label' => 'ชื่อบริษัท (ภาษาอังกฤษ)', 'section' => 'organization'],
                    'address' => ['label' => 'ที่อยู่', 'section' => 'organization'],
                    'phone' => ['label' => 'โทรศัพท์', 'section' => 'organization'],
                    'fax' => ['label' => 'โทรสาร', 'section' => 'organization'],
                    // ผู้ประสานงาน
                    'contName' => ['label' => 'ชื่อและนามสกุล', 'section' => 'contractor'],
                    'contEmail' => ['label' => 'อีเมล์', 'section' => 'contractor'],
                    'contLine' => ['label' => 'เบอร์โทรศัพท์', 'section' => 'contractor'],
                    // ผู้ประสานงานแทน
                    'repName' => ['label' => 'ชื่อและนามสกุล', 'section' => 'representative'],
                    'repPosition' => ['label' => 'ตําแหน่ง', 'section' => 'representative'],
                    'repAgency' => ['label' => 'หน่วยงาน', 'section' => 'representative'],
                    'repFax' => ['label' => 'โทรสาร', 'section' => 'representative'],
                    'repPhone' => ['label' => 'โทรศัพท์', 'section' => 'representative'],
                    'repEmail' => ['label' => 'อีเมล์', 'section' => 'representative'],
                    'repLine' => ['label' => 'เบอร์โทรศัพท์', 'section' => 'representative'],
                    // ผู้สำรองผู้ประสานงานแทน
                    'altRepName' => ['label' => 'ชื่อและนามสกุล', 'section' => 'alternate representative'],
                    'altRepPosition' => ['label' => 'ตําแหน่ง', 'section' => 'alternate representative'],
                    'altRepAgency' => ['label' => 'หน่วยงาน', 'section' => 'alternate representative'],
                    'altRepFax' => ['label' => 'โทรสาร', 'section' => 'alternate representative'],
                    'altRepPhone' => ['label' => 'โทรศัพท์', 'section' => 'alternate representative'],
                    'altRepEmail' => ['label' => 'อีเมล์', 'section' => 'alternate representative'],
                    'altRepLine' => ['label' => 'เบอร์โทรศัพท์', 'section' => 'alternate representative'],
                    // รูปแบบการเป็นสมาชิก
                    'selectedType' => ['label' => 'รูปแบบการสมัครสมาชิก', 'section' => 'type'],
                    // ใบเสร็จ
                    'recName' => ['label' => 'ชื่อและนามสกุลในการออกใบเสร็จ', 'section' => 'recipient'],
                    'taxIdNum' => ['label' => 'เลขประจําตัวผู้เสียภาษี', 'section' => 'recipient'],
                    'recAddress' => ['label' => 'ที่อยู่ในการออกใบเสร็จ', 'section' => 'recipient'],
                ];
                // Set membership type
                $memberType = isset($_POST['typeA']) ? "สมาชิกตลอกชีพ 100,000 บาท" : (isset($_POST['typeB']) ? "สมาชิกราย 3 ปี 30,000 บาท" : "");

                $data = [];
                foreach ($requiredFields as $field) {
                    $dataField = isset($fieldMappings[$field]) ? $fieldMappings[$field]['label'] : $field;
                    $data[$dataField] = $_POST[$field] ?? '';
                }
                $data['seletedType'] = $memberType;
                break;

            case 'Individual/เฉพาะบุคคล':
                $requiredFields = [
                    'form',
                    'Nameth', 'NameEn', 'positionSci', 'positionBus', 'address', 'phone', 'fax', 'email', 'lineID',
                    'instName', 'instNameEn', 'instAddress', 'instPhone', 'instFax',
                    'recName', 'taxIdNum', 'recAddress', 'recaptchaToken'
                ];

                $fieldMappings = [
                    'form' => ['label' => 'แบบฟอร์ม'],
                    // บุคคล
                    'Nameth' => ['label' => 'ชื่อ นามสกุล'],
                    'NameEn' => ['label' => 'ชื่อ นามสกุล (อังกฤษ)'],
                    'positionSci' => ['label' => 'ตําแหน่งทางวิชาการ'],
                    'positionBus' => ['label' => 'ตําแหน่งทางบริหาร'],
                    'address' => ['label' => 'ที่อยู่ที่ติดต่อได้'],
                    'phone' => ['label' => 'โทรศัพท์'],
                    'fax' => ['label' => 'โทรสาร'],
                    'email' => ['label' => 'อีเมล์'],
                    'lineID' => ['label' => 'Line ID'],
                    // หน่วยงาน
                    'instName' => ['label' => 'ชื่อหน่วยงาน'],
                    'instNameEn' => ['label' => 'ชื่อหน่วยงาน (อังกฤษ)'],
                    'instAddress' => ['label' => 'ที่อยู่หน่วยงาน'],
                    'instPhone' => ['label' => 'โทรศัพท์หน่วยงาน'],
                    'instFax' => ['label' => 'โทรสารหน่วยงาน'],
                    // ใบเสร็จ
                    'recName' => ['label' => 'ชื่อและนามสกุลในการออกใบเสร็จ'],
                    'taxIdNum' => ['label' => 'เลขประจําตัวผู้เสียภาษี'],
                    'recAddress' => ['label' => 'ที่อยู่ในการออกใบเสร็จ'],
                ];
                // Set membership type
                $memberType = isset($_POST['typeA']) ? "สมาชิกตลอกชีพ 3,000 บาท" : (isset($_POST['typeB']) ? "สมาชิกราย 2 ปี 500 บาท " : "");

                $data = [];
                foreach ($requiredFields as $field) {
                    $dataField = isset($fieldMappings[$field]) ? $fieldMappings[$field]['label'] : $field;
                    $data[$dataField] = $_POST[$field] ?? '';
                }
                $data['seletedType'] = $memberType;
                break;

            default:
                // Error handling
                exit;
        }
    }

    saveData($data);

    try {
        sendMail($data);
        sendResponse(200, ["success" => true, "message" => "Data saved and email sent successfully!"]);
    } catch (Exception $e) {
        sendResponse(500, ["success" => false, "message" => "Email sending failed: {$e->getMessage()}"]);
    }
}

function sendResponse(int $statusCode, array $response)
{
    http_response_code($statusCode);
    echo json_encode($response);
}

function saveData(array $data)
{
    $filename = './db/Ent_membs.JSON';
    $existingData = [];

    // Sanitize the input data
    array_walk_recursive($data, function (&$item) {
        $item = htmlspecialchars($item, ENT_QUOTES, 'UTF-8');
    });

    $handle = fopen($filename, 'c+');
    if ($handle === false) {
        // Handle error - can't open file
        error_log("Error: Unable to open the file: $filename");
        return false;
    }

    if (flock($handle, LOCK_EX)) {  // Acquire an exclusive lock
        if (file_exists($filename) && filesize($filename) > 0) {
            $existingData = json_decode(fread($handle, filesize($filename)), true);
            if ($existingData === null && json_last_error() !== JSON_ERROR_NONE) {
                error_log("JSON decode error: " . json_last_error_msg());
            }
        }

        $existingData[] = $data;
        ftruncate($handle, 0);  // Truncate the file to zero size
        // Apply JSON_UNESCAPED_UNICODE along with JSON_PRETTY_PRINT
        if (fwrite($handle, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
            // Handle error - couldn't write to the file
            error_log("Error: Unable to write data to $filename");
            fclose($handle);
            return false;
        }
        fflush($handle);       // Flush output before releasing the lock
        flock($handle, LOCK_UN);  // Release the lock
    } else {
        // Handle error - couldn't lock the file
        error_log("Error: Unable to acquire a lock on $filename");
        fclose($handle);
        return false;
    }

    fclose($handle);
    return true;
}

function sendMail($data)
{

    // Construct email body
    $emailBody = "<h2>Details/รายละเอียด :\n</h2><ul>";

    $currentSection = "";
    foreach ($data as $key => $value) {
        if (isset($fieldMappings[$key])) {
            if ($fieldMappings[$key]['section'] !== $currentSection) {
                $currentSection = $fieldMappings[$key]['section'];
                $emailBody .= "<h3>" . $currentSection . "</h3>";
            }
            $label = $fieldMappings[$key]['label'];
            $emailBody .= "<li><strong>" . $label . "</strong>: " . htmlspecialchars($value) . "</li>";
        } else {
            $emailBody .= "<li><strong>" . ucfirst($key) . "</strong>" . ": " . htmlspecialchars($value) . "</li>";
        }
    }
    $emailBody .= "</ul>";

    $mail = new PHPMailer(true);

    $mail->CharSet = 'UTF-8';
    $mail->ContentType = 'text/html';

    try {
        //Server settings
        $mail->SMTPDebug = 0; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
        $mail->Port = 465; // TCP port to connect to
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = $_ENV['MAIL_USERNAME']; // SMTP username
        $mail->Password = $_ENV['MAIL_PASSWORD']; // SMTP password

        //to Engagement Admin
        $mail->setFrom($_ENV['MAIL_USERNAME'], 'SWU');
        $mail->addAddress('zelazideqc@gmail.com', 'Admin'); // Add a recipient
        $mail->Subject = 'Ent Registration to Admin';
        $mail->Body = $emailBody;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        $mail->send();

        // Reset properties
        $mail->clearAddresses();
        $mail->clearCCs();
        $mail->clearBCCs();
        $mail->clearAttachments();

        // To Applicant
        $mail->setFrom($_ENV['MAIL_USERNAME'], 'SWU');
        $mail->addAddress($data['email'], 'Registered User');
        // if (isset($data['email'])) {
        //     $mail->addAddress($data['email'], 'Registered User');
        // } elseif (isset($data['contEmail'])) {
        //     $mail->addAddress($data['contEmail'], 'Registered User');
        // } else {
        //     error_log("Email address not found");
        // }
        $mail->Subject = 'Engagementthailand Registration';
        $mail->Body = '<b>Thank you for registering!</b></n>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        $mail->send();

        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Data saved and email sent successfully!"]);
        exit();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["failed" => false, "message" => "Email sending failed: {$mail->ErrorInfo}"]);
        exit();
    }
}
