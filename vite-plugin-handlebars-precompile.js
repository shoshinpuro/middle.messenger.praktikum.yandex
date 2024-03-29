import Handlebars from 'handlebars';

export default function handlebars() {
    const fileRegexp = /\.hbs$|\.handlebars$/;

    return {
        name: 'vite-plugin-handlebars-precompile',
        transform(src, id) {
            if (!fileRegexp.test(id)) {
                return;
            }

            const code = `
            import Handlebars from 'handlebars';
            export default Handlebars.template(${Handlebars.precompile(src)});
        `;

            return { // eslint-disable-line consistent-return
                code,
            };
        },
    };
}
