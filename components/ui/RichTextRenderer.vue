<template>
  <div id="rich-text-body"></div>
</template>
<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  name: 'RichTextRenderer',
  props: {
    richData: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    if (this.richData.json) {
      document.getElementById('rich-text-body').innerHTML =
        documentToHtmlString(this.richData.json)
    }
  },
}
</script>

<style></style>
