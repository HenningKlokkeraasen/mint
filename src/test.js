function increaseBy1(number) {
    return number++;
}

function decreaseBy1(number) {
    return number--;
}

let x = 1;

let resultA = increaseBy1(decreaseBy1(x));

let resultB = x |> increaseBy1 |> decreaseBy1;
