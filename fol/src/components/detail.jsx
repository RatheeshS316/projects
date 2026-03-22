import React ,{useEffect , useState} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios  from 'axios'
import {Link} from 'react-router-dom'

const Detail = () => {

  const { id } = useParams();
  const [posts ,setPosts] = useState([]);
  const options = {
        headers: {
          accept: "application/json",
          Authorization:
           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjNmOTU1YTlkMmY4ZjI0MTE2MTM5ZTdmZWI4Mzc3MyIsIm5iZiI6MTc1NjM1OTAyMy41MjYsInN1YiI6IjY4YWZlOTZmYmY1ZGI0ZjBkZWZhOTVlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gHcQ4hb2HiIZWOFE5Ld5tRDgSIxefY_K5c2Nx08Ukmc"
        },
      };

      useEffect(()=>{
        const ApiCall = async() =>{
          try{
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${cat}?language=en-US&page=1`
               , options)

              setPosts(allMovies);
              console.log(allMovies);
            }
            catch(error){
               console.error("Error fetching data:", error);
            }
        };
        
        ApiCall()
        console.log(posts);
      },[])

        const videoId = posts.find((video) => video.type === "Trailer")
        const video = videoId ? videoId.key : null
        const publishedAt = videoId ? videoId.published_at : null
        const type = videoId ? videoId.type : null

  return (
    <Content>
      <Container>
        <Link to="/" className="video-page-container">
        <Crosssymbol>
              <p>X</p>
        </Crosssymbol>
        </Link>
        <Background>
          <img src="/images/recommend/det.webp" />
        </Background>

        <Imagetitle>
          <img src="/images/recommend/lOGO1.avif" />
        </Imagetitle>

        <Control>
          <PlayButton>
            <img src="/images/play-icon-black.png" />
            <span>PLAY</span>
          </PlayButton>

          <TrailerButton>
            <img src="/images/play-icon-white.png" />
            <span>TRAILER</span>
          </TrailerButton>

          <AddButton>
            <span>+</span>
          </AddButton>

          <GroupButton>
            <img src="/images/group-icon.png" alt="" />
          </GroupButton>
        </Control>

        <Subtitle>
          2025 <span>.</span> U/A 13+ <span>.</span> 2hr 3m <span>.</span> 5 Languages
        </Subtitle>

        <Paragraph>
          Jithin's Heartbreak shakes his world, but when he uncovers his power-hungry professor's
          secret, he and his friends are pulled into a fight for reality.
        </Paragraph>

        <Description>
            <p>Fantasy &nbsp;|&nbsp;Comedy &nbsp;| &nbsp;SuperNatural &nbsp;|&nbsp; Bromance  </p>
        </Description>

        <Buttons>
            <p><button>Tamil</button> <button>Malayalam <span>Original</span></button> <button>Hindi</button> <button>Telugu</button></p>
        </Buttons>
      </Container>
    </Content>
  )
}

export default Detail;

// ------------------- Styled Components -------------------

const Content = styled.div``

const Container = styled.div`
  min-height: calc(100vh);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  display: flex;
  flex-direction: column;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.84), transparent);
    z-index: 1;   // 🔥 Gradient overlay
  }
`

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;  // 🔥 Background lowest
  opacity: 0.8;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`

const Imagetitle = styled.div`
  margin-top: 50px;
  min-height: 170px;
  min-width: 200px;
  z-index: 2;

  img {
    width: 35vw;
    max-width: 400px;
  }
`

const Control = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 20px;
  z-index: 2;
`

const PlayButton = styled.button`
  background-color: white;
  display: flex;
  align-items: center;
  padding: 5px 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  letter-spacing: 2px;
  cursor: pointer;

  span {
    font-weight: bold;
  }

  &:hover {
    border: 2px solid black;
  }
`

const TrailerButton = styled(PlayButton)`
  padding: 5px 16px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: 1px solid rgb(249, 249, 249);
  text-transform: uppercase;


    &:hover {
    border: 2px solid white;
  }
`

const AddButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  cursor: pointer;
`

const GroupButton = styled(AddButton)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Subtitle = styled.div`
  margin-top: 40px;
  color: whitesmoke;
  display: inline-block;
  padding: 5px 10px;
  font-weight: 600;
  font-family: sans-serif;
  z-index: 2;

  span {
    margin: 0 5px;
  }
`

const Paragraph = styled.div`
  margin-top: 10px;
  color: white;
  font-size: 16px;
  font-family: "editor.fontFamily": "Cascadia Code, Consolas, 'Courier New', monospace"
;
  line-height: 1.6;
  word-spacing: 2px;
  font-weight: 400;
  max-width: 700px;
  z-index: 2;
`

const Description = styled.div`
    z-index:2;
    margin:30px 0;

p{color:white;}
`

const Buttons  = styled.div`
z-index:2;


button{
padding:8px 15px;
background-color:rgba(0,0,0,0.3);
color:white;
border-radius:5px;
border:none;
font-size:1rem;
cursor:pointer;

span{
color:rgba(223, 198, 198, 0.37);
}

&:hover{
background-color:rgba(178, 171, 171, 0);
}
}
`

const Crosssymbol = styled.div`
    p{
    color:white;
    z-index:20;
    margin-left:99%;
    margin-top:25px;
    position:relative;
    font-family:"poppins" , sans-serif;
    font-weight:10;
    font-size:1.7rem;
    cursor:pointer;
    text-decoration:none;
    border:2px solid transparent;


        p:focus,
       p:active
         {
          outline: none;
          border: none;
          box-shadow: 0 0 0 2px transparent;
        }


    &:hover{
    transform:scale(1.5);
    transition:250ms;
    }
    }
`