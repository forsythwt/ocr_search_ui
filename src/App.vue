<template>
  <div class="container">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-12">
        <header class="top">
          <h1>Local Check OCR Search</h1>
          <div class="muted">Upload PDF bank statements, OCR all pages, search locally. Nothing leaves your machine.</div>
          <div class="row" style="margin-top:10px">
            <div class="col-sm-12">
              <div class="input-group">
                <input ref="file" type="file" class="form-control" accept="application/pdf" @change="onPick" :disabled="uploadBusy" />
                <button @click="triggerPick" :disabled="uploadBusy" class="btn btn-outline-secondary">Upload & OCR</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <span v-if="uploadBusy" class="muted">Processing… this may take a while for large PDFs.</span>
              <span v-if="message" class="muted" style="margin-left:8px">{{ message }}</span>
            </div>
          </div>
      </header>
<!--  <main class="wrap grid">-->
          <main class="card">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="images-tab" data-bs-toggle="tab" data-bs-target="#images" type="button" role="tab" aria-controls="home" aria-selected="true">Images</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="statements-tab" data-bs-toggle="tab" data-bs-target="#statements" type="button" role="tab" aria-controls="profile" aria-selected="false">Statements</button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="images" role="tabpanel" aria-labelledby="images-tab">
                <div class="row">
                  <div class="col-md-4"><SearchPanel :results="results" :total="total" :usedFulltext="usedFulltext" :loading="loading" :qInit="q" @search="doSearch" @open="open" /></div>
                  <div class="col-md-8"><ResultViewer :page="selected" /></div>
                </div>
              </div>
            <div class="tab-pane fade show" id="statements" role="tabpanel" aria-labelledby="statements-tab">
              <div class="row">
                <div class="col-md-12">
                  <FileList :documents="fullDocumentList"></FileList>
                </div>
              </div>
            </div>
            </div>
        </main>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {recent, search, pageDetail, uploadPdf, documentList} from './api'
import SearchPanel from './components/SearchPanel.vue'
import ResultViewer from './components/ResultViewer.vue'
import FileList from './components/FileList.vue'

const q = ref('')
const total = ref(0)
const usedFulltext = ref(false)
const results = ref([])
const loading = ref(false)
const uploadBusy = ref(false)
const message = ref('')
const selected = ref(null)
const file = ref(null)
const fullDocumentList = ref([])
const fullDocumentListCount = ref(0)

async function loadRecent(){
  loading.value = true
  try{
    const data = await recent()
    results.value = data.results || []
    total.value = data.total || 0
    usedFulltext.value = false
  } finally { loading.value = false }
}

async function loadDocumentList(){
  loading.value = true
  try{
    const data = await documentList()
    fullDocumentList.value = data.results || []
    fullDocumentListCount.value = data.total || 0
  } finally { loading.value = false }
}

async function doSearch(text){
  q.value = text
  if(!q.value) return loadRecent()
  loading.value = true
  try{
    const data = await search(q.value)
    results.value = data.results || []
    usedFulltext.value = !!data.used_fulltext
  } finally { loading.value = false }
}

async function open(id){
  const data = await pageDetail(id)
  if(data && !data.error) selected.value = data
}

function triggerPick(){ file.value && file.value.click() }
async function onPick(e){
  const f = e.target.files[0]; if(!f) return;
  uploadBusy.value = true; message.value = ''
  try{
    const data = await uploadPdf(f)
    if(data.error) message.value = 'Error: ' + data.error
    else { message.value = `Processed ${data.pages_processed} page(s) in ${data.seconds}s.`; await loadRecent() }
  } catch(err){ message.value = 'Upload failed: ' + err }
  finally { uploadBusy.value = false; e.target.value='' }
}

onMounted(loadRecent)
onMounted(loadDocumentList)
</script>

<style>
:root{--bg:#0c1117;--panel:#0f1520;--muted:#98a2b3;--b:#1f2a37}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:#e6edf3;font-family:system-ui,Segoe UI,Roboto,Ubuntu}
.top{padding:16px 20px;border-bottom:1px solid var(--b);background:#ffffff;position:sticky;top:0;z-index:2}
//.wrap{max-width:1200px;margin:0 auto;padding:16px}
.grid{display:grid;grid-template-columns:180px 1fr;gap:16px}
@media (max-width:980px){}
//.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
button{border:1px solid var(--b);background:#ffffff;color:#333333;border-radius:8px;padding:8px 12px;cursor:pointer}
button:hover{border-color:#2a3a4f}
input[type=file]{padding:6px;background:#ffffff;border:1px solid var(--b);border-radius:8px;color:#333333;width:100%;}
.muted{color:var(--muted);font-size:12px}
</style>