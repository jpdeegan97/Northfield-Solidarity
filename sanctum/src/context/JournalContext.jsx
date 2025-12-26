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

    const createVault = async (password) => {
        try {
            setStatus('ENCRYPTING');
            const salt = Crypto.generateSalt();
            const kek = await Crypto.deriveKey(password, salt);
            const newDek = await Crypto.generateDEK();

            // Initial empty data
            const content = "JOURNAL INITIALIZED // READY";
            const { ciphertext: encryptedContent, iv: contentIv } = await Crypto.encryptData(newDek, content);
            const { wrappedKey, iv: keyIv } = await Crypto.wrapDEK(kek, newDek);

            const vault = {
                salt: Crypto.buf2hex(salt),
                wrappedKey: Crypto.buf2hex(wrappedKey),
                keyIv: Crypto.buf2hex(keyIv),
                encryptedContent: Crypto.buf2hex(encryptedContent),
                contentIv: Crypto.buf2hex(contentIv)
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(vault));

            setDek(newDek);
            setJournalData(content);
            setIsLocked(false);
            setStatus('UNLOCKED');
            return true;
        } catch (e) {
            console.error("Vault Creation Failed", e);
            setStatus('ERROR');
            return false;
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

    const saveJournal = async (content) => {
        if (!dek) return;

        // RE-ENCRYPT EVERYTHING WITH NEW IVs ("Standard encryption rotation")
        // Note: For extreme security, we could also rotate the wrapping of the DEK, 
        // but rotating the content IV is sufficient for "constant data change".

        try {
            const { ciphertext, iv } = await Crypto.encryptData(dek, content);

            // We need to keep the existing keys, just update content
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

    // Auto-lock on tab close/hidden is good practice, maybe later

    return (
        <JournalContext.Provider value={{
            isLocked,
            hasVault,
            status,
            journalData,
            createVault,
            unlockVault,
            saveJournal,
            lockVault
        }}>
            {children}
        </JournalContext.Provider>
    );
};

export const useJournal = () => useContext(JournalContext);
