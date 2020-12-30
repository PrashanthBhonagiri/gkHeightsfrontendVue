<template>
    <div class="container">
        <div class="loader" v-if="isLoading">
            <img src="../assets/loader.svg" alt="loading..." style="z-index:4">
        </div>
        <div>
            <h1>
                {{record.recordName}}
            </h1>
            <hr>
            <div v-if="!record.isCompleted">
                <div v-if="!submitted">
                    <form v-on:submit.prevent="submit">
                        <fieldset>
                            <div class="form-group row">
                                <label for="flatNum" class="col-sm-4 col-form-label">Flat Number :</label>
                                <div class="col-sm-8">
                                    <select v-model="selectedFlatnum" id="flatNum" required>
                                        <option value="" disabled>Please Select One</option>
                                        <option v-for="(num,index) in flatNumbers" :value="num" :key="index">
                                            {{num}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="rawReading" class="col-sm-4 col-form-label">Enter Raw Reading : </label>
                                <div class="col-sm-8">
                                    <input type="number" v-model="rawReading" id="rawReading" placeholder="Raw Reading"
                                        class="form-control" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="manjeeraReading" class="col-sm-4 col-form-label">Enter Manjeera Reading : </label>
                                <div class="col-sm-8">
                                    <input type="number" v-model="manjeeraReading" id="manjeeraReading" 
                                        placeholder="Manjeera Reading" class="form-control" required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="!isValidForm">Submit</button>
                            <br>
                        </fieldset>
                    </form>
                </div>
                <div v-else>
                    <div class="card">
                        <div class="card-body">
                        <h2>Submitted Details</h2>
                        <p>Id : {{resData._id}}</p> 
                        Flat Number : <b>{{resData.flatNumber}}</b> <br>
                        Raw Reading : <b>{{resData.rawReading}}</b> <br>
                        Manjeera Reading : <b>{{resData.manjeeraReading}}</b> <br>
                        RecordName : <b>{{resData.recordName}}</b> <br>
                        <button @click="newForm()" class="btn btn-primary">Enter new Record</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!submitted" class="card-columns">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Flat Num</th>
                            <th>Raw</th>
                            <th>Manjeera</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in submittedReadings" :key="index">
                            <td>{{item.flatNumber}}</td>
                            <td>{{item.rawReading}}</td>
                            <td>{{item.manjeeraReading}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="!submitted" class="card-columns">
                <div class="card" v-for="(item,index) in submittedReadings" :key="index">
                    <div class="card-body">
                        <div class="card-title">{{item.flatNumber}}</div>
                        <div class="card-text">
                            <p>Raw Reading : {{item.rawReading}}</p>
                            <p>Manjeera Reading : {{item.manjeeraReading}}</p>
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
            record: {
                recordName: '',
                _id: '',
                isCompleted: false,
            },
            isLoading: false,
            flatNumbers : [101,201,301,401,501,102,202,302,402,502
                ,103,203,303,403,503,104,204,304,404,504,105,205,305,405,505
                ,106,206,306,406,506,107,207,307,407,507,108,208,308,408,508,
                109,209,309,409,509,110,210,310,410,510,111,211,311,411,511,
                112,212,312,412,512,113,213,313,413,513,114,214,314,414,514],
            selectedFlatnum : '',
            rawReading: '',
            manjeeraReading: '',
            submitted: false,
            resData: {},
            submittedReadings:[],

        }
    },
    computed: {
        isValidForm() {
            return this.selectedFlatnum && this.rawReading && this.manjeeraReading;
        },
    },
    mounted() {
        const id = this.$route.params.id;
        console.log(id);
        this.getRecordDetails(id);
    },
    methods: {
        recordCompleted() {
            //make isCompleted false using put request
            fetch(`${API_URL}/records/${this.record._id}`,{
                method: 'put',
                headers: {
                    'content-type': 'application/json',
                },
            })
        },
        getReadings() {
            fetch(`${API_URL}/readings?recordId=${this.record._id}` , {
                method:'get',
                headers: {
                    'content-type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.submittedReadings = data;
                    for(let item in data) {
                        // console.log(item);
                        const index = this.flatNumbers.indexOf(data[item].flatNumber);
                        console.log(index);
                        if(index > -1) {
                            this.flatNumbers.splice(index,1);
                        }
                        if(this.flatNumbers.length==0) {
                            console.log("isCompleted updated true!!")
                            this.record.isCompleted = true;
                            this.recordCompleted();
                        }
                    }
                    if(data.isCompleted) {
                        console.log("isCompleted updated true!!")

                        this.record.isCompleted = true;
                    }
                    this.isLoading =false;
                })
        },
        getRecordDetails(id) {
            this.isLoading = true;
            console.log(id);
            fetch(`${API_URL}/records/${id}`,{
                method:'get',
                headers: {
                    'content-type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.record = data;
                    this.isLoading = false;
                    this.getReadings();
                })
        },
        submit() {
            this.isLoading = true;
            console.log(this.selectedFlatnum + " " + this.rawReading + " " + this.manjeeraReading);
            const formData = {
                flatNumber : this.selectedFlatnum,
                rawReading: this.rawReading,
                manjeeraReading: this.manjeeraReading,
                recordId: this.record._id,
                recordName: this.record.recordName
            };
            console.log(formData);
            fetch(`${API_URL}/readings`,{
                method:'post',
                body: JSON.stringify(formData),
                headers: {
                     'content-type': 'application/json',
                },
            }).then(res => res.json())
                .then(data =>{
                    console.log(data);
                    this.resData = data;
                    this.isLoading = false;
                    this.submitted = true;
                })
        },
        newForm() {
            this.submitted = false;
            this.selectedFlatnum = '';
            this.rawReading = '';
            this.manjeeraReading = '';
            this.submittedReadings.push(this.resData);
            const index = this.flatNumbers.indexOf(this.resData.flatNumber);
            if(index > -1) {
                this.flatNumbers.splice(index,1);
            }
            if(this.flatNumbers.length==0) {
                console.log("isCompleted updated true!!")

                this.record.isCompleted = true;
                this.recordCompleted();
            }
        },
    }
}
</script>

<style>

</style>
