<template>
  <div id="app" class="columns">
    <div class="column">
      <div class="customer">
        <input class="input is-small" placeholder="Filter customers by name" v-model="searchString" v-on:keyup="sort()"/>
        <a class="level-item" v-on:click="sortAsc = !sortAsc; sort()">
          <i class="fa fa-arrow-up" v-if="sortAsc" aria-hidden="true"></i>
          <i class="fa fa-arrow-down" v-if="!sortAsc" aria-hidden="true"></i>
        </a>
      </div>
      <Customer v-for="customer in filteredCustomers" :customer="customer" :key="customer.id" />
    </div>
  </div>
</template>

<script>
const axios = require('axios');

const sortByName = function(a, b) {
  var nameA = a.name.toUpperCase();
  var nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

export default {
  name: 'app',
  computed: {
  },
  mounted () {
    axios
      .get('http://localhost:8090/customers')
      .then(response => {
        this.customers = response.data;
        if (this.$data.sortAsc) {
          this.filteredCustomers =  this.customers.filter(customer => customer.name.includes(this.$data.searchString)).sort(sortByName)
        } else {
          this.filteredCustomers =  this.customers.filter(customer => customer.name.includes(this.$data.searchString)).sort(sortByName).reverse()
        }
      })
  },
  methods: {
    sort: function() {
      if (this.$data.sortAsc) {
        this.filteredCustomers =  this.customers.filter(customer => customer.name.includes(this.$data.searchString)).sort(sortByName)
      } else {
        this.filteredCustomers =  this.customers.filter(customer => customer.name.includes(this.$data.searchString)).sort(sortByName).reverse()
      }
    }
  },
  data: function () {
    return {
      sortAsc: true,
      searchString: "",
      filteredCustomers: []
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  padding-top: 10px;
  background: #e6ecf1;
}

#app {
  height: 100%;
  padding-top: 0px;
  text-align: center;
}

#app .button {
  margin-bottom: 20px;
}

#app .customer {
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 15px;
}

#app .box {
  margin-bottom: 0;
  border-radius: 0;
}

#app .content small {
  color: #00d1b2;
}

#app .level-item {
  padding-left: 10px;
  color: #00d1b2;
}

#app input:focus {
  border-color: #00d1b2;
}

#app .notes {
  padding: 0 7.5px;
}

#app input {
  font-weight: bold;
}
</style>
