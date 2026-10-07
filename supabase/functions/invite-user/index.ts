import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify the caller is an authenticated user (optional but recommended)
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ success: false, error: 'No authorization header' }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
    if (authError || !user) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Parse request body
    const { email, role, redirectTo } = await req.json()

    if (!email) {
      return new Response(JSON.stringify({ success: false, error: 'Email is required' }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Use Admin API to send the invite email natively
    // We pass the role in user metadata in case a Database Trigger on auth.users requires it!
    const { data, error } = await supabaseClient.auth.admin.inviteUserByEmail(email, {
      data: { role: role },
      redirectTo: redirectTo || undefined
    })

    if (error) {
       return new Response(JSON.stringify({ success: false, error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    return new Response(JSON.stringify({ success: true, user: data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  }
})
