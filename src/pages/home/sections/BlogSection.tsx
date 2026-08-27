import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";

const BlogSection = () => {
  return (
    <section className="blog-section" id="blog" aria-labelledby="blog-title">
      <div className="blog-section__inner">
        <div className="blog-heading">
          <h2 id="blog-title">Latest Blogs</h2>
          <Link className="blog-heading__cta" to="/blog">
            More blogs <span className="link-arrow" aria-hidden="true" />
          </Link>
        </div>

        <div className="blog-grid">
          {blogPosts.slice(0, 3).map((post) => (
            <article
              className={post.featured ? "blog-card blog-card--featured" : "blog-card"}
              key={post.title}
            >
              <div className="blog-card__media">
                <img src={post.image} alt={post.alt} loading="lazy" decoding="async" />
              </div>
              <div className="blog-card__content">
                <time dateTime={post.datetime}>{post.date}</time>
                <h3>{post.title}</h3>
                {!post.featured && <p>{post.excerpt}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { BlogSection };
