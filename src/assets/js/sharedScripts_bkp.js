import {computed} from "vue"
// composables/myComposable.js
// import { ref } from 'vue';

// export function sharedScriptsComposable() {
//     const data = ref('Some data');
//
//     function updateData(newData) {
//         data.value = newData;
//     }
//
//
//
//
//
//     return { data };
// }
export function highlight(snippet, target){

    const escapeRegExp = str => {
        // eslint-disable-next-line
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\<\>]/g, '\\$&');
    };

    // function indexOfSubstrings(str, searchValue) {
    //     let r = str.indexOf(searchValue);
    //     let result = [];
    //     while (r !== -1) {
    //         console.log("Fouund one");
    //         result.push(r);
    //         r = str.indexOf(searchValue, r + 1);
    //     }
    //     return result;
    // }

    // function escapeRegExp(str) {
    //     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // }

    // function locations(mainString,subString, number){
    //     // var a=[],i=-1;
    //     // while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
    //     // return a;
    //     console.log("Substring: ", subString);
    //
    //     let regex = new RegExp(`(?=${escapeRegExp(subString)})`,"g")
    //     console.log("Regular Expression: ", regex);
    //     console.log("Count: ", (mainString.match(regex) || []).length);
    //     console.log("DB Count :", number);
    //     const indices = [];
    //     let startIndex = 0;
    //     let foundIndex;
    //
    //     while ((foundIndex = mainString.indexOf(subString, startIndex)) !== -1) {
    //         indices.push(foundIndex);
    //         startIndex = foundIndex + subString.length; // Start search after the found substring
    //     }
    //     return indices;
    // }

    // function findAllIndices(haystack, needle) {
    //     if (!needle) return [];
    //     const out = [];
    //     let i = 0, idx;
    //     while ((idx = haystack.indexOf(needle, i)) !== -1) {
    //         out.push(idx);
    //         i = idx + needle.length;             // skip past this match
    //     }
    //     return out;
    // }
    //
    // function countChar(s, ch) {
    //     let n = 0;
    //     for (let i = 0; i < s.length; i++) if (s[i] === ch) n++;
    //     return n;
    // }
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

    //
    // console.log(target);
    // if(!target) return escapeHtml(snippet)
    //
    // let indexes = findAllIndices(snippet.toLowerCase(),target.toLowerCase(), number);
    // //let index = snippet.toLowerCase().indexOf(target.toLowerCase()) //indexOfSubstrings(snippet.toLowerCase(), target.toLowerCase())
    //
    // let lastIndex = 0;
    // let parsedSnippet = "";
    // if(snippet.indexOf("Statement Period: January 1, 2024") > -1) {
    //     console.log("indexes");
    //     console.log(indexes);
    //
    //     console.log("Counted indices: ", indexes.length);
    //     console.log("Character Count:", countChar(snippet.toLowerCase(), target.toLowerCase()));
    //     console.log("DB indices: ", number);
    //     console.log("Snippet :", snippet)
    // }
    // indexes.forEach((index)=>{
    //     parsedSnippet += snippet.substr(lastIndex, index);
    //
    //     // if(snippet.indexOf("Statement Period: January 1, 2024") > -1){
    //     //     console.log("Last Index: ", lastIndex);
    //     //     console.log("Next Index: ", index);
    //     //
    //     //     console.log(snippet.substr(lastIndex, index));
    //     //     console.log("Parsed Snippet: ", parsedSnippet);
    //     // }
    //
    //
    //     let newSnippet = `<span class="hl">${target}</span>`
    //
    //     parsedSnippet += newSnippet;
    //
    //     // if(snippet.indexOf("Statement Period: January 1, 2024") > -1){
    //     //     console.log("New Parsed Snippet: ", parsedSnippet);
    //     // }
    //
    //     lastIndex = index;
    // })
    //
    //
    //
    //     // if (index > -1){
    //
    //
    //         // index = snippet.toLowerCase().indexOf(target.toLowerCase(),index+1)
    //
    //
    //     // }
    //
    // //}
    //     //
    //     // // let parsedSnippet = escapeHtml(snippet);
    //     //
    //     // idxs.forEach(idx => {
    //     //     const before = parsedSnippet.slice(0, idx)
    //     //     console.log("before")
    //     //     console.log(before)
    //     //     const hit = parsedSnippet.slice(idx, idx+target.length)
    //     //     console.log("hit")
    //     //     console.log(hit)
    //     //     const after = parsedSnippet.slice(idx+target.length)
    //     //     parsedSnippet = `${before}<span class="hl">${hit}</span>${after}`
    //     // })
    //
    //     console.log("New Parsed Snippet: ", parsedSnippet);
    //     return parsedSnippet;
    // // }


    // if(!target) return escapeHtml(snippet)
    // const idx = snippet.toLowerCase().indexOf(target.toLowerCase())
    // if(idx<0) return escapeHtml(snippet)
    // const before = escapeHtml(snippet.slice(0, idx))
    // const hit = escapeHtml(snippet.slice(idx, idx+target.length))
    // const after = escapeHtml(snippet.slice(idx+target.length))
    // return `${before}<span class="hl">${hit}</span>${after}`

    // function escapeHtml(s){
    //     return s.replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]))
    // }


}