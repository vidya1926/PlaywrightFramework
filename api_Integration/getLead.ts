import axios, { AxiosResponse } from 'axios';
import { accessToken } from './accessToken';
import { createLead } from './createLead';

async function getSalesforceAccessToken(): Promise<string> {
    return await accessToken();   
}
export async function getLead(): Promise<any> {
    try {
        let userID=await createLead();
        const salesforceAccessToken = await getSalesforceAccessToken();
        
        const response: AxiosResponse<any> = await axios.get(`https://qeagle8-dev-ed.develop.my.salesforce.com/services/data/v59.0/sobjects/Lead/${userID}`, {
            headers: {
                "Authorization": `Bearer ${salesforceAccessToken}`,
                "Content-Type": "application/json",
                "Connection": "keep-alive"
            }
        });
        
        const responseData = response.data;
        console.log('Lead information retrieved successfully:', responseData);
        const responseuserName = responseData.Name
        return responseuserName;
    } catch (error) {
        console.error('Error retrieving lead:', error);
        throw error;
    }
}