package main

import (
	"fmt"
	"os"
	"os/exec"
	"runtime"
)

func RelaunchApp(updaterPath, existingFilePath, newFilePath string) {
	// Set an environment variable to signal the updater process
	os.Setenv("UPDATER_SIGNAL", "1")

	// Launch the updater software with the required parameters
	cmd := exec.Command(updaterPath, existingFilePath, newFilePath)

	// Set the new process's stdout and stderr to the current process's stdout and stderr
	// cmd.Stdout = os.Stdout
	// cmd.Stderr = os.Stderr

	// Start the new process
	if err := cmd.Start(); err != nil {
		fmt.Println("Error starting the updater process:", err)
		return
	}

	// // Close the current application before launching the updater
	// if err := closeCurrentProcess(); err != nil {
	// 	fmt.Println("Error closing the current application:", err)
	// 	return
	// }

	// Exit the current process
	os.Exit(0)
}

// closeCurrentProcess function
func closeCurrentProcess() error {
	switch runtime.GOOS {
	case "windows":
		// On Windows, create a new process to send the interrupt signal
		cmd := exec.Command("taskkill", "/F", "/T", "/PID", fmt.Sprintf("%d", os.Getpid()))
		return cmd.Run()
	default:
		// For other platforms, closing the process may not be as straightforward
		return fmt.Errorf("closing the process is not supported on this platform")
	}
}
