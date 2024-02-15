package main

import (
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Ping returns a ping result for a string IP
func (a *App) Ping(ip string) Result {
	return PingTarget(ip)
}

// Trace returns a trace result for a string IP
func (a *App) Merp(ip string) string {
	return TraceRoute(ip)
}
