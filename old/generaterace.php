<?php

function GenerateRace($sDate)
{
	$xml = simplexml_load_file("races.xml");

	$bGotRace = false;
	if(strlen($sDate))
	{
		for ($nSeason = 0; $nSeason < count($xml->SEASON); ++$nSeason)
		{
			$season = $xml->SEASON[$nSeason];
			for ($nRace = 0; $nRace < count($season->RACE); ++$nRace)
			{
				$race = $season->RACE[$nRace];
				if ($sDate == (string)$race->DATE)
				{
					$bGotRace = true;
					break;
				}
			}
			
			if ($bGotRace)
				break;
		}
	}

	if ($bGotRace == false)
	{
		$nSeason = count($xml->SEASON) - 1;
		$season = $xml->SEASON[$nSeason];
		$nRace = count($season->RACE) - 1;
		$race = $season->RACE[$nRace];
	}

	$sDate = (string)$race->DATE;
	$sCourse = (string)$season->COURSE;

	echo("<h2>" . $sDate . " - " . $sCourse . "</h2>");

	$arrRunner = array();
	foreach($race->RACEDETAIL as $racedetail)
	{
		$sRunner = (string)$racedetail->RUNNERNAME;
		$sTime = (string)$racedetail->TIME;
		$arrRunner[$sRunner] = $sTime;
	}
	asort($arrRunner);

	echo("<TABLE cellpadding='5'>\r\n");

	foreach($arrRunner as $sRunner=>$sTime)
	{
		echo("<TR><TD>$sRunner</TD><TD>$sTime</TD></TR>\r\n");
	}

	//
	// Previous
	//
	$nPreviousRace = $nRace - 1;
	$nPreviousSeason = $nSeason;
	if ($nPreviousRace < 0)
	{
		--$nPreviousSeason;
		if ($nPreviousSeason >= 0)
			$nPreviousRace = count($xml->SEASON[$nPreviousSeason]->RACE) - 1;
	}

	echo("<TD>");
	if ($nPreviousSeason >= 0)
	{	$sDate = (string)$xml->SEASON[$nPreviousSeason]->RACE[$nPreviousRace]->DATE;
		echo("<A href='race.php?date=" . $sDate . "'>Previous</A>");
	}
	else
	{
		echo("&nbsp;");
	}
	echo("</TD>");

	//
	// Next
	//
	$nNextRace = $nRace + 1;
	$nNextSeason = $nSeason;
	if ($nNextRace >= count($season->RACE))
	{
		++$nNextSeason;
		if ($nNextSeason < count($xml->SEASON))
			$nNextRace = 0;
	}

	echo("<TD>");
	if ($nNextSeason < count($xml->SEASON))
	{	$sDate = (string)$xml->SEASON[$nNextSeason]->RACE[$nNextRace]->DATE;
		echo("<A href='race.php?date=" . $sDate . "'>Next</A>");
	}
	else
	{
		echo("&nbsp;");
	}
	echo("</TD>");

	//
	// We're done!
	//
	echo("</TR>\r\n");

	echo("</TABLE>");
}

?>

