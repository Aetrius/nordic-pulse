

## Dependencies
- Installation of Golang
- Installation of Wails https://wails.io/docs/gettingstarted/installation/
- Installation of NPM https://nodejs.org/en/download/

## Project Setup Locally

Clone the project

```bash
git clone https://link-to-project
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
To build a redistributable, production mode package, use `wails build`.

