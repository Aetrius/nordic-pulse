package main

import (
	"context"

	"runtime"
	"time"

	probing "github.com/prometheus-community/pro-bing"
)

const (
	maxRTT          = 30 * time.Millisecond
	microsecondUnit = 1000000
	timeoutDuration = 5 * time.Second // Set a timeout duration
)

func PingTarget(ipIn string) Result {

	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), timeoutDuration)
	defer cancel()

	ipIn = LookupIP((ipIn))

	pinger, err := probing.NewPinger(ipIn)
	if err != nil {
		errorResult := Result{
			PacketSuccess: 0.00 * 100,
			PacketLoss:    100,
			RTT:           30, // corrected scale to microseconds
			Timestamp:     getCurrentTime(),
		}

		return errorResult
	}

	pinger = getRuntime(pinger)
	result := Result{}

	pinger.Count = 3

	// Run the pinger within the context
	errChan := make(chan error, 1)
	go func() {
		errChan <- pinger.Run()
	}()

	select {
	case err := <-errChan:
		if err != nil {
			return handleErrorResult(err)
		}
	case <-ctx.Done():
		// Timeout occurred
		return handleTimeoutResult()
	}

	stats := pinger.Statistics() // get send/receive/duplicate/rtt stats

	result = Result{
		PacketSuccess: (float64(stats.PacketsRecv) / float64(stats.PacketsSent)) * 100,
		PacketLoss:    stats.PacketLoss,
		RTT:           stats.MaxRtt / 1000000, // corrected scale to microseconds
		Timestamp:     getCurrentTime(),
	}

	return result
}

// SetPrivileged sets the type of ping pinger will send.
// false means pinger will send an "unprivileged" UDP ping.
// true means pinger will send a "privileged" raw ICMP ping.
// NOTE: setting to true requires that it be run with super-user privileges.
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

func handleErrorResult(err error) Result {
	return Result{
		PacketSuccess: 0.00,
		PacketLoss:    100,
		RTT:           maxRTT / microsecondUnit,
		Timestamp:     getCurrentTime(),
	}
}

func handleTimeoutResult() Result {
	return Result{
		PacketSuccess: 0.00,
		PacketLoss:    100,
		RTT:           maxRTT / microsecondUnit,
		Timestamp:     getCurrentTime(),
	}
}
