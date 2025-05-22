// app/api/updateData/route.js

export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const state = await req.json();

    if (!state) {
      return new Response(JSON.stringify({ error: 'data is required' }), {
        status: 400,
      });
    }

    const accessToken = "Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS";

    const response = await fetch(
      `https://app.shootorder.com/items/lander/${id}/?access_token=${accessToken}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: errorData }), {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
