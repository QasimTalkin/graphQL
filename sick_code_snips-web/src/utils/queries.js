import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query posts {
  posts {
    postSnippet
    userName
    upVotes
    reactions {
      userName
      reactionBody
    }
  }
}
`;

export const QUERY_POST_BY_USERNAME = gql`
  query userPosts($userName: String!) {
    userPosts(userName: $userName) {
      _id
      title
      postSnippet
      createdAt
      userName
      reactions {
        _id
        reactionBody
        userName
      }
    }
  }
`;
