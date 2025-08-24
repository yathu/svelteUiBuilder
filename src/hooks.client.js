import { dev } from '$app/environment';

if (dev && typeof window !== 'undefined') {
  const { worker } = await import('./mock/browser'); // adjust path
  await worker.start({ onUnhandledRequest: 'bypass' });
}