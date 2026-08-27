import { Link } from "react-router-dom";
import { useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { blogCategories, blogPosts, blogTags } from "@/data/blog";

const BlogListingPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const searchable = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();

    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
  });

  return (
    <main className="site-shell blog-listing-page">
      <section className="blog-listing-hero" aria-labelledby="blog-listing-title">
        <SiteHeader activePage="blog" />
        <img
          className="blog-listing-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="blog-listing-hero__shade" />
        <div className="blog-listing-hero__content">
          <p className="section-kicker">
            <span />
            Insights
          </p>
          <h1 id="blog-listing-title">Blog</h1>
          <p>
            Notes on sharper websites, better interfaces, useful AI workflows, and quieter ways to
            make digital work mean more.
          </p>
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Blog</span>
          </nav>
        </div>
      </section>

      <section className="blog-listing-section" id="blog-list" aria-label="Blog listing">
        <div className="blog-listing-section__inner">
          <div className="blog-listing-layout">
            <div className="blog-listing-feed">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article className="listing-post-card" key={post.title}>
                    <Link className="listing-post-card__media" to="/blog" aria-label={post.title}>
                      <img src={post.image} alt={post.alt} />
                    </Link>
                    <div className="listing-post-card__content">
                      <div className="listing-post-card__meta">
                        <time dateTime={post.datetime}>{post.date}</time>
                        <span>By {post.author}</span>
                        <span>Comments({post.comments})</span>
                      </div>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <Link className="listing-post-card__link" to="/blog">
                        Read more <span className="link-arrow" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <div className="blog-empty-state">
                  <h2>No quiet wisdom found.</h2>
                  <p>Try another search or reset the category filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setActiveCategory("All");
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              )}

              <nav className="blog-pagination" aria-label="Blog pagination">
                <Link className="is-active" to="/blog" aria-label="Page 1">
                  1
                </Link>
                <Link to="/blog" aria-label="Page 2">
                  2
                </Link>
                <Link to="/blog" aria-label="Next page">
                  &raquo;
                </Link>
              </nav>
            </div>

            <aside className="blog-sidebar" aria-label="Blog sidebar">
              <form
                className="blog-sidebar-card blog-search"
                onSubmit={(event) => event.preventDefault()}
              >
                <label htmlFor="blog-search">Search</label>
                <div>
                  <input
                    id="blog-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search..."
                  />
                  <button type="submit" aria-label="Search posts">
                    Search
                  </button>
                </div>
              </form>

              <div className="blog-sidebar-card">
                <h2>Recent posts</h2>
                <div className="recent-posts">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link className="recent-post" to="/blog" key={post.title}>
                      <img src={post.image} alt="" aria-hidden="true" />
                      <span>
                        <small>{post.date}</small>
                        <strong>{post.title}</strong>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="blog-sidebar-card">
                <h2>Category</h2>
                <div className="category-list">
                  <button
                    type="button"
                    className={activeCategory === "All" ? "is-active" : ""}
                    onClick={() => setActiveCategory("All")}
                  >
                    <span>All posts</span>
                    <strong>{blogPosts.length}</strong>
                  </button>
                  {blogCategories.map((category) => (
                    <button
                      type="button"
                      className={activeCategory === category.name ? "is-active" : ""}
                      onClick={() => setActiveCategory(category.name)}
                      key={category.name}
                    >
                      <span>{category.name}</span>
                      <strong>{category.count}</strong>
                    </button>
                  ))}
                </div>
              </div>

              <div className="blog-sidebar-card">
                <h2>Popular tags</h2>
                <div className="tag-cloud">
                  {blogTags.map((tag) => (
                    <Link to="/blog" key={tag}>
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter page="blog" />
    </main>
  );
};

export { BlogListingPage };
