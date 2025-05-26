export default {

    re: /^https:\/\/(?:[a-z0-9\-]+\.)?medium\.com\/@?[\w-]+/i,

    mixins: ["*"],

    provides: ['__appFlag'],

    getLinks: function(og, url) {
        if (og.type === 'profile' || og.type === 'medium-com:collection' || og.type === 'article') {

            let typeLabel = 'profile';
            if (og.type === 'medium-com:collection') {
                typeLabel = 'collection';
            } else if (og.type === 'article') {
                typeLabel = 'story';
            }

            const previewImage = og.image?.url || og.image;  // Some versions may be a string
            const title = og.title || "Medium Article";
            const description = og.description || "";
            const site = og.site_name || 'Medium';

            return {
                html: `
                    <div style="border:1px solid #ccc; border-radius: 8px; max-width: 500px; font-family: Arial, sans-serif; overflow: hidden;">
                        <a href="${url}" target="_blank" style="text-decoration:none; color:inherit;">
                            ${previewImage ? `<img src="${previewImage}" alt="${title}" style="width: 100%; height: auto;">` : ''}
                            <div style="padding: 16px;">
                                <h3 style="margin: 0 0 8px; font-size: 18px;">${title}</h3>
                                <p style="margin: 0 0 12px; font-size: 14px; color: #555;">${description}</p>
                                <div style="font-size: 12px; color: #888;">${site}</div>
                            </div>
                        </a>
                    </div>
                `,
                rel: [
                    og.type === 'article' ? CONFIG.R.summary : CONFIG.R.app,
                    CONFIG.R.inline,
                    CONFIG.R.ssl
                ],
                type: CONFIG.T.text_html
            };
        }
    },

    getData: function(meta, options) {
        if (!meta.og) {
            return {
                __appFlag: true
            };
        }
    },

    tests: [
        { skipMethods: ["getData"] },
        "https://medium.com/@startswithabang",
        "https://medium.com/hackerpreneur-magazine/nobody-s-heard-of-you-and-that-s-okay-82792dfecc12",
        "https://medium.com/@AvenueTalentPartners/3-keys-to-doing-better-discovery-and-closing-more-deals-1f8ce7bcac3d"
    ]
};
