 var checkFunction = function(event, state)  {
	heatmapLayer.clearData();
	var check1 = document.getElementById('check1');
	var check2 = document.getElementById('check2');
	var check3 = document.getElementById('check3');
	var check4 = document.getElementById('check4');
    if ( check1.checked ) {
        heatmapLayer.applyData(goodData1, markers);
    }
    if ( check2.checked ) {
        heatmapLayer.applyData(goodData2, markers);
    } 
    if ( check3.checked ) {
        heatmapLayer.applyData(goodData3, markers);
    } 
    if ( check4.checked ) {
        heatmapLayer.applyData(goodData4, markers);           	
    }
 };
 
 $('input[name="check1"]').on('switchChange.bootstrapSwitch', checkFunction);
 $('input[name="check2"]').on('switchChange.bootstrapSwitch', checkFunction);
 $('input[name="check3"]').on('switchChange.bootstrapSwitch', checkFunction);
 $('input[name="check4"]').on('switchChange.bootstrapSwitch', checkFunction);

 function clearInsightPoints() {
	 map.removeLayer(markers);
	 markers = new L.FeatureGroup();
	 map.addLayer(markers);
 };
 
	var baseLayer = L.tileLayer(
          'https://{s}.tiles.mapbox.com/v4/joseph-huang.lmh7gb5d/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam9zZXBoLWh1YW5nIiwiYSI6ImNaLW1yZUUifQ.JbB9bNqhVFNhSZNkfAtjkw#4/43.97/-79.25',{
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
          }
        );

		var gradient_black = {
			"0.45": "rgb(230,230,230)",
			"0.55": "rgb(172,172,172)",
			"0.65": "rgb(114,114,114)",
			"0.95": "rgb(56,56,56)",
			"1.0": "rgb(0,0,0)"};

		var gradient_rainbow = {
				"0.45": "rgb(230,230,230)",
				"0.55": "rgb(180,255,200)",
				"0.75": "rgb(255,255,155)",
				"0.85": "rgb(255,180,180)",
				"1.0": "rgb(255,0,0)"};

		
        var cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
          "radius": 1.0,
          "maxOpacity": 0, 
          "maxOpacity": 0,
          // scales the radius based on map zoom
          "scaleRadius": true, 
          // if set to false the heatmap uses the global maximum for colorization
          // if activated: uses the data maximum within the current map boundaries 
          //   (there will always be a red spot with useLocalExtremas true)
          "useLocalExtrema": true,
          "blur": 1,
          "gradient": gradient_rainbow,
          // which field name in your data represents the latitude - default "lat"
          latField: 'latitude',
          // which field name in your data represents the longitude - default "lng"
          lngField: 'longitude',
          // which field name in your data represents the data value - default "value"
          valueField: 'value'
        };


        var heatmapLayer = new HeatmapOverlay(cfg);
        var markers = new L.FeatureGroup();

        var map = new L.Map('map-canvas', {
          center: new L.LatLng(25.6586, -70.3568),
          zoom: 5,
          layers: [baseLayer, heatmapLayer]
        });
        map.addLayer(markers);
        
        var goodData1 = {data:[]};
	    var goodData2 = {data:[]};
	    var goodData3 = {data:[]};
	    var goodData4 = {data:[]};
		$.getJSON( "assets/data/fire.json", function( rawData ) {
		    for(var i=0;i<rawData.length;i++)
		    {
		      if(rawData[i].value != "99999.0")
		      {
		        rawData[i].latitude = parseFloat(rawData[i].latitude);
		        rawData[i].longitude = parseFloat(rawData[i].longitude); 
		        // visualization scale factor
		        var factor = 10;
		        rawData[i].value = parseFloat(rawData[i].value) * factor; 		        
		        goodData1.data.push(rawData[i]);          
		      };
		    };
	     });
		$.getJSON( "assets/data/co.json", function( rawData ) {
		    for(var i=0;i<rawData.length;i++)
		    {
		      if(rawData[i].value != "99999.0")
		      {
		        rawData[i].latitude = parseFloat(rawData[i].latitude);
		        rawData[i].longitude = parseFloat(rawData[i].longitude); 
			        goodData2.data.push(rawData[i]);          
		      };
		    };
	     });
		$.getJSON( "assets/data/water.json", function( rawData ) {
		    for(var i=0;i<rawData.length;i++)
		    {
		      if(rawData[i].value != "99999.0")
		      {
		        rawData[i].latitude = parseFloat(rawData[i].latitude);
		        rawData[i].longitude = parseFloat(rawData[i].longitude); 
		        goodData3.data.push(rawData[i]);          
		      };
		    };
	     });
		$.getJSON( "assets/data/population.json", function( rawData ) {
		    for(var i=0;i<rawData.length;i++)
		    {
		      if(rawData[i].value != "99999.0")
		      {
		        rawData[i].latitude = parseFloat(rawData[i].latitude);
		        rawData[i].longitude = parseFloat(rawData[i].longitude); 
		        // visualization scale factor
		        var factor = 1;
		        rawData[i].value = parseFloat(rawData[i].value) * factor; 		        
		        goodData4.data.push(rawData[i]);          
		      };
		    };
	     });
