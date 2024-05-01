import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({

   roomname: {type:String, unique: true},
   seats: Number,
});

const RoomModel = mongoose.model('room', RoomSchema);

export { RoomModel };