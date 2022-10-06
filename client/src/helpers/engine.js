export function compareWords(original, check){
    let result = []
    for(let i = 0; i < original.length; i++)
    {
        if(original[i] == check[i])
        {
            result.push(1);
        }else if(original.includes(check[i])){
            result.push(0);
        }else{
            result.push(-1);
        }
    }
    return result;
}