import jsforce from "jsforce";

interface SalesforceUserData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone?: string;
}

interface SalesforceResult {
    accountId: string;
    contactId: string;
}

export const syncUserToSalesforce = async (
    userData: SalesforceUserData
): Promise<SalesforceResult> => {
    const {
        SF_LOGIN_URL,
        SF_CLIENT_ID,
        SF_CLIENT_SECRET,
        SF_USERNAME,
        SF_PASSWORD,
        SF_TOKEN,
    } = process.env;

    if (
        !SF_USERNAME ||
        !SF_PASSWORD ||
        !SF_TOKEN ||
        !SF_CLIENT_ID ||
        !SF_CLIENT_SECRET
    ) {
        throw new Error(
            "Missing Salesforce configuration. Check SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_CLIENT_ID, and SF_CLIENT_SECRET."
        );
    }

    const conn = new jsforce.Connection({
        oauth2: {
            loginUrl: SF_LOGIN_URL || "https://login.salesforce.com",
            clientId: SF_CLIENT_ID,
            clientSecret: SF_CLIENT_SECRET,
        },
    });

    try {
        await conn.login(SF_USERNAME, SF_PASSWORD + (SF_TOKEN || ""));
    } catch (err: any) {
        throw new Error(
            `Salesforce Authentication Failed: ${err.message}. Ensure credentials are correct.`
        );
    }

    const accountResult = await conn.sobject("Account").create({
        Name: userData.company,
        Phone: userData.phone,
    });

    if (!accountResult.success) {
        throw new Error(
            `Failed to create Account: ${JSON.stringify(accountResult.errors)}`
        );
    }

    const contactResult = await conn.sobject("Contact").create({
        FirstName: userData.firstName,
        LastName: userData.lastName,
        Email: userData.email,
        AccountId: accountResult.id,
        Phone: userData.phone,
    });

    if (!contactResult.success) {
        throw new Error(
            `Failed to create Contact: ${JSON.stringify(contactResult.errors)}`
        );
    }

    return {accountId: accountResult.id!, contactId: contactResult.id!};
};
