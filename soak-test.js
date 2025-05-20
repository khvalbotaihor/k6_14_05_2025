import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '5m', target: 1000 }, // Ramp up to 100 users over 5 minutes
        { duration: '8h', target: 10 }, // Stay at 100 users for 10 minutes
        { duration: '5m', target: 0 }, // Ramp down to 0 users over 5 minutes
    ]
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1); // Sleep for 1 second between requests
    http.get('https://test.k6.io/contact.php');
    sleep(2); // Sleep for 1 second between requests
    http.get('https://test.k6.io/news.php');
    sleep(2); // Sleep for 1 second between requests
}