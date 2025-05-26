export default {

    re: /^https?:\/\/([a-z0-9-]+\.)?substack\.com\/.+/i,

    mixins: ["*"],

    getLinks: function(meta, url) {

        const title = meta.title || "Substack Article";
        const description = meta.description || "";
        const site = meta.site || "Substack";
        const thumbnail = meta.links?.thumbnail?.[0]?.href || meta.og?.image?.url || meta.og?.image;
        const favicon = meta.links?.icon?.[0]?.href || "https://substackcdn.com/icon.png";

        return {
            html: `
                <div style="border: 1px solid #ccc; border-radius: 8px; overflow: hidden; max-width: 600px; font-family: Arial, sans-serif;">
                    <a href="${url}" target="_blank" style="text-decoration: none; color: inherit;">
                        ${thumbnail ? `<img src="${thumbnail}" alt="${title}" style="width: 100%; height: auto;">` : ''}
                        <div style="padding: 16px; background-color: #fff;">
                            <h2 style="margin: 0 0 10px; font-size: 18px; color: #ff6719;">${title}</h2>
                            <p style="margin: 0 0 10px; font-size: 14px; color: #333;">${description}</p>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <img src="${favicon}" alt="${site}" style="width: 16px; height: 16px;">
                                <span style="font-size: 12px; color: #666;">View on ${site}</span>
                            </div>
                        </div>
                    </a>
                </div>
            `,
            rel: ['inline', 'summary', 'ssl', 'html5'],
            type: CONFIG.T.text_html
        };
    },

    tests: [
        "https://example.substack.com/p/some-interesting-article",
        "https://noahpinion.substack.com/p/the-china-model-is-now-looking-riskier",
        "https://astralcodexten.substack.com/p/2024-year-in-review",
        "https://newsletter.substack.com/p/special-announcement"
    ]
};
