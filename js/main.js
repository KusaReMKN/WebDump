const file = document.querySelector('input#file');
function itoa(n, r, l) {
    const t = [];
    for (let i = 0; i < l; i++) {
        t[i] = '0';
    }
    return (t.join('') + n.toString(r)).slice(-l);
}
function dump(data) {
    const dump = document.querySelector('#dump');
    let str = '00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F\n';
    let i;
    dump.textContent = '';
    for (i = 0; i < data.length; i++) {
        if (i % 16 === 0) {
            dump.textContent += `\t${str}`;
            dump.textContent += `\n${itoa(i >> 4 << 4, 16, 6)}\t`;
            str = '';
        }
        dump.textContent += `${itoa(data[i], 16, 2)} `;
        str += (0x20 <= data[i] && data[i] < 0x7f) ? String.fromCharCode(data[i]) : '.';
    }
    // 最終行のお尻合わせ
    for (i %= 16; i < 16 && i !== 0; i++) {
        dump.textContent += '   ';
    }
    dump.textContent += `\t${str}`;
}
file.addEventListener('input', function () {
    const file = this.files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.addEventListener('load', function () {
        const data = new Uint8Array(reader.result);
        dump(data);
    });
});
