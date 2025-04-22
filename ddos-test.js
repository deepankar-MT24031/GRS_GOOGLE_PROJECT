import http from 'k6/http';
import { check } from 'k6';

export default function() {
  // Replace with your ddos-protection service URL
  const res = http.get('http://127.0.0.1:51713/');
  
  check(res, {
    'status is 200 or 429': (r) => r.status === 200 || r.status === 429,
  });
}

export const options = {
  vus: 20,  // Virtual users
  duration: '30s',
};