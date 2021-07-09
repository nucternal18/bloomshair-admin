export async function uploadImage(base64EncodedImage, url) {
  try {
    const response = await fetch(`${url}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: base64EncodedImage }),
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
}
