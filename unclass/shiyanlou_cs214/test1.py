#!/usr/bin/env python
#coding:utf-8
#测试range()函数新的用法
#s = 'abcdefghijklmn'
#for i in range(0, len(s),2):
#	print s[i]
#ta = [1,2,3]
#tb = [9,8,7]
#tc = ['a', 'b', 'c']
#for (a,b,c) in zip(ta,tb,tc):
#	print(a,b,c)
#循环生成器
#def gen():
#	a = 100
#	yield a
#	a = a*8
#	yield a
#	yield 1000
#for i in gen():
#	print i
#表推导用法
#l = [x**2 for x in range(10)]
#print l
#lambda 表达式
func = lambda x, y: x + y
print func(3, 4)
