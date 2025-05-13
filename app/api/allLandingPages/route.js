// app/api/allLandingPage/route.js
export async function GET() {
  try {
    const res = await fetch('https://app.shootorder.com/items/lander/?access_token=Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS');

    if (!res.ok) {
      return new Response('Failed to fetch data', { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
