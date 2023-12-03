#! /usr/bin/env node

console.log(
  'This script populates some test users and exercises your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require('./models/user')
const Exercise = require('./models/exercise')


const users = [];
const exercises = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createExercises();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function userCreate(index, username) {
  const user = new User({ username: username });
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function exerciseCreate(index, description, duration, date, user) {
  const exercisedetail = { description: description, duration: duration, user: user };
  if (date != false) exercisedetail.date = date;

  const exercise = new Exercise(exercisedetail);

  await exercise.save();
  exercise[index] = exercise;
  console.log(`Added exercise: ${description} ${date} ${duration}`);
}


async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "Tobi"),
    userCreate(1, "Zuri"),
    userCreate(2, "Oto"),
    userCreate(3, "Sandra"),
    userCreate(4, "Pp")
  ]);
}

async function createExercises() {
  console.log("Adding exercises");
  await Promise.all([
    exerciseCreate(1, "Jumping Jacks", "20", "2023-09-05", users[1]),
    exerciseCreate(2, "Rope Jump", "5", "2023-08-20", users[4]),
    exerciseCreate(3, "Pullups", "15", "2023-08-10", users[2]),
    exerciseCreate(4, "Rope Jump", "10", "2023-08-15", users[4]),
    exerciseCreate(5, "Pullups", "5", "2023-11-20", users[1]),
    exerciseCreate(6, "Pullups", "5", "2023-10-20", users[3]),
    exerciseCreate(7, "Rope Jump", "5", "2023-09-10", users[4]),
    exerciseCreate(8, "Pullups", "5", "2023-11-05", users[3]),
    exerciseCreate(9, "Hip Thrust", "10", "2023-08-20", users[0]),
    exerciseCreate(10, "Rope Jump", "15", "2023-11-20", users[3]),
    exerciseCreate(11, "Rope Jump", "20", "2023-10-05", users[0]),
    exerciseCreate(12, "Rope Jump", "5", "2023-08-20", users[4]),
    exerciseCreate(13, "Pullups", "15", "2023-08-20", users[3]),
    exerciseCreate(14, "Hip Thrust", "5", "2023-11-10", users[2]),
    exerciseCreate(15, "Hip Thrust", "20", "2023-08-15", users[1]),
    exerciseCreate(16, "Jogging", "10", "2023-08-05", users[4]),
    exerciseCreate(17, "Pushups", "5", "2023-10-15", users[0]),
    exerciseCreate(18, "Jumping Jacks", "20", "2023-10-15", users[3]),
    exerciseCreate(19, "Hip Thrust", "10", "2023-08-20", users[1]),
    exerciseCreate(20, "Rope Jump", "10", "2023-08-20", users[4]),
    exerciseCreate(21, "Jogging", "5", "2023-08-10", users[1]),
    exerciseCreate(22, "Pullups", "15", "2023-09-05", users[2]),
    exerciseCreate(23, "Jumping Jacks", "15", "2023-10-15", users[0]),
    exerciseCreate(24, "Pushups", "15", "2023-11-05", users[1]),
    exerciseCreate(25, "Jogging", "20", "2023-10-20", users[2]),
    exerciseCreate(26, "Pullups", "5", "2023-08-20", users[1]),
    exerciseCreate(27, "Pushups", "5", "2023-09-20", users[2]),
    exerciseCreate(28, "Rope Jump", "15", "2023-09-10", users[1]),
    exerciseCreate(29, "Pushups", "10", "2023-09-15", users[0]),
    exerciseCreate(30, "Hip Thrust", "15", "2023-09-05", users[0]),
    exerciseCreate(31, "Rope Jump", "15", "2023-09-05", users[2]),
    exerciseCreate(32, "Pullups", "15", "2023-11-20", users[2]),
    exerciseCreate(33, "Pushups", "10", "2023-11-20", users[2]),
    exerciseCreate(34, "Jogging", "5", "2023-11-15", users[0]),
    exerciseCreate(35, "Pushups", "5", "2023-10-10", users[2]),
    exerciseCreate(36, "Hip Thrust", "20", "2023-11-15", users[3]),
    exerciseCreate(37, "Pullups", "5", "2023-11-10", users[4]),
    exerciseCreate(38, "Pushups", "15", "2023-09-20", users[3]),
    exerciseCreate(39, "Pullups", "20", "2023-10-10", users[3]),
    exerciseCreate(40, "Hip Thrust", "20", "2023-10-10", users[4]),
    exerciseCreate(41, "Hip Thrust", "5", "2023-08-05", users[1]),
    exerciseCreate(42, "Rope Jump", "15", "2023-11-15", users[0]),
    exerciseCreate(43, "Rope Jump", "20", "2023-10-05", users[3]),
    exerciseCreate(44, "Jumping Jacks", "15", "2023-08-15", users[0]),
    exerciseCreate(45, "Jogging", "5", "2023-10-15", users[2]),
    exerciseCreate(46, "Pullups", "5", "2023-09-10", users[1]),
    exerciseCreate(47, "Pushups", "20", "2023-11-15", users[1]),
    exerciseCreate(48, "Jogging", "10", "2023-09-15", users[4]),
    exerciseCreate(49, "Jumping Jacks", "20", "2023-08-05", users[0]),
    exerciseCreate(50, "Pullups", "15", "2023-10-10", users[0]),
    exerciseCreate(51, "Rope Jump", "15", "2023-11-15", users[3]),
    exerciseCreate(52, "Jogging", "10", "2023-11-10", users[0]),
    exerciseCreate(53, "Rope Jump", "5", "2023-11-15", users[4]),
    exerciseCreate(54, "Pullups", "15", "2023-10-10", users[1]),
    exerciseCreate(55, "Rope Jump", "15", "2023-11-15", users[4]),
  ]);
}