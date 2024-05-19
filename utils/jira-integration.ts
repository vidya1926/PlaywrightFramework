import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

const url = "https://vidya-bharathi.atlassian.net/rest/api/2/issue/"
const username = "vidyar1926@gmail.com"
const apiKey = "ATATT3xFfGF0B4BTozU5wxE5znCgufq_02edhQ99JGekpmhwsz6-KuHpAFDvcXU53_9107SSchcV7bPmxclZme9AqhGnNN77GAwTLAimw054nn25ym1TxKDRdaIazijHgqOwX6SIpsNqR7dRNpVBZPIeQ1hfsBuDhEoo4rDyp3S5yuP4KHpi60k=667E5602"
const projectId = "SAL"

async function createJiraIssue(summary: string, description: string) {
    // Body // Payload
    const issueRequestJson = {
        "fields": {
            "project":
            {
                "key": projectId
            },
            "summary": summary,
            "description": description,
            "issuetype": {
                "name": "Bug"
            }
        }
    };

    // Send a Post Request
    axios.post(url, issueRequestJson, {
        auth: {
            username: username,
            password: apiKey
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log("The API request is successful")
}


// Function to update Jira issue with a new attachment

async function updateJiraIssue(issueKey: string, folderPath: string) {
    const formData = new FormData();
    console.log(`Current working directory: ${process.cwd()}`);
    const absoluteFolderPath = path.resolve(folderPath);

    console.log(`Absolute path of folderPath: ${absoluteFolderPath}`);
    //const files = fs.readdirSync(folderPath);
    //console.log(files.entries())

    // Append each file to FormData
    const file = "video.webm";
    const filePath = path.join(absoluteFolderPath, file);
   // console.log(filePath);

    // Check if it's a file before attempting to read
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        formData.append('file', fs.createReadStream(filePath), { filename: file, knownLength: fileSizeInBytes });
    } else {
        console.warn(`${file} is a directory and won't be included in the upload.`);
    }
    

    try {
        console.log(`${url}${issueKey}/attachments`);
        // Send a Post Request
       await axios.post(`${url}${issueKey}/attachments`, formData, {
            auth: {
                username: username,
                password: apiKey
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Atlassian-Token': 'no-check'
            }
        }).then((payload) => {
            console.log('payload');
            console.log(payload);

        }).catch((e) => {
            console.log('error');
            console.log(e);


        });

        console.log('Attachment uploaded successfully');
    } catch (error) {
        console.error('Attachment upload failed:', error.message);
    }
}

export { createJiraIssue, updateJiraIssue }