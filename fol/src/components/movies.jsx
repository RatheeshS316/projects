import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {Link} from 'react-router-dom';

const Movies = () => {
  const [posts, setPosts] = useState([]);
  const category = ["now_playing", "popular", "top_rated", "upcoming"];

  useEffect(() => {
    const ApiCall = async () => {
      const options = {
        headers: {
          accept: "application/json",
          Authorization:
           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjNmOTU1YTlkMmY4ZjI0MTE2MTM5ZTdmZWI4Mzc3MyIsIm5iZiI6MTc1NjM1OTAyMy41MjYsInN1YiI6IjY4YWZlOTZmYmY1ZGI0ZjBkZWZhOTVlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gHcQ4hb2HiIZWOFE5Ld5tRDgSIxefY_K5c2Nx08Ukmc"
        },
      };

      try {
        const responses = await Promise.all(
          category.map((cat) =>
            axios.get(
              `https://api.themoviedb.org/3/movie/${cat}?language=en-US&page=1`,
              options
            )
          )
        );

        const allMovies = responses.flatMap((res) => res.data.results);
        setPosts(allMovies);
      } catch (error) {
        console.error(error);
      }
    };

    ApiCall();
  }, []);

  return (
    <>
      <Container>
        <h2>Recommended movies for you</h2>
        <Content>
          {posts.slice(0, 20).map((post, index) => (
            <Wrap key={index.id}>

              <Link to={`/detail/${index.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${post.backdrop_path}`}
                alt={post.title}
              />
              </Link>
            </Wrap>
          ))}
        </Content>
      </Container>

      <Container>
        <h2>Latest Releases</h2>
        <Content>
          {posts.slice(60, 80).map((post, index) => (
            <Wrap key={index.id}>
              <Link to={`/detail/${index.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${post.backdrop_path}`}
                alt={post.title}
              />
              </Link>
            </Wrap>
          ))}
        </Content>
      </Container>

      <Container>
        <h2>Action Movies</h2>
        <Content>
          {posts.slice(40, 60).map((post, index) => (
            <Wrap key={index}>
              <Link to={`/detail/${index.id}`} >
              <img
                src={`https://image.tmdb.org/t/p/w500${post.backdrop_path}`}
                alt={post.title}
              />
              </Link>
            </Wrap>
          ))}
        </Content>
      </Container>

      <Container style={{ marginBottom: "15px" }}>
        <h2>WatchList</h2>
        <Content>
          {posts.slice(20, 40).map((post, index) => (
            <Wrap key={index}>
              <Link to={`/detail/${index.id}`} >
              <img
                src={`https://image.tmdb.org/t/p/w500${post.backdrop_path}`}
                alt={post.title}
              />
              </Link>
            </Wrap>
          ))}
        </Content>
      </Container>
    </>
  );
};

export default Movies;

// ✅ Styled Components Fix
const Container = styled.div`
  margin-bottom: -30px;

  h2 {
    font-family:"poppins",sans-serif;
    font-size: 20px;
    margin: 30px 0 7px 10px;
    color: white;
    font-weight:600;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 0px 5px;
  overflow-x: visible;
  padding: 0px 1px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrap = styled.div`
  min-width: 160px;
  height: 240px;
  border-radius: 5px;
  overflow: visible;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 250ms ease, border-color 250ms ease;
  margin:5px 1px 30px  ;
  border: 2px solid rgba(255, 255, 255, 0.2);
// box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
//       rgb(0 0 0 / 72%) 0px 30px 22px -10px;

  img {
    width: 160px;
    height: 240px;
    object-fit: cover;
    display: block;
    border-radius: 5px;

    
  }

  &:hover {
    transform: scale(1.3);
    border-color: rgba(249, 249, 249, 0.9);
    
    
  }
`;




