<template>
  <section>
    <at-panel
      class="at-panel"
      v-show="atPanelShow"
      ref="deAtPanel"
      :members="filteredMemebrs"
      @insertAt="insertAt"
    />
    <p class="title">Input Here:</p>
    <div
      class="container"
      contenteditable
      ref="editableBox"
      @blur="handleBlur"
      @input="showAtPanel"
      @keypress.enter.exact.prevent.stop="handleEnterPress">
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import AtPanel from './AtPanel'

@Component({
  components: {
    AtPanel
  },
  // props: {
  //   members: {
  //     type: Object,
  //     default: () => []
  //   }
  // },
  computed: {
    filteredMemebrs () {
      return this.members.filter(({ name }) => name.includes(this.keyword))
    }
  }
})
export default class VEditor extends Vue {
  atPanelShow = false
  editRange = null
  keyword = ''
  // for test
  members = [
    { id: 'e1', name: 'LeBron James', avatar: 'lightblue' },
    { id: 'e2', name: 'Kevin Durant', avatar: 'lightgreen' },
    { id: 'e3', name: 'Giannis Antetokounmpo', avatar: 'lightcoral' }
  ]

  mounted () {
    this.resetFocus()
  }

  resetFocus () {
    const eb = this.$refs.editableBox
    eb.focus()
    const range = window.getSelection().getRangeAt(0)
    if (this.editRange) {
      range.setStart(this.editRange.startContainer, this.editRange.startOffset)
      range.setEnd(this.editRange.endContainer, this.editRange.endOffset)
    } else if (eb.lastChild) {
      range.setStartAfter(eb.lastChild)
      range.setEndAfter(eb.lastChild)
    } else {
      // todo
    }
  }

  insertString (type, str, flag = true) {
    const eb = this.$refs.editableBox
    const st = eb.scrollTop
    flag && this.resetFocus()
    document.execCommand(type, false, str)
    eb.scrollTop = st
  }

  insertText (text, flag = true) {
    this.insertString('insertText', text, flag)
  }

  insertHTML (html, flag = true) {
    this.insertString('insertHTML', html, flag)
  }

  handleBlur (e) {
    this.editRange = window.getSelection().getRangeAt(0)
  }

  showAtPanel (e) {
    if (e.data === '@') {
      this.atPanelShow = true
      this.keyword = ''
      return
    }

    if (e.inputType === 'deleteContentBackward') {
      this.keyword = this.keyword.slice(0, -1)
      if (!this.keyword.length) {
        this.closeAtPanel()
      }
    } else {
      this.keyword += e.data
    }
  }

  closeAtPanel (flag) {
    this.atPanelShow = false
    flag && this.resetFocus()
  }

  insertAt (member, manual = true) {
    let { id, name } = member
    name = ' @' + name + ' '
    const eb = this.$refs.editableBox
    const st = eb.scrollTop

    this.resetFocus()

    if (manual) {
      let range
      if (this.editRange) {
        range = this.editRange
      } else {
        range = window.getSelection().getRangeAt(0)
      }
      range.setStart(range.startContainer, range.endOffset - (this.keyword.length + 1))
      range.setEnd(range.startContainer, range.endOffset)
      range.deleteContents()
      range.collapse()
    }

    const tmpSpan = document.createElement('span')
    tmpSpan.innerText = name
    tmpSpan.style.fontSize = '16px'
    tmpSpan.style.opacity = 0
    tmpSpan.style.position = 'fixed'
    tmpSpan.style.top = 0
    tmpSpan.style.whiteSpace = 'pre'
    document.body.appendChild(tmpSpan)
    const width = tmpSpan.offsetWidth
    document.body.removeChild(tmpSpan)

    const height = 20
    const atImg = document.createElement('img')
    atImg.alt = name
    atImg.width = width
    atImg.height = height
    atImg.draggable = false
    atImg.setAttribute('use-id', id)
    atImg.src = `data:image/svg+xml,%3Csvg%20width='${width}'%20height='${height}'%20xmlns='http://www.w3.org/2000/svg'%3E%3Ctext%20x='2'%20y='12'%20font-size='15'%20fill-opacity='0.8'%20text-anchor='start'%20dominant-baseline='middle'%3E${name}%3C/text%3E%3C/svg%3E`
    this.insertHTML(atImg.outerHTML, false)

    eb.scrollTop = st

    this.closeAtPanel(false)
  }

  handleEnterPress (e) {
    console.log('handleEnterPress...')
  }
}
</script>

<style>
  section {
    padding: 30px;
  }
  .title {
    font-size: 32px;
    color: #2e2e2e;
    margin: 5px 0;
  }
  .at-panel {
    position: absolute;
    width: 100px;
    top: 200px;
    border: 1px black solid;
  }
  .container {
    width: 800px;
    height: 500px;
    padding: 20px;
    border: 1px #2e2e2e solid;
    color: #2e2e2e;
    font-size: 30px;
  }
</style>
