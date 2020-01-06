#ifdef WIN32
#ifdef DLL_TEST_EXPORT
#define DLL_TEST_API __declspec(dllexport)
#else
#define DLL_TEST_API __declspec(dllimport)
#endif
#endif