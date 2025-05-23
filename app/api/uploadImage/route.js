// api/uploadImage/route.js
export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

export async function POST(req) {
  try {
    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create new FormData for the external API
    const uploadFormData = new FormData();
    uploadFormData.append('image', new Blob([buffer], { type: file.type }), file.name);

    // Send to the upload API
    const uploadResponse = await fetch(
      `https://app.shootorder.com/files/?access_token=Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS`,
      {
        method: 'POST',
        body: uploadFormData,
      }
    );

    const result = await uploadResponse.json();
    
    if (!uploadResponse.ok) {
      return Response.json({ error: result.message || 'Upload failed' }, { status: uploadResponse.status });
    }

    return Response.json(result);
  } catch (error) {
    console.error('Error uploading image:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}