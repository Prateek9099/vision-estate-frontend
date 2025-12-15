
import React from 'react';
import { Dialog, DialogContent, Button, Typography, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
    const { signInWithGoogle } = useAuth();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                className: "rounded-3xl p-4 max-w-sm w-full bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl"
            }}
        >
            <DialogContent className="flex flex-col items-center gap-6 p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-3xl mb-2 shadow-inner">
                    🔐
                </div>

                <div>
                    <Typography variant="h5" className="font-bold text-gray-900 mb-2">
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                        Sign in to access your saved properties and manage viewings.
                    </Typography>
                </div>

                <div className="w-full space-y-3">
                    <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        onClick={() => {
                            signInWithGoogle();
                            onClose();
                        }}
                        className="py-3 px-4 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl font-bold normal-case flex items-center gap-3"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </Button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400">Or continue as guest</span>
                        </div>
                    </div>

                    <Button
                        fullWidth
                        size="large"
                        onClick={onClose}
                        className="text-gray-500 hover:bg-gray-50 rounded-xl normal-case"
                    >
                        Maybe later
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
