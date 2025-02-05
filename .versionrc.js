module.exports = {
    scrips: {
        postchangelog: `./scripts/normalize-headings.sh`,
    },
    types: [
        {
            type: `feat`,
            section: `✨ Features`,
            hidden: false,
        },
        {
            type: `fix`,
            section: `🐛 Bug Fixes`,
            hidden: false,
        },
        {
            type: `chore`,
            section: `♻️ Chores`,
            hidden: false,
        },
        {
            type: `docs`,
            section: `📚 Docs`,
            hidden: false,
        },
        {
            type: `style`,
            section: `💎 Style`,
            hidden: false,
        },
        {
            type: `refactor`,
            section: `📦 Refactor`,
            hidden: false,
        },
        {
            type: `perf`,
            section: `🚀 Performance`,
            hidden: false,
        },
        {
            type: `test`,
            section: `🧪 Tests`,
            hidden: false,
        },
        {
            type: `ci`,
            section: `⚙️ Continuous Integrations`,
            hidden: false,
        },
        {
            type: `build`,
            section: `🔨 Build`,
            hidden: false,
        },
        {
            type: `revert`,
            section: `🗑 Reverts`,
            hidden: false,
        },
    ],
    commitUrlFormat: `{{host}}/{{owner}}/{{repository}}/commits/{{hash}}`,
    compareUrlFormat: `{{host}}/{{owner}}/{{repository}}/branches/compare/{{currentTag}}%0D{{previousTag}}`,
    issueUrlFormat: `https://calmisland.atlassian.net/browse/{{prefix}}{{id}}`,
    issuePrefixes: [ `AM-` ],
};
