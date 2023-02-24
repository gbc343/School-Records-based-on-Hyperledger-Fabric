

const express = require('express')
const bodyParser = require('body-parser');

 

const fs = require('fs');
const path = require('path');
const { Wallets, Gateway } = require('fabric-network');
const testNetworkRoot = path.resolve(require('os').homedir(), 'Documents/fabric-samples/test-network');

 

const app = express();
const port = 3001;
app.use(bodyParser.json());

 

// connect to network using the wallet and gateway

async function connectToNetwork() {
  const gateway = new Gateway();
  const wallet = await Wallets.newFileSystemWallet('./wallet');
  try {
  const identityLabel = 'User1@org1.example.com';
  const functionName = "issueTranscript";
  const chaincodeArgs = "{'1','5','100','george'}";

  const orgName = 'org1.example.com';//identityLabel.split('@')[1];
  const orgNameWithoutDomain = 'org1' //orgName.split('.')[0];
  let connectionProfile = JSON.parse(fs.readFileSync(
      path.join(testNetworkRoot,
          'organizations/peerOrganizations',
          orgName,
          `/connection-${orgNameWithoutDomain}.json`), 'utf8')

  );
  let connectionOptions = {
      identity: identityLabel,
      wallet: wallet,
      discovery: {enabled: true, asLocalhost: true}
  };
  console.log('Connect to a Hyperledger Fabric gateway.');
  await gateway.connect(connectionProfile, connectionOptions);
  console.log('Use channel "mychannel".');
  const network = await gateway.getNetwork('mychannel');

  console.log('Use BalanceTransfer.');
  const contract = network.getContract('chaincode');
  console.log('Submit ' + functionName + ' transaction.');

  const response = await contract.submitTransaction(functionName, ...chaincodeArgs);

  if (`${response}` !== '') {
      console.log(`Response from ${functionName}: ${response}`);
  }} catch (error) {

    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);
} finally {
    console.log('Disconnect from the gateway.');
    gateway.disconnect();
}
  return response;
}

 

// endpoint to issue a transcript

app.post('/api/transcript/issue', async (req, res) => {

  const contract = await connectToNetwork();

  const { id, studentID, grades, issuer } = req.body;

 

  try {
    const gateway = new Gateway();
    const wallet = await Wallets.newFileSystemWallet('./wallet');
    try {
    const identityLabel = 'User1@org1.example.com';
    const functionName = "issueTranscript";
    //const chaincodeArgs = "{'1','5','100','george'}";
  
    const orgName = 'org1.example.com';//identityLabel.split('@')[1];
    const orgNameWithoutDomain = 'org1' //orgName.split('.')[0];
    let connectionProfile = JSON.parse(fs.readFileSync(
        path.join(testNetworkRoot,
            'organizations/peerOrganizations',
            orgName,
            `/connection-${orgNameWithoutDomain}.json`), 'utf8')
  
    );
    let connectionOptions = {
        identity: identityLabel,
        wallet: wallet,
        discovery: {enabled: true, asLocalhost: true}
    };
    console.log('Connect to a Hyperledger Fabric gateway.');
    await gateway.connect(connectionProfile, connectionOptions);
    console.log('Use channel "mychannel".');
    const network = await gateway.getNetwork('mychannel');
  
    console.log('Use BalanceTransfer.');
    const contract = network.getContract('chaincode');
    console.log('Submit ' + functionName + ' transaction.');
  
    const response = await contract.submitTransaction(functionName, id, studentID, grades, issuer);
  
    if (`${response}` !== '') {
        console.log(`Response from ${functionName}: ${response}`);
    }} catch (error) {
  
      console.log(`Error processing transaction. ${error}`);
      console.log(error.stack);
  } finally {
      console.log('Disconnect from the gateway.');
      gateway.disconnect();
  }
    //await contract.submitTransaction('issueTranscript', id, studentID, grades, issuer);

    res.send('Transcript issued successfully');

  } catch (err) {

    console.error(`Failed to issue transcript: ${err}`);

    res.status(500).send('Failed to issue transcript');

  }

});

 

// endpoint to verify a transcript

app.post('/api/transcript/:id/verify', async (req, res) => {

  const contract = await connectToNetwork();

  const id = req.params.id;

 

  try {

    await contract.submitTransaction('verifyTranscript', id);

    res.send('Transcript verified successfully');

  } catch (err) {

    console.error(`Failed to verify transcript: ${err}`);

    res.status(500).send('Failed to verify transcript');

  }

});

 

// endpoint to share a transcript

app.post('/api/transcript/:id/share', async (req, res) => {

  const contract = await connectToNetwork();

  const id = req.params.id;

  const { recipientID } = req.body;

 

  try {

    await contract.submitTransaction('shareTranscript', id, recipientID);

    res.send('Transcript shared successfully');

  } catch (err) {

    console.error(`Failed to share transcript: ${err}`);

    res.status(500).send('Failed to share transcript');

  }

});

 

// endpoint to retrieve a transcript

app.get('/api/transcript/:id', async (req, res) => {

  const contract = await connectToNetwork();

  const id = req.params.id;

 

  try {

    const transcript = await contract.evaluateTransaction('getTranscript', id);

    res.send(transcript.toString());

  } catch (err) {

    console.error(`Failed to retrieve transcript: ${err}`);

    res.status(500).send('Failed to retrieve transcript');

  }

});

 

app.listen(port, () => {

  console.log(`Listening on port ${port}`);

});
