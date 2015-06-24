 require(["esri/map", 
      "esri/geometry/Point", 
      "esri/geometry/Multipoint", 
      "esri/geometry/Polyline",
      "esri/geometry/Polygon",
      "esri/graphic", 
      "esri/symbols/SimpleMarkerSymbol", 
      "esri/symbols/SimpleLineSymbol", 
      "esri/symbols/SimpleFillSymbol",
      "esri/symbols/PictureMarkerSymbol", 
      "esri/InfoTemplate", 
      "dojo/_base/Color", 
      "dojo/query",
      "dojo/on", 
      "dojo/dom", 
      "dojo/domReady!"], function(Map, Point, Multipoint, Polyline, Polygon, Graphic,
                                 SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, 
                                 InfoTemplate, Color, query, on, dom) {
        "use strict"
        var pointSymbol,lineSymbol,polygonSymbol;
        var multiPointGraphic,polylineGraphic,polygonGraphic, multiPoint;
        var pts, activeToolId;
        //var colors=new Array("#000000","#F44336","#3F51B5","#009688","#4CAF50","#FFC107","#FF5722"); #9b59b6
        var colors=new Array("#000000","#F44336","#3F51B5","#009688","#9b59b6","#FFC107","#4CAF50");
        var markers=new Array("",'markers/redBorder.png','markers/blueBorder.png','markers/greenBorder.png','markers/purpleBorder.png','markers/orangeBorder.png','markers/lightGreenBorder.png');
        // Create map
        var map = new Map("mapDiv",{ 
          basemap: "gray", //national-geographic
          center: [22.1100,41.528087],
          zoom: 9,
        });

        var popup = map.infoWindow;
        popup.highlight = false;
        popup.titleInBody = false;
        popup.domNode.className += " light";
    

        // Wire events
        on(map,"load", getVotingPlaces);
       // on(map,"click", onMapClickCallback);
      
       function getVotingPlaces(){
        $.getJSON("http://voting.zor-komerc.mk/votingPlaces.php", function() {
             console.log( "success" );
        }).done(function(data) {               
               addVotingPlaces(data);               
        }).fail(function(error) {
             console.log("error getting voting places " + error );
        });  

       }      

        function addVotingPlaces(data) {
              for(var i=0;i<data.length;i++) {
                var point = new esri.geometry.Point(parseFloat(data[i].longitude),parseFloat(data[i].latitude));
                var infoTooltip=new InfoTemplate(data[i].place,data[i].location);
                var votingUnit=data[i].votingUnit;
                addPoint(point,infoTooltip,votingUnit,true);                
             }  
       }

        function onMapClickCallback(evt){
          addPoint(evt.mapPoint,true);
        }
        // Add point graphic
       function addPoint(pt, infoTooltip,votingUnit,finished) {
          var attributes = {"Lat":pt.getLatitude().toFixed(2),"Lon":pt.getLongitude().toFixed(2)};
          pointSymbol=createPointSymbol(votingUnit);
          var graphic = new Graphic(pt,pointSymbol,attributes,infoTooltip);
          map.graphics.add(graphic);
        }
       
        
        function createPointSymbol(votingUnit) {
          var marker=markers[votingUnit];
         return new PictureMarkerSymbol(marker, 29,27);
        }
        
      }
    );