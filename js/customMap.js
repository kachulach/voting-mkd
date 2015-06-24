



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
      "dojo/domReady!"], function(Map, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,PictureMarkerSymbol, InfoTemplate, Color, query, on, dom) {
        "use strict"
        var pointSymbol,lineSymbol,polygonSymbol;
        var multiPointGraphic,polylineGraphic,polygonGraphic, multiPoint;
        var pts, activeToolId;
        var colors=new Array("#000000","#F44336","#3F51B5","#009688","#4CAF50","#FFC107","#FF5722");
   
		
   
        // Create map
        var map = new Map("mapDiv",{ 
          basemap: "gray", //national-geographic
          center: [21.169657,41.523836],
          zoom: 9,
        });

        var popup = map.infoWindow;
        popup.highlight = false;
        popup.titleInBody = false;
        popup.domNode.className += " light";
		
		  on(dom.byId("hiddenLong"),"click",function(){
          var lat=dom.byId("hiddenLat").value;
          var longg=dom.byId("hiddenLong").value;
          var point = new esri.geometry.Point(parseFloat(longg),parseFloat(lat));
          var infoTooltip=new InfoTemplate("Неправилност");
		    clearAddGraphics();
          addPoint(point,infoTooltip,"#F44336",true);   
       });
      
	 
		
	   function addPoint(pt, infoTooltip,color,finished) {
          var attributes = {"Lat":pt.getLatitude().toFixed(2),"Lon":pt.getLongitude().toFixed(2)};
          pointSymbol=createPointSymbol(color);
          var graphic = new Graphic(pt,pointSymbol,attributes,infoTooltip);
          map.graphics.add(graphic);
        }
        
        function createPointSymbol(color) {
          return new PictureMarkerSymbol('markers/red.png', 30,30);
        }
		
		function clearAddGraphics() {
          map.infoWindow.hide();
          map.graphics.clear();
          multiPointGraphic = null;
          polylineGraphic = null;
          polygonGraphic = null;
          pts = null;
        }
        
      }
    );
	