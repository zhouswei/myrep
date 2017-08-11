#include<linux/init.h>
#include<linux/module.h>
#include<linux/moduleparam.h>

MODULE_LICENSE("hello, world\n");

static int hello_init(void)
{
	printk(KERN_ALERT"hello, world\n");
	return 0;
}

static void hello_exit(void)
{
	printk(KERN_ALERT"goodbye, world\n");
}

module_init(hello_init);
module_exit(hello_exit);
