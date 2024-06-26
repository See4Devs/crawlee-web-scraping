const { CheerioCrawler } = require("crawlee");
const { ProxyConfiguration } = require("crawlee");
const axios = require("axios");

const proxyConfiguration = new ProxyConfiguration({
  proxyUrls: ["http://USERNAME:PASSWORD@HOST:PORT"],
});

const crawler = new CheerioCrawler({
  proxyConfiguration,
  async requestHandler({ request, $, response, proxies }) {
    // Make a GET request to the proxy information URL
    try {
      const proxyInfo = await axios.get("http://lumtest.com/myip.json", {
        proxy: {
          host: "HOST",
          port: PORT,
          auth: {
            username: "USERNAME",
            password: "PASSWORD",
          },
        },
      });
      console.log("Proxy Information:", proxyInfo.data);
    } catch (error) {
      console.error("Error fetching proxy information:", error.message);
    }

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
