package main

import (
	"fmt"
	"net"
	"regexp"
	"strings"
)

func LookupIP(ipIn string) string {
	//fmt.Println(ipIn)
	ip, _ := net.LookupIP(ipIn)
	return ipsToString((ip))
}

func ipsToString(ips []net.IP) string {
	var ipStrings []string

	for _, ip := range ips {
		ipStrings = append(ipStrings, ip.String())
	}

	return split(ipStrings)
}

func split(slice []string) string {
	// Keep only the first part
	firstIp := ""
	if len(slice) > 0 {

		firstIp = strings.TrimSpace(slice[0])
		//fmt.Println(firstIp)
	} else {
		fmt.Println("Invalid IPs returns to slice")
	}

	return extractIPAddress(firstIp)
}

func extractIPAddress(input string) string {
	// Define the regular expression for matching IP addresses
	ipRegex := regexp.MustCompile(`\b(?:\d{1,3}\.){3}\d{1,3}\b`)

	// Find the first match in the input string
	match := ipRegex.FindString(input)
	//fmt.Println(match)

	return match
}
