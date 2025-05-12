// app/api/login/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get request body
    const body = await request.json();
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Call the external API
    const response = await fetch('https://app.shootorder.com/auth/login/?access_token=Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    // console.log("data", data)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Authentication failed' },
        { status: response.status }
      );
    }

    // Return success response with user data and access token
    return NextResponse.json({
      success: true,
      loginData: data.data,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}