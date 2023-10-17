<?php

require '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

sendHeaders();

$secretKey = getServerVariable('RE_CAPTCHA_SECRET_KEY');
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);
$token = sanitize($data['token'] ?? '');

if (!$token) {
    sendErrorResponse("Token not provided.");
    exit();
}

$verifyResponse = verifyWithGoogle($secretKey, $token);

if ($verifyResponse === false) {
    sendErrorResponse("Failed to verify reCAPTCHA. Please try again later.");
    exit();
}

$responseKeys = json_decode($verifyResponse, true);

if (intval($responseKeys["success"]) === 1) {
    echo json_encode(["success" => true, "message" => "reCAPTCHA verification successful."]);
} else {
    sendErrorResponse("reCAPTCHA verification failed.");
}

// Helper Functions

function sendHeaders()
{
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

function getServerVariable($key, $default = null)
{
    return $_SERVER[$key] ?? $default;
}

function verifyWithGoogle($secretKey, $token)
{
    $apiURL = "https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$token}";
    $response = false;

    try {
        $response = file_get_contents($apiURL);
    } catch (Exception $e) {
        error_log('Error contacting Google reCAPTCHA API: ' . $e->getMessage());
    }

    return $response;
}

function sendErrorResponse($message)
{
    error_log($message);
    echo json_encode(["success" => false, "message" => $message]);
}

function sanitize($data)
{
    return htmlspecialchars(strip_tags(trim($data)));
}
