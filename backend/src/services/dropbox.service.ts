interface DropboxTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token?: string;
    account_id: string;
    uid: string;
}

export const uploadToDropbox = async (
    content: string,
    filename: string
): Promise<void> => {
    const {DROPBOX_APP_KEY, DROPBOX_APP_SECRET, DROPBOX_REFRESH_TOKEN} =
        process.env;

    const tokenResponse = await fetch("https://api.dropbox.com/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(`${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`).toString(
                    "base64"
                ),
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: DROPBOX_REFRESH_TOKEN as string,
        }),
    });

    const tokenData = (await tokenResponse.json()) as DropboxTokenResponse;
    if (!tokenResponse.ok) {
        throw new Error(`Failed to refresh Dropbox token: ${JSON.stringify(tokenData)}`);
    }

    const uploadResponse = await fetch(
        "https://content.dropboxapi.com/2/files/upload",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
                "Dropbox-API-Arg": JSON.stringify({
                    path: `/support_tickets/${filename}`,
                    mode: "add",
                    autorename: true,
                    mute: false,
                    strict_conflict: false,
                }),
                "Content-Type": "application/octet-stream",
            },
            body: content,
        }
    );

    if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(
            `Dropbox upload failed: ${uploadResponse.status} - ${errorText}`
        );
    }
};
