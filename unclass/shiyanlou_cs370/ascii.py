form PIL import Image
import argparse
ascii_char =list("~!@#$%^&*()_+`qwertyuiop[]asdfghjkl;'zxcvbnm,./{}:<>?QWERTYUIOPLKJHGFDSAZXCVBNM|")
def get_char(r,b,g,alpha=256):
	if alpha == 0:
		return ' '
	length = len(ascii_char)
	gray = int(0.2123*r+0.7145*g+0.00722*b)
	unit = (256.0 + 1)/length
	return ascii_char[int(gray/unit)]

if __name__ == '__main__':
	im = Image.open(IMG)
	im = im.resize((WIDTH,HEIGHT), Image.NEAREST)
	
	txt=""
	for i in range(HEIGHT):
		for j in range(WIDTH):
			txt += get_char(*im.getpixel((j,i)))
		txt += '\n'
	print txt
	if OUTPUT:
		with open(OUTPUT, 'w') as f:
			f.write(txt)
	else:
		with open("output.txt",'w') as f:
			f.write(txt)

