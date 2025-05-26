import http from 'k6/http';

export let options = {
    thresholds: {
        http_req_duration: ['p(95)<150'], // 95% of requests must complete below 500ms
        'http_req_duration{status:200}': ['p(95)<150'], // 95% of requests must complete below 500ms
        'http_req_duration{status:201}': ['p(95)<150'], // 95% of requests must complete below 500ms
    },
};  


export default function () {
    http.get('https://run.mocky.io/v3/fc708915-3608-45a2-89a8-1d7d3eebb60d')
    http.get('https://run.mocky.io/v3/07c63ca0-8646-4e51-84ba-ba6f6ffaaa40?mocky-delay=2000ms')


}