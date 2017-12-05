const $ = require('jquery');
const axios = require('axios');

new Vue({
    el: '.main_wrap',
    data: {
        hello: '',
        api_key: '',
        video_id: 'mpS9LqdnBRI'
    },
    created () {
        this.hello = 'okokokok'
    },
    methods: {
        connection: function () {
            let url = "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" + this.video_id + "&key=" + this.api_key;
            console.log(url);
            axios.get(url, {
                timeout: 30000
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
})
