import http from 'k6/http';
import { check, expect } from 'k6';



export default function () {
    const res = http.get('https://test.k6.io/');
    console.log('res.status: ', res.status);
    console.log('res.body: ', res.body);
    check(res, {
        'status is 200': (r) => r.status === 200
    })
    check(res, {
        'Response body include test': (r) => r.body.includes('testing') === true
    })
    //expect(res.status).toBe(200);

}