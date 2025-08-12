const API_URL = process.env.REACT_APP_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchBinData = async () => {
    const res = await fetch(API_URL, { headers: { 'X-Master-Key': API_KEY } });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
};

export const putBinData = async (record) => {
    const res = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY,
        },
        body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error('Failed to save');
    return res.json();
};
