import scrapy
import json

class RefrigeratorSpider(scrapy.Spider):
  name = 'refrigerator'
  start_urls = ['https://www.lowes.com']

  def parse(self, response):
    url = "https://www.lowes.com/c/Appliances?int_cmp=Homepage:A2:MajorAppliances:Other:PC_Appliances"
    yield scrapy.Request(url, callback=self.parse_appliance)

  def parse_appliance(self, response):
    appliances = response.css('div.imagecolumncontainer div.grid-100 div.grid-16 a::attr(href)').getall()
    for appliance in appliances:
      if appliance.split('/')[-1].isdigit():
        yield scrapy.Request(f"https://www.lowes.com{appliance}", callback=self.parse_refrigerators)
      else:
        yield scrapy.Request(f"https://www.lowes.com{appliance}", callback=self.parse_category)

  def parse_category(self, response):
    categories = response.css('div.imagecolumncontainer div.grid-100 div.grid-16 a::attr(href)').getall()

    for category in categories:
      yield scrapy.Request(f"https://www.lowes.com{category}", callback=self.parse_refrigerators)

  def parse_refrigerators(self, response):
    refrigerators = response.xpath("//div[@aria-label='product details']/a/@href").getall()
    for refrigerator in refrigerators:
      yield scrapy.Request(f"https://www.lowes.com{refrigerator}", callback=self.parse_refrigerator)

    next_page = response.xpath("//link[@rel='next']/@href").get()

    if next_page:
      yield scrapy.Request(next_page, callback=self.parse_refrigerators)

  def parse_refrigerator(self, response):
    if not '/collections/' in response.url:
      brand = response.css('span.brand::text').get()
      refrigerator_json = json.loads(response.xpath("//script[@type='application/ld+json']/text()").get())
      category = str(refrigerator_json[1]["itemListElement"][2]["name"])
      title = str(refrigerator_json[2]["name"])

      refrigerator = {
        "Title": title,
        "Brand": brand, 
        "Category": category,
        "URL": response.url,
        "SKU": response.url.split('/')[-1]
      }

      yield refrigerator