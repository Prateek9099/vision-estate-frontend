"use client";
import Link from "next/link";
import ClientOnly from "../../src/components/ClientOnly";
import { Container, Typography, Box, Card, CardContent, Chip } from "@mui/material";

export default function AboutPage() {
    return (
        <ClientOnly>
            <Container maxWidth="lg" className="py-12 min-h-screen">
                <Box className="mb-12 text-center">
                    <Typography variant="h3" className="font-bold text-gray-900 mb-4">
                        About Vision Estate
                    </Typography>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </Box>

                <div className="grid grid-cols-1 gap-8">
                    {/* Project Overview */}
                    <div className="w-full">
                        <Card className="shadow-lg border border-gray-100 rounded-2xl overflow-visible">
                            <CardContent className="p-8">
                                <Typography variant="h5" className="font-bold text-blue-800 mb-4">
                                    Project Description
                                </Typography>
                                <Typography variant="body1" className="text-gray-700 leading-relaxed text-lg">
                                    Vision Estate is an AI-powered real estate platform designed to simplify property discovery, comparison, and site visit scheduling. By leveraging advanced data analytics and a user-centric interface, we bridge the gap between potential buyers and their dream eco-friendly homes.
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Problem Statement */}
                        <div className="h-full">
                            <Card className="h-full shadow-md border-l-4 border-red-500 rounded-xl hover:shadow-xl transition-shadow">
                                <CardContent className="p-6">
                                    <Typography variant="h6" className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        ⚠️ Problem Statement
                                    </Typography>
                                    <Typography variant="body1" className="text-gray-600">
                                        Traditional property search lacks personalization, eco-awareness, and seamless digital interaction. Buyers often struggle with fragmented information and difficult scheduling processes for site visits.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Solution/Key Features */}
                        <div className="h-full">
                            <Card className="h-full shadow-md border-l-4 border-green-500 rounded-xl hover:shadow-xl transition-shadow">
                                <CardContent className="p-6">
                                    <Typography variant="h6" className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        ✨ Key Features
                                    </Typography>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                        <li><strong>AI Assistant:</strong> Intelligent rule-based support for queries.</li>
                                        <li><strong>Eco-Score:</strong> Sustainability ratings for informed choices.</li>
                                        <li><strong>Visual Listings:</strong> High-quality imagery and details.</li>
                                        <li><strong>Site Visits:</strong> Instant booking and scheduling system.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="w-full">
                        <Box className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-2xl">
                            <Typography variant="h5" className="font-bold mb-6 text-center border-b border-gray-700 pb-4">
                                Technology Stack
                            </Typography>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <Typography className="text-blue-400 font-bold mb-2">Frontend</Typography>
                                    <Chip label="Next.js" className="bg-white text-gray-900 font-medium" />
                                </div>
                                <div className="text-center">
                                    <Typography className="text-green-400 font-bold mb-2">Backend</Typography>
                                    <Chip label="Node.js / Express" className="bg-white text-gray-900 font-medium" />
                                </div>
                                <div className="text-center">
                                    <Typography className="text-purple-400 font-bold mb-2">Database</Typography>
                                    <Chip label="PostgreSQL (Supabase)" className="bg-white text-gray-900 font-medium" />
                                </div>
                                <div className="text-center">
                                    <Typography className="text-yellow-400 font-bold mb-2">Styling</Typography>
                                    <Chip label="MUI / Tailwind" className="bg-white text-gray-900 font-medium" />
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
            </Container>
        </ClientOnly>
    );
}
