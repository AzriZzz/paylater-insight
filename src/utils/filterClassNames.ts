// filter button props className
export const filterClassNames = (props: string[]): string | undefined => {
  // filter text props to only those that are truthy
  const filterProps = props.filter(Boolean).join(" ");

  // if filteredTextProps is empty string, remove it
  const filteredClassNamesString = filterProps ? filterProps : undefined;

  return filteredClassNamesString;
};
