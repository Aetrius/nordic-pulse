package main

import (
	"time"

	probing "github.com/prometheus-community/pro-bing"
)

func PingTarget(ipIn string) Result {
	pinger, err := probing.NewPinger(ipIn)
	pinger.SetPrivileged(true)
	result := Result{}

	if err != nil {
		return result
	}

	pinger.Count = 3
	err = pinger.Run() // Blocks until finished.

	if err != nil {
		return result
	}

	stats := pinger.Statistics() // get send/receive/duplicate/rtt stats

	result = Result{
		PacketSuccess: ((float64(stats.PacketsRecv) / float64(stats.PacketsSent)) * 100),
		PacketLoss:    stats.PacketLoss,
		RTT:           stats.MaxRtt / 100000,
		Timestamp:     getCurrentTime(),
	}

	//info := fmt.Sprintf("Success: %.2f, Packets Lost: %s", packetsSuccess, packetLoss)
	return result
}

func getCurrentTime() string {
	currentTime := time.Now()
	timestamp := currentTime.Format("2006-01-02 15:04:05")
	return timestamp
}

type Result struct {
	PacketSuccess float64       `json:"packetSuccess"`
	PacketLoss    float64       `json:"packetLoss"`
	RTT           time.Duration `json:"rtt"`
	Timestamp     string        `json:"timestamp"`
}
