<template>
    <div style = "display: flex; flex-direction: row;">
        <!-- ----------------------------- -->
        <div style = "display: flex; flex-direction: column; justify-content: space-around; 
        background-color: #d9d9d9; 
        width: 50vh; height: 100vh;; margin-left: -0.5vw; margin-top: -0.5vw;
        gap: 0.75rem; position: fixed;">
            <div class="logo-container1">
                <img class="logo1" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
            <div>
                <h4 style = "text-align: center; font-size: 1.4vw; margin: auto;">Dashboard</h4>
                <h3 style = "text-align: center; font-size: 1vw;">Manager: {{ userProfile.user_firstname }} {{ userProfile.user_lastname }}</h3>

            </div>
            <div style = "display: flex; flex-direction: column; justify-content: column; gap: calc(100%/7);
                align-items: center;">

                <button class = "InterfaceButtons" disabled>Manage Landmarks</button>

                <button class = "InterfaceButtonLogout" @click = "Logout">Logout</button>
            </div>
        </div>
        <!-- ----------------------------- -->

        
        <div style = "display: flex; flex-direction: column; margin-left: 50vh;">
            <div class="logo-container2">
                <img class="logo2" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
            <h2 v-if = "(landmarksmode)" style="margin-left: 15vh;  margin-top: 10vh;">Landmarks</h2>
            <div v-if = "(landmarksmode)" style = "display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <input class = "searchLocationsInput"  v-model = "searchInput" type = "text" placeholder = "Search Landmarks"/>
				<button class = "searchButton" @click="searchLandmark(searchInput)">
					<img style = "cursor: pointer; width: 3vh; height: 3vh; display: block; margin: auto;" src="../assets/iconSearch.png" alt="">
				</button>
            </div>
            <div v-if = "!(landmarksmode)" style = "display: flex; flex-direction: row; justify-content: center; align-items: center;">

				<button class = "InterfaceButtonChild" @click = "backtomain()" style = "width: 25vh; height: 5vh;">
					Back to the main page
				</button>
            </div>

            <!-- landmarks -->
            <div v-if = "(landmarksmode)" style = "display: flex; flex-direction: row; padding: 5vh; flex-wrap: wrap;
                justify-content: center; margin-top: 5vh;">
                
                <button v-for="landmark in landmarks" :key="landmark.landmark_id" class="landmarkCard" 
                    @click="focusLandmark(landmark)">
                    <h4 class="landmarkcardheader">
                        {{landmark.landmark_name}}
                    </h4>
                </button>

            </div>

            <!-- focuslandmark mode -->
            <div v-if = "(focuslandmarkmode)" style = "display: flex; flex-direction: row; background-color: #c4c4c4; 
                border-radius: 5vh; width: 120vh; height: 70vh; padding: 5vh; flex-wrap: wrap; align-self: center;
                justify-content: space-between; margin-top: 5vh;">
                <div style = "display: flex; flex-direction: column; justify-content: space-around;">
                    <h2 style = "font-size: 2.25vh; font-weight: 600;">Landmark Name: {{ focusLandmarkdata.landmark_name }}</h2>
                    <h2 style = "font-size: 2vh; font-weight: 400;">Landmark Ratings: {{focuslandmarkratings}}/5.0</h2>
                    <h2 style = "font-size: 2vh; font-weight: 400;">Landmark Visits: {{ focusLandmarkdata.landmark_visits }}</h2>
                    <div>
                        <h2 style = "font-size: 2vh; font-weight: 400; vertical-align: end;">Landmark Recent review:</h2>

                        <div style = "display: flex; flex-direction: column; justify-content: start; align-self: end; padding: 1.5vh; 
                            height: fit-content; width: 70vh; background-color: #3c3c3c; border-radius: 3vh;">
                            <!-- user card -->
                            <div v-if = "(hasreviewData)">
                                <div  v-for = "review in reviewData" :key = "review" style = "display: flex; flex-direction: column; justify-content: center">
                                    <div style = "display: flex; flex-direction: column; justify-content: start; align-self: center; align-items: stretch; 
                                    height: fit-content; width: 60vh; background-color: #d9d9d9; border-radius: 1.5vh; padding: 1vh; flex-wrap: wrap;
                                    margin-bottom: 8px;" >
                                        <div style = "display: flex; flex-direction: row; justify-content: space-around;">
                                            <h2 style = "font-size: inherit; font-weight: 400; padding-inline: 5vh; 
                                                margin-bottom: auto;">User ID: {{ review.user_id }}</h2>
                                            <h2 style = "font-size: inherit; font-weight: 400; padding-inline: 5vh; 
                                                margin-bottom: auto;">Rate: {{ review.review_rate }}</h2>
                                        </div>
                                        <h2 style = "font-size: inherit; font-weight: 400; margin-top: 2px; margin-bottom: auto; ">Comment:</h2>
                                        <p style = "font-size: inherit; font-weight: 400; margin: auto;">{{ review.review_input }}</p>

                                </div>
                            </div>

                            </div>
                            <!-- No data Card -->
                            <div v-if = "(!hasreviewData)">
                                <div v-for = "i in 2" :key = "i" style = "display: flex; flex-direction: column; justify-content: center; opacity: 0.5;">
                                    <div style = "display: flex; flex-direction: column; justify-content: start; align-self: center; align-items: stretch; 
                                    height: fit-content; width: 60vh; background-color: #d9d9d9; border-radius: 1.5vh; padding: 1vh; flex-wrap: wrap;
                                    margin-bottom: 8px;" >
                                        <h2 style = "font-size: inherit; font-weight: 400; padding-inline: 5vh; 
                                                margin-bottom: auto; align-self: center;">No Data Available</h2>

                                </div>

                                </div>
                            </div>


                        </div>
                    </div>


                </div>
                <div style = "display: flex; flex-direction: column; justify-content: space-around; width: 30vh;
                        align-items: center; margin-right: 4vh;">
                    <div class = "LandmarkUD"  style = "background-color: #d9d9d9; width: 40vh; height: 10vh; 
                        border-radius: 1vh; margin: 5px; display: flex; flex-direction: column; 
                        justify-content: space-around; align-items: center; cursor: pointer;" 
                        @click="updatelandmarkmodeWindow(focusLandmarkid)"><p>Change Landmark Info and Images</p></div>
                    <div class = "LandmarkUD"  style = "background-color: #e85f5fd5; width: 40vh; height: 10vh; 
                        border-radius: 1vh; margin: 5px; display: flex; flex-direction: column; 
                        justify-content: space-around; align-items: center; cursor: pointer;"
                        @click = "deleteLandmarkMode(focusLandmarkid)"><p>Delete Landmark</p></div>
                </div>
                

            </div>
            <!-- updatelandmark mode -->
            <div v-if = (updatelandmarkmode) style = "display: flex; flex-direction: column;">
                <h2 style="margin-left: 15vh;">Fill the Landmark information below</h2>
                <div style = "display: flex; flex-direction: row; justify-content: space-evenly;">

                    <div style = "display: flex; flex-direction: column; align-items: center;">
                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px; justify-content: space-evenly;">
                            First Paragraph</h4>
                        <textarea class = "RegisterInputs" style="resize: none; width: 40vh; 
                            height: 25vh; padding: 2vh;" v-model="paragraph1" rows="5" cols="30"/>

                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Second Paragraph</h4>
                        <textarea class = "RegisterInputs" style="resize: none; width: 40vh; 
                            height: 25vh; padding: 2vh;" v-model="paragraph2" rows="5" cols="30"/>

                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Third Paragraph</h4>
                        <textarea class = "RegisterInputs" style="resize: none; width: 40vh; 
                            height: 25vh; padding: 2vh;" v-model="paragraph3" rows="5" cols="30"/>
                
                    </div>


                    <div style = "display: flex; flex-direction: column; align-items: stretch;">
                        <!-- Image 1 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            First Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected1" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage) v-model = "caption1" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
                        <!-- Image 2 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Second Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected2" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage) v-model = "caption2" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
                        <!-- Image 3 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Third Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected3" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage) v-model = "caption3" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
                        <!-- Image 4 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Fourth Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected4" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage) v-model = "caption4" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
                        <!-- Image 5 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Fifth Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected5" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage) v-model = "caption5" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
    
                    </div>
                
                </div>
                <button class = "InterfaceButtonChild" @click = "updateLandmarkModeAction(focusLandmarkid)" style = "align-self: center; width: fit-content;
                                padding: 2vh; margin-top: 3vh;">
                                Insert landmark information</button>
                <h4 v-if = "!(this.successmessage) || this.message" style = "font-size: 2vh; margin-top: 10px; margin-bottom: 20px; 
                color: red; text-align: center;">{{this.message}}</h4>
                <h4 v-if = "!(this.message) || this.successmessage" style = "font-size: 2vh; margin-top: 10px; margin-bottom: 20px; 
                color: green; text-align: center;">{{this.successmessage}}</h4>
            </div>
                
            
        </div>

    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from 'axios'


export default {

    data(){
        return{
            searchInput: null,
            landmarks: [],

            focusLandmarkid: '',
            focusLandmarkdata: [],
            focuslandmarkratings: '',

            focuslandmarkmode: false,

            reviewData: [],
            hasreviewData: false,

            focuslandmarkmode: false,
            updatelandmarkmode: false,
            landmarksmode: true,

            landmarkparagraphs: [],
            landmarkimages: [],

            paragraph1ID: null,
            paragraph2ID: null,
            paragraph3ID: null,

            image1ID: null,
            image2ID: null,
            image3ID: null,
            image4ID: null,
            image5ID: null,

            paragraph1: null,
            paragraph2: null,
            paragraph3: null,

            image1: null,
            image2: null,
            image3: null,
            image4: null,
            image5: null,

            caption1: null,
            caption2: null,
            caption3: null,
            caption4: null,
            caption5: null,

            message: null,
            successmessage: null,

            userProfile: [],
            authToken: null,


        }
    },

    mounted() {
        
        //GET ALL LANDMARKS
            axios.get('http://localhost:7000/Manage/a/get/all/landmarks')
            .then((response) => {
                this.landmarks = response.data;
                console.log(this.landmarks);
            })
            .catch((error) => {
                console.log(error);
            });
            let userToken = Cookies.get('auth_token');
			if (userToken) {
				axios.get(`http://localhost:7000/home/u/userprofile`, {
				headers: {
					Authorization: `Bearer ${userToken}`
				}
				})
				.then((response) => {
				this.userProfile = response.data[0];
				})
				.catch(error => {
				if (error.response && error.response.status === 401) {
					// Token has expired
					alert('Your session has expired. Please login again.');
					console.log('Session expired, signing out')
					Cookies.remove('auth_token'); 
					this.$router.push({name: 'adminlogin'});
				} else {
					console.log(error);
				}
				});
			} 
			else {
				console.log('clearing cookie')
                Cookies.remove('auth_token'); 
                this.authToken = ''
				this.$router.push({name: 'adminlogin'});
			};

        },
        
    methods: {
        onFileSelected1(event) {
            this.image1= event.target.files[0];
        },
        onFileSelected2(event) {
            this.image2= event.target.files[0];
        },
        onFileSelected3(event) {
            this.image3= event.target.files[0];
        },
        onFileSelected4(event) {
            this.image4= event.target.files[0];

        },
        onFileSelected5(event) {
            this.image5= event.target.files[0];
        },
        searchLandmark(searchInput){
            if (searchInput.length > 0){
					axios.post('http://localhost:7000/Manage/a/search/landmarks', {keywords: this.searchInput})
					.then((response) => {
						this.landmarks = response.data;
                        console.log(this.landmarks);
					})
					.catch((error) => {
						console.error(error);
						
					});
				} else {
                    axios.get('http://localhost:7000/Manage/a/get/all/landmarks')
                    .then((response) => {
                        this.landmarks = response.data;
                        console.log(this.landmarks);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
				}
        },

        focusLandmark(landmark){
            console.log("Focus is on: ", landmark.landmark_name)
            this.focusLandmarkid = landmark.landmark_id
            console.log(this.focusLandmarkid)
            this.hasreviewData = true,
            this.landmarksmode = false,
            this.focuslandmarkmode = !this.focuslandmarkmode
            //Fetch Landmark Information
            axios.post(`http://localhost:7000/LakbayScan/u/fetching`, {landmarkid: this.focusLandmarkid})
            .then((response) => {
                this.focusLandmarkdata = response.data[0]
                console.log('fetch landmark info')

                console.log(this.focusLandmarkdata.landmark_name)

            }).catch((error) => {
                    console.error(error);
                    this.error = 'Failed to fetch landmark info.';
            });
            
            //Fetch Ratings
            axios.post(`http://localhost:7000/LakbayScan/u/fetching/ratings`, {landmarkid: this.focusLandmarkid})
            .then((response) => {
                console.log('dadadadad',response.data[0].average_rating)
                if (response.data[0] && response.data[0].average_rating !== null) {
                    this.focuslandmarkratings = parseFloat(response.data[0].average_rating).toFixed(1);
                } else {
                    this.focuslandmarkratings = 0.0;
                }
                console.log('fetch landmark ratings: ', this.focuslandmarkratings)
                console.log(response.data[0])
            }).catch((error) => {
                console.error(error);
                this.error = 'Failed to fetch landmark ratings.';
            });

            //Fetch User review /u/fetching/review
            axios.post(`http://localhost:7000/LakbayScan/u/fetching/review`, {landmarkid: this.focusLandmarkid})
            .then((response) => {
                this.reviewData = response.data.slice(-2)
				if (this.reviewData < 2) {
					this.hasreviewData = !this.hasreviewData;
					console.log('Recent Lakbay data insuficient', this.hasreviewData);
				} else {
      				console.log("Has Review Data");
				}
                
            }).catch((error) => {
                console.error(error);
            });



        },
        updatelandmarkmodeWindow(focusLandmarkid){
            console.log("Hello1", focusLandmarkid)
            this.focuslandmarkmode = false,
            this.updatelandmarkmode = !this.updatelandmarkmode

            //fecth landmark paragraph id
            axios.post(`http://localhost:7000/LakbayScan/u/fetching/paragraphs`, {landmarkid: this.focusLandmarkid})
            .then((response) => {
                this.landmarkparagraphs = response.data
                if(this.landmarkparagraphs.length > 0){
                    console.log(this.landmarkparagraphs )
                    console.log(' fetch landmark paragraphs')
                    
                    this.paragraph1ID = this.landmarkparagraphs[0].info_id
                    console.log(this.paragraph1ID)
                    this.paragraph2ID  = this.landmarkparagraphs[1].info_id
                    console.log(this.paragraph2ID)
                    this.paragraph3ID  = this.landmarkparagraphs[2].info_id
                    console.log(this.paragraph3ID)
                    console.log(response.data)
                }   else {
                    console.log("Landmark has no info")
                }
            }).catch((error) => {
                    console.error(error);
                    this.error = 'Failed to fetch landmark paragraphs.';
            });

            axios.get(`http://localhost:7000/manage/locations/${this.focusLandmarkid}/images`)
            .then((response) => {
                this.landmarkimages = response.data
                if (this.landmarkimages.length === 5){
                    console.log(this.landmarkimages)
                    this.image1ID = this.landmarkimages[0].image_id
                    console.log('Image1 ID: ', this.image1ID)
                    this.image2ID = this.landmarkimages[1].image_id
                    console.log('Image2 ID: ', this.image2ID)
                    this.image3ID = this.landmarkimages[2].image_id
                    console.log('Image3 ID: ', this.image3ID)
                    this.image4ID = this.landmarkimages[3].image_id
                    console.log('Image4 ID: ', this.image4ID)
                    this.image5ID = this.landmarkimages[4].image_id
                    console.log('Image5 ID: ', this.image5ID)
                } else {
                    console.log('Landmark has no images or no enough number of images')
                }

            }).catch((error) => {
                    console.error(error);
                    this.error = 'Failed to fetch landmark images.';
            });


        },
        updateLandmarkModeAction(focusLandmarkid){
            console.log("Hello2", focusLandmarkid)
            console.log(this.paragraph1ID)
            console.log(this.paragraph2ID)
            console.log(this.paragraph3ID)

            if (this.paragraph1 === null || this.paragraph2 === null || this.paragraph3 === null 
                || this.caption1 === null || this.caption2 === null || this.caption3 === null || this.caption4 === null 
                || this.caption5 === null) {

                
                this.message = 'Some fields are empty'
                    
            }
           else{
                

                // paragraph 1
                axios.put('http://localhost:7000/Manage/a/update/landmarkinfo', {
                    infoid: this.paragraph1ID,
                    landmarkid: this.focusLandmarkid,
                    infoparagraph: this.paragraph1,
                })
                .then((response) => {

                    console.log(response)
                                        
                })
                .catch(error => {
                    console.log(error);
                });

                // paragraph 2
                axios.put('http://localhost:7000/Manage/a/update/landmarkinfo', {
                    infoid: this.paragraph2ID,
                    landmarkid: this.focusLandmarkid,
                    infoparagraph: this.paragraph2,

                })
                .then((response) => {

                    console.log(response)
                                        
                })
                .catch(error => {
                    console.log(error);
                });

                // paragraph 3
                axios.put('http://localhost:7000/Manage/a/update/landmarkinfo', {
                    infoid: this.paragraph3ID,
                    landmarkid: this.focusLandmarkid,
                    infoparagraph: this.paragraph3,

                })
                .then((response) => {
                    console.log(response)                    
                })
                .catch(error => {
                    console.log(error);
                });

                
                for (let i = 1; i <= 5; i++) {
                console.log("process", i)
                const imageid = this[`image${i}ID`]
                const image = this[`image${i}`];
                const caption = this[`caption${i}`];
                if (!image || !caption) {
                    continue;
                }

                const formData = new FormData();
                formData.append('imageid', imageid);
                formData.append('image_src', image);
                formData.append('landmarkid', this.focusLandmarkid);
                formData.append('imagecaption', caption);

                axios.put('http://localhost:7000/manage/update/locations/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            }
                this.successmessage2 = 'Insertion of information is successful'
                location.reload()

           }
        },
        deleteLandmarkMode(focusLandmarkid){
            console.log('deleting: ', this.focusLandmarkid)
            axios.post('http://localhost:7000/Manage/delete/landmark', {
                    landmarkid: this.focusLandmarkid
                })
                .then((response) => {
                    console.log(response)
                    console.log("Deletion is done, reloading window now")
                    location.reload()     
                })
                .catch(error => {
                    console.log(error);
                });
        },

        backtomain(){
            this.focuslandmarkmode = false,
            this.updatelandmarkmode = false,
            this.landmarksmode = true
            location.reload()

        },



        
        // reDirectRegisterLoc(){
        //     this.$router.push({name: 'adminregisterlocation'})
        // },
        reDirectManageLoc(){
            this.$router.push({name: 'adminmanagelocation'})
        },
        // reDirectBucketList(){
        //     this.$router.push({name: 'adminbucketlist'})
        // },
        // reDirectMaps(){
        //     this.$router.push({name: 'adminmaps'})
        // },
        // reDirectManagers(){
        //     this.$router.push({name: 'adminmanagers'})
        // },
        // reDirectAdministrators(){
        //     this.$router.push({name: 'adminadministrators'})
        // },
        // reDirectUsers(){
        //     this.$router.push({name: 'adminusers'})
        // },
        Logout(){
            console.log('deleting cookie')
            Cookies.remove('auth_token'); 
            this.authToken = ''
            this.$router.push({name: 'adminlogin'});
        }


    }
}
</script>

<style scoped>

    .logo-container1 {
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .logo1 {
        width: 50%;
        margin-top: 1vh;
    }
    .logo-container2 {

        max-width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;

    }
    .logo2 {
        width: 10%;


    }

    .InterfaceButtons {
        border: none;
        width: 15vw;
        height: 6.5vh;
        border-radius: 1.4vh;
        margin-top: 2vh;
        background-color: #c4c4c4;
        padding: 2.5px;
        cursor: pointer;

        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: calc(0.5em + 4vw);
        line-height: 1;
        font-size: 1vw;
    }
    .InterfaceButtonLogout {
        border: none;
        width: 6vw;
        height: 5vh;
        border-radius: 1vh;
        margin-top: 3vh;
        margin-bottom: 3vh;
        background-color: #c4c4c4;
        padding: 2.5px;
        cursor: pointer;

        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 1vh;
        line-height: 1;
        font-size: 1vw;
    }
    .searchLocationsInput{
            border: none;
			border-radius: 0.75vw;
            width: 70%;
            height: 5vh;
			text-align: center;
			align-self: center;

            color: #ffffff;
            background-color: #3C3C3C;
        }
	.searchButton{
			margin-left: 2vw; 
			width: 5.5vh; 
			height: 5.5vh;
			border: none;
			border-radius: 0.5vw;
			background-color: #c4c4c4;
		}

    .LandmarkUD{
        display: flex; 
        flex-direction: row;
        justify-content: space-between;
        margin-top: -3vh;
        font-size: inherit;
        font-weight: 500;
        color: rgb(65, 65, 65);
    }
    .landmarkCard{
        display: flex; 
        flex-direction: column; 
        justify-content: space-evenly;
        width: 30vh; 
        height: 15vh; 
        background-color: #c4c4c4; 
        border: none;
        border-radius: 2vh; 
        padding: 2vh; 
        text-align: center; 
        margin: 1vh; 
        cursor: pointer;
    }
    .landmarkcardheader{
        font-size: calc(inherit + 8vh); 
    }
    .RegisterInputs{
        border: none;
        border-radius: 0.75vw;
        width: 40vh;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-bottom: 20px;
        color: #ffffff;
        background-color: #3C3C3C;
    }
    .InterfaceButtonChild {
        border: none;
        border-radius: 1vh;
        background-color: #c4c4c4;
        cursor: pointer;

        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        font-size: 1vw;
    }
    .LandmarkUD{
        display: flex; 
        flex-direction: row;
        justify-content: space-between;

        font-size: inherit;
        font-weight: 500;
        color: rgb(65, 65, 65);
    }



    .landmarkCard:active, .searchButton:active{
        background-color: #3c3c3c;
    }


</style>

