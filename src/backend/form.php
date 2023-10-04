<?php
require './vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Set the CORS headers
header("Access-Control-Allow-Origin: http://localhost:8000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request method"]);
    exit;
}

// Verify reCAPTCHA
$recaptcha_secret = '6LevxG8oAAAAAF1H0cgTdbAnvO0-My8nCnzrxg8w';
$recaptcha_response = $_POST['g-recaptcha-response'];

$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
    'secret' => $recaptcha_secret,
    'response' => $recaptcha_response
);

$options = array(
    'http' => array(
        'method' => 'POST',
        'content' => http_build_query($data)
    )
);

$context = stream_context_create($options);
$verify = file_get_contents($url, false, $context);
$captcha_success = json_decode($verify);

if (!$captcha_success->success) {
    echo "reCAPTCHA verification failed. Please try again.";
    exit;
}

$recipient = "oteamton@gmail.com";
$subject = "Form Submission";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reqFields = [
        'orgNameth', 'orgNameEn', 'address', 'phone', 'fax', 'contName', 'contEmail',
        'repName', 'repPosition', 'repAgency', 'repFax', 'repPhone', 'repEmail',
        'altRepName', 'altRepPosition', 'altRepAgency', 'altRepFax', 'altRepPhone', 'altRepEmail',
        'selectedType', 'recName', 'taxIdNum', 'recAddress'
    ];

    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            die("Error: Missing value for $field.");
        }
    }

    // Retrieve form data
    $orgNameth = $_POST['orgNameth'];
    $orgNameEn = $_POST['orgNameEn'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $fax = $_POST['fax'];

    $contName = $_POST['contName'];
    $contEmail = $_POST['contEmail'];
    $contLine = $_POST['contLine'];

    $repName = $_POST['repName'];
    $repPosition = $_POST['repPosition'];
    $repAgency = $_POST['repAgency'];
    $repFax = $_POST['repFax'];
    $repPhone = $_POST['repPhone'];
    $repEmail = $_POST['repEmail'];
    $repLine = $_POST['repLine'];

    $altRepName = $_POST['altRepName'];
    $altRepPosition = $_POST['altRepPosition'];
    $altRepAgency = $_POST['altRepAgency'];
    $altRepFax = $_POST['altRepFax'];
    $altRepPhone = $_POST['altRepPhone'];
    $altRepEmail = $_POST['altRepEmail'];
    $altRepLine = $_POST['altRepLine'];

    $recName = $_POST['recName'];
    $taxIdNum = $_POST['taxIdNum'];
    $recAddress = $_POST['recAddress'];

    if (isset($_POST['typeA'])) {
        $selectedType = "สมาชิกตลอกชีพ 100,000 บาท";  // Set the selectedType value
    } else if (isset($_POST['typeB'])) {
        $selectedType = "สมาชิกราย 3 ปี 30,000 บาท";  // Set the selectedType value
    } else {
        $selectedType = "";  // Set a default value if neither typeA nor typeB is set
    }

    $formData = array(
        $orgNameth, $orgNameEn, $address, $phone, $fax, $contName,
        $contEmail, $contLine,
        $repName, $repPosition, $repAgency, $repFax, $repPhone, $repEmail, $repLine,
        $altRepName, $altRepPosition, $altRepAgency, $altRepFax, $altRepPhone, $altRepEmail, $altRepLine,
        $selectedType,
        $recName, $taxIdNum, $recAddress
    );

    $filename = './db/registration.json';
    $existingData = [];

    if (file_exists($filename)) {
        $existingData = json_decode(file_get_contents($filename), true);
    }

    $existingData[] = $formData;

    file_put_contents($filename, json_encode($existingData, JSON_PRETTY_PRINT));

    // PHPMailer setup and email sending
    $mail  = new PHPMailer(true);
    try {
        $mail->SMTPDebug = 2;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'kitchanunt@g.swu.ac.th';
        $mail->Password = 'Ton26052543'; // Do not expose passwords in your code
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 587;

        $mail->setFrom($contEmail, $contName);
        $mail->addAddress($recipient);
        $mail->addAttachment($filename, 'registration.json');
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body = "Form submitted with details:\n\n" . json_encode($formData, JSON_PRETTY_PRINT); // Example body

        $mail->send();
        echo "Email sent successfully!";
    } catch (Exception $e) {
        echo "Email sending failed: {$mail->ErrorInfo}";
    }

    http_response_code(200);
    echo json_encode(["success" => true]);
}
