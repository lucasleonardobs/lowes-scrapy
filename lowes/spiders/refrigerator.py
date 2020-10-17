import scrapy
import json

class RefrigeratorSpider(scrapy.Spider):
  name = 'refrigerator'
  start_urls = ['https://www.lowes.com']

  def parse(self, response):
    yield scrapy.Request("https://www.lowes.com/c/Refrigerators-Appliances", callback=self.parse_category)

  def parse_category(self, response):
    categories = response.css('div.imagecolumncontainer div.grid-100 div.grid-16 a::attr(href)').extract()
    for category in categories:
      yield scrapy.Request(f"https://www.lowes.com{category}", callback=self.parse_refrigerators)

  def parse_refrigerators(self, response):
    refrigerators = response.xpath("//div[@aria-label='product details']/a/@href").extract()
    for refrigerator in refrigerators:
      yield scrapy.Request(f"https://www.lowes.com{refrigerator}", callback=self.parse_refrigerator)

  def parse_refrigerator(self, response):
    refrigerator_json = json.loads(response.xpath("//script[@type='application/ld+json']/text()").get())[2]
    refrigerator = {
      "URL": response.url, 
      "Title": refrigerator_json["name"], 
      "SKU": refrigerator_json["sku"]
    }
    yield refrigerator
