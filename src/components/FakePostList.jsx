import { useEffect, useState } from "react";
import axios from "axios";

function FakePostList() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchData = () => {
    setLoading(true);
    axios.get("https://dummyjson.com/posts")
      .then(res => {
        setPosts(res.data.posts);
        setFiltered(res.data.posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (value === "") {
      setFiltered(posts);
    } else {
      setFiltered(posts.filter(p => p.userId === Number(value)));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Fake Posts</h2>

      <button onClick={fetchData}>Refresh</button>

      <br /><br />

      <select value={filter} onChange={handleFilter}>
        <option value="">All Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>

      {filtered.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default FakePostList;