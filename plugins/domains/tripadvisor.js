export default {

    re: /^https?:\/\/(?:www\.)?tripadvisor\.com\/.+/i,

    mixins: [
        "*"
    ],

    getLinks: function(meta, url) {
        const title = meta.og?.title || meta['html-title'] || "Tripadvisor Page";
        const site = meta.og?.site_name || meta.site || "Tripadvisor";
        const thumbnail = meta.og?.image?.url || meta.links?.thumbnail?.[0]?.href;
        const favicon = meta.icon?.href || meta.links?.icon?.[0]?.href || 'https://static.tacdn.com/favicon.ico?v2';
        const themeColor = meta["theme-color"] || "#34e0a1";
        return {
            html: `
                <div style="border: 1px solid #ccc; border-radius: 8px; overflow: hidden; max-width: 720px; font-family: Arial, sans-serif;">
                    <a href="${url}" target="_blank" style="text-decoration: none; color: inherit;">
                        ${thumbnail ? `<img src="${thumbnail}" alt="${title}" style="width: 100%; height: auto;">` : ''}
                        <div style="padding: 16px; background-color: #fff;">
                            <h2 style="margin: 0 0 10px; font-size: 20px; color: #333;">${title}</h2>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <img src="${favicon}" alt="${site}" style="width: 16px; height: 16px;">
                                <span style="font-size: 14px; color: ${themeColor};">Read reviews on ${site}</span>
                            </div>
                        </div>
                    </a>
                </div>
            `,
            rel: ['inline', 'app', 'ssl'],
            type: CONFIG.T.text_html
        };
    },

    tests: [
        "https://www.tripadvisor.com/AttractionProductReview-g297701-d15142407-All_Inclusive_Ubud_Private_Tour-Ubud_Gianyar_Regency_Bali.html"
    ]
};
