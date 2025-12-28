import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Crypto from '../utils/crypto';

const JournalContext = createContext();

const STORAGE_KEY = 'sanctum_journal_vault';

export const JournalProvider = ({ children }) => {
    const [isLocked, setIsLocked] = useState(true);
    const [journalData, setJournalData] = useState('');
    const [dek, setDek] = useState(null); // Data Encryption Key (held in memory only)
    const [status, setStatus] = useState('LOCKED'); // LOCKED, DECRYPTING, UNLOCKED, ERROR

    // Check if vault exists
    const hasVault = !!localStorage.getItem(STORAGE_KEY);

    const  createVault= async (password) => {
        try {
            setStatus('ENCRYPTING');
            const salt = Crypto.generateSalt();
            const kek = await Crypto.deriveKey(password, salt);
            const newDek = await Crypto.generateDEK();

            // RECOVERY MECHANISM SETUP
            const recoveryCode = Crypto.generateRecoveryCode();
            const recoverySalt = Crypto.generateSalt();
            const recoveryKek = await Crypto.deriveKey(recoveryCode, recoverySalt);
            const { wrappedKey: recoveryWrappedKey, iv: recoveryKeyIv } = await Crypto.wrapDEK(recoveryKek, newDek);

            // Initial empty data
            const content = "JOURNAL INITIALIZED // READY";
            const { ciphertext: encryptedContent, iv: contentIv } = await Crypto.encryptData(newDek, content);
            const { wrappedKey, iv: keyIv } = await Crypto.wrapDEK(kek, newDek);

            const vault = {
                salt: Crypto.buf2hex(salt),
                wrappedKey: Crypto.buf2hex(wrappedKey),
                keyIv: Crypto.buf2hex(keyIv),

                // Recovery Fields
                recoverySalt: Crypto.buf2hex(recoverySalt),
                recoveryWrappedKey: Crypto.buf2hex(recoveryWrappedKey),
                recoveryKeyIv: Crypto.buf2hex(recoveryKeyIv),

                encryptedContent: Crypto.buf2hex(encryptedContent),
                contentIv: Crypto.buf2hex(contentIv)
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(vault));

            setDek(newDek);
            setJournalData(content);
            setIsLocked(false);
            setStatus('UNLOCKED');
            return recoveryCode; // Return the code for display
        } catch (e) {
            console.error("Vault Creation Failed", e);
            setStatus('ERROR');
            return null;
        }
    };

    const unlockVault = async (password) => {
        try {
            setStatus('DECRYPTING');
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stored) throw new Error("No vault found");

            const salt = Crypto.hex2buf(stored.salt);
            const kek = await Crypto.deriveKey(password, salt);

            const wrappedKey = Crypto.hex2buf(stored.wrappedKey);
            const keyIv = Crypto.hex2buf(stored.keyIv);

            // If password is wrong, this usually fails
            const unwrappedDek = await Crypto.unwrapDEK(kek, wrappedKey, keyIv);

            const encryptedContent = Crypto.hex2buf(stored.encryptedContent);
            const contentIv = Crypto.hex2buf(stored.contentIv);

            const content = await Crypto.decryptData(unwrappedDek, encryptedContent, contentIv);

            setDek(unwrappedDek);
            setJournalData(content);
            setIsLocked(false);
            setStatus('UNLOCKED');
            return true;
        } catch (e) {
            console.error("Unlock Failed", e);
            setStatus('ERROR');
            return false;
        }
    };

    const recoverVault = async (recoveryCode, newPassword) => {
        try {
            setStatus('DECRYPTING');
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stored) throw new Error("No vault found");

            // 1. Unwrap DEK with Recovery Code
            const recoverySalt = Crypto.hex2buf(stored.recoverySalt);
            const recoveryKek = await Crypto.deriveKey(recoveryCode, recoverySalt);
            const recoveryWrappedKey = Crypto.hex2buf(stored.recoveryWrappedKey);
            const recoveryKeyIv = Crypto.hex2buf(stored.recoveryKeyIv);

            const unwrappedDek = await Crypto.unwrapDEK(recoveryKek, recoveryWrappedKey, recoveryKeyIv);

            // 2. Generate new Main KEK with New Password
            const newSalt = Crypto.generateSalt(); // New salt for new password
            const newKek = await Crypto.deriveKey(newPassword, newSalt);

            // 3. Re-wrap DEK with New KEK
            const { wrappedKey: newWrappedKey, iv: newKeyIv } = await Crypto.wrapDEK(newKek, unwrappedDek);

            // 4. Update Vault Storage (Keep content and recovery same, update main key wrapper)
            const updatedVault = {
                ...stored,
                salt: Crypto.buf2hex(newSalt),
                wrappedKey: Crypto.buf2hex(newWrappedKey),
                keyIv: Crypto.buf2hex(newKeyIv)
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVault));

            // 5. Decrypt content for immediate access
            const encryptedContent = Crypto.hex2buf(stored.encryptedContent);
            const contentIv = Crypto.hex2buf(stored.contentIv);
            const content = await Crypto.decryptData(unwrappedDek, encryptedContent, contentIv);

            setDek(unwrappedDek);
            setJournalData(content);
            setIsLocked(false);
            setStatus('UNLOCKED');
            return true;
        } catch (e) {
            console.error("Recovery Failed", e);
            setStatus('ERROR');
            return false;
        }
    };

    const saveJournal = async (content) => {
        if (!dek) return;
        try {
            const { ciphertext, iv } = await Crypto.encryptData(dek, content);
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
            const updatedVault = {
                ...stored,
                encryptedContent: Crypto.buf2hex(ciphertext),
                contentIv: Crypto.buf2hex(iv)
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVault));
            setJournalData(content);
        } catch (e) {
            console.error("Save Failed", e);
        }
    };

    const lockVault = () => {
        setDek(null);
        setJournalData('');
        setIsLocked(true);
        setStatus('LOCKED');
    };

    return (
        <JournalContext.Provider value={{
            isLocked,
            hasVault,
            status,
            journalData,
            createVault,
            unlockVault,
            recoverVault,
            saveJournal,
            lockVault
        }}>
            {children}
        </JournalContext.Provider>
    );
};

export const useJournal = () => useContext(JournalContext);
