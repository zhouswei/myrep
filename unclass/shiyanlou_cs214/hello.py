#!/usr/bin/env python
#coding:utf-8
#例子1：类的定义
class bird(object):
	have_feather = True
	way_of_rep = 'egg'
	def move(self, dx, dy):
		position = [0, 0]
		position[0] = position[0]+dx
		position[1] = position[1]+dy
		return position

#summer = bird()
#print summer.move(10, 20)
#例子2：类的继承
class Chicken(bird):
	way_of_move = 'walk'
	possible_in_KFC = True
	
summer = Chicken()
print summer.move(2, 5)
def func(*name):
	print type(name)
	print name
func(1, 2, 3)
def func2(**dic):
	print type(dic)
	print dic
func2(a=1, b=9)

