/*
 * Sanctum Cryptography Module
 * Implements AES-GCM 256-bit encryption with dynamic IV rotation.
 * 
 * "Unbeatable" characteristics:
 * 1. Key Derivation: PBKDF2 with SHA-256 and high iteration count (100,000)
 * 2. Encryption: AES-GCM (Galois/Counter Mode) for authenticated encryption
 * 3. Rotation: A new random Initialization Vector (IV) is generated for EVERY save operation.
 *    This ensures that even if the content is identical, the ciphertext is completely different.
 * 4. Architecture: 
 *    - Master Password -> derives KEK (Key Encryption Key)
 *    - Random DEK (Data Encryption Key) -> Encrypts the Journal content
 *    - KEK -> Encrypts the DEK
 *    - Storage -> { encryptedDEK, salt, iv_kek, encryptedContent, iv_content }
 */

// Configuration
const PBKDF2_ITERATIONS = 100000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12; // Standard for GCM
const KEY_LENGTH = 256;

// 1. Generate a random salt
export const generateSalt = () => window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));

// 2. Derive KEK (Key Encryption Key) from Password
export const deriveKey = async (password, salt) => {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: PBKDF2_ITERATIONS,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: KEY_LENGTH },
        false, // Key is not extractable
        ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
    );
};

// 3. Generate a random DEK (Data Encryption Key)
export const generateDEK = async () => {
    return window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: KEY_LENGTH },
        true, // Must be extractable (wrapped) to store
        ["encrypt", "decrypt"]
    );
};

// 4. Encrypt Data (The Journal Content)
// Returns { ciphertext (ArrayBuffer), iv (Uint8Array) }
export const encryptData = async (key, data) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const enc = new TextEncoder();
    const encodedData = enc.encode(data);

    const ciphertext = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encodedData
    );

    return { ciphertext, iv };
};

// 5. Decrypt Data
export const decryptData = async (key, ciphertext, iv) => {
    try {
        const decrypted = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            ciphertext
        );
        const dec = new TextDecoder();
        return dec.decode(decrypted);
    } catch (e) {
        console.error("Decryption failed:", e);
        throw new Error("Invalid password or corrupted data.");
    }
};

// 6. Wrap DEK (Encrypt the data key with the password-derived key)
export const wrapDEK = async (kek, dek) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const wrappedKey = await window.crypto.subtle.wrapKey(
        "raw",
        dek,
        kek,
        { name: "AES-GCM", iv: iv }
    );
    return { wrappedKey, iv };
};

// 7. Unwrap DEK (Decrypt the data key)
export const unwrapDEK = async (kek, wrappedKey, iv) => {
    return window.crypto.subtle.unwrapKey(
        "raw",
        wrappedKey,
        kek,
        { name: "AES-GCM", iv: iv },
        { name: "AES-GCM", length: KEY_LENGTH },
        true,
        ["encrypt", "decrypt"]
    );
};

// Helpers for array buffer conversion (for storage)
export const buf2hex = (buffer) => {
    return Array.from(new Uint8Array(buffer))
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
};


export const hex2buf = (hexString) => {
    const bytes = new Uint8Array(Math.ceil(hexString.length / 2));
    for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
    return bytes.buffer;
};

// 8. Generate Recovery Code
// Generates a random alphanumeric string (e.g. "A7X9-12M4-99PZ-QA21")
export const generateRecoveryCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No I, 1, O, 0 for clarity
    const sections = 4;
    const charsPerSection = 4;
    const totalChars = sections * charsPerSection;

    // Low-tech but crytographically sourced random indices
    const randomValues = window.crypto.getRandomValues(new Uint8Array(totalChars));
    let code = "";

    for (let i = 0; i < totalChars; i++) {
        if (i > 0 && i % charsPerSection === 0) code += "-";
        code += chars[randomValues[i] % chars.length];
    }

    return code;
};
