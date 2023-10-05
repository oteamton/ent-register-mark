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

    // Verify reCAPTCHA
    $recaptcha_secret = $_ENV['RE_CAPTCHA_SECRET_KEY'];
    $recaptcha_response = $_POST['g-recaptcha-response'] ?? '';

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response
    );

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );

    $context = stream_context_create($options);
    $verify = file_get_contents($url, false, $context);
    $captcha_success = json_decode($verify);

    if (intval($captcha_success->success) !== 1) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed']);
        exit();
    }

    $requiredFields = [
        'form',
        'orgNameth', 'orgNameEn', 'address', 'phone', 'fax', 'contName', 'contEmail',
        'repName', 'repPosition', 'repAgency', 'repFax', 'repPhone', 'repEmail',
        'altRepName', 'altRepPosition', 'altRepAgency', 'altRepFax', 'altRepPhone', 'altRepEmail',
        'selectedType', 'recName', 'taxIdNum', 'recAddress'
    ];

    $data = [];
    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => "Error: Missing value for $field."]);
            exit();
        }
        $data[$field] = $_POST[$field];
    }

    if (isset($_POST['typeA'])) {
        $data['selectedType'] = "สมาชิกตลอกชีพ 100,000 บาท";
    } elseif (isset($_POST['typeB'])) {
        $data['selectedType'] = "สมาชิกราย 3 ปี 30,000 บาท";
    } else {
        $data['selectedType'] = "";
    }

    $filename = './db/registration.json';
    $existingData = [];

    if (file_exists($filename)) {
        $existingData = json_decode(file_get_contents($filename), true);
    }

    $existingData[] = $data;
    file_put_contents($filename, json_encode($existingData, JSON_PRETTY_PRINT));

    $mail  = new PHPMailer(true);
    try {
        // ... (PHPMailer setup and sending remains unchanged)

        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Data saved and email sent successfully!"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Email sending failed: {$mail->ErrorInfo}"]);
    }

}
