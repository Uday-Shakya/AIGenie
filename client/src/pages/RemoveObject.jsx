import { EraserIcon, ScissorsIcon, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmithandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (object.split(" ").length > 1) {
        return toast("Please Enter Only One Object Name");
      }

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
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
          <Sparkles className="w-6 text-[#f014de]" />
          <h1 className="text-xl font-semibold">Object Remover</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>

        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full mt-2 p-2 px-3 border
         border-gray-300 text-gray-600 rounded-md outline-none text-sm"
          required
        />

        <p className="mt-6 text-sm font-medium">
          Describe the object to remove
        </p>

        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          placeholder="Describe What you want to Remove."
          className="w-full mt-2 p-2 px-3 border
          border-gray-300 rounded-md outline-none  text-sm"
          required
        />

        <button
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-[#f014de] to-[#cd8dba] text-white px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center text-sm"
          type="submit"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <ScissorsIcon className="w-5" />
          )}
          Remove Objects
        </button>
      </form>
      {/* Right side */}
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 ">
        <div className="flex items-center gap-3">
          <ScissorsIcon className="w-5 h-5 text-[#f014de]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col gap-3 items-center text-gray-400">
              <ScissorsIcon className="w-9 h-9 " />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <img src={content} alt="image" className="mt-3 w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
