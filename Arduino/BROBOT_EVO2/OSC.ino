// BROBOT EVO 2 by JJROBOTS
// SELF BALANCE ARDUINO ROBOT WITH STEPPER MOTORS
// License: GPL v2
// OSC functions  (OSC = Open Sound Control protocol)

// OSC Messages read:  OSC: /page/command parameters
//             FADER (1,2,3,4)  Ex: /1/fader1   f,  XXXX  => lenght:20, Param:  float (0.0-1.0)
//             XY (1,2)          Ex: /1/xy1  f,f,    XXXXXXXX => length: 24 Params: float,float (0.0-1.0)
//             PUSH (1,2,3,4)    Ex: /1/push1    f,  XXXX => length:20 Param: float
//             TOGGLE (1,2,3,4)  Ex: /1/toggle1  f,  XXXX => length:20 Param: float
//             MOVE              Ex: /1/m XXXX XXXX XXXX => length:16 Params: speed, steps1, steps2 (all float)
//
// OSC Message send:
//            string to send + param (float)[last 4 bytes]


// for DEBUG uncomment this lines...
//#define OSCDEBUG 0


char UDPBuffer[8]; // input message buffer

// OSC message internal variables
unsigned char OSCreadStatus;
unsigned char OSCreadCounter;
unsigned char OSCreadNumParams;
unsigned char OSCcommandType;
unsigned char OSCtouchMessage;


// ------- OSC functions -----------------------------------------

// Aux functions
float OSC_extractParamFloat(uint8_t pos) {
  union {
    unsigned char Buff[4];
    float d;
  } u;

  u.Buff[0] = (unsigned char)UDPBuffer[pos];
  u.Buff[1] = (unsigned char)UDPBuffer[pos + 1];
  u.Buff[2] = (unsigned char)UDPBuffer[pos + 2];
  u.Buff[3] = (unsigned char)UDPBuffer[pos + 3];
  return (u.d);
}

int16_t OSC_extractParamInt(uint8_t pos) {
  union {
    unsigned char Buff[2];
    int16_t d;
  } u;

  u.Buff[1] = (unsigned char)UDPBuffer[pos];
  u.Buff[0] = (unsigned char)UDPBuffer[pos + 1];
  return (u.d);
}


void OSC_init()
{
  OSCreadStatus = 0;
  OSCreadCounter = 0;
  OSCreadNumParams = 0;
  OSCcommandType = 0;
  OSCfader[0] = 0.5;
  OSCfader[1] = 0.5;
  OSCfader[2] = 0.5;
  OSCfader[3] = 0.5;
}

void OSC_MsgSend(char *c, unsigned char msgSize, float p)
{
  uint8_t i;
  union {
    unsigned char Buff[4];
    float d;
  } u;

  // We copy the param in the last 4 bytes
  u.d = p;
  c[msgSize - 4] = u.Buff[3];
  c[msgSize - 3] = u.Buff[2];
  c[msgSize - 2] = u.Buff[1];
  c[msgSize - 1] = u.Buff[0];
  for (i = 0; i < msgSize; i++)
  {
    Serial1.write((uint8_t)c[i]);
    //Serial.write((uint8_t)c[i]);
  }
}

void OSC_MsgRead()
{
  uint8_t i;
  uint8_t tmp;
  float value;
  float value2;

  // New bytes available to process?
  if (Serial1.available() > 0) {
    // We rotate the Buffer (we could implement a ring buffer in future)
    for (i = 7; i > 0; i--) {
      UDPBuffer[i] = UDPBuffer[i - 1];
    }
    UDPBuffer[0] = Serial1.read();
#ifdef OSCDEBUG3
    Serial.print(UDPBuffer[0]);
#endif
    // We look for an OSC message start like /x/
    if ((UDPBuffer[0] == '/') && (UDPBuffer[2] == '/') && ((UDPBuffer[1] == '1') || (UDPBuffer[1] == '2'))) {
      if (OSCreadStatus == 0) {
        OSCpage = UDPBuffer[1] - '0';  // Convert page to int
        OSCreadStatus = 1;
        OSCtouchMessage = 0;
        //Serial.print("$");
#ifdef OSCDEBUG3
        Serial.println();
#endif
      }
      else {
        Serial.println("!ERR:osc");
        OSCreadStatus = 1;
      }
      return;
    } else if (OSCreadStatus == 1) { // looking for the message type
      // Fadder    /1/fader1 ,f  xxxx
      if ((UDPBuffer[3] == 'd') && (UDPBuffer[2] == 'e') && (UDPBuffer[1] == 'r')) {
        OSCreadStatus = 2;  // Message type detected
        OSCreadCounter = 11; // Bytes to read the parameter
        OSCreadNumParams = 1; // 1 parameters
        OSCcommandType = UDPBuffer[0] - '0';
#ifdef OSCDEBUG2
        Serial.print("$FAD1");
        Serial.print(OSCcommandType);
        Serial.print("$");
#endif
        return;
      } // end fadder
      // MOVE message
      if ((UDPBuffer[3] == 'o') && (UDPBuffer[2] == 'v') && (UDPBuffer[1] == 'e')) {
        OSCreadStatus = 2;  // Message type detected
        OSCreadCounter = 8; // Bytes to read the parameters
        OSCreadNumParams = 3; // 3 parameters
        OSCcommandType = 40;
#ifdef OSCDEBUG2
        Serial.print("$MOVE:");
#endif
        return;
      }  // End MOVE message
      // XY message
      if ((UDPBuffer[2] == 'x') && (UDPBuffer[1] == 'y')) {
        OSCreadStatus = 2;  // Message type detected
        OSCreadCounter = 14; // Bytes to read the parameters
        OSCreadNumParams = 2; // 2 parameters
        OSCcommandType = 10 + (UDPBuffer[0] - '0');
        return;
      }  // End XY message
      // Push message
      if ((UDPBuffer[3] == 'u') && (UDPBuffer[2] == 's') && (UDPBuffer[1] == 'h')) {
        OSCreadStatus = 2;  // Message type detected
        OSCreadCounter = 10; // Bytes to read the parameter
        OSCreadNumParams = 1; // 1 parameters
        OSCcommandType = 20 + (UDPBuffer[0] - '1');
        //Serial.println(commandType);
#ifdef OSCDEBUG2
        Serial.print("$P"):
          Serial.print(UDPBuffer[0] - '1');
          Serial.print(":");
#endif
          return;
        } // end push
        // Toggle message
        if ((UDPBuffer[3] == 'g') && (UDPBuffer[2] == 'l') && (UDPBuffer[1] == 'e')) {
        OSCreadStatus = 2;  // Message type detected
        OSCreadCounter = 10; // Bytes to read the parameter
        OSCreadNumParams = 1; // 1 parameters
        OSCcommandType = 30 + (UDPBuffer[0] - '1');
        //Serial.println(commandType);
#ifdef OSCDEBUG2
        Serial.print("$T"):
          Serial.print(UDPBuffer[0] - '1');
          Serial.print(":");
#endif
          return;
        } // end toggle
      } else if (OSCreadStatus == 2) {
      if ((UDPBuffer[1] == '/') && (UDPBuffer[0] == 'z')) { // Touch up message? (/z) [only on page1]
        if ((OSCpage == 1) && (OSCcommandType <= 2)) { // Touchup message only on Fadder1 and Fadder2
          OSCtouchMessage = 1;
        }
        else {
          OSCtouchMessage = 0;
          OSCreadStatus = 0; //Finish
        }
      } // Touch message(/z)
      OSCreadCounter--;   // Reading counter until we reach the Parameter position
      if (OSCreadCounter <= 0) {
        OSCreadStatus = 0;
        OSCnewMessage = 1;
        //Serial.println(value);
        switch (OSCcommandType) {
          case 1:
            value = OSC_extractParamFloat(0);
            OSCfader[0] = value;
            if ((OSCtouchMessage) && (value == 0)) {
              OSCfader[0] = 0.5;
              //Serial.println("TOUCH_X");
              OSC_MsgSend("/1/fader1\0\0\0,f\0\0\0\0\0\0", 20, 0.5);
            }
#ifdef OSCDEBUG
            Serial.print("$F1:");
            Serial.println(OSCfader[0]);
#endif
            break;
          case 2:
            value = OSC_extractParamFloat(0);
            OSCfader[1] = value;
            if ((OSCtouchMessage) && (value == 0)) {
              OSCfader[1] = 0.5;
              //Serial.println("TOUCH_Y");
              OSC_MsgSend("/1/fader2\0\0\0,f\0\0\0\0\0\0", 20, 0.5);
            }
#ifdef OSCDEBUG
            Serial.print("$F2:");
            Serial.println(OSCfader[1]);
#endif
            break;
          case 3:
            OSCfader[2] = OSC_extractParamFloat(0);
#ifdef OSCDEBUG
            Serial.print("$F3:");
            Serial.println(OSCfader[2]);
#endif
            break;
          case 4:
            OSCfader[3] = OSC_extractParamFloat(0);
#ifdef OSCDEBUG
            Serial.print("$F4:");
            Serial.println(OSCfader[3]);
#endif
            break;
          case 11:
            OSCxy1_x = OSC_extractParamFloat(0);
            OSCxy1_y = OSC_extractParamFloat(4);
#ifdef OSCDEBUG
            Serial.print("$XY1:");
            Serial.print(OSCxy1_x);
            Serial.print(",");
            Serial.println(OSCxy1_y);
#endif
            break;
          case 12:
            OSCxy2_x = OSC_extractParamFloat(0);
            OSCxy2_y = OSC_extractParamFloat(4);
#ifdef OSCDEBUG
            Serial.print("$XY2:");
            Serial.print(OSCxy2_x);
            Serial.print(",");
            Serial.println(OSCxy2_y);
#endif
            break;
          case 40:
            // MOVE
            OSCmove_mode = 1;
            OSCmove_speed = OSC_extractParamInt(4);
            OSCmove_steps1 = OSC_extractParamInt(2);
            OSCmove_steps2 = OSC_extractParamInt(0);
#ifdef OSCDEBUG
            Serial.print("$MOVE:");
            Serial.print(OSCmove_speed);
            Serial.print(",");
            Serial.print(OSCmove_steps1);
            Serial.print(",");
            Serial.println(OSCmove_steps2);
#endif
            break;

          default:
            // Push y toggle
            value = OSC_extractParamFloat(0);
            if ((OSCcommandType >= 20) && (OSCcommandType < 25))
            {
              if (value == 0)
                OSCpush[OSCcommandType - 20] = 0;
              else
                OSCpush[OSCcommandType - 20] = 1;
            }
            if ((OSCcommandType >= 30) && (OSCcommandType < 35))
            {
              if (value == 0)
                OSCtoggle[OSCcommandType - 30] = 0;
              else
                OSCtoggle[OSCcommandType - 30] = 1;
            }
            break;
        } // switch
      }  // if (OSCRead_counter<=0)
    }  // if (OSCread_status==2)
  }  // end Serial.available()
}

