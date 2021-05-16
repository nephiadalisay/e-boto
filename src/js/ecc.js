// js program translated from the python el gamal file

function add(a, b) {
    return a+b;
}

// App = {
//     add: function(a, b) {
//         return a+b;
//     }
// }

function getRandomInt(min, max) {
    var min1 = Math.ceil(min);
    var max1 = Math.floor(max);
    return Math.floor(Math.random() * (max1 - min1) + min1); //The maximum is exclusive and the minimum is inclusive
}

function gcd(a, b){
    if (a < b) {
        return gcd(b, a)
    }
    else if ((a % b) == 0) {
        return b;
    }
        
    else {
        return gcd(b, a % b)
    }	
}

// Generating large random numbers
function gen_key(q){
    var key = getRandomInt(Math.pow(10,0), q);
    while (gcd(q, key) != 1){
        key = getRandomInt(Math.pow(10,0),q);
        // console.log(key);
    }
    return key;
}

// Modular exponentiation
function power(a, b, c){
    var x = 1
    var y = a

    while (b > 0){
        if ((b % 2) == 0){
            x = (x * y) % c;
        }	
        var y = (y * y) % c;
        var b = parseInt(b / 2);
    }

    return x % c;
}

// Asymmetric encryption
function encrypt(msg, q, h, g){
    var en_msg = [];

    var k = gen_key(q); // Private key for sender
    var s = power(h, k, q);
    var p = power(g, k, q);
    
    for(i=0; i<msg.length;i++){
        en_msg = en_msg.concat(msg[i]);
    }

    // print("g^k used : ", p)
    // print("g^ak used : ", s)

    for(i=0; i<msg.length;i++){
        // console.log(en_msg[i]);
        en_msg[i] = s * (en_msg[i].charCodeAt(0));
    }

    return [en_msg, p];
}	

function decrypt(en_msg, p, key, q){
    var dr_msg = [];
    var h = power(p, key, q);

    for(i=0; i<en_msg.length;i++){
        console.log("DR MSG IS", dr_msg);

        dr_msg = dr_msg.concat(String.fromCharCode(parseInt((en_msg[i]/h) )));
    }


    return dr_msg;
}
/////////////////////////////////////////////////
function main(){
    var msg = "nephia";
    // print("Original Message :", msg)
    console.log("Original Message :", msg);

    var q = getRandomInt(Math.pow(10,0), Math.pow(10,5));	// very large number
    // console.log("hi1", q);
    var g = getRandomInt(2,q);
    // console.log("hi2");

    var key = gen_key(q) // Private key for receiver
    // console.log("hi3");
    var h = power(g, key, q)
    // console.log("hi4");
    // print("g used : ", g)
    console.log("g used : ", g);
    // print("g^a used : ", h)
    console.log("g^a used : ", h);

    var full_en_msg = encrypt(msg, q, h, g);
    var en_msg = full_en_msg[0];
    console.log("en_msg : ", en_msg);
    var p = full_en_msg[1];
    console.log("p : ", p);
    console.log("key : ", key);
    console.log("q : ", q);
    var dr_msg = decrypt(en_msg, p, key, q);
    var dmsg = dr_msg.join('');
    // print("Decrypted Message :", dmsg);
    console.log("Decrypted Message :", dmsg);
}

// module.exports = { add };

// export {main,decrypt, encrypt, power,gen_key, gcd, getRandomInt};

module.exports = { main,decrypt, encrypt, power,gen_key, gcd, getRandomInt };



// main();
