#!/usr/bin/env python
#coding:utf-8
#计算该年是否是闰年
def calleap(year):
	a = year%100
	if a == 0:
		b = year%400
		if b == 0:
			return True
		else:
			return False
	else:
		b = year%4
		if b == 0:
			return True
		else:
			return False
result = input("please enter num: ")
if (calleap(result)== True):
	print"%d is a leap year"%result
else:
	print "%d is not a leap year"%result
