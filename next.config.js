const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx"],
  target: "server",
  async redirects() {
    return [
      {
        source: "/roswell",
        destination: "http://give.roswellpark.org/goto/danstarner",
        permanent: true,
      },
    ];
  },
});
