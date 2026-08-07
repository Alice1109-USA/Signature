module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css/style.css": "css/style.css" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
