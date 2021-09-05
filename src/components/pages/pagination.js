import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./blogs.css";
import icon from "../images/bookmark.svg";
import authorPic from "../images/img-2.jpg";
import pic from "../images/img-1.jpg";

function dateFormat(date) {
  var pieced = date.split("/")
  var formatted = pieced[1];
  switch(pieced[0]) {
      case "01":
          formatted += " January, "
          break;
      case "02":
          formatted += " February, "
          break;
      case "03":
          formatted += " March, "
          break;
      case "04":
          formatted += " April, "
          break;
      case "05":
          formatted += " May, "
          break;
      case "06":
          formatted += " June, "
          break;
      case "07":
          formatted += " July, "
          break;
      case "08":
          formatted += " August, "
          break;
      case "09":
          formatted += " September, "
          break;
      case "10":
          formatted += " October, "
          break;
      case "11":
          formatted += " November, "
          break;
      case "12":
          formatted += " December, "
          break;
      default:
          formatted += " NaN, "
  }
  formatted += pieced[2]

  return formatted
}

function Blog(blog) {
  return (
    <div className="blog-box">
      <div id="bmi">
        <img
          src={icon}
          alt="bookmark-icon"
          className={blog.bookmarked ? "bookmark-icon" : "bookmark-icon-inactive"}
        />
      </div>
      <div className="heading">
        <img src={authorPic} alt="author-pic" className="author-pic" />
        <div className="info">
          <d id="username">{blog.user}</d>
          <d id="date">{blog.date}</d>
        </div>
        <i id="likes-icon" className="fa fa-heart" />
        <div id="likes">{blog.likes}</div>
      </div>

      <div className="body" onClick={() => {window.location = "/blog"}}>
        <img src={pic} alt="blog-pic" className="image" />

        <div className="content">
          <h1>{blog.heading}</h1>
          <p>{blog.content}</p>
        </div>

        <div class="footing">
          <a href="#" className="author">
            <i class="fa fa-user"></i> {blog.author}
          </a>
          <a href="#" className="tags">
            <i class="fa fa-tag fa-flip-horizontal"></i> {blog.tags}
          </a>
          <a href="#" className="time">
            <i class="fa fa-clock-o"></i> {blog.time}
          </a>
        </div>
      </div>
    </div>
  );
}

const blogsPerPage = 10;
let arrayForHoldingBlogs = [];

const Blogs = ({ blogs, loading, error }) => {
  if (loading) {
    return (
      <div id="load-ani">
      <Loader
        type="Rings"
        color="#FFBD06"
        height={100}
        width={100}
      />
      </div>
    );
  }
  if (error) {
    return (
      <div id="load-ani">
        Oops! There seems to be an error.<br/>Please try again.
      </div>
    );
  }

  var blogHolder = [];
  blogs.map((blog) =>
    blogHolder.push(
      <Blog
        user="silverduck204"
        authorPic="{blogs[i].authorPic}"
        date={dateFormat(blog.Date)}
        likes="24"
        pic="{blogs[i].pic}"
        heading={blog.Title}
        content={blog.Description}
        author={blog.Author}
        tags="Horror,timepass"
        time="2 min"
        bookmarked={true}
      />
    )
  );

  return <div>{blogHolder}</div>;
};

function Pagination() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogsToShow, setBlogsToShow] = useState([]);
  const [next, setNext] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      await axios.get("https://azz75mvkyi.execute-api.ap-south-1.amazonaws.com/Prod/readBlog").then(res => {console.log(res); setBlogs(res.data.data.Items)}).catch(error => {console.log("Error! " + error); setError(true)});
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const loopWithSlice = (start, end) => {
    const slicedBlogs = blogs.slice(start, end);
    arrayForHoldingBlogs = [...arrayForHoldingBlogs, ...slicedBlogs];
    setBlogsToShow(arrayForHoldingBlogs);
  };

  useEffect(() => {
    if (next === 0 && blogs.length > 0) {
      loopWithSlice(0, blogsPerPage);
      console.log(blogs);
    }
  }, [blogs, next]);

  const handleShowMoreBlogs = () => {
    loopWithSlice(next, next + blogsPerPage);
    setNext(next + blogsPerPage);
  };

  return (
    <div>
      <Blogs blogs={blogsToShow} loading={loading} error={error} />
      <div
        id={next >= 11 || (loading || error) ? "load-inactive" : "load-up"}
        onClick={handleShowMoreBlogs}
      >
        <a id="load">Load more</a>
      </div>
    </div>
  );
}

export default Pagination;