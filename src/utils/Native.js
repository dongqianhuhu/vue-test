class Native {
  static getUserAgent () {
    return navigator.userAgent
  }

  static isIOS () {
    return /iP(hone|od|ad)/.test(Native.getUserAgent())
  }

  static isIPhone () {
    return /iP(hone|od)/.test(Native.getUserAgent())
  }

  static isIPad () {
    return /iPad/.test(Native.getUserAgent())
  }

  static isAndroid () {
    return /Android/.test(Native.getUserAgent())
  }

  static getIOSVersion () {
    const ver = Native.getUserAgent().toLocaleLowerCase().match(/cpu iphone os (.*?) like mac os/)
    if (ver && ver[1]) {
      return ver[1].replace(/_/g, '.')
    }
    return ''
  }

  static getAndroidVersion () {
    const ver = Native.getUserAgent().toLocaleLowerCase().match(/android (.*?);/)
    if (ver && ver[1]) {
      return ver[1].replace(/_/g, '.')
    }
    return ''
  }

  static isXXX () {
    return /XXX/i.test(Native.getUserAgent())
  }

  static isYYY () {
    return /YYY/i.test(Native.getUserAgent())
  }

  static isApp () {
    return Native.isXXX() || Native.isYYY()
  }

  static getAppVersion () {
    const UA_REGEX = /\s+(XXX|YYY)\/(\d+\.\d+\.\d+)(\s+|$)/i
    const ua = Native.getUserAgent()
    const matches = ua.match(UA_REGEX)
    return matches ? matches[2] : ''
  }

  static greaterThanOrEqualTo (v) {
    return Native.compareVersions(Native.getAppVersion(), v) >= 0
  }

  static greaterThan (v) {
    return Native.compareVersions(Native.getAppVersion(), v) > 0
  }

  static compareVersions (v1, v2) {
    if (v1 === v2) {
      return 0
    }
    const v1parts = v1.split('.')
    const v2parts = v2.split('.')
    const len = Math.min(v1parts.length, v2parts.length)
    for (let i = 0; i < len; i++) {
      if (parseInt(v1parts[i]) > parseInt(v2parts[i])) {
        return 1
      }
      if (parseInt(v1parts[i]) < parseInt(v2parts[i])) {
        return -1
      }
    }
    if (v1parts.length > v2parts.length) {
      return 1
    }
    if (v1parts.length < v2parts.length) {
      return -1
    }
    return 0
  }

  static stringToByte (str) {
    // @ts-ignore
    const bytes = []
    let len, c
    len = str.length
    for (let i = 0; i < len; i++) {
      c = str.charCodeAt(i)
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0)
        bytes.push(((c >> 12) & 0x3F) | 0x80)
        bytes.push(((c >> 6) & 0x3F) | 0x80)
        bytes.push((c & 0x3F) | 0x80)
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0)
        bytes.push(((c >> 6) & 0x3F) | 0x80)
        bytes.push((c & 0x3F) | 0x80)
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0)
        bytes.push((c & 0x3F) | 0x80)
      } else {
        bytes.push(c & 0xFF)
      }
    }
    return bytes
  }
}

export default Native
