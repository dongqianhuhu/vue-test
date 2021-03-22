class Monitor {
  static perf () {
    return window.performance
  }

  static async info () {
    const perf = Monitor.perf
    const t = perf.timing
    return new Promise((rev, rej) => {
      const itv = setInterval(() => {
        if (t.loadEventEnd) {
          clearInterval(itv)
          rev({
            redirect: t.redirectEnd - t.redirectStart,
            dns_query: t.domainLookupEnd - t.domainLookupStart,
            dns_cache: t.domainLookupStart - t.fetchStart,
            tcp: t.connectEnd - t.connectStart,
            domtree_parse: t.domComplete - t.responseEnd,
            load_resource: t.responseEnd - t.requestStart,
            white_screen: t.responseStart - t.navigationStart,
            load_page: t.loadEventEnd - t.navigationStart,
          })
        }
      }, 50)
    })
  }
}

export default Monitor
