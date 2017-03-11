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
    $('#findF').click();
});

$('#findF').on('click', () => {
    const n = $('#n')[0].value;
    const nf = $('#nf')[0].value;
    const $fGroup = $('#fGroup');
    $fGroup.show();
    let f = byteString(nf, n).split('');
    let template = '';
    let cssClass = '';
    for (let i = 0; i < f.length; i++) {
        cssClass = +f[i] ? 'alert alert-success' : 'alert alert-danger';
        template += '<td class="' + cssClass + '">' + f[i] + '</td>';
    }
    // $fGroup.find('tr').html('wait...');
    $('tr').html(template);
    $('#methodsGroup').show();
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
    let p = new Polynomial();
    for (let i = 0; i < f.length; i++) {
        if (+f[i]) {
            const xyz = xyzString(i, n).split('');
            p.push('(');
            for (let j = 0; j < xyz.length; j++) {
                let index = j + 1;
                let tmpVal = +xyz[j] ? 'x' : '!x';
                p.push(tmpVal, index);
                if (j != xyz.length - 1) {
                    p.push('^');
                }
            }
            p.push(')');
            p.push('v');
        }
    }
    p.coefs.pop();
    return p.toString();
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

// types:
// 0: входить як !х
// 1: входить як x
// 2: ^
// 3: v
// 4: (
// 5: )
// {type: number of type,
//  index: number}
// index is required for 0 and 1
// f.ex. (x1 v !x2) ^ x3
// [{type:4}, {type:1, index:1}, {type:3}, {type:0, index:2}, {type: 5}, {type:2}, {type: 1, index: 3}]
function Polynomial(coefs) {
    this.coefs = coefs || [];

    let self = this;

    this.push = (val, index) => {
        switch (val) {
            case '!x':
                if (!index) {
                    return false;
                }
                self.coefs.push({
                    type: 0,
                    index: index
                });
                break;
            case 'x':
                if (!index) {
                    return false;
                }
                self.coefs.push({
                    type: 1,
                    index: index
                });
                break;
            case '^':
                self.coefs.push({type: 2});
                break;
            case 'v':
                self.coefs.push({type: 3});
                break;
            case '(':
                self.coefs.push({type: 4});
                break;
            case ')':
                self.coefs.push({type: 5});
                break;
            default:
                return false;

        }
        return true;
    };

    this.toString = () => {
        let result = '';
        this.coefs.forEach((val) => {
            switch (val.type) {
                case 0:
                    result += '!x' + val.index;
                    break;
                case 1:
                    result += 'x' + val.index;
                    break;
                case 2:
                    result += ' &#652; ';
                    break;
                case 3:
                    result += ' v ';
                    break;
                case 4:
                    result += '(';
                    break;
                case 5:
                    result += ')';
                    break;
                default:
                    break;
            }
        });
        return result;
    };

    return this;
}
function PolynomialZhegalkina() {
    this.coefs = []
}


function toZheg(pol) {
    let coefs = pol.coefs;
    for (let i = 0; i < coefs.length; i++) {
        if (coefs[i] === xyzString()) {

        }
    }
}
