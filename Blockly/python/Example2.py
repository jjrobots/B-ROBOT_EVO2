# BROBOT PC CONTROL python script
# Exampe 2: Brobot Dance
# Before running the script you need to connect the PC to the BROBOT wifi
# Remember, default password for Wifi network JJROBOTS_XX is 87654321

# author: JJROBOTS 2016
# version: 1.01 (28/10/2016)
# Licence: Open Source (GNU LGPLv3)

import time
from BROBOT_Class import BROBOT # Import CLASS to control BROBOT

# BROBOT initialization
myRobot = BROBOT()
myRobot.mode(1)  # PRO MODE

for i in range(0,2):
    myRobot.servo(1)
    time.sleep(0.15)
    myRobot.servo(0)
    time.sleep(0.15)

for i in range(0,3):
    myRobot.steering(0.5+i*0.1)
    time.sleep(0.25)
    myRobot.steering(0)
    myRobot.steering(-0.5-i*0.1)
    time.sleep(0.25)
    myRobot.steering(0)
    myRobot.steering(-0.5-i*0.1)
    time.sleep(0.25)
    myRobot.steering(0)
    myRobot.steering(0.5+i*0.1)
    time.sleep(0.25)
    myRobot.steering(0)
    myRobot.servo(1)
    myRobot.servo(0)
    

for i in range(0,5):
    myRobot.throttle(0.3)
    time.sleep(0.08)
    myRobot.throttle(0)
    time.sleep(0.08)
    myRobot.throttle(-0.3)
    time.sleep(0.08)
    myRobot.throttle(0)
    myRobot.servo(1)
    myRobot.servo(0)

myRobot.steering(1)
time.sleep(1)
myRobot.steering(0)
time.sleep(0.1)
myRobot.steering(-1)
time.sleep(1)
myRobot.steering(0)



    
    
    



