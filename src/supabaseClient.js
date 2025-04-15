import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uezxjyacpduqkgpexako.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlenhqeWFjcGR1cWtncGV4YWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTE3OTYsImV4cCI6MjA2MDI2Nzc5Nn0.Fh8rQi_MS-anLP4qqMdx01U9Y6u-Z1zZddpwevY4nys';

export const supabase = createClient(supabaseUrl, supabaseKey);
