package main

import (
	//"fmt"
	"time"
	"runtime"
	probing "github.com/prometheus-community/pro-bing"
)

func PingTarget(ipIn string) Result {
	pinger, err := probing.NewPinger(ipIn)
	if err != nil {
		// handle error
		//fmt.Println(err)
		return Result{}
	}

	pinger = getRuntime(pinger)
	result := Result{}

	pinger.Count = 3
	err = pinger.Run() // Blocks until finished.

	if err != nil {
		// handle error
		//fmt.Println(err)
		return Result{}
	}

	stats := pinger.Statistics() // get send/receive/duplicate/rtt stats

	result = Result{
		PacketSuccess: (float64(stats.PacketsRecv) / float64(stats.PacketsSent)) * 100,
		PacketLoss:    stats.PacketLoss,
		RTT:           stats.MaxRtt / 1000000, // corrected scale to microseconds
		Timestamp:     getCurrentTime(),
	}

	//fmt.Println(result)
	return result
}

func getRuntime(pingerIn *probing.Pinger) *probing.Pinger {
	switch runtime.GOOS {
	case "darwin":
		pingerIn.SetPrivileged(false)
	case "windows":
		pingerIn.SetPrivileged(true)
	default:
		// for other OS, no specific privileges set
	}

	return pingerIn
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
