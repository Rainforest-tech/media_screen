<template>
  <b-row class="d-flex justify-center mt-5">
    <b-col>
      <h3 class="text-black">Import XLSX</h3>
      <input type="file" @change="onChange" />
      <xlsx-read :file="file">
        <xlsx-json>
          <template #default="{ collection }">
            <div>
              {{ collection }}
            </div>
          </template>
        </xlsx-json>
      </xlsx-read>
    </b-col>
    <b-col>
      <b-button to="/default-screen" variant="warning "
        >Режим просмотра</b-button
      >
    </b-col>
  </b-row>
</template>

<script>
// import { XlsxRead, XlsxJson } from "../../node_modules/d";

export default {
  //   components: {
  //     XlsxRead,
  //     XlsxJson,
  //   },
  name: "PickScreen",
  data() {
    return { file: null };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
  },
};
</script>
