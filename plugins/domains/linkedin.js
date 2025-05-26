export default {

    re: /^https?:\/\/(?:www\.)?linkedin\.com\/.+/i,

    mixins: ["*"],

    getLinks: function(meta, url) {
        console.log(meta)
        const title = meta.title || "LinkedIn Post";
        const description = meta.description || "";
        const site = meta.site || "LinkedIn";
        const thumbnail = meta.links?.thumbnail?.[0]?.href || meta.og?.image?.url || meta.og.image
        const favicon = meta.links?.icon?.[0]?.href || "https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca";
        return {
            html: `
                <div style="border: 1px solid #ccc; border-radius: 8px; overflow: hidden; max-width: 600px; font-family: Arial, sans-serif;">
                    <a href="${url}" target="_blank" style="text-decoration: none; color: inherit;">
                        ${thumbnail ? `<img src="${thumbnail}" alt="${title}" style="width: 100%; height: auto;">` : ''}
                        <div style="padding: 16px; background-color: #fff;">
                            <h2 style="margin: 0 0 10px; font-size: 18px; color: #0077b5;">${title}</h2>
                            <p style="margin: 0 0 10px; font-size: 14px; color: #333;">${description}</p>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <img src="${favicon}" alt="${site}" style="width: 16px; height: 16px;">
                                <span style="font-size: 12px; color: #666;">View on ${site}</span>
                            </div>
                        </div>
                    </a>
                </div>
            `,
            rel: ['inline', 'app', 'ssl', 'html5'],
            type: CONFIG.T.text_html
        };
    },

    tests: [
        "https://www.linkedin.com/posts/dominik-simonik_flutter-332-is-here-httpslnkdin-activity-7330665574584184832-r-DO",
        "https://www.linkedin.com/in/johndoe",
        "https://www.linkedin.com/company/openai",
        "https://www.linkedin.com/feed/update/urn:li:activity:7330665574584184832"
    ]
};
