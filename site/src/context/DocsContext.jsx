import React, { createContext, useContext, useState, useEffect } from 'react';
import { DOCS_REGISTRY } from '../data/docsRegistry.js';

const DocsContext = createContext();

export const DocsProvider = ({ children }) => {
    // We will store overrides as a dictionary: { docId: { title, content, desc } }
    const [overrides, setOverrides] = useState(() => {
        try {
            const stored = localStorage.getItem('ns_docs_overrides');
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error('Failed to parse docs overrides', e);
            return {};
        }
    });

    // We will store added docs as: { categoryName: [ doc1, doc2 ] }
    const [addedDocs, setAddedDocs] = useState(() => {
        try {
            const stored = localStorage.getItem('ns_docs_added');
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error('Failed to parse added docs', e);
            return {};
        }
    });

    // Save to localStorage whenever overrides change
    useEffect(() => {
        localStorage.setItem('ns_docs_overrides', JSON.stringify(overrides));
    }, [overrides]);

    useEffect(() => {
        localStorage.setItem('ns_docs_added', JSON.stringify(addedDocs));
    }, [addedDocs]);

    // Function to get the full registry with overrides applied AND added docs included
    const getDocsRegistry = () => {
        return DOCS_REGISTRY.map(category => {
            // Get added docs for this category
            const extra = addedDocs[category.category] || [];

            // Map existing items with overrides
            const validItems = category.items.map(doc => {
                const override = overrides[doc.id];
                if (override) {
                    return { ...doc, ...override };
                }
                return doc;
            });

            return {
                ...category,
                items: [...validItems, ...extra]
            };
        });
    };

    const addDoc = (categoryName, newDoc) => {
        setAddedDocs(prev => {
            const catDocs = prev[categoryName] || [];
            return {
                ...prev,
                [categoryName]: [...catDocs, newDoc]
            };
        });
    };

    const updateDoc = (docId, newContent) => {
        // Check if this doc is in addedDocs first
        let isAddedDoc = false;

        // This is a bit inefficient (searching all added docs) but fine for this scale
        // We need to know if we should update 'addedDocs' state or 'overrides' state
        const addedState = { ...addedDocs };
        let foundCategory = null;

        for (const cat in addedState) {
            const idx = addedState[cat].findIndex(d => d.id === docId);
            if (idx !== -1) {
                isAddedDoc = true;
                foundCategory = cat;
                break;
            }
        }

        if (isAddedDoc && foundCategory) {
            setAddedDocs(prev => {
                const catDocs = [...prev[foundCategory]];
                const idx = catDocs.findIndex(d => d.id === docId);
                if (idx !== -1) {
                    catDocs[idx] = { ...catDocs[idx], ...newContent };
                }
                return { ...prev, [foundCategory]: catDocs };
            });
        } else {
            // It's a standard registry doc, use overrides
            setOverrides(prev => ({
                ...prev,
                [docId]: {
                    ...(prev[docId] || {}), // Merge with existing override if present
                    ...newContent // e.g. { content: "...", title: "..." }
                }
            }));
        }
    };

    const resetDoc = (docId) => {
        // If it's an added doc, "reset" might mean delete? 
        // For now let's just assume reset clears overrides. 
        // We can implement deleteDoc separately if needed.
        setOverrides(prev => {
            const next = { ...prev };
            delete next[docId];
            return next;
        });
    };

    const deleteDoc = (docId) => {
        setAddedDocs(prev => {
            const next = { ...prev };
            for (const cat in next) {
                next[cat] = next[cat].filter(d => d.id !== docId);
            }
            return next;
        });
        // Also clear overrides just in case
        resetDoc(docId);
    };

    return (
        <DocsContext.Provider value={{
            docsRegistry: getDocsRegistry(),
            updateDoc,
            addDoc,
            deleteDoc,
            resetDoc
        }}>
            {children}
        </DocsContext.Provider>
    );
};

export const useDocs = () => {
    return useContext(DocsContext);
};
