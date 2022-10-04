export default async function (word) {
  let exists = async (word) => {
    const f = await fetch("http://localhost:8000/api/check/" + word);

    const exists = await f.json();
    if (f.ok) {
      return exists.exists;
    } else {
      throw new Error(word);
    }
  };

  return await exists(word);
}
