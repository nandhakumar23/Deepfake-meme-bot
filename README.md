# DeepFake-Bot
Receives a image from the user and uses the First order model to generate Deepfake clips. Works on Twitter and Discord

Discord version allows you to set the Source video.

The source video defaults to a Dame-Dame live singing session based on Yakuza 5

Source repo for the model:
https://github.com/AliaksandrSiarohin/first-order-model


# Examples
https://twitter.com/Baka_mitai_bot

# Installation

Install all required packages

Install ffmpeg

Need to alter code in deepfake_bot_discord/twitter.js and driving_code/driving_code_disc.py

Download vox-cpk.pth.tar and place it in the first-order-model folder.

Probably better ways to find it, but here is a source: https://www.kaggle.com/xiaoxxiao/damedane-vox-data

Have fun
