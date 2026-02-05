import { createServiceClient } from '@/lib/supabase/service'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, email, name, accountType, businessId } = body

    // Validate required fields
    if (!userId || !email || !name || !accountType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Use service client to bypass RLS (needed during signup when session isn't fully established)
    const serviceClient = createServiceClient()

    // Verify the user exists in auth.users (basic validation)
    const { data: authUser, error: authError } = await serviceClient.auth.admin.getUserById(userId)
    
    if (authError || !authUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Call the database function that bypasses RLS
    const { error: profileError } = await serviceClient.rpc('create_user_profile', {
      p_user_id: userId,
      p_email: email,
      p_name: name,
      p_account_type: accountType,
      p_business_id: businessId || null,
    })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error creating profile:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
