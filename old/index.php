<html>
<head>
    <title>Wallingford Timetrial</title>
</head>
<body>

<?php
	error_reporting(E_ALL);
	include "header.html"
?>

<h1>Wallingford Timetrial</h1>
<p>
    The time trial is held on Fridays and starts at the front gate at about 12:30, just turn up,
    all standards are welcome.  Runners are set off based on their previous timetrial with the aim
    of everyone finishing at the same time.
</p>
<p>
    Remember to bring a digital watch with you so you can time yourself,
    the exact start and finish are when you cross the entrance out of and in to HR, respectively.
</p>

<h2>Rules</h2>
<li>If you need to overtake on the towpath, shout out "mind your backs," the person in front must give way</li>
<li>No short cuts allowed</li>

<br>

<h2>Most Recent Timetrial</h2>
<?php
	include "generaterace.php";
	GenerateRace("");
?>

</body>
</html>