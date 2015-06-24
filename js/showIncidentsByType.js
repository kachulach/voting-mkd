require(["esri/map", 
      "esri/geometry/Point", 
      "esri/geometry/Multipoint", 
      "esri/geometry/Polyline",
      "esri/geometry/Polygon",
      "esri/graphic", 
      "esri/symbols/SimpleMarkerSymbol", 
      "esri/symbols/SimpleLineSymbol", 
      "esri/symbols/SimpleFillSymbol", 
      "esri/InfoTemplate", 
      "dojo/_base/Color", 
      "dojo/query",
      "dojo/on", 
      "dojo/dom", 
      "dojo/domReady!"], function(Map, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, Color, query, on, dom) {
        "use strict"
        var pointSymbol,lineSymbol,polygonSymbol;
        var multiPointGraphic,polylineGraphic,polygonGraphic, multiPoint;
        var pts, activeToolId;
        var colors=new Array("#577492","#F44336","#3F51B5","#009688","#4CAF50","#FFC107","#FF5722");
        var allInciden=true;
        //service url
        var baseUrl="http://voting.zor-komerc.mk/incidentsByType.php";
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
        on(map,"load", function(){
          getIncidentByType(baseUrl);
        });

       //Wire UI events
        on(dom.byId("siteIncidenti"),"change",function(){
          changeLayer(dom.byId("siteIncidenti").value);
       });
        on(dom.byId("ukradeniGlasackiLivcinja"),"change",function(){
          changeLayer(dom.byId("ukradeniGlasackiLivcinja").value);
       });
        on(dom.byId("zakana"),"change",function(){
          changeLayer(dom.byId("zakana").value);
       });
        on(dom.byId("semejnoGlasanje"),"change",function(){
          changeLayer(dom.byId("semejnoGlasanje").value);
       });
        on(dom.byId("javnoGlasanje"),"change",function(){
          changeLayer(dom.byId("javnoGlasanje").value);
       }); 
        on(dom.byId("bugarskiVoz"),"change",function(){
          changeLayer(dom.byId("bugarskiVoz").value);
       });
       on(dom.byId("glasanjeSoPartiskaOznaka"),"change",function(){
          changeLayer(dom.byId("glasanjeSoPartiskaOznaka").value);
       });
      
      function changeLayer(type) {
          allInciden=parseInt(type)==0;
          var url=baseUrl+"?irregularityTypeId="+type;
          clearAddGraphics();
          getIncidentByType(url);
       }

    function getIncidentByType(url) {
        $.getJSON(url, function() {
             console.log("success");
        }).done(function(data) {               
               addIncidentPlaces(data);               
        }).fail(function(error) {
             console.log("error getting voting places " + error );
        }); 
     }

     function addIncidentPlaces(data) {
        for(var i=0;i<data.length;i++) {
                var point = new esri.geometry.Point(parseFloat(data[i].longitude),parseFloat(data[i].latitude));
                var infoTooltip=new InfoTemplate(data[i].place,(allInciden==false?("Тип: "+data[i].description+"</br>"):" " )+"Вкупно: " + data[i].vkupno);
                var irregularityType=allInciden==true? 0 :data[i].irregularityTypeId;
                var count=data[i].vkupno*4;
                addPoint(point,infoTooltip,colors[irregularityType],count,true);                
             } 
     }
      
    function addPoint(pt, infoTooltip,color,pinRadius,finished) {
          var attributes = {"Lat":pt.getLatitude().toFixed(2),"Lon":pt.getLongitude().toFixed(2)};
          pointSymbol=createPointSymbol(color,pinRadius);
          var graphic = new Graphic(pt,pointSymbol,attributes,infoTooltip);
          map.graphics.add(graphic);
     }
       
        
      function createPointSymbol(color, pinRadius) {
          return new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, pinRadius,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color(color), 1),
            new Color(color)); 
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