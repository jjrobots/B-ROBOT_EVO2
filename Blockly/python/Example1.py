# BROBOT PC CONTROL python script
# Exampe 1: Simple commands
# Before running the script you need to connect the PC to the BROBOT wifi
# Remember, default password for Wifi network JJROBOTS_XX is 87654321

# author: JJROBOTS 2016
# version: 1.01 (28/10/2016)
# Licence: Open Source (GNU LGPLv3)

import time
from BROBOT_Class import BROBOT # Import CLASS to control BROBOT

# BROBOT initialization
myRobot = BROBOT()
myRobot.mode(0)  # Normal mode. optional: PRO MODE=1

# Example of sequence of commands to BROBOT:
myRobot.servo(1)       #Move servo
time.sleep(0.25)
myRobot.servo(0)
time.sleep(0.25)
myRobot.servo(1)       #Move servo
time.sleep(0.25)
myRobot.servo(0)

myRobot.throttle(0.6)   #Move forward
time.sleep(1.2)
myRobot.throttle(0)     #Stop
time.sleep(2)
myRobot.steering(0.8)   #Turn right
time.sleep(2)
myRobot.steering(0)
time.sleep(0.25)
myRobot.steering(-0.8)  #Turn left
time.sleep(2)
myRobot.steering(0)     #Stop
myRobot.throttle(0)     


