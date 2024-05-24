import { useEffect } from "react";
import querystring from "querystring";
import axios from "axios";
import { Buffer } from "buffer";

const authUrl: string = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize';
const clientId: string = 'b1269f3e-4fa4-4acd-aedf-9ebd8014c393';
const redirectUrl: string = 'http://localhost:3000/callback';
const fhirAud: string = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4';

const tokenUrl: string = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token';
const clientSecret: string = '+kDvQomH6z0kE9qvme9+aKuerCwYvgRVeG7TlpNl/efYqKhnAP6YlsKZ4jU/jJn7+Fa4CpeNIqBW5UxymwG6tA==';

const AuthComponent: React.FC = () => {
    useEffect(() => {
        const fetchToken = async (code: string) => {
            const tokenRequestData = querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUrl,
            });

            const tokenRequestHeaders = {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            };

            try {
                const response = await axios.post(tokenUrl, tokenRequestData, {
                    headers: tokenRequestHeaders,
                    timeout: 10000, // 10 seconds
                });
                const { data } = response;
                console.log(data);
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('expiresIn', data.expires_in);
                localStorage.setItem('createdAt', new Date().toISOString());
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };


        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const accessToken = url.searchParams.get('access_token');
        if (code) {
            fetchToken(code);
        }
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
        }

    }, []);

    return <>You will be redirected soon!</>;
};

export default AuthComponent;
