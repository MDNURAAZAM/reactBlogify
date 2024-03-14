import React, { useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const CreateBlogContainer = () => {
  const { axiosInstance } = useAxios();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const imgRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormData({ ...formData, [name]: value?.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const navigate = useNavigate();

  const handleUploadClick = () => {
    imgRef.current.addEventListener("change", handleImageChange);
    imgRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!thumbnail) {
    //   console.error("Please select an image.");
    //   return;

    // }
    try {
      const formDataWithImage = new FormData();
      //   if(imgRef.current?.files[0]){
      //     formDataWithImage?.append("thumbnail", imgRef.current?.files[0]);
      //   }
      for (const file of imgRef.current?.files) {
        formDataWithImage?.append("thumbnail", file);
      }

      // Append other form fields to FormData
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }

      const response = await axiosInstance.post("/blogs/", formDataWithImage);
      console.log(response);
      if (response.status == 201) {
        navigate(`/blogs/${response?.data?.blog?.id}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <main>
      <section>
        <div className="container">
          {/* <!-- Form Input field for creating Blog Post --> */}
          <form className="createBlog" onSubmit={handleSubmit}>
            {image && (
              <div
                onClick={handleUploadClick}
                className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4"
              >
                <img
                  className="h-[150px] w-full"
                  src={image}
                  alt={"blog Image"}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
            )}
            <div
              style={{ visibility: image ? "hidden" : "visible" }}
              onClick={handleUploadClick}
              className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4"
            >
              <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <input type="file" accept="image/*" ref={imgRef} hidden />
                <p>Upload Your Image</p>
              </div>
            </div>

            <div className="mb-6">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your blog title"
              />
            </div>

            <div className="mb-6">
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags?.join(",")}
                onChange={handleChange}
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              />
            </div>

            <div className="mb-6">
              <textarea
                id="content"
                name="content"
                placeholder="Write your blog content"
                rows="8"
                value={formData.content}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              //   href="./createBlog.html"
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Create Blog
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateBlogContainer;
