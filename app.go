package main

import (
	"context"
	"fmt"
	"os"
	"sync"
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

// Runs an update check against the remote server
func (a *App) Update() UpdateStats {
	updateStats := UpdateCheck()

	return updateStats
}

// Gets the executable application path
func (a *App) ApplyUpdate() bool {
	fmt.Println("Application Path: " + GetPath(GetApplicationPath()))

	// Create a wait group to wait for the download to complete
	var wg sync.WaitGroup

	// Use a channel to signal the completion of the download
	downloadCompleted := make(chan struct{})

	// Increment the wait group counter
	wg.Add(1)

	// Start the download in a goroutine
	go func() {
		GetUpdater(GetPath(GetApplicationPath()))
		Download(UpdateCheck().RemoteUpdateURL, GetPath(GetApplicationPath()), GetPathFile(GetApplicationPath()))
		// Signal that the download is complete
		close(downloadCompleted)
		// Decrement the wait group counter
		wg.Done()
	}()

	// Wait for the download to complete or a timeout
	select {
	case <-downloadCompleted:
		// DEBUG text file
		//writeDebugInfo(GetPath(GetApplicationPath()) + "\\debug.txt")
		RelaunchApp(GetPath(GetApplicationPath())+"\\nordic-pulse-updater.exe", GetApplicationPath(), GetPath(GetApplicationPath())+"\\"+GetPathFile(UpdateCheck().RemoteUpdateURL))
	case <-a.ctx.Done():
		// Context canceled, return false or handle accordingly
		return false
	}

	// Wait for the download goroutine to finish
	wg.Wait()

	return true
}

// Trace returns a trace result for a string IP
func (a *App) Merp(ip string) string {
	return TraceRoute(ip)
}

// Write relaunch line variables to a text file
func writeDebugInfo(filePath string) {
	content := fmt.Sprintf("Updater Path: %s\nExisting File Path: %s\nNew File Path: %s",
		GetPath(GetApplicationPath())+"\\nordic-pulse-updater.exe",
		GetApplicationPath(),
		GetPath(GetApplicationPath())+"\\"+GetPathFile(UpdateCheck().RemoteUpdateURL))

	err := writeToFile(filePath, content)
	if err != nil {
		fmt.Println("Error writing debug info to file:", err)
	}
}

// Write content to a file
func writeToFile(filePath, content string) error {
	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = file.WriteString(content)
	if err != nil {
		return err
	}

	return nil
}
