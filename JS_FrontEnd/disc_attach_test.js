const Discord = require("discord.js");
const { execSync } = require("child_process");
const { token} = require('./disc_config.json');
const twit = require('twit');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const webshot = require('webshot-node');
const puppeteer = require('puppeteer');
const stringSimilarity = require('string-similarity');
var twitterVideo = require('twitter-video')
const client = new Discord.Client();
client.login(token);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {

    let bot_mention = false;
    let mentioned_user_id = ''



    if (msg.mentions.users.find((mentionedUser) => mentionedUser.id === client.user.id)) {

        bot_mention = true;
        mentioned_user_id = msg.author.id
            msg.channel.send({
                files: [{
                    attachment: 'C:\\Users\\Nandhakumar\\Documents\\GitHub\\first-order-model\\disc_final.mp4',
                    name: 'disc_final.mp4'
                }]
            })
            .then(console.log)
            .catch(console.error);

    }

})
