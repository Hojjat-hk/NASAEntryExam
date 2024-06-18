<?php
class JsonManager {
	private readonly ?array $jsonData;
	private bool $isJsonPrinted = false;
	
	public function __construct() {
		$this->jsonData = json_decode(file_get_contents("php://input", true), true);
	}
	
	public function getParameter(string $key): mixed {
		return $this->jsonData[$key] ?? null;  // Used to avoid throwing a warning
	}
	
	public function printJson(array $array): bool {
		if ($this->isJsonPrinted)
			return false;
		
		header("Content-type: application/json");
		echo(json_encode($array, JSON_PRETTY_PRINT));
		
		$this->isJsonPrinted = true;
		return true;
	}
}
