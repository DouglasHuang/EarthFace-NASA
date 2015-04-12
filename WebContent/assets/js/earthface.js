 var checkFunction = function(event, state)  {
	heatmapLayer.clearData();
	var check1 = document.getElementById('check1');
	var check2 = document.getElementById('check2');
	var check3 = document.getElementById('check3');
	var check4 = document.getElementById('check4');
    if ( check1.checked ) {
        heatmapLayer.setData(goodData1);
    } 
    if ( check2.checked ) {
        heatmapLayer.setData(goodData2);
    } 
    if ( check3.checked ) {
        heatmapLayer.setData(goodData3);
    } 
    if ( check4.checked ) {
        heatmapLayer.setData(goodData4);           	
    }
 };
 
 $('input[name="check1"]').on('switchChange.bootstrapSwitch', checkFunction);
 $('input[name="check2"]').on('switchChange.bootstrapSwitch', checkFunction);
 $('input[name="check3"]').on('switchChange.bootstrapSwitch', checkFunction);
 $('input[name="check4"]').on('switchChange.bootstrapSwitch', checkFunction);



	var baseLayer = L.tileLayer(
          'https://{s}.tiles.mapbox.com/v4/joseph-huang.lmh7gb5d/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam9zZXBoLWh1YW5nIiwiYSI6ImNaLW1yZUUifQ.JbB9bNqhVFNhSZNkfAtjkw#4/43.97/-79.25',{
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
          }
        );

        var cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
          "radius": 1.0,
          "maxOpacity": 0, 
          // scales the radius based on map zoom
          "scaleRadius": true, 
          // if set to false the heatmap uses the global maximum for colorization
          // if activated: uses the data maximum within the current map boundaries 
          //   (there will always be a red spot with useLocalExtremas true)
          "useLocalExtrema": true,
          // which field name in your data represents the latitude - default "lat"
          latField: 'latitude',
          // which field name in your data represents the longitude - default "lng"
          lngField: 'longitude',
          // which field name in your data represents the data value - default "value"
          valueField: 'value'
        };


        var heatmapLayer = new HeatmapOverlay(cfg);

        var map = new L.Map('map-canvas', {
          center: new L.LatLng(25.6586, -70.3568),
          zoom: 5,
          layers: [baseLayer, heatmapLayer]
        });

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
		$.getJSON( "assets/data/temp.json", function( rawData ) {
		    for(var i=0;i<rawData.length;i++)
		    {
		      if(rawData[i].value != "99999.0")
		      {
		        rawData[i].latitude = parseFloat(rawData[i].latitude);
		        rawData[i].longitude = parseFloat(rawData[i].longitude); 
		        goodData4.data.push(rawData[i]);          
		      };
		    };
	     });
