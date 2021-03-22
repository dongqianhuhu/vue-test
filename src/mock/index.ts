const mockCreator = (dataPromise: any, enable: boolean, envs: string[] = ['dev']) => {
  return (dataKey: string) => {
    return (target: any, _key: string, descriptor: PropertyDescriptor) => {
      const method = descriptor && descriptor.value
      descriptor.value = async (...args: any) => {
        if (enable) {
          const data: any = await dataPromise
          return typeof data[dataKey] === 'function' ? data[dataKey](...args) : data[dataKey]
        } else {
          return method.apply(target, args)
        }
      }
      return descriptor
    }
  }
}

export default mockCreator
