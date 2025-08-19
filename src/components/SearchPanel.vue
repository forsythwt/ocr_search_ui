<template>
  <section class="card-body">
    <div class="row">
      <div class="col-md-12">
        <h3>Search</h3>
        <div class="input-group">
          <input v-model="q" @input="debounced" class="query-input form-control-plaintext" placeholder="Name, amount, memo, check #…" />
          <button class="btn-outline-secondary" @click="$emit('search', q)">Search</button>
        </div>
        <div class="muted" style="margin-top:6px">Database pages: {{ total }} <span v-if="usedFulltext" class="pill">FULLTEXT</span></div>
        <div class="sp" />
        <div class="res">
          <div v-for="r in results" :key="r.id" class="item">
            <div class="thumb"><img :src="image(r.id)" alt="thumb"></div>
            <div>
              <div><strong>{{ r.filename }}</strong> <span class="pill">p. {{ r.page_number }}</span></div>
              <div class="mono muted" v-html="doHighlight(r.snippet || '', r.number)"></div>
              <div style="margin-top:6px"><a href="#" @click.prevent="$emit('open', r.id)">Open page</a></div>
            </div>
          </div>
          <div v-if="!results.length && !loading" class="muted">No results.</div>
          <div v-if="loading" class="muted">Loading…</div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { imageUrl as image } from '../api'
import { highlight } from '@/assets/js/sharedScripts';
import $ from 'jquery';

// eslint-disable-next-line no-undef
const props = defineProps({ results:Array, total:Number, usedFulltext:Boolean, loading:Boolean, qInit:String })
// eslint-disable-next-line no-undef
const emit = defineEmits(['search','open'])
const q = ref(props.qInit || '')
let timer
const debounced = () => { clearTimeout(timer); timer = setTimeout(() => emit('search', q.value), 300) }

function doHighlight (snippet, number) {
  return highlight(snippet, $('.query-input').val(), number)
}
// function highlight(snippet){
//   if(!q.value) return escapeHtml(snippet)
//
//   snippet = snippet.replaceAll(q.value, '<span class="hl-search">'+q.value+'</span>')
//
//   return snippet
//
// }

</script>

<style scoped>
.card{border:1px solid #1f2a37;border-radius:14px;background:#0f1520}
.body{padding:14px}
.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
input{flex:1;padding:10px;border-radius:8px;border:1px solid #1f2a37;background:#FFFFFF;color:#333333}
button{border:1px solid #1f2a37;background:#FFFFFF;color:#333333;font-weight:bold;border-radius:8px;padding:8px 12px;cursor:pointer}
button:hover{border-color:#2a3a4f}
.muted{color:#000000;font-size:14px}
.res{display:flex;flex-direction:column;gap:10px;max-height:65vh;overflow:auto}
.item{display:flex;gap:10px;border:1px solid #1f2a37;border-radius:10px;padding:10px;background:#FFFFFF}
.thumb{width:92px;height:64px;overflow:hidden;border-radius:8px;border:1px solid #1f2a37;background:#0a0f15}
.thumb img{width:100%;height:100%;object-fit:cover}
.mono{font-family:ui-monospace,Consolas,Menlo,monospace}
.pill{display:inline-block;border:1px solid #1f2a37;border-radius:999px;padding:2px 8px;font-size:11px}
:deep(.hl){background:rgba(255, 255, 0, 0.5);padding:0 2px;border-radius:4px;font-weight:bold;}
.sp{height:10px}
</style>