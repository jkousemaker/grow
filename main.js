class Encrypt {
    constructor(decrypted, encrypted) {
      this.decrypted = decrypted;
      this.encrypted = encrypted;
    }
  }
  
  let encryptions = [
    new Encrypt("a", "€j"),
    new Encrypt("b", "o"),
    new Encrypt("c", "z<"),
    new Encrypt("d", "~"),
    new Encrypt("e", "/+b"),
    new Encrypt("f", "}"),
    new Encrypt("g", "¥"),
    new Encrypt("h", "{"),
    new Encrypt("i", "a"),
    new Encrypt("j", '"'),
    new Encrypt("k", "r"),
    new Encrypt("l", "-"),
    new Encrypt("m", "#"),
    new Encrypt("n", "g)"),
    new Encrypt("o", "£>"),
    new Encrypt("p", "@"),
    new Encrypt("q", "["),
    new Encrypt("r", "^"),
    new Encrypt("s", "'="),
    new Encrypt("t", ":"),
    new Encrypt("u", "md"),
    new Encrypt("v", "."),
    new Encrypt("w", "y"),
    new Encrypt("x", "4"),
    new Encrypt("y", "x"),
    new Encrypt("z", "c"),
    new Encrypt("aa", "t"),
    new Encrypt("ee", "]"),
    new Encrypt("oo", "1"),
    new Encrypt("uu", "i"),
    new Encrypt("ui", "*"),
    new Encrypt("ie", "h"),
    new Encrypt("oe", "q"),
    new Encrypt("ij", "f"),
    new Encrypt("ou", "2"),
    new Encrypt("eu", "7"),
    new Encrypt("sch", "w"),
    new Encrypt("ch", "&"),
    new Encrypt("ng", "g"),
    new Encrypt("1", "?"),
    new Encrypt("2", "s"),
    new Encrypt("3", "%"),
    new Encrypt("4", "3"),
    //new Encrypt("5", "."),
    new Encrypt("6", "$"),
    new Encrypt("7", "_"),
    new Encrypt("8", "5"),
    new Encrypt("9", "k"),
    new Encrypt("0", ","),
    new Encrypt("00", "8"),
    new Encrypt("000", "n"),
    new Encrypt("?", "e"),
    new Encrypt("groet", "@@@"),
    new Encrypt("ongelegen", "111"),
    new Encrypt("nood", ":::")
  ];
  
    const decryptInput = document.querySelector("#decrypt");
    const decryptButton = document.querySelector(".d-submit");

    const transform = document.querySelector("h2");

    const encryptInput = document.querySelector("#encrypt");
    const encryptButton = document.querySelector(".e-submit");
  
    decryptButton.addEventListener('click', (e) => {
        decrypt();
    });

    encryptButton.addEventListener('click', (e) => {
        encrypt();
    });

    function decrypt() {
        console.log("decrypt");

        const msg = decryptInput.value;
        var chars = msg.split('');
        let tranformedMsg = tranformMsg(false, chars);
        let join = tranformedMsg.join("");
        console.log(join);
        decryptInput.value = join;
        transform.innerHTML = join;
    }

    function encrypt() {
        console.log("encrypt");

        const msg = encryptInput.value;
        var chars = msg.split('');
        let tranformedMsg = tranformMsg(true, chars);
        let join = tranformedMsg.join("");
        console.log(join);
        encryptInput.value = join;
        transform.innerHTML = join;
    }

    function tranformMsg(decrypted, chars) {
        var targets = getTargets(decrypted);
        
        let stringArray = getStringArray(chars, targets);
        console.log(stringArray);
        
        if(stringArray.length == 0) {
            stringArray = chars;
        }

        let message = [];
        for(let i = 0; i < chars.length; i++) {
            for(let k = 0; k < encryptions.length; k++) {
                if(decrypted) {
                    if(stringArray[i] == encryptions[k].decrypted) {
                        message.push(encryptions[k].encrypted);
                    }
                } else {
                    //console.log(chars[i], encryptions[k].encrypted);
                    if(stringArray[i] == encryptions[k].encrypted) {
                        message.push(encryptions[k].decrypted);
                    }
                }
            }
            
        }

        

        return message;
    }

    function getTargets(decrypted) {
        let decryptedTargets = [];
        let encryptedTargets = [];
        for(let i = 0; i < encryptions.length; i++) {
            if(encryptions[i].decrypted.length != 1) {
                decryptedTargets.push(encryptions[i].decrypted);
            }
            if(encryptions[i].encrypted.length != 1) {
                encryptedTargets.push(encryptions[i].encrypted);
            }
        }

        if(decrypted) {
            return decryptedTargets;
        }
        return encryptedTargets;
    }

    function getStringArray(chars, targets) {
        let resultArrayIndex = getIndexArray(chars, targets);
        
        let resultArrayValues = [];
        let arrayCount = 0;

        for(let i = 0; i < resultArrayIndex.length; i++) {
            if(typeof resultArrayIndex[i] === 'string') {
                var split = resultArrayIndex[i].match(/\d/g);
                    for(let k = 0; k < split.length; k++) {
                        split[k] = chars[arrayCount];
                        arrayCount++;
                    }
                    split = split.join("");
                    resultArrayValues.push(split);
            } else {
                resultArrayValues.push(chars[arrayCount]);
                arrayCount++;
            }
        }
        console.log(resultArrayValues);
        return resultArrayValues;
    }

    function getIndexArray(chars, targets) {
        let matches = findStringIndices(chars, targets);
        let resultArray = [];

        let matchesCount = 0;
        let containCount = 0;
        
        for(let i = 0; i < chars.length; i++) {
            let push = false;
            for(let k = 0; k < matches.length; k++) {
                if(!matches[k].includes(i)) {
                    
                    push = true;
                } else {
                    push = false;
                    k = matches.length;
                }
            }
            
            if(push) {
                resultArray.push(i);
                containCount = 0;
            } else if (parseInt(matchesCount) != matches.length && containCount == 0) {
                resultArray.push(matches[matchesCount]);
                matchesCount++;
                containCount++;
            }
        }
        return resultArray;
    }

    function findStringIndices(chars, targets) {
        var matchedIndices = [];
        for (var i = 0; i < chars.length; i++) {
            for (var j = i + 1; j <= chars.length; j++) {
                var substring = chars.slice(i, j);
                for (var k = 0; k < targets.length; k++) {
                    targets[k];
                    if (substring.join('') === targets[k]) {
                        console.log("Indices [" + substring.map((c, index) => i + index).join(', ') + "] form the string '" + targets[k] + "'");
                        matchedIndices.push(substring.map((c, index) => i + index).join(', '));
                    }
                }
            }
        }
        console.log("matched indices:", matchedIndices);
        return matchedIndices;
    }