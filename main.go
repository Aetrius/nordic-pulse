package main

import (
	"embed"

	"github.com/tidwall/gjson"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed wails.json
var wailsJSON string

var version string

func main() {
	// Create an instance of the app structure
	app := NewApp()

	version = gjson.Get(wailsJSON, "info.productVersion").String()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Nordic Pulse - Network Monitoring - v" + version,
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

func GetAppVersion() string {
	return version
}
