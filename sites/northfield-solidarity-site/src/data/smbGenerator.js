export const MAJOR_CITIES = [
    { name: "New York", lat: 40.7128, lng: -74.0060, weight: 1.0 },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437, weight: 0.8 },
    { name: "Chicago", lat: 41.8781, lng: -87.6298, weight: 0.7 },
    { name: "Houston", lat: 29.7604, lng: -95.3698, weight: 0.6 },
    { name: "Phoenix", lat: 33.4484, lng: -112.0740, weight: 0.5 },
    { name: "Philadelphia", lat: 39.9526, lng: -75.1652, weight: 0.5 },
    { name: "San Antonio", lat: 29.4241, lng: -98.4936, weight: 0.4 },
    { name: "San Diego", lat: 32.7157, lng: -117.1611, weight: 0.4 },
    { name: "Dallas", lat: 32.7767, lng: -96.7970, weight: 0.4 },
    { name: "San Jose", lat: 37.3382, lng: -121.8863, weight: 0.4 }
];

// Generate gaussian random number
const randn_bm = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

export const generateSMBPoints = (count = 5000) => {
    const points = [];
    const industries = ['Dentist', 'Bakery', 'HVAC', 'Plumber', 'Lawyer', 'Accountant'];

    for (let i = 0; i < count; i++) {
        // Pick a random city based on weight
        const city = MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)]; // Simplified uniform for now

        // Add gaussian noise to simulate suburbs/region
        // 1 degree ~ 69 miles. We want a spread of ~20 miles (0.3 deg)
        const latSpread = 0.3;
        const lngSpread = 0.3;

        points.push({
            id: i,
            lat: city.lat + (randn_bm() * latSpread),
            lng: city.lng + (randn_bm() * lngSpread),
            type: industries[Math.floor(Math.random() * industries.length)],
            revenue: Math.floor(Math.random() * 2000000) + 100000,
            painPoint: "High CAC, Low Retention" // Placeholder default
        });
    }
    return points;
};
