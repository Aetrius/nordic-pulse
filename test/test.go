package main

import (
	"fmt"
	"time"

	"strings"

	"github.com/kanocz/tracelib"

	"regexp"
	"strconv"
	"strings"
)

func main() {
	cache := tracelib.NewLookupCache()

	rawHops, err := tracelib.RunMultiTrace("www.google.com", "0.0.0.0", "::", time.Second, 64, cache, 10, nil)
	//rawHops, err := tracelib.RunMultiTrace("8.8.8.8", "0.0.0.0", "::", time.Second, 64, cache, 10, nil)

	if nil != err {
		fmt.Println("Traceroute error:", err)
		return
	}

	hops := tracelib.AggregateMulti(rawHops)

	for i, hop := range hops {
		isd := fmt.Sprintf("%d. ", i+1)
		isp := strings.Repeat(" ", len(isd))

		for j, h := range hop {
			prefix := isd
			if j > 0 {
				prefix = isp
			}

			if nil != h.Addr {
				fmt.Printf("%s%v(%s)/AS%d %v/%v/%v (final:%v lost %d of %d, down %d of %d)\n", prefix, h.Host, h.Addr, h.AS, h.MinRTT, h.AvgRTT, h.MaxRTT, h.Final, h.Lost, h.Total, h.Down, h.Total)
			} else {
				fmt.Printf("%s Lost: %d\n", prefix, h.Lost)
			}

		}
	}
}

type Hop struct {
	Host      string
	Addr      string
	AS        int
	MinRTT    float64
	AvgRTT    float64
	MaxRTT    float64
	Final     bool
	Lost      int
	Total     int
	Down      int
}


func parseTracerouteOutput(input string) []Hop {
	var hops []Hop

	lines := strings.Split(input, "\n")
	currentHop := Hop{}

	for _, line := range lines {
		if strings.Contains(line, "Lost") {
			lostParts := strings.Split(line, ":")
			lostCount, _ := strconv.Atoi(strings.TrimSpace(lostParts[1]))
			currentHop.Lost = lostCount
			continue
		}

		parts := strings.Fields(line)
		if len(parts) < 11 {
			continue
		}

		host := parts[1]
		addr := ""
		asStr := ""
		asIndex := strings.LastIndex(parts[2], "/AS")
		if asIndex != -1 {
			addr = parts[2][:asIndex]
			asStr = parts[2][asIndex+3:]
		} else {
			addr = parts[2]
		}

		as, _ := strconv.Atoi(asStr)

		minRTT, _ := strconv.ParseFloat(parts[3][:len(parts[3])-2], 64)
		avgRTT, _ := strconv.ParseFloat(parts[4][:len(parts[4])-2], 64)
		maxRTT, _ := strconv.ParseFloat(parts[5][:len(parts[5])-2], 64)

		final := parts[8] == "final:true"

		lostParts := strings.Split(parts[10], "/")
		lost, _ := strconv.Atoi(lostParts[0])
		total, _ := strconv.Atoi(lostParts[2])
		down, _ := strconv.Atoi(lostParts[4])

		currentHop = Hop{
			Host:   host,
			Addr:   addr,
			AS:     as,
			MinRTT: minRTT,
			AvgRTT: avgRTT,
			MaxRTT: maxRTT,
			Final:  final,
			Lost:   lost,
			Total:  total,
			Down:   down,
		}

		hops = append(hops, currentHop)
	}

	return hops
}