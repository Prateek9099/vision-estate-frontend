// app/page.tsx
"use client";
import ClientOnly from "../src/components/ClientOnly";
import { useEffect, useState } from "react";
import { getProperties, Property, extractErrorMessage } from "../src/lib/api";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import { PropertyCard } from "../src/components/PropertyCard";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err: unknown) {
        console.error(err);
        setError(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <ClientOnly>
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-dark-bg">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon-cyan/20 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-deep-purple/20 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center mask-image-gradient-b"></div>
        </div>

        <Container maxWidth="lg" className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border border-neon-cyan/30 animate-float">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
            </span>
            <span className="text-neon-cyan text-xs font-bold tracking-widest uppercase">AI-Powered Real Estate</span>
          </div>

          <Typography variant="h1" className="font-black text-6xl md:text-8xl mb-6 tracking-tighter text-white drop-shadow-2xl">
            Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-deep-purple">Living</span>
          </Typography>

          <Typography variant="h5" className="mb-12 text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Experience immersive 3D tours, instant AI valuations, and eco-certified premium homes in the heart of the smart city.
          </Typography>

          <div className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto">
            <button
              className="group relative px-8 py-4 bg-neon-cyan text-black font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,243,255,0.4)]"
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              EXPLORE PROPERTIES
            </button>
            <button
              className="px-8 py-4 glass-panel border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all hover:border-white/40 tracking-wide"
              onClick={() => window.location.href = '/about'}
            >
              LEARN MORE
            </button>
          </div>
        </Container>
      </div>

      <Container maxWidth="xl" className="py-20 relative z-10">

        {/* Featured Header */}
        <Box className="flex items-end justify-between mb-16 px-4 border-b border-white/10 pb-6">
          <div>
            <Typography variant="h2" className="font-black text-white text-4xl md:text-5xl mb-2">
              Featured <span className="text-neon-cyan">Listings</span>
            </Typography>
            <p className="text-gray-400">Curated premium properties with top Eco-Scores.</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-neon-cyan font-mono text-xl font-bold">{properties.length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Properties Available</p>
          </div>
        </Box>

        {loading ? (
          <Box className="flex justify-center items-center h-64">
            <CircularProgress sx={{ color: 'var(--neon-cyan)' }} />
          </Box>
        ) : error ? (
          <Alert severity="error" className="max-w-md mx-auto glass-panel text-red-200 border-red-500/30">
            {error === "Network Error" ? "Backend unreachable. Please ensure the server is running on port 4000." : error}
          </Alert>
        ) : properties.length === 0 ? (
          <Box className="text-center py-20 glass-panel rounded-3xl mx-auto max-w-2xl">
            <Typography variant="h6" className="text-gray-300">No properties found.</Typography>
            <Typography variant="body2" className="text-gray-500 mt-2">Seed the database in Supabase to see listings here.</Typography>
          </Box>
        ) : (
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </Box>
        )}

        {/* Why Vision Estate Section */}
        <Box className="mt-32 mb-20">
          <Typography variant="h3" className="font-black text-white text-center mb-16">
            Why Vision Estate?
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🤖", title: "AI-Powered", desc: "Smart matching algorithms finding your perfect home." },
              { icon: "🌱", title: "Eco-Certified", desc: "Every listing verified for sustainability and carbon footprint." },
              { icon: "🕶️", title: "VR Ready", desc: "Tour properties from your couch with immersive Virtual Reality." }
            ].map((item, i) => (
              <div key={i} className="glass-panel p-10 rounded-3xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 group border border-white/5">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform shadow-neon-sm border border-white/10">
                  {item.icon}
                </div>
                <Typography variant="h5" className="font-bold mb-3 text-white">{item.title}</Typography>
                <Typography className="text-gray-400 leading-relaxed font-light">{item.desc}</Typography>
              </div>
            ))}
          </div>
        </Box>

      </Container>
    </ClientOnly>
  );
}