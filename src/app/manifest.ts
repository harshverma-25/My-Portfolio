import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Harsh Verma Portfolio',
    short_name: 'Harsh Verma',
    description: 'Portfolio of Harsh Verma, a Full Stack Developer specializing in scalable systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}   
