
export const uploadToDropbox = async (content: string, filename: string): Promise<void> => {
  const token = process.env.DROPBOX_ACCESS_TOKEN;
  
  if (!token) {
    console.warn("DROPBOX_ACCESS_TOKEN is not set. Skipping upload.");
    return;
  }

  const url = 'https://content.dropboxapi.com/2/files/upload';
  const apiArgs = {
    path: `/support_tickets/${filename}`,
    mode: 'add',
    autorename: true,
    mute: false,
    strict_conflict: false
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Dropbox-API-Arg': JSON.stringify(apiArgs),
        'Content-Type': 'application/octet-stream'
      },
      body: content
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Dropbox upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    console.log(`Successfully uploaded ${filename} to Dropbox.`);
  } catch (error) {
    console.error("Error uploading to Dropbox:", error);
    throw error;
  }
};
