export async function GET() {
  try {
    const response = await fetch('https://app.shootorder.com/users/?access_token=Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS');

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
