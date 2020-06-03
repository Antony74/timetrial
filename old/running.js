//var map, selectControl, selectedFeature;

szrun=
{
	init:function()
	{
	
		//get value of any parameter called crs, remove spaces and uppercase.
	    szrun.coursearg= szrun.getParam("crs").split(' ').join('').toUpperCase();
		szrun.overlays=[];
		szrun.baseMap={"OSM":null,"GOOGLESAT":null};
		szrun.courses=[];
	
		szrun.addBaseMap();
	
		szrun.addCourses();


		// Style for measurement
		szrun.sketchSymbolizers = {
			"Point": {
				pointRadius: 4,
				graphicName: "square",
				fillColor: "white",
				fillOpacity: 1,
				strokeWidth: 1,
				strokeOpacity: 1,
				strokeColor: "#333333"
			},
			"Line": {
				strokeWidth: 3,
				strokeOpacity: 1,
				strokeColor: "#FF0000",
				strokeDashstyle: "dash"
			},
			"Polygon": {
				strokeWidth: 2,
				strokeOpacity: 1,
				strokeColor: "#666666",
				fillColor: "white",
				fillOpacity: 0.3
			}
		};

		szrun.style = new OpenLayers.Style();
		
		szrun.style.addRules([
			new OpenLayers.Rule({symbolizer: szrun.sketchSymbolizers})
		]);
		
		var styleMap = new OpenLayers.StyleMap({"default": szrun.style, "hidden":{fillOpacity: 0.0,		strokeOpacity: 0.0}});
            
		szrun.measureControls = {
			line: new OpenLayers.Control.Measure(
				OpenLayers.Handler.Path, {
				persist: true,
				handlerOptions: {
					layerOptions: {styleMap: styleMap}
				}
				}
			)
		};

		var control;
		for(var key in szrun.measureControls) {
			control = szrun.measureControls[key];
			
			// Geodesic measurements to ensure that measurements are correct
			control.geodesic = true;
			
			control.events.on({
				"measure": szrun.handleMeasurements,
				"measurepartial": szrun.handleMeasurements
			});
			
			szrun.map.addControl(control);
		}

	
	}, //init
	
	addBaseMap: function()
	{
		szrun.map=new OpenLayers.Map('map', {
			controls: [
				new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.PanZoomBar(),
				//new OpenLayers.Control.LayerSwitcher({ 'ascending': false }),
				new OpenLayers.Control.Attribution(),
				new OpenLayers.Control.Permalink(),
				new OpenLayers.Control.ScaleLine(),
				new OpenLayers.Control.Permalink('permalink'),
				new OpenLayers.Control.MousePosition({ "numDigits": 3,
					displayProjection: new OpenLayers.Projection("EPSG:4326")
				}),
				new OpenLayers.Control.OverviewMap(),
				new OpenLayers.Control.KeyboardDefaults()
			]
		});
				

		szrun.loadOpenStreetMap();
		//szrun.loadGoogleSat();
		
		szrun.map.addLayer(szrun.baseMap["OSM"]);
		//szrun.map.addLayer(szrun.baseMap["GOOGLESAT"]);
		
		// Set the latitude and longitude to centre the map on
		szrun.latLong = new OpenLayers.LonLat(-1.11, 51.607).transform(
					new OpenLayers.Projection("EPSG:4326"),
					szrun.map.getProjectionObject()
				);
				
		// Set the zoom level
		szrun.zoom = 13;

		// Centre the map
		szrun.map.setCenter(szrun.latLong, szrun.zoom);
	},
	loadOpenStreetMap: function()
	{
		// Add the OpenStreetMap data
		szrun.baseMap["OSM"]=new OpenLayers.Layer.OSM("OpenStreetMap");
		//szrun.map.addLayer(szrun.baseMap["OSM"]);
		
	},
	loadGoogleSat: function()
	{
		// Add Google Satellite (well aerial photography) layer
		szrun.baseMap["GOOGLESAT"]=new OpenLayers.Layer.Google(
			"Google Satellite",
			{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
			);
		
		//szrun.map.addLayer(szrun.baseMap["GOOGLESAT"]);
    		
    		// Add Google Satellite / Streets hybrid layer
    		//szrun.map.addLayer(new OpenLayers.Layer.Google(
		//"Google Hybrid",
		//{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22}
		//));
	},
	
	addCourses: function()
	{
		$.getJSON("data/courses.json",function(data)
		{

		szrun.overlays=new Array();
		szrun.courses=data;

		var i;
		var len = szrun.courses.length;
		for(i=0;i<len;i++)
		{
		
			try
			{
				szrun.overlays[i]=szrun.addKmlLayer(i,szrun.courses[i][0],szrun.courses[i][1]);
			}
			catch(ex)
			{
			 brk=1; //don't know what to do here
			}

			
		}
		
		szrun.makeNavigator(szrun.overlays);

		// Feature selection
		szrun.selectControl = new OpenLayers.Control.SelectFeature(szrun.overlays,					
			{
				onSelect: szrun.onFeatureSelect,
				onUnselect: szrun.onFeatureUnSelect
			}
		);

		// Add the select control
		szrun.map.addControl(szrun.selectControl);
		szrun.selectControl.activate();
		
		szrun.makeNavigator(szrun.overlays);
		});
	},
	
	addKmlLayer: function(index, name, filename)
	{
		
		var layer=new OpenLayers.Layer.Vector(name, 
			{
				projection: new OpenLayers.Projection("EPSG:4326"),
				strategies: [new OpenLayers.Strategy.Fixed()],
				protocol: new OpenLayers.Protocol.HTTP(
					{
					    url:filename,
					    format: new OpenLayers.Format.KML(
						{
							maxDepth: 2,
							extractStyles: true,
							extractAttributes: true
					})
				})
            		});
            		
		layer.szindex=index;
		
		//register event callback for completion of load of KML layer
		layer.events.register("loadend", layer, function() 
			{
				//set the line colour in the navigator panel for this course	
			   	var selector='input[value|='+this.szindex+']';
				var colour=this.features[0].style['strokeColor'];
				$(selector).prev('div').css('background-color',colour)
            		});

		szrun.map.addLayer(layer);
		return layer;
	},				
	
	onFeatureSelect:function (feature) {
		szrun.selectedFeature = feature;
		var desc = feature.attributes['description'];
		var popup = new OpenLayers.Popup.FramedCloud("chicken",
					feature.geometry.getBounds().getCenterLonLat(),
					null,
					"<div style='font-size:.8em'>Course: " + feature.layer.name + "<br />" + desc + "</div>",
					null,
					true,
					szrun.onPopupClose);
		// Force popup to display in top right configuration
		popup.calculateRelativePosition = function () { return 'tr' };
		// Pan the map if the popup is out of view
		popup.panMapIfOutOfView = true;
		feature.popup = popup;
		szrun.map.addPopup(popup);
	},

	onFeatureUnSelect:function(feature) {
		szrun.map.removePopup(feature.popup);
		feature.popup.destroy();
		feature.popup = null;
	},

	onPopupClose:function(evt) {
		szrun.selectControl.unselect(szrun.selectedFeature);
	},

	handleMeasurements: function(event) {
		var geometry = event.geometry;
		var units = event.units;
		var order = event.order;
		var measure = event.measure;
		var element = document.getElementById('output');
		var out = "";

		var lenText = "Length: ";

		if(order == 1) {
		out += lenText + measure.toFixed(3) + " " + units;
		} else {
		out += lenText + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
		}
		element.innerHTML = out;
	},

	toggleControl:function(element) 
	{
		for(key in szrun.measureControls) {
			var control = szrun.measureControls[key];
			if(element.value == key && element.checked) 
			{
				control.activate();
			} 
			else {
				control.deactivate();
			}
		}
	},
	
	makeNavigator: function(overlays)
	{
		$('#runNavigator').empty();
		
		var i=0;
		$.each(overlays,function(index, val)
		{
			//if(szrun.coursearg != "" && szrun.courses[i][0].split(' ').join('').toUpperCase() != szrun.coursearg)
			var checked;
			if(szrun.coursearg != "" && val.name.split(' ').join('').toUpperCase() != szrun.coursearg)
			{
				val.setVisibility(false);
				checked='';
			}
			else
			{
				checked='checked="checked"';
			}
		
			var id='cb_'+val.name;
			
			var html='<div><div class="courseLineCol">&nbsp;</div><input type="checkbox" '+checked+' name="course" id="'+id+'" value="'+i+'"/><label for="'+id+'">'+val.name+'</label></div>'
			$('#runNavigator').append(html);
			i++;
		
		});
		
		$('#runNavigator div').mouseenter(function()
			{
				szrun.highlightCourse($(this).find('input')[0].value);
			});
		$('#runNavigator div').mouseleave(function()
			{
				szrun.deHighlightCourse($(this).find('input')[0].value);
			});
		$('[name|=course]').click(function()
				{
					$('[name|=course]').each(function(index)
						{
							
							szrun.overlays[this.value].setVisibility(this.checked);
							
							//szrun.map.removeLayer(szrun.overlays[this.value]);
						});
				});

	},
	
	highlightCourse:function(idx)
	{
		szrun.overlays[idx].features[0].style["oldStrokeWidth"]=szrun.overlays[idx].features[0].style["strokeWidth"];
		szrun.overlays[idx].features[0].style["strokeWidth"]=6;
		szrun.overlays[idx].redraw();
	},
	
	deHighlightCourse:function(idx)
	{
		szrun.overlays[idx].features[0].style["strokeWidth"]=szrun.overlays[idx].features[0].style["oldStrokeWidth"];
		szrun.overlays[idx].redraw();
	},
	
	getParam: function( name )
	{
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
			return "";
		else
			return results[1];
	},
	setBaseMap: function(sender)
	{
		if(sender.value=="GOOGLESAT" && szrun.baseMap["GOOGLESAT"]==null) 
		{
			szrun.loadGoogleSat();
			szrun.map.addLayer(szrun.baseMap["GOOGLESAT"]);
		}
		
		szrun.map.setBaseLayer(szrun.baseMap[sender.value]);
	}
}

window.onload = function(){
	szrun.init();
};

//$(document).ready(function(){
//	szrun.init();
//});