import React from "react";
import useSingleBlog from "../../hooks/useSingleBlog";
import { baseURL } from "../../../config";
import { formatDate } from "../../utils/formatDate";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import BlogComments from "./BlogComments";
import likeIcon from "../../assets/icons/like.svg";
import favouriteIcon from "../../assets/icons/heart-filled.svg";
import unfavouriteIcon from "../../assets/icons/heart.svg";
import commentIcon from "../../assets/icons/comment.svg";
import AuthorName from "../AuthorName/AuthorName";
import { useNavigate } from "react-router-dom";

const SingleBlogContainer = ({ blogId }) => {
  const { blog, error, loading } = useSingleBlog(blogId);
  const {
    id,
    title,
    content,
    thumbnail,
    author,
    tags,
    likes,
    comments,
    createdAt,
    isFavourite,
  } = blog || {};

  const blogImage = `${baseURL}/uploads/blog/${thumbnail}`;
  const authorImage = `${baseURL}/uploads/avatar/${author?.avatar}`;
  const fullName = `${author?.firstName} ${author?.lastName}`;

  const navigate = useNavigate()

  const handleProfileClick = (e)=> {
    e.stopPropagation();
    navigate(`/profile/${author?.id}`);
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <main>
        {/* <!-- Begin Blogs --> */}
        <section>
          <div className="container text-center py-8">
            <h1 className="font-bold text-3xl md:text-5xl">{title}</h1>
            <div className="flex justify-center items-center my-4 gap-4">
              <div className="flex items-center capitalize space-x-2" onClick={handleProfileClick}>
                <div className="avater-img bg-indigo-600 text-white">
                  {author?.avatar ? (
                    <img
                      className="avater-img"
                      src={authorImage}
                      alt={fullName}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/150";
                      }}
                    />
                  ) : (
                    <span className="">{fullName.charAt(0)}</span>
                  )}
                </div>
                <h5 className="text-slate-500 text-sm">
                  <AuthorName id={author?.id} fullName={fullName} />
                </h5>
              </div>
              <span className="text-sm text-slate-700 dot">
                {formatDate(createdAt)}
              </span>
              <span className="text-sm text-slate-700 dot">
                {" "}
                {likes?.length} {likes?.length > 1 ? "Likes" : "Like"}
              </span>
            </div>
            <img
              className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
              src={blogImage}
              alt={title}
            />

            {/* <!-- Tags --> */}
            <ul className="tags">
              {tags?.length > 0 &&
                tags?.split(",")?.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>

            {/* <!-- Content --> */}
            <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
              {content}
            </div>
          </div>
        </section>
        {/* <!-- End Blogs --> */}

        {/* <!-- Begin Comments --> */}
        <BlogComments comments={comments} />
      </main>

      <div className="floating-action">
        <ul className="floating-action-menus">
          <li>
            <img src={likeIcon} alt="like" />
            <span>{likes?.length}</span>
          </li>

          <li>
            {/* <!-- There is heart-filled.svg in the icons folder --> */}
            <img
              src={isFavourite ? favouriteIcon : unfavouriteIcon}
              alt="Favourite"
            />
          </li>
          <a href="#comments">
            <li>
              <img src={commentIcon} alt="Comments" />
              <span>{comments?.length}</span>
            </li>
          </a>
        </ul>
      </div>
    </>
  );
};

export default SingleBlogContainer;
