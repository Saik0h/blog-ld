const { writeFileSync } = require("fs");

const staticRoutes = [
  "/",
  "/contato",
  "/curriculo",
  "/cursos",
  "/materiais",
  "/artigos",
  "/blogs",
];

const apiUrl = "https://laisdonida-be.onrender.com/api";

const getNonStaticRoutes = async () => {
  try {
    const blogsRes = await fetch(`${apiUrl}/blogs`);
    const artigosRes = await fetch(`${apiUrl}/articles`);

    const blogs = await blogsRes.json();
    const artigos = await artigosRes.json();

    return { blogs, artigos };
  } catch (err) {
    console.error("Erro ao buscar dados dinâmicos:", err);
    return { blogs: [], artigos: [] };
  }
};

const main = async () => {
  const { blogs, artigos } = await getNonStaticRoutes();

  const dynamicBlogRoutes = blogs.map((b) => `/blogs/${b.id}</loc>
    <lastmod>${b.updatedAt.split('T')[0]}</lastmod>
  </url>`);
  const dynamicArtigoRoutes = artigos.map((a) => `/artigos/${a.id}</loc>
    <lastmod>${a.updatedAt.split('T')[0]}</lastmod>
  </url>`);

  const allRoutes = [
    ...staticRoutes,
    ...dynamicBlogRoutes,
    ...dynamicArtigoRoutes,
  ];

  const urlsXml = allRoutes
    .map(
      (path) => `
  <url>
    <loc>https://laisdonida.com.br${path}</loc>
  </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  writeFileSync("src/sitemap.xml", sitemap);
  console.log("✅ sitemap.xml gerado com sucesso!");
};

main();
