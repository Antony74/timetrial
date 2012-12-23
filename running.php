<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Wallingford Running Courses</title>
    <link rel="stylesheet" href="running.css" type="text/css" />
    <script src="http://maps.google.com/maps/api/js?v=3.3&amp;sensor=false"></script>
	<script src="http://www.openlayers.org/api/OpenLayers.js"></script>
    <script type="text/javascript" src="jquery-1.5.1.min.js"></script>
	<script type="text/javascript" src="running.js"></script>
  </head>
  <body>
    <p align='right'>
        <a href='/index.php'>Home</a> |
        <a href='/summer.php'>Summer&nbsp;Course</a> |
        <a href='/alt-summer.php'>Alternative&nbsp;Summer&nbsp;Course</a> |
        <a href='/winter.php'>Winter&nbsp;Course</a> |
        <a href='running.php'>Maps</a> |
        <a href='all.php'>All&nbsp;Races</a> |
        <a href='/winter2008'>Winter&nbsp;2008&nbsp;Trophies</a> |
        <a href='/summer2007'>Summer&nbsp;2007&nbsp;Trophies</a> |
        <a href='/photos.php'>Older&nbsp;Photos</a>
    </p>
    <br />
    <div id="mapSection" class="mapDiv">
        <div id="map" class="mediummap"></div>
    </div>
	<div id="panelRight">

    <div id="options" class="measureToggle">
        <ul id="controlToggle">
            <li>
                <input type="radio" name="type" value="none" id="noneToggle" onclick="szrun.toggleControl(this);" checked="checked" />
                <label for="noneToggle">Map navigation</label>
            </li>
            <li>
                <input type="radio" name="type" value="line" id="lineToggle" onclick="szrun.toggleControl(this);" />
                <label for="lineToggle">Distance measurement</label>
            </li>
            <li>
                <div id="output"></div>
            </li>
		</ul>
		<hr/>
		<ul>
			<li>
			    <input type="radio" name="basemap" value="OSM" id="osmbase" onclick="szrun.setBaseMap(this);" checked="checked"  />
                <label for="osmbase">Open Street Map</label>
			</li>

			<li>
			    <input type="radio" name="basemap" value="GOOGLESAT" id="googlesatbase" onclick="szrun.setBaseMap(this);"  />
                <label for="googlesatbase">Google Satellite</label>
			</li>
        </ul>
		<hr/>
    </div>
	<div id="runNavigator">
	Whoops! If you see this message hit F5 until the routes are displayed. We have a known issue in IE which we are trying to solve.
	</div>
	</div>

  </body>
</html>
