import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box component="footer" className="bg-dark-bg text-white pt-16 pb-8 mt-auto border-t border-white/10">
            <Container maxWidth="lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <Typography variant="h6" className="font-bold mb-4 text-white">Vision Estate</Typography>
                        <Typography variant="body2" className="text-gray-400 leading-relaxed">
                            Revolutionizing property discovery with AI-powered insights and seamless digital experiences.
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="subtitle2" className="font-bold mb-4 text-neon-cyan uppercase tracking-wider">Features</Typography>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Property Listings</li>
                            <li>Virtual Tours</li>
                            <li>Eco-Score Ratings</li>
                            <li>Instant Booking</li>
                        </ul>
                    </div>
                    <div>
                        <Typography variant="subtitle2" className="font-bold mb-4 text-neon-cyan uppercase tracking-wider">Academic</Typography>
                        <Typography variant="body2" className="text-gray-400 leading-relaxed">
                            Submitted as Final Year Project.
                            <br />
                            Frontend: Next.js
                            <br />
                            Backend: Node.js/Express
                        </Typography>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 text-center">
                    <Typography variant="caption" className="text-gray-500">
                        © {new Date().getFullYear()} Vision Estate. All rights reserved. Not for commercial use.
                    </Typography>
                </div>
            </Container>
        </Box>
    );
}
