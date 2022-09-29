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
  // create posts
  let createdPosts = [];
  for (let i = 0; i < 100; i++) {
    const title = faker.lorem.words(Math.round(Math.random() * 6) + 1);
    const postSnippet = faker.lorem.words(Math.round(Math.random() * 25) + 1);
    const upVotes = Math.floor(Math.random() * 100) + 1;
    const downVotes = Math.floor(Math.random() * 20) + 1;
    const userName = createdUsers.ops[Math.floor(Math.random() * createdUsers.ops.length)].userName;
    const language = faker.lorem.words(Math.round(Math.random() * 5) + 1);
    const reactions = [];
    for (index of [...Array(Math.floor(Math.random() * 10) + 1)]) {
        reactions.push({
        userName: createdUsers.ops[Math.floor(Math.random() * createdUsers.ops.length)].userName, 
        reactionBody: faker.lorem.words(Math.round(Math.random() * 5) + 1)
      });
    }
    createdPosts.push({ title, postSnippet, userName, upVotes, downVotes, language, reactions });
  }
  let post = await Posts.collection.insertMany(createdPosts);
  // connect posts to users
  for (let i = 0; i < 100; i++) {
    const randomUser = createdUsers.ops[Math.floor(Math.random() * createdUsers.ops.length)];
    // get post from that user
    const postByRandomUser = post.ops.filter(post => post.userName === randomUser.userName);
    await Users.findOneAndUpdate(
      { userName: randomUser.userName },
      { $addToSet: { posts: postByRandomUser } }
    );
  }

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