const SocialMedia = require('./SocialMedia.js');
const SocialMediaList = [];

/*
    *
        Added SocialMedias in order:
        Instagram,
        Linkedin,
        Twitter,
        Facebook,
        Youtube,
        Discord,
        Twitch
    *
*/

SocialMediaList.push(
	new SocialMedia('Instagram', 'https://instagram.com', {
		maximized: false,
		square: false,
	})
);

SocialMediaList.push(
	new SocialMedia('LinkedIn', 'https://linkedin.com', {
		maximized: false,
		square: false,
	})
);

SocialMediaList.push(
	new SocialMedia('Twitter', 'https://twitter.com', {
		maximized: false,
		square: false,
	})
);

SocialMediaList.push(
	new SocialMedia('Facebook', 'https://facebook.com', {
		maximized: false,
		square: false,
	})
);

SocialMediaList.push(
	new SocialMedia('Youtube', 'https://youtube.com', {
		maximized: true,
		square: false,
	})
);

SocialMediaList.push(
	new SocialMedia('Discord', 'https://discord.com/channels/@me', {
		maximized: false,
		square: true,
	})
);

SocialMediaList.push(
	new SocialMedia('Twitch', 'https://www.twitch.tv', {
		maximized: true,
		square: true,
	})
);

module.exports = SocialMediaList;
