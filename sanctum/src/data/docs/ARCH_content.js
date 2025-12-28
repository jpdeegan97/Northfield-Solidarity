
export const NS_ARCH_010_NETWORKING = `
# Network Infrastructure & Connectivity

**Document ID:** NS-ARCH-010-NETWORKING
**Status:** Live / Active
**Last Updated:** 2025-12-27

---

## 1. Overview

This document outlines the connectivity architecture for the Northfield Solidarity platform, detailing the flow of traffic from the public internet through the DNS layer, residential ISP gateway, and into the on-premise PowerEdge (PE) server hosting the detailed application stack.

## 2. High-Level Topology

Traffic flows through four distinct layers:

1.  **Public Internet**: Client browsers acting as the entry point.
2.  **DNS Layer (Porkbun)**: Resolves domain requests to the residential WAN IP.
3.  **Gateway Layer (Verizon Router)**: Handles NAT and Port Forwarding to the internal host.
4.  **Host Layer (PE Server)**: Reverse proxies traffic via Caddy to the application runtime.

---

## 3. Configuration Details

### 3.1 DNS Configuration (Porkbun)

The domain **northfieldsolidarity.ai** is managed via Porkbun.

| Record Type | Host | Value | TTL |
|:---|:---|:---|:---|
| **A** | @ | 173.70.29.17 | 600 |
| **CNAME** | www | 173.70.29.17 | 600 |
| **CNAME** | app | 173.70.29.17 | 600 |

*Note: The WAN IP (173.70.29.17) is dynamic but relatively stable. DDNS scripts may be required in the future.*

### 3.2 Router Configuration (Verizon Fios)

The ISP gateway performs Network Address Translation (NAT) and forwards specific ports to the internal server.

**WAN IP:** 173.70.29.17

**Port Forwarding Rules:**

| Protocol | External Port | Internal IP | Internal Port | Purpose |
|:---|:---|:---|:---|:---|
| TCP | **80** (HTTP) | 192.168.1.189 | 80 | Web Traffic |
| TCP | **443** (HTTPS) | 192.168.1.189 | 443 | Secure Web Traffic |

*Note: Internal IP 192.168.1.189 is the static lease for the PowerEdge server.*

### 3.3 Host Configuration (PowerEdge Server)

**Hostname:** NS-PE-01
**OS:** Ubuntu / Linux
**Local IP:** 192.168.1.189

The host utilizes **Caddy** as a modern, automatic HTTPS reverse proxy. Caddy handles TLS termination (Let's Encrypt) and forwards requests to the Node.js/Vite application running locally.

**Caddyfile Configuration:**

\`\`\`caddy
app.northfieldsolidarity.ai {
    encode zstd gzip
    reverse_proxy localhost:5173 {
        # Or localhost:8080 depending on build/dev mode
    }
}

# Optional Apex Redirect
northfieldsolidarity.ai, www.northfieldsolidarity.ai {
    redir https://app.northfieldsolidarity.ai{uri} permanent
}
\`\`\`

---

## 4. Traffic Flow Diagram

\`\`\`mermaid
graph TD
    Client[Browser Client]
    Cloud((Public Internet))
    DNS[Porkbun DNS]
    Gateway[Verizon Router]
    Host[PE Server (192.168.1.189)]
    Caddy[Caddy Reverse Proxy]
    App[Sanctum App :5173]

    Client -->|https://app.northfieldsolidarity.ai| Cloud
    Cloud -->|Resolve IP 173.70.29.17| DNS
    Cloud -->|Request Port 443| Gateway
    Gateway -->|NAT Forward| Host
    Host -->|Ingress| Caddy
    Caddy -->|Reverse Proxy| App
\`\`\`
`;
