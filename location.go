package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func GetApplicationPath() string {
	exePath, err := os.Executable()
	if err != nil {
		fmt.Println("Error getting executable path:", err)
		return ""
	}

	// Convert to absolute path
	exePath, err = filepath.Abs(exePath)
	if err != nil {
		fmt.Println("Error converting to absolute path:", err)
		return ""
	}

	return exePath
}
