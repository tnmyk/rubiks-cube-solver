import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link
        to="/solve"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          color: "white",
          padding: "1rem",
          backgroundColor: "black",
        }}
      >
        Go to solver
      </Link>
    </>
  );
};

export default Home;
