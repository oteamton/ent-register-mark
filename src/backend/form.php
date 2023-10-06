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
    $data['selectedType'] = isset($_POST['typeA']) ? "สมาชิกตลอกชีพ 100,000 บาท" : 
                            (isset($_POST['typeB']) ? "สมาชิกราย 3 ปี 30,000 บาท" : "");

    saveData($data);

    try {
        sendMail();
        sendResponse(200, ["success" => true, "message" => "Data saved and email sent successfully!"]);
    } catch (Exception $e) {
        sendResponse(500, ["success" => false, "message" => "Email sending failed: {$e->getMessage()}"]);
    }
}

function sendResponse(int $statusCode, array $response) {
    http_response_code($statusCode);
    echo json_encode($response);
}

function saveData(array $data) {
    $filename = './db/registration.json';
    $existingData = [];

    if (file_exists($filename)) {
        $existingData = json_decode(file_get_contents($filename), true);
    }

    $existingData[] = $data;
    file_put_contents($filename, json_encode($existingData, JSON_PRETTY_PRINT));
}

    
function sendMail() {
    $mail = new PHPMailer(true);
    try {
        //Server settings
        $mail->SMTPDebug = 0; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'your_email'; // SMTP username
        $mail->Password = 'your_password'; // SMTP password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Data saved and email sent successfully!"]);        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Email sending failed: {$mail->ErrorInfo}"]);
    }
}
