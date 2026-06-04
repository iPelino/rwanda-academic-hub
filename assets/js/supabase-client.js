/**
 * Rwanda Academic Hub — Supabase Client
 *
 * Single shared client instance for the entire frontend.
 * Import this module in every page script that needs Supabase.
 *
 * Usage (ES module):
 *   import { supabase } from '/assets/js/supabase-client.js';
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL  = 'https://hiknnwnnccqzmcdvxoql.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpa25ud25uY2Nxem1jZHZ4b3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MDQwMTksImV4cCI6MjA5NjA4MDAxOX0.vq-UrvKt03k7cRsSDINmEYobf4X3vCnD0NU6KQ4FHAc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    // Persist session in localStorage so users stay logged in across pages
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,        // handles OAuth & magic-link redirects
  },
});
