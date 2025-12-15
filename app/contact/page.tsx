"use client";
import ClientOnly from "../../src/components/ClientOnly";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";

export default function ContactPage() {
    return (
        <ClientOnly>
            <Container maxWidth="lg" className="min-h-[85vh] flex items-center justify-center relative overflow-hidden py-20">

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/10 blur-[150px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-blue/10 blur-[150px] rounded-full animate-pulse"></div>

                <div className="glass-panel p-10 md:p-16 rounded-[3rem] w-full max-w-4xl border border-white/10 relative z-10 animate-float shadow-2xl">
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-neon-cyan/20 rounded-full blur-xl animate-bounce delay-700"></div>

                    <div className="text-center mb-16">
                        <Typography variant="h1" className="font-black text-5xl md:text-7xl mb-4 text-white tracking-tighter">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-blue">Touch</span>
                        </Typography>
                        <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                            Connect with our team to experience the future of real estate today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="flex flex-col gap-6 justify-center">
                            <div className="group p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-neon-cyan/50 transition-all hover:-translate-x-1">
                                <div className="text-neon-cyan text-xs font-bold uppercase tracking-widest mb-1">Lead Developer / Contact</div>
                                <div className="text-2xl font-black text-white group-hover:text-neon-cyan transition-colors">Prateek Chaudhari</div>
                            </div>

                            <div className="group p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-neon-cyan/50 transition-all hover:translate-x-1">
                                <div className="text-electric-blue text-xs font-bold uppercase tracking-widest mb-1">Email</div>
                                <div className="text-xl font-bold text-white break-words">Pratik.chaudhary@adypu.edu.in</div>
                            </div>

                            <div className="group p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-neon-cyan/50 transition-all hover:-translate-x-1">
                                <div className="text-deep-purple text-xs font-bold uppercase tracking-widest mb-1">Phone</div>
                                <div className="text-2xl font-bold text-white tracking-widest">+91 9209919155</div>
                            </div>
                        </div>

                        {/* Location / CTA */}
                        <div className="flex flex-col gap-6 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
                            <div className="bg-dark-bg p-8 rounded-3xl border border-white/10 relative z-10 h-full flex flex-col justify-between shadow-inner">
                                <div>
                                    <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                                        <span className="text-3xl">📍</span> HQ Location
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                                        Ajeenkya D Y Patil University,<br />
                                        Lohegaon, Pune,<br />
                                        Maharashtra, India
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <Link href="/" className="no-underline block">
                                        <Button
                                            fullWidth
                                            className="bg-neon-cyan text-black hover:bg-white font-black text-lg py-4 rounded-xl normal-case shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all transform hover:scale-[1.02] border-0"
                                        >
                                            Return to Homepage
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </ClientOnly>
    );
}
