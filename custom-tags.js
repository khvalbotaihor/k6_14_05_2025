import { check, sleep } from 'k6';
import http from 'k6/http';
import { Counter  } from 'k6/metrics';


export let options = {
    thresholds: {
        http_req_duration: ['p(95)<300'], 
        'http_req_duration{page: order}': ['p(95)<300'], 

        http_errors: ['count<0'], // Custom threshold for error count
        'http_errors{page: order}': ['count<=0'], // Custom threshold for error count on the 'order' page
        checks: ['rate>0.99'], // Ensure 95% of checks pass

        'checks{page: order}': ['rate>0.99'], // Ensure 95% of checks pass
    },
};  

let httpErrors = new Counter('http_errors');

export default function () {
    let response = http.get('https://run.mocky.io/v3/fc708915-3608-45a2-89a8-1d7d3eebb60d')

    if (response.error) {
        httpErrors.add(1, {page: 'order'}); // Increment the custom error counter
    }

    check(response, {
        'is status 200': (r) => r.status === 200,
        'is response time < 300ms': (r) => r.timings.duration < 300,
    });


     response = http.get(
        'https://run.mocky.io/v3/fc708915-3608-45a2-89a8-1d7d3eebb60d',
        {
            tags: {
                page: 'order'
            }
        }
    )

    check(response, {
        'is status 200': (r) => r.status === 200,
        'is response time < 300ms': (r) => r.timings.duration < 300,
    },{page: 'order'});

    sleep(1); // Sleep for 1 second between iterations
}