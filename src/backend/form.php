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

function getFormData($formType, $postData)
{
    $data = [];
    $fieldMappings = [];
    $requiredFields = [];

    switch ($formType) {
        case 'Organization/องค์กร':
            $requiredFields = [
                'form',
                'orgNameth', 'orgNameEn', 'address', 'phone', 'fax', 'contName', 'contEmail', 'contLine',
                'repName', 'repPosition', 'repAgency', 'repFax', 'repPhone', 'repEmail', 'repLine',
                'altRepName', 'altRepPosition', 'altRepAgency', 'altRepFax', 'altRepPhone', 'altRepEmail', 'altRepLine',
                'selectedType',
                'recName', 'taxIdNum', 'recAddress', 'recapchaToken'
            ];

            $fieldMappings = [
                'form' => ['label' => 'แบบฟอร์ม'],
                // องค์กร
                'orgNameth' => ['label' => 'ชื่อบริษัท (ภาษาไทย)'],
                'orgNameEn' => ['label' => 'ชื่อบริษัท (ภาษาอังกฤษ)'],
                'address' => ['label' => 'ที่อยู่'],
                'phone' => ['label' => 'โทรศัพท์'],
                'fax' => ['label' => 'โทรสาร'],
                // ผู้ประสานงาน
                'contName' => ['label' => 'ชื่อและนามสกุล'],
                'contEmail' => ['label' => 'อีเมล์ของผู้ติดต่อ'],
                'contLine' => ['label' => 'เบอร์โทรศัพท์'],
                // ผู้ประสานงานแทน
                'repName' => ['label' => 'ชื่อและนามสกุล'],
                'repPosition' => ['label' => 'ตําแหน่ง'],
                'repAgency' => ['label' => 'หน่วยงาน'],
                'repFax' => ['label' => 'โทรสาร'],
                'repPhone' => ['label' => 'โทรศัพท์'],
                'repEmail' => ['label' => 'อีเมล์'],
                'repLine' => ['label' => 'เบอร์โทรศัพท์'],
                // ผู้สำรองผู้ประสานงานแทน
                'altRepName' => ['label' => 'ชื่อและนามสกุล'],
                'altRepPosition' => ['label' => 'ตําแหน่ง'],
                'altRepAgency' => ['label' => 'หน่วยงาน'],
                'altRepFax' => ['label' => 'โทรสาร'],
                'altRepPhone' => ['label' => 'โทรศัพท์'],
                'altRepEmail' => ['label' => 'อีเมล์'],
                'altRepLine' => ['label' => 'เบอร์โทรศัพท์'],
                // รูปแบบการเป็นสมาชิก
                'selectedType' => ['label' => 'รูปแบบการสมัครสมาชิก'],
                // ใบเสร็จ
                'recName' => ['label' => 'ชื่อและนามสกุลในการออกใบเสร็จ'],
                'taxIdNum' => ['label' => 'เลขประจําตัวผู้เสียภาษี'],
                'recAddress' => ['label' => 'ที่อยู่ในการออกใบเสร็จ'],
            ];

            break;
        case 'Individual/บุคคล':
            $requiredFields = [
                'form',
                'Nameth', 'NameEn', 'positionSci', 'positionBus', 'address', 'phone', 'fax', 'email', 'lineID',
                'instName', 'instNameEn', 'instAddress', 'instPhone', 'instFax',
                'selectedType',
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
                'email' => ['label' => 'อีเมล์ของบุคคล'],
                'lineID' => ['label' => 'Line ID'],
                // หน่วยงาน
                'instName' => ['label' => 'ชื่อหน่วยงาน'],
                'instNameEn' => ['label' => 'ชื่อหน่วยงาน (อังกฤษ)'],
                'instAddress' => ['label' => 'ที่อยู่หน่วยงาน'],
                'instPhone' => ['label' => 'โทรศัพท์หน่วยงาน'],
                'instFax' => ['label' => 'โทรสารหน่วยงาน'],
                // รูปแบบการเป็นสมาชิก
                'selectedType' => ['label' => 'รูปแบบการสมัครสมาชิก'],
                // ใบเสร็จ
                'recName' => ['label' => 'ชื่อและนามสกุลในการออกใบเสร็จ'],
                'taxIdNum' => ['label' => 'เลขประจําตัวผู้เสียภาษี'],
                'recAddress' => ['label' => 'ที่อยู่ในการออกใบเสร็จ'],
            ];

            break;

        default:
            throw new Exception("Invalid form type: $formType");
    }
    foreach ($requiredFields as $field) {
        $dataField = isset($fieldMappings[$field]) ? $fieldMappings[$field]['label'] : $field;
        $data[$dataField] = $postData[$field] ?? '';
    }

    return $data;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['form'])) {
        sendResponse(400, ["success" => false, "message" => "Form type not provided."]);
        exit;
    }

    try {
        $data = getFormData($_POST['form'], $_POST);

        saveData($data);
        sendMail($data);

        sendResponse(200, ["success" => true, "message" => "Data saved and email sent successfully!"]);
    } catch (Exception $e) {
        sendResponse(500, ["success" => false, "message" => "Error: {$e->getMessage()}"]);
    }
}

function sendResponse(int $statusCode, array $response)
{

    http_response_code($statusCode);
    echo json_encode($response);
}

function saveData(array $data)
{
    $filename = './db/Test.JSON';
    $existingData = [];

    // Check if the file exists and is not empty
    if (file_exists($filename) && filesize($filename) > 0) {
        $fileContent = file_get_contents($filename);
        $existingData = json_decode($fileContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log("JSON decode error: " . json_last_error_msg());
            return false; // Return false on corrupt JSON data
        }
    }

    $existingData[] = $data;

    // Acquire a lock for writing to prevent race conditions
    $handle = fopen($filename, 'c+');
    if (!$handle) {
        error_log("Error: Unable to open the file: $filename");
        return false;
    }

    if (flock($handle, LOCK_EX)) {  // Acquire an exclusive lock
        ftruncate($handle, 0);  // Truncate the file to zero size

        // Apply JSON_UNESCAPED_UNICODE along with JSON_PRETTY_PRINT
        if (fwrite($handle, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
            error_log("Error: Unable to write data to $filename");
            fclose($handle);
            return false;
        }

        fflush($handle);  // Flush output before releasing the lock
        flock($handle, LOCK_UN);  // Release the lock
    } else {
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
    $emailBody = "<h2>Details/รายละเอียด :</h2><ul>";

    foreach ($data as $key => $value) {
        $label = $fieldMappings[$key]['label'] ?? ucfirst($key);
        $sanitizedValue = htmlspecialchars($value);
        $emailBody .= "<li><strong>{$label}:</strong> {$sanitizedValue}</li>";
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
        if (isset($data['อีเมล์ของผู้ติดต่อ'])) {
            $mail->addAddress($data['อีเมล์ของผู้ติดต่อ'], 'Registered User');
        } elseif(isset($data['อีเมล์ของบุคคล'])) {
            $mail->addAddress($data['อีเมล์ของบุคคล'], 'Registered User');
        }
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
