#!usr/bin/env python
#coding:utf-8
#判断是否是可变对象
import types
def ismutable(a):
	if type(a) is types.StringType:
		a = 'c'
		return a
	elif type(a) is types.IntType:
		a = 100
		return a
	elif type(a) is types.ListType:
		a[0]=100
		return a[0]
	elif type(a) is types.TupleType:
		a[0]=100
		return a[0]
	elif type(a) is types.DictType:
		a[a.keys()[0]] == 100
		return a[a.keys()[0]]

b = input('please a object: ')
print b

if type(b) is types.StringType:
	if ismutable(b)==b:
		print 'object is a inmutable object'
	else:
		print 'object is a mutable object'
elif type(b) is types.IntType:
	if ismutable(b)==b:
		print 'object is a inmutable object'
	else:
		print 'object is a mutable object'
elif type(b) is types.ListType:
	if ismutable(b)==b[0]:
		print 'object is a mutable object'
	else:
		print 'object is a inmutable object'
elif type(b) is types.TupleType:
	if ismutable(b)==b[0]:
		print 'object is a mutable object'
	else:
		print 'object is a inmutable object'
elif type(b) is types.DictType:
	if ismutable(b)==b[b.keys()[0]]:
		print 'object is a mutable object'
	else:
		print 'object is a inmutable object'


	
