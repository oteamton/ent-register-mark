<?php
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

    $typeA = isset($_POST['typeA']) ? $_POST['typeA'] : false;
    $typeB = isset($_POST['typeB']) ? $_POST['typeB'] : false;

    $recName = $_POST['recName'];
    $taxIdNum = $_POST['taxIdNum'];
    $recAddress = $_POST['recAddress'];
    

    
    // You can perform validation and database operations here
    
    // Save the data to a text file
    $dataToSave = "Organization Name (TH): $orgNameth\n";
    $dataToSave .= "Organization Name (EN): $orgNameEn\n";
    $dataToSave .= "Address: $address\n";   
    $dataToSave .= "Phone: $phone\n";
    $dataToSave .= "Fax: $fax\n";
    $dataToSave .= "Contact Person: $coName\n";
    $dataToSave .= "Contact Email: $coEamil\n";
    $dataToSave .= "Contact Line: $coLine\n";
    $dataToSave .= "Representative Name: $repName\n";
    $dataToSave .= "Representative Position: $repPosition\n";
    $dataToSave .= "Representative Agency: $repAgency\n";
    $dataToSave .= "Representative Fax: $repFax\n";
    $dataToSave .= "Representative Phone: $repPhone\n";
    $dataToSave .= "Representative Email: $repEmail\n";
    $dataToSave .= "Representative Line: $repLine\n";
    $dataToSave .= "Alternate Representative Name: $altRepName\n";
    $dataToSave .= "Alternate Representative Position: $altRepPosition\n";
    $dataToSave .= "Alternate Representative Agency: $altRepAgency\n";
    $dataToSave .= "Alternate Representative Fax: $altRepFax\n";
    $dataToSave .= "Alternate Representative Phone: $altRepPhone\n";
    $dataToSave .= "Alternate Representative Email: $altRepEmail\n";
    $dataToSave .= "Alternate Representative Line: $altRepLine\n";
    $dataToSave .= "Type A: $typeA\n";
    $dataToSave .= "Type B: $typeB\n";
    $dataToSave .= "Recipient Name: $recName\n";
    $dataToSave .= "Tax ID Number: $taxIdNum\n";
    $dataToSave .= "Recipient Address: $recAddress\n";


    $filename = './db/registration_data.txt';
    
    // Append data to the file
    file_put_contents($filename, $dataToSave, FILE_APPEND);
    
    // Respond with success status
    http_response_code(200);
    echo json_encode(["success" => true]);
} else {
    // Respond with an error status if the request method is not POST
    http_response_code(400);
    echo json_encode(["error" => "Invalid request method"]);
}
?>
