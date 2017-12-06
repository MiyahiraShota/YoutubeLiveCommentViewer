const $ = require('jquery');
const axios = require('axios');

new Vue({
    el: '.main_wrap',
    data: {
        api_key: '',
        video_id: '',
        concurrentViewers: 0,
        activeLiveChatId: null,
        liveChatData: []
    },
    created () {
        this.hello = 'okokokok'
    },
    methods: {
        cconnection: function () {
            let url = "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" + this.video_id + "&key=" + this.api_key;
            let $this = this;
            axios.get(url, {
                timeout: 30000
            })
            .then(function (response) {
                if (response.data.items[0]) {
                    $this.concurrentViewers = response.data.items[0].liveStreamingDetails.concurrentViewers;
                    $this.activeLiveChatId = response.data.items[0].liveStreamingDetails.activeLiveChatId;

                    $this.chatLoad();
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        chatLoad: function () {
            let url = "https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&liveChatId=" + this.activeLiveChatId + "&key=" + this.api_key;
            console.log(url);

            let $this = this;
            axios.get(url, {
                timeout: 30000
            })
            .then(function (response) {
                if (response.data.items) {
                    $this.liveChatData = response.data.items;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
})
