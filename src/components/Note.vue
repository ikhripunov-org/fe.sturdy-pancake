<template>
  <li>
    <div v-if="!editNote" style="display: initial">{{note.content}}</div>
    <div v-if="editNote" style="display: inline-flex"><input class="input is-small" v-model="note.content" v-on:keyup.enter="$emit('updateNote', note); editNote = !editNote"/></div>
    &nbsp;
    <a v-if="!editNote" v-on:click="editNote = !editNote">
      <i class="fas fa-pencil-alt"></i>
    </a>
    &nbsp;
    <a v-on:click="$emit('deleteNote', note.id)">
      <i class="fas fa-times"></i></span>
    </a>
  </li>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: Object
  },
  methods: {
    deleteNote: function() {
      console.log(this.note);
    }
  },
  data: function() {
    return {
      editNote: false
    }
  }
}
</script>
