 import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
 
 export async function GET(request: NextRequest) {
  const requestURL = new URL(request.url)
  const code = requestURL.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${requestURL.origin}/auth/error`)
  }

  const supabase = await createClient()
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.redirect(`${requestURL.origin}/auth/error?message=auth_failed`)
    }

    if (user) {
      const userId = user.id

      // Aca vas a verificar si ya existe el UUID del usuario en la tabla user_data
      const { data: existsUser, error: queryError } = await supabase
        .from("user_data")
        .select("*")
        .eq("user_id", userId)
        .single()

        console.log('existsUser:', existsUser)
      // Si no existe, creamos el registro
      if (queryError || !existsUser) {
        const { error: insertError } = await supabase
          .from("user_data")
          .insert({
            user_id: userId,
            user_name: user.user_metadata.display_name ?? 'USER_NOT_FOUND',
            
            created_at: new Date().toISOString()
          })

        if (insertError) {
          console.error('Insert error:', insertError)
          
        }
      }
    }

    // Redirigir a success
    return NextResponse.redirect(`${requestURL.origin}/auth/success`)

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.redirect(`${requestURL.origin}/auth/error?message=unexpected_error`)
  }
}