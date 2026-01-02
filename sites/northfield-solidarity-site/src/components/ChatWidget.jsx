import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import OpenAI from 'openai';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Greetings. I am the Northfield Solidarity system interface. How can I assist you with your operations today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem('ns_openai_key') || '');
    const [showKeyInput, setShowKeyInput] = useState(!localStorage.getItem('ns_openai_key'));

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
                dangerouslyAllowBrowser: true // Required for client-side usage
            });

            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "You are the AI interface for Northfield Solidarity, a sovereign equity management system. You are helpful, precise, and favor the 'Gold' and 'Water' aesthetic themes in your language (calm, structured). You have access to the context that this is a React application managing real estate (South Lawn) and strategic capital (WSP)." },
                    ...messages,
                    userMsg
                ],
                model: "gpt-4-turbo-preview", // Or standard gpt-4/3.5 depending on access
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
                <MessageSquare size={24} />
            </button>
        );
    }

    return (
        <div className={`ai-widget-window ${isExpanded ? 'expanded' : ''}`}>
            <div className="ai-header">
                <div className="ai-status">
                    <div className="status-dot"></div>
                    <span className="ai-title">System Intelligence</span>
                </div>
                <div className="ai-controls">
                    <button onClick={() => setIsExpanded(!isExpanded)} className="icon-btn">
                        {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                    <button onClick={() => setIsOpen(false)} className="icon-btn">
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="ai-body">
                {showKeyInput ? (
                    <div className="key-setup">
                        <h3>Configuration Required</h3>
                        <p>Please enter your OpenAI API key to activate the neural interface. Values are stored locally in your browser.</p>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-..."
                            className="key-input"
                        />
                        <button onClick={handleSaveKey} className="btn sm full-width">Initialize Link</button>
                    </div>
                ) : (
                    <>
                        <div className="messages-list">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    <div className="message-bubble">
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message assistant">
                                    <div className="message-bubble typing">
                                        <span>.</span><span>.</span><span>.</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="input-area-wrapper">
                            <form onSubmit={handleSubmit} className="input-area">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Query the system..."
                                    autoFocus
                                />
                                <button type="submit" disabled={!input.trim() || isLoading}>
                                    <Send size={18} />
                                </button>
                            </form>
                            <button onClick={handleClearKey} className="text-xs text-sub mt-2 hover:text-brand">Reset Key</button>
                        </div>
                    </>
                )}
            </div>

            <style>{`
                .ai-widget-trigger {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: var(--c-brand);
                    color: #fff;
                    border: none;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    cursor: pointer;
                    z-index: 2147483647; /* Max z-index to ensure visibility */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }
                .ai-widget-trigger:hover {
                    transform: scale(1.05);
                }
                .trigger-pulse {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    border-radius: 50%;
                    border: 2px solid var(--c-brand);
                    animation: pulse 2s infinite;
                    opacity: 0;
                }
                
                .ai-widget-window {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    width: 380px;
                    height: 600px;
                    max-height: calc(100vh - 48px);
                    background: var(--c-surface);
                    border: 1px solid var(--c-border);
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
                    display: flex;
                    flex-direction: column;
                    z-index: 2147483647;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    backdrop-filter: blur(10px);
                }
                
                .ai-widget-window.expanded {
                    width: 800px;
                    height: 800px;
                }

                .ai-header {
                    padding: 16px;
                    border-bottom: 1px solid var(--c-border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0,0,0,0.2);
                    flex-shrink: 0;
                }
                .ai-status {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #10b981;
                    box-shadow: 0 0 8px #10b981;
                }
                .ai-title {
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: var(--c-text);
                }
                .icon-btn {
                    background: none;
                    border: none;
                    color: var(--c-text-sub);
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                }
                .icon-btn:hover {
                    background: var(--c-bg-hover);
                    color: var(--c-text);
                }

                .ai-body {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    background: var(--c-bg);
                }

                .messages-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .message {
                    display: flex;
                    justify-content: flex-start;
                }
                .message.user {
                    justify-content: flex-end;
                }
                
                .message-bubble {
                    max-width: 85%;
                    padding: 12px 16px;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }
                .message.assistant .message-bubble {
                    background: var(--c-surface);
                    color: var(--c-text);
                    border: 1px solid var(--c-border);
                    border-top-left-radius: 2px;
                }
                .message.user .message-bubble {
                    background: var(--c-brand);
                    color: white;
                    border-top-right-radius: 2px;
                }

                .typing span {
                    animation: blink 1.4s infinite both;
                    font-size: 1.2rem;
                    line-height: 1rem;
                    margin: 0 1px;
                }
                .typing span:nth-child(2) { animation-delay: 0.2s; }
                .typing span:nth-child(3) { animation-delay: 0.4s; }

                .input-area-wrapper {
                     padding: 16px;
                     border-top: 1px solid var(--c-border);
                     background: var(--c-surface);
                     flex-shrink: 0;
                }

                .input-area {
                    display: flex;
                    gap: 8px;
                }

                .input-area input {
                    flex: 1;
                    background: var(--c-bg);
                    border: 1px solid var(--c-border);
                    border-radius: 8px;
                    padding: 8px 12px;
                    color: var(--c-text);
                    outline: none;
                }
                .input-area input:focus {
                    border-color: var(--c-brand);
                }
                .input-area button {
                    background: var(--c-brand);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    width: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
                .input-area button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .key-setup {
                    padding: 40px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    align-items: center;
                    margin: auto;
                }
                .key-input {
                    background: var(--c-bg);
                    border: 1px solid var(--c-border);
                    padding: 8px;
                    border-radius: 6px;
                    width: 100%;
                    color: var(--c-text);
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes blink {
                    0% { opacity: 0.2; }
                    20% { opacity: 1; }
                    100% { opacity: 0.2; }
                }

                @media (max-width: 480px) {
                    .ai-widget-window {
                        right: 0; bottom: 0; left: 0; top: 0;
                        width: 100%; height: 100%;
                        border-radius: 0;
                    }
                }
            `}</style>
        </div>
    );
}
