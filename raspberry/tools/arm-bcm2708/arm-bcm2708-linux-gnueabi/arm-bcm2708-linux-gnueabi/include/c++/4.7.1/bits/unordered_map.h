// unordered_map implementation -*- C++ -*-

// Copyright (C) 2010, 2011 Free Software Foundation, Inc.
//
// This file is part of the GNU ISO C++ Library.  This library is free
// software; you can redistribute it and/or modify it under the
// terms of the GNU General Public License as published by the
// Free Software Foundation; either version 3, or (at your option)
// any later version.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// Under Section 7 of GPL version 3, you are granted additional
// permissions described in the GCC Runtime Library Exception, version
// 3.1, as published by the Free Software Foundation.

// You should have received a copy of the GNU General Public License and
// a copy of the GCC Runtime Library Exception along with this program;
// see the files COPYING3 and COPYING.RUNTIME respectively.  If not, see
// <http://www.gnu.org/licenses/>.

/** @file bits/unordered_map.h
 *  This is an internal header file, included by other library headers.
 *  Do not attempt to use it directly. @headername{unordered_map}
 */

#ifndef _UNORDERED_MAP_H
#define _UNORDERED_MAP_H

namespace std _GLIBCXX_VISIBILITY(default)
{
_GLIBCXX_BEGIN_NAMESPACE_CONTAINER

  // NB: When we get typedef templates these class definitions
  // will be unnecessary.
  template<class _Key, class _Tp,
	   class _Hash = hash<_Key>,
	   class _Pred = std::equal_to<_Key>,
	   class _Alloc = std::allocator<std::pair<const _Key, _Tp> >,
	   bool __cache_hash_code =
	     __not_<__and_<is_integral<_Key>, is_empty<_Hash>,
			   integral_constant<bool, !__is_final(_Hash)>,
			   __detail::__is_noexcept_hash<_Key, _Hash>>>::value>
    class __unordered_map
    : public _Hashtable<_Key, std::pair<const _Key, _Tp>, _Alloc,
			std::_Select1st<std::pair<const _Key, _Tp> >, _Pred, 
			_Hash, __detail::_Mod_range_hashing,
			__detail::_Default_ranged_hash,
			__detail::_Prime_rehash_policy,
			__cache_hash_code, false, true>
    {
      typedef _Hashtable<_Key, std::pair<const _Key, _Tp>, _Alloc,
			 std::_Select1st<std::pair<const _Key, _Tp> >, _Pred,
			 _Hash, __detail::_Mod_range_hashing,
			 __detail::_Default_ranged_hash,
			 __detail::_Prime_rehash_policy,
			 __cache_hash_code, false, true>
        _Base;

    public:
      typedef typename _Base::value_type      value_type;
      typedef typename _Base::size_type       size_type;
      typedef typename _Base::hasher          hasher;
      typedef typename _Base::key_equal       key_equal;
      typedef typename _Base::allocator_type  allocator_type;

      explicit
      __unordered_map(size_type __n = 10,
		      const hasher& __hf = hasher(),
		      const key_equal& __eql = key_equal(),
		      const allocator_type& __a = allocator_type())
      : _Base(__n, __hf, __detail::_Mod_range_hashing(),
	      __detail::_Default_ranged_hash(),
	      __eql, std::_Select1st<std::pair<const _Key, _Tp> >(), __a)
      { }

      template<typename _InputIterator>
        __unordered_map(_InputIterator __f, _InputIterator __l, 
			size_type __n = 0,
			const hasher& __hf = hasher(), 
			const key_equal& __eql = key_equal(), 
			const allocator_type& __a = allocator_type())
	: _Base(__f, __l, __n, __hf, __detail::_Mod_range_hashing(),
		__detail::_Default_ranged_hash(),
		__eql, std::_Select1st<std::pair<const _Key, _Tp> >(), __a)
	{ }

      __unordered_map(initializer_list<value_type> __l,
		      size_type __n = 0,
		      const hasher& __hf = hasher(),
		      const key_equal& __eql = key_equal(),
		      const allocator_type& __a = allocator_type())
      : _Base(__l.begin(), __l.end(), __n, __hf,
	      __detail::_Mod_range_hashing(),
	      __detail::_Default_ranged_hash(),
	      __eql, std::_Select1st<std::pair<const _Key, _Tp> >(), __a)
      { }

      __unordered_map&
      operator=(initializer_list<value_type> __l)
      {
	this->clear();
	this->insert(__l.begin(), __l.end());
	return *this;
      }
    };
  
  template<class _Key, class _Tp,
	   class _Hash = hash<_Key>,
	   class _Pred = std::equal_to<_Key>,
	   class _Alloc = std::allocator<std::pair<const _Key, _Tp> >,
	   bool __cache_hash_code =
	     __not_<__and_<is_integral<_Key>, is_empty<_Hash>,
			   integral_constant<bool, !__is_final(_Hash)>,
			   __detail::__is_noexcept_hash<_Key, _Hash>>>::value>
    class __unordered_multimap
    : public _Hashtable<_Key, std::pair<const _Key, _Tp>,
			_Alloc,
			std::_Select1st<std::pair<const _Key, _Tp> >, _Pred,
			_Hash, __detail::_Mod_range_hashing,
			__detail::_Default_ranged_hash,
			__detail::_Prime_rehash_policy,
			__cache_hash_code, false, false>
    {
      typedef _Hashtable<_Key, std::pair<const _Key, _Tp>,
			 _Alloc,
			 std::_Select1st<std::pair<const _Key, _Tp> >, _Pred,
			 _Hash, __detail::_Mod_range_hashing,
			 __detail::_Default_ranged_hash,
			 __detail::_Prime_rehash_policy,
			 __cache_hash_code, false, false>
        _Base;

    public:
      typedef typename _Base::value_type      value_type;
      typedef typename _Base::size_type       size_type;
      typedef typename _Base::hasher          hasher;
      typedef typename _Base::key_equal       key_equal;
      typedef typename _Base::allocator_type  allocator_type;
      
      explicit
      __unordered_multimap(size_type __n = 10,
			   const hasher& __hf = hasher(),
			   const key_equal& __eql = key_equal(),
			   const allocator_type& __a = allocator_type())
      : _Base(__n, __hf, __detail::_Mod_range_hashing(),
	      __detail::_Default_ranged_hash(),
	      __eql, std::_Select1st<std::pair<const _Key, _Tp> >(), __a)
      { }


      template<typename _InputIterator>
        __unordered_multimap(_InputIterator __f, _InputIterator __l, 
			     size_type __n = 0,
			     const hasher& __hf = hasher(), 
			     const key_equal& __eql = key_equal(), 
			     const allocator_type& __a = allocator_type())
	: _Base(__f, __l, __n, __hf, __detail::_Mod_range_hashing(),
		__detail::_Default_ranged_hash(),
		__eql, std::_Select1st<std::pair<const _Key, _Tp> >(), __a)
        { }

      __unordered_multimap(initializer_list<value_type> __l,
			   size_type __n = 0,
			   const hasher& __hf = hasher(),
			   const key_equal& __eql = key_equal(),
			   const allocator_type& __a = allocator_type())
      : _Base(__l.begin(), __l.end(), __n, __hf,
	      __detail::_Mod_range_hashing(),
	      __detail::_Default_ranged_hash(),
	      __eql, std::_Select1st<std::pair<const _Key, _Tp> >(), __a)
      { }

      __unordered_multimap&
      operator=(initializer_list<value_type> __l)
      {
	this->clear();
	this->insert(__l.begin(), __l.end());
	return *this;
      }
    };

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc,
	   bool __cache_hash_code>
    inline void
    swap(__unordered_map<_Key, _Tp, _Hash, _Pred,
	 _Alloc, __cache_hash_code>& __x,
	 __unordered_map<_Key, _Tp, _Hash, _Pred,
	 _Alloc, __cache_hash_code>& __y)
    { __x.swap(__y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc,
	   bool __cache_hash_code>
    inline void
    swap(__unordered_multimap<_Key, _Tp, _Hash, _Pred,
	 _Alloc, __cache_hash_code>& __x,
	 __unordered_multimap<_Key, _Tp, _Hash, _Pred,
	 _Alloc, __cache_hash_code>& __y)
    { __x.swap(__y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc,
	   bool __cache_hash_code>
    inline bool
    operator==(const __unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc,
	       __cache_hash_code>& __x,
	       const __unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc,
	       __cache_hash_code>& __y)
    { return __x._M_equal(__y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc,
	   bool __cache_hash_code>
    inline bool
    operator!=(const __unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc,
	       __cache_hash_code>& __x,
	       const __unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc,
	       __cache_hash_code>& __y)
    { return !(__x == __y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc,
	   bool __cache_hash_code>
    inline bool
    operator==(const __unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc,
	       __cache_hash_code>& __x,
	       const __unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc,
	       __cache_hash_code>& __y)
    { return __x._M_equal(__y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc,
	   bool __cache_hash_code>
    inline bool
    operator!=(const __unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc,
	       __cache_hash_code>& __x,
	       const __unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc,
	       __cache_hash_code>& __y)
    { return !(__x == __y); }

  /**
   *  @brief A standard container composed of unique keys (containing
   *  at most one of each key value) that associates values of another type
   *  with the keys.
   *
   *  @ingroup unordered_associative_containers
   *
   *  Meets the requirements of a <a href="tables.html#65">container</a>, and
   *  <a href="tables.html#xx">unordered associative container</a>
   *
   *  @param  Key  Type of key objects.
   *  @param  Tp  Type of mapped objects.
   *  @param  Hash  Hashing function object type, defaults to hash<Value>.
   *  @param  Pred  Predicate function object type, defaults to equal_to<Value>.
   *  @param  Alloc  Allocator type, defaults to allocator<Key>.
   *
   * The resulting value type of the container is std::pair<const Key, Tp>.
   */
  template<class _Key, class _Tp,
	   class _Hash = hash<_Key>,
	   class _Pred = std::equal_to<_Key>,
	   class _Alloc = std::allocator<std::pair<const _Key, _Tp> > >
    class unordered_map
    : public __unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>
    {
      typedef __unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>  _Base;

    public:
      typedef typename _Base::value_type      value_type;
      typedef typename _Base::size_type       size_type;
      typedef typename _Base::hasher          hasher;
      typedef typename _Base::key_equal       key_equal;
      typedef typename _Base::allocator_type  allocator_type;

      explicit
      unordered_map(size_type __n = 10,
		    const hasher& __hf = hasher(),
		    const key_equal& __eql = key_equal(),
		    const allocator_type& __a = allocator_type())
      : _Base(__n, __hf, __eql, __a)
      { }

      template<typename _InputIterator>
        unordered_map(_InputIterator __f, _InputIterator __l, 
		      size_type __n = 0,
		      const hasher& __hf = hasher(), 
		      const key_equal& __eql = key_equal(), 
		      const allocator_type& __a = allocator_type())
	: _Base(__f, __l, __n, __hf, __eql, __a)
        { }

      unordered_map(initializer_list<value_type> __l,
		    size_type __n = 0,
		    const hasher& __hf = hasher(),
		    const key_equal& __eql = key_equal(),
		    const allocator_type& __a = allocator_type())
      : _Base(__l.begin(), __l.end(), __n, __hf, __eql, __a)
      { }

      unordered_map&
      operator=(initializer_list<value_type> __l)
      {
	this->clear();
	this->insert(__l.begin(), __l.end());
	return *this;
      }
    };
  
  /**
   *  @brief A standard container composed of equivalent keys
   *  (possibly containing multiple of each key value) that associates
   *  values of another type with the keys.
   *
   *  @ingroup unordered_associative_containers
   *
   *  Meets the requirements of a <a href="tables.html#65">container</a>, and
   *  <a href="tables.html#xx">unordered associative container</a>
   *
   *  @param  Key  Type of key objects.
   *  @param  Tp  Type of mapped objects.
   *  @param  Hash  Hashing function object type, defaults to hash<Value>.
   *  @param  Pred  Predicate function object type, defaults to equal_to<Value>.
   *  @param  Alloc  Allocator type, defaults to allocator<Key>.
   *
   * The resulting value type of the container is std::pair<const Key, Tp>.
   */
  template<class _Key, class _Tp,
	   class _Hash = hash<_Key>,
	   class _Pred = std::equal_to<_Key>,
	   class _Alloc = std::allocator<std::pair<const _Key, _Tp> > >
    class unordered_multimap
    : public __unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc>
    {
      typedef __unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc>  _Base;

    public:
      typedef typename _Base::value_type      value_type;
      typedef typename _Base::size_type       size_type;
      typedef typename _Base::hasher          hasher;
      typedef typename _Base::key_equal       key_equal;
      typedef typename _Base::allocator_type  allocator_type;
      
      explicit
      unordered_multimap(size_type __n = 10,
			 const hasher& __hf = hasher(),
			 const key_equal& __eql = key_equal(),
			 const allocator_type& __a = allocator_type())
      : _Base(__n, __hf, __eql, __a)
      { }

      template<typename _InputIterator>
        unordered_multimap(_InputIterator __f, _InputIterator __l, 
			   size_type __n = 0,
			   const hasher& __hf = hasher(), 
			   const key_equal& __eql = key_equal(), 
			   const allocator_type& __a = allocator_type())
	: _Base(__f, __l, __n, __hf, __eql, __a)
        { }

      unordered_multimap(initializer_list<value_type> __l,
			 size_type __n = 0,
			 const hasher& __hf = hasher(),
			 const key_equal& __eql = key_equal(),
			 const allocator_type& __a = allocator_type())
      : _Base(__l.begin(), __l.end(), __n, __hf, __eql, __a)
      { }

      unordered_multimap&
      operator=(initializer_list<value_type> __l)
      {
	this->clear();
	this->insert(__l.begin(), __l.end());
	return *this;
      }
    };

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc>
    inline void
    swap(unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>& __x,
	 unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>& __y)
    { __x.swap(__y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc>
    inline void
    swap(unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc>& __x,
	 unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc>& __y)
    { __x.swap(__y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc>
    inline bool
    operator==(const unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>& __x,
	       const unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>& __y)
    { return __x._M_equal(__y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc>
    inline bool
    operator!=(const unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>& __x,
	       const unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>& __y)
    { return !(__x == __y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc>
    inline bool
    operator==(const unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc>& __x,
	       const unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc>& __y)
    { return __x._M_equal(__y); }

  template<class _Key, class _Tp, class _Hash, class _Pred, class _Alloc>
    inline bool
    operator!=(const unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc>& __x,
	       const unordered_multimap<_Key, _Tp, _Hash, _Pred, _Alloc>& __y)
    { return !(__x == __y); }

_GLIBCXX_END_NAMESPACE_CONTAINER
} // namespace std

#endif /* _UNORDERED_MAP_H */
