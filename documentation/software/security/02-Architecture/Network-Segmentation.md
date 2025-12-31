# Network Segmentation

## Goals
- Separate risky devices and reduce lateral movement.
- Make “servers” a controlled zone.

## Recommended VLANs / segments
- user
- servers (k3s nodes, storage)
- iot (TVs, smart devices)
- guest

## Rules of thumb
- IoT cannot reach servers/admin.
- Admin access to servers only via VPN/jump.
- East-west inside cluster still requires NetworkPolicy.
