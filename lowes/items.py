from scrapy.item import Item, Field

class Refrigerator(Item):
  title = Field()
  brand = Field()
  category = Field()
  url = Field()
  sku = Field()
