import Feed from "@/components/Feed"

const Home = () => {
  return (
    <div className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Learn and Exchange
        <br className="max-md:hidden"/>
      <span className="orange_gradient text-center">AI-powered prompts</span>
      </h1>

      <p className="desc text-center">
      An open-source tool dedicated to discovering and sharing innovative AI prompts. Users can explore, submit and discuss a variety of prompts.
      </p>

      <Feed/>
    </div>
  )
}

export default Home
