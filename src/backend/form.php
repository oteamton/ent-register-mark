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

    $requiredFields = [
        'form',
        'orgNameth', 'orgNameEn', 'address', 'phone', 'fax', 'contName', 'contEmail', 'contLine',
        'repName', 'repPosition', 'repAgency', 'repFax', 'repPhone', 'repEmail', 'repLine',
        'altRepName', 'altRepPosition', 'altRepAgency', 'altRepFax', 'altRepPhone', 'altRepEmail', 'altRepLine',
        'recName', 'taxIdNum', 'recAddress', 'recaptchaToken'
    ];

    $data = [];
    foreach ($requiredFields as $field) {
        $data[$field] = $_POST[$field] ?? '';
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
            if ($existingData === null) {
                // Handle error - couldn't decode the JSON
                error_log("Error: Unable to decode the JSON data from $filename");
                fclose($handle);
                return false;
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
    $emailBody = "<h2>Details submitted:\n</h2><ul>";
    foreach ($data as $key => $value) {
        $emailBody .= "<li><strong>" . ucfirst($key) . "</strong>" . ": " . htmlspecialchars($value) . "</li>";
    }
    $emailBody .= "</ul>";

    $mail = new PHPMailer(true);
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
        exit();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["failed" => false, "message" => "Email sending failed: {$mail->ErrorInfo}"]);
        exit();
    }
}
