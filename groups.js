import { sleep, check, group } from 'k6';
import http from 'k6/http';


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250']
    },
};  


export default function () {
    group('Home page', function () {
        let response = http.get('https://quickpizza.grafana.com/test.k6.io/')

        check(response, { 'is status 200 for html': (r) => r.status === 200 });

        group('Assets', function () {
        
            let response2 = http.get('https://quickpizza.grafana.com/test.k6.io/static/css/site.css')
            check(response2, { 'is status 200 for css': (r) => r.status === 200 });
            let jsonResponse = http.get('https://quickpizza.grafana.com/test.k6.io/static/favicon.ico')
            check(jsonResponse, { 'is status 200 for favicon': (r) => r.status === 200 });
        });
    });

    group('News page', function () {

        http.get('https://quickpizza.grafana.com/news.php')
    });

    sleep(1); // Simulate a user think time of 1 second



}