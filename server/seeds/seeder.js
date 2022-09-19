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
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await Users.collection.insertMany(userData);

  // create posts
  let createdPosts = [];
  for (let i = 0; i < 100; i++) {
    const title = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const postText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const username = createdUsers.ops[Math.floor(Math.random() * createdUsers.ops.length)].username;
    const language = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    
    createdPosts.push({ title, postText, username });
  }

  await Posts.collection.insertMany(createdPosts);

  console.log('all done!');
  process.exit(0);
  
});