"use client";

import { Dialog, DialogTitle, DialogContent, Typography, TextField, DialogActions, Button, CircularProgress } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createSiteVisit, extractErrorMessage } from "../lib/api";
import { useAuth } from "../context/AuthContext";

interface VisitDialogProps {
    open: boolean;
    onClose: () => void;
    propertyId?: string;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export default function VisitDialog({ open, onClose, propertyId, onSuccess, onError }: VisitDialogProps) {
    const { user } = useAuth(); // Auth Hook

    const schema = z.object({
        userId: z.string().optional(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        visitDate: z.string().refine((val) => new Date(val) > new Date(), "Date must be in future"),
    }).refine(data => data.userId || (data.name && data.email), {
        message: "Guest users must provide Name and Email",
        path: ["name"],
    });
    type FormVal = z.infer<typeof schema>;

    const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormVal>({
        resolver: zodResolver(schema),
        defaultValues: { userId: "", name: "", email: "", visitDate: "" }
    });

    const onSubmit = async (data: FormVal) => {
        if (!propertyId) return;
        try {
            await createSiteVisit({
                user_id: user?.id,
                name: data.name,
                email: data.email,
                property_id: propertyId,
                visit_date: data.visitDate
            });
            onSuccess();
            onClose();
            reset();
        } catch (err) {
            onError(extractErrorMessage(err));
        }
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            backgroundColor: 'rgba(20, 20, 30, 0.8)',
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
        '& .MuiInputLabel-root.Mui-focused': { color: 'var(--neon-cyan)' },
        '& .MuiInputBase-input::-webkit-calendar-picker-indicator': { filter: 'invert(1)' }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                className: "glass-panel rounded-3xl p-6 border border-white/10 bg-dark-bg/95 backdrop-blur-xl"
            }}
        >
            <DialogTitle className="font-black text-3xl text-center pb-2 text-white">
                Book <span className="text-neon-cyan">Site Visit</span>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="flex flex-col gap-6 pt-6">
                    <Typography variant="body1" className="text-gray-400 text-center mb-4">
                        Schedule an exclusive in-person tour of this future home.
                    </Typography>

                    {!user ? (
                        <>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Your Name" fullWidth variant="outlined" error={!!errors.name} helperText={errors.name?.message} sx={inputSx} />
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Your Email" fullWidth variant="outlined" error={!!errors.email} helperText={errors.email?.message} sx={inputSx} />
                                )}
                            />
                        </>
                    ) : (
                        <div className="bg-white/5 border border-neon-cyan/30 rounded-xl p-4 text-center">
                            <Typography variant="caption" className="text-neon-cyan font-bold tracking-wider uppercase">Logged in as</Typography>
                            <Typography className="text-white font-bold text-lg">{user.email}</Typography>
                        </div>
                    )}

                    <Controller
                        name="visitDate"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="datetime-local"
                                fullWidth
                                variant="outlined"
                                error={!!errors.visitDate}
                                helperText={errors.visitDate?.message}
                                sx={inputSx}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions className="justify-center gap-4 pb-6 px-6 mt-4">
                    <Button onClick={onClose} className="rounded-xl px-8 py-3 text-gray-400 hover:text-white hover:bg-white/10 font-bold normal-case">Cancel</Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting} className="rounded-xl px-10 py-3 bg-neon-cyan text-black hover:bg-white font-black normal-case shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                        {isSubmitting ? "Book..." : "Confirm Visit"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
