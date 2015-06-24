var url="http://voting.zor-komerc.mk/incidentsHeatmap.php";
require(["esri/config"], function(esriConfig) {  
			esriConfig.defaults.io.corsDetection = false;  
		}); 
        require([
            "esri/map",
            "dojo/on",
            "dojo/dom",
            "esri/layers/FeatureLayer",
            "application/HeatmapLayer",
            "esri/tasks/query",
            "esri/geometry/Extent",
            "dojo/domReady!",
            "esri/geometry/webMercatorUtils"
        ], function(
            Map,
            on,
            dom,
            FeatureLayer,
            HeatmapLayer,
            Query,
            Extent
        ){
            
            // Variables
            var map;
            var heatLayer;
      

            // get the features within the current extent from the feature layer
            function getFeatures() {
                
			
		
                 $.getJSON(url, function() {
                        console.log( "success" );
                 }).done(function(data) {              
                        data=eval(data);
                        heatLayer.setData(data);           
                }).fail(function(error) {
                     console.log("error getting data ");
                     console.log(error);
                 });    

				
            }

            // initial extent of map
            var initExtent = new Extent({
                xmax: -13624229.32056175,
                xmin: -13625120.886837104,
                ymax: 4548374.604660432,
                ymin: 4547966.144290476,
                "spatialReference": {
                    "wkid": 102100
                }
            });
            // create map
            map = new Map("map", {
                extent: initExtent,
                sliderStyle: "small",
				center: [21.9100,41.528087],
                basemap: "gray",
				zoom: 9
            });
        
            
     
            // create heat layer
            heatLayer = new HeatmapLayer({
                "useLocalMaximum": false,
                config: {
                    "radius": 35,
                    "gradient": {
                        0.45: "rgb(000,000,255)",
                        0.55: "rgb(000,255,255)",
                        0.65: "rgb(000,255,000)",
                        0.95: "rgb(255,255,000)",
                        1.00: "rgb(255,000,000)"
                    }
                },
                "map": map,
                "opacity": 0.85
            }, "heatLayer");
            
            
			
            // add heat layer to map
            map.addLayer(heatLayer);
            // resize map
            map.resize();
           
            // on map extent change
            on(map, "extent-change", getFeatures);
            
        });