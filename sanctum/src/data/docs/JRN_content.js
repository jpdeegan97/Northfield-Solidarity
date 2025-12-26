
export const NS_JRN_001_OVERVIEW = `
# Sanctum Journal - Cryptographic Architecture

**System Name:** Sanctum Journal (JRN)
**Document Title:** Cryptographic Architecture & Security Model
**Document Id:** NS-JRN-001
**Version:** 1.0
**Status:** Active

## 1. Overview
The Sanctum Journal provides a mathematically secure environment for data persistence. It differentiates itself from standard secure storage through its **Rotational Cryptography** strategy. Every save operation triggers a full re-encryption cycle with new initialization vectors, ensuring that the stored ciphertext is constantly mutating even if the cleartext remains static.

## 2. Security Model
The system operates on a **Zero-Knowledge** architecture regarding the server/storage layer.
- **Client-Side Only:** All encryption/decryption happens in the user's browser memory.
- **No Remediation:** There is no "Forgot Password" functionality. Losing the Master Key results in permanent data loss.
- **Ephemeral Keys:** Data Encryption Keys (DEKs) exist only in volatile memory and are cleared upon locking or session end.

## 3. Cryptographic Primitives
We utilize the **Web Crypto API** (SubtleCrypto) for all operations to ensure hardware-accelerated, non-exportable security where supported.

| Component | Standard | Configuration |
|-----------|----------|---------------|
| **Encryption Algorithm** | AES-GCM | 256-bit Key, 96-bit Random IV |
| **Key Derivation** | PBKDF2 | SHA-256, 100,000 Iterations |
| **Randomness** | CSPRNG | \`window.crypto.getRandomValues()\` |

## 4. Key Hierarchy
The system uses a 2-tier key architecture to allow for secure updates without total re-encryption of the Master Key.

### Level 1: Key Encryption Key (KEK)
- **Derived From:** User Password + Random Salt (16 bytes)
- **Algorithm:** PBKDF2-SHA256
- **Strength:** 100,000 Iterations
- **Usage:** Wraps/Unwraps the DEK. Never used to encrypt data directly.

### Level 2: Data Encryption Key (DEK)
- **Generated:** Random 256-bit AES-GCM key.
- **Storage:** Stored in LocalStorage *only* in wrapped form (Encrypted by KEK).
- **Usage:** Encrypts the actual Journal Content.

## 5. Rotational Strategy (“Unbeatable Encryption”)
To prevent traffic analysis and side-channel attacks based on file size or static patterns, the system implements **Continuous IV Rotation**.

### The Process (On Save):
1. User clicks "Save".
2. System generates a **New Random IV** (12 bytes).
3. The in-memory DEK encrypts the current content with this New IV.
4. The old ciphertext and old IV in specific storage are effectively overwritten.
   
**Result:**
\`Encrypt(Key, Data, IV1) !== Encrypt(Key, Data, IV2)\`
Even if the user saves the exact same text 100 times, the stored binary blob will be completely different 100 times.

## 6. Implementation Reference

\`\`\`javascript
// 1. Derivation
const kek = await window.crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    passwordKeyMaterial,
    { name: "AES-GCM", length: 256 },
    false, ["wrapKey", "unwrapKey"]
);

// 2. Encryption (Rotational)
const iv = window.crypto.getRandomValues(new Uint8Array(12));
const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    dek,
    encodedData
);
\`\`\`

## 7. Threat Model Analysis
- **At Rest:** Attacker has full access to LocalStorage.
  - *Mitigation:* Data is AES-256 encrypted. Key is wrapped. Attacker needs Password.
- **Brute Force:** Attacker tries to guess Password.
  - *Mitigation:* PBKDF2 with 100k iterations makes brute-forcing computationally expensive.
- **Browser Compromise:** Malicious extension reads memory.
  - *Mitigation:* Threat exists. Users must maintain a clean browser environment. (Out of scope).

---
*“Data at rest is data at risk. Data in flux is data obscured.”*
`;
