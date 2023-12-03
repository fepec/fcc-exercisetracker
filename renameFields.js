console.log(
    'This script renames the name field in User to username. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require('./models/user')

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));



async function main() {
    let res
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    try {
        res = await User.updateMany({}, {
            $rename: {
                name: "username"
            }
        });
    }
    catch (err) {
        console.log('Error renaming field:', err)
    }
    finally {
        console.log(res)
        console.log("Debug: Done. Closing mongoose");
        mongoose.connection.close();
    }
}
