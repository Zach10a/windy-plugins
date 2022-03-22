"use strict";

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-aerodromecolourcode",
  "version": "0.1.0",
  "author": "Zach Tait",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Zach10a/windy-plugins"
  },
  "description": "Shows coloured icons on the map relating to that airfield's Colour State. Also, when clicked gives the METAR and TAF of said aerodrome with the text correctly coloured",
  "displayName": "Aerodrome Colour Code",
  "hook": "menu"
},
/* HTML */
'',
/* CSS */
'',
/* Constructor */
function () {
  var _W$require = W.require('map'),
      map = _W$require.map;

  var xhttp = new XMLHttpRequest();
  console.log("I am being mounted");
  var popup = null;
  var markerLayer = null;

  this.onopen = function () {
    console.log("I am being opened");
    var center = map.getCenter();
    var iconColours = {
      "BLU": "rgb(0, 0, 255)",
      "WHT": "rgb(255, 255, 255)",
      "GRE": "rgb(0, 128, 0)",
      "YLO1": "rgb(255, 255, 0)",
      "YLO2": "rgb(255, 255, 0)",
      "AMB": "rgb(255, 140, 0)",
      "RED": "rgb(255, 0, 0)",
      "BLK": "rgb(0, 0, 0)"
    };
    var icons = {};

    function createIcons() {
      for (var key in iconColours) {
        var iconColour = iconColours[key];
        var AirfieldString = "<svg width=\"20\" height=\"20\">\n                        <rect width=\"20\" height=\"20\" style=\"fill:".concat(iconColour, ";stroke-width:3;stroke:rgb(0,0,0)\" />\n                        </svg>");
        var AirfieldIcon = void 0;
        AirfieldIcon = L.divIcon({
          html: "".concat(AirfieldString),
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
        icons["".concat(key)] = AirfieldIcon;
      }

      return icons;
    }

    var AirfieldIcons = createIcons();
    console.log(AirfieldIcons);
    var icao_list = ["EGDM", "EGYE", "EGUB", "EGVN", "EGXC", "EGWC", "EGYD", "EGXE", "EGQS", "EGYM", "EGWU", "EGVO", "EGXP", "EGOS", "EGSY", "EGOV", "EGXW", "WOTG", "EGXT", "EGOW"];
    var icao_list_string = "";

    for (var i = 0; i < icao_list.length - 1; i++) {
      if (i < icao_list.length) {
        icao_list_string += icao_list[i] + ",";
      } else {
        icao_list_string += icao_list[i];
      }
    }

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var _METAR_data = JSON.parse(xhttp.responseText);

        console.log(icao_list_string);
        return _METAR_data;
      }
    };

    var web_string = "https://api.checkwx.com/metar/".concat(icao_list_string, "/decoded");
    xhttp.open("GET", web_string, true);
    xhttp.setRequestHeader("X-API-Key", "6b8ce0d9f2ee488a8e5f91ce58");
    xhttp.send();
    var METAR_data = xhttp.responseText;

    if (popup) {
      popup.setLatLng(center);
    } else {
      console.log(AirfieldIcons["GRE"]);
      L.marker(center, {
        icon: AirfieldIcons["GRE"]
      }).addTo(map).bindPopup("`${METAR_data['data'][0][0]}`").openPopup();
    }
  };

  this.onclose = function () {
    console.log("I am being closed");

    if (popup) {
      map.removeLayer(popup);
      popup = null;
    }
  };
});