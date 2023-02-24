'use strict';

const { Contract } = require('fabric-contract-api');

const transcriptObjType = "Transcript";

class EducationRecord extends Contract {

    async issueTranscript(ctx, id, studentID, grades, issuer) {
    const transcript = {
        id: id,
        studentID: studentID,
        grades: grades,
        issuer: issuer,
        verified: false
    }

    if (await this._transcriptExists(ctx, transcript.id)) {
        throw new Error(`the transcript ${transcript.id} already exists`);
    }

    const accessControlPolicy = {
        readAccess: [studentID, issuer],
        writeAccess: [issuer]
    };

    await this._putTranscript(ctx, transcript, accessControlPolicy);
}

async verifyTranscript(ctx, id) {
    const txCreator = this._getTxCreatorUID(ctx);
    const transcript = await this._getTranscript(ctx, id);

    if (transcript.issuer !== txCreator) {
        throw new Error(`unauthorized access: you can't verify a transcript you didn't issue`);
    }

    transcript.verified = true;
    await this._putTranscript(ctx, transcript);
}

async shareTranscript(ctx, id, recipientID) {
    const txCreator = this._getTxCreatorUID(ctx);
    const transcript = await this._getTranscript(ctx, id);

    if (!transcript.verified) {
        throw new Error(`the transcript ${id} is not verified yet, it cannot be shared`);
    }

    const accessControlPolicy = await this._getTranscriptAccessControlPolicy(ctx, id);
    if (!accessControlPolicy.readAccess.includes(txCreator)) {
        throw new Error(`unauthorized access: you can't share a transcript that you are not authorized to access`);
    }

    if (!accessControlPolicy.readAccess.includes(recipientID)) {
        accessControlPolicy.readAccess.push(recipientID);
        await this._putTranscriptAccessControlPolicy(ctx, id, accessControlPolicy);
    }
}

async getTranscript(ctx, id) {
    const txCreator = this._getTxCreatorUID(ctx);
    const transcript = await this._getTranscript(ctx, id);

    // const accessControlPolicy = await this._getTranscriptAccessControlPolicy(ctx, id);
    // if (!accessControlPolicy.readAccess.includes(txCreator)) {
    //     throw new Error(`unauthorized access: you are not authorized to access the transcript ${id}`);
    // }

    return JSON.stringify(transcript);
}

_getTxCreatorUID(ctx) {
    return JSON.stringify({
        mspid: ctx.clientIdentity.getMSPID(),
        id: ctx.clientIdentity.getID()
    });
}

async _transcriptExists(ctx, id) {
    const compositeKey = ctx.stub.createCompositeKey(transcriptObjType, [id]);
    const transcriptBytes = await ctx.stub.getState(compositeKey);
    return transcriptBytes && transcriptBytes.length > 0;
}

async _getTranscript(ctx, id) {
    const compositeKey = ctx.stub.createCompositeKey(transcriptObjType, [id]);

    const transcriptBytes = await ctx.stub.getState(compositeKey);
    if (!transcriptBytes || transcriptBytes.length === 0) {
        throw new Error(`the transcript ${id} does not exist`);
    }

    return JSON.parse(transcriptBytes.toString());
}

async _putTranscript(ctx, transcript, access) {
    transcript.owner = this._getTxCreatorUID(ctx);
    const compositeKey = ctx.stub.createCompositeKey(transcriptObjType, [transcript.id]);
    await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(transcript)), { 
        ...access
    });
}

}

module.exports = EducationRecord;