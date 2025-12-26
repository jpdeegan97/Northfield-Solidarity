# NS-BCO-008 — EEE (End-to-End Example)

**Scenario: Primary DB accidental deletion**

1.  **Detection:** alerts show error spike, DB unreachable.
2.  **Declare incident:** IC assigned, severity set.
3.  **Contain:** block destructive credentials, freeze deployments.
4.  **Assess:** confirm scope + last known good backup.
5.  **Restore:**
    *   Provision replacement DB
    *   Restore from immutable snapshot
    *   Re-point services
6.  **Validate:**
    *   Smoke tests
    *   Data integrity checks
7.  **Communicate:**
    *   Internal updates every 15–30 min
    *   External notice if customer impact
8.  **Postmortem:**
    *   Root cause
    *   Preventive controls (least privilege, MFA, change gates)
    *   Update runbook + schedule repeat test
