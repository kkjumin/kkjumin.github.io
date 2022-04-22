export default async (to, from, next) => {
  console.log(to, from, next)
  return next()
}
