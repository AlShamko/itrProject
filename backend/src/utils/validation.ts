export function validateIdArray(ids: unknown): string | null {
    if (!Array.isArray(ids)) {
        return "Ids must be an array";
    }
    if (ids.length === 0) {
        return "Ids array must not be empty";
    }
    return null;
}
