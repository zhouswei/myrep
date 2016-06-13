#coding:utf-8
# s="iphone\u5173\u4e8e"
# s=u"关于"
# print s
# a = s.decode('unicode_escape')
# print a
import sys
import os
# # reload(sys)
# # sys.setdefaultencoding('utf-8')
import codecs
print sys.getdefaultencoding()
f = codecs.open('items.json','r', 'utf-8')
l = codecs.open('items1.json','wb','utf-8')
f.seek(0,os.SEEK_END)
size = f.tell()
f.seek(0,0)
line = f.read(size)
a = line.decode('unicode_escape','replace')
l.write(a)
f.close()
l.close()



