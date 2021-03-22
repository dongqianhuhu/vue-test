import { IData } from '@/types/superInput'
import mockCreator from '@/mock'
import * as dataPromise from '@/mock/superInput'

const ENABLE_MOCK = true
const mock = mockCreator(dataPromise, ENABLE_MOCK, ['dev'])

export default class SuperInput {
  /** */
  @mock('getData')
  static getData (): Promise<IData> {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
}
