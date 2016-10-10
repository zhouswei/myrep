//
// Created by Administrator on 2016/10/9.
//

#ifndef NDKTEST_OBJECT_H
#define NDKTEST_OBJECT_H

/*
 *所有类的基类，加入引用计数
 * */
class object {
private:
    int RefCount=0;
public:
    void AddRef();
    void ReleaseRef();

    virtual ~object() { }
};


#endif //NDKTEST_OBJECT_H
