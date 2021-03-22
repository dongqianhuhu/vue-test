import FastClick from '@/utils/fastclick'

class H5 {
  static setBody () {

  }

  /**
   * 修复安卓webview消失的问题
   */
  static redrawDocument (n = 3) {
    let count = 0
    function checkHeight () {
      if (document.body.clientHeight <= 0) {
        document.body.style.display = 'none';
        document.body.offsetHeight;
        document.body.style.display = '';

        if (++count < 3) {
          setTimeout(checkHeight, 1000);
        }
      }
    }
    checkHeight()
  }

  /**
   * 消除旧版移动浏览器中物理点击300ms延迟
   *
   * @example
   * mounted () {
   *   FastClick.attach(document.body, { tapDelay: 70 })
   * }
   */
  static FastClick () {
    return FastClick
  }
}

export default H5
