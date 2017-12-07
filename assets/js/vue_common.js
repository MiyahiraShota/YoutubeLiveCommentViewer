const $ = require('jquery');
const axios = require('axios');

new Vue({
    el: '.main_wrap',
    data: {
        api_key: '',
        video_id: '',
        concurrentViewers: 0,
        activeLiveChatId: null,
        liveChatData: [],
        nextPageToken: null
    },
    created () {
        this.hello = 'okokokok'
    },
    methods: {
        connection: function () {
            let url = "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" + this.video_id + "&key=" + this.api_key;
            let $this = this;
            axios.get(url, {
                timeout: 30000
            })
            .then(function (response) {
                if (response.data.items[0]) {
                    $this.nextPageToken = null;
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
            var url = "https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&liveChatId=" + this.activeLiveChatId + "&key=" + this.api_key;

            if (this.nextPageToken) {
                url = url + '&pageToken=' + this.nextPageToken;
            }
            console.log(url);

            let $this = this;
            axios.get(url)
            .then(function (response) {
                if (response.data.items) {
                    $this.liveChatData = $this.liveChatData.concat(response.data.items);
                    $this.nextPageToken = response.data.nextPageToken;
                    console.log(response.data.items);
                    setTimeout(function () {
                        $this.chatLoad();
                    }, (response.data.pollingIntervalMillis+500));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
})
