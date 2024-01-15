package main

import (
	"github.com/prometheus-community/pro-bing"
	"fmt"
)

func Pinger() string {
	pinger, err := probing.NewPinger("www.google.com")
	if err != nil {
		return fmt.Sprintf("Error creating pinger: %s", err)
	}

	pinger.Count = 3
	err = pinger.Run() // Blocks until finished.

	if err != nil {
		return fmt.Sprintf("Error running pinger: %s", err)
	}

	stats := pinger.Statistics() // get send/receive/duplicate/rtt stats
	packetsSuccess := ((float64(stats.PacketsRecv) / float64(stats.PacketsSent)) * 100)

	info := fmt.Sprintf("Success: %.2f", packetsSuccess)
	return info
}

func pong() string {
	return Pinger()
}