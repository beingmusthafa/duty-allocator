import mongoose from 'mongoose';

const DeptSchema = new mongoose.Schema({

   dept: {type:String, unique: true},
   block: String,
});

const DeptModel = mongoose.model('dept', DeptSchema);

export { DeptModel };