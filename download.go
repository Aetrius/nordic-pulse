package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

// Target path in to download from, the destination folder to download to, and the file name to rename to
func Download(downloadURL string, destOut string, renameFile string) {
	url := downloadURL
	destFolder := destOut

	err := downloadFile(url, destFolder, renameFile)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Download completed successfully.")
	}
}

func downloadFile(url, destFolder, renameFile string) error {
	// Create the destination folder if it doesn't exist
	if err := os.MkdirAll(destFolder, 0755); err != nil {
		return err
	}

	// Get the file name from the URL
	fileName := filepath.Base(url)

	// Create the file to save the downloaded content
	filePath := filepath.Join(destFolder, fileName)
	out, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer out.Close()

	// Perform the HTTP request
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Check if the request was successful (status code 200)
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	// Copy the response body to the file
	_, err = io.Copy(out, resp.Body)
	if err != nil {
		return err
	}

	// Rename the file to the desired name
	newFilePath := filepath.Join(destFolder, renameFile)
	if err := os.Rename(filePath, newFilePath); err != nil {
		return err
	}

	return nil
}
