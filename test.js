console.log(new Date().toLocaleDateString("en-GB"));
//print yesterday date string
console.log(
  new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString(
    "en-GB"
  )
);
const str = "hellu//ii";
//replace all | with (
console.log(str.replace(/\//g, "("));
