// @ts-ignore
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $modal: Function
    $addEventFrog: Function
    $addClickFrog: Function
  }
}

declare global {
  interface Window {

  }
}