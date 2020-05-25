<?php
	error_reporting(E_ALL);
	include "header.html";
	include "generaterace.php";	
	$sDate = "";
	if (isset($_REQUEST["date"]))
		$sDate = $_REQUEST["date"];
		
	GenerateRace($sDate);
?>
