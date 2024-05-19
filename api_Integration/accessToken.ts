import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';

const userData = {
    grant_type: 'password',
    client_id: '3MVG9fe4g9fhX0E5hbGhek7Fp9ijXU30Q2eWnfUpEFvJ1mkEJCNcHmE01luXmSbgA73HgGRy5Ouj3c1IE2SLZ',
    client_secret: '0184AC8597512459A6BF96E1F46CB699EAEA1CEC34212BDDF383F28F99CCB376',
    username: 'majay3574@gmail.com',
    password: 'Ajaymichael@8428'
};

export async function accessToken(): Promise<string> {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    try {
        const response: AxiosResponse<any> = await axios.post("https://login.salesforce.com/services/oauth2/token", formData, {
            headers: formData.getHeaders()
        });
        const responseData = response.data;
        const accessToken = responseData.access_token;
        return accessToken;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response data:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}
