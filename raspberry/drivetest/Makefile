ifneq ($(KERNELRELEASE),)

obj-m := hello.o

else

KDIR := /home/zhouswei/raspberrypi_src/linux
all:  
	make -C $(KDIR) M=$(PWD) modules ARCH=arm CROSS_COMPILE=/home/zhouswei/raspberrypi_src/tools/arm-bcm2708/arm-bcm2708hardfp-linux-gnueabi/bin/arm-bcm2708hardfp-linux-gnueabi-

clean:  
	rm -f *.ko *.o *.mod.o *.mod.c *.symvers  modul*

endif