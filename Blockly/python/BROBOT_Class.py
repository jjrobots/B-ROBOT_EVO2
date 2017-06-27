# BROBOT PYTHON CLASS
# Exampe 1: Simple commands
# Before running the script you need to connect the PC to the BROBOT wifi
# Remember, default password for Wifi network JJROBOTS_XX is 87654321

# author: JJROBOTS 2016
# version: 1.01 (27/10/2016)
# Licence: Open Source (GNU LGPLv3)

import socket
import time
import struct

# CLASS to control BROBOT
class BROBOT(object):
  UDP_IP = "192.168.4.1"     # Default BROBOT IP (with BROBOT JJROBOTS_XX wifi)
  UDP_PORT = 2222  # Default BROBOT port
  sock = 0
  def __init__(self):
    # Create default socket with UDP protocol
    self.sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)

  def sendCommand(self,OSCmessage,param):
    base = bytearray(OSCmessage)  # OSC message
    param = bytearray(struct.pack(">f",param))
    message = base+param
    self.sock.sendto(message,(self.UDP_IP,self.UDP_PORT))
    time.sleep(0.05)

  # Mode: 0 NORMAL MODE, 1 PRO MODE
  def mode(self,value=0.0):
    print "BROBOT Mode:",value
    if (value!=1): value = 0.0
    # Encapsulate the commands on OSC protocol UDP message and send...
    self.sendCommand(b'/1/toggle1/\x00\x00,f\x00\x00',value)
  
  # Throttle command. Values from [-1.0 to 1.0] positive: forward
  def throttle(self,value=0.0):
    print "BROBOT Throttle:",value
    value = (value+1.0)/2.0  # Adapt values to 0.0-1.0 range
    self.sendCommand(b'/1/fader1\x00\x00\x00,f\x00\x00',value)  #send OSC message

  # Steering command. Values from [-1.0 to 1.0] positive: turn right
  def steering(self,value=0.0):
    print "BROBOT Steering:",value
    value = (value+1.0)/2.0  # Adapt values to 0.0-1.0 range
    self.sendCommand(b'/1/fader2\x00\x00\x00,f\x00\x00',value)  #send OSC message

  # Servo command. Values 0 or 1 (activated)
  def servo(self,value=0.0):
    print "BROBOT Servo:",value
    if (value!=1):value=0.0
    self.sendCommand(b'/1/push1\x00\x00,f\x00\x00',value)  #send OSC message  

