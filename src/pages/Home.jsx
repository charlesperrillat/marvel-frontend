import "../assets/styles/home.css";

import spidermanMeme from "../assets/images/Shirt-Spider-Man-Meme.avif";

const Home = () => {
  return (
    <main>
      <div className="home-container">
        <h1>Welcome to the unoffical 2010 Marvel website!</h1>
        <h2>"With great power comes great responsibility"</h2>
        <span>Uncle Ben's 🍚</span>
        <img src={spidermanMeme} alt="spiderman meme" />
      </div>
    </main>
  );
};

export default Home;
