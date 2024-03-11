package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

func UpdateCheck() UpdateStats {
	fmt.Println("Checking for updates...")
	updateStats := GetServerUpdateVersion()
	if updateStats.ErrorResult != nil {
		fmt.Println(updateStats.ErrorResult)
	}

	return updateStats
}

// nordic pulse server - app version
type ServerUpdateVersion struct {
	Version string `json:"version"`
	URL     string `json:"url"`
}

// updateStats
type UpdateStats struct {
	UpdateAvailable bool   `json:"updateAvailable"`
	LocalVersion    string `json:"localVersion"`
	ServerVersion   string `json:"serverVersion"`
	RemoteUpdateURL string `json:"remoteUpdateURL"`
	ErrorResult     error  `json:"errorResult"`
}

func CheckCurrentVersion() {

	fmt.Println(GetAppVersion())
}

func GetServerUpdateVersion() UpdateStats {
	// Define the URL of the remote endpoint
	remoteURL := "https://nordic-pulse.s3.amazonaws.com/latest.txt"

	updateStats := UpdateStats{
		UpdateAvailable: false,
		LocalVersion:    "null",
		ServerVersion:   "null",
		RemoteUpdateURL: "null",
		ErrorResult:     nil,
	}
	res, err := http.Get(remoteURL)
	if err != nil {
		fmt.Println(err)
		updateStats.ErrorResult = err
		return updateStats
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)

	if err != nil {
		fmt.Println(err)
		updateStats.ErrorResult = err
		return updateStats
	}

	serverVersion := ServerUpdateVersion{}

	json.Unmarshal(body, &serverVersion)

	//updateStats.UpdateAvailable
	updateStats.ServerVersion = serverVersion.Version
	updateStats.RemoteUpdateURL = serverVersion.URL
	updateStats.LocalVersion = GetAppVersion()

	// Checks if the server version differs from your local version, add a check for handling newer local vs server
	if updateStats.ServerVersion != updateStats.LocalVersion {
		updateStats.UpdateAvailable = true
	}

	return updateStats

}

func GetUpdater(pathIn string) {
	// URL of the binary file
	url := "https://nordic-pulse.s3.amazonaws.com/nordic-pulse-updater.exe"

	// Path to save the downloaded binary file
	savePath := filepath.Join(pathIn, "nordic-pulse-updater.exe")

	// Download the binary file
	err := DownloadUpdater(url, savePath)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Download completed successfully.")
}

func DownloadUpdater(url, savePath string) error {
	// Create the file to save the downloaded content
	out, err := os.Create(savePath)
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

	return nil
}
