import { Edit, Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Health",
    "Finance",
    "Travel",
    "Food",
    "Lifestyle",
    "Education",
    "Entertainment",
    "Sports",
    "Business",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a Blog Title for a keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4">
      {/* Left side */}
      <form
        onSubmit={onSubmithandler}
        className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#ff5e5e]" />
          <h1 className="text-xl font-semibold">Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="E.g. The future of AI in healthcare"
          className="w-full mt-2 p-2 px-3 border border-gray-300 rounded-md outline-none  text-sm"
          required
        />
        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-2 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedCategory === item
                  ? "bg-red-50 text-red-400"
                  : "text-gray-300 border-gray-500"
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <button disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-[#dc3a3a] to-[#bc3d20] text-white px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center text-sm"
          type="submit"
        >
          {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Hash className="w-5" />}
           Generate Title
        </button>
      </form>
      {/* Right side */}
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 ">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#ff5e5e]" />
          <h1 className="text-xl font-semibold">Generated Titles</h1>
        </div>
        {
          !content ? ( <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col gap-3 items-center text-gray-400">
            <Hash className="w-9 h-9 " />
            <p>Enter the topic to generate Titles.</p>
          </div>
        </div>) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
                          <div className='reset-tw'>
                            <Markdown>
                            {content}
                            </Markdown>
                          </div>
                      </div>
        )
        }
       
      </div>
    </div>
  );
};

export default BlogTitles;
