function generate(numhigher) {
    let arr = []
    for (let i = 1; i <= numhigher; i++) {
        arr.push('1_(' + i + ')')
    }
    return arr
}
export let weaponimglist = generate(461)
export let armoimglist = generate(308)
export let leftimglist = generate(64)
export let rightimglist = generate(140)