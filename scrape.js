const { CheerioCrawler } = require("crawlee");

const crawler = new CheerioCrawler({
  async requestHandler({ request, $ }) {
    const books = [];
    $("article.product_pod").each((index, element) => {
      const title = $(element).find("h3 a").attr("title");
      const price = $(element).find(".price_color").text();
      books.push({ title, price });
    });
    console.log(books);
  },
});

crawler.run(["https://books.toscrape.com/"]);
