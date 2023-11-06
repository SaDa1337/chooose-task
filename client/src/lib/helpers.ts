
const kgFormatter = new Intl.NumberFormat("en-US", {style:'unit', unit:'kilogram', maximumFractionDigits:2});
const tonnesFormatter = new Intl.NumberFormat("en-US", {maximumFractionDigits:2});
export const formatWeight = (value:number) =>{
  return value > 1000 
    ? `${tonnesFormatter.format(value/1000)} t`
    : kgFormatter.format(value);
}

const calcHash = async (item: unknown): Promise<string> => {  
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(item));
  const hashBuffer = await crypto.subtle.digest('SHA256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
  return hashHex;
}

export const checkHashEquality = async (item1: unknown, item2: unknown) => {
  const item1Hash = await calcHash(item1);
  const item2Hash = await calcHash(item2);
  return item1Hash === item2Hash;
}