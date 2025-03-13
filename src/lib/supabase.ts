import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzqhveimckwkljjevvzg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cWh2ZWltY2t3a2xqamV2dnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MzY2MzEsImV4cCI6MjA1NzQxMjYzMX0.1t6Ea4lR53B37GAt2BRO0IZ82IfgtkoPDua5ScwOYfM';

export const supabase = createClient(supabaseUrl, supabaseKey); 