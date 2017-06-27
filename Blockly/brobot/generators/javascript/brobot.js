/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.brobot');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['moveforward'] = function(block) {
  var code = "var datavalue='MV=50,'+(Math.round(STEPSMETER*0.4))+','+(Math.round(STEPSMETER*0.4));\n";
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  code += 'var dt = new Date();while ((new Date()) - dt <= 3700) {};\n';  // delay
  return code;
};

Blockly.JavaScript['movebackward'] = function(block) {
  var code = "var datavalue='MV=50,'+(-Math.round(STEPSMETER*0.4))+','+(-Math.round(STEPSMETER*0.4));\n";
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  code += 'var dt = new Date();while ((new Date()) - dt <= 3700) {};\n';  // delay
  return code;
};

Blockly.JavaScript['turnleft'] = function(block) {
  var code = "var datavalue='MV=50,'+(-Math.round(STEPSTURN/4))+','+(Math.round(STEPSTURN/4));\n";
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  code += 'var dt = new Date();while ((new Date()) - dt <= 2200) {};\n';  // delay
  return code;
};

Blockly.JavaScript['turnright'] = function(block) {
  var code = "var datavalue='MV=50,'+(Math.round(STEPSTURN/4))+','+(-Math.round(STEPSTURN/4));\n";
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  code += 'var dt = new Date();while ((new Date()) - dt <= 2200) {};\n';  // delay
  return code;
};

Blockly.JavaScript['turn180'] = function(block) {
  var value = block.getFieldValue('turn');
  var code;
  if (value==1)
	code = "var datavalue='MV=50,'+(-Math.round(STEPSTURN/2))+','+(Math.round(STEPSTURN/2));\n";
  else
	code = "var datavalue='MV=50,'+(Math.round(STEPSTURN/2))+','+(-Math.round(STEPSTURN/2));\n";  
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  code += 'var dt = new Date();while ((new Date()) - dt <= 3600) {};\n';  // delay
  return code;
};

Blockly.JavaScript['spin360'] = function(block) {
  var value = block.getFieldValue('spin');
  var code;
  if (value==1)
	code = "var datavalue='MV=50,'+(-Math.round(STEPSTURN))+','+(Math.round(STEPSTURN));\n";
  else
	code = "var datavalue='MV=50,'+(Math.round(STEPSTURN))+','+(-Math.round(STEPSTURN));\n";  
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  code += 'var dt = new Date();while ((new Date()) - dt <= 5400) {};\n';  // delay
  return code;
};

Blockly.JavaScript['movesimple'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'cm', Blockly.JavaScript.ORDER_ATOMIC);
  var value2 = block.getFieldValue('move');
  var code;
  if (value2 == 0)
	  code = "var datavalue='MV=50,"+(Math.round(value*STEPSMETER/100))+","+(Math.round(value*STEPSMETER/100))+"';\n";
  else
     code = "var datavalue='MV=50,"+(-Math.round(value*STEPSMETER/100))+","+(-Math.round(value*STEPSMETER/100))+"';\n";
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  var delay = 51*Math.abs(value) + 1200;
  code += 'var dt = new Date();while ((new Date()) - dt <= '+delay+') {};\n';  // delay
  return code;
};

Blockly.JavaScript['turndegrees'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'degrees', Blockly.JavaScript.ORDER_ATOMIC);
  var value2 = block.getFieldValue('turn');
  var code;
  if (value2 == 1)
	  code = "var datavalue='MV=50,"+(-Math.round(value*STEPSTURN/360))+","+(Math.round(value*STEPSTURN/360))+"';\n";
  else
     code = "var datavalue='MV=50,"+(Math.round(value*STEPSTURN/360))+","+(-Math.round(value*STEPSTURN/360))+"';\n";
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  var delay = 16*Math.abs(value)+700;
  code += 'var dt = new Date();while ((new Date()) - dt <= '+delay+') {};\n';  // delay
  return code;
};

Blockly.JavaScript['robotconfig'] = function(block) {
  var IPvalue = Blockly.JavaScript.valueToCode(block, 'IPvalue', Blockly.JavaScript.ORDER_ATOMIC).replace(/'/g, "");
  //var PORTvalue = Blockly.JavaScript.valueToCode(block, 'PORTvalue', Blockly.JavaScript.ORDER_ATOMIC).replace(/'/g, "");
  var PORTvalue = "2222"
  var code = '//Robot Initialization\n\n';
  code += "$.ajax({url:'http://127.0.0.1:8008', data:\"IP="+ IPvalue+"&PORT="+PORTvalue+"\"});\n";
  return code;
}

Blockly.JavaScript['throttle'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'TValue', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "var datavalue='TH='+"+value+";\n";
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  return code;
};

Blockly.JavaScript['steering'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'SValue', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "var datavalue='ST='+"+value+";\n";
  code += "$.ajax({url:'http://127.0.0.1:8008', data: datavalue});\n";
  return code;
};

Blockly.JavaScript['servo'] = function(block) {
  //var value = Blockly.JavaScript.valueToCode(block, 'SValue', Blockly.JavaScript.ORDER_ATOMIC);//
  var value = block.getFieldValue('Servo');
  // TODO: Assemble JavaScript into code variable.
  var code = "$.ajax({url:'http://127.0.0.1:8008', data:'SE="+ value+"'});\n";
  return code;
};

Blockly.JavaScript['mode'] = function(block) {
  //var value = Blockly.JavaScript.valueToCode(block, 'SValue', Blockly.JavaScript.ORDER_ATOMIC);//
  var value = block.getFieldValue('Mode');
  // TODO: Assemble JavaScript into code variable.
  var code = "$.ajax({url:'http://127.0.0.1:8008', data:'MO="+ value+"'});\n";
  return code;
};

Blockly.JavaScript['delay'] = function(block) {
  //var value = Blockly.JavaScript.valueToCode(block, 'SValue', Blockly.JavaScript.ORDER_ATOMIC);//
  var value = block.getFieldValue('DValue')*1000;
  // TODO: Assemble JavaScript into code variable.
  //var code = 'window.alert(delay'+value+');\n';
  var end = 0;
  var code = 'var dt = new Date();while ((new Date()) - dt <= '+value+') {};\n';
  return code;
};


