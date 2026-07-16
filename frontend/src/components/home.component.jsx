import React, { useState, useEffect } from 'react';
import BlogCard from './blog-card.component.jsx';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Define the fetch function
  const fetchBlogs = async (pageToFetch) => {
    setLoading(true);
    try {
      // Assuming your backend runs on port 5000 and the route is /api/v1/blogs
      const response = await fetch(`http://localhost:5000/api/v1/blogs?page=${pageToFetch}&limit=10`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();
      
      // If it's page 1, replace the blogs array. If it's page 2+, append to the existing array.
      if (pageToFetch === 1) {
        setBlogs(data.blogs);
      } else {
        setBlogs(prevBlogs => [...prevBlogs, ...data.blogs]);
      }
      
      setHasMore(data.hasMore);
      
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch page 1 when the component first mounts
  useEffect(() => {
    fetchBlogs(1);
  }, []);

  // Handle the "Load More" button click
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(nextPage);
  };

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Latest Blogs</h1>
      
      {/* Map through the blogs array and render a BlogCard for each */}
      <div className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.blog_id} blog={blog} />
        ))}
      </div>

      {/* Show loading text if we are fetching data */}
      {loading && (
        <div className="text-center py-6 text-gray-500">
          Loading...
        </div>
      )}

      {/* Only show the Load More button if we aren't loading AND there are more pages */}
      {!loading && hasMore && blogs.length > 0 && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={loadMore}
            className="h-11 rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white hover:bg-zinc-800 sm:h-12 sm:px-8 sm:text-base transition-colors"
          >
            Load more
          </button>
        </div>
      )}

      {/* Show a message when they hit the end */}
      {!hasMore && blogs.length > 0 && (
        <p className="text-center text-zinc-500 mt-8 font-medium">
          You've reached the end!
        </p>
      )}

      {/* Show a message if there are no blogs at all */}
      {!loading && blogs.length === 0 && (
        <p className="text-center text-zinc-500 mt-8 font-medium">
          No blogs published yet.
        </p>
      )}
    </section>
  );
};

export default Home;