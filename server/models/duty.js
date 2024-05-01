// dutyRequest.model.js
import { Schema, model } from 'mongoose';

const dutyRequestSchema = new Schema({
    examName: String,
    hall: String,
    numberOfTeachers: Number,
    department: String,
    date: String,
    time: String,
    requestDate:String,
    requestTime:String,
    status: {
        type: Number,
        default: 0
    }
});

const DutyRequest = model('dutyRequest', dutyRequestSchema);

export default DutyRequest;
