const $n = $('#n');
const $nf = $('#nf');

$n.on('keyup change', (e) => {
    const $input = $(e.target);
    let n = +$input.val();
    if (n === 0) {
        n = 1;
        $input.val('1');
    }
    if (n > 64) {
        n = 64;
        $input.val('64');
    }
    const $nfGroup = $('#nfGroup');
    const $nfInput = $nfGroup.find('input');

    $nfInput.attr('max', Math.pow(2, Math.pow(2, n)) - 1)
});

$nf.on('keydown', (e) => {
    const $input = $(e.target);
    if ($input.val() === '0') {
        $input.val('');
    }
});

$nf.on('keyup change', (e) => {
    const $input = $(e.target);
    const nf = +$input.val();
    if (nf === 0) {
        $input.val('0');
    }
    if (nf > $input.attr('max')) {
        $input.val($input.attr('max'));
    }
});

$('#findF').on('click', () => {
    const n = $('#n')[0].value;
    const nf = $('#nf')[0].value;
    const $fGroup = $('#fGroup');
    $fGroup.show();
    let f = byteString(nf, n).split('');
    let template = '';
    for (let i = 0; i < f.length; i++) {
        template += '<td>' + f[i] + '</td>';
    }
    $fGroup.find('tr').html('wait...');
    setTimeout(() => {
        $('tr').html(template);
        $('#methodsGroup').show();
    }, 350);
});

$('#findPolynomial').on('click', () => {
    if ($('input[type=radio]').val() === 'pdnf') {
        const n = $('#n')[0].value;
        const nf = $('#nf')[0].value;
        const result = getPdnf(nf, n);
        $('#result').show();
        $('#result').html(result);
    }
});


function getPdnf(nf, n) {
    const f = byteString(nf, n).split('');
    let pdnf = '';
    for (let i = 0; i < f.length; i++) {
        if (+f[i]) {
            const xyz = xyzString(i, n).split('');
            let val = '(';
            for (let j = 0; j < xyz.length; j++) {
                val += +xyz[j] ? 'x' + (j + 1) : '!x' + (j + 1);
                if (j != xyz.length - 1) {
                    val += ' &#652; ';
                }
            }
            val += ')';
            pdnf += val + ' v ';
        }
    }
    return pdnf.slice(0, -3);
}

function byteString(nf, n) {
    let zeros = '';
    const st = Math.pow(2, n);
    for (let i = 0; i < st; i++) {
        zeros += '0';
    }
    return (zeros + (+nf).toString(2)).slice(-st);
}

function xyzString(val, n) {
    val = +val;
    n = +n;
    let zeros = '';
    for (let i = 0; i < n; i++) {
        zeros += '0';
    }
    return (zeros + val.toString(2)).slice(-n);
}