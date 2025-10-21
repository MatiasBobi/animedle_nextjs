import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const requestURL  = new URL(request.url)
  const code = requestURL.searchParams.get('code')

  if (code !== null) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redireccionar a el error
  redirect(requestURL.origin)
}