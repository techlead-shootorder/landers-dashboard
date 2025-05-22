import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Extract the ID from query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate that ID is provided
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID parameter is required',
          message: 'Please provide an ID parameter'
        },
        { status: 400 }
      );
    }

    // Call the external API with dynamic ID
    const response = await fetch(
      `https://app.shootorder.com/items/lander/${id}/?access_token=Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control if needed
        cache: 'no-store', // or 'force-cache' depending on your needs
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: `HTTP error! status: ${response.status}`,
          message: 'Failed to fetch data from external API'
        },
        { status: response.status }
      );
    }

    // Parse the JSON response
    const data = await response.json();

    // Return successful response
    return NextResponse.json({
      success: true,
      data: data,
      message: 'Data fetched successfully'
    });

  } catch (error) {
    console.error('API Route Error:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        message: 'Internal server error occurred'
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST method if needed
export async function POST(request) {
  try {
    const body = await request.json();
    const { id, ...otherParams } = body;
    
    // Validate that ID is provided
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID parameter is required',
          message: 'Please provide an ID in the request body'
        },
        { status: 400 }
      );
    }
    
    // You can modify this to pass parameters to the external API
    const queryParams = new URLSearchParams({
      access_token: 'Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS',
      // Add other parameters from body if needed
      ...otherParams
    });

    const response = await fetch(
      `https://app.shootorder.com/items/lander/${id}/?${queryParams}`,
      {
        method: 'GET', // or POST if the external API expects POST
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: `HTTP error! status: ${response.status}`,
          message: 'Failed to fetch data from external API'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Data fetched successfully'
    });

  } catch (error) {
    console.error('API Route Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        message: 'Internal server error occurred'
      },
      { status: 500 }
    );
  }
}