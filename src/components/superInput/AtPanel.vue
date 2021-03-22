<template>
  <div class="at-panel-box">
    <div class="list-box">
      <m-item
        v-for="member in members"
        :key="member.id"
        :member="member"
        @clickMember="clickMember"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import MItem from './MItem'

@Component({
  props: {
    members: {
      type: Array,
      default: () => []
    }
  },
  components: {
    MItem
  }
})
export default class AtPanel extends Vue {
  clickMember (member) {
    this.$emit('insertAt', member)
  }
  clear () {
    this.$refs.atSI.clearInput()
  }
}
</script>

<style lang="less" scoped>
  .at-panel-box {
    width: 400px;
    height: 500px;
    padding: 20px 0;
    max-width: 80vw;
    max-height: 80vh;
    background-color: white;
    display: flex;
    flex-direction: column;

    .list-box {
      flex: 1 1 auto;
      width: 100%;
      overflow: auto;
      padding-bottom: 10px;
    }
  }
</style>
