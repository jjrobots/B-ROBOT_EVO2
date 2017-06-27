// BROBOT EVO 2 by JJROBOTS
// SELF BALANCE ARDUINO ROBOT WITH STEPPER MOTORS
// License: GPL v2
// Network functions (ESP module)

// Read control PID parameters from user. This is only for advanced users that want to "play" with the controllers...
void readControlParameters()
{
  // Parameters Mode (page2 controls)
  // Parameter initialization (first time we enter page2)
  if (!modifing_control_parameters)
  {
    for (uint8_t i = 0; i < 4; i++)
      OSCfader[i] = 0.5;
    OSCtoggle[0] = 0;

    modifing_control_parameters = true;
    Serial1.println("$P2");
  }
  // User could adjust KP, KD, KP_THROTTLE and KI_THROTTLE (fadder1,2,3,4)
  // Now we need to adjust all the parameters all the times because we dont know what parameter has been moved
  Kp_user = KP * 2 * OSCfader[0];
  Kd_user = KD * 2 * OSCfader[1];
  Kp_thr_user = KP_THROTTLE * 2 * OSCfader[2];
  Ki_thr_user = KI_THROTTLE * 2 * OSCfader[3];
  // Send a special telemetry message with the new parameters
  char auxS[50];
  sprintf(auxS, "$tP,%d,%d,%d,%d", int(Kp_user * 1000), int(Kd_user * 1000), int(Kp_thr_user * 1000), int(Ki_thr_user * 1000));
  Serial1.println(auxS);

#if DEBUG>0
  Serial.print("Par: ");
  Serial.print(Kp_user);
  Serial.print(" ");
  Serial.print(Kd_user);
  Serial.print(" ");
  Serial.print(Kp_thr_user);
  Serial.print(" ");
  Serial.println(Ki_thr_user);
#endif

  // Calibration mode??
  if (OSCpush[2]==1)
  {
    Serial.print("Calibration MODE ");
    angle_offset = angle_adjusted_filtered;
    Serial.println(angle_offset);
  }

  // Kill robot => Sleep
  while (OSCtoggle[0] == 1)
  {
    //Reset external parameters
    PID_errorSum = 0;
    timer_old = millis();
    setMotorSpeedM1(0);
    setMotorSpeedM2(0);
    digitalWrite(4, HIGH);  // Disable motors
    OSC_MsgRead();
  }
}


int ESPwait(String stopstr, int timeout_secs)
{
  String response;
  bool found = false;
  char c;
  long timer_init;
  long timer;

  timer_init = millis();
  while (!found) {
    timer = millis();
    if (((timer - timer_init) / 1000) > timeout_secs) { // Timeout?
      Serial.println("!Timeout!");
      return 0;  // timeout
    }
    if (Serial1.available()) {
      c = Serial1.read();
      Serial.print(c);
      response += c;
      if (response.endsWith(stopstr)) {
        found = true;
        delay(10);
        Serial1.flush();
        Serial.println();
      }
    } // end Serial1_available()
  } // end while (!found)
  return 1;
}

// getMacAddress from ESP wifi module
int ESPgetMac()
{
  char c1, c2;
  bool timeout = false;
  long timer_init;
  long timer;
  uint8_t state = 0;
  uint8_t index = 0;

  MAC = "";
  timer_init = millis();
  while (!timeout) {
    timer = millis();
    if (((timer - timer_init) / 1000) > 5) // Timeout?
      timeout = true;
    if (Serial1.available()) {
      c2 = c1;
      c1 = Serial1.read();
      Serial.print(c1);
      switch (state) {
        case 0:
          if (c1 == ':')
            state = 1;
          break;
        case 1:
          if (c1 == '\r') {
            MAC.toUpperCase();
            state = 2;
          }
          else {
            if ((c1 != '"') && (c1 != ':'))
              MAC += c1;  // Uppercase
          }
          break;
        case 2:
          if ((c2 == 'O') && (c1 == 'K')) {
            Serial.println();
            Serial1.flush();
            return 1;  // Ok
          }
          break;
      } // end switch
    } // Serial_available
  } // while (!timeout)
  Serial.println("!Timeout!");
  Serial1.flush();
  return -1;  // timeout
}

int ESPsendCommand(char *command, String stopstr, int timeout_secs)
{
  Serial1.println(command);
  ESPwait(stopstr, timeout_secs);
  delay(250);
}



