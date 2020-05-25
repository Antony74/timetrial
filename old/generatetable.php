<?php

function GenerateTable($sCourseFilter)
{
	$arrRunnerFilter = array(); // for now

	$sHtml = "";
	$sHtml .= "<h2>Timetrial Results</h2>";

	$xml = simplexml_load_file("races.xml");

	foreach($xml->SEASON as $season)
	{
 
    //
    // Determine if we're interested in this season
    //
    $sCourse = (string)$season->COURSE[0];
    if (strlen($sCourseFilter) && $sCourseFilter != $sCourse)
      continue;

    //
    // Get details of this season and who ran
    //
    $sHtml .= "<LI>";
		$sHtml .= $season->RACE[0]->DATE[0] . " switch to " . $season->COURSE[0];
    $sHtml .= "</LI>\r\n";
    
    $arrRunner = $arrRunnerFilter;
    if (count($arrRunner) == 0)
    {
      foreach($season->RACE as $race)
      {
        foreach($race->RACEDETAIL as $racedetail)
        {
          $sRunner = (string)$racedetail->RUNNERNAME;
          $arrRunner[$sRunner] = "&nbsp;";
        }
      }
    }
    ksort($arrRunner);

    //
    // Get details of each race this season
    //
    $bSomeoneRanThisSeason = false;
    $sHtmlRows = "";
    foreach($season->RACE as $race)
    {
      $bSomeoneRanThisRace = false;
      foreach($arrRunner as $sRunner=>$sTime)
      {
        $arrRunner[$sRunner] = "&nbsp";
      }

      foreach($race->RACEDETAIL as $racedetail)
      {
          $sRunner = (string)$racedetail->RUNNERNAME;
          $sTime = (string)$racedetail->TIME;
          
          if (isset($arrRunner[$sRunner]))
          {
            $arrRunner[$sRunner] = $sTime;
            $bSomeoneRanThisRace = true;
            $bSomeoneRanThisSeason = true;
          }
      }
      
      if ($bSomeoneRanThisRace)
      {
		$sDate = (string)$race->DATE;
      
        $sHtmlRows .= "<tr>\r\n";
        $sHtmlRows .= "\t<td><A href='race.php?date=" . $sDate . "'>" . $sDate . "</A></td>\r\n";

        foreach($arrRunner as $sRunner=>$sTime)
        {
          $sHtmlRows .= "\t<td>" . $sTime . "</td>\r\n";
        }

        $sHtmlRows .= "</tr>\r\n\r\n";
      }
    }
    
    if ($bSomeoneRanThisSeason)
    {
      $sHtml .= "<TABLE border='1'>\r\n";
      $sHtml .= "<tr>\r\n";
      $sHtml .= "<td>&nbsp;</td>\r\n";
      foreach($arrRunner as $sRunner=>$sTime)
      {
        $sHtml .= "<td>" . $sRunner . "</td>\r\n";
      }
      $sHtml .= "</tr>\r\n\r\n";
      $sHtml .= $sHtmlRows;
      $sHtml .= "</TABLE><BR/>\r\n";
    }
    
	}

  echo($sHtml);
}

?>