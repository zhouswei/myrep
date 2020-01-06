
var ffi = require('ffi')
var DLL = ffi.Library('./dll/Dll1.dll', {
  'TestDLL': ['void', ['string']],
  'setProtery': ['void', ['int', 'int', 'int']]
})
var iconv = require('iconv-lite')
export function playVoice (message) {
  var str1 = message.toString()
  var userbuffer = iconv.encode(str1, 'gbk')

  DLL.TestDLL(userbuffer)
}
export function playSet (volume, pitch, rate) {
  DLL.setProtery(volume, pitch, rate)
}
