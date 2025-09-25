import { Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli Style",
    "3D Illustration",
    "Anime",
    "Cartoon",
    "Comics",
    "Digital Art",
    "Fantasy Art",
    "Isometric",
    "Line Art",
    "Low Poly",
    "Pixel Art",
    "Pop Art",
    "Surreal",
    "Vector Art",
    "Watercolor",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  
  const { getToken } = useAuth();

  const onSubmithandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const prompt = `Generate an Image of ${input} in the style ${selectedStyle}`

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, published },
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
          <Sparkles className="w-6 text-[#3ef53b]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image</p>

        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          placeholder="Describe What you want to see."
          className="w-full mt-2 p-2 px-3 border border-gray-300 rounded-md outline-none  text-sm"
          required
        />
        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-2 flex gap-3 flex-wrap sm:max-w-9/11">
          {imageStyle.map((item) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? "bg-red-50 text-green-400"
                  : "text-gray-300 border-gray-500"
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
            </div>
          </label>
          <p className="text-sm">Make this Image Public</p>
        </div>
        <button disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-[#3ef53b] to-[#41820e] text-white px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center text-sm gap-2"
          type="submit"
        >
          {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Image className="w-5" />}
           Generate Images
        </button>
      </form>
      {/* Right side */}
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 ">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-[#3ef53b]" />
          <h1 className="text-xl font-semibold">Generated Images</h1>
        </div>
        {
          !content ? (
             <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col gap-3 items-center text-gray-400">
            <Image className="w-9 h-9 " />
            <p>Enter the Image Title and click Generate Images</p>
          </div>
        </div>
          ) : (
            <div className='mt-3 h-full '>
              <img src={content} alt="Generated Image" className='w-full h-full '/>
            </div>
          )
        }
       
      </div>
    </div>
  );
};

export default GenerateImages;
