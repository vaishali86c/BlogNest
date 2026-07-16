import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const {
    blog_id,
    title,
    des,
    banner,
    tags,
    activity,
    publishedAt,
    author,
  } = blog;

  const authorInfo = author?.personal_info;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <Link
      to={`/${blog_id}`}
      className="group block rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Text content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
          {/* Author row */}
          {authorInfo && (
            <div className="flex items-center gap-2">
              <img
                src={authorInfo.profile_img}
                alt={authorInfo.fullname}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="truncate text-sm font-medium text-zinc-700">
                {authorInfo.fullname}
              </span>
              <span className="text-xs text-zinc-400">·</span>
              <time className="text-xs text-zinc-400">{formattedDate}</time>
            </div>
          )}

          <h2 className="line-clamp-2 text-lg font-bold leading-snug text-zinc-900 group-hover:text-emerald-600 sm:text-xl">
            {title}
          </h2>

          {des && (
            <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
              {des}
            </p>
          )}

          {/* Tags & stats */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600"
              >
                {tag}
              </span>
            ))}

            {activity && (
              <span className="ml-auto flex items-center gap-3 text-xs text-zinc-400">
                <span>{activity.total_likes ?? 0} likes</span>
                <span>{activity.total_reads ?? 0} reads</span>
              </span>
            )}
          </div>
        </div>

        {/* Banner image */}
        {banner && (
          <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-36 sm:w-48">
            <img
              src={banner}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
