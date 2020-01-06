// ncDllTest.cpp
#include "stdafx.h"
#include "ncDllTest.h"
#include <stdio.h>
#include <sapi.h>
#include <sphelper.h>
#pragma comment(lib, "sapi.lib")
std::wstring string2wstring(string str)
{
	std::wstring result;
	//��ȡ��������С��������ռ䣬��������С���ַ�����  
	int len = MultiByteToWideChar(CP_ACP, 0, str.c_str(), str.size(), NULL, 0);
	TCHAR* buffer = new TCHAR[len + 1];
	//���ֽڱ���ת���ɿ��ֽڱ���  
	MultiByteToWideChar(CP_ACP, 0, str.c_str(), str.size(), buffer, len);
	buffer[len] = '\0';             //����ַ�����β  
									//ɾ��������������ֵ  
	result.append(buffer);
	delete[] buffer;
	return result;
}
void TestDLL(const char *arg)
{
	string text = arg;
	ISpVoice *pVoice = NULL;
	if (FAILED(::CoInitialize(NULL)))
	return;
	HRESULT hr = CoCreateInstance(CLSID_SpVoice, NULL, CLSCTX_ALL, IID_ISpVoice, (void **)&pVoice);

	if (SUCCEEDED(hr)) {
	pVoice->SetVolume(80);
	pVoice->SetRate(0); //�����ٶȣ���Χ�� -10 - 10
	size_t size = text.length();
	wchar_t *buffer = new wchar_t[size + 1];
	printf("DLL output arg %s\n", text.c_str());
	std::wstring c = string2wstring(text);
	buffer[size] = 0;
	std::wstring a = L"��ԡ��Ħ-��������Ŀ��518�ż�ʦ��504�ŷ������";
	LPCWSTR str = a.c_str();
	pVoice->Speak(c.c_str(), SPF_ASYNC, NULL);
	delete buffer;
	buffer = NULL;
	}
	//printf("DLL output arg %d\n", arg);
}