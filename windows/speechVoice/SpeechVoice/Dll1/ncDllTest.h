// ncDllTest.h
// #…Ë÷√‘§¥¶¿Ì∆˜
// ADD_DEFINITIONS("-DLL_SAMPLE_EXPORT")


#define DLL_TEST_EXPORT
#include "dllexport.h"
#include <string>
using  std::string;
extern "C" DLL_TEST_API void TestDLL(const char *);