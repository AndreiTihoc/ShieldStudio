import { fetchEmailBreaches } from './fetchEmailBreaches.js';

const testFetchEmailBreaches = async () => {
    const email = 'admin@gmail.com';
    try {
        const data = await fetchEmailBreaches(email);
        console.log('Email Breach Data:', data);
    } catch (error) {
        console.error('Error fetching email breaches:', error);
    }
};

testFetchEmailBreaches();