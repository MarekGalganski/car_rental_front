export default function guest({next, router}) {
  if (localStorage.getItem('token')) {
    return router.push({name: 'cars'});
  }

  return next();
}