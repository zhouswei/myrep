# -*- coding: utf-8 -*-
#定义一个例子小蜘蛛
import scrapy
import sys
import chardet
import string
from scrapy.http import Request
from scrapy.selector import Selector
reload(sys)
sys.setdefaultencoding('utf-8')
# print sys.getdefaultencoding()
from xiaopaopao.items import XiaopaopaoItem 
class demo_spider(scrapy.spiders.Spider):
	name='demo'
	allowed_domains=['news.163.com']
	start_urls=["http://news.163.com/"]	
	scrapyed_urls=[]
	# start_urls=["http://scrapy-chs.readthedocs.io/zh_CN/latest/intro/tutorial.html#id9"]
	
	# start_urls=["http://scrapy-chs.readthedocs.io/zh_CN/latest/"]
	# start_urls=["http://www.dmoz.org/Computers/Programming/Languages/Python/Books/","http://www.dmoz.org/Computers/Programming/Languages/Python/Resources/"]
	def start_requests(self):
		self.status = 1
		for url in self.start_urls:
			yield self.make_requests_from_url(url)
	def parse(self,response):		
		if response.url.find("tutorial.html") != -1:
			filename = response.url.split("/")[-2]
			with open(filename, 'wb') as f:
				f.write(response.body)
		sel1 = Selector(response)
		resulturl = str(response.url)
		item = XiaopaopaoItem()	
		item['link'] = resulturl
		item['title'] = sel1.xpath('head/title/text()').extract()
		print item['title']
		yield item			
		'''
		for sel in response.xpath('//ul/li'):
			title1 = sel.xpath('a/text()').extract()
			link = sel.xpath('a/@href').extract()
			desc = sel.xpath('text()').extract()

			print 'parent-------------------'		
			item = XiaopaopaoItem()			
			item['title'] = [t for t in title1]
			print chardet.detect(str(item['title']))
			# item['link'] = ["http://scrapy-chs.readthedocs.io/zh_CN/latest/"+ l.replace('../','') for l in link if l.find('../') != -1]
			item['link'] = [l for l in link]
			yield item
		'''
		for sel in response.xpath('//ul/li'):
			title1 = sel.xpath('a/text()').extract()
			link = sel.xpath('a/@href').extract()
			desc = sel.xpath('text()').extract()		
			for l in link:
				# print 'ccc'+l
				# item['link'].append(l)
				if l.find('../') != -1:
						l = "http://scrapy-chs.readthedocs.io/zh_CN/latest/"+ l.replace('../','')
				elif l.find('../') == -1 and l.find('http:') == -1 and l.find('https:') == -1:
						l = "http://scrapy-chs.readthedocs.io/zh_CN/latest/intro/"+ l
				'''
				if l not in self.scrapyed_urls:
					# print 'child-------------------'
					if l.find('../') != -1:
						l = "http://scrapy-chs.readthedocs.io/zh_CN/latest/"+ l.replace('../','')
					elif l.find('../') == -1 and l.find('http:') == -1 and l.find('https:') == -1:
						l = "http://scrapy-chs.readthedocs.io/zh_CN/latest/intro/"+ l
					self.scrapyed_urls.append(l)
					yield Request(url=l,callback=self.parse)
				'''
				if l not in self.scrapyed_urls:
					# print 'child-------------------'			
					self.scrapyed_urls.append(l)
					yield Request(url=l,callback=self.parse)
			# item['desc'] = [d for d in desc]
			# yield Request()	
		print '-----------------------------'
class clear_spider(scrapy.spiders.Spider):
	name = 'clear'
	allowed_domains =['163.com']

	def start_requests(self):
		print 'start--------------------------------'
	def parse(self, response):
		print 'parse--------------------------------'


