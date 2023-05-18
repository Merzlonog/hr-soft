import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import PostFilter from "../components/PostFilter";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const [filter, setFilter] = useState({ query: "" });

  const isPostsLoadind = posts.status === "loading";
  const isTagsLoadind = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []); // eslint-disable-line

  const sortedAndSearchedPosts = posts.items.filter((post) =>
    post.title.toLowerCase().includes(filter.query.toLowerCase())
  );

  if (!sortedAndSearchedPosts.length) {
    return (
      <>
        <Tabs
          style={{ marginBottom: 15 }}
          value={0}
          aria-label="basic tabs example"
        >
          <PostFilter filter={filter} setFilter={setFilter} />
        </Tabs>
        <div style={{ margin: "300px auto" }}>
          <div
            style={{
              fontSize: "50px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Нет актуальных анкет
          </div>
          <div
            style={{ margin: "0 auto", textAlign: "center", fontSize: "14px" }}
          >
            Создайте анкету на должность
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <PostFilter filter={filter} setFilter={setFilter} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoadind ? [...Array(5)] : sortedAndSearchedPosts).map(
            (obj, index) =>
              isPostsLoadind ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  id={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                  }
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  tags={obj.tags}
                  position={obj.position}
                  isEditable={userData?._id}
                />
              )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoadind} />
        </Grid>
      </Grid>
    </>
  );
};
