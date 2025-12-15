"use client";
import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [mounted, setMounted] = React.useState(false);
    const { user, signOut } = useAuth();
    const [authModalOpen, setAuthModalOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const pathname = usePathname();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        signOut();
        handleClose();
    };

    const isActive = (path: string) => pathname === path;

    if (!mounted) return <div className="h-24 bg-dark-bg" />;

    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={0}
            className="glass-panel border-b-0 z-50 transition-all duration-300 top-4 mx-auto w-[95%] rounded-2xl"
            sx={{ maxWidth: '1400px', left: 0, right: 0 }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters className="h-20 justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="no-underline flex items-center gap-4 group">
                        <div className="relative h-14 w-auto flex items-center justify-start">
                            <img
                                src="/images/logo.png"
                                alt="Vision Estate"
                                className="h-full w-auto object-contain filter drop-shadow-[0_0_8px_rgba(0,243,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.6)] transition-all duration-300"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
                        {['/', '/about', '/contact'].map((path) => (
                            <Link key={path} href={path} className="no-underline relative group">
                                <span className={`text-base font-medium px-2 py-1 transition-all duration-300 ${isActive(path)
                                    ? 'text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]'
                                    : 'text-gray-400 group-hover:text-white'
                                    }`}>
                                    {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
                                </span>
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-neon-cyan transition-all duration-300 shadow-[0_0_8px_rgba(0,243,255,0.8)] ${isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                            </Link>
                        ))}

                        {/* User Profile / Auth */}
                        {user ? (
                            <>
                                <div
                                    className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-1.5 pr-4 rounded-full transition-all border border-white/10 hover:border-neon-cyan/50 group"
                                    onClick={handleMenu}
                                >
                                    <Avatar
                                        src={user.user_metadata.avatar_url}
                                        alt={user.user_metadata.full_name || user.email}
                                        className="w-9 h-9 border-2 border-transparent group-hover:border-neon-cyan transition-colors"
                                    >
                                        {(user.user_metadata.full_name || user.email || 'U')[0].toUpperCase()}
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <Typography className="text-sm font-bold text-white leading-none">
                                            {user.user_metadata.full_name?.split(' ')[0] || "User"}
                                        </Typography>
                                        <Typography className="text-[10px] text-neon-cyan font-mono tracking-wider leading-none mt-1">
                                            ONLINE
                                        </Typography>
                                    </div>
                                </div>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        className: "glass-panel rounded-xl mt-4 min-w-[200px] text-white backdrop-blur-xl bg-dark-bg/90"
                                    }}
                                >
                                    <div className="px-4 py-3 border-b border-white/10 mb-2">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Signed in as</p>
                                        <p className="text-sm font-bold text-white truncate max-w-[150px]">{user.email}</p>
                                    </div>
                                    <MenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 font-bold text-sm mx-2 rounded-lg hover:bg-white/5">
                                        LOGOUT
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                className="text-white font-bold hover:text-neon-cyan px-6 py-2 rounded-full transition-all normal-case tracking-wide hover:bg-white/5 border border-transparent hover:border-white/10"
                                onClick={() => setAuthModalOpen(true)}
                            >
                                Login
                            </Button>
                        )}

                        <Link href="/contact" className="no-underline">
                            <Button
                                variant="contained"
                                className="bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 font-bold rounded-full px-8 py-2.5 shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] transform hover:-translate-y-0.5 transition-all text-sm tracking-wider normal-case"
                            >
                                BOOK VISIT
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>

            <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </AppBar>
    );
}
