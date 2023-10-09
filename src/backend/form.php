<?php
require './vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Set the CORS headers
header("Content-Type: application/json;charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $requiredFields = [
        'form',
        'orgNameth', 'orgNameEn', 'address', 'phone', 'fax', 'contName', 'contEmail',
        'repName', 'repPosition', 'repAgency', 'repFax', 'repPhone', 'repEmail',
        'altRepName', 'altRepPosition', 'altRepAgency', 'altRepFax', 'altRepPhone', 'altRepEmail',
        'selectedType', 'recName', 'taxIdNum', 'recAddress'
    ];

    $data = [];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            sendResponse(400, ["success" => false, "message" => "Error: Missing value for $field."]);
            exit();
        }
        $data[$field] = $_POST[$field];
    }

    // Set membership type
    $data['selectedType'] = isset($_POST['typeA']) ? "สมาชิกตลอกชีพ 100,000 บาท" : (isset($_POST['typeB']) ? "สมาชิกราย 3 ปี 30,000 บาท" : "");

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
    $filename = './db/registration.json';
    $existingData = [];

    if (file_exists($filename)) {
        $existingData = json_decode(file_get_contents($filename), true);
    }

    $existingData[] = $data;
    file_put_contents($filename, json_encode($existingData, JSON_PRETTY_PRINT));
}

function sendMail($data)
{
    // Construct email body
    $emailBody = "<h2>Details submitted:\n</h2><ul>";
    foreach ($data as $key => $value) {
        $emailBody .= "<li><strong>" . ucfirst($key) . "</strong>" . ": " . htmlspecialchars($value) . "</li>";
    }
    $emailBody .= "</ul>";

    $mail = new PHPMailer(true);
    try {
        //Server settings
        $mail->SMTPDebug = 2; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
        $mail->Port = 465; // TCP port to connect to
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = $_ENV['MAIL_USERNAME']; // SMTP username
        $mail->Password = $_ENV['MAIL_PASSWORD']; // SMTP password

        //to Engagement Admin
        $mail->setFrom($_ENV['MAIL_USERNAME'], 'SWU');
        $mail->addAddress('admin@gmail.com', 'Admin'); // Add a recipient
        $mail->Subject = 'Ent Registration';
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
        $mail->addAddress($data['contEmail'], 'Registered User'); // Add a recipient
        $mail->Subject = 'Engagementthailand Registration';
        $mail->Body = '<b>Thank you for registering!</b></n>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        $mail->send();

        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Data saved and email sent successfully!"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["failed" => false, "message" => "Email sending failed: {$mail->ErrorInfo}"]);
    }
}
