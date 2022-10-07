export function compareWords(original, check){
    let result = []
    original = original.toUpperCase()
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

export async function onWordLengthChange(len)
{
  const getWord = async()=>{
    let word = await getRandomWord(len);
    return word;
  }

  return await getWord();
}

export async function getRandomWord(wordLength)
{
    let url = "http://localhost:8000/api/word/" + wordLength;
    const res = await fetch(url);
    const word = await res.json();
    if(res.ok)
    {
        return word.name;
    }else{
        throw new Error(word);
    }
}