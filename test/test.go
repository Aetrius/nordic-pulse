package main

import (
	"fmt"
	"time"
	"strings"
	"github.com/kanocz/tracelib"
	//"strconv"
)

func main() {
	RunTrace()
}

func RunTrace() {
	for _, str := range Trace() {
		fmt.Print(str)
	}

	// hops := parseTracerouteOutput(Trace())
	// for _, hop := range hops {
	// 	fmt.Printf("%+v\n", hop)
	// }
}

type Hop struct {
	Host      string
	Addr      string
	AS        int64
	MinRTT    time.Duration
	AvgRTT    time.Duration
	MaxRTT    time.Duration
	Final     bool
	Lost      int
	Total     int
	Down      int
}

func Trace() []Hop {
	cache := tracelib.NewLookupCache()

	rawHops, err := tracelib.RunMultiTrace("www.google.com", "0.0.0.0", "::", time.Second, 64, cache, 10, nil)

	if nil != err {
		fmt.Println("Traceroute error:", err)
		return nil
	}

	hops := tracelib.AggregateMulti(rawHops)
	var result []string
	var networkHops []Hop
	for i, hop := range hops {
		isd := fmt.Sprintf("%d. ", i+1)
		isp := strings.Repeat(" ", len(isd))

		for j, h := range hop {
			prefix := isd
			if j > 0 {
				prefix = isp
			}

			if nil != h.Addr {
				//r := fmt.Sprintf("%s%v(%s)/AS%d %v/%v/%v (final:%v lost %d of %d, down %d of %d)\n", prefix, h.Host, h.Addr, h.AS, h.MinRTT, h.AvgRTT, h.MaxRTT, h.Final, h.Lost, h.Total, h.Down, h.Total)
				hop := Hop{
					Host: h.Host,
					Addr:  fmt.Sprintf("%d", h.Addr),
					AS: h.AS,
					MinRTT: h.MinRTT,
					AvgRTT: h.AvgRTT,
					MaxRTT: h.MaxRTT,
					Final: h.Final,
					Lost: h.Lost,
					Total: h.Total,
					Down: h.Down,
				}
				networkHops = append(networkHops, hop)
				// result = append(result, r)
			} else {
				// r := fmt.Sprintf("%s Lost: %d\n", prefix, h.Lost)
				
				hop := Hop{
					Host: h.Host,
					Addr: fmt.Sprintf("%d", h.Addr),
					AS: 0,
					MinRTT: 0,
					AvgRTT: 0,
					MaxRTT: 0,
					Final: false,
					Lost: 100,
					Total: 0,
					Down: 0,
				}
				networkHops = append(networkHops, hop)
				// result = append(result, r)
			}
		}
	}

	return result
}
