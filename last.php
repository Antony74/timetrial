<?php

	error_reporting(E_ALL);

	$arrRunner = array();

	$sHtml = "";
	$sHtml .= "<h2>Timetrial Results</h2>";

	$xml = simplexml_load_file("races.xml");

	foreach($xml->SEASON as $season)
	{
		$sCourse = (string)$season->COURSE;
		$sCourse = substr($sCourse,0,1);

		foreach($season->RACE as $race)
		{
			foreach($race->RACEDETAIL as $racedetail)
			{
			  $sRunner = (string)$racedetail->RUNNERNAME;
			  $sTime = (string)$racedetail->TIME;
			  $sTime = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" . $sTime;
			  
			  if (!isset($arrRunner[$sRunner]))
			  {
				$arrRunner[$sRunner] = array();
			  }
			  array_push($arrRunner[$sRunner], $sTime);
			  array_push($arrRunner[$sRunner], $sCourse);
			}
		}
	}

	ksort($arrRunner);

	echo('<TABLE border="1" style="border-collapse:collapse">');

	foreach ($arrRunner as $sRunner => $arr)
	{
		echo("<TR>");
		$n = count($arr) - 10;
		if ($n < 0)
			$n = 0;

		echo("<TD>");
		echo($sRunner);
		echo("</TD>");

		for (; $n < count($arr); ++$n)
		{
			echo("<TD>");
			echo($arr[$n]);
			echo("</TD>");
		}

		echo("</TR>");
	}

	echo("</TABLE>");

?>

