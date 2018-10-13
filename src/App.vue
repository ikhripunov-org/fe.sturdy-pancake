<template>
  <div id="app" class="columns">
    <div class="column">
      <div class="customer">
        <input class="input is-small" placeholder="Filter customers by name" v-model="searchString"/>
        <a class="level-item" v-on:click="sortAsc = !sortAsc">
          <i class="fa fa-arrow-up" v-if="sortAsc" aria-hidden="true"></i>
          <i class="fa fa-arrow-down" v-if="!sortAsc" aria-hidden="true"></i>
        </a>
      </div>
      <Customer v-for="customer in filteredCustomers" :customer="customer" :key="customer.id" />
    </div>
  </div>
</template>

<script>

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
    filteredCustomers: function() {
      if (this.$data.sortAsc) {
        return this.customers.filter(customer => customer.name.includes(this.$data.searchString)).sort(sortByName)
      } else {
        return this.customers.filter(customer => customer.name.includes(this.$data.searchString)).sort(sortByName).reverse()
      }
    }
  },
  data: function () {
    return {
      sortAsc: true,
      searchString: "",
      customers: [
          {
              "id": "ee76d2b9-cdda-49c5-83ae-a3ff2a57aa91",
              "status": "PROSPECTIVE",
              "created": 1539386888983,
              "name": "foooo",
              "details": "65-65-65",
              "notes": [
                {
                  "id": "ee76d2b9-cdda-49c5-13ae-a3ff2a57aa91",
                  "content": "blah-blah"
                }
              ]
          },
          {
              "id": "ee76d2b9-cdda-49c5-83ae-a3ff2a57aa92",
              "status": "CURRENT",
              "created": 1539386888983,
              "name": "barrrrr",
              "details": "65-65-65",
              "notes": [
                {
                  "id": "ee76d2b9-cdda-49c5-145e-a3df2a57aa91",
                  "content": "blah-blah"
                },
                {
                  "id": "ee76d2b9-cdda-49c5-13ae-a3ff2a57aa99",
                  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum dictum eros, nec ornare orci iaculis at. Vestibulum hendrerit velit id felis laoreet ullamcorper. Aenean iaculis imperdiet risus non iaculis. Curabitur eu blandit diam, in imperdiet amet."
                }
              ]
          },
          {
              "id": "ee76d2b9-cdda-49c5-83ae-a3ff2a57aa93",
              "status": "NON_ACTIVE",
              "created": 1539386888983,
              "name": "fizzz",
              "details": "65-65-65",
              "notes": []
          }
        ]
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
