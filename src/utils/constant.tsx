export const apiBaseUrl: string = import.meta.env.VITE_API_BASEURL as string;
export const apiBeBaseUrl: string = import.meta.env.VITE_BE_BASEURL as string;
export const appName: string = import.meta.env.VITE_APP_NAME as string;
export const credential: any = JSON.parse(localStorage.getItem('credentials'));
export const token: any = `Bearer ${credential?.token.access_token}`;
