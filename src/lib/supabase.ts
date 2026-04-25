import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aajshhqtnpexikjnhdwj.supabase.co'
const supabaseKey = 'sb_publishable_3ohtfwb9sYfN7K16XbA1sA_byiYfkRb'

export const supabase = createClient(supabaseUrl, supabaseKey)
