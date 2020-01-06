

#include <string>
#define DLL_TEST_EXPORT
#include "dllexport.h"
using  std::string;



extern "C" DLL_TEST_API int TestDLL(string);