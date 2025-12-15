// app/property/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById, createBooking, createSiteVisit, Property, extractErrorMessage } from "../../../src/lib/api";
import ClientOnly from "../../../src/components/ClientOnly";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../../../src/context/AuthContext";
import VirtualTourViewer from "../../../src/components/VirtualTourViewer";
import VisitDialog from "../../../src/components/VisitDialog";

// Zod Schemas
const bookingSchema = z.object({
  userId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  initialPayment: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Initial payment must be a valid number",
  }),
}).refine(data => data.userId || (data.name && data.email), {
  message: "Guest users must provide Name and Email",
  path: ["name"], // Attach error to name
});


type BookingFormValues = z.infer<typeof bookingSchema>;


export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { user } = useAuth(); // Auth Hook
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Snackbar State
  const [snack, setSnack] = useState<{ open: boolean; severity: "success" | "error"; msg: string }>({
    open: false,
    severity: "success",
    msg: "",
  });

  // Visit Dialog State
  const [visitOpen, setVisitOpen] = useState(false);

  // Forms
  const { control: bookingControl, handleSubmit: handleBookingSubmit, formState: { errors: bookingErrors, isSubmitting: bookingSubmitting }, reset: resetBooking } = useForm<BookingFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(bookingSchema) as any,
    defaultValues: { userId: "", name: "", email: "", initialPayment: "0" },
  });


  useEffect(() => {
    if (!id) return;
    const loadProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPropertyById(String(id));
        setProperty(data);
      } catch (err: unknown) {
        console.error("loadProperty error:", err);
        setError(extractErrorMessage(err) || "Failed to load property");
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id]);

  const onBookingSubmit = async (data: BookingFormValues) => {
    if (!property) return;
    try {
      const payload = {
        user_id: user?.id,
        name: data.name,
        email: data.email,
        property_id: property.id,
        initial_payment: Number(data.initialPayment),
      };
      const res = await createBooking(payload);
      setSnack({ open: true, severity: "success", msg: `Booking confirmed! ID: ${res.id}` });
      resetBooking();
    } catch (err: unknown) {
      setSnack({ open: true, severity: "error", msg: extractErrorMessage(err) });
    }
  };


  const imgSrc = property?.thumbnail_url ?? (property ? `/images/${property.id}.jpg` : "/placeholder.jpg");

  // Custom Input Styling for Dark Theme
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      color: '#ffffff',
      backgroundColor: 'rgba(20, 20, 30, 0.6)',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
      '&:hover fieldset': { borderColor: 'var(--neon-cyan)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--neon-cyan)' },
      borderRadius: '12px'
    },
    '& .MuiInputBase-input': {
      color: '#ffffff',
      caretColor: '#ffffff',
      '&::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1 }
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'var(--neon-cyan)' }
  };

  return (
    <ClientOnly>
      <Container maxWidth="xl" className="py-8 min-h-screen relative z-10">
        <Button onClick={() => router.back()} className="mb-6 text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-6">
          ← Back to listings
        </Button>

        {loading ? (
          <Box className="flex justify-center items-center h-64">
            <CircularProgress sx={{ color: 'var(--neon-cyan)' }} />
          </Box>
        ) : error ? (
          <Alert severity="error" className="max-w-md mx-auto glass-panel text-red-200 border-red-500/30">{error}</Alert>
        ) : !property ? (
          <Box className="text-center py-10 glass-panel">
            <Typography variant="h6" className="text-gray-300">Property not found.</Typography>
          </Box>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Image & Details */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="relative h-[600px] bg-dark-bg rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-deep-purple/20 animate-pulse opacity-50"></div>
                <img
                  src={imgSrc}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x600?text=Image+Not+Found';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent"></div>

                <div className="absolute bottom-10 left-10 text-white max-w-2xl">
                  <Chip
                    label={property.eco_score ? `Eco Score: ${property.eco_score}` : "Eco Certified"}
                    className="bg-green-500/20 backdrop-blur-md text-green-300 font-bold border border-green-500/50 mb-4"
                  />
                  <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{property.title}</h1>
                  <p className="text-2xl font-light text-gray-300 flex items-center gap-2">
                    <span className="text-neon-cyan">📍</span> {property.location ?? "Location not specified"}
                  </p>
                </div>
              </div>

              <div className="glass-panel rounded-3xl p-10">
                <Typography variant="h5" className="font-bold mb-8 text-white border-b border-white/10 pb-4 inline-block">
                  About this home
                </Typography>
                <Typography variant="body1" className="text-gray-300 leading-8 text-lg font-light">
                  {property.description || "Designed for the modern visionary, this property blends AI-optimized living spaces with sustainable architecture. Feature-rich and future-proof, it represents the pinnacle of Vision Estate's curated collection."}
                </Typography>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                  {[
                    { label: "Type", value: `${property.bhk ?? "?"} BHK` },
                    { label: "Area", value: `${property.area ?? "?"} sqft` },
                    { label: "Status", value: "Available", color: "text-green-400" },
                    { label: "Prop ID", value: `#${property.id.slice(0, 4)}`, truncate: true }
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-white/5 rounded-2xl text-center border border-white/5 hover:border-neon-cyan/30 transition-colors">
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{item.label}</p>
                      <p className={`font-black text-xl ${item.color || 'text-white'}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Virtual Tour Section */}
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="bg-dark-bg p-4 flex items-center gap-3 border-b border-white/10">
                  <span className="animate-pulse w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-white font-bold tracking-wider text-sm uppercase">Live Virtual Tour</span>
                </div>
                <VirtualTourViewer title={property.title} url={property.model_3d_url} />
              </div>
            </div>

            {/* Forms Section / Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {/* Price Card */}
                <Card className="glass-panel border-0 rounded-3xl p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/20 blur-[60px] rounded-full"></div>

                  <p className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-2">Total Price</p>
                  <Typography variant="h3" className="font-black text-white mb-8 tracking-tight">
                    ₹{Number(property.price || 0).toLocaleString()}
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => setVisitOpen(true)}
                    className="py-4 bg-neon-cyan text-black hover:bg-white hover:text-black font-black text-lg rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 transition-all mb-4 normal-case"
                  >
                    Book Site Visit
                  </Button>

                  <p className="text-xs text-center text-gray-500 font-medium mt-4">
                    <span className="text-green-400">✔</span> Free cancellation up to 24h before
                  </p>
                </Card>

                {/* Direct Booking Form */}
                <Card className="glass-panel border-0 rounded-3xl p-8">
                  <Typography variant="h6" className="font-bold mb-6 flex items-center gap-3 text-white">
                    <span className="text-2xl">⚡</span> Instant Booking
                  </Typography>

                  <form onSubmit={handleBookingSubmit(onBookingSubmit)} className="flex flex-col gap-5">
                    {!user && (
                      <>
                        <Controller
                          name="name"
                          control={bookingControl}
                          render={({ field }) => (
                            <TextField {...field} label="Name" fullWidth variant="outlined" size="small" error={!!bookingErrors.name} helperText={bookingErrors.name?.message} sx={inputSx} />
                          )}
                        />
                        <Controller
                          name="email"
                          control={bookingControl}
                          render={({ field }) => (
                            <TextField {...field} label="Email" fullWidth variant="outlined" size="small" error={!!bookingErrors.email} helperText={bookingErrors.email?.message} sx={inputSx} />
                          )}
                        />
                      </>
                    )}
                    {user && (
                      <div className="bg-white/5 border border-neon-cyan/30 rounded-xl p-3 text-center">
                        <Typography variant="caption" className="text-neon-cyan font-bold tracking-wider">LOGGED IN AS</Typography>
                        <Typography className="text-white font-medium text-sm">{user.email}</Typography>
                      </div>
                    )}
                    <Controller
                      name="initialPayment"
                      control={bookingControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          label="Token Amount (₹)"
                          fullWidth
                          variant="outlined"
                          size="small"
                          error={!!bookingErrors.initialPayment}
                          helperText={bookingErrors.initialPayment?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          sx={inputSx}
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      disabled={bookingSubmitting}
                      className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 py-3.5 rounded-xl font-bold normal-case tracking-wide mt-2"
                    >
                      {bookingSubmitting ? <CircularProgress size={24} color="inherit" /> : "Confirm Token"}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Real Site Visit Dialog */}
        <VisitDialog open={visitOpen} onClose={() => setVisitOpen(false)} propertyId={property?.id} onSuccess={() => setSnack({ open: true, severity: "success", msg: "Visit Scheduled!" })} onError={(m) => setSnack({ open: true, severity: "error", msg: m })} />

        <Snackbar open={snack.open} autoHideDuration={6000} onClose={() => setSnack({ ...snack, open: false })}>
          <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })} variant="filled" sx={{ width: '100%', bgcolor: snack.severity === 'success' ? 'var(--neon-cyan)' : undefined, color: 'black', fontWeight: 'bold' }}>
            {snack.msg}
          </Alert>
        </Snackbar>
      </Container>
    </ClientOnly>
  );
}

// Sub-component removed; imported from src/components/VisitDialog.tsx