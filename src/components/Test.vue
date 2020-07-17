<template>
    <div class="motion-app">
        <div class="welcome">
            <h1>欢迎来到语音情绪识别系统</h1>
            <div class="start" v-show="!isStarted" @click="isStarted = true">
                立即体验
            </div>
        </div>

        <div class="test-input" v-show="isStarted">
            <button class="record" 
                @click="getRecorder"
                v-show="!isRecording"
            >
                录音
            </button>
            <button class="stop-record" 
                @click="stopRecorder"
                v-show="isRecording"
            >
                停止
            </button>
        </div>

        <div class="app-container" v-show="isStarted">
            <!-- 选择场景 开始 -->
            <div class="scene-selector">
                <span>请选择对话场景:</span>
                <select name="scene" id="scene" v-model="selectedScene">
                    <option value="default">任意</option>
                    <option value="talk">闲聊</option>
                    <option value="task">任务</option>
                    <option value="customer_service">客服</option>
                </select>
            </div>
            <!-- 选择场景 结束 -->

            <!-- 结果分析 开始 -->
            <div class="result-container">
                <div class="input-content">
                    <div class="audio-wrap">
                        <audio id="player" controls></audio>
                    </div>
                    
                    <div v-if="userInput.length > 0" class="user-input">您输入的内容是：{{userInput}}</div>
                    <div v-else class="user-input">请点击录音进行语音输入</div>
                </div>

                <div v-show="motion1" class="result-desc">
                    <p v-if="motion2">您的情绪是：({{selectedSceneCN}}){{motion1,}} {{motion2}}</p>
                    <p v-else>您的情绪是：({{selectedSceneCN}}){{motion1}}</p>
                </div>
            </div>
            <!-- 结果分析 结束 -->
        </div>

    </div>
</template>

<script>
import Recorderx, { ENCODE_TYPE } from "recorderx";

export default {
    mounted() {
        this.getAccessTokens();        
    },
    data() {
        return {
            //用户输入
            userInput: '',
            //情绪识别accessToken
            motionAccessToken: '',
            //情绪识别对话模式
            scenes: ['default', 'talk', 'task', 'customer_service'],
            //用户选取的对话模式
            selectedScene: 'default',
            //情绪api的数据
            motionData: {},
            //mediaSteam
            stream: null,
            //mediaStreamTrack
            mediaStreamTrack: null,
            //mediaRecorder
            mediaRecorder: null,
            //chunks for Blob
            chunks: [],
            //语音识别accessToken
            voiceAccessToken: '',
            //记录的语音数据
            voiceData: null,
            //文件大小
            size: 8000,
            //一级情绪
            motionLevel1: {
                'pessimistic': '负向情绪',
                'neutral': '中性情绪',
                'optimistic': '正向情绪'
            },
            //二级情绪
            motionLevel2: {
                'thankful': '感谢',
                'happy': '愉快',
                'complaining': '抱怨',
                'angry': '愤怒',
                'like': '喜爱',
                'disgusting': '厌恶',
                'fearful': '恐惧',
                'sad': '悲伤'
            },
            //true：录音中
            isRecording: false,
            //ture: started
            isStarted: false
        }
    },
    methods: {
        /**
         * @func
         * @desc 获取token
         */
        getAccessTokens() {
            this.axios.post(
                '/baiduApi/oauth/2.0/token?grant_type=client_credentials&client_id=IOGlBFG3B13TIzgSCYGRQz5k&client_secret=W5auMeyiTNfHkRdDa1viHjt7RXyAcWA0&',
            ).then((res) => {
                let token = res?.data?.access_token;
                if (token) {
                    this.motionAccessToken = token;
                }
                else {
                    console.log('获取token失败');
                }
            }).catch((err) => {
                console.log(err);
            });

            this.axios.post('/baiduApi/oauth/2.0/token?grant_type=client_credentials&client_id=LUWklplmtiXwexyH8qcURmbG&client_secret=A0fC9ptlix7nOBOIkxge8cNonuPyx2sv&',
            ).then((res) => {
                let token = res?.data?.access_token;
                if (token) {
                    this.voiceAccessToken = token;
                }
                else {
                    console.log('获取token失败');
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        /**
         * @func
         * @desc 调用情绪api
         */
        getData() {
            if (this.motionAccessToken.length === 0) {
                //暂无token
                return;
            }

            if (this.userInput.length === 0) {
                //todo 
                //提示用户输入
                return;
            }

            this.axios({
                method: 'post',
                url: '/baiduApi/rpc/2.0/nlp/v1/emotion',
                params: {
                    charset: 'UTF-8',
                    access_token: this.motionAccessToken
                },
                data: {
                    "scene": this.selectedScene,
                    "text": this.apiInput
                }
            }).then(res => {
                //console.log(res);
                this.motionData = res.data;
            }).catch(err => {
                console.log(err);
            })
        },
        /**
         * @func
         * @desc 录音
         */
        async getRecorder() {
            if (!this.stream) {
                //请求stream权限
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false
                }).then((stream) => {
                    this.stream = stream;
                }).catch((err) => {
                    console.log(err);
                })
            }

            this.mediaStreamTrack = typeof this.stream.stop === "function"
                                    ? this.stream
                                    : this.stream.getTracks()[0];

            /*
            this.mediaRecorder = new window.MediaRecorder(this.stream, {
                audioBitsPerSecond : 16000,
                videoBitsPerSecond : 16000,
            }); 
            this.mediaRecorder.ondataavailable = (e) => {
                this.chunks.push(e.data);
            }
            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.chunks);

                const reader = new FileReader();
                reader.onload = (e) => {
                    //读取base64
                    this.voiceData = e.target.result;
                    console.log(this.voiceData);
                }
                reader.readAsDataURL(blob);


                this.voiceData = blob;
                this.size = blob.size;
                console.log(blob);

                const audioURL = window.URL.createObjectURL(blob);
                this.chunks = [];

                let player = document.getElementById("player");
                player.src = audioURL;
                player.play();

                

            }
            this.mediaRecorder.start();
            */

            //创建recorder
            const rc = new Recorderx();
            this.mediaRecorder = rc;

            // start recorderx
            rc.start().then(() => {
                //console.log("start recording");
                this.motionData = {};
                this.isRecording = true;
            }).catch(error => {
                console.log("Recording failed.", error);
            });

            
        },
        /**
         * @func
         * @desc 停止录音
         */
        stopRecorder() {
            if (!this.mediaRecorder) {
                //还没获取到media recorder
                return;
            }
            else {
                this.mediaRecorder.pause();
                
                // get wav, but disable compression
                let wav = this.mediaRecorder.getRecord({
                    encodeTo: ENCODE_TYPE.WAV,
                    compressible: true
                });

                const reader = new FileReader();
                reader.onload = (e) => {
                    //读取base64
                    this.voiceData = e.target.result.split('data:audio/wav;base64,')[1];
                    this.size = wav.size;

                    let player = document.getElementById("player");
                    player.src = e.target.result;
                    player.play();

                    this.isRecording = false;

                    //调用接口
                    this.getTextFromApi();
                }
                reader.readAsDataURL(wav);
            }
        },
        /**
         * @func
         * @desc 调用语音识别api
         */
        async getTextFromApi() {

            this.axios({
                method: 'post',
                url: '/voiceApi/server_api',
                data: {
                    format: "wav",
                    rate: 16000,
                    dev_pid: 1537,
                    channel: 1,
                    token: this.voiceAccessToken,
                    cuid: "pk147",
                    len: this.size,
                    speech: this.voiceData, // xxx为 base64（FILE_CONTENT）
                }
            }).then((res) => {
                console.log(res);

                //clear
                this.mediaRecorder.clear();

                //显示识别后的文本
                this.userInput = res.data.result[0];

                if (this.userInput === "") {
                    this.userInput = "识别失败";
                    return;
                }
                else {
                    //调用情绪api
                    this.getData();
                }

                
            }).catch((err) => {
                console.log(err);
            })

        }
    },
    computed: {
        //处理userInput
        apiInput() {
            return this.userInput;
        },
        //情绪识别的一级结果
        motion1() {
            if (!Array.isArray(this.motionData.items)) {
                console.log("not array")
                return '';
            }
            else {
                //console.log(this.motionData.items[0].label);
                return this.motionLevel1[this.motionData.items[0].label];
            }
        },
        //情绪识别的二级结果
        motion2() {
            if (this.motion1 === '') {
                return '';
            }
            else {
                let subitems = this.motionData.items[0].subitems;
                console.log(subitems);
                if (subitems.length > 0) {
                    return this.motionLevel2[subitems[0].label];
                }
                else {
                    return '';
                }
            }
        },
        //选取的模式
        selectedSceneCN() {
            let selected = this.selectedScene;

            if (selected === 'default') {
                return '任意';
            }
            else if (selected === 'talk') {
                return '闲聊';
            }
            else if (selected === 'task') {
                return '任务';
            }
            else {
                return '客服';
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.motion-app {
    width: 100%;
    height: 100%;

    color: white;
    background-color: #2C3E50;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.welcome {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    h1 {
        width: 100%;
    }

    .start {
        width: 100px;
        height: 40px;
        border-radius: 10px;
        background-color: rgb(11, 241, 165);
        opacity: .6;
        transition: all .5s;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .start:hover {
        opacity: 1;
        box-shadow: 2px 2px 2px 2px #333;
    }
}

.test-input {
    width: 100%;
    animation: leftfadein 1s;

    button {
        width: 60px;
        height: 30px;
        background-color: #00CCFF;
        opacity: .8;
        transition: all .2s;
        border-radius: 5px;
    }
    button:hover {
        opacity: 1;
        box-shadow: 2px 2px 2px 2px #000;
    }
}

.app-container {
    width: 100%;
    animation: leftfadein 1s;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .scene-selector {
        width: 100%;

        select {
            width: 60px;
            outline-style: none;
            border-radius: 5px;
            margin: 0 5px;
            padding: 0 5px;

            option {

            }
        }
        select:hover {
            border: 1px solid rgb(5, 152, 250);
        }
    }

    .result-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        .input-content {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        
            .audio-wrap {
                width: 100%;
                margin: 10px;
            }

            .user-input {
                width: 400px;
                height: 50px;
                border: #00CCFF solid 2px;
                border-radius: 10px;
            }
        }

        .result-desc {
            width: 100%;
            animation: topjump .5s;
        }
    }
}

//动画
@keyframes topjump {
    0% {
        opacity: 0;
        transform: translate3d(0, -500px, 0);
    }
    40% {
        transform: translate3d(-10px, 20px, 0);
    }
    75% {
        transform: translate3d(5px, -10px, 0);
    }
    90% {
        transform: translate3d(0, 5px, 0);
        opacity: 1;
    }
    100% {
        transform: none;
    }
}

@keyframes leftfadein {
    0% {
        opacity: 0;
        transform: translate3d(-500px, 0, 0);
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: none;
    }
}

</style>