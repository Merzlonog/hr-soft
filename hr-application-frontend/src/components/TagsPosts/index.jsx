import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../redux/slices/posts";
import { Grid } from "@mui/material";
import { Post } from "../Post";

const TagsPosts = () => {
  const { name } = useParams();

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const isPostsLoadind = posts.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
  }, []); // eslint-disable-line

  const sortedAndSearchedPosts = posts.items.filter((post) =>
    post.tags.join(",").toLowerCase().includes(name.toLowerCase())
  );

  return (
    <>
      <h1>#{name}</h1>
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
                  isEditable={userData?._id}
                />
              )
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default TagsPosts;
