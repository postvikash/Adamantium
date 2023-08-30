###Launching the app without Apache2 and ProxyConfiguration would 
require routing request from port 80 to 8080

- Command to execute:
 * sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
