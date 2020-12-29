<template>
    <div class="container">
        <div class="loader" v-if="isLoading">
            <img src="../assets/loader.svg" alt="loading..." style="z-index:4">
        </div>
        <div v-if="!isLoading">
            <!-- <div v-for="(x,index) in flatNumbers" :key="index">
                {
                    "flatNumber":{{x}},
                    "recordName":"",
                    "rawReading":"",
                    "manjeeraReading":"",
                    "date":"",
                    "timestamp":""
                },
            </div> -->
            <div>
                <form v-on:submit.prevent="recordName">
                    <fieldset>
                        <div class="form-group row">
                            <label for="recordName" class="col-sm-4 col-form-label">Enter Record Name : </label>
                            <div class="col-sm-8">
                                <input type="text" v-model="recordName" id="recordName" placeholder="Ex :  October2020" 
                                    class="form-control" required>
                            </div>

                        </div>
                        <button class="btn btn-primary" @click="createRecord()" :disabled="!isValidRecordName">Submit</button>
                    </fieldset>
                </form>
            </div>
            <!-- <div class="card-columns">
                <div class="card" v-for="(d,index) in recordsData" :key="index">
                    <div class="card-body">
                        <div class="card-title">{{d.flatNumber}}</div>
                    </div>

                </div>
            </div> -->
        </div>

    </div>
</template>

<script>
// const API_URL = 'http://localhost:5000';
const API_URL = 'https://gkheightsbackend.herokuapp.com';


export default {
    data : function() {
        return {
            isLoading: false,
            recordsData: [
                { 
                    "flatNumber":101,
                    "recordName":"",
                    "rawReading":"",
                    "manjeeraReading":"",
                    "date":"",
                    "timestamp":""
                },
                { "flatNumber":201, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":301, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":401, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":501, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":102, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":202, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":302, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":402, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":502, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":103, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":203, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":303, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":403, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":503, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":104, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":204, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":304, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":404, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":504, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":105, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":205, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":305, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":405, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":505, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":106, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":206, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":306, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":406, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":506, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":107, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":207, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":307, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":407, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":507, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":108, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":208, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":308, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":408, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":508, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":109, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":209, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":309, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":409, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":509, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":110, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":210, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":310, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":410, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":510, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":111, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":211, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":311, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":411, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":511, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":112, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":212, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":312, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":412, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":512, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":113, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":213, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":313, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":413, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":513, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":114, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":214, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":314, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":414, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" },
                { "flatNumber":514, "recordName":"", "rawReading":"", "manjeeraReading":"", "date":"", "timestamp":"" }
            ],
            recordId:null,
            recordName: "",
        };
    },
    computed: {
        isValidRecordName() {
            this.recordName = this.recordName.replace(/\s/g, "");
            return (this.recordName) ; 
        }
    },
    methods: {
        createRecord() {
            this.isLoading = true;
            const data = {
                recordName : this.recordName,
                isCompleted: false
            };
            fetch(`${API_URL}/records`,{
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.isLoading = false;
                    this.$router.push({name:'EnterReadings',params:{id:data._id}});
            })
        },

    }

}
</script>

<style>

</style>