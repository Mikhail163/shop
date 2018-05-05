function pow(x, n) {
    if(x < 0 || n < 0){
        return null;
    }

    if((parseInt(x) !== x) || (~~n !== n))
    {
        return null;
    }

    var result = 1;
    for (var i = 0; i < n; i++){
        result *= x; //result = result * x;
    }
    return result;
}