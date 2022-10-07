export function isLetter(str) {
  return str.length === 1 && str.match(/[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻżQqXxVv]/i);
}
