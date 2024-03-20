import mongoose from "mongoose";

// First Class of Data Base

// DB Connect
mongoose.connect("mongodb://127.0.0.1:27017/mongodb")
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("error -------: ", err);
    })    // Database Successfully connected

// Create Schema in DataBase
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true
    },
    learningMode: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    }
})

// Create Models using Schema or Collection
const User = new mongoose.model("User", userschema)

// Insert One Document in DB
// // 1.  Using async await 
const createDocument = async () => {
    // Create a User Data
    const user1 = User({
        name: "Hemant Bhargav",
        course: "Web-Dev",
        learningMode: "Offline",
        fee: 30000,
    })
    // Save the User Data by using '.save()' method
    await user1.save()
}
// Call the function
createDocument()

// // 2. Using Promises
// Create a User Data
const promisesUser = User({
    name: 'Karan Singh',
    course: 'Data Modeling',
    learningMode: 'Offline',
    fee: 30000,
})
// Save the Document
promisesUser.save()
    // While using promises use 'then & catch' for data and error handeling
    .then(() => {
        console.log("Data Successfully saved");
    })
    .catch((err) => {
        console.log('error ---- :', err);
    })

// Insert Multiple Document in DB
const users = async () => {
    // While using async await function use 'try & catch' for data and error handeling
    try {
        const kanishka = User({
            name: "kanishka",
            course: "webdev",
            learningMode: "online",
            fee: 45000
        })
        const rudrani = User({
            name: "rudrani",
            course: "fullstack",
            learningMode: "online",
            fee: 40000
        })
        const priyanshi = User({
            name: "priyanshi",
            course: "fullstack",
            learningMode: "online",
            fee: 30000
        })
        const farheen = User({
            name: "farheen",
            course: "wev dev",
            learningMode: "offline",
            fee: 50000
        })
        // Use Array in insertMany method
        User.insertMany([kanishka, rudrani, priyanshi, farheen])
    } catch (err) {
        console.log("error :", err)
    }
}

users();

// Read or Find Data
const findAllData = async () => {
    const result = await User.find();
    console.log(result);
}

findAllData();

const findDataType1 = async () => {
    const result = await User.find({ learningMode: "Online" })
    console.log(result);
}

findDataType1()

const findDataType2 = async () => {
    const result = await User.find({ learningMode: "Offline" }).select({ name: 1 })
    console.log(result)
}

findDataType2();

const findDataType3 = async () => {
    const result = await User.find({ learningMode: "online" })
        .select({ name: 1 })
        .limit(2)
    console.log(result)
}

findDataType3();

// Use of Relative Operators
const getdata1 = async () => {
    const result = await User.find({ fee: { $nin: [50000, 40000] } })
        .select({ name: 1 })
    console.log(result)
}
getdata1();

const getdata2 = async () => {
    const result = await User.find({ fee: { $in: [50000, 40000] } })
        .select({ name: 1 })
    console.log(result)
}
getdata2(); // for more visit "mongoose relative operator"

// Use of Logical Operators "and, or, not & xor"
const getdata3 = async () => {
    const result = await User.find({ $and: [{ course: "Web-Dev" }, { fee: 40000 }] })
        .select({ name: 1 })
    console.log(result)
}
getdata3();

const getdata4 = async () => {
    const result = await User.find({ $or: [{ course: "web dev" }, { fee: 40000 }] })
        .select({ name: 1 })
    console.log(result)
}
getdata4();

const getdata5 = async () => {
    try {
        const result = await User.find({ $or: [{ course: "web dev" }, { fee: { $gt: 40000 } }] })
            .select({ name: 1 })
        console.log(result)
    } catch (err) {
        console.log("error --", err)
    }
}
getdata5();
