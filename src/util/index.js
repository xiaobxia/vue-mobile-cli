export function debounce (fn, delay) {
  let timer = null
  return function () {
    const args = arguments
    const context = this

    if (timer) {
      clearTimeout(timer)

      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
}

export function throttle (func, delay) {
  var prev = Date.now()
  return function () {
    var context = this
    var args = arguments
    var now = Date.now()
    if (now - prev >= delay) {
      func.apply(context, args)
      prev = Date.now()
    }
  }
}

let toString = Object.prototype.toString
let hasOwn = Object.prototype.hasOwnProperty
let class2type = {}
'Boolean Number String Function Array Date RegExp Object'.split(' ').forEach(function (name) {
  class2type['[object ' + name + ']'] = name.toLowerCase()
})
function type (obj) {
  return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object'
}
function isPlainObject (obj) {
  if (!obj || type(obj) !== 'object') {
    return false
  }
  if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false
  }
  let key
  for (key in obj) {}
  return key === undefined || hasOwn.call(obj, key)
}

export function deepClone () {
  let options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[1] || {}
    i = 2
  }
  if (typeof target !== 'object' && type(target) !== 'function') {
    target = {}
  }
  if (length === i) {
    target = this
    --i
  }
  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name]
        copy = options[name]
        if (target === copy) {
          continue
        }
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = type(copy) === 'array'))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && type(src) === 'array' ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }
          target[name] = extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}
