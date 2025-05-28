import { sleep } from 'k6';
import http from 'k6/http';


export const options = {
    vus: 2,
    duration: '5s',
};  

console.log(' --- init stage ---');

export default function (data) {
   console.log(' --- default stage ---');
   console.log('Received data from setup: ', data);
}

export function setup() {
    console.log(' --- setup stage ---');
    sleep(10); // Simulate some setup time
    const data = { message: 'Hello, World!' };
    return data
 }

export function teardown() {
   console.log(' --- teardown stage ---');
}   