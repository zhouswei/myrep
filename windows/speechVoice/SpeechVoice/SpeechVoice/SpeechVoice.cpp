// SpeechVoice.cpp: 定义 DLL 应用程序的导出函数。
//

#include "stdafx.h"
#include "SpeechVoice.h"
//#include <sapi.h>
//#include <sphelper.h>
//#pragma comment(lib, "sapi.lib")

int TestDLL(string text)
{
	/*ISpVoice *pVoice = NULL;
	if (FAILED(::CoInitialize(NULL)))
		return -1;
	HRESULT hr = CoCreateInstance(CLSID_SpVoice, NULL, CLSCTX_ALL, IID_ISpVoice, (void **)&pVoice);

	if (SUCCEEDED(hr)) {
		pVoice->SetVolume(80);
		size_t size = text.length();
		wchar_t *buffer = new wchar_t[size + 1];

		MultiByteToWideChar(CP_ACP, 0, text.c_str(), size, buffer, size * sizeof(wchar_t));
		buffer[size] = 0;
		pVoice->Speak(buffer, SPF_DEFAULT, NULL);
		delete buffer;
		buffer = NULL;
	}*/
	//printf("DLL output arg %d\n", 1213);
	return 1;
}
	



