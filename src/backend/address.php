<?php
$servername = "10.1.21.114\k2qas";
$username = "sa";
$password = "Admin@K2";
$database = "Business Partner";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM Insurance_Address_province";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "PROVINCE_ID: " . $row["PROVINCE_ID"] . "<br>";
        echo "PROVINCE_CODE: " . $row["PROVINCE_CODE"] . "<br>";
        echo "PROVINCE_NAME: " . $row["PROVINCE_NAME"] . "<br>";
        echo "GEO_ID: " . $row["GEO_ID"] . "<br>";
        echo "PROVINCE_CODE1: " . $row["PROVINCE_CODE1"] . "<br>";
        echo "<hr>";
    }
} else {
    echo "0 results";
}
// Close the database connection
$conn->close();
?>

?>