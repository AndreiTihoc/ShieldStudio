// src/fetchIP.js
export const fetchIPData = () => {
    return fetch('http://ip-api.com/json/?fields=query,country,regionName,city,isp,org,proxy,mobile,lat,lon')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching IP data:', error);
            throw error;
        });
};