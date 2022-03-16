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
    "url": "git+https://github.com/windycom/windy-plugins"
  },
  "description": "Shows coloured icons on the map relating to that airfield's Colour State. Also, when clicked gives ",
  "displayName": "Aerodrome Colour Code",
  "hook": "menu"
},
/* HTML */
'<b>This plugin will rock</b>',
/* CSS */
'',
/* Constructor */
function () {
  console.log('I am mounted to the page');

  this.onopen = function () {
    return console.log('I am opened');
  };

  this.onclose = function () {
    return console.log('I am being closed');
  };
});
