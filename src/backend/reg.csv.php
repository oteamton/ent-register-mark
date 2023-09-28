<?php

require 'vendor/autoload.php'; // Load Composer's autoloader
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Set the CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recipient = "oteamton@gmail.com";
    $subject = "Form Submission";

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

    $formData = array($orgNameth, $orgNameEn, $address, $phone, $fax, $contName,
    $contEmail, $contLine,
    $repName, $repPosition, $repAgency, $repFax, $repPhone, $repEmail, $repLine,
    $altRepName, $altRepPosition, $altRepAgency, $altRepFax, $altRepPhone, $altRepEmail, $altRepLine,
    $selectedType,
    $recName, $taxIdNum, $recAddress );

    $filename = './db/registration_data.csv';
    // Check if the file already exists; if not, create a new one and add headers
    if (!file_exists($filename)) {
        $file = fopen($filename, 'w');
        fputcsv($file, array('ชื่องค์กร (TH)', 'ชื่อองค์กร (EN)', 'ที่อยู่', 'โทรศัพท์', 'แฟกซ์',
            'ชื่อผู้ประสานงาน', 'อีเมลผู้ประสานงาน', 'line ผู้ประสานงาน', 'ชื่อผู้สำรององค์กร', 'ต่ำแหน่งผู้สำรององค์กร', 'หน่วยงานผู้สำรององค์กร', 'แฟกซ์', 'โทรศัพท์ผู้สำรององค์กร', 'อีเมลผู้สำรององค์กร', 'line ผู้สำรององค์กร', 'Alternate Representative Name', 'Alternate Representative Position', 'Alternate Representative Agency', 'Alternate Representative Fax', 'Alternate Representative Phone', 'Alternate Representative Email', 'Alternate Representative Line',
            'Type of Registration', 'Recipient Name', 'Tax ID Number', 'Recipient Address'));
        fclose($file);
    }

    // Create a temporary CSV file
    $tempCsvFile = tempnam(sys_get_temp_dir(), 'registration');
    $file = fopen($tempCsvFile, 'w');
    fputcsv($file, $formData);
    fclose($file);

    // Append form data to the CSV file
    $file = fopen($filename, 'a');
    fputcsv($file, $formData);
    fclose($file);

    // Initialize PHPMailer
    $mail  = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 2; // Set to 2 for debugging (0 for production)
        $mail->isSMTP();

        $mail->Host = 'kitchanunt@g.swu.ac.th'; // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'kitchanunt@g.swu.ac.th';
        $mail->Password = 'Ton26052543';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        //Recipients
        $mail->setFrom($contEmail, $contName);
        $mail->addAddress($recipient);

        // Attach file
        $mail->addAttachment($tempCsvFile, 'registration.csv');

        
        // Content
        $mail->isHTML(false); // Set to true if you want to send HTML emails
        $mail->Subject = $subject;
        $mail->Body = "Name: $name\nEmail: $coEmail\nMessage:\n$message";

        $mail->send();
        echo "Email sent successfully!";
    } catch (Exception $e) {
        echo "Email sending failed: {$mail->ErrorInfo}";
    } finally {
        unlink($tempCsvFile);
    }

    // Respond with success status
    http_response_code(200);
    echo json_encode(["success" => true]);
} else {
    // Respond with an error status if the request method is not POST
    http_response_code(400);
    echo json_encode(["error" => "Invalid request method"]);
}
?>