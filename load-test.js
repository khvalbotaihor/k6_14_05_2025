import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    //vus: 100, // Number of virtual users
    //duration: '30m', // Duration of the test
    stages: [
        { duration: '10s', target: 10 }, // Ramp up to 100 users over 5 minutes
        { duration: '30s', target: 10 }, // Stay at 100 users for 10 minutes
        { duration: '10s', target: 0 }, // Ramp down to 0 users over 5 minutes
    ]
    // thresholds: {
    //     http_req_duration: ['p(95)<200'], // 95% of requests should complete below 200ms
    // },
    // setupTimeout: '1m', // Timeout for the setup phase
    // teardownTimeout: '1m', // Timeout for the teardown phase
    // discardResponseBodies: true, // Discard response bodies to save memory
    // noConnectionReuse: true, // Disable connection reuse
    // maxRedirects: 0, // Disable redirects
    // httpDebug: 'full', // Enable full HTTP debugging
    // insecureSkipTLSVerify: true, // Skip TLS verification
    // tags: {
    //     my_custom_tag: 'my_value', // Custom tags for metrics
    // },  
    // ext: {
    //     loadimpact: {
    //         projectID: 123456, // Load Impact project ID
    //         name: 'My Test', // Name of the test
    //     },
    // },
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1); // Sleep for 1 second between requests
    http.get('https://test.k6.io/contact.php');
    sleep(2); // Sleep for 1 second between requests
    http.get('https://test.k6.io/news.php');
    sleep(2); // Sleep for 1 second between requests
}