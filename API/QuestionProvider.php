<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST")
	exit();

require_once("../Classes/JsonManager.php");
require_once("../Classes/DatabaseConnection.php");

$manager = new JsonManager();

$numEasy   = $manager->getParameter("numEasyQuestions");
$numMedium = $manager->getParameter("numMediumQuestions");
$numHard   = $manager->getParameter("numHardQuestions");

foreach ([$numEasy, $numMedium, $numHard] as $numQuestions) {
	if (!is_int($numQuestions) || $numQuestions < 0) {
		$manager->printJson(["errorMessage" => "Some of the passed parameters are invalid."]);
		exit();
	}
}

$questions = [];

try {
	$connection = new DatabaseConnection();
	
	$getQuestions = function(int $numQuestions, string $difficultyCaption) use ($connection, &$questions): void {
		$result = $connection->query("SELECT * FROM question WHERE Difficulty = '$difficultyCaption';");
		$resultArray = [];
		
		// Copy the result rows to an array
		foreach ($result as $row) {
			$row["IsTrue"] = $row["IsTrue"] === 1;  // Convert the 'isTrue' column values from int to bool
			$resultArray[] = $row;
		}
		
		shuffle($resultArray);

		// Append the requested number of questions to the original array
		for ($i = 0; $i < $numQuestions; $i++) {
			if ($i >= $result->num_rows)  // Return if the number of available questions is exhausted
				return;
			
			$questions[] = $resultArray[$i];
		}
	};
	
	$getQuestions($numEasy, "Easy");
	$getQuestions($numMedium, "Medium");
	$getQuestions($numHard, "Hard");
	
	$manager->printJson($questions);
}
catch (DatabaseException $ex) {
	$manager->printJson(["errorMessage" => $ex->getMessage()]);
}
finally {
	if (isset($connection)) {
		$connection->disconnect();
	}
}
