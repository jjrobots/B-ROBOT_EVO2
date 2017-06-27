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

goog.provide('Blockly.Python.brobot');

goog.require('Blockly.Python');

Blockly.Python['robotconfig'] = function(block) {
  var IPvalue = Blockly.JavaScript.valueToCode(block, 'IPvalue', Blockly.JavaScript.ORDER_ATOMIC).replace(/'/g, "");
  var PORTvalue = Blockly.JavaScript.valueToCode(block, 'PORTvalue', Blockly.JavaScript.ORDER_ATOMIC).replace(/'/g, "");
  var code = 'myRobot.UDP_IP=\"'+IPvalue+'\"\n';
  code += 'myRobot.UDP_PORT=\"'+PORTvalue+'\"\n';    
  //var code = '';
  return code;
};

Blockly.Python['throttle'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'TValue', Blockly.JavaScript.ORDER_ATOMIC);//
  //var value = block.getFieldValue('TValue');
  // TODO: Assemble JavaScript into code variable.
  //var code = 'window.alert("T'+value+'");\n';
  // Create the Socket
  var code = 'myRobot.throttle('+value+')\n';
  return code;
};

Blockly.Python['steering'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'SValue', Blockly.JavaScript.ORDER_ATOMIC);//
  //var value = block.getFieldValue('SValue');
  // TODO: Assemble JavaScript into code variable.
  var code = 'myRobot.steering('+value+')\n';
  return code;
};

Blockly.Python['servo'] = function(block) {
  //var value = Blockly.JavaScript.valueToCode(block, 'SValue', Blockly.JavaScript.ORDER_ATOMIC);//
  var value = block.getFieldValue('Servo');
  // TODO: Assemble JavaScript into code variable.
  var code = 'myRobot.servo('+value+')\n';
  return code;
};

Blockly.Python['mode'] = function(block) {
  //var value = Blockly.JavaScript.valueToCode(block, 'SValue', Blockly.JavaScript.ORDER_ATOMIC);//
  var value = block.getFieldValue('Mode');
  // TODO: Assemble JavaScript into code variable.
  var code = 'myRobot.mode('+value+')\n';
  return code;
};

Blockly.Python['delay'] = function(block) {
  //var value = Blockly.JavaScript.valueToCode(block, 'SValue', Blockly.JavaScript.ORDER_ATOMIC);//
  var value = block.getFieldValue('DValue');
  // TODO: Assemble JavaScript into code variable.
  //var code = 'window.alert(delay'+value+');\n';
  var code = 'time.sleep('+value+')\n';
  return code;
};


