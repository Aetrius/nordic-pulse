package main

import (
	"fmt"

	probing "github.com/prometheus-community/pro-bing"
)

func PingTarget(ipIn string) string {
	pinger, err := probing.NewPinger(ipIn)
	pinger.SetPrivileged(true)

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
	packetLoss := stats.PacketLoss

	info := fmt.Sprintf("Success: %.2f, Packets Lost: %s", packetsSuccess, packetLoss)
	return info
}
