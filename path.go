package main

import "path/filepath"

func GetPath(pathIn string) string {
	filePath := pathIn

	// Use filepath.Dir to get the directory containing the file
	directory := filepath.Dir(filePath)

	return directory
}

func GetPathFile(pathIn string) string {
	// Use filepath.Base to get the filename from the path
	fileName := filepath.Base(pathIn)

	return fileName
}
