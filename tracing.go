package main

import (
	"fmt"
	"net"
	"os"
	"time"

	"golang.org/x/net/icmp"
	"golang.org/x/net/ipv4"
)

func TraceRoute(name string) string {
	ip := net.ParseIP(name)

	conn, err := icmp.ListenPacket("ip4:icmp", "0.0.0.0")
	if err != nil {
		fmt.Printf("Error listening for ICMP packets: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close()

	message := icmp.Message{
		Type: ipv4.ICMPTypeEcho, Code: 0,
		Body: &icmp.Echo{ID: os.Getpid() & 0xffff, Seq: 1, Data: []byte("Hello")},
	}

	rb := make([]byte, 1500)
	for ttl := 1; ttl <= 30; ttl++ {
		conn.IPv4PacketConn().SetTTL(ttl)
		startTime := time.Now()
		msgBytes, err := message.Marshal(nil)
		if err != nil {
			fmt.Printf("Error marshaling ICMP message: %v\n", err)
			continue
		}

		if _, err := conn.WriteTo(msgBytes, &net.IPAddr{IP: ip}); err != nil {
			fmt.Printf("Error sending ICMP packet: %v\n", err)
			continue
		}

		conn.SetReadDeadline(time.Now().Add(3 * time.Second))
		_, _, err = conn.ReadFrom(rb)
		elapsed := time.Since(startTime)

		if err != nil {
			fmt.Printf("%d. *\n", ttl)
			continue
		}

		fmt.Printf("%d. %s %.3f ms\n", ttl, ip.String(), float64(elapsed.Nanoseconds())/1e6)
		
	}
	return "helloworld"
}
