const express = require('express');
const bodyParser = require('body-parser');
const { Gateway, FileSystemWallet } = require('fabric-network');

const app = express();
const port = 4000;

app.use(bodyParser.json());

// connect to network using the wallet and gateway
async function connectToNetwork() {
  const wallet = new FileSystemWallet('./wallet');
  const gateway = new Gateway();
  await gateway.connect(ccpPath, { wallet });
  const network = await gateway.getNetwork(channelName);
  const contract = network.getContract(chaincodeName);
  return contract;
}

// endpoint to issue a transcript
app.post('/api/transcript', async (req, res) => {
  const contract = await connectToNetwork();
  const { id, studentID, grades, issuer } = req.body;

  try {
    await contract.submitTransaction('issueTranscript', id, studentID, grades, issuer);
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