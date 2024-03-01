# Nordic Pulse - Network Monitoring GUI

## About Nordic Pulse
A simple network GUI monitor to track the ping health of a target endpoint. A visualization chart is kept running in the background.

![nordic-pulse](https://github.com/Aetrius/nordic-pulse/blob/main/pulse-1-03.png)

## Features

- ICMP / Pings on Windows/Mac/Linux
- Visualization through recharts up to 10000 datapoints.
- Dashboard at a glance view.


## Dependencies
- Installation of Golang
- Installation of Wails https://wails.io/docs/gettingstarted/installation/
- Installation of NPM https://nodejs.org/en/download/

## Project Setup Locally

Clone the project

```bash
git clone https://github.com/Aetrius/nordic-pulse.git
```

Go to the project directory

```bash
cd nordic-pulse
```

Install dependencies

```bash
go get -u github.com/prometheus-community/pro-bing
npm i recharts
npm install @mui/material @emotion/react @emotion/styled
```

## Starting Dev Build
Run through Project Setup Locally then run this command.
```bash
wails dev
```

## Building
Run through Project Setup Locally then this.
To build a redistributable, production mode package, use `wails build`. This will produce an exe in the bin folder of the project structure for Windows or executables for Mac/Linux.


## Roadmap

- Actively Compiled results on Server, Avg Response, Ping time, per historical request.
- Clearing Cache Option
- Create a SQLLITE DB for Caching records + historial dataset
- History table to visualize results
- Health Page
- Multiple IPs/Host Support
- Traceroute discovery of IPs + scans
- Short Code for IP storage
- IPERF3 integration
- Traceroute Support
- Cross platform / CICD Pipelines
- Grafana Pushgateway Support to target endpoint
- Console view + configuration
## License

[MIT](https://choosealicense.com/licenses/mit/)




## Authors

- [@Aetrius](https://www.github.com/aetrius)


## Acknowledgements

 - [AETRIUS SOFTWARE ENGINEERING LLC](Aetrius.dev)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.
