<template>
  <section class="card-body">
    <div class="row">
      <div class="col-md-12">
        <h3>Statement List</h3>
        <div v-if="documents">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Filename:</th>
                <th scope="col" class="fit">Page Count:</th>
                <th scope="col" class="fit">Upload Date:</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="document in documents" :key="document.id" class="sp">
                <td colspan="1">{{document.id}} &nbsp; &nbsp; &nbsp;{{document.filename}}</td>
                <td class="fit">{{document.page_count}}</td>
                <td class="fit">{{document.uploaded_at}}</td>
              </tr>
            </tbody>
          </table>
        </div>
<!--            <vue-image-zoomer ref="zoomerRef" :regular="urlPrefix + page.regular_image_url" :zoom="urlPrefix + page.zoomed_image_url"></vue-image-zoomer>-->
        <div v-else class="muted">No documents available</div>
      </div>

    </div>
  </section>
</template>

<script setup>
// import {ref} from "vue";

// const urlPrefix = process.env.VUE_APP_PROTOCOL +
//     process.env.VUE_APP_HOST +
//     ":" + process.env.VUE_APP_PORT + "/";
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({ documents: Object })

// if (typeof(props.page) !== 'undefined'){
//   console.log(props.page);
//
// }


// const zoomerRef = ref(null);
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
.table td.fit,
.table th.fit {
  white-space: nowrap;
  width: 1%;
}
</style>