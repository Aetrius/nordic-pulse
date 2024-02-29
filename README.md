# README

## About Nordic Pulse
A simple network GUI monitor to track the ping health of a target endpoint. A visualization chart is kept running in the background
IPs/Hostnames are cached using a cookie for 365 days, it will persist through exe updates or moving exe locations.

![nordic-pulse](https://github.com/Aetrius/nordic-pulse/blob/main/pulse-1-03.png)

## Live Development

run `wails dev`

## Building

To build a redistributable, production mode package, use `wails build`.


### installed packages
- go get -u github.com/prometheus-community/pro-bing
- go get -u github.com/aeden/traceroute
- go get -u github.com/pixelbender/go-traceroute/traceroute
- npm i recharts
- npm install @mui/material @emotion/react @emotion/styled


## TODO 

- Create a SQLLITE DB for Caching records
- History table to visualize results
- Health Page
- Short Code for IP storage
- IPERF3 integration
- Traceroute fun
- Compile results on Server, Avg Response, Ping time, per historical request.


