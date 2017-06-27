# BROBOT PC CONTROL python script
# Exampe 4: Controlling 2 BROBOTS in a coreography...
# You should modify your BROBOT arduino code to connecto to your wifi network
# BROBOT1 is on IP 192.168.1.101 and BROBOT 2 IP is 192.168.1.102

# author: JJROBOTS 2016
# version: 1.01 (28/10/2016)
# Licence: Open Source (GNU LGPLv3)

import time
from BROBOT_Class import BROBOT # Import CLASS to control BROBOT

# BROBOT1 initialization
myRobot1 = BROBOT()
myRobot1.UDP_IP = "192.168.1.101"
myRobot1.mode(0)  # Normal mode. optional: PRO MODE=1

# BROBOT1 initialization
myRobot2 = BROBOT()
myRobot2.UDP_IP = "192.168.1.102"
myRobot2.mode(0)  # Normal mode. optional: PRO MODE=1


# Example of sequence of commands to BROBOT:
myRobot1.servo(1)       #Move servo
myRobot2.servo(1)
time.sleep(0.25)
myRobot1.servo(0)
myRobot2.servo(0)
time.sleep(0.25)
myRobot1.servo(1)       #Move servo
myRobot2.servo(1)
time.sleep(0.25)
myRobot1.servo(0)
myRobot2.servo(0)

myRobot1.throttle(0.4)
myRobot2.throttle(0.4)
time.sleep(0.75)
myRobot1.throttle(0)
myRobot2.throttle(0)
time.sleep(1)
myRobot1.steering(0.8)   # Robot1 Turn right
myRobot2.steering(-0.8)  # Robot2 Turn left
time.sleep(2)
myRobot1.steering(0)
myRobot2.steering(0)
time.sleep(0.25)
myRobot1.steering(-0.8)  # Robot1 Turn left
myRobot2.steering(0.8)   # Robot2 Turn right
time.sleep(2)
myRobot1.steering(0)     #Stop
myRobot2.steering(0)
myRobot1.throttle(0)
myRobot2.throttle(0)



