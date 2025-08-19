import {computed} from "vue"

export function highlight(snippet, target){

    const escapeRegExp = str => {
        // eslint-disable-next-line
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\<\>]/g, '\\$&');
    };

    const regexWord = computed(() => {
        return escapeRegExp(target);
    })
    const regex = computed(() => {
        console.log("Regexword: ");
        console.log(regexWord.value);
        return new RegExp(`(${regexWord.value})`, 'gi');
    })

    const escapeHtml = unsafe => {
        return unsafe
            .replace(/&/g, `&amp;`)
            .replace(/</g, `&lt;`)
            .replace(/>/g, `&gt;`)
            .replace(/"/g, `&quot;`)
            .replace(/'/g, `&#039;`);
    };

    if(!target) return escapeHtml(snippet)

    const replaced = snippet.replace(regex.value, `:;{{:;$&:;}}:;`);
    const matchAgain = new RegExp(`:;{{:;(${escapeHtml(regexWord.value)}):;}}:;`, 'gi');
    return escapeHtml(replaced).replace(matchAgain, `<span class="hl">$1</span>`);



}
