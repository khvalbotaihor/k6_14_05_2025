import { sleep, check, group } from 'k6';
import http from 'k6/http';


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<3000'],
        'group_duration{group:::Home page}': ['p(95)<6000'],
        'group_duration{group:::News page}': ['p(95)<6000'],

        'group_duration{group:::Home page::Assets}': ['p(95)<2500'],

    },
};  


export default function () {
    group('Home page', function () {
        let response = http.get('https://run.mocky.io/v3/1ed17704-f01b-4dea-b465-82eff8483e43?mocky-delay=5000ms')
        console.log('response html: ' + response.status);

        check(response, { 'is status 200 for html': (r) => r.status === 200 });

        group('Assets', function () {
        
            let response2 = http.get('https://run.mocky.io/v3/1ed17704-f01b-4dea-b465-82eff8483e43?mocky-delay=1000ms')
            console.log('response css: ' + response2.status);
            check(response2, { 'is status 200 for css': (r) => r.status === 200 });

            let jsonResponse = http.get('https://run.mocky.io/v3/1ed17704-f01b-4dea-b465-82eff8483e43?mocky-delay=1000ms')
            console.log('response json: ' + jsonResponse.status);
            check(jsonResponse, { 'is status 200 for favicon': (r) => r.status === 200 });
        });
    });

    group('News page', function () {

        http.get('https://run.mocky.io/v3/1ed17704-f01b-4dea-b465-82eff8483e43?mocky-delay=5000ms')
    });

    sleep(1); // Simulate a user think time of 1 second



}