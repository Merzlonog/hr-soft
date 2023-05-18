import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import axios from "../axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, []); // eslint-disable-line

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        tags={data.tags}
        position={data.position}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};
