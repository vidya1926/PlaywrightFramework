import axios, { AxiosResponse } from 'axios';
import { accessToken } from './accessToken';
import { FakerData } from '../utils/fakerUtils';






async function getSalesforceAccessToken(): Promise<string> {
    return await accessToken();   
}
const Data = {
    "FirstName": FakerData.getFirstName(),
    "LastName": FakerData.getLastName(),
    "Company": FakerData.companyName()
};

export async function createLead(): Promise<string | null> {
    try {
        const salesforceAccessToken = await getSalesforceAccessToken();
        
        const response: AxiosResponse<any> = await axios.post(
            "https://qeagle8-dev-ed.develop.my.salesforce.com/services/data/v59.0/sobjects/Lead",
            Data,
            {
                headers: {
                    "Authorization": `Bearer ${salesforceAccessToken}`,
                    "Content-Type": "application/json",
                    "Connection": "keep-alive"
                }
            }
        );

        const responseData = response.data;
        let responseUserID = responseData.id;
        console.log('Lead created successfully:', responseData);
        console.log('responseUserID:', responseUserID);
        return responseUserID;
    } catch (error) {
        console.error('Error creating lead:', error);
        throw error;
    }
}






