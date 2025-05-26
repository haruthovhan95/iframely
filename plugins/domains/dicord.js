export default {

    re: /^https?:\/\/(?:cdn\.)?discord(?:app)?\.com\/(?:discovery|channels|invite|attachments)\/.+/i,

    mixins: ["*"],

    getLinks: function(meta, url) {
        console.log(meta)
        const title = meta.og?.title || meta['html-title'] || "Discord Content";
        const description = meta.og?.description || "View this Discord post or invite.";
        const image = meta.og?.image?.url ||  meta.og.image;
        const site = meta.og?.site_name || "Discord";

        return {
            html: `
                <div style="border: 1px solid #5865F2; border-radius: 8px; overflow: hidden; max-width: 600px; font-family: Arial, sans-serif;">
                    <a href="${url}" target="_blank" style="text-decoration: none; color: inherit;">
                        ${image ? `<img src="${image}" alt="${title}" style="width: 100%; height: auto;">` : ''}
                        <div style="padding: 16px; background-color: #fff;">
                            <h3 style="margin: 0 0 10px; font-size: 18px; color: #5865F2;">${title}</h3>
                            <p style="margin: 0 0 10px; font-size: 14px; color: #333;">${description}</p>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 12px; color: #666;">View on ${site}</span>
                            </div>
                        </div>
                    </a>
                </div>
            `,
            rel: ['summary', 'inline', 'ssl', 'html5'],
            type: CONFIG.T.text_html
        };
    },

    tests: [
        "https://discord.com/channels/123456789012345678/987654321098765432/112233445566778899",
        "https://discord.com/invite/discord-developers",
        "https://cdn.discordapp.com/attachments/123456789012345678/987654321098765432/image.png"
    ]
};
