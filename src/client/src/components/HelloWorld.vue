<template>
  <div>
    <div id="content">  
    <h1>...</h1>  
      <div>
        <label>ID</label> : <input type="text" id="txt1" v-model="model.id"  />
      </div>
      <div>
        <label>Name</label> : <input type="text" id="txt2" v-model="model.name" />
      </div>
      <div>
        <label>Monthly Salery Without Tax</label> : <input type="text" id="txt3" v-model="model.monthlySaleryNoTax" />
      </div>
      <div>
        <label>Cost Without Rent</label> : <input type="text" id="txt4" v-model="model.costWithoutRent" />
      </div>
      <div>
        <button type="button" v-on:click="saveClick">Save</button>
      </div>
    </div>
    <hr />
    <hr />
    <h1>...</h1>
    <table border="1" style="margin:auto">
      <thead>
        <tr>
          <th style="width: 100px">ID</th>
          <th style="width: 100px">Name</th>
          <th style="width: 100px">Monthly Salery Without Tax</th>       
          <th style="width: 100px">Cost Without Rent</th>
          <th style="width: 100px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model.list" v-bind:key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.monthlySaleryNoTax }}</td>      
          <td>{{ item.costWithoutRent }}</td>      
          <td><button type="button" v-on:click="deleteClick(item.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data: function () {
    return {
      model: {
        id: "",
        name: "",
        updateDate: null,
        monthlySaleryNoTax: "",
        costWithoutRent: "",
      },
      list: [],
    };
  },
  methods: {
    saveClick() {      
      axios({
          method: 'post',
          url: 'https://localhost:7083/api/Cities',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept",
          },
          data: JSON.stringify(this.model),
        })
        .then((resp) => {
          this.getList();
          alert("success" + resp.data.id);
        });
    },
    getList() {
      axios.get("https://localhost:7083/api/Cities").then((resp) => {
        this.model.list = resp.data;
      });
    },
    deleteClick(id) {
      axios.delete("https://localhost:7083/api/Cities/" + id).then(() => {
         this.getList();
         alert("success");  
      });
    }
  },  
  mounted: function () {
    this.getList();
  },
};
</script>