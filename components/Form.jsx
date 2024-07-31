import Link from "next/link"

const Form = ({type ,post ,setPost , submitting , handleSubmit }) => {
  return (
    <div className="w-full flex flex-col">

      <h1 className="head_text orange_gradient ">
        <span>{type} prompts</span>
      </h1>

      <p className="desc max-w-md">
        {type} and share awesome prompts to the world !
      </p>

      <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex flex-col gap-7 mt-6 glassmorphism "
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e)=>setPost({...post , prompt: e.target.value})}
            placeholder="write your prompt here...."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Tag {` `}
            <span className="font-normal">(#product , #webdev)</span>
          </span>
          <input
            type="text"
            value={post.tag}
            onChange={(e)=>setPost({...post , tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end gap-3">
            <Link href='/'>Cancel</Link>
            <button 
            type="submit" 
            disabled={submitting}
            className="px-5 pb-2 pt-1.5 rounded-full bg-blue-600 text-white text-sm"
            >
              {submitting ? `${type}...` : type}
            </button>
            
        </div>

      </form>
      
    </div>
  )
}

export default Form
