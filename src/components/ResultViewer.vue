<template>
  <section class="card-body">
    <div class="row">
      <div class="col-md-12">
        <h3>Viewer</h3>
        <div v-if="page">
          <div class="muted">
            <span class="tag">{{ page.filename }}</span>
            <span class="tag">page {{ page.page_number }}</span>
            <span class="tag">
            <a :href="urlPrefix + page.image_url" target="_blank">Full Sized image</a>
          </span>
          </div>
          <div class="sp" />

<!--            <vue-image-zoomer ref="zoomerRef" :regular="urlPrefix + page.regular_image_url" :zoom="urlPrefix + page.zoomed_image_url"></vue-image-zoomer>-->
            <inner-image-zoom
                ref="zoomerRef"
                className="img-fluid viewer"
                :src="urlPrefix + page.regular_image_url"
                :zoomSrc="urlPrefix + page.zoomed_image_url"
                zoom-type="hover"
            ></inner-image-zoom>


          <!--        <img :src="" alt="page image" />-->
          <h4>OCR Text</h4>
            <pre class="mono" style="white-space:pre-wrap" v-html="doHighlight(page.ocr_text  || '', page.number)"></pre>


        </div>
        <div v-else class="muted">Select a result to preview.</div>
      </div>

    </div>
  </section>
</template>

<script setup>
import InnerImageZoom from 'vue-inner-image-zoom';
// import { escapeHtml } from '../assets/js/sharedScripts.js';
import $ from 'jquery';

import {ref} from "vue";
import {highlight} from "@/assets/js/sharedScripts";

const urlPrefix = process.env.VUE_APP_PROTOCOL +
    process.env.VUE_APP_HOST +
    ":" + process.env.VUE_APP_PORT + "/";
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({ page: Object })

if (typeof(props.page) !== 'undefined'){
  console.log(props.page);

}

function doHighlight (snippet, number) {
  return highlight(snippet, $('.query-input').val(), number)
}

// function highlight(snippet){
//   // let indexList = [], i=-1;
//   let q= $('.query-input').val();
//   console.log(q);
//   // if(!q) return escapeHtml(snippet)
//   // while((i=snippet.indexOf(q,i+1)) >= 0) indexList.push(i);
//   // const idx = snippet.toLowerCase().indexOf(q.toLowerCase())
//   // if(idx<0) return escapeHtml(snippet)
//
//   snippet = snippet.replaceAll(q, '<span class="hl-viewer">'+q+'</span>')

  // console.log(snippet);

  //
  // ))
  // const before = escapeHtml(snippet.slice(0, idx))
  // const hit = escapeHtml(snippet.slice(idx, idx+q.length))
  // const after = escapeHtml(snippet.slice(idx+q.length))

  //return `${before}<span class="hl-viewer">${hit}</span>${after}`
//
//   return snippet;
//
// }
const zoomerRef = ref(null);
</script>

<style scoped>
@import '../assets/css/zoomOnHover.css';
.card{border:1px solid #1f2a37;border-radius:14px;background:#0f1520;align-items: center;margin: auto auto;}
.body{padding:14px}
.viewer {display:block;width:100%;height:auto;border:3px solid #1f2a37}
.img-fluid img{width:100% !important;height:auto;border:1px solid #1f2a37;border-radius:10px;background:#0a0f15}
.mono{font-family:ui-monospace,Consolas,Menlo,monospace}
.muted{color:#98a2b3;font-size:14px}
.tag{font-size:11px;border:1px solid #1f2a37;border-radius:6px;padding:2px 6px}
:deep(.hl){background:rgba(200, 200, 0, 0.5);padding:0 2px;border-radius:4px;font-weight:bold;}
.sp{height:10px}
</style>