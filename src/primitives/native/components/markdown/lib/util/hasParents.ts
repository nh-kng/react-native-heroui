export default function hasParents(parents: { type: string }[], type: string): boolean {
  return parents.findIndex((el) => el.type === type) > -1;
}
