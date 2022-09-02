export const chunkArray = <T, U>(array: T[], chunk_size: number, innerCallBack?: (e: T) => U) => {
  let results: (U | T)[][] = [];
  while (array.length) {
    let chuncked: T[] = array.splice(0, chunk_size);
    if (innerCallBack) {
      const chunckedArray: U[] = chuncked.map((chunck: T) => innerCallBack(chunck));
      results.push(chunckedArray);
      console.log(chunckedArray, 'a');
    } else {
      results.push(chuncked);
    }
  }
  return results;
};
