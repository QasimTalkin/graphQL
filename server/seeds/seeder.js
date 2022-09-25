// use faker js to seed the database with 20 users
// and 6 posts for each user
const { Users, Posts } = require('../models');
const faker = require('faker');
const db = require('../config/connection');

db.once('open', async () => {
  await Users.deleteMany({});
  await Posts.deleteMany({});

  // create user data
  const userData = [];
  for (let i = 0; i < 20; i++) {
    const userName = faker.internet.userName();
    const email = faker.internet.email(userName);
    const password = faker.internet.password();

    userData.push({ userName, email, password });
  }

  const createdUsers = await Users.collection.insertMany(userData);
    console.log(createdUsers);
  // create posts
  let createdPosts = [];
  for (let i = 0; i < 100; i++) {
    const title = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const postText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const userName = createdUsers.ops[Math.floor(Math.random() * createdUsers.ops.length)].userName;
    const language = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    
    createdPosts.push({ title, postText, userName });
  }

  await Posts.collection.insertMany(createdPosts);

  // create followers for users 
  for (let i =0; i < 100; i++) {
    const { _id: userId } = createdUsers.ops[Math.floor(Math.random() * createdUsers.ops.length)];
    let followerID = userId; 
    while (followerID === userId) {
      followerID = createdUsers.ops[Math.floor(Math.random() * createdUsers.ops.length)]._id;
    }
    await Users.updateOne( { _id: userId }, { $addToSet: { following: followerID } } );
  }  

// add reactions to the posts
  



  console.log('all done!');
  process.exit(0);
  
});