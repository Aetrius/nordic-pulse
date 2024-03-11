package main

import (
	"fmt"
	"os"
	"os/exec"
	"time"
)

func main() {
	// Check if the correct number of arguments is provided
	if len(os.Args) != 3 {
		fmt.Println("Usage: replace_binary <existing_file_path> <new_file_path>")
		os.Exit(1)
	}

	existingFilePath := os.Args[1]
	newFilePath := os.Args[2]

	// Wait for 6 seconds
	waitForSeconds(6)

	// Replace the existing file with the new file
	err := replaceFile(existingFilePath, newFilePath)
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}

	fmt.Println("File replacement completed successfully.")

	cmd := exec.Command(existingFilePath)

	// Start the new process
	if err := cmd.Start(); err != nil {
		fmt.Println("Error starting the main application process:", err)
		return
	}

	// Inform the main app that it can exit gracefully
	os.Exit(0)
}

func waitForSeconds(seconds int) {
	time.Sleep(time.Duration(seconds) * time.Second)
}

func replaceFile(existingFilePath, newFilePath string) error {
	// Wait for the existing file to be unlocked
	// err := waitForFileUnlock(existingFilePath)
	// if err != nil {
	// 	return err
	// }

	// Delete the existing file
	err := os.Remove(existingFilePath)
	if err != nil {
		return err
	}

	waitForSeconds(2)

	// Rename the new file to the existing file name
	err = os.Rename(newFilePath, existingFilePath)
	if err != nil {
		return err
	}

	return nil
}
