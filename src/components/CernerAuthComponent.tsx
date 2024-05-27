import { useEffect } from "react";
import querystring from "querystring";
import axios from "axios";
import { Buffer } from "buffer";

const authUrl: string = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize';
const clientId_cerner: string = 'c321af09-aedf-4a2f-9f28-f0a77f783bae';
const redirectUrl: string = 'http://localhost:3000/cerner/callback';
const fhirAud: string = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4';

const tokenUrl: string = 'https://authorization.cerner.com/tenants/2f8f5ec1-b7b8-4be5-ae27-e308284dd9c1/hosts/fhir-myrecord-sc.cerner.com/protocols/oauth2/profiles/smart-v1/token';
// const clientSecret: string = '+kDvQomH6z0kE9qvme9+aKuerCwYvgRVeG7TlpNl/efYqKhnAP6YlsKZ4jU/jJn7+Fa4CpeNIqBW5UxymwG6tA==';

const CernerAuthComponent: React.FC = () => {
    useEffect(() => {
        const fetchToken = async (code: string) => {
            const tokenRequestData = querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                client_id: clientId_cerner,
                redirect_uri: redirectUrl,
            });

            const tokenRequestHeaders = {
                'Content-Type': 'application/x-www-form-urlencoded',
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

export default CernerAuthComponent;
