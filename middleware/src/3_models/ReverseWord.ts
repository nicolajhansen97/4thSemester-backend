export function reverseWords(str:string):string {
    return str.split("").reverse().join("").split(" ").reverse().join("")
}