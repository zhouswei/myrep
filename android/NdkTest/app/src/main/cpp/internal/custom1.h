//
// Created by Administrator on 2016/10/8.
//

#ifndef NDKTEST_CUSTOM1_H
#define NDKTEST_CUSTOM1_H

#include "../base/object.h"

class custom1 :public object{
public:
    ~custom1() { object::ReleaseRef();};

    int getName() const {
        return name;
    }

    void setName(int name) {
        custom1::name = name;
    }
    int addName(int add);
    int subName(int sub);

private:
    int name;
public:
    custom1() { object::AddRef(); }

    custom1(custom1 &nm):name(nm.name){object::AddRef();};
    custom1& operator=(const custom1& p){
        //触发对象的引用
        object::AddRef();
        name = p.name;
        return *this;
    };

};


#endif //NDKTEST_CUSTOM1_H
