<template>
    <div class="container">
        <div class="loader" v-if="isLoading">
            <img src="../assets/loader.svg" alt="loading..." style="z-index:4">
        </div>
        <!-- <h1>Dashboard</h1> -->
        <div v-if="!isLoading">
            <!-- Records -> view and create months  -->
            <div class="records">
                <h3>Records</h3>
                <hr>
                <button class="btn btn-primary" @click="createNewRecord()" >Create Record</button>
                <div class="card-columns">
                    <div class="card" v-for="(item,index) in records" :key="index">
                        <div class="card-body">
                            <div class="card-title">
                                <button class="btn" @click="enterReadings(item._id)">
                                    {{item.recordName}}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// const API_URL = 'http://localhost:5000';
const API_URL = 'https://gkheightsbackend.herokuapp.com';


export default {
    data: function() {
        return {
            recordValue: '',
            isLoading : false,
            records :[],
        };
    },
    mounted() {
        this.getRecords();
    },
    methods: {
        getRecords() {
            this.isLoading = true,
            fetch(`${API_URL}/records`,{
                method:'get',
                headers: {
                    'content-type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.records = data;
                    this.isLoading = false;
                });
        },
        createNewRecord() {
            this.$router.push('/newrecord');
        },
        enterReadings(id) {
            this.$router.push({name:'EnterReadings',params: {id}});
        }
    }
};
</script>

<style>

</style>