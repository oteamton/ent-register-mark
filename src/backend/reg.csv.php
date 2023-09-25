<?php
// Set the CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $orgNameth = $_POST['orgNameth'];
    $orgNameEn = $_POST['orgNameEn'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $fax = $_POST['fax'];
    
    $coName = $_POST['coName'];
    $coEmail = $_POST['coEmail'];
    $coLine = $_POST['coLine'];

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

    // $selectedType = '';
    // if (isset($_POST['typeA'])) {
    //     $typeA = 'Type A';
    //     $selectedType = 'สมาชิคแบบที่ 1';
    // } else if (isset($_POST['typeB'])) {
    //     $typeB = 'Type B';
    //     $selectedType = 'สมาชิกแบบที่ 2';
    // }

    $recName = $_POST['recName'];
    $taxIdNum = $_POST['taxIdNum'];
    $recAddress = $_POST['recAddress'];

    if (isset($_POST['typeA'])) {
        $selectedType = "สมาชิกแบบที่ 1";  // Set the selectedType value
    } else if (isset($_POST['typeB'])) {
        $selectedType = "สมาชิกแบบที่ 2";  // Set the selectedType value
    } else {
        $selectedType = "";  // Set a default value if neither typeA nor typeB is set
    }

    $formData = array($orgNameth, $orgNameEn, $address, $phone, $fax, $coName,
    $coEmail, $coLine,
    $repName, $repPosition, $repAgency, $repFax, $repPhone, $repEmail, $repLine,
    $altRepName, $altRepPosition, $altRepAgency, $altRepFax, $altRepPhone, $altRepEmail, $altRepLine,
    $selectedType,
    $recName, $taxIdNum, $recAddress );

    $filename = './db/registration_data.csv';
    // Check if the file already exists; if not, create a new one and add headers
    if (!file_exists($filename)) {
        $file = fopen($filename, 'w');
        fputcsv($file, array('Organization Name (TH)', 'Organization Name (EN)', 'Address', 'Phone', 'Fax',
            'Cooperative Contact Person', 'Cooperative Contact Email', 'Cooperative Contact Line', 'Representative Name', 'Representative Position', 'Representative Agency', 'Representative Fax', 'Representative Phone', 'Representative Email', 'Representative Line', 'Alternate Representative Name', 'Alternate Representative Position', 'Alternate Representative Agency', 'Alternate Representative Fax', 'Alternate Representative Phone', 'Alternate Representative Email', 'Alternate Representative Line',
            'Type of Registration', 'Recipient Name', 'Tax ID Number', 'Recipient Address'));
        fclose($file);
    }

    // Append form data to the CSV file
    $file = fopen($filename, 'a');
    fputcsv($file, $formData);
    fclose($file);

    // Respond with success status
    http_response_code(200);
    echo json_encode(["success" => true]);
} else {
    // Respond with an error status if the request method is not POST
    http_response_code(400);
    echo json_encode(["error" => "Invalid request method"]);
}
?>