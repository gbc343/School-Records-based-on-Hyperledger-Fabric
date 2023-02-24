# Simple Account Transfer Application in Hyperledger Fabric# School-Records-based-on-Hyperledger-Fabric
Introduction
School Records based on Hyperledger Fabric
Group 5
 Apart from the security concerns, there are additional challenges related to secondary authentication and reliable storage of revision history, which can lead to increased costs. Additionally, the current system for accessing student transcripts can be time-consuming and inefficient for students.
To address these issues, implementing the Hyperledger Fabric blockchain can provide a solution. This permissioned blockchain technology allows for restricted access to authorized users, simplifies secondary authentication, and ensures data integrity through distributed storage of student records. By utilizing blockchain, students can access their documents more quickly and have greater control over their personal information. This solution also mitigates the risk of arbitrary data forgery and tampering.
This project will provide the following benefits:
1- Secure and efficient way to manage requesting school transcript records
2- Tamper-evident and transparent way to store and share student transcript between
different education institutions
3- Reduced administrative burden and improved data accuracy
4- Enhanced data privacy and confidentiality
5- Improved regulatory compliance
Project Description
The proposed mechanism aims to strengthen the integrity of school transcripts based on blockchain. It can be largely divided into three types: write to record in the block network, query to check the recorded content, and request to request information on the block network.
     Function Write Creation
Query View Request Request
Input
ID, school transcript record
ID
Output
Properties, hash value
View ID, hash value Request key value, hash value
               
 The proposed mechanism can execute chain code according to the transaction consensus process, and the transaction can be largely divided into a consensus process for reading information from student records and a consensus process for writing or creating student records.
Team
- 101445002 Yoodam Choi: As a business analyst, identify requirements and use-case and define workflows and processes to streamline operations. And collaborate with the development team to ensure the final product meets the needs and requirements. As a architect, develop a technical architecture that outlines the system’s components, their interaction and dependencies. Develop all the documents including solution design documentation. And ensure the final solution meets technical requirements and specifications.
- 100708985 Gordon Wells: As a blockchain developer, involves designing, developing, and implementing the smart contract, or chaincode, that define the business logic of the blockchain network. Deploy and configure the blockchain network infrastructure, which may involve configuring the nodes, setting up network channels, and ensuring the proper integration of various components of the network.
- 101445536 Fetemeh Alipour Soweizi: As a full-stack developer, develop and maintain the user interface that interact with the network and the server-side logic that communicates with the network through SDKs. Integrate the blockchain network with other systems and services.
Requirements
Here is a high-level architecture for a Hyperledger Fabric solution for the education use case:
Peers:
Two types of peers can be defined in this solution: endorsing peers and ordering peers. Endorsing peers are responsible for endorsing transactions and executing chain code. For this solution, endorsing peers can be owned and maintained by each educational institution. Ordering peers are responsible for ordering transactions and creating blocks. They ensure that the transactions are executed in a proper sequence. In this solution, the ordering of peers can be managed by a trusted third party, such as a consortium of educational institutions or a government entity.
  
CA (Certificates and Users):
A Certificate Authority (CA) is used to issue and manage digital certificates that verify the identity of network participants. Each educational institution can have its own CA, which can issue certificates to students and staff. These certificates can be used to authenticate users and authorize their access to the network. Additionally, a trusted third party can also be responsible for issuing and managing certificates for the ordering peers.
Orderer(s):
In this solution, an orderer service can be set up, consisting of a number of ordering peers managed by a trusted third party. The orderer service ensures that all the transactions are processed in the correct order and creates blocks that are added to the blockchain. A solo orderer or a Kafka-based orderer can be used, depending on the network requirements.
Channel/s:
Channels can be created to separate different types of transactions, such as student transcripts and faculty records. Each educational institution can have its own channel, with students endorsing peers from that institution and ordering peers from a trusted third party. Channels can be used to ensure that transactions are private and only visible to the participants in that channel.
MSPs:
Membership Service Providers (MSPs) are used to manage the identities of network participants and their access to the network. Each educational institution can have its own MSP, which is responsible for managing the identities of its students and staff. The trusted third party can also have an MSP, which can be responsible for managing the identities of ordering peers. This is just a high-level overview of the architecture. More details, such as the number of endorsing and ordering peers, the type of consensus algorithm to use, and the configuration of MSPs and CAs, will depend on the specific requirements of the use case.
State Diagram
 
 In this diagram, the system starts in an Idle state, where the user can select to Request Transcript. Upon selection, the system transitions to the Transcript Requested state, where the Smart Contract validates the request and adds it to the blockchain.
Once the request is validated, the system transitions to the Request Validated state, where the Requesting School sends the transcript to be added to the blockchain. Once the transcript is added, the system transitions to the Transcript Received state.
The Requesting School then verifies the transcript, and the system transitions to the Transcript Verified state. From here, the Requesting School can share the transcript with a trusted network, and the system transitions to the Transcript Shared state.
Finally, the trusted network can access the transcript, and the system transitions to the Transcript Accessed state, where the Smart Contract logs the access. The system then returns to the Idle state, where it can start over with a new request.
Sequence Diagram
 
 In this sequence diagram, there are three main actors: the student, the institution, and the trusted network.
The sequence diagram shows the interactions between the actors in a typical use case scenario, which involves storing, retrieving, and sharing a transcript.
The sequence of events is as follows:
1- The student requests a transcript from the institution.
2- The institution retrieves the transcript from the blockchain ledger.
3- The institution shares the transcript with the trusted network.
4- The trusted network accesses the transcript from the blockchain ledger.
The sequence diagram provides a clear visualization of the interactions between the actors and the flow of data between them. It shows how the blockchain ledger is used to securely store and share transcripts and how the permissioned network model ensures that only authorized parties can access the data.
Roles and Policies
The proposed mechanism's roles are primarily those of administrators who manage the system, professors who are users who create student transcripts, schools that can read and check students' information, and finally students, who fall into four categories.
 
The four roles can be largely divided into external managers who access from outside the system, internal managers who access information from the inside, users who can only access records recorded in the system, and groups that require access to records.
        Admin
Professor School Student
Authority External manager
Internal manager Group
User
Role
Access role management Registration, viewing Viewing
Viewing, request
Chain code -
Query, write Query, request Query
                1- Admin: responsible for network management, including setting up access control rules, managing nodes and their rights, and creating and configuring channels.
2- Professor: responsible for producing and publishing transcripts on the network and controlling employee access.
3- School
4- Student: authorized to control their own access controls, share their own transcripts, and
view them.
Policies that specify the conditions for each role's access to network resources will be used to enforce access control. The access control language of Fabric, which enables flexible and granular control over permissions, will be used to design the policies.
- Access control policy: Specifies the access permissions and restrictions for each participant in the network. Ensures that only authorized participants can access the network resources and execute the transaction.
- Endorsement policy: Specifies the endorsement requirements for each transaction. Ensures that a transaction is endorsed by the required number of endorsers before it can be committed to the ledger.
- Validation policy: Specifies the validation requirements for each transaction. Ensures that the transaction data and parameters are valid and comply with business rules and policies.
- Lifecycle policy: Specifies the rules and procedures for managing the smart contract chaincode lifecycle. Ensures that the chaincode is deployed, upgraded, and retired in a secure and controlled manner.
Snapshots of application, results
 
  
  Solution Design Document
The solution aims to use Hyperledger Fabric blockchain technology to securely and efficiently manage requesting school transcript records. The solution provides a tamper-evident and secure way to store and share student transcripts between issuing schools and requesting schools.
The student transcript record use case aims to solve the following problems in the education industry:
1- Secure authenticity and storage of transcript
2- Sharing transcripts with a trusted network
3- Flexible access control
 
To do this, we will create a blockchain system based on Hyperledger Fabric that offers a safe and impenetrable database for archiving and exchanging transcripts. To make sure that only people with permission can access the data, the solution will make use of Fabric's permissioned network paradigm.
Architecture
The solution architecture includes the following components:
1- Hyperledger Fabric blockchain network
2- Requesting school transcript records smart contract chaincode
3- Web-based user interface
Data Model
- Student name/ID: a identifier for the student
- Course name/ID: a identifier for the course
- Grades
- Issuer
- Timestamp
Chain code
Javascript file that defines a Hyperledger Fabric smart contract called EducationRecord. The contract contains several functions that allows the issuance, verification, sharing, and retrieval of student transcript on blockchain network.
The EducationRecord class extends the Contract and contains several functions:
- issueTranscript: Takes several arguments such as id, studentID, grades, and issuer, and creates a new transcript object with information provided. Then checks if the transaction is already exists on blockchain or not, and stores the transcript on the blockchain using _putTransaction function.
- verifyTranscript: If the verifier is not an issuer, an error will be thrown.
- shareTranscript: Allows the verified transaction to be shared with a recipient if the recipient is authorized to access the transcript. If not, their ID will be added in to the list of authorized
reader.
- getTranscript: Retrieves a transcript from the blockchain, but only if the requesting entity is
authorized to access it.
- _getTxCreatorUID: Returns to JSON string representing the unique identifier of the entity
that invoked the current transaction.
- _transactionExists: Checks if a transcript with the specified ID already exsists in the
blockchain.
- _getTranscript: Retrieves a transcript with the specified ID from the blockchain.
- _putTranscript: Stores a transcript on the blockchain along with the access policy. It also add
personal information to the transaction object.
API
The Fabric Node.js SDK will be used to create the API. It will offer a basic user interface for working with chain code functions.

Front-end
The front-end will be built using React.js and will allow users to interact with the API and read/write data from the blockchain.
The solution leverages the benefits of Hyperledger Fabric blockchain technology to provide a secure, transparent, and tamper-evident way to manage requesting school transcript records. The solution architecture provides a scalable and efficient way to store, share, and retrieve student transcripts between different educational institutions.
Conclusion
Transcripts can be stored and shared in a safe, hacker-proof database thanks to the solution for the education use case. To make sure that only people with authorization can access the data, it will make use of the permissioned network model of Hyperledger Fabric. The proposed hyper ledger fabric-based school life record method allows only a group belonging to the channel to access student records and can strengthen data integrity with a distributed ledger method. Flexible access control will be offered by the system, which can also serve other use cases in the education sector with ease.
 
