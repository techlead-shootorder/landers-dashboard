import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Extract data from the request body
    const {
      name,
      company_name,
      domain,
      email,
      phone,
      whatsapp_number
    } = body;

    // Validate required fields
    if (!name || !company_name || !email) {
      return NextResponse.json(
        { error: 'Name, Company Name, and Email are required fields' },
        { status: 400 }
      );
    }

    // Prepare data for the external API
    const apiData = {
      name: name,
      company_name: company_name,
      domain: domain || '',
      email: email,
      phone: parseInt(phone) || null,
      whatsapp_number: parseInt(whatsapp_number) || null
    };

    // Make the API call to create landing page
    const response = await fetch('https://app.shootorder.com/items/lander/?access_token=Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          error: 'Failed to create landing page',
          details: errorData,
          status: response.status 
        },
        { status: response.status }
      );
    }

    // Parse the successful response
    const responseData = await response.json();

    // Return success response with the created data
    return NextResponse.json({
      success: true,
      message: 'Landing page created successfully',
      data: responseData
    });

  } catch (error) {
    console.error('Error creating landing page:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to fetch existing landing page data
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Landing page ID is required' },
        { status: 400 }
      );
    }

    // Fetch specific landing page data
    const response = await fetch(`https://app.shootorder.com/items/lander/${id}?access_token=Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS`);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch landing page data' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('Error fetching landing page:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}