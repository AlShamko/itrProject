
interface DropboxTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
  account_id: string;
  uid: string;
}

export const uploadToDropbox = async (content: string, filename: string): Promise<void> => {
  const { DROPBOX_APP_KEY, DROPBOX_APP_SECRET, DROPBOX_REFRESH_TOKEN } = process.env;

  try {
    const tokenResponse = await fetch('https://api.dropbox.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: DROPBOX_REFRESH_TOKEN as string
      })
    });

    const tokenData = await tokenResponse.json() as DropboxTokenResponse;
    if (!tokenResponse.ok) {
      throw new Error(`Failed to refresh token: ${JSON.stringify(tokenData)}`);
    }
    const accessToken = tokenData.access_token;

    const uploadUrl = 'https://content.dropboxapi.com/2/files/upload';
    const apiArgs = {
      path: `/support_tickets/${filename}`,
      mode: 'add',
      autorename: true,
      mute: false,
      strict_conflict: false
    };

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify(apiArgs),
        'Content-Type': 'application/octet-stream'
      },
      body: content
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Dropbox upload failed: ${response.status} - ${errorText}`);
    }

    console.log(`Successfully uploaded ${filename} to Dropbox.`);
  } catch (error) {
    console.error("Dropbox Integration Error:", error);
    throw error;
  }
};