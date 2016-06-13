#coding:utf-8
'''
这是一个代码模板生成器，用来生成一个android
的activity 的类，里面有写好的handler onclick 
以及 必要的 声明周期方法和 标题栏的设置
'''
import os, sys, re, traceback
from datetime import datetime
from jinja2 import Environment, FileSystemLoader

class GenjavaFile:	
	env = Environment(loader=FileSystemLoader('androidcodeapp/templates'))
	parentName = 'demo'
	def generate_activity(self):
		self.parentName = input('please enter class name:')		
		className = '%sActivity'%self.parentName.capitalize()
		xmlName = 'activity_%s'%self.parentName.lower()
		filepath = r'androidcodeapp/output/%s.java'%className
		xmlfilepath = r'androidcodeapp/output/%s.xml'%xmlName
		class_file = open(filepath, 'w')
		xml_file = open(xmlfilepath, 'w')
		lines = []
		xmllines = []
		#读取模板文件

		# template_file = open(r'template/activity_java.template','r')
		# tmpl = Template(template_file.read())
		#替换模板里面的变量
		# lines.append(tmpl.substitute(
		# 	CLASSNAME = className,
		# 	))
		# template_file.close()
		#读取模板文件
		# xmltemplate_file = open(r'activity_xml.template','r')
		# xmltmpl = Template(xmltemplate_file.read())
		#替换模板里面的变量
		# xmllines.append(xmltmpl.substitute(
		# 	XMLNAME = className))
		# template_file.close()

		adptername = input('please enter adapter name else not gen a list:')		

		template_file = self.env.get_template(r'activity_java.template')
		if adptername == 'null':
			lines = template_file.render(CLASSNAME = className,
									DATE = datetime.now().strftime('%Y/%m/%d'),
									DATETIME = datetime.now().strftime('%Y/%m/%d-%H:%M'),									
									BEANNAME = '%sBean'%self.parentName,									
									LISTBEANNAME = '%sListBean'%self.parentName,
									INFONAME = '%sInfo'%self.parentName)
		else:
			lines = template_file.render(CLASSNAME = className,
									DATE = datetime.now().strftime('%Y/%m/%d'),
									DATETIME = datetime.now().strftime('%Y/%m/%d-%H:%M'),									
									BEANNAME = '%sBean'%self.parentName,
									ADAPTERNAME = adptername,
									LISTBEANNAME = '%sListBean'%self.parentName,
									INFONAME = '%sInfo'%self.parentName)
		

		utf8lines = lines.encode('utf-8')

		class_file.writelines(utf8lines)
		class_file.close()
		

		

		xmltemplate_file = self.env.get_template(r'activity_xml.template')
		xmllines = xmltemplate_file.render(CLASSNAME = className)

		utf8lxmllines = xmllines.encode('utf-8')

		xml_file.writelines(utf8lxmllines)
		xml_file.close()
		
		print 'generate successful %s.java and %s.xml '%(className,xmlName)
		

	def generate_bean(self):
		beanName = '%sBean'%self.parentName
		filepath = r'androidcodeapp/output/%s.java'%beanName
		class_file = open(filepath, 'w')
		#请输入一个字典
		self.parentName = raw_input('please enter obj name:')
		vars = input('please enter a dic key(name):value(type)::')

		lines = []

		#读取模板文件
		# header_template_file = open(r'androidcodeapp/templates/bean_java_header.template','r')
		# header_tmpl = Template(header_template_file.read())
		
		# template_file = open(r'androidcodeapp/templates/bean_java.template','r')
		# tmpl = Template(template_file.read())

		# lines.append(header_tmpl.substitute(
		# 	NAME = beanName,
		# 	DATE = datetime.now().strftime('%Y/%m/%d'),
		# 	DATETIME = datetime.now().strftime('%Y/%m/%d-%H:%M')))	

		# #替换模板里面的变量
		# for key in vars:
		# 	lines.append(tmpl.substitute(
		# 	TYPE = vars[key],
		# 	NAME = key,
		# 	CONTENT = key.capitalize()))	
		
		# lines.append('\n}')

		header_template_file = self.env.get_template(r'bean_java.template')
		lines = header_template_file.render(CLASSNAME = beanName,
									DATE = datetime.now().strftime('%Y/%m/%d'),
									DATETIME = datetime.now().strftime('%Y/%m/%d-%H:%M'),									
									DIC = vars)
		print type(lines)
		utf8str = lines.encode('utf-8')
		print type(utf8str)
		class_file.writelines(utf8str)
		class_file.close()
		# template_file.close()
		# header_template_file.close()
		print 'generate successful %s.java'%beanName

	def generate_adapter(self):
		# adapterName = '%sAdapter'%self.parentName
		# filepath = r'output/%s.java'%adapterName
		# class_file = open(filepath, 'w')

		# lines = []

		# #读取模板文件
		# template_file = open(r'template/adapter_java.template','r')
		# tmpl = Template(template_file.read())

		# #替换模板里面的变量
		# lines.append(tmpl.substitute(
		# 	ADAPTERNAME = adapterName))

		# class_file.writelines(lines)
		# class_file.close()

		# print 'generate successful %s.java'%adapterName
		print 'ssss'




