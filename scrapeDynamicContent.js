const { PuppeteerCrawler } = require("crawlee");

async function scrapeYouTube() {
  const crawler = new PuppeteerCrawler({
    async requestHandler({ page, request, enqueueLinks, log }) {
      const { url } = request;
      await page.goto(url, { waitUntil: "networkidle2" });

      // Scraping first 10 comments
      const comments = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#comments #content-text"))
          .slice(0, 10)
          .map((el) => el.innerText);
      });

      log.info(`Comments: ${comments.join("\n")}`);
    },

    launchContext: {
      launchOptions: {
        headless: true,
      },
    },
  });

  // Add the URL of the YouTube video you want to scrape
  await crawler.run(["https://www.youtube.com/watch?v=wZ6cST5pexo"]);
}

scrapeYouTube();
