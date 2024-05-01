import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { StaffModel } from "./models/staff.js";
import { DeptModel } from "./models/dept.js";
import { RoomModel } from "./models/room.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import DutyRequest from "./models/duty.js";
import session from "express-session";
import DutyApproval from "./models/approval.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

morgan.token("req-body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);
app.use(
  session({
    secret: "My-Secret-Key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(process.env.DB_LINK)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Define your app's routes
const sendEmail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

// Function to send emails with throttling
const sendEmails = async (mailOptionsList) => {
  for (const mailOptions of mailOptionsList) {
    try {
      await sendEmail(mailOptions);
      await delay(1000); // Delay for 1 second between each email (adjust as needed)
    } catch (error) {
      throw error;
    }
  }
};

// Function to introduce a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.post("/send-email", async (req, res) => {
  const {
    approvalId,
    selectedTeachers,
    hodFirstName,
    hodLastName,
    examName,
    hall,
    date,
    time,
  } = req.body;
  console.log(approvalId);
  // Function to send email and update status
  const sendEmailAndUpdateStatus = async (teacher) => {
    try {
      // Construct mail options for the current teacher
      const mailOptions = {
        from: "jeevan8707@outlook.com",
        to: teacher.email,
        subject: "Exam Duty Assignment",
        text: `Dear ${teacher.fName || ""} ${
          teacher.lName || ""
        },\n\nYou have been assigned to invigilate the following exam:\n\nExam Name: ${examName}\nExam Hall: ${hall}\nExam Date: ${date}\nExam Time: ${time}\n\nPlease be present at the exam hall on time.\n\nRegards,\n${hodFirstName} ${hodLastName}`,
      };

      // Send email
      await sendEmail(mailOptions);

      // Update the status bit for the current teacher to 1 (indicating email sent successfully)
      await DutyApproval.findOneAndUpdate(
        {
          _id: approvalId,
          "selectedTeachers.email": teacher.email,
        },
        {
          $set: { "selectedTeachers.$.status": 1 },
        }
      );

      console.log(`Email sent successfully to ${teacher.email} ${approvalId}`);
    } catch (error) {
      console.error(`Error sending email to ${teacher.email}:`, error);
    }
  };

  // Send emails to selected teachers with throttling
  try {
    for (const teacher of selectedTeachers) {
      await sendEmailAndUpdateStatus(teacher);
      // Introduce a delay of 1 second between sending each email
      await delay(1000);
    }
    res.status(200).send("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending emails");
  }
});

// verify hod
const verifyHod = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("No Token");
  } else {
    jwt.verify(token, "My-Secret-Key", (err, decoded) => {
      if (err) {
        return res.json("error with token");
      } else {
        if (decoded.designation === "hod") {
          next();
        } else {
          return res.json("not hod");
        }
      }
    });
  }
};
app.get("/hodDash", verifyHod, (req, res) => {
  return res.json("Hod");
});

// verify admin
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("No Token");
  } else {
    jwt.verify(token, "My-Secret-Key", (err, decoded) => {
      if (err) {
        return res.json("error with token");
      } else {
        if (decoded.designation === "admin") {
          next();
        } else {
          return res.json("not admin");
        }
      }
    });
  }
};
app.get("/adminDash", verifyAdmin, (req, res) => {
  return res.json("Admin");
});

//Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  StaffModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, designation: user.designation },
            "My-Secret-Key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          req.session.department = user.dept;
          req.session.email = user.email;
          req.session.fName = user.fName;
          req.session.lName = user.lName;
          // req.session.id = user.id;
          return res.json({
            Status: "Success",
            id: user._id,
            designation: user.designation,
            department: user.dept,
            email: user.email,
            fName: user.fName,
            lName: user.lName,
          });
        } else {
          return res.json("Password doesnt match");
        }
      });
    }
  });
});
app.post("/update-password", async (req, res) => {
  const { email, password, newPassword } = req.body;
  try {
    const user = await StaffModel.findOne({ email: email });
    console.log(email, password, newPassword);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Hash the new password with a salt
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      const updatedUser = await StaffModel.findOneAndUpdate(
        { email: email },
        { password: hashedPassword },
        { new: true }
      );

      return res.json({ status: "Success", updatedUser });
    } else {
      return res.status(401).json({ error: "Wrong Current Password" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Failed to update password" });
  }
});

// add staff
app.post("/staff/add", async (req, res) => {
  const { fName, lName, phNumber, email, password, designation, dept } =
    req.body;

  try {
    const existingEmail = await StaffModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const existingPhNumber = await StaffModel.findOne({ phNumber });
    if (existingPhNumber) {
      return res.status(400).json({ error: "Phone number already exists" });
    }
    if (designation === "hod") {
      const hodExists = await StaffModel.findOne({ designation: "hod" });
      if (hodExists)
        return res.status(400).json({ error: "HOD already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new StaffModel({
      fName,
      lName,
      phNumber,
      email,
      designation,
      dept,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ message: "Staff member created successfully" });
  } catch (error) {
    console.error("Error creating staff member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/staff/view", (req, res) => {
  StaffModel.find({})
    .then((rooms) => res.json(rooms))
    .catch((err) => res.json(err.response.data));
});
app.post("/dept/add", async (req, res) => {
  try {
    const { dept } = req.body;
    // Check if the department already exists
    const existingDept = await DeptModel.findOne({ dept });
    if (existingDept) {
      return res.status(400).json({ error: "Department already exists" });
    }

    // If the department doesn't exist, create a new one
    const newDept = await DeptModel.create(req.body);
    res.json(newDept);
  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/dept/view", (req, res) => {
  DeptModel.find({})
    .then((rooms) => res.json(rooms))
    .catch((err) => res.json(err.response.data));
});
app.post("/room/add", async (req, res) => {
  try {
    // Check if the room already exists
    const existingRoom = await RoomModel.findOne({ roomname: req.body.name });
    if (existingRoom) {
      return res.status(400).json({ error: "Room already exists" });
    }

    // If the room doesn't exist, create a new one
    const newRoom = await RoomModel.create(req.body);
    res.json(newRoom);
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/room/view", (req, res) => {
  RoomModel.find({})
    .then((rooms) => res.json(rooms))
    .catch((err) => res.json(err.response.data));
});
// Update department by ID
app.put("/dept/update/:id", (req, res) => {
  const { id } = req.params;

  DeptModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedDept) => res.json(updatedDept))
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
});
// Update room by ID
app.put("/room/update/:id", (req, res) => {
  const { id } = req.params;

  RoomModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedRoom) => res.json(updatedRoom))
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
});
// Update staff by ID
app.put("/staff/update/:id", (req, res) => {
  const { id } = req.params;

  StaffModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedStaff) => res.json(updatedStaff))
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
});

// Update User
app.put("/update-user-data", async (req, res) => {
  const { _id, fName, lName, phNumber } = req.body;
  console.log(_id);
  try {
    const existingPhNumber = await StaffModel.findOne({ phNumber });
    if (existingPhNumber) {
      return res.status(400).json({ error: "Phone number already exists" });
    }
    // Find the user by _id and update the fields
    const updatedUser = await StaffModel.findByIdAndUpdate(
      _id,
      {
        fName,
        lName,
        phNumber,
      },
      { new: true }
    ); // { new: true } option returns the modified document rather than the original

    res.json(updatedUser); // Return the updated user data
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Failed to update user data" });
  }
});

// Update Password
// app.put('/update-password', async (req, res) => {
//     const { _id, pwd } = req.body;
//     console.log(_id)
//     try {

//         const hashedPassword = await bcrypt.hash(pwd, 10);
//         const updatedUser = await StaffModel.findByIdAndUpdate(_id, {
//             password:hashedPassword
//         }, { new: true }); // { new: true } option returns the modified document rather than the original

//         res.json(updatedUser); // Return the updated user data
//     } catch (error) {
//         console.error('Error updating password:', error);
//         res.status(500).json({ error: 'Failed to update password' });
//     }
// });

app.get("/staff/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const userData = await StaffModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the password field from the response for security reasons
    const { password, ...userDataWithoutPassword } = userData.toObject();
    res.json(userDataWithoutPassword);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Duty Request
app.post("/duty/request", async (req, res) => {
  try {
    const newDutyRequest = new DutyRequest(req.body);
    const savedDutyRequest = await newDutyRequest.save();
    res.json(savedDutyRequest);
  } catch (error) {
    console.error("Error submitting duty request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all duty requests
app.get("/duty/view", async (req, res) => {
  try {
    const requests = await DutyRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//View Approved duties
app.get("/view/approved", async (req, res) => {
  try {
    const requests = await DutyApproval.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Display staff approve details
app.get("/duty/:requestId", (req, res) => {
  const requestId = req.params.requestId;
  DutyRequest.findById(requestId)
    .then((request) => {
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      res.json(request);
    })
    .catch((error) => {
      console.error("Error fetching request data:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// duty approval

app.post("/staff/approve", (req, res) => {
  const approvalData = req.body;
  const newApproval = new DutyApproval(approvalData);
  newApproval
    .save()
    .then((savedApproval) => {
      const approvalId = savedApproval._id; // Extract the approval ID
      console.log("Approval data saved:", savedApproval);
      res.status(200).json({
        message: "Approval request received and processed successfully.",
        approvalId,
      });
    })
    .catch((error) => {
      console.error("Error saving approval data:", error);
      res.status(500).json({
        error: "An error occurred while processing the approval request.",
      });
    });
});

//set request status
app.put("/duty/status", (req, res) => {
  const { status, requestId } = req.body;
  DutyRequest.findByIdAndUpdate(requestId, { status }, { new: true })
    .then((updatedRequest) => {
      res
        .status(200)
        .json({ message: "Status updated successfully", updatedRequest });
    })
    .catch((error) => {
      console.error("Error updating status:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.listen(3000, () => {
  console.log("Server is running....");
});
