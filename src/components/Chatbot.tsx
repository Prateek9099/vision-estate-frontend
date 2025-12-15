"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Paper, Typography, TextField, IconButton, Button, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import StarIcon from '@mui/icons-material/Star';
import VisitDialog from './VisitDialog';
import { getProperties, Property } from '../lib/api';

interface ProjectData {
    name: string;
    location: string;
    price: string;
    config: string;
    ecoScore: number;
    whyBuy: string;
    keywords: string[];
}

// 5 Mandatory Projects + structured data
const PROJECTS: ProjectData[] = [
    {
        name: "Pride World City – Kingsbury",
        location: "Lohegaon, Pune",
        price: "Starting ₹65 Lakhs",
        config: "2 & 3 BHK",
        ecoScore: 88,
        whyBuy: "Integrated township with excellent airport and IT-hub connectivity.",
        keywords: ['pride', 'world', 'city', 'kingsbury', 'lohegaon']
    },
    {
        name: "Rohan Abhilasha",
        location: "Wagholi, Pune",
        price: "Starting ₹55 Lakhs",
        config: "1, 2 & 3 BHK",
        ecoScore: 90,
        whyBuy: "Designed for ventilation and light. Close to Kharadi IT Park.",
        keywords: ['rohan', 'abhilasha', 'wagholi']
    },
    {
        name: "Godrej Greens",
        location: "Undri, Pune",
        price: "Starting ₹48 Lakhs",
        config: "2 & 3 BHK",
        ecoScore: 94,
        whyBuy: "Nature-inspired living with a central forest park and gold certification.",
        keywords: ['godrej', 'greens', 'undri']
    },
    {
        name: "Blue Ridge – The Lofts",
        location: "Hinjawadi Phase 1, Pune",
        price: "Starting ₹72 Lakhs",
        config: "1 & 2 BHK Studio",
        ecoScore: 82,
        whyBuy: "Walk-to-work lifestyle inside the IT Park with golf course views.",
        keywords: ['blue', 'ridge', 'lofts', 'hinjawadi']
    },
    {
        name: "Oberoi Splendor Grande",
        location: "Andheri East, Mumbai",
        price: "Starting ₹3.5 Cr",
        config: "3 & 4 BHK",
        ecoScore: 75,
        whyBuy: "Ultra-luxury expansive apartments with panoramic city views.",
        keywords: ['oberoi', 'splendor', 'grande', 'andheri', 'mumbai']
    }
];

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    cardData?: ProjectData;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I'm Vision AI. Ask me about premium properties like ‘Pride World City’ or ‘Godrej Greens’.", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    // Dialog State
    const [visitOpen, setVisitOpen] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>(undefined);
    const [allProperties, setAllProperties] = useState<Property[]>([]);

    useEffect(() => {
        // Fetch real properties to resolve IDs for booking
        getProperties().then(data => setAllProperties(data)).catch(err => console.error("Chatbot params fetch error", err));
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        setTimeout(() => {
            const lowerInput = userMsg.text.toLowerCase();
            let responseText = "I can help with property details, eco scores, or booking site visits. Try asking about a specific project like ‘Pride World City’.";
            let cardData: ProjectData | undefined = undefined;

            // Find matching project
            const match = PROJECTS.find(p => p.keywords.some(k => lowerInput.includes(k)));

            if (match) {
                responseText = `Here are the details for ${match.name}:`;
                cardData = match;
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                responseText = "Hello! I am Vision AI. Ask me about properties in Pune/Mumbai like Rohan Abhilasha, Pride World City, Blue Ridge, or Godrej Greens.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'bot', cardData }]);
        }, 600);
    };

    const handleBookVisit = (project: ProjectData) => {
        // Find real ID by fuzzy title match
        const realProp = allProperties.find(p => p.title.toLowerCase().includes(project.keywords[0]) || p.title.toLowerCase().includes(project.keywords[1]));
        if (realProp) {
            setSelectedPropertyId(realProp.id);
            setVisitOpen(true);
        } else {
            // Fallback if seeded data doesn't match perfectly, prompt user manually
            alert(`Could not auto-detect Property ID for ${project.name}. Please visit the detailed property page to book.`);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-red-500 rotate-90' : 'bg-neon-cyan animate-bounce'}`}
                style={{ boxShadow: '0 0 20px rgba(0, 243, 255, 0.6)' }}
            >
                {isOpen ? <CloseIcon className="text-white" /> : <SmartToyIcon className="text-black w-8 h-8" />}
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-24 right-6 w-96 max-w-[90vw] z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                <Paper elevation={24} className="rounded-3xl overflow-hidden glass-panel border border-white/20 bg-dark-bg/95 backdrop-blur-xl flex flex-col h-[600px]">
                    <div className="bg-gradient-to-r from-blue-600 to-deep-purple p-4 flex items-center gap-3 shadow-lg">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <SmartToyIcon className="text-neon-cyan" />
                        </div>
                        <div>
                            <Typography variant="h6" className="font-bold text-white text-sm">Vision AI Assistant</Typography>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <Typography variant="caption" className="text-blue-100">Online</Typography>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent scrollbar-hide">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm font-medium leading-relaxed ${msg.sender === 'user' ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md' : 'bg-[#1e1e2e] text-white rounded-tl-none border border-white/10 shadow-sm'}`}>
                                    {msg.text}
                                </div>

                                {/* Structured Project Card */}
                                {msg.cardData && (
                                    <div className="mt-3 bg-white text-black p-4 rounded-xl shadow-lg w-full border-l-4 border-neon-cyan animation-fade-in-up">
                                        <Typography variant="subtitle1" className="font-black text-gray-900 border-b border-gray-200 pb-2 mb-2">
                                            {msg.cardData.name}
                                        </Typography>

                                        <div className="space-y-2 text-sm text-gray-700">
                                            <div className="flex items-start gap-2">
                                                <LocationOnIcon fontSize="small" className="text-red-500 mt-0.5" />
                                                <span className="font-medium">{msg.cardData.location}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <MonetizationOnIcon fontSize="small" className="text-green-600 mt-0.5" />
                                                <span className="font-bold text-green-700">{msg.cardData.price}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <HomeIcon fontSize="small" className="text-blue-500 mt-0.5" />
                                                <span>{msg.cardData.config}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <EmojiNatureIcon fontSize="small" className="text-green-500 mt-0.5" />
                                                <span>Eco Score: <strong>{msg.cardData.ecoScore}</strong></span>
                                            </div>
                                            <div className="flex items-start gap-2 mt-2 bg-blue-50 p-2 rounded-lg">
                                                <StarIcon fontSize="small" className="text-yellow-500 mt-0.5" />
                                                <span className="text-xs italic text-blue-900">{msg.cardData.whyBuy}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                size="small"
                                                className="bg-neon-cyan text-black hover:bg-cyan-400 font-bold text-xs"
                                                onClick={() => handleBookVisit(msg.cardData!)}
                                            >
                                                Book Site Visit
                                            </Button>
                                            <Tooltip title="AR/VR tour will be available in Phase-2" arrow>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    className="border-gray-300 text-gray-500 text-xs"
                                                >
                                                    Virtual Tour
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white/5 border-t border-white/10 gap-2 flex items-center">
                        <TextField
                            variant="outlined"
                            placeholder="Ask about properties..."
                            size="small"
                            fullWidth
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: '#ffffff',
                                    backgroundColor: 'rgba(20, 20, 30, 0.8)',
                                    borderRadius: '20px',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                                    '&.Mui-focused fieldset': { borderColor: 'var(--neon-cyan)' },
                                },
                                '& .MuiInputBase-input': {
                                    color: '#ffffff',
                                    caretColor: '#ffffff',
                                    '&::placeholder': {
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        opacity: 1,
                                    },
                                }
                            }}
                        />
                        <IconButton
                            onClick={handleSend}
                            className="bg-neon-cyan hover:bg-white text-black transition-colors shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                        >
                            <SendIcon fontSize="small" />
                        </IconButton>
                    </div>
                </Paper>
            </div>

            {/* Shared Visit Dialog */}
            <VisitDialog
                open={visitOpen}
                onClose={() => setVisitOpen(false)}
                propertyId={selectedPropertyId}
                onSuccess={() => { }}
                onError={(msg) => alert(msg)}
            />
        </>
    );
}
