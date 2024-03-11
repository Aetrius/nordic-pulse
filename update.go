package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func UpdateCheck() (string, string) {
	fmt.Println("Checking for updates...")
	url, version, err := GetServerUpdateVersion()
	if err != nil {
		fmt.Println(err)
	}

	return url, version
}

// nordic pulse server - app version
type ServerUpdateVersion struct {
	Version string `json:"version"`
	URL     string `json:"url"`
}

func CheckCurrentVersion() {

	fmt.Println(GetAppVersion())
}

func GetServerUpdateVersion() (string, string, error) {
	// Define the URL of the remote endpoint
	remoteURL := "https://nordic-pulse.s3.amazonaws.com/latest.txt"

	res, err := http.Get(remoteURL)
	if err != nil {
		fmt.Println(err)
		return "0", "0", err
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)

	if err != nil {
		fmt.Println(err)
		return "0", "0", err
	}

	serverVersion := ServerUpdateVersion{}

	json.Unmarshal(body, &serverVersion)

	// fmt.Println(serverVersion.URL)
	// fmt.Println(serverVersion.Version)
	return serverVersion.URL, serverVersion.Version, nil

}
