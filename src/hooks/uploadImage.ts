import { BASE_URL } from '@/types/validationSchema';

export async function uploadImageToServer(file: File, folder = 'images') {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}upload/image?folder=${folder}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Image upload failed');

    const data = await response.json();

    if (data?.success && data?.result?.imageName) {
      return data.result.imageName; 
    } else {
      throw new Error(data?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
