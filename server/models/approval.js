import { Schema, model } from 'mongoose';

// Define the schema for the approval data
const ApprovalSchema = new Schema({
    selectedTeachers: [{
        staffId: { type: Schema.Types.ObjectId, ref: 'Staff' },
        fName: String,
        lName: String,
        email: String,
        status:{
            type:Number,
            default: 0
        }
    }],
    hodId:String,
    hodFirstName: String,
    hodLastName: String,
    approvedDate: String,
    approvedTime: String,
    examName: String,
    hall: String,
    department: String,
    date:String,
    time:String,
    requestDate: String,
    requestTime: String,
    numberOfTeachers: Number
});
const DutyApproval = model('dutyApproval', ApprovalSchema);

export default DutyApproval;
