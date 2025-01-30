require('dotenv').config();
const ZB = require('zeebe-node')
const fs = require('fs')

void (async () => {
    const zbc = new ZB.ZBClient() // localhost:26500 || ZEEBE_GATEWAY_ADDRESS

    await zbc.deployProcess(['./models/camunda.bpmn', './models/message.form', './models/reponse.form'])
    
    const worker = zbc.createWorker({
        // Define the task type that this worker will process
        taskType: 'display_message',
        // Define the task handler to process incoming jobs
        taskHandler: job => {
            // Log the job variables for debugging purposes
            console.log("Le message suivant est envoye par"+ job.variables.firstName +" : "+ job.variables.messageToDisplay);


            // Add logic to retrieve the customer record from the database here
            // ...

            // Complete the job with the 'customerRecordExists' variable set to true
            return job.complete({
                completeMessage: job.variables.firstName +" : "+ job.variables.messageToDisplay
            });
        }
    });

})()