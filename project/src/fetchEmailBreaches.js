export const fetchEmailBreaches = async (email) => {
    const response = await fetch(`https://api.xposedornot.com/v1/check-email/${email}`);
    if (!response.ok) {
        throw new Error('Failed to fetch email breaches');
    }
    const data = await response.json();
    return data;
};