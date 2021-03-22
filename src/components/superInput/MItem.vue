<template>
  <div class="member-container" @click.prevent="clickMember()">
    <!-- <img :src="member.avatar"/> -->
    <div class="avatar-demo" :style="{background: this.member.avatar}"></div>
    <div class="member-name" :title="displayName">{{ displayName }}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    member: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    displayName () {
      const { name } = this.member
      return name.trim()
    }
  }
})
export default class MItem extends Vue {
  clickMember () {
    this.$emit('clickMember', this.member)
  }
}
</script>

<style lang="less" scoped>
  .member-container {
    width: 100%;
    padding: 8px;
    margin-bottom: 6px;
    display: flex;
    line-height: 35px;
    vertical-align: middle;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: rgba(204, 204, 204, 0.4);
    }

    img {
      flex: 0 0 auto;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      box-shadow: 3px 3px 3px #ccc;
    }

    .avatar-demo {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }

    .member-name {
      flex: 1 1 auto;
      padding-left: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      font-size: 26px;
      color: #2e2e2e;
    }
  }
</style>
