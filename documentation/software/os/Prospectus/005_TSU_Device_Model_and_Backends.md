# 005 — TSU Device Model and Backends

## TSU as a “Sampling Accelerator”
Treat TSU like a GPU, but with a different primitive:
- GPU primitive: dense arithmetic kernels (matmul, conv)
- TSU primitive: **sample from a programmable distribution / energy model**

This keeps the abstraction honest and the integration clean.

## Real-world TSU dev platform context
Extropic’s XTR-0 platform is described as a system integrating a CPU, FPGA, and sockets for TSU daughterboards to enable
low-latency communication between Extropic chips and a traditional processor. Their THRML software supports simulation
and development of models intended for TSUs. (See References.)

## Device capabilities (capability flags)
Expose TSU capabilities explicitly:
- supported variable domains (binary, discrete k-ary, etc.)
- supported factor types
- max variable count / connectivity
- supported schedules (annealing, fixed temperature)
- I/O bandwidth and latency characteristics
- diagnostics support level

## Device discovery
Runtime enumerates devices:
- CPU
- GPU (CUDA/ROCm/Metal depending on host)
- TSU (via vendor runtime / driver / RPC to attached platform)

## Backend types
### A) TSU Hardware Backend
- compiles EProgram into TSU-compatible representation
- streams conditioning and schedule
- returns samples + diagnostics

### B) GPU Simulation Backend
- executes EProgram sampling using GPU kernels (fast dev/test)
- supports deterministic simulation mode for debugging

### C) CPU Reference Backend
- correctness-focused, slow
- good for tests and small problems

## Portability contract
Your engines never call TSU directly.
They call PRS; PRS chooses backend; backend implements the same sampler contract.

## Calibration and comparability
Because different backends can produce different sampling characteristics, maintain:
- calibration suites per EProgram class
- statistical tests for output sanity (constraint satisfaction, distribution checks)
- regression checks per backend update

## Diagnostics level tiers
- Tier 0: minimal (latency, basic constraint checks)
- Tier 1: default (mixing proxies, ESS proxies, schedule stats)
- Tier 2: deep (autocorr estimates, additional trace logs)

Tier selection is QoS-dependent.
