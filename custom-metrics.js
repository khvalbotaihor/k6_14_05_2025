import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';
import { Counter, Trend  } from 'k6/metrics';

export let options = {
    vus: 5, // Number of virtual users
    duration: '5s', // Duration of the test
    thresholds: {
        http_req_duration: ['p(95)<150'], // 95% of requests must complete below 500ms
        my_counter: ['count>0'], // At least 1 request should be made
        response_time_news_page: ['p(95)<150', 'p(99)<500'], // 95% of requests must complete below 150ms, 99% below 500ms
    },
};  

let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function () {
    let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
    myCounter.add(1);

    res = http.get('https://quickpizza.grafana.com/news.php')

    newsPageResponseTrend.add(res.timings.duration);

}