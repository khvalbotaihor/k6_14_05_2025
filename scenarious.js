import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';
import { Counter  } from 'k6/metrics';

export let options = {
    vus: 10, // Number of virtual users
    duration: '10s', // Duration of the test
    thresholds: {
        http_req_duration: ['p(95)<150'], // 95% of requests must complete below 500ms
        http_req_duration:['max<500'], // Maximum request duration should be less than 500ms
        http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
        http_reqs: ['count>9'], // At least 100 requests should be made
        http_reqs: ['rate>0.9'],
        vus: ['value>9'],
        checks: ['rate>=0.9'], // At least 90% of checks should pass
    },
};  

let myCounter = new Counter('my_counter');

export default function () {
    const res = http.get('https://quickpizza.grafana.com/test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'food' : ''));
    //const res = http.get('https://quickpizza.grafana.com/test.k6.io/');
    myCounter.add(1);

    console.log(exec.scenario.iterationInTest);

    //console.log('res.status: ', res.status);
    //////console.log('res.body: ', res.body);
    check(res, {
        'status is 200': (r) => r.status === 200,
        'Response body include QuickPizza': (r) => r.body.includes('QuickPizza') 

    })
    check(res, {
        'Response body include test': (r) => r.body.includes('QuickPizza') === true
    })


    sleep(10); // Sleep for 1 second between requests
}