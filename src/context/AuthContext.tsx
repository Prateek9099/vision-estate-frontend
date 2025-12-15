"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  // ⛔ During build / env missing → disable auth safely
  if (!supabase) {
    setUser(null);
    setLoading(false);
    return;
  }

  const checkSession = async () => {
    const { data } = await supabase!.auth.getSession();
    setUser(data.session?.user ?? null);
    setLoading(false);
  };

  checkSession();

  const { data: listener } = supabase!.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    }
  );

  return () => {
    listener?.subscription.unsubscribe();
  };
}, []);

    const signInWithGoogle = async () => {
    if (!supabase) {
        alert("Authentication is not configured.");
        return;
    }

    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) throw error;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        alert("Error logging in with Google.");
    }
};

const signOut = async () => {
    if (!supabase) return;

    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
