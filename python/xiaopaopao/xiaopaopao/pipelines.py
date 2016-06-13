# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
from scrapy.exceptions import DropItem
import codecs
import json
import MySQLdb
import string
import sys
import chardet
reload(sys)
sys.setdefaultencoding('utf-8')
class XiaopaopaoPipeline(object):
	def __init__(self):
		# self.file = codecs.open('items2.json','wb','utf-8')		 
		self.conn = MySQLdb.connect(host='localhost',port=3306,user='root',db='zswdb4',charset='utf8')
		self.cur = self.conn.cursor()		
	word_filter_list=[u'彩票',u'警察']
	sql = 'insert into webinfos values(%s, %s)'

	# word_filter_list=['NBA','iPhone6s']
	def process_item(self, item, spider):	
		print '+++++++++++++++++++++++++++++++'	
		# line = json.dumps(dict(item)) + '\n'
		# line = json.dumps(list(item['link'])) + '\n'
		# for listitem in range(len(list(item['link']))):
		# 	line1 = json.dumps(list(item['link'])[listitem])				
		# 	line2 = json.dumps(list(item['title'])[listitem])
		line1 = str(item['link'])				
		line2 = str(item['title'])
		# print line2
		# print chardet.detect(line2)
		# print 'ccc'+line
		# print line2
		link = line1.decode('unicode-escape','ignore')
		title = line2.decode('unicode-escape','ignore')
		# link = line1
		# title = line2
		# print title
			# link = line1
			# title = line2
			# print chardet.detect(str(self.word_filter_list[0]))
		# linkcc = line.decode('unicode_escape','ignore')
		# self.file.write(linkcc)
		# print link
		# print title
		if link.strip()!='' or title.scrip() !='':
			self.cur.execute(self.sql, (title, link))		
		return item	
		# for word in self.word_filter_list:
		# 	print word		
		# 	if word in unicode(ustr):				
		# 		raise DropItem("contain a forbit word:%s"%word)
		# else:#注意这个缩进 是for else的用法：如果for 没有被break 完全循环完，则执行else里面的语句
		# 		return item	
	def close_spider(self,spider):
		self.cur.close()
		self.conn.commit()
		self.conn.close()      

# ccc = strutf.encode('gbk')
# print ccc
  
