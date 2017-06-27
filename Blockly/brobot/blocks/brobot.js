/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview Colour blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.brobot');

goog.require('Blockly.Blocks');


Blockly.Blocks.colour.HUE = 60;

// SIMPLE BLOCKS
Blockly.Blocks['moveforward'] = {
  init: function() {
	 this.appendDummyInput()
        .appendField("MOVE")
		  .appendField(new Blockly.FieldImage("moveforward.png",11,16,"*"))       
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('MOVE Forward 40cm');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['movebackward'] = {
  init: function() {
	 this.appendDummyInput()
        .appendField("MOVE")
		  .appendField(new Blockly.FieldImage("movebackward.png",11,16,"*"))       
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('MOVE Backward 40cm');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['turnright'] = {
  init: function() {
	 this.appendDummyInput()
        .appendField("TURN")
		  .appendField(new Blockly.FieldImage("turnright.png",16,16,"*"))       
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('RIGHT turn 90º');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['turnleft'] = {
  init: function() {
	 this.appendDummyInput()
        .appendField("TURN")
		  .appendField(new Blockly.FieldImage("turnleft.png",16,16,"*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('LEFT turn 90º');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['turn180'] = {
  init: function() {
	 this.appendDummyInput()
        .appendField("TURN 180 deg")
		  .appendField(new Blockly.FieldImage("turnright180.png",16,16,"*"))
		  .appendField(new Blockly.FieldDropdown([["RIGHT", "0"], ["LEFT", "1"]]), "turn");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('Turn 180 degrees');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['spin360'] = {
  init: function() {
	 this.appendDummyInput()
        .appendField("SPIN 360 deg")
		  .appendField(new Blockly.FieldImage("spinright.png",16,16,"*"))
		  .appendField(new Blockly.FieldDropdown([["RIGHT", "0"], ["LEFT", "1"]]), "spin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('Spin 360 degrees');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['turn'] = {
  init: function() {
	 this.appendDummyInput()
        .appendField("TURN ")		  
		  .appendField(new Blockly.FieldDropdown([["RIGHT", "0"], ["LEFT", "1"]]), "turn");		  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('TURN');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['turndegrees'] = {
  init: function() {
	 //this.appendDummyInput()
    //    .appendField("TURN ")		  
	//	  .appendField(new Blockly.FieldDropdown([["RIGHT >", "0"], ["LEFT <", "1"]]), "turn")
	//	  .appendField(new Blockly.FieldNumber(45, -720, 720, 1), "DValue")
	//	  .appendField("degrees ");				  
	 this.appendValueInput("degrees")
        .appendField("TURN ")		  
		  .appendField(new Blockly.FieldDropdown([["RIGHT >", "0"], ["LEFT <", "1"]]), "turn")		  
		  //.appendField(new Blockly.FieldDropdown([["SHORT", "0"], ["MEDIUM", "1"], ["LONG", "2"]]), "distance");
		  //.appendField(new Blockly.FieldNumber(5000, 0, 25000, 1), "steps")  
		  .appendField("degrees:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('TURN');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['movesimple'] = {
  init: function() {
	 this.appendValueInput("cm")
        .appendField("MOVE ")		  
		  .appendField(new Blockly.FieldDropdown([["FORWARD", "0"], ["BACKWARD", "1"]]), "move")		  
		  //.appendField(new Blockly.FieldDropdown([["SHORT", "0"], ["MEDIUM", "1"], ["LONG", "2"]]), "distance");
		  //.appendField(new Blockly.FieldNumber(5000, 0, 25000, 1), "steps")  
		  .appendField("cm:");
	 //this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('TURN');
    this.setHelpUrl('');
  }
};

// ADVANCED BLOCKS
Blockly.Blocks['robotconfig'] = {
  init: function() {
    this.appendValueInput("IPvalue")
		  .setCheck("String")
		  .appendField("ROBOT Config IP:");
		  //.appendField(new Blockly.FieldTextInput("192.168.4.1"), "value1");
	 //this.appendValueInput("PORTvalue")
	 //    .setCheck("String")
	 // 	  .appendField("Port:");
		  //.appendField(new Blockly.FieldTextInput("2222"), "value2");
	 this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('Robot initialization');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['throttle'] = {
  init: function() {
    this.appendValueInput("TValue")
        .setCheck("Number")
		  .appendField("THROTTLE");
	 this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('Throttle from -100 to 100');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['steering'] = {
  init: function() {
    this.appendValueInput("SValue")
        .setCheck("Number")
        .appendField("STEERING");        
	 this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('Steering from -100 to 100');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['servo'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null)
        .appendField("SERVO")
        .appendField(new Blockly.FieldDropdown([["ON", "1"], ["OFF", "0"]]), "Servo");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('Arm Servo');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['mode'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null)
        .appendField("MODE")
        .appendField(new Blockly.FieldDropdown([["NORMAL", "0"], ["PRO", "1"]]), "Mode");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('BROBOT mode: Normal or PRO');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['delay'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null)
        .appendField("WAIT ")
		  .appendField(new Blockly.FieldNumber(0.5, 0.1, 5, 0.1), "DValue")        
		  .appendField("seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('Delay in seconds');
    this.setHelpUrl('');
  }
};



