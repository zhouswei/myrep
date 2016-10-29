#coding:utf-8
'''
这是一个代码模板生成器，用来生成一个android
的activity 的类，里面有写好的handler onclick 
以及 必要的 声明周期方法和 标题栏的设置
'''
import os, sys, re, traceback, shutil
from datetime import datetime
from jinja2 import Environment, FileSystemLoader

class GenjavaFile:	
	env = Environment(loader=FileSystemLoader('androidcodeapp/templates'))
	parentName = 'demo'
	def generate_bean(self, name, packagename):
		#生成一个bean文件
		# self.parentName = raw_input('please enter obj name:')
		vars = input('please enter a bean dic key(name):value(type)::')
		beanName = name
		filepath = r'androidcodeapp/output/%s.java'%beanName
		class_file = open(filepath, 'w')
		#请输入一个字典
		

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
									PACKAGENAME = packagename,		
									DATETIME = datetime.now().strftime('%Y/%m/%d-%H:%M'),									
									DIC = vars)
		print type(lines)
		utf8str = lines.encode('utf-8')
		print type(utf8str)
		class_file.writelines(utf8str)
		class_file.close()
		shutil.copy(filepath,r'E:/reconfiguration/magiciantrunk/src/main/java/com/ztb/magician/bean/%s.java'%beanName)
		# template_file.close()
		# header_template_file.close()
		print 'generate successful %s.java'%beanName

	def generate_info(self, name, packagename):
		#生成一个info文件
		#请输入一个字典
		# self.parentName = raw_input('please enter obj name:')
		vars = input('please enter a info dic key(name):value(type)::')
		infoName = name
		filepath = r'androidcodeapp/output/%s.java'%infoName
		class_file = open(filepath, 'w')
		

		lines = []

		

		header_template_file = self.env.get_template(r'info_java.template')
		lines = header_template_file.render(CLASSNAME = infoName,
									DATE = datetime.now().strftime('%Y/%m/%d'),
									PACKAGENAME = packagename,		
									DATETIME = datetime.now().strftime('%Y/%m/%d-%H:%M'),									
									DIC = vars)
		print type(lines)
		utf8str = lines.encode('utf-8')
		print type(utf8str)
		class_file.writelines(utf8str)
		class_file.close()
		shutil.copy(filepath,r'E:/reconfiguration/magiciantrunk/src/main/java/com/ztb/magician/info/%s.java'%infoName)
		# template_file.close()
		# header_template_file.close()
		print 'generate successful %s.java'%infoName

	def generate_adapter(self, name,beanname, packagename):
		#生成一个adapter文件
		adapterName = name
		filepath = r'androidcodeapp/output/%s.java'%adapterName
		class_file = open(filepath, 'w')
		header_template_file = self.env.get_template(r'adapter_java.template')
		lines = header_template_file.render(ADAPTERNAME = adapterName,
									BEANNAME = beanname,
									PACKAGENAME = packagename,		
									DATE = datetime.now().strftime('%Y/%m/%d'),
									DATETIME = datetime.now().strftime('%Y/%m/%d-%H:%M'))
		print type(lines)
		utf8str = lines.encode('utf-8')
		print type(utf8str)
		class_file.writelines(utf8str)
		class_file.close()
		shutil.copy(filepath,r'E:/reconfiguration/magiciantrunk/src/main/java/com/ztb/magician/adapter/%s.java'%adapterName)
		print 'generate successful %s.java'%adapterName
		print 'getnrate end'
	def generate_activity(self):
		#生成一个activity和对应的布局xml
		packageName = raw_input('please enter packagename name:')		
		self.parentName = raw_input('please enter class name:')		
		className = '%sActivity'%self.parentName.capitalize()
		xmlName = 'activity_%s'%self.parentName.lower()
		filepath = r'androidcodeapp/output/%s.java'%className
		xmlfilepath = r'androidcodeapp/output/%s.xml'%xmlName
		class_file = open(filepath, 'w')
		xml_file = open(xmlfilepath, 'w')
		lines = []
		xmllines = []
		#读取模板文件

		

		adpter = raw_input('please enter adapter name else not gen a list:')		
		adptername = '%sAdapter'%adpter

		bean = raw_input('please enter bean name :')
		beanname = '%sBean'%bean

		info = raw_input('please enter info name :')
		infoname = '%sInfo'%info

		template_file = self.env.get_template(r'activity_java.template')
		if adptername == 'null':
			lines = template_file.render(CLASSNAME = className,
									DATE = datetime.now().strftime('%Y/%m/%d'),
									DATETIME = datetime.now().strftime('%Y/%m/%d-%H:%M'),									
									BEANNAME = beanname,
									PACKAGENAME = packageName,
									XMLNAME = xmlName,								
									LISTBEANNAME = '%sListBean'%self.parentName,
									INFONAME = infoname)
		else:
			lines = template_file.render(CLASSNAME = className,
									DATE = datetime.now().strftime('%Y/%m/%d'),
									DATETIME = datetime.now().strftime('%Y/%m/%d-%H:%M'),									
									BEANNAME = beanname,
									PACKAGENAME = packageName,
									XMLNAME = xmlName,	
									ADAPTERNAME = adptername,									
									INFONAME = infoname)
		

		utf8lines = lines.encode('utf-8')

		class_file.writelines(utf8lines)
		
		class_file.close()
		shutil.copy(filepath,r'E:/reconfiguration/magiciantrunk/src/main/java/com/ztb/magician/activities/%s.java'%className)

		

		xmltemplate_file = self.env.get_template(r'activity_xml.template')
		xmllines = xmltemplate_file.render(CLASSNAME = className)

		utf8lxmllines = xmllines.encode('utf-8')

		xml_file.writelines(utf8lxmllines)
		xml_file.close()
		shutil.copy(xmlfilepath,r'E:/reconfiguration/magiciantrunk/src/main/res/layout/%s.xml'%xmlName)
		
		print 'generate successful %s.java and %s.xml '%(className,xmlName)


		self.generate_bean(beanname, packageName)

		self.generate_info(infoname, packageName)
		if adptername != 'null':
			self.generate_adapter(adptername, beanname, packageName)


	




