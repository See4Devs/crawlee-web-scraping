const { CheerioCrawler, SessionPool } = require("crawlee");

(async () => {
  // Open a session pool
  const sessionPool = await SessionPool.open();

  // Ensure there is a session in the pool
  let session = await sessionPool.getSession();
  if (!session) {
    session = await sessionPool.createSession();
  }

  const crawler = new CheerioCrawler({
    useSessionPool: true, // Enable session pool
    async requestHandler({ request, $, response, session }) {
      // Log the session information
      console.log(`Using session: ${session.id}`);

      // Extract book data and log it (for demonstration)
      const books = [];
      $("article.product_pod").each((index, element) => {
        const title = $(element).find("h3 a").attr("title");
        const price = $(element).find(".price_color").text();
        books.push({ title, price });
      });
      console.log(books);
    },
  });

  // First run
  await crawler.run(["https://books.toscrape.com/"]);
  console.log("First run completed.");

  // Second run
  await crawler.run(["https://books.toscrape.com/"]);
  console.log("Second run completed.");
})();
