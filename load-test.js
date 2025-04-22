import http from 'k6/http';
import { sleep, check } from 'k6';

export default function() {
  // Get homepage
  let res = http.get('http://127.0.0.1:60493/'); // Update with your cdn-proxy URL
  check(res, {
    'homepage status is 200': (r) => r.status === 200,
  });
  
  // Browse some products (adjust IDs if needed)
  res = http.get('http://127.0.0.1:60493/product/OLJCESPC7Z');
  check(res, {
    'product page status is 200': (r) => r.status === 200,
  });
  
  sleep(1);
}

export const options = {
  stages: [
    { duration: '30s', target: 5 },  // Ramp up to 5 users
    { duration: '1m', target: 5 },   // Stay at 5 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
  },
};