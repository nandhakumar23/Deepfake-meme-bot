const config = require('./config');
const twit = require('twit');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const webshot = require('webshot-node');
const puppeteer = require('puppeteer');
const stringSimilarity = require('string-similarity');
const { execSync } = require("child_process");
var twitterVideo = require('twitter-video')

let need_img = true;
let need_vid = true;

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

const Twitter = new twit(config);

let twit_strim = Twitter.stream('statuses/filter', { track: '@Baka_mitai_bot' });

twit_strim.on('tweet', ty_for_follow);

function ty_for_follow(data) {

    console.log("someone tagged me");

    console.log(data);

    let twitter_handle = data.user.screen_name;

    let tweet_text = data.text

    let tweet_id =data.id_str

    let medias = data.extended_entities.media


    console.log(medias)

    if (medias) {
        for (let i = 0; i < medias.length; i++) {
            let curr_url = medias[i].media_url_https
            let file_type = medias[i].type

            if (file_type == 'photo' &&  need_img== true) {

                console.log(i + ": " + curr_url)

                let filename = 'image.png'

                console.log(filename)

                download(curr_url, filename, function () {
                    console.log('done :)')
                    try {


                        console.log("here1");
                        execSync(
                            "cd C:\\Users\\Nandhakumar\\Documents\\GitHub\\Deepfake-meme-bot\\PY_BackEnd\\first-order-model\\ && python C:\\Users\\Nandhakumar\\Documents\\GitHub\\Deepfake-meme-bot\\PY_BackEnd\\first-order-model\\driving_code.py"
                        );

                        console.log("here2");
                        execSync(
                            'C:\\Users\\Nandhakumar\\AppData\\Local\\imageio\\ffmpeg\\ffmpeg-win32-v3.2.4.exe -i C:\\Users\\Nandhakumar\\Documents\\GitHub\\Deepfake-meme-bot\\PY_BackEnd\\first-order-model\\twitter_out.mp4 -r 30 -filter:v "setpts=PTS/3" C:\\Users\\Nandhakumar\\Documents\\GitHub\\Deepfake-meme-bot\\PY_BackEnd\\first-order-model\\twitter_out_fps.mp4 -y'
                        );

                        console.log("here3");
                        execSync(
                            "C:\\Users\\Nandhakumar\\AppData\\Local\\imageio\\ffmpeg\\ffmpeg-win32-v3.2.4.exe -i C:\\Users\\Nandhakumar\\Documents\\GitHub\\Deepfake-meme-bot\\PY_BackEnd\\first-order-model\\twitter_out_fps.mp4 -i C:\\Users\\Nandhakumar\\Documents\\GitHub\\Deepfake-meme-bot\\PY_BackEnd\\first-order-model\\vid.mp4 -c copy -map 0:v0 -map 1:a0 -shortest C:\\Users\\Nandhakumar\\Documents\\GitHub\\Deepfake-meme-bot\\PY_BackEnd\\first-order-model\\twitter_final.mp4 -y"
                        );

                        var filepath = 'C:/Users/Nandhakumar/Documents/GitHub/Deepfake-meme-bot/PY_BackEnd/first-order-model/twitter_final.mp4'

                        twitterVideo.fromFile(filepath, config, function (err, media_id) {
                            // Now you have a media ID you can post with a tweet
                            console.log("here the status id tweet is: " + tweet_id)

                            var params = {in_reply_to_status_id: tweet_id, status: '@' + twitter_handle + ' enjoy :) ', media_ids: [ media_id ]}
                            Twitter.post('statuses/update', params, function post (err, data, res) {
                                console.log(data) // Tweet with video is live
                            })
                        })


                    } catch (err) {
                        console.warn("Failed to respond to mention.");
                        console.warn(err);
                    }

                })
            }

        }


    }
}





