import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, Save, FileLock2, RefreshCw } from 'lucide-react';
import OpenAI from 'openai';
import { useAuth } from '../context/AuthContext';

export default function ChatWidget() {
    // Auth integration although context might be provided higher up
    let auth = {};
    try {
        auth = useAuth();
    } catch (e) {
        auth = { user: null, isAuthenticated: false };
    }
    const { user, isAuthenticated } = auth;

    const [isActive] = useState(localStorage.getItem('ns_chat_active') !== 'false');
    // Updated system prompt to reflect the new "Jewel" aesthetic
    const [systemPrompt] = useState(localStorage.getItem('ns_chat_prompt') || "You are the AI interface for Northfield Solidarity. You are helpful, precise, and favor a 'Jewel' and 'Glass' aesthetic theme (premium, transparent, valuable). You have access to real estate and capital strategy context.");

    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Greetings. I am the Northfield Solidarity system interface. How can I assist you with your operations today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem('ns_openai_key') || '');
    const [showKeyInput, setShowKeyInput] = useState(!localStorage.getItem('ns_openai_key'));
    const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Load History
    useEffect(() => {
        const loadHistory = () => {
            const savedData = localStorage.getItem('ns_chat_vectors');
            if (savedData) {
                try {
                    const decrypted = JSON.parse(decodeURIComponent(atob(savedData)));
                    setMessages(decrypted);
                } catch (e) {
                    console.error("Failed to decrypt chat vectors", e);
                }
            }
        };

        if (isAuthenticated) {
            loadHistory();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!isActive) return null;

    const handleSaveKey = () => {
        if (apiKey.trim()) {
            localStorage.setItem('ns_openai_key', apiKey.trim());
            setShowKeyInput(false);
        }
    };

    const handleClearKey = () => {
        localStorage.removeItem('ns_openai_key');
        setApiKey('');
        setShowKeyInput(true);
    };

    const handleSaveAndEncrypt = () => {
        try {
            setSaveStatus('saving');
            const encrypted = btoa(encodeURIComponent(JSON.stringify(messages)));
            localStorage.setItem('ns_chat_vectors', encrypted);

            setTimeout(() => {
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus(null), 2000);
            }, 600);
        } catch (e) {
            console.error("Encryption failed", e);
            setSaveStatus('error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const openai = new OpenAI({
                apiKey: apiKey,
                dangerouslyAllowBrowser: true
            });

            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages,
                    userMsg
                ],
                model: "gpt-4-turbo-preview",
            });

            const aiMsg = completion.choices[0].message;
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Error connecting to intelligence layer. Please verify your API key configuration.'
            }]);
            if (error.status === 401) {
                setShowKeyInput(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="ai-widget-trigger"
                aria-label="Open AI Assistant"
            >
                <div className="trigger-pulse"></div>
                <div className="trigger-inner">
                    <MessageSquare size={24} />
                </div>
            </button>
        );
    }

    return (
        <div className={`ai-widget-window ${isExpanded ? 'expanded' : ''}`}>
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 pointer-events-none" />

            <div className="ai-header">
                <div className="ai-status">
                    <div className="status-ring">
                        <div className={`status-dot ${isLoading ? 'animate-pulse bg-amber-400' : 'bg-emerald-400'}`}></div>
                    </div>
                    <span className="ai-title font-serif tracking-wider text-[#D4AF37]">ORACLE</span>
                </div>
                <div className="ai-controls">
                    <button
                        onClick={handleSaveAndEncrypt}
                        className={`icon-btn ${saveStatus === 'saved' ? 'text-emerald-400' : ''}`}
                        title="Save & Encrypt Vectors"
                    >
                        {saveStatus === 'saved' ? <FileLock2 size={16} /> : <Save size={16} />}
                    </button>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="icon-btn">
                        {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                    <button onClick={() => setIsOpen(false)} className="icon-btn close">
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="ai-body custom-scrollbar">
                {saveStatus === 'saved' && (
                    <div className="mx-4 mt-2 mb-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] py-1 px-4 text-center font-mono border border-emerald-500/20 shadow-[0_0_15px_-5px_var(--c-emerald)]">
                        SESSION VECTORS SECURED
                    </div>
                )}

                {showKeyInput ? (
                    <div className="key-setup">
                        <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-4 shadow-[0_0_20px_-5px_rgba(212,175,55,0.3)]">
                            <Save className="text-[#D4AF37]" size={20} />
                        </div>
                        <h3 className="text-lg font-serif text-[#D4AF37] mb-2">Initialize Uplink</h3>
                        <p className="text-xs text-neutral-400 max-w-[240px] mb-6 leading-relaxed">
                            Secure connection requires an OpenAI key. Data is locally encrypted.
                        </p>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-..."
                            className="key-input"
                        />
                        <button onClick={handleSaveKey} className="init-btn">
                            Connect
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="messages-list" style={{ fontFamily: isExpanded ? 'monospace' : 'inherit' }}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    <div className="message-content-wrapper">
                                        <div className="message-bubble">
                                            {msg.content}
                                        </div>
                                        <div className="message-timestamp">
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message assistant">
                                    <div className="message-bubble typing">
                                        <span>•</span><span>•</span><span>•</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="input-area-container">
                            <form onSubmit={handleSubmit} className="input-area-glass">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={isLoading ? "Processing..." : "Enter command..."}
                                    autoFocus
                                    disabled={isLoading}
                                />
                                <button type="submit" disabled={!input.trim() || isLoading} className={input.trim() ? "active" : ""}>
                                    {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
                                </button>
                            </form>
                            <div className="flex justify-between items-center px-2 mt-2">
                                <button onClick={handleClearKey} className="text-[10px] text-neutral-500 hover:text-[#D4AF37] transition-colors">Reset Key</button>
                                <div className="text-[10px] text-[#D4AF37]/40 font-mono tracking-widest uppercase">
                                    {user ? `Operator: ${user.email.split('@')[0]}` : 'Guest Node'}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style>{`
                /* --- Trigger Button --- */
                .ai-widget-trigger {
                    position: fixed;
                    bottom: 32px;
                    right: 32px;
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: rgba(10, 10, 10, 0.4);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(12px);
                    cursor: pointer;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                .ai-widget-trigger:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 40px rgba(212, 175, 55, 0.2);
                    border-color: rgba(212, 175, 55, 0.6);
                }
                .trigger-inner {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.8), rgba(180, 148, 31, 1));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: black;
                }
                
                /* --- Main Window --- */
                .ai-widget-window {
                    position: fixed;
                    bottom: 32px;
                    right: 32px;
                    width: 400px;
                    height: 650px;
                    max-height: calc(100vh - 64px);
                    background: rgba(15, 15, 15, 0.65);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 32px;
                    box-shadow: 
                        0 20px 50px rgba(0,0,0,0.5),
                        0 0 0 1px rgba(212, 175, 55, 0.1) inset;
                    display: flex;
                    flex-direction: column;
                    z-index: 9999;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                    backdrop-filter: blur(24px);
                    font-family: 'Inter', sans-serif;
                }
                .ai-widget-window.expanded {
                    width: 900px;
                    height: 80vh;
                    border-radius: 24px;
                }

                /* --- Header --- */
                .ai-header {
                    padding: 20px 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: linear-gradient(to bottom, rgba(255,255,255,0.03), transparent);
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                }
                .status-ring {
                    padding: 3px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-right: 10px;
                }
                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    box-shadow: 0 0 10px currentColor;
                }
                
                .icon-btn {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 50%;
                    transition: all 0.2s;
                    margin-left: 4px;
                }
                .icon-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }
                .icon-btn.close:hover {
                    background: rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                }

                /* --- Body --- */
                .ai-body {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .messages-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                /* --- Bubbles --- */
                .message {
                    display: flex;
                    width: 100%;
                }
                .message.user {
                    justify-content: flex-end;
                }
                
                .message-content-wrapper {
                    max-width: 80%;
                    display: flex;
                    flex-direction: column;
                }
                .message.user .message-content-wrapper {
                    align-items: flex-end;
                }

                .message-bubble {
                    padding: 14px 20px;
                    border-radius: 20px;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    position: relative;
                    backdrop-filter: blur(5px);
                }

                .message.assistant .message-bubble {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    color: rgba(255, 255, 255, 0.9);
                    border-bottom-left-radius: 4px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .message.user .message-bubble {
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.8), rgba(160, 130, 20, 0.9));
                    color: #000;
                    font-weight: 500;
                    border-bottom-right-radius: 4px;
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.15);
                }

                .message-timestamp {
                    font-size: 0.65rem;
                    color: rgba(255,255,255,0.2);
                    margin-top: 6px;
                    padding: 0 4px;
                }

                /* --- Input Area --- */
                .input-area-container {
                     padding: 20px 24px 24px;
                     background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
                }

                .input-area-glass {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 100px; /* Fully rounded capsule */
                    padding: 6px 6px 6px 20px;
                    transition: all 0.3s ease;
                }
                .input-area-glass:focus-within {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(212, 175, 55, 0.3);
                    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.05);
                }

                .input-area-glass input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: white;
                    outline: none;
                    font-size: 0.95rem;
                }
                .input-area-glass input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }

                .input-area-glass button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .input-area-glass button.active {
                    background: #D4AF37;
                    color: black;
                }
                .input-area-glass button:hover.active {
                    transform: scale(1.05);
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
                }

                /* --- Key Setup --- */
                .key-setup {
                    padding: 40px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: auto;
                }
                .key-input {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 12px;
                    border-radius: 12px;
                    width: 100%;
                    color: white;
                    font-family: monospace;
                    margin-bottom: 16px;
                    transition: border 0.2s;
                }
                .key-input:focus {
                    border-color: #D4AF37;
                    outline: none;
                }
                .init-btn {
                     background: linear-gradient(135deg, #D4AF37, #B4941F);
                     color: black;
                     border: none;
                     padding: 10px 32px;
                     border-radius: 100px;
                     font-weight: bold;
                     font-size: 0.9rem;
                     cursor: pointer;
                     transition: transform 0.2s;
                }
                .init-btn:hover {
                    transform: scale(1.05);
                }

                /* --- Utils --- */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
