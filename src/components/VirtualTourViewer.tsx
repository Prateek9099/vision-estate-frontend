import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";

interface VirtualTourProps {
    url?: string;
    title: string;
}

export default function VirtualTourViewer({ url, title }: VirtualTourProps) {
    const [open, setOpen] = useState(false);

    // Only show if URL exists (simulating availability)
    if (!url) return null;

    return (
        <Box className="my-8 border-t border-b border-gray-200 py-8">
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" className="font-bold text-gray-800">
                    360° Virtual Tour
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700"
                >
                    Start Virtual Tour
                </Button>
            </div>

            <div
                className="w-full h-64 bg-gray-100 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300"
                onClick={() => setOpen(true)}
            >
                <Typography variant="h6" className="text-gray-600 font-medium mb-2">
                    {title}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                    Tap to launch interactive 3D experience
                </Typography>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Feature Coming Soon</DialogTitle>
                <DialogContent>
                    <Typography>
                        The immersive 3D Virtual Tour feature is currently being upgraded for higher resolution.
                        Please check back later or schedule an in-person site visit.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Close
                    </Button>
                    <Button onClick={() => setOpen(false)} variant="contained" color="primary">
                        Notify Me
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
