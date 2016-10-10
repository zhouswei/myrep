//
// Created by Administrator on 2016/10/9.
//

#include "object.h"

void object::AddRef() {
    this->RefCount++;
}

void object::ReleaseRef() {
    if (this->RefCount != 0){
        this->RefCount--;
    }else{
        //引用释放
        delete this;
    }
}



