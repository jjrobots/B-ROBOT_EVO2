#!/usr/bin/python
# Blockly interface for BROBOT block programming

# Remember to connect your wifi to your robot network JJROBOTS_XX password:8764321

# author: JJROBOTS 2017
# version: 1.01 (10/03/2017)
# Licence: Open Source (GNU LGPLv3)

from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from os import curdir, sep
import urlparse
from BROBOT_Class import BROBOT
import time
import webbrowser
import threading
import socket

# BROBOT initialization
myRobot = BROBOT()
IP = myRobot.UDP_IP
PORT = myRobot.UDP_PORT

HTTP2UDP_PORT = 8008
PORT_NUMBER = 8080

# Telemetry port
UDP_PORT = 2223

# Global variables
global status
global angle
status = 0
angle = 0.0

# Class to launch servers on different threads
class ServerThread(threading.Thread):
    def __init__(self,port,handler):
        threading.Thread.__init__(self)
        self.port=port
        self.handler = handler

    def run(self):
        server = HTTPServer(('localhost', self.port), self.handler)
        server.serve_forever()
        

#Browser to handle HTTP to UDP conversion
class HTTP2UDP(BaseHTTPRequestHandler):
    # Override address_string to avoid using name lookup
    def address_string(self):
        host, port = self.client_address[:2]
        #return socket.getfqdn(host)
        return host
    def do_GET(self):
        #print("GET request")
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin","*")
        self.send_header("Content-type", "text/html")
        self.end_headers()
        params = self.path
        params = params.split('?')
        if (len(params)>1):
            params = urlparse.parse_qs(params[1])
            if 'IP' in params.keys():
                print "IP: "+params['IP'][0]
                myRobot.UDP_IP = params['IP'][0]
            if 'PORT' in params.keys():
                print "PORT: "+params['PORT'][0]
                myRobot.UDP_PORT = int(params['PORT'][0])
            if 'ST' in params.keys():
                #print params['ST'][0]
                myRobot.steering(int(params['ST'][0])/100.0)
            if 'TH' in params.keys():
                #print params['TH'][0]
                myRobot.throttle(int(params['TH'][0])/100.0)
            if 'MV' in params.keys():
                mvparams = params['MV'][0].split(",")
                #print mvparams[0]+" "+mvparams[1]+" "+mvparams[2]
                myRobot.move(int(mvparams[0]),int(mvparams[1]),int(mvparams[2]))
            if 'MO' in params.keys():
                #print params['MO'][0]
                myRobot.mode(int(params['MO'][0]))
            if 'SE' in params.keys():
                #print params['SE'][0]
                myRobot.servo(int(params['SE'][0]))
            if 'RS' in params.keys():
                self.wfile.write(status)
                return
            if 'RA' in params.keys():
                self.wfile.write(angle)
                return
        self.wfile.write('OK')
        return

    def log_request(self, code=None, size=None):
        pass   # Do nothing...
        #print('Request')



#This class will handles any incoming request from
#the browser 
class myHandler(BaseHTTPRequestHandler):
	
   #Handler for the GET requests
   def do_GET(self):
      if self.path=="/":
         self.path="brobot/index.html"

      try:
         #Check the file extension required and
         #set the right mime type

         sendReply = False
         binary = False
         if self.path.endswith(".html"):
            mimetype='text/html'
            sendReply = True
         if self.path.endswith(".jpg"):
            binary = True
            mimetype='image/jpg'
            sendReply = True
         if self.path.endswith(".png"):
            binary = True
            mimetype='image/png'
            sendReply = True
         if self.path.endswith(".cur"):
            binary = True
            mimetype='image/x-win-bitmap'
            sendReply = True
         if self.path.endswith(".wav"):
            binary = True
            mimetype='audio/wav'
            sendReply = True
         if self.path.endswith(".mp3"):
            binary = True
            mimetype='audio/mpeg'
            sendReply = True
         if self.path.endswith(".gif"):
            binary = True
            mimetype='image/gif'
            sendReply = True
         if self.path.endswith(".js"):
            mimetype='application/javascript'
            sendReply = True
         if self.path.endswith(".css"):
            mimetype='text/css'
            sendReply = True

         if sendReply == True:
            #Open the static file requested and send it
            if binary:
               f = open(curdir + sep + self.path,'rb')
            else:
               f = open(curdir + sep + self.path) 
            self.send_response(200)
            self.send_header('Content-type',mimetype)
            self.end_headers()
            self.wfile.write(f.read())
            f.close()
         return

      except IOError:
         self.send_error(404,'File Not Found: %s' % self.path)

try:
    #Create the HTTP to UDP server to send messages to robot
    ServerThread(HTTP2UDP_PORT,HTTP2UDP).start()
    #Create a web server and define the handler to manage the incoming requests
    ServerThread(PORT_NUMBER,myHandler).start()
    print "Started HTTP2UDP server on port ", HTTP2UDP_PORT
    print "Started httpserver on port " , PORT_NUMBER    
    print "Opening browser... wait a moment..."
    time.sleep(2)
    url = "http://localhost:8080/brobot/index.html"
    webbrowser.open(url,new=2)
    while 1:
        pass    

except KeyboardInterrupt:
   print '^C received, shutting down the web server'
   exit()
