/* Copyright (C) 2004-2014 Free Software Foundation, Inc.
   This file is part of the GNU C Library.

   The GNU C Library is free software; you can redistribute it and/or
   modify it under the terms of the GNU Lesser General Public
   License as published by the Free Software Foundation; either
   version 2.1 of the License, or (at your option) any later version.

   The GNU C Library is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   Lesser General Public License for more details.

   You should have received a copy of the GNU Lesser General Public
   License along with the GNU C Library.  If not, see
   <http://www.gnu.org/licenses/>.  */

/* Define the machine-dependent type `jmp_buf'.  ARM EABI version.  */

#ifndef _BITS_SETJMP_H
#define _BITS_SETJMP_H 1

#if !defined _SETJMP_H && !defined _PTHREAD_H
# error "Never include <bits/setjmp.h> directly; use <setjmp.h> instead."
#endif

#ifndef __ASSEMBLER__
/* The exact set of registers saved may depend on the particular core
   in use, as some coprocessor registers may need to be saved.  The C
   Library ABI requires that the buffer be 8-byte aligned, and
   recommends that the buffer contain 64 words.  The first 27 words
   are occupied by v1-v6, sl, fp, sp, pc, and d8-d15.  (Note that
   d8-15 require 17 words, due to the use of fstmx.)  */
typedef int __jmp_buf[64] __attribute__((__aligned__ (8)));
#endif

#endif
