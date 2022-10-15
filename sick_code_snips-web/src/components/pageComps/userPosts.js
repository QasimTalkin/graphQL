import { useQuery } from '@apollo/client';
import { QUERY_POST_BY_USERNAME } from '../../utils/queries';
import Loading from '../Atom/loading';
import UserPost from '../Atom/userPost';
export default function UserPosts() {
  const { loading, data } = useQuery(QUERY_POST_BY_USERNAME, {
    variables: { userName: 'Daryl_Roob' },
  });

  const posts = data?.userPosts || [];
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {posts && posts.map((post) => <UserPost key={post._id} post={post} />)}
        </>
      )}
    </div>
  );
}