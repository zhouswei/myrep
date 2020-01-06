// ConsoleApplication1.cpp: 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include <iostream>
#include <windows.h>
#include <tchar.h>
#include <string>
using  std::string;
typedef void(*DLLFunc)(const char *);

int main()
{
	HINSTANCE hInstLibrary = LoadLibrary(_T("Dll1")); // dll的相对路径
	if (hInstLibrary == NULL)
	{
		FreeLibrary(hInstLibrary);
		printf("LoadLibrary err\n");
		getchar();
		return 1;
	}
	DLLFunc dllFunc = (DLLFunc)GetProcAddress(hInstLibrary, "TestDLL");
	if (dllFunc == NULL)
	{
		FreeLibrary(hInstLibrary);
		printf("GetProcAddress err\n");
		getchar();
		return 1;
	}
	//string p = "开卷考试代付款";
	dllFunc("足浴按摩-清筋活络项目请518号技师到504号房间服务");
	FreeLibrary(hInstLibrary);
	getchar();


	return 0;
}

