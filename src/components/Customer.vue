<template>
  <div class="customer">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content" style="display: flex">
            <div style="width: 400px">
              <strong id="name">{{customer.name}}</strong>
              <div id="status">
                <b-dropdown id="ddown1" size="sm" class="m-2" v-on:hidden="updateStatus(customer)">
                  <div slot="button-content" style="display: contents;">{{customer.status}}</div>
                  <b-dropdown-item v-on:click="customer.status='PROSPECTIVE'">PROSPECTIVE</b-dropdown-item>
                  <b-dropdown-item v-on:click="customer.status='CURRENT'">CURRENT</b-dropdown-item>
                  <b-dropdown-item v-on:click="customer.status='NON_ACTIVE'">NON_ACTIVE</b-dropdown-item>
                </b-dropdown>
              </div>
              <div>
                <small id="details">{{customer.details}}</small>
              </div>
            </div>
          </div>
            <div class="level-left">
              <a class="level-item" v-on:click="showNotes = !showNotes">
                <span class="icon is-small"><i class="fas fa-sticky-note"></i></span>
                <span class="notes">{{customer.notes.length}}</span>
              </a>
            </div>
            <div v-if="showNotes">
              <Note v-for="note in customer.notes" :note="note" :key="note.id" v-on:deleteNote="deleteNote($event, customer)" v-on:updateNote="updateNote($event, customer)"/>
            </div>
        </div>
      </article>
    </div>
    <div class="control has-icons-left has-icons-right">
        <input class="input is-small" placeholder="Add customer note" v-model="newNote" v-on:keyup.enter="addNote(customer)"/>
        <span class="icon is-small is-left">
          <i class="fas fa-sticky-note-o"></i>
        </span>
      </div>
  </div>
</template>

<script>
function uuid() {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

const axios = require('axios');

export default {
  name: 'Customer',
  props: {
    customer: Object
  },
  methods: {
    addNote: function(customer) {
      var newNote = {
        id: uuid(),
        content: this.$data.newNote
      }
      customer.notes.push(newNote);
      this.$data.newNote = "";
      axios.post('http://localhost:8090/customers/' + customer.id + '/notes', newNote)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteNote: function(event, customer) {
      axios.delete('http://localhost:8090/customers/notes/' + event)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      customer.notes = customer.notes.filter(note => note.id != event)
    },
    updateNote: function(event, customer) {
      axios.put('http://localhost:8090/customers/notes/' + event.id, event)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    updateStatus: function(customer) {
      axios.put('http://localhost:8090/customers/' + customer.id, customer)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  data: function () {
    return {
      newNote: "",
      showNotes: false,
      editMode: false,
      editedCustomer: ""
    }
  }
}
</script>
