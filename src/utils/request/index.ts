import MrRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import type { HomeData } from './type'

const mrRequest = new MrRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 实例拦截器-使用
  interceptors: {
    requestInterceptor: (config) => {
      console.log('实例拦截器: requestInterceptor')
      return config
    },
    requestInterceptorCatch: (err: any) => {
      console.log('实例拦截器: requestInterceptorCatch')
      return err
    },
    responseInterceptor: (res) => {
      console.log('实例拦截器: responseInterceptor')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('实例拦截器: responseInterceptorCatch')
      return err
    },
  },
})

export default mrRequest

mrRequest
  .request<HomeData>({
    url: '/home/multidata',

    // 请求拦截器-使用
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求拦截器: requestInterceptor')
        return config
      },
      requestInterceptorCatch: (err: any) => {
        console.log('请求拦截器: requestInterceptorCatch')
        return err
      },
      responseInterceptor: (res) => {
        console.log('请求拦截器: responseInterceptor')
        return res
      },
      responseInterceptorCatch: (err) => {
        console.log('请求拦截器: responseInterceptorCatch')
        return err
      },
    },
  })
  .then((res) => {
    console.log(res.data)
  })
