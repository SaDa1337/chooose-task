
const kgFormatter = new Intl.NumberFormat("en-US", {style:'unit', unit:'kilogram', maximumFractionDigits:2});
const tonnesFormatter = new Intl.NumberFormat("en-US", {maximumFractionDigits:2});
export const formatWeight = (value:number) =>{
  return value > 1000 
    ? `${tonnesFormatter.format(value/1000)} t`
    : kgFormatter.format(value);
}
